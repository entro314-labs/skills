# SVG and CSS Patterns

## SVG baseline

```html
<svg viewBox="0 0 200 100" role="img" aria-labelledby="t">
  <title id="t">Short description of the graphic</title>
  <!-- shapes -->
</svg>
```

- `viewBox` required; leave width/height to CSS so it scales.
- Decorative: `aria-hidden="true"` and no title.
- Theming: `fill="currentColor"` plus CSS variables (`fill: var(--brand-primary)`); dark mode then works by variable swap.
- Reuse: define in `<symbol id>` and instantiate with `<use href="#id">`.
- Strokes: `vector-effect: non-scaling-stroke` keeps stroke width constant under scaling; `stroke-linecap/linejoin: round` for friendly icons.
- Round path coordinates to 1-2 decimals.

## Text on a path

```html
<svg viewBox="0 0 400 200">
  <defs><path id="arc" d="M20,160 A180,180 0 0 1 380,160"/></defs>
  <text font-size="20" letter-spacing="2">
    <textPath href="#arc" startOffset="50%" text-anchor="middle">CIRCULAR LETTERING</textPath>
  </text>
</svg>
```

## Outlined text (cross-browser)

```html
<svg viewBox="0 0 600 140">
  <text x="0" y="110" font-size="120" font-weight="900"
        fill="none" stroke="currentColor" stroke-width="2"
        paint-order="stroke" stroke-linejoin="round">OUTLINE</text>
</svg>
```

CSS-only variant: `-webkit-text-stroke: 2px currentColor; color: transparent;` (supported in major browsers via the prefixed property; use SVG when exact stroke control matters).

## Background ghost type

```css
.ghost { position: absolute; inset: 0; display: grid; place-items: center;
  font-size: clamp(8rem, 30vw, 24rem); font-weight: 900; line-height: .8;
  opacity: .035; pointer-events: none; user-select: none; }
```

Mark `aria-hidden="true"`; keep opacity so low it never reduces content contrast.

## Text as mask

```css
.gradient-text { background: linear-gradient(90deg, var(--brand-primary), var(--brand-light));
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent; color: var(--brand-primary); }
```

Use heavy weights and large sizes; verify contrast at the lightest gradient stop.

## Drop cap and pull quote

```css
.dropcap::first-letter { float: left; font-size: 3.5em; line-height: .8; padding-right: .08em; font-weight: 700; }
.pullquote { font: italic 1.75rem/1.3 var(--font-display); border-left: 4px solid var(--brand-primary); padding-left: 24px; }
```

## Decorative numbered list

```css
ol.fancy { counter-reset: n; list-style: none; padding: 0; }
ol.fancy li { counter-increment: n; display: grid; grid-template-columns: 3rem 1fr; gap: 16px; }
ol.fancy li::before { content: counter(n, decimal-leading-zero); font-variant-numeric: tabular-nums; opacity: .5; }
```

## Kinetic type

```css
@media (prefers-reduced-motion: no-preference) {
  .letter { display: inline-block; opacity: 0; transform: translateY(0.4em);
    animation: rise .5s var(--ease-standard) forwards;
    animation-delay: calc(var(--i) * 0.05s); }
  @keyframes rise { to { opacity: 1; transform: none; } }

  .typewriter { overflow: hidden; white-space: nowrap; width: 0;
    animation: type 2s steps(24, end) forwards; }
  @keyframes type { to { width: 24ch; } }
}
```

Set `--i` per span (inline style). Split text into spans with `aria-label` on the parent so screen readers read the word once.

## Blend and overlay for image posters

```css
.hero { position: relative; }
.hero::after { content: ""; position: absolute; inset: 0;
  background: linear-gradient(to top, hsl(220 25% 8% / .85), transparent 60%); }
.hero h1 { position: relative; z-index: 1; color: white; }
/* alternative */ .tint { mix-blend-mode: multiply; }
```

## Motion rules

- Durations: 150ms micro-interactions, 250ms standard, 400ms larger transitions; easing `cubic-bezier(0.4, 0, 0.2, 1)`.
- Animate `transform` and `opacity`; avoid animating layout properties.
- Provide `prefers-reduced-motion` alternatives (remove or shorten movement, keep opacity fades).

## Token layers and shadows

- Two layers: primitive (`--blue-500`) and semantic (`--color-action`); components reference only semantic tokens. Dark mode remaps the semantic layer under `@media (prefers-color-scheme: dark)` plus a manual `[data-theme]` override.
- Shadows: layered, one light direction, blur and offset growing with elevation, e.g. `0 2px 4px rgb(0 0 0 / .06), 0 8px 16px rgb(0 0 0 / .08)`.
- Radius family: 4 / 8 / 12 / 16 / full (9999px).

## When to use which

| Need | Tool |
|---|---|
| Logos, icons, diagrams, illustrations | SVG |
| Gradients, shadows, blend effects, layout, type styling | CSS |
| Photographic content | Raster (WebP/AVIF/JPEG), not SVG |
| Complex generative or interactive scenes | Canvas or a graphics library |

## More SVG notes

- Icons: draw on an integer grid (24x24 or 16x16), align strokes to half-pixels for crisp lines, keep stroke width, caps and joins identical across a set.
- Standalone SVG files need `xmlns`. Convert text to outlines for logo files; web fonts do not load in an SVG used as `<img>`, so outline the text or use a system stack.
- Draw-on animation: `stroke-dasharray` / `stroke-dashoffset`. Minify with an open-source optimizer and strip editor metadata.

## Resolution-independent CSS effects

| Goal | Technique |
|---|---|
| Shapes | `clip-path: polygon()/circle()/inset()` |
| Soft fades | `mask-image: linear-gradient(black, transparent)` |
| Duotone / overlay | `mix-blend-mode`, `background-blend-mode` |
| Frosted surface | `backdrop-filter: blur()`; check contrast on the busiest backdrop |
| Grain texture | tiny tiled SVG/noise background at 3-8% opacity |
| Aspect control | `aspect-ratio: 16 / 9; object-fit: cover` |

Blend modes and filters cost rendering performance and can break contrast guarantees; use sparingly and drop any effect not justified by the emotion target.

## Asset hygiene

Vector masters; rasters exported at needed densities in modern formats (AVIF/WebP with fallback); explicit width/height or `aspect-ratio` to prevent layout shift; descriptive `alt` for informative images (state purpose, not appearance), empty `alt` for decorative.

Programmatic output (generic toolchain): raster composition with an imaging library exported at 2x, charts via a plotting library or SVG, print PDFs via a PDF library. Reuse the same palette and type tokens across all outputs.
