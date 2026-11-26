# Layout math and verification

## Box sizing

```
label widths: L1..Ln        pad = 1 (spaces each side)
inner = max(Li) + 2*pad
box width = inner + 2
top    = ┌ + ─*inner + ┐
row    = │ + ' '*pad + label.ljust(inner - 2*pad) + ' '*pad + │
bottom = └ + ─*inner + ┘
```

Stacked boxes that must align: use the same `inner` for all of them (the maximum across the set).

Side-by-side boxes: compute each box's lines independently, pad shorter boxes with blank rows to equal height, then join row by row with a fixed gap string. For connectors between boxes, draw them on a row where both boxes have a border or label row.

Vertical connector from a box: replace one bottom-border `─` with `┬` at the label's center column, and the top-border `─` of the next box with `┴` (for joins to a bus) or leave the next top intact and end the line with `↓` above it.

## Padding, centering, box generation

```python
def pad(s, width, align="left"):
    gap = width - cells(s)
    if gap < 0:
        raise ValueError(f"{s!r} wider than column ({width})")
    if align == "left":
        return s + " " * gap
    if align == "right":
        return " " * gap + s
    left = gap // 2            # center: odd leftover goes to the right
    return " " * left + s + " " * (gap - left)

def box(lines, pad_x=1, style="single"):
    tl, tr, bl, br, h, v = {
        "single": "┌┐└┘─│", "double": "╔╗╚╝═║", "thick": "┏┓┗┛━┃",
        "round": "╭╮╰╯─│", "ascii": "++++-|",
    }[style]
    inner = max(cells(l) for l in lines) + 2 * pad_x
    out = [tl + h * inner + tr]
    out += [v + " " * pad_x + pad(l, inner - 2 * pad_x) + " " * pad_x + v for l in lines]
    out.append(bl + h * inner + br)
    return out
```

Raise on overflow instead of truncating: a label wider than its box is a design error. Center formula: `left = (width - w) // 2`, `right = width - w - left`, with `w` the display width. Use the same centering convention across one artwork. (`cells` is defined under Display width below.)

## Alignment of cell content

| Alignment | Python |
|---|---|
| Left | `s.ljust(w)` |
| Right | `s.rjust(w)` |
| Center | `s.center(w)` (extra space goes right) |

All three work by padding the cell string to column width before joining with `│`. For tables, compute column width = max display width of the column's cells, then build separators from the same widths.

## Display width

`len()` counts code points, not cells. With any non-ASCII content:

```python
import unicodedata

def cells(s: str) -> int:
    """Terminal cell width: wide/fullwidth = 2, combining marks = 0, else 1."""
    w = 0
    for ch in s:
        if unicodedata.combining(ch):
            continue
        w += 2 if unicodedata.east_asian_width(ch) in ("W", "F") else 1
    return w
```

Limits: ambiguous-width (`A`) characters, which include box-drawing and many symbols, are counted as 1 here; terminals configured for ambiguous-wide treat them as 2. Emoji with variation selectors or joiners (ZWJ sequences) are not handled reliably. If exact alignment is required, avoid both.

Pad with `s + ' ' * (w - cells(s))` instead of `ljust` when wide characters are possible.

## Checker

Pipe the art through this to catch over-wide lines, tabs, and ragged boxes (a line that starts a box with a top corner must have its matching right corner in the same column on every row down to the bottom corner):

```python
import sys, unicodedata

def cells(s):
    return sum(0 if unicodedata.combining(c) else
               2 if unicodedata.east_asian_width(c) in ("W", "F") else 1 for c in s)

lines = sys.stdin.read().splitlines()
RIGHT_EDGES = "┐┘┤╗╝╣┓┛┫╮╯│║┃+"
for n, line in enumerate(lines, 1):
    if cells(line) > 80:
        print(f"line {n}: {cells(line)} cells (> 80)")
    if "\t" in line:
        print(f"line {n}: tab character")
    # rows that start and end with a border char must share one width per block
    if line and line[-1] in RIGHT_EDGES and n > 1:
        prev = lines[n - 2]
        if prev and prev[-1] in RIGHT_EDGES and cells(prev) != cells(line):
            print(f"line {n}: right edge at column {cells(line)}, previous row {cells(prev)}")
```

The last check only compares adjacent rows that both end in a border; side-by-side boxes need a per-box check. Manual method when no script is handy: draft with a column ruler above the art (`0123456789` repeating), confirm each right border lands on the same column, then remove the ruler.

## Table construction

1. Column width = max display width of header and cells.
2. Pad every cell to column width, plus one space each side; left-align text, right-align numbers.
3. Join cells with `│`; rules are `─` x (width + 2) per column joined by `┬` (top), `┼` (middle), `┴` (bottom), with `├ ┤` at the ends.
4. Every rule line and data line must have the same total width.

For contexts without borders, columns aligned with two or more spaces are sturdier and easier to edit than drawn grids.

## Spacing and width budget

- One space of horizontal padding inside boxes; at least 2 blank columns between side-by-side boxes so connectors have room.
- Single flow direction (left-to-right or top-to-bottom); avoid long return lines.
- When nesting art in lists or quotes, indent the whole block uniformly; never re-pad individual lines.
- Budget: per box, widest label + 4 (borders + padding); plus ~4 between boxes. If boxes-per-row times that exceeds ~76 columns, stack vertically, shorten labels, or provide a narrow variant.

## Wrap-safe delivery

- Hard-wrap nothing inside art; keep it <= 80 columns so viewers do not wrap.
- In Markdown, use a fenced block; indent-code blocks also work but fences are safer.
- In code comments, prefix every art line with the comment leader and keep the art itself unchanged; stay within the project's line limit.
- When the same diagram appears at two widths, label them and keep both in sync after edits.

## Common defects and fixes

| Symptom | Cause | Fix |
|---|---|---|
| Right border ragged | Unequal padding, or wide char counted as 1 | Pad programmatically on display width; remove wide chars |
| Ragged only on some machines | Ambiguous-width glyphs in East Asian locale, or font fallback | Use ASCII, or keep ambiguous glyphs out of aligned regions |
| Tofu squares or `?` | Not UTF-8, or font lacks the glyph | Save as UTF-8; fall back to the ASCII set |
| Art collapses into a paragraph | Not in a code block; renderer reflowed it | Fence it |
| Skewed spacing | Proportional font or tabs | Monospace font; spaces instead of tabs |
| Right edge missing after commit | Trailing spaces trimmed | End rows on a visible character |
| Corners and joins mismatched | Mixed line weights | One style per artwork; whole-template conversion |
| Muddy / too dense | Heavy glyphs adjacent | Lighter ramp; whitespace between regions |
| Too sparse | Over-light ramp, tiny shapes | Heavier glyphs in focal areas only |
| Breaks at other widths | Layout hard-coded to one width | Provide a second width variant instead of stretching |
| Emoji sticks out of box | Emoji is 2 columns or fallback font | Single-width glyph or ASCII |

## Connector rules

- A vertical connector's `┬`, its arrowhead, and the target box's top-border center must share one column.
- Where two lines meet, use the join glyph for those weights and directions (`┬ ┴ ├ ┤ ┼`); a bare `─` touching a `│` looks broken.
- Use `┼` only when lines truly connect; box drawing has no "bridge" glyph for non-connecting crossings, so reroute instead.
- Prefer one bend per edge.
