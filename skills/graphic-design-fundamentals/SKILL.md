---
name: image-graphics-creative-graphic-design-fundamentals
description: Core principles for visual and graphic design work: brief analysis, hierarchy, composition, grids, spacing, color systems, typography, accessibility, print and format specs, and SVG/CSS-based creation. Use when designing or critiquing posters, landing pages, layouts, brand assets, cards, packaging, or any graphic built in SVG, HTML/CSS or code.
---

# Graphic Design Fundamentals

Decide the intent first, then build structure -> type -> color -> detail -> motion. Every choice must serve one stated emotion and audience; decoration that does not is removed.

## Routing

| Need | Read |
|---|---|
| Palette construction, harmony, roles, contrast math, dark mode | `references/color.md` |
| Type scale, pairing, leading/tracking, OpenType, fluid type, leading trim, type-as-art | `references/typography.md` |
| Grids, composition, Gestalt, spacing scale, tokens | `references/layout-and-spacing.md` |
| Poster, editorial, card, brochure, menu, packaging, large-format, signage specs | `references/format-specs.md` |
| Inline SVG and CSS snippets (text on path, ghost type, outlined type, drop cap, kinetic type) | `references/svg-css-patterns.md` |
| Accessibility checklist and pre-delivery QA | `references/accessibility-and-qa.md` |
| QR codes: payload formats, error correction, size, quiet zone, logo overlay, export, batch | `references/qr-codes.md` |

Multi-domain briefs read the union (landing page = layout + typography + color + accessibility).

## 1. Process

1. **Analyze the brief.** Extract explicit needs and implicit ones (audience, medium, constraints). Name the domain (web, print, social, packaging, data, brand).
2. **State the emotion.** Write the target feeling, the levers that produce it (temperature, weight, spacing, contrast, texture, motion) and the choices that would undermine it.
3. **Check context.** Viewing distance (phone, desktop, billboard, print in hand), neighboring content, viewer state of mind (scanning vs reading).
4. **Commit to one aesthetic direction** before opening any tool. A named direction (e.g. "editorial, warm, high-contrast serif") beats a blend of five.
5. **Pick the technical approach by output.**

| Output | Approach |
|---|---|
| Static web graphic, logo, icon, diagram | SVG, or HTML/CSS |
| Interactive visualization | HTML + JS (SVG/Canvas) |
| Print | Vector source exported to PDF, CMYK, bleed (see format specs) |
| Presentation | Slide format of the target tool |
| Generative | Canvas or p5.js |
| 3D | WebGL via a library (pin a current version) |

6. **Build in order:** structure and grid -> typography -> color and imagery -> details -> motion. Fixing hierarchy after color is painted is expensive; get it right in grayscale first.
7. **QA** with the checklist in `references/accessibility-and-qa.md`.

## 2. Visual hierarchy

One focal point per composition. Rank levers by impact and use the strongest ones for the most important element:

1. **Size** (biggest reads first)
2. **Contrast** (against its surround, in value and in color)
3. **Color** (warm and saturated advance, cool and desaturated recede)
4. **Weight**
5. **Position** (top-left first in left-to-right scripts; optical center sits slightly above geometric center)
6. **Isolation** (whitespace around an element signals importance)
7. **Detail** (sharper, more textured elements pull attention)

Test: blur or squint at the design (or view at thumbnail size). The intended order of attention must survive. If two elements compete, demote one rather than promoting both.

Use at most 3 levels of emphasis in one view (primary, secondary, tertiary). More levels flatten the hierarchy.

## 3. Composition

- **Thirds and golden ratio** are starting guides for placing the focal point and sizing regions (1:1.618), not rules to satisfy mechanically.
- **Reading flow:** F-pattern for content-heavy pages; Z-pattern for minimal pages with a CTA at bottom-right; diagonal for posters; circular for contained marks.
- **Negative space is an element.** It groups, reduces load and signals premium. Do not fill space because it is empty.
- **Controlled tension** creates energy: off-center placement, asymmetric weight, unequal spacing, extreme scale contrast (100px+ beside 10-12px), a single deliberate grid break. Use sparingly; one break reads as intent, five read as error.
- **Gestalt as layout rules:**
  - Proximity: tight within a group, loose between groups (the single most useful rule).
  - Similarity: same function = same treatment.
  - Continuity: align elements on shared invisible axes.
  - Common region: a card or panel groups its contents.
  - Figure-ground: ensure the subject separates clearly from the background.
  - Symmetry conveys stability and trust; break it for energy.

Details: `references/layout-and-spacing.md`.

## 4. Grid and spacing

- Web default: 12-column grid, 24px gap, container max ~1200px. Other types: 8-column (focused), modular (dashboards, catalogs), manuscript (single column long text), asymmetric (editorial), hierarchical (posters, landing pages).
- **One spacing scale for everything:** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 px. Arbitrary values (30px, 22px) break rhythm.
- Progressive spacing: inside a component 8-16; between related components 24-32; between sections 48-64; between page regions 96-128.
- Vertical rhythm in multiples of the body line-height; keep gutter and padding in a clear relationship (24 gutter with 24 or 48 padding).
- Every element aligns to the grid or to another element. Optical alignment (round shapes overshoot, large type hangs slightly into the margin) overrides mathematical alignment when they disagree.

## 5. Color

