# Weekly Brief and Gap Detection

## Procedure (run on the review day)

1. Fix "today" (state the date used) and confirm the calendar's last-updated date; if stale, update stages first.
2. Read the pipeline. Compute for each row: days in current stage, days to due date.
3. Apply detection rules (below).
4. Scan the next 14 days per channel for empty cadence slots.
5. Scan Published within the repurpose window (60 days default) for candidates.
6. Check cluster balance over the last 4 weeks.
7. Write the brief; limit "Recommended actions" to 3.
8. Update the calendar: move finished items to the archive, apply decisions (reschedule/cut), refresh stage values.

## Detection rules

| Check | Condition | Output |
|---|---|---|
| Stalled | stage in {Draft, Review} and days in stage > stall threshold (7) | list with days-in-stage |
| Overdue | due < today and stage != Scheduled/Published | list with days late |
| At risk | due within warning window (2 days) and stage earlier than Review | list |
| Blocked | Assigned To is external and stage is waiting on them | list with owner |
| Gap | a cadence slot in the next 14 days has no row | channel + date + 2-3 backlog options |
| Imbalance | cluster share below target over last 4 weeks | name cluster, suggest backlog ideas |
| Refresh due | evergreen Refresh Due within 30 days | list |
| WIP breach | Draft + Review count above cap | recommend finishing before new starts |

Feasibility check for each gap: an idea fits only if its remaining stage times (Outline 1-3 d, Draft 1-5 d, Review 1-2 d) fit before the slot. If none fits, recommend a repurpose from the queue, or skip the slot and log it in the debt log.

Every flagged item gets exactly one action: **complete** (with a new concrete date), **reschedule**, or **cut/merge**. Do not carry an item unchanged into the next brief a second time; two consecutive flags mean decide now.

Reschedule vs. cut heuristic: cut if the idea is no longer timely, has had no progress for two reviews, or can be merged into a nearer piece; reschedule if it fits a cadence slot within the next 2 weeks and the remaining work fits one session.

## Matching backlog ideas to gaps

For each gap: filter backlog by channel fit, then by cluster under-representation, then by effort (smaller effort first if the slot is within 3 days), then check the archive to avoid repeating a recent topic. Offer 2-3 options, not the whole backlog.

## Rolling views

- Weekly: next 14 days, gaps by channel, backlog matched to gaps.
- Monthly: rolling 30 days in three buckets: published, scheduled, missing.

## Weekly brief template

```
# Content brief: week of <YYYY-MM-DD>   (as of <today>)

## Publishing this week
| Day | Channel | Title | Stage |

## Overdue / at risk
| Title | Was due | Days in stage | Action (complete / reschedule / cut) |

## Schedule gaps
- <Channel>: nothing scheduled <date range>. Options: <idea 1>, <idea 2>, <idea 3>

## Repurpose opportunities
| Published piece | Date | Proposed format | Target channel |

## Next week preview
| Day | Channel | Title | Stage |   (mark "needs idea" slots)

## Recommended actions today (top 3)
1.
2.
3.
```

## Weekly review checklist

- [ ] Calendar reflects reality (stages updated, published items archived)
- [ ] Items due this week identified
- [ ] Draft/Review items older than threshold flagged with an action
- [ ] 2-3 backlog ideas surfaced for any gap
- [ ] Repurpose queue updated
- [ ] Buffer: at least one piece Scheduled beyond this week
- [ ] Top 3 actions chosen

## Automating the loop

The loop is tool-neutral: any recurring reminder or scheduled task that opens the calendar and runs this procedure works. Keep the checklist, not a particular tool's setup, as the contract.

Periodic-check prompt for any scheduler or reminder: "Review the calendar; flag items due this week; surface 2-3 backlog ideas; check for pieces in Draft or Review longer than the stall threshold; report only if something needs action." Add a cadence audit monthly: count pieces actually published per channel in the last 30 days, compare with planned frequency, then edit the cadence table or fix the cause (batching, scope).
