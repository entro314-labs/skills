# Natural-Language Logging, Check-ins, Reminders

## Parsing free-text logs

Input like "I meditated today", "did pushups yesterday", "ran Monday and Wednesday".

Extract: habit (match against active habits), date(s), value/amount if any, status (done / partial / skipped / missed).

| Match confidence | Action |
|---|---|
| >= 0.85 | Execute the write, then confirm what was recorded |
| 0.60 - 0.84 | State the interpretation and ask to confirm before writing |
| < 0.60 | Ask a clarifying question; do not write |

The thresholds are starting points and not validated. Tune them against real misparse rates.

Rules:
- **Persist before replying.** A confirmation message with no stored write is a failure. If the write fails, say so.
- Echo what was stored (habit, date, status) so errors are visible and correctable.
- Ambiguous habit name: ask, with a numbered list of active habits.
- Dates: accept relative words ("today", "yesterday", weekday names) and ISO dates, resolved in the user's timezone. On parse failure, list the accepted formats instead of guessing.
- Bulk logging: accept a list of dates in one operation; report the count written and any dates that already had entries (last write wins).
- Correcting a log: replace the day's record; do not append a second one.
- Do not log for a paused or archived habit without asking whether to resume it.

## Multi-habit check-in flow

| Active habits | Prompt |
|---|---|
| 1 | Log directly |
| 2-3 | "Which one?" with a numbered list |
| 4+ | Show a checklist; accept several at once |

## Reminders

- Schedule in the user's configured timezone; one reminder per habit anchored to the anchor's usual time ("after breakfast" -> morning), not an arbitrary clock time.
- Keep reminders brief and cue-based: restate the anchor and the tiny version ("After you pour coffee: one sentence.").
- Allow snooze and quiet hours; stop reminding for paused or archived habits.
- A reminder is for recurring habits. One-off reminders and calendar events belong in a different tool.

## Proactive triggers

| Trigger | Condition | Message intent |
|---|---|---|
| Streak at risk | habit normally completed daily, not yet logged, late in the user's day | Gentle nudge with the tiny version |
| Weekday pattern | repeated misses on the same weekday | Propose a backup plan for that day |
| Milestone near | e.g. 3 days from 30 | Motivation tied to the number |
| Rate dropping | completion rate falling over the last 2 weeks | Ask what changed; offer to shrink |
| Request | user asks for motivation | Use their own data and identity framing |

Limit frequency (e.g. at most one proactive message per habit per day) so reminders do not become the thing the user avoids.
