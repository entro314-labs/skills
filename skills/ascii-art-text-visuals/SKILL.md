---
name: image-graphics-creative-ascii-art-text-visuals
description: Create ASCII and Unicode box-drawing art, text diagrams, banners, bordered boxes, progress bars, shading and ANSI-colored terminal output. Use when output must be plain text (README, code comment, terminal, commit message, chat) or when deciding between a text diagram and a real diagram/image; covers glyph palettes, alignment, display width, fallbacks and accessibility.
---

# ASCII Art and Text-Based Visuals

Text art is a grid problem: every glyph occupies one cell in a monospace font, and every bug is a row whose cell count differs from its neighbours. Decide the medium first, pick one glyph family, build on a strict grid, then verify widths programmatically instead of by eye.

## 1. Text or real diagram?

| Situation | Choose |
|---|---|
| Output lives in a terminal, code comment, README, commit message, plain-text email, chat | Text art |
| Small structure (under ~10 nodes, mostly linear/tree/box-in-box), must diff cleanly in git | Text art |
| Many nodes, crossing edges, curved or long labels, needs editing by others | Real diagram (Mermaid, Graphviz/DOT, PlantUML are text-source tools that render to SVG/PNG) |
| Rendered in a proportional font or variable-width UI (slides, rich-text docs, emails in HTML) | Real diagram or image; text art will break |
| Photo-like or colored illustration for a page | Image, or a canvas/SVG |
| Art is the only carrier of information for the reader | Add a text summary regardless (see section 8) |

Rule of thumb: if you cannot guarantee a monospace font and fixed width, do not use text art. If the diagram will be maintained, prefer a text-source diagram language and let a renderer do alignment; if it must be readable raw, draw it by hand.

## 2. Process

1. Name the subject and the medium (plain text, markdown code fence, terminal, source comment).
2. Pick the form: bordered box, banner/header, flow diagram, tree, bar/gauge, or illustration.
3. Pick one glyph family (single, double, thick, or rounded lines) and one shading ramp. Do not mix families inside one artwork except deliberately (for example double outer frame, single inner dividers).
4. Draft on a fixed-width grid. Decide the total width up front (80 columns is the safe maximum for terminals, 72 to 76 for code comments and email).
5. Verify: every row of every box has identical display width (script in `references/alignment-and-width.md`).
6. Test in the target environment and font. Provide a plain-ASCII fallback if Unicode support is uncertain.
7. Save as UTF-8 in the right container (section 7).

## 3. Character palette by role

| Role | Glyphs | Notes |
|---|---|---|
| Single-line box | `┌ ┐ └ ┘ ─ │ ├ ┤ ┬ ┴ ┼` | Default choice; most widely rendered |
| Double-line box | `╔ ╗ ╚ ╝ ═ ║ ╠ ╣ ╦ ╩ ╬` | Emphasis, outer frames |
| Thick box | `┏ ┓ ┗ ┛ ━ ┃ ┣ ┫ ┳ ┻ ╋` | Headings, 3D-looking text |
| Rounded corners | `╭ ╮ ╰ ╯` with `─ │` | Only the four corners exist; joins still use `├ ┤ ┬ ┴` |
| Shading ramp | `░ ▒ ▓ █` (light to heavy) | Depth: foreground `█`, mid `▓`, back `░` |
| Dot ramp | `· ∙ ∘ ○ ●` | Softer than blocks |
| Partial blocks | `▀ ▄ ▌ ▐ ▖ ▗ ▘ ▝ ▚ ▞ ▙ ▛ ▜ ▟` | Half- and quarter-cell edges, doubles resolution |
| Diagonals | `╱ ╲ ╳` | Often wider/taller than expected in some fonts; test |
| Markers | `○ ● □ ■ △ ▲ ▽ ▼ ◇ ◆` | Prefer these over `◯ ◻ ◼`, which are wider in many fonts |
| Arrows | `→ ← ↑ ↓ ↔ ↕` | Flow direction; ASCII fallback `-> <- ^ v` |
| Controls | `█ ░` bars, `☐ ☑ ☒` checkboxes, `( ) (•)` radios | |
| Decoration | `★ ☆ ✦ ♡ ♪` | Sparingly, never on a boundary column |

Unicode blocks for lookup: Box Drawing U+2500-257F, Block Elements U+2580-259F, Geometric Shapes U+25A0-25FF, Misc Symbols U+2600-26FF, Dingbats U+2700-27BF, Braille Patterns U+2800-28FF.

Plain-ASCII fallback set: corners and joints `+`, horizontals `- =`, verticals `|`, shading ` .:-=+*#%@` (light to dark), arrows `-> <- ^ v`, bars `#` and `.` or `=` and `-`.

## 4. Core layout patterns

Boxed text, all three rows the same width:

```
┌────────────┐
│ Build step │
└────────────┘
```

Vertical flow with a decision:

```
┌──────────┐
│  Input   │
└────┬─────┘
     ▼
┌──────────┐   no   ┌──────────┐
│ Valid?   ├───────►│  Reject  │
└────┬─────┘        └──────────┘
     │ yes
     ▼
┌──────────┐
│  Save    │
└──────────┘
```

Feedback loop: `[A] → [B] → [C]` with `↑` and a `└───┘` run returning to the start. Tree/fan-out: put the parent centered over a `┌──┴──┐` split with children on the next row.

Headers: underlined (`═` run under text, same length as text), boxed, or centered (indent text, `━` rule below).

