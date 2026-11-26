# Lockups, spacing, export

## Spacing unit

U = icon width / 8.

| Measure | Value |
|---|---|
| Minimum clear space around any logo | 2U all sides |
| Stacked internal gap (icon to wordmark) | 4U (0.5 x icon width) |
| Horizontal internal gap | 2U to 4U; start at 2U, widen for dense icons |
| Lockup safe area | 10% all sides |

Why one rule: a single U-based system keeps ratios identical across lockups. Looser rules of thumb (stacked gap 0.5-1x icon height; horizontal gap 0.5-1x icon width) overlap with it; use them only when the U values look cramped, and apply the same choice to every lockup.

## Stacked lockup

Icon above wordmark, both centered. Wordmark width <= 1.5x icon width. Gap per table (4U = 0.5x icon width, the low end of the 0.5x-1x range). Artboard aspect 1:1 to 1:1.25; record the chosen ratio in the JSON. Anti-patterns: centered text under a left-aligned icon; wordmark far wider than icon (collapses at small size).

## Horizontal lockup

Icon left, wordmark right, vertically centered. Artboard aspect 3:1 to 4:1 (working range). Balance optically, not mathematically. Vertical center target: the wordmark's x-height/cap-height middle, not the bounding box including descenders.

## Optical alignment

- Pointed icons (triangles) shift slightly toward the apex to look centered.
- Dense or heavy icons look bigger: reduce slightly or add space.
- Wordmarks with descenders shift up slightly.
- Round shapes overshoot flat edges by about 1-3% to look the same size as squares.

## Minimum sizes

| Lockup | Digital | Print |
|---|---|---|
| Icon only | 16 px | 10 mm |
| Stacked | 48 px wide | 20 mm |
| Horizontal | 80 px wide | 40 mm |

## Suggested viewBoxes

| File | viewBox |
|---|---|
| Icon | 0 0 512 512 |
| Stacked | 0 0 512 640 (or 0 0 512 512) |
| Horizontal | 0 0 1024 256 |

Fit the artwork inside the viewBox with the safe area, keep the viewBox equal to content bounds plus intended padding.

## Color modes (each lockup)

Full color; single black #000000; single white #FFFFFF (dark backgrounds); single brand color. Define the full-color version only after the black version passes. Check contrast of full color against both light and dark backgrounds; provide a reversed version if it fails.

SVG file rules and the QA checklist: see svg-output-and-qa.md. For inline use add a `<title>` for accessibility.

## Metadata JSON (suggested shape)

```json
{
  "brandName": "acme",
  "files": {"icon": "acme-icon.svg", "wordmark": "acme-wordmark.svg",
            "stacked": "acme-stacked.svg", "horizontal": "acme-horizontal.svg"},
  "icon": {"concept": "one-sentence concept", "baseShapes": ["circle", "triangle"],
           "gridSystem": "modular", "minSize": 16},
  "wordmark": {"typeface": "family", "weight": 500, "tracking": 0, "case": "lower"},
  "lockups": {"iconOnly": {"aspectRatio": "1:1"}, "stacked": {"aspectRatio": "1:1.25"},
              "horizontal": {"aspectRatio": "4:1"}},
  "colors": {"primary": "#1A56DB", "secondary": null, "black": "#000000", "white": "#FFFFFF"},
  "spacing": {"unit": "icon width / 8", "clearSpace": "2U", "stackedGap": "4U", "horizontalGap": "2U"},
  "minSizePx": {"icon": 16, "stacked": 48, "horizontal": 80}
}
```

## Lockup anti-patterns

Different spacing ratios per lockup; inconsistent safe areas; icon too small against wordmark; wordmark too long to survive small sizes (switch to icon-only below the minimum width); busy backgrounds behind the logo; centered text with left-aligned icon.

