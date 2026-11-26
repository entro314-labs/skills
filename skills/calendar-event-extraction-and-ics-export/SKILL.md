---
name: productivity-calendar-event-extraction-and-ics-export
description: Turn emails, forwarded messages, school timetables, screenshots and PDFs into verified calendar entries or a checked .ics file. Use when extracting meetings, deadlines or class schedules, deduplicating against already-processed items, adding deadline reminders, normalizing a timetable (week-1 anchor, period-time table, odd/even weeks), or writing RFC 5545 iCalendar output. Enforces confirm-before-create and verify-before-export.
---

# Event Extraction and ICS Export

Two related jobs share one discipline: **extract, normalize, verify, confirm, then write**. A wrong calendar entry is worse than a missing one, because people trust their calendar without re-checking.

| Job | Input | Output | Depth |
|---|---|---|---|
| Email / message to events | emails, forwards, invitations, notices | confirmed calendar entries (+ deadline reminders) | `references/email-extraction.md` |
| Timetable to calendar | xls/xlsx, PDF, screenshot, OCR or pasted text | checked `.ics` | `references/timetable-normalization.md` |
| Writing the file | normalized events | valid `.ics` | `references/ics-output.md` |
| Processed-item index, undo, logs | any run | durable state | `references/tracking-and-state.md` |
| Failure tables, pre-write/pre-export checklists, run order, final report | any run | verified delivery | `references/pitfalls-and-checklists.md` |

## Core rules (apply to every run)

1. **Never create, update or delete a calendar entry without explicit confirmation in the current conversation.** Present numbered candidates, then stop. Accept "numbers", "all", or "none". Silence is not consent. Writing an `.ics` file to disk is not a calendar change, but still show the summary before declaring it final.
2. **Show the day of week beside every proposed date** (`Wed 2026-01-14`). It is the cheapest way for the user to catch a wrong date or year.
3. **Never guess silently.** If something is ambiguous and affects correctness, keep the candidate marked as needing confirmation and ask. If the source is explicit and deterministic, do not ask.
4. **Never let a later source overwrite an earlier one silently.** Keep both claims visible until resolved, with a source reference per event.
5. **Track what you processed** (message ID, file hash, or source-cell ID) so a rerun skips it and later messages about the same thing update instead of duplicate.
6. **Do not reuse school- or semester-specific settings** (period times, week-1 date, timezone) from another school or a previous term. Ask or take them from the user's input.
7. **Do not install anything or call external services without asking.** The export path should work on the standard library alone.

## Email-to-event workflow

1. **Select input.** Default to forwarded or explicitly supplied messages only; scanning a whole inbox is opt-in. Process all unread/new mail rather than filtering by the message's header date, because forwarded mail carries the original (older) date and gets missed by date-window filters.
2. **Skip already-processed items** by message ID against the processed index; log the skip with the reason.
3. **Skip non-events.** Ignore calendar response notifications (subjects starting `Accepted:`, `Declined:`, `Tentative:`): they answer existing invites. Apply user-configured ignore patterns before presenting anything.
4. **Strip quoted noise** before parsing: header blocks (From/To/Cc/Date/Subject), "Forwarded message" / "Original message" separators, "On ... wrote:" lines, signatures, "Sent from my ...".
5. **Extract candidates** with the fields in `references/email-extraction.md` (title, dates, weekday, times, multi-day, recurrence, confidence, URL, deadline).
6. **Resolve dates carefully** (see "Date and time rules" below).
7. **Check for existing entries**, cheapest first: tracked source message ID, then tracked summary, then a calendar search on that date. Mark each candidate `new`, `update`, `duplicate` or `cancel`.
8. **Present a numbered list** with title, `weekday date`, time, location/URL, confidence, deadline (if any) and the proposed action. Flag low-confidence items. Stop.
9. **Create/update only the confirmed items**; include all configured attendees on every create/update.
10. **Record** message ID to event ID mapping, log the action, and report what changed plus how to undo.

### Date and time rules

| Situation | Rule |
|---|---|
| No time given | Default 09:00-17:00 (an "all-day" item shown as an 8-hour block so it stays visible). State that it is a default. |
| `01/02/2026` | If one part is > 12 it is the day. If both parts are <= 12, ask; never pick by locale guess. |
| "next Tuesday", "in 3 days" | Resolve against the **message's sent date**, not today. Show the resolved date for confirmation. |
| Year missing | Pick the next occurrence on or after the message date; flag it. |
| Timezone named in text | Keep it in the description verbatim; do not convert silently. Times without a zone are the user's local zone. |
| Multi-day run ("Feb 2-6") | One series, not five unrelated entries: either one all-day event spanning the run, or a daily same-time series (`RRULE:FREQ=DAILY;COUNT=N`). |
| "every Monday", "weekly" | Pick one explicit behavior per candidate (create a recurrence, or note it in the description). Never expand a weekly pattern silently. |
| Cancel / postpone cues ("Cancelled", "Postponed", "Rescheduled", "Won't take place") | Find the tracked event; propose delete or title prefix `CANCELLED`. Needs confirmation like any other change. |

