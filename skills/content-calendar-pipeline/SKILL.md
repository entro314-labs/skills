---
name: productivity-content-calendar-pipeline
description: Plan and track content across channels with a tool-neutral pipeline (Idea to Published), per-channel cadence, stall/overdue and schedule-gap detection, repurposing queue, and a weekly content brief. Use when asked to set up or review a content calendar, find what is overdue or missing, plan next week's publishing, decide what to repurpose, or run a quarterly content audit.
---

# Content Calendar and Publishing Pipeline

A content calendar is a plain, single source of truth (a markdown file, table, or spreadsheet) plus a short weekly review loop. The value is in the loop: staleness is the main failure mode. Everything below is tool-neutral; use whatever store you already have.

## Core rules (ordered by importance)

1. **One source of truth.** One pipeline file or table holds every piece in flight. Do not scatter status across notes, chats and boards. If the calendar and reality disagree, fix the calendar first.
2. **Every piece has a stage, a channel, and a due date.** A row without a due date cannot be overdue and so is invisible to detection. Unscheduled ideas live in the Backlog, not the pipeline.
3. **Set cadence to what you sustain, not what you aspire to.** A cadence you miss produces debt and guilt; lower it until you hit it for 4+ consecutive weeks, then raise it.
4. **Detect, then decide.** The weekly review finds stalled, overdue and empty slots; each finding gets exactly one action: complete, reschedule, cut (or merge).
5. **Review weekly (daily if you publish daily).** An out-of-date calendar is worse than none. Put the review on a recurring reminder.
6. **Limit work in progress.** Many pieces parked in Draft/Review means none ship. Cap concurrent Draft + Review items (a small number, e.g. 3 per person) and finish before starting.
7. **Publish, then reuse.** Every published piece is checked for a repurposing candidate and, for evergreen pieces, a refresh date.
8. **Metrics stay outside the calendar.** Track results per piece in a separate note and feed them into repurposing and the quarterly audit; do not clutter pipeline rows.

## Pipeline stages

Idea -> Outline -> Draft -> Review -> Scheduled -> Published

| Stage | Typical duration | Exit condition |
|---|---|---|
| Idea | none (backlog) | angle in one sentence, channel chosen, "why now" noted |
| Outline | 1-3 days | structure and key points agreed, due date set |
| Draft | 1-5 days | complete first version |
| Review | 1-2 days | edits done, assets attached, sign-off if needed |
| Scheduled | until publish date | queued or dated; nothing left to do but publish |
| Published | - | moved to archive; metrics note created; repurpose check done |

Collaboration variant: add "Assigned To" and a named reviewer (`Review: <name>`), plus a `Final` stage before Scheduled. The Assigned To column exposes pieces blocked on someone else's input.

Pipeline row fields: ID, Title, Type, Channel, Stage, Due Date, Notes (add Assigned To when collaborating; optional Revenue Type / Expected / Actual if content is monetized).

## Detection rules

| Check | Default rule | Action |
|---|---|---|
| Stalled | in Draft or Review > 7 days | complete this week, reschedule, or cut |
| Overdue | due date passed and stage < Scheduled | same three actions; never leave silently |
| Overdue warning | due within 2 days and stage < Review | flag as at risk |
| Schedule gap | a channel has nothing scheduled in the next 14 days | pull 2-3 backlog ideas that fit the channel |
| Cluster imbalance | a topic cluster below its target share over a rolling 4 weeks | prefer backlog ideas from that cluster |
| Refresh due | evergreen piece's Refresh Due within 30 days | schedule an update |

All thresholds are starting defaults, not benchmarks. Make them explicit in a Settings section (e.g. `Stall threshold: 5 days`) and tune to your real throughput. Details: `references/weekly-brief-and-gap-detection.md`.

## Weekly brief (the main deliverable)

Produce in this order, keep to one page:

