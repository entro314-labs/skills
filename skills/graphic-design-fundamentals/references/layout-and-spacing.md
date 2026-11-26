# Layout, Grid and Spacing Reference

## Grid types

| Type | Use |
|---|---|
| 12-column | Most flexible web grid; divisible by 2, 3, 4, 6 |
| 8-column | Focused, simpler layouts |
| Asymmetric | Editorial tension (e.g. 7/5 or 8/4 splits) |
| Modular (rows + columns) | Dashboards, catalogs, calendars |
| Manuscript (single column) | Long-form reading |
| Hierarchical (no uniform columns) | Landing pages, posters; placed by importance |

```css
.grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 24px; max-width: 1200px; margin-inline: auto; }
.span-4 { grid-column: span 4; }
.span-8 { grid-column: span 8; }
.sidebar-layout { display: grid; grid-template-columns: 2fr 1fr; gap: 24px; }
```

Collapse to a single column (or 4-column on mobile) at small widths; keep side gutters at 16px minimum on phones.

## Composition checklist

- One focal point; everything else supports it.
- Rule of thirds for focal placement; golden ratio (1:1.618) for proportions of regions, image crops, sidebars.
- Flow: F (content-heavy), Z (minimal, CTA bottom-right), diagonal (posters), circular (contained marks and logos).
- Negative space is deliberate; it reduces cognitive load, forms groups, signals luxury.
- Tension through off-center offsets, asymmetric weight, unequal spacing, scale contrast; deliberate grid breaks sparingly.
- Symmetry for trust and formality; asymmetry for energy.

## Gestalt rules as layout decisions

| Principle | Apply |
|---|---|
| Proximity | Space inside a group < space between groups |
| Similarity | Same function = same size, color, shape |
| Continuity | Align elements along shared axes; edges form lines the eye follows |
| Closure | Viewers complete implied shapes; logos can omit parts |
| Figure-ground | Subject must separate clearly from background |
| Common region | Cards, panels, rules group contents |
| Symmetry | Reads as one object; use for trust, break for energy |
| Common fate | Things that move or point the same way read as related; chevrons, expand icons and hover motion must match the flow (back = left-pointing, accordion arrow rotates on open) |
| Pragnanz (good form) | The eye takes the simplest reading; if a plainer form says the same thing, drop the extra gradient, shadow or ornament |
| Uniform connectedness | Visible links (line, border, shared fill) group more strongly than proximity; use when spacing alone fails (steppers, breadcrumbs, tooltip anchors) |

Typical Gestalt defects to flag: label closer to the previous field than its own; icon and label gap so wide they read as two items; primary and secondary CTA styled alike; light-gray text on white (ground wins over figure); busy hero image under white text with no scrim; modal with weak backdrop dimming; card padding equal to the gap between cards. Fix pattern: inner gap at most half the outer gap.

## Hierarchy stack and signals

- Per view: one level-1 element (message or action), 2-4 level-2 supporting items, everything else level 3.
- Size is the strongest signal: heading to subheading at least 1.25x, H1 to body about 2.5-4x; below 1.15x two elements read as the same level.
- Saturation ranks emphasis: brand or high-saturation color for the primary action, mid for supporting content, neutral for structure. Only one hue "shouts" at a time.
- Isolation signals importance: space above a section heading 2-3x the space below it.
- Failures: all one size (no entry point); 3+ level-1 items (paralysis); CTA buried in content (isolate with space, size, color); no space between levels (levels blur).

## Spacing system

Scale (px): 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Use only these.

| Relationship | Space |
|---|---|
| Within a component | 8-16 |
| Between related components | 24-32 |
| Between sections | 48-64 |
| Between page regions | 96-128 |

- Vertical rhythm: vertical spacing as multiples of body line-height.
- Horizontal: gutter and padding related (24 gutter with 24 or 48 padding; not 30).
- Paragraph spacing at least 1.5x font size where paragraphs are separated by space.

## Token block (pattern)

```css
:root {
  --space-1: 4px;  --space-2: 8px;  --space-3: 12px; --space-4: 16px;
  --space-6: 24px; --space-8: 32px; --space-12: 48px; --space-16: 64px;
  --space-24: 96px; --space-32: 128px;

  --text-sm: 0.875rem; --text-base: 1rem; --text-lg: 1.25rem; --text-xl: 1.563rem;
  --leading-tight: 1.15; --leading-normal: 1.5; --leading-relaxed: 1.7;
  --tracking-tight: -0.02em; --tracking-wide: 0.08em;

  --radius-sm: 4px; --radius-md: 8px; --radius-lg: 16px;
  --shadow-sm: 0 1px 2px hsl(220 25% 10% / .08);
  --shadow-md: 0 4px 12px hsl(220 25% 10% / .12);

  --duration-fast: 150ms; --duration-normal: 250ms; --duration-slow: 400ms;
  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
}
```

Pick one radius family and one shadow family per product; mixing sharp and pill shapes without a rule reads as inconsistent.

## Alignment details

- Baseline-align text across columns (`align-items: baseline`) for headers and running heads.
- Optical alignment: circles and triangles overshoot straight edges slightly; large quotation marks and headlines hang into the margin.
- Icons share one grid (e.g. 24px box, 2px stroke, consistent corner radius).
- Align to the grid or to another element; free-floating items need a reason.

## Responsive layout notes

- Test at 320, 768, 1024, 1440 widths.
- Reorder by importance, not by DOM order accident; keep the focal element visible above the fold on phones.
- Scale type fluidly (`clamp()`), spacing in steps, images with `aspect-ratio` and `object-fit`.
