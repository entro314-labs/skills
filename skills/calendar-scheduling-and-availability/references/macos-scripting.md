# Scripting local calendars on macOS

Two routes: AppleScript via `osascript` (Calendar.app scripting dictionary) and EventKit-based command-line tools. Both operate on calendars the OS has synced; Calendar.app handles provider sync.

## Limits to design around

- Attendee management is read-only through OS APIs; you cannot reliably send invites by scripting. Use a provider API for invites.
- Subscribed and birthday calendars are read-only; check `writable of calendar` before creating.
- Event IDs are scoped to the calendar; keep (calendar, id) pairs.
- Scripts are locale-sensitive: date strings parse differently under different system locales.

## AppleScript rules

- **Check the app is running** (error -600 "application isn't running" otherwise). Prefer `osascript -e 'application "Calendar" is running'`. If using `pgrep`, use an exact match: `pgrep -x Calendar`. A plain `pgrep Calendar` is a pattern match that also hits the always-running `CalendarAgent` daemon, so the app is never launched. Launch with `open -a Calendar; sleep 2`.
- **Pass user data as argv, never by string interpolation** (prevents AppleScript injection):

```bash
osascript - "$title" "$calendar" <<'APPLESCRIPT'
on run argv
  set theTitle to item 1 of argv
  set calName to item 2 of argv
  tell application "Calendar"
    set cal to calendar calName
    if not (writable of cal) then error "Calendar is read-only: " & calName
    -- ... make new event ...
  end tell
end run
APPLESCRIPT
```

- When stdin is already a heredoc, piping data into another interpreter in the same command is silently lost; hand JSON to a validator via an environment variable instead.
- **Validate before calling AppleScript:** hour 0-23, minute 0-59, durations and alarm offsets >= 0, ISO date zero-padded `YYYY-MM-DD`, month 1-12, day 1-31.
- **Build dates arithmetically, not from strings:** relative days: `set d to (current date) + N * days` then set `hours`, `minutes`, `seconds` to 0. This avoids locale parsing (EN/FR/DE differ).
- **Setting an absolute date on `current date` overflows:** setting `month` while `day` is 31 rolls into the next month. Set `day` to 1 first, then `year`, then `month`, then the real `day`. Test on a 31st.
- **All-day events:** `allday event:true`; use the same start and end date.
- **Alarm:** `make new display alarm at end of <event> with properties {trigger interval:-N}` (N minutes before start; negative value).
- **Recurrence:** set the event's `recurrence` property to an RRULE string, e.g. `FREQ=WEEKLY;INTERVAL=2;BYDAY=FR`.
- Support both absolute (`iso_date`) and relative (`offset_days`) inputs in your script's interface; do not hardcode dates in the script body.
- Log every write (timestamp, command, calendar, summary) to an append-only file.

## EventKit-based CLI rules