1. Publishing this week (day, channel, title, stage)
2. Overdue / at risk (was due, days in stage, action: complete / reschedule / cut)
3. Schedule gaps (channel + date range + 2-3 backlog options)
4. Repurpose opportunities (piece published in window -> new format and channel)
5. Next-week preview (stage per piece; mark "needs idea" slots)
6. Recommended actions today (top 3 only)

Template and procedure: `references/weekly-brief-and-gap-detection.md`.

## Cadence

Table fields: Channel, Frequency, Day/Time, Status (active / paused / planned). Rules:

- Fewer channels, done consistently, beat many channels done sporadically. Add a channel only after the existing ones hold cadence.
- Build in buffer: skip a recurring week (e.g. the first week of each month) and keep one or two finished pieces in Scheduled as a reserve.
- Align publishing day to when you can finish work, not to an abstract "best time"; verify timing preferences against your own metrics.

## Repurposing (summary)

Scan pieces published in the last 60 days (default) for candidates; log each in a queue (Original, Original Channel, Repurpose As, Target Channel, Status). Re-cut for the target channel; do not paste across. Launch sequence for a major long-form piece: Day 0 publish, Day 1 short post with the main insight linking back, Day 2 thread/post expanding 3 key points, Day 5 newsletter mention, Day 14 check for a Part 2 angle. See `references/repurposing-batching-series.md`.

## Backlog and idea hygiene

- Idea note minimum: Angle (one sentence), Channel, Why now, Hook, Related. Name notes `topic-slug`.
- Too many ideas: rank by effort vs. impact (and relevance to a cluster) before committing; commit only to what fits the next 2-3 weeks of cadence slots. Ranking is a judgment heuristic, not a formula.
- Seasonal or time-sensitive items: flag visibly in Notes and state an explicit publish window (e.g. "must publish Dec 28-30"); schedule them first, then fill around them.
- Series: define the arc up front (episode count and topics), give it an end point (open-ended series get abandoned), cross-link episodes, track as `#2 of 6`.

## Content debt and burnout

Log each miss: date, channel and title, reason, decision (catch up next week / skip / merge with next piece). Interpretation: one missed piece is normal; about five means the cadence is wrong for your capacity, so lower the cadence rather than push harder. Never stack catch-up pieces on top of the normal schedule.

## Quarterly audit and evergreen upkeep

Every quarter: list last 90 days by channel, find top and zero-response pieces, look for shared format/topic/length patterns, compare planned vs. actual cadence, find unrepurposed top performers, prune underperforming channels. Output a one-page audit with next-quarter cadence and focus. Keep evergreen pieces in an index with Title, Channel, Published, Last Refreshed, Refresh Due. See `references/audit-evergreen-debt.md`.

## Failure modes and fixes

| Symptom | Fix |
|---|---|
| Calendar out of date | recurring weekly review; daily if publishing daily |
| Lose track of published work | move finished pieces to the archive section/folder at every review |
| Pieces sit in Draft | WIP cap, stall flag, timebox drafting blocks |
| Constant last-minute scrambling | keep 1-2 pieces buffered in Scheduled; batch drafting |
| Backlog bloat | weekly prune: cut ideas older than a few months with no cluster fit |
| Same topics repeating | check archive and cluster shares before picking ideas |

## Routing table

| Need | Read |
|---|---|
| File layout, templates for pipeline/cadence/backlog/archive/settings, content-type defaults | `references/pipeline-and-file-formats.md` |
| Weekly brief template, gap/overdue algorithm, rolling 14/30-day views, cluster balance | `references/weekly-brief-and-gap-detection.md` |
| Repurposing map, queue format, batching sessions, templates, series tracking | `references/repurposing-batching-series.md` |
| Quarterly audit, evergreen index, content debt log, burnout thresholds | `references/audit-evergreen-debt.md` |

## Assumptions to state when applying

- Thresholds and word counts are defaults; say which you used and invite tuning.
- If a store (file, sheet, board) already exists, adapt these fields to it instead of creating a second calendar.
- Today's date must be known to compute overdue and gap checks; state the date used in the brief.
