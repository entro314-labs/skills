# Timezones and DST

## Rules

| Rule | Why |
|---|---|
| Store the zone as an IANA identifier (`Europe/Berlin`), not an offset (`+01:00`) and not an abbreviation (`CST`, `IST`) | Offsets change with DST and rule changes; abbreviations are ambiguous (CST is US Central, China, Cuba) |
| Store single events as an instant (UTC) plus the display zone; store recurring events as local wall-clock time plus zone | A weekly 09:00 meeting must stay at 09:00 local across DST; UTC would drift by an hour |
| Do date arithmetic on local date/time in the zone, then convert | "Tomorrow 09:00" is a local concept; `now + 24h` is wrong on a DST-change day (23 or 25 hours long) |
| Use the platform tz database via a zone-aware library (Temporal, `zoneinfo`, `java.time`, `Intl`) | Hand-coded offset tables go stale |
| Always send an offset or zone in API calls; treat naive datetimes as a bug | A naive value is interpreted in an unknown zone by the server |
| Use half-open intervals `[start, end)` | Avoids false conflicts at boundaries |
| Compare and merge intervals in UTC; render in the viewer's zone last | Avoids zone mixing |

## DST edge cases

- **Spring forward (gap):** local times in the skipped hour do not exist (for example 02:30 on the change day in many zones). RFC 5545 says a nonexistent local time is interpreted using the offset in effect before the gap, which moves the event later in absolute terms. Many libraries instead shift forward by the gap length. Decide, then announce to the user which time resulted.
- **Fall back (overlap):** a local time occurs twice. RFC 5545 picks the first occurrence. Libraries expose a `fold`/`disambiguation` option; set it explicitly when scheduling in the overlap hour, or avoid it by asking the user.
- **Same rule, different offset:** "Third Tuesday at 10:00 New York" has a different UTC time before and after the transition. Convert each instance using the zone, never a single fixed offset.
- **Different zones switch on different dates.** US and EU transition dates differ by a few weeks each spring and autumn, so the time difference between New York and Berlin changes for about 2 to 3 weeks (and for a week or so in autumn). Cross-zone recurring meetings appear to "move" for one side during that window; warn participants.
- **Zones without DST** (for example most of Asia, Arizona) do not shift; their offset to a DST zone changes twice a year.
- **Non-hour offsets** exist (+05:30, +05:45, +08:45); never round offsets to whole hours.
- **Date line:** an event "tomorrow" for one participant can be "today" or "the day after" for another; show dates, not just times, in cross-zone proposals.
- **Rule changes:** governments change DST rules; keep the tz database updated rather than caching offsets.

## All-day events

- Represent as dates (floating, no zone); end date is exclusive (a one-day event on 3 Nov has end 4 Nov).
- Do not convert to UTC; converting shifts them to the wrong day for some viewers.
- In free/busy merging, interpret an all-day event in the owner's zone as `[00:00, 24:00)` local, and only count it as busy if it is not marked free/transparent (holidays and birthdays often should not block).

## Cross-zone proposals

1. Pick the working-hours overlap using each person's local hours per specific date (not a constant offset).
2. Present each option in every participant's zone with the weekday and zone name:
   `Tue 3 Nov, 14:00 Berlin / 08:00 New York`.
3. Flag options that fall outside someone's working hours or on their weekend (weekends differ: Fri-Sat in some countries).
4. Create the event in one zone (usually the organizer's) and let clients localize.

## Floating vs fixed

| Kind | Meaning | Example |
|---|---|---|
| Fixed instant (UTC) | One moment worldwide | Webinar start |
| Zoned local (DTSTART + TZID) | Same wall clock in that zone | Weekly team standup |
| Floating (no zone) | Same wall clock wherever the viewer is | "Take medication at 08:00" |

Choose deliberately; most scheduling bugs come from picking the wrong kind.

## Test cases to run before trusting a scheduling routine

1. Event on the spring-forward day, local time inside the gap.
2. Event on the fall-back day, local time inside the overlap.
3. Weekly recurrence spanning a DST change: local time unchanged, UTC shifted.
4. Event at 23:30 local where UTC date differs.
5. Participants in zones with half-hour offsets.
6. Month-end and leap-day arithmetic (Jan 31 + 1 month, Feb 29).
7. Calendar with an all-day event on a boundary date.
