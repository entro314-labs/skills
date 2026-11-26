# Typography Reference

## Scale

Modular scale, 1.25 default (major third); 1.333 (perfect fourth) or 1.5 (perfect fifth) for dramatic hierarchy. Body >= 16px.

| Ratio | Name | Fit |
|---|---|---|
| 1.067 | minor second | dense UI, small screens |
| 1.125 | major second | conservative, general content |
| 1.2 | minor third | balanced, versatile |
| 1.25 | major third | clear hierarchy, most common |
| 1.333 | perfect fourth | strong hierarchy, marketing and hero |
| 1.414-1.5 | augmented fourth, perfect fifth | editorial, dramatic |
| 1.618 | golden ratio | classical; too large for most UI steps |

Use a smaller ratio on mobile (about 1.125-1.2) and a larger one on desktop (1.25+); cap prose at 65-75ch on very wide screens and stop scaling display sizes at a maximum.

| Role | Weight | Size | Leading |
|---|---|---|---|
| Display | bold-black | 40px+ | 0.9-1.1 |
| Heading | semibold-bold | 20-40px | 1.1-1.3 |
| Body | regular-medium | 16-18px | 1.5-1.75 |
| Caption / UI | regular-medium | 11-14px | 1.3-1.5 |

## Spacing of letters and lines

| Context | Tracking |
|---|---|
| Body | 0 to +0.01em |
| Large headings | -0.01 to -0.03em |
| All caps | +0.05 to +0.15em |
| Small text | +0.02 to +0.05em |

- Measure: 45-75 characters per line, ideal ~66 (hard limits 30 and 90). `max-width: 65ch`.
- Typographic color (the gray value of a text block) darkens with heavier weight, tighter leading, tighter tracking and larger size relative to leading. Even it out across a page so no block looks like a hole or a blot.
- Do not justify web body text. If you must, enable `hyphens: auto`, set `lang`, and inspect for rivers.
- Left-align (ragged right) for LTR body copy; center only short lines (headlines, captions, invitations).

## Font roles

| Class | Fits |
|---|---|
| Serif | editorial, long-form, authority |
| Geometric sans | structured, technical, modern |
| Humanist sans | warm, friendly, readable at small sizes |
| Grotesque / neo-grotesque | neutral, professional |
| Monospace | code, technical, brutalist |
| Display | headlines only; never body |

## Pairing

Pair fonts that differ clearly (contrast principle), and share some underlying quality (x-height, proportions, era).

Good: serif heading + sans body; geometric display + humanist body; bold grotesque + light serif; monospace heading + sans body; one superfamily at different weights (safest).

Avoid: two similar serifs; two geometric sans; two decorative faces; more than two families.

Other pairing shortcuts: faces from the same designer or the same era share proportions; a superfamily (serif plus sans designed together) is guaranteed harmony.

Pair test:
1. Stroke-weight difference visible at actual sizes.
2. x-height similar enough that mixed lines do not look mismatched.
3. Structural difference (geometric vs humanist) is intentional, not near-miss.

Open-source families with current names (use these, not retired names): Source Sans 3, Source Serif 4, IBM Plex family, Inter, Space Grotesk, Playfair Display, Lora, Merriweather, DM Sans, JetBrains Mono. Verify any commercial family's license (desktop, web, app are separate) before specifying it.

## Hierarchy starting points (CSS)

Starting points, not templates.

```css
/* Classic editorial */
.display { font: 700 3.5rem/1.1 var(--font-serif); letter-spacing: -0.02em; }
/* Modern minimal */
.display { font: 300 3rem/1.1 var(--font-sans); letter-spacing: -0.03em; }
/* Bold expressive */
.display { font: 900 clamp(3rem, 8vw, 7rem)/0.95 var(--font-sans); text-transform: uppercase; letter-spacing: -0.01em; }
```

## Fluid type

```css
:root {
  --text-base: clamp(1rem, 0.5vw + 0.875rem, 1.125rem);
  --text-5xl:  clamp(3rem, 6vw + 1rem, 8rem);
}
p { max-width: clamp(30ch, 50vw, 70ch); }
```

Keep a rem component in every `clamp()` so browser zoom and user font-size settings still scale the text.

## Variable fonts and OpenType

```css
.breathe { font-variation-settings: 'wght' 400; transition: font-variation-settings .4s; }
.breathe:hover { font-variation-settings: 'wght' 700; }   /* requires an actual variable font */

table { font-variant-numeric: tabular-nums; }              /* aligned columns */
h1    { font-variant-numeric: lining-nums proportional-nums; }
.alt  { font-feature-settings: 'ss01' 1; }                 /* stylistic set, if the font has it */
.lig  { font-variant-ligatures: common-ligatures discretionary-ligatures; }
```

