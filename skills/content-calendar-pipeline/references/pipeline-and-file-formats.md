# Pipeline and File Formats

Templates for a single calendar file. Adapt column names to an existing sheet or board if one exists; keep the fields.

## Folder layout

```
content/
  CALENDAR.md          # the single source of truth
  ideas/               # [topic-slug].md, one per idea
  drafts/
  published/           # finished pieces; optional [slug]-metrics.md per piece
  repurpose/queue.md
  templates/           # one reusable template per format
  evergreen/INDEX.md
  audit-[YYYY-Q#].md   # quarterly audits
```

Move finished pieces to `published/` and update the archive section at each weekly review.

## CALENDAR.md sections

Required: Active Pipeline, Publishing Cadence, Content Backlog, Published Archive.
Optional: Content Types, Settings, Topic Clusters, Active Series, Content Debt Log.

### Active Pipeline

| ID | Title | Type | Channel | Stage | Due Date | Notes |
|---|---|---|---|---|---|---|
| 014 | Why we cut weekly meetings | essay | newsletter | Draft | 2026-11-12 | needs one example |
| 015 | Quarterly review checklist | post | professional network | Outline | 2026-11-14 | seasonal: publish by Nov 30 |

Optional columns: Assigned To (collaboration), Revenue Type / Expected / Actual (monetized content).
Stages allowed: Idea, Outline, Draft, Review, Scheduled, Published (collaboration: add Final). Use only these values so filters and counts work.

### Publishing Cadence

| Channel | Frequency | Day/Time | Status |
|---|---|---|---|
| Newsletter | weekly | Tue 08:00 | active |
| Blog | 2 per month | Thu | active |
| Short social post | 3 per week | Mon/Wed/Fri | active |
| Video | monthly | - | planned |

Rule: cadence reflects what is actually sustained. Include buffer weeks (e.g. skip week 1 of each month) as a row note.

### Content Backlog (unscheduled)

| Idea | Channel | Cluster | Effort (S/M/L) | Impact (L/M/H) | Why now |
|---|---|---|---|---|---|

Effort/impact ranking is a judgment call: prefer low effort + high impact, tie-break by cluster under-representation and relevance now.

### Published Archive

| ID | Title | Channel | Published | Link/Path | Repurposed? |
|---|---|---|---|---|---|

### Content Types (defaults to tune, not platform rules)

| Type | Typical length |
|---|---|
| Newsletter | ~800 words |
| Blog post | 1,200-2,000 words |
| Professional-network post | 150-300 words |
| Short-post thread | 5-10 posts |
| Video script | 800-1,500 words |

Tune from your own performance data; platform behavior changes.

### Settings

```
Stall threshold: 7 days (Draft/Review)
Overdue warning: 2 days before due
Gap look-ahead: 14 days
Repurpose window: 60 days
Audit window: 90 days
Cluster window: 4 weeks
Refresh warning: 30 days
Max concurrent Draft+Review: 3
Review day: Monday
```

### Topic Clusters

| Cluster | Target share | Last 4 weeks actual |
|---|---|---|
| Example A | 40% | |
| Example B | 30% | |
| Example C | 20% | |
| Example D | 10% | |

Shares are an example; set your own and flag any cluster below target over the rolling window.

### Active Series

| Series | Channel | Cadence | Episode | Status |
|---|---|---|---|---|
| Field notes | newsletter | weekly | #2 of 6 | active |

### Content Debt Log

| Date | Missed (channel, title) | Reason | Decision |
|---|---|---|---|

Decision values: catch up next week / skip / merge with next piece.

## Idea note template (`ideas/[topic-slug].md`)

```
Angle: <one sentence>
Channel: <target>
Why now: <trigger, season, news, audience question>
Hook: <opening line or tension>
Related: <links to published pieces, cluster>
```

## Handoff brief (`drafts/[slug]-handoff.md`, one page max, for delegated pieces)

```
Goal:
Audience:
Tone:
Must include:
Avoid:
Length target:
Due:
```

## Data hygiene rules

- Put a `Last updated: YYYY-MM-DD` line at the top of CALENDAR.md and refresh it at every review.
- Cadence Status values: active, paused, planned, dropped. Encode buffer weeks in the cadence Notes so gap checks do not flag them.

- IDs are never reused.
- Dates are ISO (YYYY-MM-DD) so they sort and compute reliably.
- A row leaving Published stays in the archive; never delete, so audits and repurposing can find it.
- Seasonal/time-sensitive: put an explicit window in Notes with a visible flag, e.g. `SEASONAL: Dec 28-30`.
