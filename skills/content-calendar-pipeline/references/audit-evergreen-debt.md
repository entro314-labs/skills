# Quarterly Audit, Evergreen Upkeep, Content Debt

## Quarterly audit checklist

1. List everything published in the last 90 days, by channel.
2. Identify top performers (shares, replies, traffic, whatever signal you track).
3. Identify zero-response pieces.
4. Pattern analysis: which format, topic and length do top performers share? Compare with zero-response pieces to avoid survivorship bias.
5. Cadence review: planned vs. actual per channel; note what slipped and why.
6. Repurpose review: top performers not yet repurposed go into the queue.
7. Prune: drop or reduce channels that consistently underperform relative to effort.
8. Revisit cluster shares and Settings thresholds.

Output: one-page `audit-[YYYY-Q#].md`:

```
# Content audit <YYYY-Q#>
Published (90 days): <count per channel>
Top performers: <3 items + shared traits>
Zero-response: <items + likely cause>
Cadence: planned vs actual per channel
Repurpose next: <items>
Decisions: keep / reduce / pause per channel
Next-quarter cadence and focus: <table + one-line focus>
```

Metrics hygiene: record numbers per piece (date measured, metric, value); measure at a consistent age (e.g. 7 and 30 days after publishing) so pieces are comparable; roll Expected vs. Actual revenue up monthly if tracked.

Metrics are tracked outside the calendar, manually per piece (e.g. `published/[slug]-metrics.md`), and consulted here and when choosing repurposing candidates. Sample sizes are small for personal channels; treat patterns as hypotheses to test, not proof.

## Evergreen content

Keep evergreen pieces in `evergreen/` with an `INDEX.md`:

| Title | Channel | Published | Last Refreshed | Refresh Due |
|---|---|---|---|---|

- Set Refresh Due at publish time (commonly 6-12 months, shorter for fast-moving topics).
- Quarterly heartbeat: flag any piece whose Refresh Due falls within 30 days; create a pipeline row for the update.
- Refresh means checking facts, links, examples and dates, then updating Last Refreshed. A refreshed piece is a repurposing candidate (re-announce it).

## Content debt log

Table format and decision values (catch up next week / skip / merge with next piece): `pipeline-and-file-formats.md`, "Content Debt Log".

Thresholds (heuristic, not research-backed): one missed piece is normal. About five misses within a quarter is a cadence problem, not a discipline problem. Response: lower the cadence for the affected channel, add buffer weeks, or pause the channel; do not add catch-up load on top of the normal schedule.

## Burnout guards

- Buffer weeks in the cadence table (e.g. skip the first week of each month).
- Keep 1-2 finished pieces in Scheduled as reserve.
- Cap WIP (Draft + Review).
- Review the debt log in the weekly brief when it has open entries.
- Prefer pausing a channel explicitly (Status: paused, with a review date) over silently letting it lapse.