Registered variable axes:

| Axis | Tag | Typical range | Use |
|---|---|---|---|
| Weight | `wght` | 100-900 | one file replaces many weights |
| Width | `wdth` | 75-125 | condensed text in tight containers |
| Slant | `slnt` | -12 to 0 | oblique without an italic file |
| Optical size | `opsz` | 8-144 | automatic stroke contrast by size; set via `font-optical-sizing: auto` |
| Grade | `GRAD` | font-defined (about -200 to 150) | changes stroke weight without changing advance widths, so no reflow |

Light text on a dark background looks bolder and dark-on-light looks thinner than intended. In dark mode, raise `GRAD` slightly (`font-variation-settings: "GRAD" 50`) or bump weight a notch (400 to about 450) rather than reflowing the layout; reduce it back in light mode.

Prefer high-level properties (`font-variant-*`, `font-weight`) over `font-feature-settings` / `font-variation-settings` where they exist. Uppercase: add letter-spacing rather than relying on small-cap variants combined with `text-transform`.

## Web-font delivery (vendor-neutral)

- Self-host WOFF2, subset to needed scripts, preload only the critical weight.
- `font-display: swap` (or `optional` for non-critical); define a fallback stack with metric overrides (`size-adjust`, `ascent-override`) to cut layout shift.
- Fewer weights: 2-3 per family is usually enough; a variable font replaces many static files.
- Budget (WOFF2, total): under 100 KB (2-3 files) for performance-critical pages, 100-200 KB for balanced, 200-400 KB only for type-led designs. A Latin or Latin Extended subset is roughly 30 KB against 150 KB or more for a full set; do not ship Cyrillic, Greek or Vietnamese ranges to an English-only site. Use `unicode-range` when several scripts are needed.
- Do not load fonts with CSS `@import` (it serializes the request and blocks rendering); use `<link rel="preload">` plus `@font-face`.
- System stack fallback: `system-ui, -apple-system, "Segoe UI", sans-serif`.

## Trimming font-metric whitespace (leading trim)

Every line box carries empty space above the cap height and below the baseline (ascent/descent and line-gap metrics). It makes optical alignment to grids, icons and buttons imprecise.

- Native: `text-box: trim-both cap alphabetic` (`text-box-trim` + `text-box-edge`). Support is not universal; keep an unchanged layout as the fallback.
- Build-time alternative: generate per-font CSS from the font's metrics (cap height, ascent, descent, line gap, units per em) that applies negative top/bottom offsets via pseudo-elements. Extract metrics from the font file for custom fonts; always include a metric-compatible fallback font in the stack.
- Trimmed text has no built-in breathing room: adjacent text blocks touch. Set spacing explicitly (flex/grid `gap`, margin) and never rely on line-height for separation.
- Bottom trim to the baseline clips descenders (g, y, p) on large headings with tight line-height. For display sizes trim only the top edge (or use an ink-based bottom edge) and keep the descender space.
- If generated CSS overrides a component library's type variables, load it after the library's stylesheet; wrong import order is the usual cause of "trim not applied".
- Verify by inspecting the computed variables on the root element and checking that text tops align to the grid lines.

## Type as art

| Technique | Notes |
|---|---|
| Scale contrast | 100px+ beside 10-12px; the gap is the effect |
| Weight contrast | hairline vs ultra-bold in the same line or lockup |
| Layered ghost text | very low opacity (3-4%) behind content; decorative, `aria-hidden` |
| Vertical text | `writing-mode: vertical-rl` for labels and spines |
| Outlined text | `-webkit-text-stroke` + transparent fill; for cross-browser use SVG `<text>` with stroke; keep strokes on large, heavy type |
| Text as mask | `background-clip: text` with transparent fill; keep a solid `color` fallback and check contrast |
| Drop cap | `::first-letter`, float left, ~3.5em, line-height 0.8 |
| Pull quote | italic display face, 4px left rule, larger than body, set apart with space |
| Numbered lists | `counter(x, decimal-leading-zero)` |

Kinetic type: per-letter span with stagger in 0.05s steps; typewriter via `steps()` on a `width` animation with `overflow: hidden; white-space: nowrap`; weight "breathing" with variable fonts. Wrap in `@media (prefers-reduced-motion: no-preference)`.
