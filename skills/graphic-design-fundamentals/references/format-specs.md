# Format Specifications and Layout by Medium

## Print production basics

| Item | Spec |
|---|---|
| Resolution | 300 DPI minimum at final size for raster |
| Color mode | CMYK for print; RGB for screen |
| Bleed | 3 mm beyond trim on all sides (confirm with the printer) |
| Safe zone | 5 mm inside trim; keep text and key marks inside |
| Black text | Single-channel black (K only) for small text to avoid registration blur |
| Fonts | Outline or embed; vector artwork stays vector |

Always get the printer's template or die-line; their numbers override these.

## Paper and card sizes

| Format | Size |
|---|---|
| A3 | 297 x 420 mm |
| A2 | 420 x 594 mm |
| US Letter | 8.5 x 11 in |
| Tabloid | 11 x 17 in |
| Common US poster | 24 x 36 in |
| Business card, US | 3.5 x 2 in (89 x 51 mm) |
| Business card, EU | 85 x 55 mm |
| Business card, Japan | 91 x 55 mm |
| Business card, square | 2.5 in |

For an SVG mockup, scale with the real aspect: 89 x 51 mm -> `viewBox="0 0 890 510"`.

## Poster

Three layers:
1. **Attention layer:** one dominant element (image, giant type, or shape) readable from distance.
2. **Information layer:** what / when / where, clearly second in size and contrast.
3. **Texture layer:** details, credits, small print, rewards close viewing.

Four compositions: full-bleed image with overlay (semi-transparent block, scrim over a low-detail region, or `mix-blend-mode`); typographic poster (type as the image); grid-based info poster (3-4 columns); asymmetric diagonal.

## Editorial / spreads

- The optical center of a spread is the upper-left of the right-hand page, not the geometric center.
- Keep faces and text out of the gutter.
- Alternate dense and sparse pages for pacing.
- Running headers: small uppercase with tracking, baseline-aligned, bottom rule.

```css
.running-head { display: flex; justify-content: space-between; align-items: baseline;
  font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em;
  border-bottom: 1px solid currentColor; padding-bottom: 8px; }
```

## Business card

Front: name, role, one contact route minimum, logo. Back: either brand pattern or secondary details. Body text >= 7-8 pt; leave generous margin inside the safe zone. One accent finish idea at most.

## Brochure and flyer

- Folds: bi-fold = 4 panels; tri-fold = 6 panels (the inward-folding flap panel is narrower, about 3.625 in on a letter tri-fold, others slightly wider); gate-fold; z-fold. Plan panel order for the reveal sequence.
- Flyer: one dominant hero (50%+ of area), an obvious call to action, minimal text, contact or QR at the bottom, consistent brand.

## Certificate

Hierarchy: organization mark -> title (widest, boldest) -> recipient name (prominent) -> description (modest body) -> date and signature (caption size). Ornaments: draw one corner path and mirror it to the other three corners; keep the border subordinate to the text.

## Menu

- Item names 14-16 pt bold or semibold; descriptions 10-12 pt in a secondary color.
- Never set item names in all caps.
- Prices right-aligned or after a leader; avoid a column of aligned prices that invites price-scanning if the brief is premium.
- Group by section with clear spacing; limit items per section. (Menu-psychology claims such as reading order or description length effects are heuristics, not rules.)

## Packaging

1. Start from the die-line and the 3D form: box faces and glue tabs, bottle label wrap, pouch gusset, sleeve.
2. The primary display panel carries brand, product name, key visual, variant, and the legally required net weight or volume.
3. Keep text and barcodes off folds and seams; extend background through bleed.
4. Required regulatory text (ingredients, warnings, codes) is market-specific; verify locally.

## Large format and billboards

- Simplify; only large elements read at distance.
- About 7 words maximum on a billboard.
- High contrast; no fine lines or thin weights.
- Test at thumbnail size; bleed generously.

## Signage

- Dark on light for day or exterior, light on dark for night or interior.
- Use standard pictograms (ISO 7001 family) rather than inventing new ones.
- Place arrows on the side of the direction they indicate, consistent with path direction.
- Letter height versus viewing distance: use the figure from the applicable accessibility or signage standard for the jurisdiction; common rules of thumb vary (roughly 1 in of letter height per 10 ft of viewing distance is the usual conservative approximation), so verify before specifying.

## Additional print and screen notes

- Rich black deliberately for large black areas; 100K only for small black text. Avoid hairlines below ~0.25 pt; check knockout of small light text over dark.
- Brochure panel plan (tri-fold): outside = back info, front cover, flap teaser; inside = intro plus two main panels. Keep critical content away from folds.
- Business card layouts: minimal left-aligned, centered, or two-column split; contact text 7-9 pt minimum with high contrast.
- Banners: horizontal web banner 3:1 or 4:1; vertical retractable banner 1:2.5 to 1:3.
- Permanent signs also fall under accessibility regulation (tactile characters, Braille, non-glare finish, mounting height); check local rules.
- Social/share images: design for the smallest crop and keep key content in a central safe area.
- Email: 600 px max width, single column (multi-column breaks in many clients), web-safe font stacks, alt text on every image (images are often blocked), no reliance on background images.
- Social posts: text legible at one-quarter screen size; assume the bottom ~20% can be covered by platform UI; common ratios 4:5 feed, 9:16 stories, 16:9 video; put the CTA in the first caption line (captions truncate after about 2 lines).
- Dashboards: modular grid, one emphasized metric, consistent number formatting, tabular numerals.
- Landing visual: one focal point, one primary action, hero type from the top of the scale; check phone, tablet and desktop widths.

## Print-ready checklist

Bleed and safe zone set; fonts embedded or outlined; images 300 DPI at size; colors converted to CMYK and previewed (saturated blues, greens, oranges shift); spot colors named; fold and die lines on a separate non-printing layer; proof at 100% scale.
