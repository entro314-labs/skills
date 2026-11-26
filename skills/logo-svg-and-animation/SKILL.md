---
name: image-graphics-creative-logo-svg-and-animation
description: Build SVG logo systems (square icon container, outlined wordmark, stacked and horizontal lockups, mono and color variants) and animate logos as Lottie JSON, GIF or MP4 with loop validation. Use when designing or cleaning up a logo as vector files, defining lockup spacing and minimum sizes, or turning an existing logo into a seamless looping animation for web, email or social.
---

# SVG Logo Systems and Logo Animation

Two jobs, one pipeline: (1) produce a logo system as clean SVG; (2) animate that logo and export it without loop glitches. Always finish job 1 before starting job 2; animation reuses the outlined SVG geometry.

## Routing

| Need | Read |
|---|---|
| Base shapes, compound icons, grids, complexity budget, distinctiveness tests, square-container procedure | `references/logo-construction.md` |
| Wordmark type category, tracking, weight, case, outlining | `references/wordmark-typography.md` |
| Lockup spacing math, viewBoxes, minimum sizes, color modes, metadata JSON | `references/lockups-and-export.md` |
| SVG file rules, QA checklist, contrast on backgrounds | `references/svg-output-and-qa.md` |
| Motion brief, profiles, easing, patterns, text handling, troubleshooting | `references/logo-animation.md` |
| Lottie JSON structure, render order, GIF/MP4 encoding, loop and structure validators, size targets | `references/lottie-render-and-loop-validation.md` |

## Part 1: Logo system

### Deliverables
Icon, wordmark, stacked lockup, horizontal lockup, all as SVG vectors (`icon.svg`, `wordmark.svg`, `lockup-stacked.svg`, `lockup-horizontal.svg`), plus a small metadata file (brand name, colors, viewBoxes, typeface, minimum sizes) if the consumer wants it machine-readable.

### Request intake
Extract: brand name (required), icon direction, style direction, typeface direction. Ask only when the brand name is missing or an open choice would materially change the result. Otherwise pick defaults, state them, and proceed.

### Non-negotiable rules (in priority order)
1. **Black first.** Design and judge the mark in solid `#000000` on white. If it fails there, color will not save it. Add color last.
2. **One thing.** Exactly one memorable feature per logo. Multiple competing ideas read as noise at small size.
3. **Square icon container.** The icon artboard is always 1:1 (default `viewBox="0 0 512 512"`). If the mark is not square, add negative space; never stretch or distort the mark to fill the square. Minimum rendered size 16x16 px.
4. **Geometric foundation.** Build from base shapes on a grid (circular, modular, or 1:1.618), even for organic forms. Do not draw freehand.
5. **Single path.** Icon reducible to one compound path; no effects in the primary mark (no gradients, shadows, bevels, 3D).
6. **Outlined text only.** Never ship live `<text>`. Convert glyphs to paths after kerning and tracking are final.
7. **Scalability test** at 16, 32, 64 and 256+ px. The icon must keep its defining detail at 16 px.
8. **Consistent spacing** across all lockups (one spacing unit, see below).

### Build order
Concept (what is the one thing?) -> primary base shape -> grid -> build from shapes -> reduce until it cannot be simpler -> single compound path -> test in black -> test at 16 px -> only then color variants -> wordmark -> lockups.

### Lockup quick reference
Spacing unit `U = icon width / 8`.

| Item | Stacked | Horizontal |
|---|---|---|
| Arrangement | icon above, wordmark below, both centered | icon left, wordmark right, vertically centered |
| Aspect | 1:1 up to portrait | 3:1 to 4:1 (5:1 only with a reason) |
| Gap icon/wordmark | 4U (0.5x icon width); up to 8U (1x) if it looks cramped | 2U to 4U; start at 2U, widen for dense icons |
| Wordmark size | width <= 1.5x icon width | cap height roughly matches icon body; icon not dwarfed |
| Clear space around lockup | >= 2U all sides | >= 2U all sides |
| Safe area padding in artboard | 10% | 10% |
| Minimum size | 48 px / 20 mm wide | 80 px / 40 mm wide |
| Suggested viewBox | `0 0 512 512` (or `512 640`) | `0 0 1024 256` |

Icon-only minimum: 16 px / 10 mm. Details and the reason behind the gap choice are in `references/lockups-and-export.md`.

Optical alignment beats mathematical alignment: nudge pointed/triangular marks so they look centered, shrink and add space around dense icons (they look heavier), nudge wordmarks with descenders (g, y, p, q) up slightly.

### Color variants every lockup must ship
Full color; single black `#000000`; single white `#FFFFFF` (for dark backgrounds); single brand color. The mono versions are derived from the same paths, not redrawn.

