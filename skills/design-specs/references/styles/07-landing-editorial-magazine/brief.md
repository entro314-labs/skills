# Editorial/Magazine Landing Page: Brief

The short version of this style. The exhaustive specification starts at [index.md](index.md).

For content-focused products, media brands, or when you want the page itself to feel like a designed publication.

### Layout Philosophy
- Newspaper/magazine grid with varied column spans
- Pull quotes and callouts that break the flow
- Images that bleed off-grid
- Section dividers as designed elements

### Grid System
```css
.editorial-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
}
/* Content spans vary: 5-7 columns, offset from center */
.article-body {
  grid-column: 2 / 8;
}
.pull-quote {
  grid-column: 8 / 12;
  margin-top: -100px; /* Overlap */
}
```

### Typography (The Star)
- Multiple font families: Serif for headlines, sans for body
- Dramatic size contrast: 96px headlines, 16px body
- Drop caps on opening paragraphs
- Pull quotes in italic serif, oversized
- Bylines and datelines in small caps

### Visual Treatments
- Images with art-directed crops (not generic rectangles)
- Duotone or color overlay treatments
- Text wrapping around images
- Dividers: thick lines, decorative symbols, or whitespace

### Animation
- Minimal - let typography do the work
- Page scroll reveals for images
- Parallax on full-bleed images
- Subtle hover on interactive elements only
