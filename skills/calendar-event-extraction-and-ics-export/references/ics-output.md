# Writing and Checking .ics Files (RFC 5545)

## File skeleton

```
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//example//schedule-export//EN
CALSCALE:GREGORIAN
X-WR-CALNAME:Spring Term
BEGIN:VEVENT
UID:3f2a...@schedule.local
DTSTAMP:20260301T080000Z
DTSTART;TZID=Europe/Berlin:20260217T101500
DTEND;TZID=Europe/Berlin:20260217T114500
SUMMARY:Compiler Principles
LOCATION:Building 101
DESCRIPTION:Teacher: Dr. Example\nWeeks: 1\,2\,3
END:VEVENT
END:VCALENDAR
```

`X-WR-CALNAME` is non-standard but widely honored for naming the imported calendar.

## Rules

| Topic | Rule |
|---|---|
| Line endings | CRLF (`\r\n`) on every line, including the last |
| Folding | Max 75 **octets** per line; continuation lines start with one space. Count UTF-8 bytes, never split a multi-byte character |
| TEXT escaping | `\` -> `\\`, `;` -> `\;`, `,` -> `\,`, newline -> `\n`. Do not escape the `:` after a property name or in `DTSTART` values |
| Required in VEVENT | `UID`, `DTSTAMP` (UTC, `...Z`), `DTSTART` |
| UID | Stable and deterministic: hash of name, location, date/slot. Re-importing replaces rather than duplicates. Add a domain-like suffix (`@schedule.local`) |
| DTEND vs DURATION | Use one, not both. `DTEND` is exclusive |
| All-day | `DTSTART;VALUE=DATE:20260309`, `DTEND;VALUE=DATE:20260314` for Mon-Fri (end = last day + 1) |
| Timed events | `DTSTART;TZID=<IANA>:YYYYMMDDTHHMMSS`, or UTC `YYYYMMDDTHHMMSSZ`. Never append `Z` to a local time |
| VTIMEZONE | Strict clients need a `VTIMEZONE` for each `TZID` used. Many clients resolve IANA names without it, but when the target is unknown either include one or write UTC |
| Multi-day same-time series | `RRULE:FREQ=DAILY;COUNT=N` on the first day |
| Weekly pattern | `RRULE:FREQ=WEEKLY;COUNT=N` or `INTERVAL=2` for alternating weeks; skipped weeks via `EXDATE` (same value type and zone as `DTSTART`) |
| Alerts | `BEGIN:VALARM` / `ACTION:DISPLAY` / `DESCRIPTION:...` / `TRIGGER:-PT1H` / `END:VALARM` inside the VEVENT. `-P1D` for one day before. Display alerts import more reliably than `ACTION:EMAIL` |
| Cancelled | `STATUS:CANCELLED` on the same UID, or remove the event |
| URL | `URL:https://...` property for the registration/join link (also repeat it in the description) |

## Expansion strategy for timetables

For irregular week sets (odd/even, gaps for holidays, explicit lists) emit **one VEVENT per occurrence** computed as `week1_monday + (week-1)*7 + weekday_index`. This is deterministic, needs no EXDATE logic, and is easy to verify against the week list. Use RRULE only when the pattern is a clean regular series and you want users to be able to edit the whole series.

With per-occurrence events, the UID must include the occurrence start so each differs.

Time zones: IANA names only, each occurrence's wall-clock time computed on its own date (rules in `calendar-scheduling-and-availability`, `references/timezones-dst.md`).

Validate that `week1_monday` is a Monday (`weekday_index`: Monday = 0). Holidays that shift dates are explicit user rules (dated groups or week exclusions), never inferred.

## Minimal standard-library writer (Python)

```python
import hashlib
from datetime import datetime, timezone

def esc(text: str) -> str:
    return (text.replace("\\", "\\\\").replace(";", "\\;")
                .replace(",", "\\,").replace("\r\n", "\n").replace("\n", "\\n"))

def fold(line: str) -> str:
    """Fold to <= 75 octets per physical line without splitting UTF-8 characters."""
    out, cur, size = [], "", 0
    for ch in line:
        n = len(ch.encode("utf-8"))
        limit = 75 if not out else 74  # continuation lines lose one octet to the leading space
        if size + n > limit:
            out.append(cur)
            cur, size = "", 0
        cur += ch
        size += n
    out.append(cur)
    return "\r\n ".join(out)

def uid(*parts: str) -> str:
    return hashlib.sha1("|".join(parts).encode("utf-8")).hexdigest() + "@schedule.local"

def vevent(uid_, start, end, tzid, summary, location="", description="") -> str:
    stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    lines = ["BEGIN:VEVENT", f"UID:{uid_}", f"DTSTAMP:{stamp}",
             f"DTSTART;TZID={tzid}:{start:%Y%m%dT%H%M%S}",
             f"DTEND;TZID={tzid}:{end:%Y%m%dT%H%M%S}",
             f"SUMMARY:{esc(summary)}"]
    if location: lines.append(f"LOCATION:{esc(location)}")
    if description: lines.append(f"DESCRIPTION:{esc(description)}")
    lines.append("END:VEVENT")
    return "\r\n".join(fold(l) for l in lines)

def calendar(name: str, events: list[str]) -> bytes:
    head = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//example//schedule-export//EN",
            "CALSCALE:GREGORIAN", f"X-WR-CALNAME:{esc(name)}"]
    body = "\r\n".join(head + events + ["END:VCALENDAR"]) + "\r\n"
    return body.encode("utf-8")
```

Write bytes (not text mode) so Python does not translate `\r\n` on any platform. Fixed-length folding by character count (for example `line[:75]`) is a common bug: it breaks on non-ASCII text because 75 characters can exceed 75 octets.

## Pre-delivery checks

1. Structure: `BEGIN:VCALENDAR` first, `END:VCALENDAR` last, balanced `BEGIN/END` pairs, `VERSION:2.0`, `PRODID` present.
2. Every VEVENT has `UID`, `DTSTAMP`, `DTSTART`; UIDs are unique across the file.
3. No physical line over 75 octets; all line endings CRLF (`grep -c $'\r'` equals line count).
4. `DTEND` is after `DTSTART` for every event.
5. Event count equals the number of occurrences implied by the manifest or confirmed candidates.
6. First and last occurrence of three or four representative events: weekday and date match the source (week-1 Monday arithmetic).
7. Optional: parse with any iCalendar library or import into a throwaway calendar; a parser error here beats a silent mis-import for the user.
8. Tell the user how to import (open the file in their calendar app, preferably into a new calendar so it can be deleted wholesale if wrong).