- Work in HSL for thinking, hex/rgba for output, CMYK only for print.
- **60-30-10:** 60% dominant surface, 30% secondary, 10% accent. The accent only works when scarce.
- Harmony recipes (hue offsets): monochromatic (vary S and L), analogous (within ~30 deg), complementary (180), split-complementary (complement +/- 15), triadic (120). Pick one; pair with neutrals.
- Temperature: warm = energy, urgency, appetite; cool = calm, trust, technology; neutrals = sophistication.
- Define **roles, not swatches** as CSS custom properties: surface, text, brand, semantic (success/warning/error/info), border. Components reference roles only.
- Tune lightness per hue: saturated yellows and greens look lighter than blues and purples at equal HSL lightness. Build neutrals with a faint tint of the brand hue rather than pure gray.
- **Contrast (WCAG 2.x):** body text 4.5:1; large text 3:1 (24px regular or ~18.66px / 14pt bold); UI components, icons and meaningful graphics 3:1 against adjacent colors.
- Never convey meaning by color alone (add icon, label, pattern, position). Check protan/deutan/tritan simulations.

Details, scales and dark mode: `references/color.md`.

## 6. Typography

- **Scale:** modular ratio 1.25 (major third) by default; 1.333 or 1.5 when hierarchy must be dramatic. Body never below 16px on screen.
- **Measure:** 45-75 characters per line (ideal ~66); `max-width: 65ch` for body.
- **Leading:** body 1.5-1.75; headings 1.1-1.3; display 0.9-1.1; UI/captions 1.3-1.5. Larger type needs tighter leading.
- **Tracking:** body 0 to +0.01em; large headings -0.01 to -0.03em; all-caps +0.05 to +0.15em (always open up uppercase); small text +0.02 to +0.05em.
- **Pairing:** contrast, not similarity. Serif + sans, geometric display + humanist body, one superfamily at different weights, mono heading + sans body. Avoid two similar serifs, two geometric sans, or two decorative faces. Two families maximum per piece.
- **Roles:** serif = editorial/authority; geometric sans = structured/technical; humanist = warm; grotesque = neutral/professional; mono = code/technical; display faces = headlines only, never body.
- Never justify web body text without hyphenation; check for rivers.
- Use tabular numerals in data tables (`font-variant-numeric: tabular-nums`).
- **Default avoidance:** do not reach for the same overused faces (Inter, Roboto, Arial) as an unconsidered default. Choose a face for the stated direction. Using one deliberately for a neutral UI is fine.
- Webfonts: self-host or use system stacks, subset, `font-display: swap`, metric-matched fallbacks to limit layout shift. Check licenses; many well-known families are commercial and cannot be assumed free to embed.

Details: `references/typography.md`.

## 7. Accessibility (design-time minimums)

- Contrast ratios as in section 5; focus indicators visible, at least 2px, 3:1 against adjacent colors.
- Body text 16px minimum, line-height at least 1.5, layout must survive WCAG 1.4.12 text spacing overrides (letter 0.12em, word 0.16em, line 1.5, paragraph 2x).
- Touch targets: WCAG 2.2 AA floor is 24x24 CSS px (2.5.8); design for 44x44 (AAA, 2.5.5; iOS) or 48x48 (Material).
- Logical keyboard order; no hover-only affordances; headings nest without skipping levels; decorative SVG `aria-hidden="true"`; informative SVG gets `role="img"` plus a title.
- Respect `prefers-reduced-motion` for any animation.

## 8. Anti-patterns (templated tells)

Remove these unless the brief calls for them:
- Purple-to-blue gradient on white as the identity.
- One default sans for everything with uniform sizing.
- Everything centered with identical spacing.
- Generic rounded cards with soft shadows in identical grids.
- Teal + coral as the default pair.
- Oversized hero with no tension or content hierarchy.
- Decorative blobs, gradients standing in for design decisions.
- Low-contrast gray text on white for "elegance".
- More than 2 type families, or more than 3 emphasis levels.
- Unaligned elements, inconsistent radii/shadows, arbitrary spacing.

## 9. Brand and asset conventions

- Define the system once as tokens (color roles, type scale, spacing, radius, shadow, duration, easing) and reference them everywhere; never hardcode repeated values.
- Naming pattern: `--space-N`, `--text-*`, `--leading-*`, `--tracking-*`, `--radius-*`, `--shadow-*`, `--duration-*`, `--ease-*`.
- Motion tokens: fast 150ms, normal 250ms, slow 400ms; default easing `cubic-bezier(0.4, 0, 0.2, 1)`. Animate transform and opacity only.
- Logos and marks: vector (SVG) master, provide light/dark variants, keep clear space around the mark of at least its own cap height, test at 16-32px and in one color.
- Repeated elements must be visually identical (same radius, stroke, padding, icon grid). Consistency is what reads as "designed".
- Exported assets: name by role and size; raster only for photographic content; provide 1x and 2x for raster UI assets.

## 10. SVG and CSS creation

- Prefer SVG for shapes, icons, diagrams, logos and decorative patterns: resolution independent, styleable with CSS, small. Set `viewBox`, omit fixed width/height so it scales, use `currentColor` and CSS variables for theming.
- Use CSS for layout, gradients, blend modes, text effects and animation; use SVG `<text>` for cross-browser outlined type and text on a path.
- Keep paths simple; round coordinates to 1-2 decimals; group with `<g>` and reuse with `<symbol>`/`<use>`.
- For print-scale mockups in SVG, use a scaled viewBox that preserves the real aspect (e.g. 890x510 for a 89x51 mm card).

Snippets: `references/svg-css-patterns.md`.
