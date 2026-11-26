# Recurrence rules (RFC 5545)

## Anatomy

```
DTSTART;TZID=Europe/Berlin:20260303T090000
RRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=TU;UNTIL=20261231T225959Z
EXDATE;TZID=Europe/Berlin:20260317T090000
```

- `DTSTART` is a local datetime with no offset; the `TZID` maps it to instants. It is the first instance and defines the time-of-day for all instances.
- Limit with `COUNT=n` or `UNTIL=...`; the two must not both appear. No limit = infinite series.
- `UNTIL` is inclusive. If `DTSTART` is UTC or has a `TZID`, `UNTIL` must be UTC with `Z`. If `DTSTART` is floating, `UNTIL` is floating. If `DTSTART` is a DATE, `UNTIL` is a DATE.
- Always include `DTSTART` that itself matches the rule; otherwise some implementations count it as an extra instance and others do not.

## Common patterns

| Meaning | Rule |
|---|---|
| Every day | `FREQ=DAILY` |
| Every 3 days, 5 times | `FREQ=DAILY;INTERVAL=3;COUNT=5` |
| Every weekday | `FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR` |
| Weekdays for 4 weeks | `FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR;COUNT=20` |
| Weekly on Tuesday | `FREQ=WEEKLY;BYDAY=TU` |
| Biweekly on Monday | `FREQ=WEEKLY;INTERVAL=2;BYDAY=MO;WKST=MO` |
| Monthly on the 15th | `FREQ=MONTHLY;BYMONTHDAY=15` |
| Last day of month | `FREQ=MONTHLY;BYMONTHDAY=-1` |
| Second Tuesday | `FREQ=MONTHLY;BYDAY=2TU` |
| Third Tuesday (set form) | `FREQ=MONTHLY;BYDAY=TU;BYSETPOS=3` |
| First Friday | `FREQ=MONTHLY;BYDAY=1FR` |
| Last Friday | `FREQ=MONTHLY;BYDAY=-1FR` or `FREQ=MONTHLY;BYDAY=FR;BYSETPOS=-1` |
| Last weekday of month | `FREQ=MONTHLY;BYDAY=MO,TU,WE,TH,FR;BYSETPOS=-1` |
| Quarterly | `FREQ=MONTHLY;INTERVAL=3` |
| Yearly on a date | `FREQ=YEARLY;BYMONTH=6;BYMONTHDAY=1` |
| Feb 29 | `FREQ=YEARLY;BYMONTH=2;BYMONTHDAY=29` (only leap years: 2028, 2032, 2036) |

## Rules that trip people up

- `INTERVAL` applies to the `FREQ` unit: weeks for WEEKLY, months for MONTHLY. It does not skip individual days inside `BYDAY`.
- `WKST` (week start, default `MO`) changes which weeks are "every other" when `INTERVAL>1` and `BYDAY` spans a week boundary (e.g. `SU,MO`). Set it explicitly.
- A numeric prefix on `BYDAY` (`2TU`, `-1FR`) is allowed only with `MONTHLY`, or `YEARLY` (without `BYWEEKNO`). With `WEEKLY` it is invalid.
- `BYSETPOS` filters the expanded set per period after all other BY-parts. It needs at least one other BY-part. Months have 4 or 5 of any weekday, so "fifth Friday" skips months that lack one.
- Non-existent dates are skipped, not clamped: `BYMONTHDAY=31` yields only 31-day months; `BYMONTHDAY=30` skips February. Use `-1` for "last day".
- `EXDATE` / `RDATE` must match the generated instance exactly (same value type and timezone). A mismatch is silently ignored and the instance still appears.
- DST: instances keep the local wall time; the UTC instant shifts. A rule whose local time falls in a spring gap is implementation-defined; test the specific date.
- `FREQ=WEEKLY` without `BYDAY` repeats on the weekday of `DTSTART`; `MONTHLY` without BY-parts repeats on the day-of-month of `DTSTART` (skipping months without it).
- `COUNT` includes `DTSTART` and counts instances before `EXDATE` removal in most implementations; excluded dates do not extend the series.
- Infinite rules must be expanded lazily within a query window; never expand to completion.

## Verification routine

1. Expand the rule with a recurrence library for a window that includes: a DST transition, a month with 28/29 days, a year boundary.
2. Print instances as local wall time + weekday + UTC offset; check weekday and time are constant and the offset changes at DST.
3. Check first and last instance and total count against intent.
4. Check each `EXDATE` removes exactly one instance.

```python
from dateutil.rrule import rrulestr
from zoneinfo import ZoneInfo
from datetime import datetime
rule = rrulestr("FREQ=MONTHLY;BYDAY=TU;BYSETPOS=3",
                dtstart=datetime(2026, 1, 20, 9, 0, tzinfo=ZoneInfo("America/New_York")))
for d in rule.between(datetime(2026, 1, 1, tzinfo=ZoneInfo("America/New_York")),
                      datetime(2026, 6, 30, tzinfo=ZoneInfo("America/New_York"))):
    print(d.isoformat(), d.strftime("%a"))   # offset flips -05:00 -> -04:00 in March
```

## Editing semantics

| User intent | Operation |
|---|---|
| Change one occurrence | Create an override instance (`RECURRENCE-ID` = original start) with new values; do not touch the rule |
| Delete one occurrence | Add `EXDATE` for its original start |
| Change this and all future | Set `UNTIL` on the existing rule to just before the split (in UTC), create a new series from the split date; or `COUNT` adjustment |
| Change everything | Update the master rule/properties; overrides may be orphaned, tell the user |
| End a series | Set `UNTIL` (UTC if zoned) |

Before modifying or deleting a recurring event, state whether the operation hits one instance or the whole series.

## Alerts and reminders

Alarm = minutes/hours/days before start (`15m`, `1h`, `2d` in CLI shorthand; `TRIGGER:-PT15M` in iCalendar). A recurring event's alarms apply to every instance.