### Wordmark essentials
- One typeface, one weight, no script faces for primary marks, no trendy display faces that date quickly.
- Match category to brand register (geometric sans = tech; neo-grotesque = corporate; humanist = consumer/education; Didone = fashion/luxury; transitional serif = finance/law/heritage; slab = industrial). Details and tracking/weight/case guide in `references/wordmark-typography.md`.
- Icon and wordmark complexity trade off: complex icon -> simple, heavy wordmark; simple icon -> wordmark may be more distinctive.
- Confirm the font licence permits logo use before outlining; prefer open-licensed faces when the logo must be freely reusable.

### SVG hygiene (before delivery)
One layer, no empty groups, redundant points removed, no `transform` attributes (bake into path data), all text outlined, `viewBox` matches content bounds plus intended padding, inline `fill` attributes (no embedded `<style>` blocks), no editor metadata. Open each file in a browser at 16 px and 512 px and on dark and light backgrounds.

### Anti-patterns
Literal depictions (fork for a restaurant, tooth for a dentist); shapes with no conceptual link to the brand; mixing too many shape languages; different spacing ratios per lockup; wordmark too long to survive small sizes; centered text beside a left-aligned icon; busy backgrounds behind the logo; extreme tracking that collapses at small sizes; mixed weights inside one wordmark.

### Delivery checklist
- [ ] Works in solid black
- [ ] Legible at 16 px
- [ ] Wordmark outlined, one compound path
- [ ] Same spacing unit in every lockup
- [ ] One memorable feature; fits the industry
- [ ] No unnecessary groups or transforms
- [ ] All four color variants present

## Part 2: Logo animation

### Decide the motion before touching keyframes
Answer three questions: brand personality, emotion to evoke, motion metaphor. Then pick: which properties move (position, scale, rotation, opacity), easing that matches personality (ease-out = confident, overshoot = playful), timing that matches emotion (fast = energetic, slow = elegant). When the request is vague, choose an intent and build; do not interrogate.

| Intent | Keyframes | FPS | Easing | Typical duration |
|---|---|---|---|---|
| Subtle / corporate | 8-12 | 30 | ease-in-out (0.42 / 0.58) | 1.5-2 s |
| Playful | 12-20 | 30-60 | overshoot / bounce | 1-1.5 s |
| Bold / attention | 15-25 | 60 | overshoot (0.34 / 1.56) | 0.8-1.5 s |
| Organic / continuous | 25-45 | 60 | 0.25 / 0.75 | ~3 s loop |
| Cinematic | 50-120 | 60-120 | custom | 3-5 s |

These are starting points, not measured optima. **Never use linear easing for logo motion** (reads as mechanical); the exception is constant-rate rotation loops, where linear is required for a seamless cycle.

### Rules that prevent the usual failures
1. **Loop seam.** The last keyframe value must equal the first for every animated property, and the loop point must not hold a duplicate frame. A visible jump or stall at the seam is the most common defect. Validate before full render.
2. **External assets while developing.** Reference image assets by path (`e: 0`) during development and rendering; embed (`e: 1`) only after a successful render and keep the external version for edits. Paths resolve relative to the JSON file's directory.
3. **Never recreate logo text** with a drawing library; glyphs will differ. Use the outlines from the logo SVG.
4. **Do not render a full SVG and crop it.** Export each element at its needed size; cropping gives fuzzy edges and large files.
5. **Right-size assets.** Full logo 500-600 px; icon elements 100-200 px; text elements 200-300 px. Do not use 1000 px sources for small elements.
6. **Preview first.** Render the first 30-60 frames, inspect, then render in full.
7. **Sanity-check output.** A rendered file under ~1 KB is a failure.

### Multi-element timing
Simultaneous entrance (all start at frame 0) for a cohesive brand feel; staggered entrance (secondary element delayed 15, 30 or 45 frames at 60 fps = 0.25, 0.5, 0.75 s) for storytelling. 30 frames is the common stagger.

### Single-element patterns
| Pattern | Duration | Properties |
|---|---|---|
| Fade + gentle scale | 1.5 s | opacity 0 -> 100, scale 95 -> 100 |
| Bounce entrance | 1.2 s | position, scale, opacity |
| Scale pulse (loop) | 3 s | scale 100 -> 103 -> 100 |
| Smooth rotation (loop) | 10 s | rotation 0 -> 360 |
| Wiggle / jello | 0.8 s | rotation +/-5 degrees oscillation |

### Pipeline
Define motion philosophy -> analyze logo (text present? multiple elements? SVG or raster?) -> prepare assets -> write Lottie JSON -> validate structure -> validate loop -> preview render -> full render -> optional embed -> export GIF/MP4 if needed. Full commands and checks: `references/lottie-render-and-loop-validation.md`.

### Animation checklist
- [ ] Motion philosophy stated (personality, emotion, metaphor)
- [ ] Logo structure analyzed; text handled via outlines
- [ ] External asset references in use; element sizes in range
- [ ] Profile and timing strategy chosen; no linear easing
- [ ] Preview rendered before full render
- [ ] Loop seam validated (first vs last frame, every property)
- [ ] Output sizes within target for the destination
