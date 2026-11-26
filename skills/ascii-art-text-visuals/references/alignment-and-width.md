# Alignment and display width

## Why `len()` is wrong

`len(s)` counts code points. A terminal counts cells. They differ for:

| Case | Cells |
|---|---|
| ASCII, box drawing, block elements (usually) | 1 |
| CJK ideographs, fullwidth forms, most emoji | 2 |
| Combining marks, zero-width joiner, variation selectors (U+FE0E/FE0F) | 0 |
| Ambiguous-width symbols (some arrows, geometric shapes, box drawing) | 1 in most locales, 2 in East Asian locales/fonts |
| ANSI escape sequences | 0 (but counted by `len`) |

Variation selectors make `❤` vs `❤️` differ in width between terminals; avoid them in aligned art.

## Python helpers

```python
import re
import unicodedata

ANSI = re.compile(r"\x1b\[[0-9;]*m")

def cells(s: str) -> int:
    """Display width in terminal cells (ANSI stripped, East Asian wide = 2)."""
    s = ANSI.sub("", s)
    w = 0
    for ch in s:
        if unicodedata.combining(ch) or ch in "‍︎️":
            continue
        w += 2 if unicodedata.east_asian_width(ch) in ("W", "F") else 1
    return w

def pad(s: str, width: int, align: str = "left") -> str:
    gap = max(width - cells(s), 0)
    if align == "right":
        return " " * gap + s
    if align == "center":
        left = gap // 2
        return " " * left + s + " " * (gap - left)
    return s + " " * gap

def box(lines: list[str], align: str = "left") -> str:
    inner = max(cells(l) for l in lines) + 2          # one space padding each side
    top = "┌" + "─" * inner + "┐"
    mid = ["│ " + pad(l, inner - 2, align) + " │" for l in lines]
    bot = "└" + "─" * inner + "┘"
    return "\n".join([top, *mid, bot])
```

Notes:
- `east_asian_width` does not know that emoji with emoji presentation are wide in practice; for exact results use a library such as `wcwidth` (`wcwidth.wcswidth`). The stdlib version above is a dependency-free approximation that is correct for ASCII, box drawing and CJK.
- Treat ambiguous (`A`) as 1 unless the target is known to be an East Asian locale.

## Verifier for finished art

Run on the final text before shipping; every line inside a box must report the same width.

```python
import sys
rows = sys.stdin.read().splitlines()
widths = {cells(r) for r in rows if r.strip()}
print("OK" if len(widths) == 1 else f"MISMATCH widths={sorted(widths)}")
for i, r in enumerate(rows, 1):
    print(f"{i:3} {cells(r):3} {r}")
```

For multi-box layouts, check each box separately (or check that all rows of the full block have equal width when the layout is a rectangle).

## Manual column discipline

- Decide the anchor column of each connector first (`┬`, `┴`, `│`, `▼`), then draw boxes around it.
- Odd inner widths let a single glyph sit exactly centered; use odd widths for boxes that receive a vertical connector from the center.
- When centering with an odd remainder, put the extra space on the right consistently.
- Draw borders last: write contents padded to the inner width, then add the borders, so a content edit cannot shift a border.

## Other-language equivalents

- JavaScript: `[...str].length` counts code points, not cells; use a `string-width`-style library or `Intl.Segmenter` for grapheme clusters plus an East Asian width table.
- Shell: `printf '%-20s'` pads by bytes/characters, not cells; compute padding in a language with a width function for non-ASCII content.
