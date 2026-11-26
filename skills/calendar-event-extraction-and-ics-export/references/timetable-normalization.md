# Timetable Normalization, Manifest and Verification

## Inputs

| Input | Status | Notes |
|---|---|---|
| Primary timetable (xls/xlsx, PDF, screenshot, OCR text, pasted text) | required | |
| Class-period table (slot to start/end clock) | required | Never reuse another school's or a previous semester's table |
| Week-1 **Monday** date | required if any weekly class | The Monday of week 1, not the semester start date |
| Timezone (IANA name) | required | e.g. `Europe/Berlin`; do not default |
| Supplemental screenshots (labs, makeup, weekend) | optional | Treated as separate sources with their own ids |
| Second timetable for cross-check | optional | |
| Previous export | optional | Diff against it to catch drift |

Source priority: machine-readable export > PDF or screenshot > supplemental notices > text pasted later. Prefer direct extraction over OCR if both are available. If sources disagree, keep both claims visible and ask.

## Normalization rules

- One group per distinct (course name, location, recurrence basis). A cell holding two courses with different week rules is two groups.
- Expand ranges and parity to explicit integer week lists: `1-8` -> `[1..8]`; `9-16 even` -> `[10,12,14,16]`; `5-11 odd` -> `[5,7,9,11]`. Sort and de-duplicate.
- Ambiguous notation such as `1-4,6-8` versus `1-4 6-8`, or `5,9 odd` (a list, not a range) is `needs_confirmation`.
- Punctuation that can mean two things is not guessed. `5,9 odd` is not `5-9 odd`; mark `needs_confirmation`.
- Explicit calendar dates stay `mode: dated`; never force them into week/day arithmetic.
- Merge adjacent slots into one event only if course name, teacher, location, day and week set all match and the slots are adjacent. Otherwise keep separate.
- Before finalizing a single-slot class, look at the next slot's cell for the second half of a cross-slot class.
- Reminders ("attendance required", "bring laptop") and prerequisite warnings go into `note`, not into separate fake events.
- Event summary = short course name. Teacher, week rule, warnings go in the description.
- Location is a stable string with no week rules embedded in it; if one cell has several locations by week range, split into groups.

## Manifest schema (JSON, pre-export)

Top level:

| Key | Required | Notes |
|---|---|---|
| `calendar_name` | yes | |
| `timezone` | yes | IANA name |
| `week1_monday` | if any recurring group | ISO date; must actually be a Monday (validate) |
| `sources[]` | yes | `{id, kind, path, role}`; kind: xls, xlsx, pdf, image, ocr-text, chat-text; role: primary, supplemental, cross-check |
| `slots{}` | yes | `"1-2": {"start":"08:00","end":"09:40"}` |
| `courses[]` | yes, non-empty | see below |

Course fields:

| Field | Required | Notes |
|---|---|---|
| `name` | yes | |
| `teacher` | no | `""` if unknown |
| `location` | yes | stable string |
| `mode` | no | `recurring` or `dated`; inferred from fields if omitted, but write it explicitly |
| `day` | recurring | lowercase English weekday |
| `slot` | yes | must exist in `slots` |
| `weeks` | recurring | explicit sorted integer list |
| `date` / `dates` | dated | ISO; at least one |
| `note` | no | |
| `sources` | yes | list of source ids; or a stated reason in `note` if derived |
| `status` | no | `confirmed`, `needs_confirmation`, `derived` |

Slot keys: composite keys (`"5-8"`) may coexist with their parts (`"5-6"`, `"7-8"`). Convention: each cell references exactly one key; do not mix.

Example (illustrative values, not defaults):

```json
{
  "calendar_name": "Spring Term",
  "timezone": "Europe/Berlin",
  "week1_monday": "2026-02-16",
  "sources": [{"id":"main-xls","kind":"xls","path":"timetable.xls","role":"primary"}],
  "slots": {"1-2":{"start":"08:30","end":"10:00"},"3-4":{"start":"10:15","end":"11:45"}},
  "courses": [
    {"name":"Compiler Principles","location":"Building 101","mode":"recurring",
     "day":"tuesday","slot":"3-4","weeks":[1,2,3,4,5],"sources":["main-xls"],"status":"confirmed"}
  ]
}
```

## When to stop and ask

- Punctuation makes a week rule unclear.
- A cell mixes locations without week partitioning.
- A supplemental image conflicts with the primary source.
- A week number is given but no week-1 anchor date.
- Period numbers are given without clock times.
- Timezone is missing.
- A holiday or makeup rule changes correctness.
- Week-based and dated classes conflict in precedence.
- Two sources disagree, or a class appears in one source only.
- Adjacent slots have slightly different metadata.

Do not ask when the source is explicit and deterministic. Do not ask catch-all questions ("anything else wrong?") until concrete blockers are exhausted.

Poll in small rounds:
1. Timezone, period-time table, week-1 date (if recurring).
2. Week notation and source conflicts.
3. Merge/split decisions.

## Coverage check (two-way)

Keep a separate JSON file of source entries, one per non-empty cell or supplemental item:

```json
{"source_entries":[
  {"id":"cell-r3c4","source_id":"main-xls","description":"Compiler Principles Tue 3-4",
   "matches":[{"name":"Compiler Principles","mode":"recurring","day":"tuesday","slot":"3-4","weeks":[1,2,3,4,5]}]}
]}
```

- Each source entry must match at least one manifest group; each manifest group must be explained by at least one source entry.
- `source_id`, when set, restricts matching to groups whose `sources` list includes it.
- Matching is exact on every field present in `matches`; omit fields you do not want to constrain.
- One entry may list several `matches` when a cell intentionally splits into several groups.
- Failure labels: `entry` (checklist incomplete or no match), `provenance` (right shape, wrong source), `sources` (missing or unknown source id), `uncovered` (group with no explaining entry).

A coverage checker is a short script over the two JSON files; write one if none exists. Checking by course name alone is the classic way to lose a cell.

## Verification rounds

Round 1 (before asking or exporting):
- Every non-empty cell accounted for; no group dropped.
- Every manifest group is explained by a source entry or a stated derivation.
- Week-1 Monday maps to the intended week; compute the date of one known class and have the user confirm.
- Odd/even lists match the source text.
- Merged periods come from adjacent matching slots.
- Supplemental sources are incorporated or explicitly excluded.
- Week lists sorted and de-duplicated.

Round 2 (after answers): re-check only groups touched by answers, then rerun the full coverage pass. If a fix creates a new inconsistency, stop and surface it.

Pre-export order: confirm week-1 Monday and slot times -> normalize cells -> compare manifest to primary source -> add supplements and mark conflicts -> ask minimum questions -> rerun coverage -> generate `.ics` -> spot-check one normal weekly class, one odd/even class, one merged cross-slot class, one supplemental/weekend class.

## Pitfalls

| Pitfall | Fix |
|---|---|
| Dropping a non-empty cell because the course name already appeared | Checklist keyed by source cell |
| Turning messy week notation into a clean-looking range | Preserve literal meaning; `needs_confirmation` |
| Losing the second half of a cross-slot class | Check the adjacent cell; merge after metadata equality |
| Using semester start instead of week-1 Monday | Ask for the Monday; restate baseline before export |
| Reusing a previous period table | Record exact slot mapping in the manifest |
| Forcing a one-off session into weekly recurrence | `dated` group |
| Supplemental source silently replacing the main one | Per-course source references; surface conflicts |
| Holiday weeks | Exclude those weeks from `weeks` only if the source says so; otherwise ask |
| Non-portable dependencies in the happy path | Standard-library export; ask before installing parsers |
