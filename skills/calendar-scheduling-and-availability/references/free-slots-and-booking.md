# Free Slots, Conflicts and Safe Booking

## Calendar discovery

- List calendars first: id, display name, provider, writable, timezone.
- Use account-qualified IDs (`account/<id>`) when more than one account or provider is connected; a bare ID is only safe with exactly one. Some IDs contain slashes (CalDAV-style): split the routing prefix on the first slash only.
- Decide which calendars count as busy (work, personal) and which are informational (holidays, birthdays, subscribed feeds).

## Merging multiple calendars into free slots

Inputs: list of calendars, query window `[from, to)`, duration, working hours per participant, zone per participant, optional buffers, optional grid.

```
busy = []
for cal in calendars:
    for ev in cal.events(window):
        if ev.transparent or ev.cancelled or ev.declined_by_owner: continue
        if ev.tentative and not policy.count_tentative: continue
        busy.append((utc(ev.start) - buffer_before, utc(ev.end) + buffer_after))
busy.sort()
merged = []
for s, e in busy:
    if merged and s <= merged[-1].end:          # overlapping or touching
        merged[-1].end = max(merged[-1].end, e)
    else:
        merged.append([s, e])
free = []
for day in days(window, owner_zone):
    for (ws, we) in working_windows(day):        # converted per day, DST-aware
        cursor = ws
        for s, e in merged_overlapping(ws, we):
            if s > cursor: free.append((cursor, s))
            cursor = max(cursor, e)
        if cursor < we: free.append((cursor, we))
slots = [g for g in free if g.end - g.start >= duration]
slots = [snap_to_grid(g, grid) for g in slots]
```

Rules:

- Run the gap computation once per working-hours window (per day, in the owner's zone), not once over a multi-day span, or nights and weekends appear free.
- A conflict check on a single calendar misses events on the others; always check against the merged view.
- Work in UTC internally; render in each viewer's zone at the end.
- Working-hours windows are zone-local per date; building them as a fixed UTC range breaks across DST.
- Intersect working windows for multiple participants before subtracting busy time.
- Expand recurring events within the window before merging; include single-instance overrides and exclusions.
- Include all-day events only if they block (not holidays marked free).
- Cancelled events never block. Events the owner declined do not block.
- Respect minimum notice (do not offer slots starting within N hours of now) and a maximum horizon.
- Offer a handful of options (3 to 5) spread across days rather than all slots.
- Optionally prefer slots adjacent to existing meetings (reduces fragmentation) or protect focus blocks by treating them as busy.

## Privacy modes

| Mode | Exposes | Use for |
|---|---|---|
| Opaque | Merged free/busy only; no source-calendar counts, titles or attendees | Anything shared externally |
| Full | Which calendars are busy and why | Internal use by the owner |

Default to opaque unless the requester is the calendar owner.

## Conflict detection

Two events conflict when `a.start < b.end and b.start < a.end` (half-open). Check against all writable and relevant read-only calendars the owner wants respected, not only the target calendar.

On conflict:
1. Report the conflicting event's start/end (and title only if allowed).
2. Run the free-slot search in the same window.
3. Offer alternatives; let the user choose. Never book another time silently.

## Safe booking flow

```
book(calendar, start, end, title)
  0. CHECK    availability query (cheap, lock-free) -> report conflicts early
  1. LOCK     exclusive lock keyed by calendar + slot, short TTL
  2. VERIFY   re-read overlapping events and active locks for the slot
  3. WRITE    create the event at the provider
  4. RELEASE  release lock in a finally block
  5. READBACK confirm the event exists with the intended values
```

Behavior:

- Failure before WRITE aborts with no calendar change; the lock is always released.
- Two concurrent bookings for one slot: the first holder wins; the second re-verifies after acquiring and sees the first event.
- Lock TTL bounds the damage of a crashed holder. Keep it longer than the worst-case provider write time; if a write outlives the TTL another caller can acquire the lock mid-write.
- An in-process lock protects only callers in that process. Multiple processes, agents or devices against one account need a shared lock (or a provider-side mechanism such as an ETag/If-Match precondition or a deterministic event ID that makes duplicate creation fail).
- This is a single-write protocol, not distributed two-phase commit. A failure between the provider write and any local record leaves an event with no local trace; reconcile by re-reading the provider.
- Provider creation is non-idempotent. Before retrying after a timeout, search the target window for an event with the same title/start; if present, do not create again.
- CalDAV-style servers: create with a fresh UID and `If-None-Match: *` (fails if the resource exists); update or delete with `If-Match: <etag>` so a concurrent edit returns 412 instead of being overwritten.
- Availability shown to a user minutes ago is stale; re-check right before writing.
- Prefer a client-generated stable event ID/UID where the provider supports it, so a retry cannot create a second event.

- Merge first, then redact: never leak titles, attendees or locations in opaque mode.
- Keep list/query/free-slot operations read-only and idempotent; isolate create/update/delete/book as the only mutating operations and mark them non-idempotent in any tool definitions.

## Confirm-before-write protocol

Show: title, date and weekday, start-end with zone, duration, calendar, attendees (emails), location/link, recurrence, reminders. Wait for an explicit yes. A changed detail restarts the confirmation. For bulk operations, show the count and a sample and require confirmation of the whole set.

## Rescheduling and cancellation

- Reschedule = verify new slot first, then update; do not delete the old event before the new one is confirmed.
- Notify attendees through the provider's update mechanism rather than creating a second event.
- Deleting a recurring event: ask whether it is this instance, this and following, or all; default to the narrowest scope.
- Never delete or modify events the user did not name; list candidates and confirm.

## Proposing times to others

- Offer 2 to 4 options with zones named for the recipient.
- Show the draft message to the user before sending.
- Tentatively hold nothing without telling the user; holds are events and need the same confirmation.

## Failure checklist

| Symptom | Likely cause |
|---|---|
| Event an hour off | Naive datetime, fixed offset, or DST gap/overlap |
| Double booking | No shared lock, no pre-write verify, or retry after ambiguous failure |
| Free slot offered that is actually busy | A calendar not included, tentative events ignored, recurring instances not expanded, all-day events dropped |
| Free slot missing | Transparent events counted busy, buffers too large, working hours constant in UTC |
| Holiday blocks everything | All-day events marked busy; honor transparency |
| Series ends a day early | `UNTIL` not UTC or earlier than the last instance's UTC time |
