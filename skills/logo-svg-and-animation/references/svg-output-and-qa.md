# SVG Output Rules and QA

## File hygiene

| Rule | Why |
| --- | --- |
| Single layer; no `<g>` unless required | Predictable import into design/animation tools |
| Bake transforms into path data | No hidden offsets or scales when re-used |
| No `<text>`; outline everything | No font dependency; identical rendering everywhere |
| No `<style>` blocks; inline `fill` attributes | Survives embedding and sanitizers; easy recoloring |
| Tight `viewBox` on content bounds (plus intended safe area) | Predictable sizing and clear space |
| Remove redundant path points; merge into a compound path where possible | Smaller files, cleaner animation |
| Include `xmlns="http://www.w3.org/2000/svg"` | Valid standalone file |
| No width/height-distorting `preserveAspectRatio="none"` | Keeps the square-container rule |

Minimal structure:

```svg
<svg viewBox="0 0 W H" xmlns="http://www.w3.org/2000/svg"><path d="..." fill="#000000"/></svg>
```

For single-color variants, a single fill (`#000000`, `#FFFFFF`, or the brand color) on all paths; for white variants verify against a dark background, never on white.

Additional checks: keep the mark inside the 10% safe area so platform masks (rounded squares, circles) do not clip it; use `fill-rule="evenodd"` or correct winding for knockouts and verify counters (holes in a, e, o) on a colored background, not only white; if optimizing with an open-source SVG optimizer, re-check visually since aggressive path merging can alter fill rules; strip editor metadata and comments.

## Quality checklist

- [ ] Icon works in solid black
- [ ] Icon readable at 16px with no detail loss (also 32, 64, 256+)
- [ ] Icon artboard is exactly 1:1; glyph undistorted
- [ ] Exactly one memorable feature; no competing ideas
- [ ] Wordmark outlined (no `<text>`)
- [ ] All four lockups present (icon, wordmark, stacked, horizontal) plus JSON
- [ ] Spacing consistent across lockups; clear space >= 2U
- [ ] Four color variants verified per lockup
- [ ] No unnecessary groups, transforms, `<style>`, effects
- [ ] Concept appropriate to the industry; not a literal depiction
- [ ] Minimum sizes documented in the JSON

## Common failures

Multiple competing ideas; color-dependent icon; live text left in wordmark; only one lockup delivered; inconsistent spacing across lockups; trendy effects; literal representation; non-square icon container.

## Contrast and backgrounds (banners, social, hero use)

- Dark backgrounds need bright marks (white, cyan, glowing); never place a dark icon on a dark background.
- Keep avatar and banner on one palette and one render style.
- Check contrast of the mark against the actual background, not just the artboard.