Applies to command-line calendar tools in general (check flags in your tool's help).

- **Row numbers are positional and reset with each listing.** For scripts and agents, capture the full event ID from JSON output and address events by ID with an exact-match option; mixing an ID option and a positional index should be an error.
- **Machine-readable output:** use JSON (`-o json` style) with `jq`; avoid parsing tables. Respect `NO_COLOR` / `--no-color` for logs.
- **Destructive commands:** non-interactive deletion needs a force flag; deleting a calendar removes all its events. Update commands often apply immediately without confirmation; dry-run or list the target first before bulk updates.
- **Import/export round trip:** export to `ics`, `csv` or `json`; use a dry-run on import and override the target calendar explicitly.
- **Natural-language dates** are fine interactively but resolve in local time with tool-specific conventions (see `date-resolution.md`); in automation pass ISO 8601 with offset.
- **Alerts and recurrence:** alerts as relative durations (`15m`, `1h`, `2d`), repeatable; clearing alerts and removing recurrence are explicit operations (e.g. alert "none", repeat "none"); a "span future" option edits this and later occurrences.
- **Pin tool versions in automation**; an unpinned `@latest` install can change flags under you.
- **Bare weekday names** (`monday`) resolve to the next occurrence; the same-day behaviour varies by tool, so test it or pass an absolute date.

## Interface choice and permissions

| Interface | Use when |
|---|---|
| EventKit-backed tool or Swift script | structured output, exact ID addressing, reliable recurrence and alerts, predicate-based bulk reads |
| AppleScript / `osascript` against Calendar.app | no extra tools, simple create/list; slower, locale-sensitive, filtering with `whose` on large calendars is slow (restrict the date window) |
| `.ics` file opened by the user | one-off import with confirmation in the UI; portable |

- The first run triggers a macOS privacy prompt (Calendars access, or Automation for the calling app). Empty results or errors usually mean the permission is missing (System Settings, Privacy and Security). `osascript` can block on that prompt: set a timeout in automation.
- argv avoids injection; for large or sensitive payloads use stdin or a file (argv is visible in the process list). JXA can read stdin JSON via `$.NSFileHandle.fileHandleWithStandardInput`.
- After writing, list the day and confirm exactly one new event with the expected times; recurrence through AppleScript is limited, so read the event back.

## Event payload contract (stdin JSON)

| Field | Type / rule |
|---|---|
| title | non-empty plain string |
| calendar | exact name (or ID) from the calendar list |
| description | optional string |
| day offset or ISO date | integer days from today, or `YYYY-MM-DD` (exactly one) |
| hour, minute | 0-23, 0-59 |
| duration | positive integer minutes |
| alarm minutes before | integer; 0 means no alarm |
| all-day | boolean (ignore hour/minute/duration when true) |
| rrule | optional RFC 5545 string, validated (see `recurrence-rrule.md`) |

Reject unknown fields and out-of-range values rather than coercing; abort before creating anything so no partial event exists.

## Backup, idempotence, hygiene

- Before bulk edits export a wide window (for example -1 year to +2 years) to JSON (restore) and ICS (portability) with a timestamped name; spot-check counts with `jq` afterwards; import ICS into a new calendar rather than over the original.
- Before creating, search the target calendar for an event with the same title and start so a retried script does not duplicate.
- Shell wrappers: `set -euo pipefail`, check every `osascript` exit code, surface stderr, return a non-zero exit naming the invalid field. Do not swallow errors.

## AppleScript date helper

```applescript
on makeDate(y, m, d, hh, mm)
    set theDate to current date
    set day of theDate to 1          -- avoid month overflow while setting
    set year of theDate to y
    set month of theDate to m
    set day of theDate to d
    set hours of theDate to hh
    set minutes of theDate to mm
    set seconds of theDate to 0
    return theDate
end makeDate
```

Create: `tell application "Calendar" to tell calendar "Work" to make new event with properties {summary:"Review", start date:startD, end date:endD, location:"Room 2"}`.

## Shell weekday arithmetic

See `date-resolution.md`. On macOS (BSD `date`) the final step is `date -v+${offset}d +%Y-%m-%d`; GNU equivalent `date -d "+${offset} days" +%Y-%m-%d`.

## Discovery and reads

List calendars with type (local, account-backed, subscribed, birthday) and writability; filter to writable; ask which when several personal calendars exist; refuse subscribed/birthday/holiday targets with a clear message. Use the stable calendar ID when display names collide across accounts. Free/busy merging rules: `free-slots-and-booking.md`. Some APIs return the recurring master, others occurrences; series edits need an explicit span (this only / future), default this-only and say so.

## Generating .ics as a fallback

When scripting is unavailable, write a minimal `.ics` file and let the user open it (one-off import with confirmation in the UI). Required properties, escaping, line folding and validation are in the extraction skill: `calendar-event-extraction-and-ics-export` (`references/ics-output.md`).

## EventKit CLI details (generic)

- List commands print row numbers and cache them in a state file; `show N`, `update N`, `delete N` read that cache, and every list call overwrites it. Scripts must use IDs:

```bash
EVENT_ID=$(caltool today -o json | jq -r '.[0].id')   # caltool = your EventKit-backed CLI
caltool show --id "$EVENT_ID"
caltool delete --id "$EVENT_ID" --force
```

- `delete` typically prompts unless forced; `update` often has no prompt, so confirm in the calling logic.
- Typical event JSON fields: `id`, `title`, `start_date`, `end_date`, `calendar`, `calendar_id`, `location`, `notes`, `url`, `all_day`, `recurrence`, `alerts`. Field names vary by tool; read a sample first.
- Event IDs are calendar-scoped; the prefix before `:` is often the calendar ID.
- Backup/restore: export to JSON and ICS, import into a named calendar.
