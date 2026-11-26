# Character palettes

## Unicode ranges

| Range | Block | Use |
|---|---|---|
| U+2500-U+257F | Box Drawing | borders, joins, rounded corners, diagonals |
| U+2580-U+259F | Block Elements | shading, bars, pixel art |
| U+25A0-U+25FF | Geometric Shapes | bullets, markers, `■ □ ▲ ▼ ● ○ ◆` |
| U+2190-U+21FF | Arrows | `← ↑ → ↓ ↔ ↕` |
| U+2600-U+26FF | Miscellaneous Symbols | stars, hearts, cards (widths unreliable) |
| U+2700-U+27BF | Dingbats | decoration (widths unreliable) |
| U+27F0-U+27FF | Supplemental Arrows-A | long arrows |

## Borders and joins

| Weight | Corners | Lines | T and cross joins |
|---|---|---|---|
| Single | `┌ ┐ └ ┘` | `─ │` | `├ ┤ ┬ ┴ ┼` |
| Double | `╔ ╗ ╚ ╝` | `═ ║` | `╠ ╣ ╦ ╩ ╬` |
| Heavy | `┏ ┓ ┗ ┛` | `━ ┃` | `┣ ┫ ┳ ┻ ╋` |
| Rounded | `╭ ╮ ╰ ╯` | `─ │` (single) | single joins |

Dashed variants for secondary or optional edges: `┄ ┆` (triple dash), `╌ ╎` (double dash), `┈ ┊` (quadruple dash).

Mixed-weight joins (single/double): `╒ ╕ ╘ ╛ ╓ ╖ ╙ ╜ ╥ ╨ ╫ ╪`. Use only for deliberate weight changes; verify in the target font.

Pure-ASCII equivalents (use when Unicode is not guaranteed):

```
+--------+      corners and joins: +
| label  |      horizontal: -   or = for emphasis
+--------+      vertical: |
```

## Fill and shading

| Purpose | Ramp (light to heavy) |
|---|---|
| Block gradient | `░ ▒ ▓ █` (standard) |
| ASCII print ramp | `. : * # @` (extend: `. , : ; + * ? % S # @`) |
| Dot ramp | `· ∙ ∘ ○ ●` |
| Half and quarter pixels | `▀ ▄ ▌ ▐ ▖ ▗ ▘ ▝ ▙ ▚ ▛ ▜ ▞ ▟` |
| Hatching | `╱ ╲ ╳` or `/ \ X` |

Half-blocks (`▀ ▄`) give two vertical "pixels" per cell and are the best way to get near-square pixels in a terminal.

## Markers and decoration

| Use | Glyphs |
|---|---|
| Bullets | `• ◦ ▪ ▫ ■ □ ▸ ▹` |
| Checkboxes | `☐ ☑ ☒` ; ASCII `[ ] [x]` |
| Radio | `( ) (•)` ; ASCII `( ) (*)` |
| Status | `✓ ✗` ; ASCII `OK FAIL` |
| Stars, hearts, music, suits | `★ ☆ ✦ ✧` `♡ ♥` `♪ ♫` `♠ ♣ ♥ ♦` |

Width warning: anything in the Miscellaneous Symbols and Dingbats blocks may render double-width or fall back to an emoji presentation. Keep these out of aligned columns.

## Progress and meters

```
██████████░░░░░░░░░░ 50%       filled = round(pct/100 * N), rest = N - filled
[#####-----] 50%               ASCII fallback
▏▎▍▌▋▊▉█                       eighth-blocks for sub-cell precision (left-aligned fill)
▁▂▃▄▅▆▇█                       vertical eighths for inline sparklines
```

## Unicode to ASCII substitutes

| Unicode | ASCII |
|---|---|
| `┌ ┐ └ ┘ ├ ┤ ┬ ┴ ┼` | `+` |
| `─` / `═` | `-` / `=` |
| `│ ║` | `\|` |
| `▼ ↓` / `▲ ↑` | `v` / `^` |
| `▶ →` | `>` or `->` |
| `█ ▓ ▒ ░` | `# % : .` |
| `● ○` | `* o` |
| `☐ ☑ ☒` | `[ ] [x] [-]` |

## Width warning list

Avoid inside aligned regions: emoji (2 columns, plus variation-selector and ZWJ sequences with unpredictable width), CJK and fullwidth forms, and symbols some terminals draw as emoji (`⏏ ⌘ ✔ ❤ ⭐`). Ambiguous-width glyphs (box drawing, `● ○ ★ ☆ ◆ ■ → ↓`) are one column in Western locale settings and two in some East Asian ones; use ASCII if the audience may have such settings. Some fonts draw `▶ ◀` as emoji; prefer `→` or `>` if that happens.

Other useful ranges: eighth blocks `▁▂▃▄▅▆▇█` and `▏▎▍▌▋▊▉█` (within Block Elements), Braille Patterns U+2800-U+28FF (2x4 dot grid per cell for monochrome plots), line stubs `╴ ╵ ╶ ╷` and heavy `╸ ╹ ╺ ╻`.
