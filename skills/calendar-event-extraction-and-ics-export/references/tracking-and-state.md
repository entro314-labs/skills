# Processed-Item Tracking, Undo and Logs

Persist state in a small local file (JSON or similar) so reruns are idempotent. Never keep it only in conversation memory.

## Processed-items index

| Field | Purpose |
|---|---|
| `source_id` | Message ID, file hash, or source-cell ID (key) |
| `processed_at` | Timestamp |
| `outcome` | `created`, `updated`, `skipped`, `rejected`, `no-events`, `pending` |
| `event_ids` | Calendar event IDs created from this source |
| `summary`, `date` | For the second-level duplicate lookup |
| `reason` | Why skipped or rejected |

Rules:
- Check the index before parsing a message; skip with a logged reason if present.
- Mark an item processed only once its outcome is final (created, declined by the user, skipped by pattern). Presented-but-unanswered items are `pending`.
- Route every create/update/delete through one write function that performs the write, records `source_id -> event_id` with action and timestamp, and appends to the change log. Updates, cancellations and undo then use the recorded event ID, not a title search.
- Record **rejected** and **no-events** outcomes too, otherwise the same mail is re-presented on every run.
- The `source_id` to `event_ids` mapping is what lets a follow-up message ("moved to 3 pm", "cancelled") update or remove the right event.
- For files (timetables, screenshots), key by content hash so a renamed copy is recognized and a changed file is not.

## Pending candidates

Candidates that were presented but not answered are stored as `pending` with a counter. Remind on the next run; after 3 ignored reminders auto-dismiss (log it). Never create a pending item without confirmation, however many times it was shown.

## Undo

- Keep a change log entry per create/update/delete with a change ID (`chg_YYYYMMDD_HHMMSS_NNN`), the before-state for updates, and the event IDs.
- Support: list recent changes, undo last, undo by change ID. Undo window: 24 hours.
- Undo of an update restores the stored before-state; undo of a create deletes the event; undo of a delete recreates it from the stored snapshot.
- Show the change ID in every "done" report.

## Activity log

One log per session: session start, each skip with reason, each created/updated event with action, session end with counts. Lets the user audit what was skipped and why.

## Source disposition

After a confirmed create/update, optionally move the source message out of the unread/inbox state (archive or label) when the user has enabled that behavior. Do it only for processed messages, never for skipped or pending ones, so unhandled mail remains visible.

## Reporting

End every run with: counts (created, updated, skipped, rejected, pending), the list of changes with change IDs, anything that needs the user's decision, and how to undo.