### Deadlines (RSVP, registration, tickets)

A deadline phrase ("RSVP by", "Register by", "Registration closes", "Early bird ends", "Last day to ...") means **two entries**, not one:

1. The **main event**, whose description starts with `*** ACTION REQUIRED: <ACTION> BY <DATE> ***`, then `Event Link: <URL>`, then the extracted details (omit lines that do not apply).
2. A **reminder event** titled `DEADLINE: <Action> for <Event Name>` on the deadline date, 09:00-09:30, with an alert one day before and one hour before.

If the action-item text says "by/due/before <date>" with no event, the reminder alone is the candidate. Always find the action URL.

### Duplicates

A candidate is a duplicate when **same date AND semantically similar title AND overlapping time**. Update the existing entry rather than creating a second. Why semantic plus time overlap instead of a keyword count: keyword rules are brittle ("Team Offsite" vs "Team Offsite 5-6pm" must match, "Review" vs "Design Review" must not blindly merge).

## Timetable-to-ICS workflow

Correctness first: normalize, verify, resolve ambiguities, verify again, export. Full detail in `references/timetable-normalization.md`.

1. **Collect required inputs.** Primary timetable source, class-period table (slot to start/end clock times), week-1 **Monday** date (if any weekly classes), timezone. Missing any of these means ask before a final export.
2. **Rank sources.** Machine-readable export > PDF/screenshot > supplemental notices > text pasted later. Prefer direct extraction over OCR when both exist.
3. **Normalize into a manifest** (JSON): one group per distinct (course, location, recurrence basis). Expand `1-8` and `9-16 even` to explicit sorted integer week lists. Explicit calendar dates stay `dated` groups.
4. **Account for every non-empty cell** with a source-entry checklist and run a two-way coverage check.
5. **Mark unsafe readings `needs_confirmation`** (for example `5,9 odd` must never become `5-9 odd`). Ask in small rounds: (1) timezone, period table, week-1 date; (2) week notation and source conflicts; (3) merge/split decisions.
6. **Generate the `.ics`** with the standard library, then **spot-check**: one normal weekly class, one odd/even class, one merged cross-slot class, one supplemental/weekend class.
7. **Report**: output path, items the user confirmed, remaining manual interpretations, whether verification used one source or several.

Merge two adjacent slots into one event only when course, teacher, location, day, week set all match and the slots are adjacent. Check the neighboring cell for the second half of a cross-slot class before finalizing a single slot.

Attendance reminders and prerequisite warnings go in a note field, never as fake meetings. Keep summaries short; put week rules, teacher and warnings in the description.

## ICS output essentials

Details and a runnable snippet are in `references/ics-output.md`. The rules that break imports most often:

- Lines end with **CRLF**; fold lines at **75 octets** (bytes, not characters) with a leading space on continuations, never splitting a multi-byte UTF-8 character.
- Escape `\`, `;`, `,` and newlines in TEXT values (`SUMMARY`, `LOCATION`, `DESCRIPTION`).
- Every `VEVENT` needs `UID` and `DTSTAMP`. Make `UID` deterministic (hash of identifying fields) so re-importing an updated file replaces events instead of duplicating them.
- `DTEND` is **exclusive**; all-day events use `VALUE=DATE` with end = last day + 1.
- Local times need either `TZID` with a matching `VTIMEZONE` block, or UTC (`...Z`). A bare `TZID` with no `VTIMEZONE` works in many clients but not all.
- Validate before delivering: re-parse the file, count events against the manifest, check weekday and date of the first/last occurrence.

## Verification before declaring done

- Every candidate or cell is accounted for (created, updated, skipped with reason, or rejected by user).
- Every proposed date shows its weekday and was confirmed.
- Week-1 Monday maps to the intended week; odd/even matches the source text.
- No conflict between sources left unresolved or hidden.
- Output file re-parsed; event count equals the manifest; spot-checks done.
- State and index updated so a rerun is idempotent.

## Common failure modes

| Failure | Fix |
|---|---|
| Created entries before the user answered | Always stop after the numbered list |
| Whole semester shifted by a week | Ask for the Monday of week 1, restate the baseline before export |
| Right weekday, wrong clock time (old period table) | Record the exact slot mapping in the manifest |
| Non-empty cell dropped because the course name already appeared | Checklist keyed by source cell, not by course name |
| One-off lab forced into weekly recurrence | Use a `dated` group |
| Forwarded mail missed | Do not filter by header date; process by arrival/unread state |
| Relative date resolved against today | Resolve against the message's sent date |
| Messy week notation tidied into a clean range | Preserve literal meaning, mark `needs_confirmation` |
