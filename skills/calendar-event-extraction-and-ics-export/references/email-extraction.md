# Email and Message Extraction Reference

## Intake modes

| Mode | Scope | When |
|---|---|---|
| Forwarded-only | Only messages with `Fwd:` or forwarded-message headers | Default for personal inboxes; lowest false-positive rate |
| Direct scan | Any message with date/time/meeting cues | Opt-in; expect many non-events |

Process by arrival/unread state, not by the date in the header. A `newer_than` style filter tests the original message date, so a forward of an old invite looks stale and is missed.

## Pre-filters (before any candidate is shown)

1. Message ID already in the processed index: skip, log reason `already-processed`.
2. Subject begins `Accepted:`, `Declined:`, `Tentative:`: calendar response, not an event. Skip (and, if the workflow has one, route to separate reply handling).
3. User ignore patterns (sender, subject keywords) match: skip. Auto-create patterns are honored only if the user configured them explicitly; even then require high confidence and a passed duplicate check, and list every auto-created entry in the report. Never add or loosen a pattern on your own.
3a. Event date already in the past: treat as stale and skip (a forward of an old invite is not an event).
4. Strip quoted content: From/Date/Subject/To/Cc/Bcc header lines, "Forwarded message" / "Original message" separators, "On <date> <person> wrote:", "Sent from my ...".

## Cues

| Kind | Cues |
|---|---|
| Event phrases | "Meeting on <date> at <time>", "Join us on", "You are invited to", "Please attend", "Mark your calendar", "Save the date", `When:` / `Date:` / `Time:` labels |
| Event keywords | meeting, call, sync, standup, review, demo, interview, appointment, conference, workshop, webinar, training |
| Action items | `Action:`, `Task:`, `Todo:`, `Follow-up:`, "Please ...", "needs to", "must", "should"; `- [ ]`, `*`, bullet lists. With "by / due / before <date>" they become deadline candidates |
| Deadlines | "RSVP by", "Register by", "Registration closes", "Tickets available until", "Get tickets by", "Early bird ends", "Must respond by", "Sign up by", "Deadline:", "Due by", "Last day to <action>" |
| Cancellations | "Cancelled", "Canceled", "Postponed", "Rescheduled", "No longer happening", "Won't take place" |

## Candidate record

| Field | Rule |
|---|---|
| title | <= 80 chars, specific ("Q3 Planning Review", not "Meeting") |
| dates | ISO; one or several |
| day_of_week | Always computed from the date, shown to the user |
| start / end | 24h; default 09:00-17:00 when absent (mark as default) |
| is_multi_day | true for runs like "Feb 2-6" |
| is_recurring + pattern | Record the phrase; decide expansion explicitly |
| confidence | high = explicit date and time; medium = one inferred element; low = relative or partial date, or conflicting text |
| urls | Always scan; keep the most relevant (registration or join link) |
| deadline_date / deadline_action / deadline_url | Present only when a deadline phrase matched |
| source_id | Message ID; used for dedup and updates |
| proposed_action | new / update / duplicate / cancel |

## Date parsing

- Accept: "January 15, 2026", "Wednesday January 15", ISO `2026-01-15`, ranges "Feb 2-6", and numeric dates.
- Numeric ambiguity: `01/15/2026` is unambiguous (15 > 12). `03/04/2026` is ambiguous: ask. Do not infer from sender locale alone.
- If the stated weekday and date disagree ("Wednesday January 15" but the 15th is a Thursday that year), do not pick one: flag it and ask. The mismatch usually means a wrong year or a typo in the source.
- Relative expressions resolve against the sent date of the message. Show the result.
- Times without a zone are the user's local zone. A named zone is copied into the description as text.

## Deadline handling template

Main event description:

```
*** ACTION REQUIRED: REGISTER BY 2026-03-01 ***
Event Link: https://example.org/register

<extracted details: agenda, location, dial-in, notes>
```

Reminder event:

| Field | Value |
|---|---|
| Title | `DEADLINE: Register for Spring Workshop` |
| Date | the deadline date |
| Time | 09:00-09:30 |
| Alerts | 1 day before and 1 hour before (display alerts import most reliably) |
| Description | action, URL, link back to the main event title |

If the deadline date is already past, say so in the presentation and do not create the reminder.

Notifying the user about deadlines outside the conversation (email, push) is off by default; do it only on an explicit setting and only for action-required deadlines.

## Duplicate and update logic

Lookup order (stop at first hit):
1. Source message ID in the tracked mapping.
2. Tracked event summary (normalized: lowercase, no `Fwd:`/`Re:`, collapsed whitespace).
3. Calendar search on the candidate date.

Duplicate test: same date AND similar title (semantic) AND overlapping time. On a hit, propose an update (changed time, location, link) instead of a new entry. If the existing event differs materially (different time, different venue), present the diff and ask.

## Cancellations and changes

1. Find the tracked event via the message-ID mapping or the lookup order above.
2. Propose either delete or title prefix `CANCELLED` (prefix keeps a visible trace; deletion is cleaner). Let the user choose if unspecified.
3. For "Rescheduled", present old and new date side by side as an update.
4. Apply only after confirmation.

## Presentation template

```
Found 3 candidate events in 2 messages:

1. Q3 Planning Review - Wed 2026-01-14, 10:00-11:00 - Room 4 - confidence high [new]
2. Spring Workshop - Mon 2026-03-09 to Fri 2026-03-13, 09:00-17:00 (default) - confidence medium [new]
   Deadline: Register by Sun 2026-03-01 -> adds reminder DEADLINE: Register for Spring Workshop
3. Team Offsite - Fri 2026-02-06, 09:00-17:00 - matches existing "Team Offsite" [update: add location]

Reply with numbers, "all", or "none".
```