Alignment of content inside a box: left (pad right), right (pad left), center (`left = (w - n) // 2; right = w - n - left`, extra space goes right). All of `w` and `n` are display widths, not `len()`.

Sizing rules:
- Pad every row to the full inner width with spaces before appending the right border; never rely on the editor to line things up.
- Use one space of horizontal padding inside borders; use consistent box widths for a column of boxes.
- Connectors (`│`, `┬`, `┴`) must sit on the same column as the box center or an agreed anchor column; count columns, do not eyeball.
- Keep labels short; abbreviate rather than wrap. Wrapped labels in boxes are the most common source of broken rows.
- Leave whitespace. Large dense shaded areas read as noise; reduce glyph variety first.

## 5. Illustration and shading

- Build shapes from stacked rows: tree = rows of `▲`/`/\` widening over a `│││` or `███` trunk; mountain = `/\` ladder; water = alternating `~` rows offset by two spaces.
- Depth: draw back layers first in `░`, then `▓`, then `█` in front; overwriting is easier than planning.
- Photo-like art: map luminance (0.0 to 1.0) to an index in a ramp ordered by ink density, light to dark, e.g. ` .:-=+*#%@`; invert the ramp for light-on-dark terminals. Correct for character aspect ratio (cells are about twice as tall as wide): halve the vertical sample rate. Use a real array/string index, not a dict of ranges.
- Higher resolution: half blocks (`▀ ▄`, one foreground and one background color = two stacked pixels per cell) or Braille patterns (2x4 dots per cell). Both depend on font coverage and color support; offer a coarser fallback.
- Large lettering: use a banner-font generator (figlet-style fonts are open source) rather than hand-drawing; verify each row width afterwards.
- Bars and gauges: fixed-width track with filled count `round(ratio * width)`, e.g. `[████████░░░░] 66%`; clamp ratio to 0..1.

## 6. ANSI color (terminal output only)

- Prefix `\033[` (or `\x1b[`), end sequence with `m`, reset with `\033[0m`. Close every colored span with a reset.
- Foreground 30 to 37 (black, red, green, yellow, blue, magenta, cyan, white); bright 90 to 97; background 40 to 47 (bright 100 to 107).
- Styles: 1 bold, 2 dim, 3 italic, 4 underline, 5 blink, 7 reverse, 8 hidden. Blink and italic are poorly supported; avoid them.
- Escapes are zero-width on screen but count in `len()`. Strip them (`re.sub(r'\x1b\[[0-9;]*m', '', s)`) before measuring or padding.
- Respect `NO_COLOR` and non-TTY output: emit plain text when stdout is not a terminal.
- Markdown, issue trackers and most chat renderers do not interpret ANSI. Put colored art in raw terminal output or a `.ansi` file and plain text in `.md`.

## 7. Pitfalls checklist

| Pitfall | Fix |
|---|---|
| Right border ragged | Measure display width, not `len()`; see `references/alignment-and-width.md` |
| Wide glyphs inside a box (CJK, most emoji, `✨`, `❤️`, `◯`) | Move off boundary rows or drop them; emoji with variation selectors have inconsistent widths |
| Ambiguous-width symbols (some arrows, boxes, geometric shapes) render 2 cells in CJK locales | Test target terminal; supply ASCII fallback |
| Proportional font | Wrap in a code fence/preformatted block; if impossible use a real diagram |
| Looks right in one font, crooked in another | Check in the font the reader will use; box-drawing glyphs may have gaps with some line heights |
| Tabs in art | Replace with spaces; tab stops vary |
| Trailing whitespace stripped by editor/linter | Only matters for right-aligned art with no right border; keep a border or glyph at the line end |
| Markdown eats leading spaces/blank lines or reflows | Use a fenced block (three backticks); in HTML use `<pre>` |
| Non-UTF-8 save/encoding | Save UTF-8; declare it in HTML (`<meta charset="utf-8">`) |
| Line wraps in narrow terminals | Ship a smaller variant; do not rely on wrapping |
| Shading reads as noise | Fewer glyph kinds, more blank space |
| Copy-paste of AI-drafted art | LLM output often has uneven rows; always run the width check |

Output container: `.txt` or a fenced block for plain art; `.ansi` or raw terminal for colored art; code comments stay ASCII-only when the codebase or toolchain may not be UTF-8-clean.

## 8. Accessibility and fallbacks

- Screen readers read box and block glyphs literally ("box drawings light vertical..."). Always add a one-to-three sentence text description of any diagram that carries information, ideally before the art.
- If the art is decoration only, say so by keeping it out of the information path (title and key facts in normal text).
- Offer a simplified or ASCII-only version when the art is the sole carrier of meaning.
- Do not encode meaning only in color.

## 9. Final check

- [ ] Medium and width decided; fits the narrowest target (80 columns unless stated).
- [ ] One glyph family; no stray mixed styles.
- [ ] Width check script passes on every row of every box.
- [ ] No wide or emoji glyphs on boundary columns.
- [ ] Fallback and text description present when needed.
- [ ] Saved as UTF-8 in the correct container.

## References

| File | Read when |
|---|---|
| `references/alignment-and-width.md` | Measuring display width, padding/centering helpers, a row-width verifier, ANSI stripping |
| `references/templates.md` | Copyable boxes, headers, flowcharts, trees, tables, progress bars, ramps, ASCII fallbacks |
