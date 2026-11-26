# Natural-Language Date Resolution

Goal: turn a phrase into an explicit zoned timestamp (and duration), then echo it back before acting.

## Procedure

1. Obtain `now` and the user's IANA zone (system clock or user input). Never assume.
2. Parse the phrase relative to `now` in that zone using calendar arithmetic (add days to the local date, then attach the time), not by adding 24-hour blocks.
3. Fill missing parts with explicit defaults and say so (default duration, default time of day).
4. Output ISO 8601 with offset plus zone name: `2026-11-03T14:00:00+01:00 [Europe/Berlin]`.
5. Echo in human form including weekday and zone. The weekday in the echo catches most misparses.

## Phrase table (common conventions)

Conventions differ between parsers; the table gives sensible defaults. If using a tool's built-in parser, test the phrase against it first.

| Phrase | Resolves to |
|---|---|
| `today`, `tomorrow`, `yesterday` | that date at 00:00 (when a time is needed, ask or use a stated default) |
| `now` | current instant |
| `eod`, `end of day` | today at the user's end of working day (commonly 17:00) |
| `next week` | Monday of the next week at 00:00 |
| `next month` | 1st of next month at 00:00 |
| `in 3 hours`, `in 2 days`, `in 1 week`, `in 2 months` | offset from now (hours: elapsed time; days/weeks/months: calendar arithmetic) |
| `5 minutes ago`, `3 days ago` | offset before now |
| `friday 2pm` | the upcoming Friday at 14:00 (today if today is Friday and 14:00 is still ahead) |
| `next friday at 2pm` | the first Friday after today (+7 days when today is Friday); see Ambiguity handling when said Mon-Thu |
| `tomorrow 14:00`, `today 3:30pm` | keyword plus time |
| `mar 15`, `march 15 2pm`, `dec 31 11:59pm` | month and day, optional time; year is the next occurrence, not a past date |
| `5pm`, `17:00` | today at that time (if already passed, ask whether tomorrow is meant) |

Accepted absolute formats in typical parsers: RFC 3339 (`2026-02-15T14:00:00Z`), ISO date and datetime, US-style `02/15/2026`, `Feb 15, 2026`, `15 Feb 2026`. Never accept `02/03/2026` without knowing the locale (Feb 3 or 2 Mar); prefer ISO.

Names: weekdays and months accept full and three-letter forms.

Inconsistent shorthands: some parsers resolve `eow` to Friday 17:00 but `this week` to Sunday 23:59. Do not rely on them; state the intended day explicitly.

## Weekday arithmetic

Days ahead to the next occurrence of weekday `target` (1=Mon .. 7=Sun, ISO numbering as in `date +%u`); 0 means today:

```bash
target=1; today=$(date +%u)
offset=$(( (target - today + 7) % 7 ))
```

"Next <weekday>" when today is that weekday means 7 days ahead:

```bash
[ "$offset" -eq 0 ] && offset=7
```

Caveat: `date +%u` is Monday=1 on both GNU and BSD `date`. Python's `datetime.weekday()` is Monday=0, so adjust.

## Ambiguity handling

| Ambiguity | Action |
|---|---|
| "Next Friday" said Mon-Thu: this week's Friday or the following one? | State the resolved date; ask if the gap is under about a week and the user's intent is unclear |
| "This Friday" on Friday after working hours | Ask, or choose next Friday and say so |
| Time without am/pm (`at 5`) | Choose the sensible working-hours reading and echo it |
| "Morning", "afternoon", "evening" | Offer concrete windows from stated working hours |
| "Noon", "midnight" | Noon is 12:00. "Midnight tonight" is 00:00 at the start of the next date; state the date explicitly |
| "Next month" vs "in a month" | `next month` is the calendar month; `in a month` is today plus one month (clamp to month end, Jan 31 + 1 month is Feb 28/29) |
| Date in the past after resolution | Ask; do not book past events unless the user is logging history |
| Time that does not exist (spring-forward gap) | See `timezones-dst.md`; choose and announce |
| Ranges ("2 to 4") | Resolve both ends, check start is before end, confirm duration |
| Durations ("an hour", "half a day") | Convert to minutes and show end time |

## Alert/reminder durations

Short forms: `15m`, `1h`, `2d` (minutes, hours, days before start). Weeks are usually not accepted by simple parsers; convert to days.

## Verification checklist

- [ ] `now` and zone known
- [ ] Output carries offset and zone
- [ ] Weekday in echoed text matches the date
- [ ] Not in the past unless intended
- [ ] End after start; duration stated
- [ ] Month-end clamping handled for month offsets
