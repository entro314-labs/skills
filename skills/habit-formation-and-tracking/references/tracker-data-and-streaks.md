# Tracker Data Model, Streaks, Stats

## Data model (minimal, vendor-neutral)

```
Habit {
  id, name, description?,
  frequency: daily | weekly | monthly | custom,
  target?            // e.g. 20 (minutes) or 1 (done/not done)
  tinyVersion?       // the floor
  anchor?            // "After I ..."
  state: active | paused | archived,
  forgivenessLimit   // default 1
  createdAt (UTC)
}

Log {
  habitId, date (local calendar day, YYYY-MM-DD), 
  status: completed | partial | missed | skipped,
  value?, note?, loggedAt (UTC)
}
UserConfig { timezone, reminderTimes, ... }
```

Invariants:
- One effective log per habit per local day. If multiple entries exist for a date, the last one counts. Compute everything from these per-day records.
- Archiving never deletes logs. Deleting requires explicit confirmation that history will be lost.
- Store timestamps in UTC; derive the local day from the user's timezone. Keep the timezone in config because "today" depends on it (and on DST changes).

## Status model

| Status | Meaning | Streak effect |
|---|---|---|
| completed | target met | extends streak |
| partial | progress below target | product decision: treat as miss for the streak but count toward rate, or count as completed above a threshold; document it |
| missed | no entry, or explicit miss | consumes forgiveness / breaks streak |
| skipped | intentional (travel, rest) | excluded from the miss count; neither extends nor breaks |

Pause: freezes the streak (days inside the pause are ignored like skipped days). Use for vacation and illness.

## Streak algorithm with forgiveness

Default semantics (forgiveness limit = 1, consecutive): an isolated miss is forgiven, two misses in a row end the streak. This matches the "never miss twice" rule users are coached on, so UI copy and algorithm agree.

- Walk per-day statuses newest to oldest (skipped and paused days removed; today stays open until the day ends).
- Completed: streak++ and reset the consecutive-miss counter. Missed: counter++ and forgiven++; stop when the counter exceeds `limit`.
- Missed days inside the streak do not add to its length.
- Longest streak: the same rule scanned oldest to newest, restarting after a break.

```ts
function currentStreak(days: DayStatus[] /* newest first, skipped removed */, limit = 1) {
  let streak = 0, run = 0, forgiven = 0;
  for (const d of days) {
    if (d === "completed") { streak++; run = 0; }
    else { run++; if (run > limit) break; forgiven++; }
  }
  return { streak, forgiven }; // forgiven feeds the quality tier
}
```

Pitfall: a counter that is never reset on completion makes the limit cumulative (with limit 1, miss-complete-miss breaks at the second miss, wherever it falls), which contradicts "never miss twice" and silently punishes long streaks. Use a cumulative budget only as a deliberate, documented choice (for example "N forgiven days per streak"), and then label it as such in the UI.

Quality tier from forgiveness used (design choice, not a research standard):

| Forgiveness used | Tier |
|---|---|
| 0 | PERFECT |
| 1-2 | EXCELLENT |
| 3-5 | GOOD |
| > 5 | FAIR |
| current streak 0 | FAIR |

Forgiven days accumulate across a long streak, so all tiers are reachable even with limit 1.

## Unlogged days (decide explicitly)

A walk that only iterates over days with log entries ignores gaps. Pick one:
1. Derive misses from the calendar: every scheduled day without a completed/skipped entry (up to yesterday, plus today after end-of-day) is a miss.
2. Write explicit "missed" records at end of the user's day via a scheduled job.

Never treat "no entry" as neutral by accident. Today stays open (not a miss) until the day ends in the user's timezone.

## Next expected date

daily (and custom by default): +1 day; weekly: +7 days; monthly: +1 calendar month (clamp to month end).

## Stats worth computing

- Current streak, longest streak.
- Completion rate over 7 days, 30 days and all time (skipped and paused days excluded from the denominator).
- Best and worst weekday by completion rate (feeds breakdown-point coaching).
- 4-week calendar grid (the digital wall calendar).
- Days to next milestone (see coaching reference).

## Pause, archive, delete

| Action | Effect on logs | Effect on streak |
|---|---|---|
| Pause | kept | frozen, not broken |
| Archive | kept | final value kept for history |
| Delete | removed, only after explicit confirmation | gone |

## Multi-habit behavior

Check-in prompts by number of active habits: see `logging-and-reminders.md`.
