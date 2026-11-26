---
name: productivity-habit-formation-and-tracking
description: Evidence-based habit building and breaking (tiny habits, stacking, implementation intentions, environment friction, cue-routine-reward swaps, never-miss-twice relapse handling) plus vendor-neutral habit-tracker design (data model, natural-language logging, streaks with forgiveness, reminders, coaching feedback). Use when designing or coaching a habit, diagnosing why one fails, or building or reviewing habit-tracking logic.
---

# Habit Formation and Tracking

Two jobs: (1) coach a person through building or breaking a habit; (2) design the tracking system that records it and gives feedback. Rules are ordered by importance.

## Core rules (coaching)

1. **One habit at a time.** Add the next only after about 30-60 days of automatic execution (or 2+ weeks of consistency for a tiny habit). Too many simultaneous habits is the most common failure.
2. **Shrink until trivial.** Scale the behavior to under 2 minutes ("read one page", "one sentence", "2 pushups"). The floor (tiny version) is mandatory even on the worst day; the ceiling is optional. If a habit keeps failing, it is too big: shrink, do not lecture about motivation.
3. **Anchor to an existing routine.** "After I [EXISTING HABIT], I will [TINY HABIT]." The anchor must happen daily, in the same place, at a time that fits the behavior. Find anchors by listing everything done from waking to leaving home and from arriving home to bed.
4. **Be specific.** "When [SITUATION], I will [BEHAVIOR] at [TIME] in [PLACE]." Add a backup: "If [obstacle], then [tiny version]." Implementation intentions have a medium-to-large effect on goal attainment (meta-analytic d about 0.65); do not quote a "2x" multiplier.
5. **Design the environment, not willpower.** Wanted behavior: visible, under about 20 seconds to start. Unwanted: invisible, at least 20 seconds of added friction. Willpower-depletion as a mechanism has replication problems; the practical advice (do not rely on willpower) still holds.
6. **Reward immediately.** Check-off, favorite music, a deliberate "nice". Optionally bundle with something wanted (podcast only while walking).
7. **Never miss twice.** One missed day is a rest day; two is the start of a new pattern. On day 2 do the tiny version. Never double up to "make up" a miss (creates aversion) and never reset punitively.
8. **Diagnose before advising.** Never starts = not obvious (cue/anchor). Misses often = not easy enough. Drops after weeks = not satisfying or wrong identity. Change one lever at a time, observe for a week.
9. **Frame as identity.** Each action is a vote for "I'm a [reader/runner/non-smoker]"; a majority suffices. Prompt: "What would a [identity] do right now?" Act-as-if works for behaviors, not emotions.
10. **Coach, never shame.** 2-3 sentences, cite the user's own numbers ("6 of 7 this week"), suggest rather than demand, no unsolicited purchases.

## Habit loop and breaking habits

Every habit = cue -> routine -> reward. Build: design all three. Break: keep cue and reward, swap the routine for one that delivers the same underlying need (stimulation, distraction, transition ritual, relaxation, comfort). Cue types: time, location, emotional state, preceding action, other people. Example: after-work beer -> sparkling water + 5 min porch sit.

Reverse framework: identify cue -> identify real reward -> add friction -> change or remove cue -> same-reward replacement -> implementation intention ("When I feel the urge to X, I will Y"). Plan the replacement before the urge; cravings typically peak and pass within roughly 10-15 minutes (rule of thumb). For compulsive use with negative consequences, recommend professional support via local health services; withdrawal from alcohol or some drugs can be medically dangerous, so send the person to a clinician first. Habit techniques complement, never replace, that.

## Facts to state correctly

| Claim | Statement |
|---|---|
| "21 days to form a habit" | Myth from a misquoted observation. Do not state as fact. |
| Time to automaticity | One UCL study (2009/2010, 96 people, 12 weeks): median about 66 days, range 18-254; simple habits faster; one missed day had little effect. |
| Simple 30 / moderate 60 / complex 90+ days | Heuristic planning range only. |
| Automaticity signal | Skipping feels more uncomfortable than doing. |
| Best time to start | A life transition (old cues disrupted). |
| Plateau | Results lag effort; many quit just before it shows. |
| Don't break the chain | A technique, not a proven effect. |
| Unsourced heuristics (craving length, hardest 2-4 weeks, "tell no one for 30 days") | Say "roughly" / "for many people"; do not present as research. |

Full table: [references/evidence-notes.md](references/evidence-notes.md).

## Tracker design essentials

- **Model:** Habit (definition, frequency, optional target, tiny version, anchor, state, forgiveness limit) + one effective Log per habit per local day (status, value, note, UTC timestamp). Derive streaks and stats from logs on read.
- **Statuses:** `completed`, `partial`, `missed`, `skipped` (intentional rest). Skipped neither extends nor breaks a streak and is excluded from rate denominators. Document the `partial` policy.
- **Today is open:** an un-logged today never breaks a streak; it can become a miss only after the user's local day ends.
- **No-entry days are not neutral.** Derive misses from the calendar or write explicit `missed` records via an end-of-day job; do not claim auto-miss behavior unless that job exists.
- **Forgiveness:** a streak survives up to N (default 1) *consecutive* missed days; bridged days do not add to the length. The consecutive-miss counter resets on every completion. A cumulative lifetime budget silently punishes long streaks and contradicts "never miss twice"; use it only as a deliberate, labeled choice. Report forgiveness used/remaining and a quality tier.
- **Pause** must be implemented as excluded days (like skipped) read by the streak function; a stored `paused` flag that the calculation ignores freezes nothing.
- **Time:** store UTC, derive the local day from the user's timezone (DST-safe), store reminders as local wall-clock time plus zone.
- **Natural-language logging** thresholds (starting points, tune on real error rates): >= 0.85 execute and confirm; 0.60-0.84 state interpretation and ask; < 0.60 clarify, do not write. Persist before replying; confirm with the streak recomputed from storage, never from conversational memory.
- **Reminders:** brief, cue-based, restate anchor and tiny version; deliver via the channel last used, else local notification or log file; a reply of "done / skipped / missed" binds to the habit in the most recent reminder; at most one proactive message per habit per day.
- A paper calendar with X marks is the reference tracker; elaborate tracking is a procrastination risk. One tap per log.

## Routing table

| Need | Read |
|---|---|
| Technique catalog: loop, shrinking, stacking, environment, identity, implementation intentions, habit-plan template | references/behavior-design.md |
| Breaking habits, replacement table, cravings, relapse responses, addiction safety boundary | references/breaking-habits-and-relapse.md |
| Schema, invariants, status model, streak + forgiveness algorithm with code, unlogged days, stats, pause/archive/delete | references/tracker-data-and-streaks.md |
| Parsing free-text logs, bulk logging, multi-habit check-in, reminders, proactive triggers | references/logging-and-reminders.md |
| Tone, milestone table, streak-tier coaching, message templates, diagnostic questions | references/coaching-and-feedback.md |
| What is supported, myth, or heuristic; how to word each claim | references/evidence-notes.md |

## Common mistakes

- Citing 21 days as science, or quoting "2x" for implementation intentions.
- Resetting the counter after one miss, or telling users to double up.
- Starting several habits at once; using the ceiling as the baseline.
- Treating a missing log as a miss before the day ends, or treating gaps as neutral forever.
- Confirming a streak number from memory, or replying "logged" before the write succeeds.
- Advising "more motivation" instead of fixing cue, size, or friction.
