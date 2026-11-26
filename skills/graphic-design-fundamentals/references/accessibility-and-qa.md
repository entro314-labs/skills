# Accessibility Checklist and Pre-Delivery QA

## Accessibility (design-time)

| Area | Requirement |
|---|---|
| Text contrast | 4.5:1 normal, 3:1 large (>= 24px regular or >= ~18.66px bold); 7:1 / 4.5:1 for AAA |
| Non-text contrast | 3:1 for UI component boundaries, icons, chart marks, focus indicators |
| Body text | >= 16px, line-height >= 1.5 |
| Text spacing (WCAG 1.4.12) | Layout must hold with letter-spacing 0.12em, word-spacing 0.16em, line-height 1.5, paragraph spacing 2x font size |
| Target size | WCAG 2.2 AA floor: 24x24 CSS px (2.5.8). Design target: 44x44 (AAA 2.5.5, iOS) or 48x48 (Material) |
| Focus | Visible, >= 2px, 3:1 change against adjacent colors; never `outline: none` without a replacement |
| Color | Never the only carrier of meaning; simulate protan, deutan, tritan |
| Keyboard | Logical order matching visual order; no hover-only functionality |
| Structure | Headings nest without skipping levels; one `h1` |
| SVG | Decorative: `aria-hidden="true"`; informative: `role="img"` + `<title>` |
| Motion | Honor `prefers-reduced-motion`; no flashing more than 3 times per second |
| Reflow | Usable at 320px width and 200% zoom without two-axis scrolling |

## Pre-delivery QA

Run in this order; stop and fix at the first failure.

1. **Hierarchy:** squint or blur test. Is the intended first, second, third read obvious? One focal point?
2. **Alignment:** every element on the grid or aligned to another element; consistent margins and gutters.
3. **Spacing:** only scale values; proximity groups correct (space within < space between).
4. **Type:** <= 2 families; body >= 16px on screen; measure 45-75 characters; leading and tracking per role; no orphaned headings, no rivers.
5. **Color:** roles used consistently; 60-30-10 proportion; contrast passes; grayscale test keeps hierarchy.
6. **Consistency:** repeated elements identical (radius, stroke, padding, icon grid, shadows).
7. **Sizes:** check at multiple sizes (thumbnail, mobile, desktop, print size); logos at 16-32px and in one color.
8. **Accessibility:** table above.
9. **Emotional fit:** does it produce the emotion stated in the brief? Does any choice undermine it?
10. **Output hygiene:** SVG has viewBox and no stray metadata; fonts licensed and embedded or outlined; print files have bleed, safe zone, CMYK, 300 DPI; no placeholder text.

## Common failures to scan for

- Gray-on-white captions under 4.5:1.
- Text over photos without scrim.
- Equal visual weight on all elements.
- Inconsistent corner radii and shadow styles.
- Decorative gradients that lower contrast of overlaid text.
- Touch targets under 24px or tightly packed.
- Animations with no reduced-motion fallback.
- Fonts specified that the target environment cannot load.

## Additional craft checks

- No orphan or widow lines in headings; consistent punctuation and typographic quotes.
- Assets crisp at 2x; files optimized.
- Edge cases: smallest and largest intended sizes (mobile width, large display, thumbnail; for print, bleed and safe zone).
- Keep no more than 3 emphasis levels per region; no near-miss alignments (off by 1-3 px).
