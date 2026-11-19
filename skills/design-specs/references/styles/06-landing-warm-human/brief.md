# Warm Human Landing Page: Brief

The short version of this style. The exhaustive specification starts at [index.md](index.md).

Based on the [human-centered landing spec](../../human-centered-landing-spec.md). For products like Headspace, wellness apps, home services, education platforms.

### Layout Philosophy
- Generous whitespace (150-200px between sections)
- Asymmetric two-column layouts (40/60 or 60/40)
- Overlapping elements with z-index layering
- Editorial-style image placements that break the grid

### Visual Elements

**Hero:**
- Large headline in serif font (54-72px)
- Single supporting paragraph
- One prominent CTA (not competing buttons)
- Large illustration or photography (60% width)
- Floating decorative circles in background

**Background Elements:**
- Large floating circles (soft gradients, semi-transparent)
- Paper texture at 3% opacity
- Organic blob shapes with soft edges
- Colored mountain/wave illustrations as section dividers

**Cards:**
- Large padding (40-60px)
- Very rounded corners (24px)
- Subtle hover lift (4px)
- Optional organic icon accent

### Animation

**Scroll Behavior (Lenis):**
```javascript
const lenis = new Lenis({
  lerp: 0.1,
  duration: 1.2,
});
```

**Reveals:**
- Intersection Observer with `rootMargin: "-10%"` (earlier trigger)
- Fade + subtle translateY (20px → 0)
- Staggered delays: 150ms (slower than aggressive SaaS)
- Images: fade + scale (0.95 → 1)

**Continuous Motion:**
- Floating circles orbit slowly (4-6s per rotation)
- Background gradients shift (20s loop)
- Gentle pulse on accent elements (scale 1 → 1.03, 4s loop)

### Typography

**Display:**
- Serif for headlines: Fraunces, Tiempos, Lora
- Comfortable line-height (1.2)
- Warm gradient text optional (peach to coral)

**Body:**
- Sans-serif: Inter, General Sans
- Generous line-height (1.7)
- 70 character max line length

### Color Palette
```css
--bg: #F8F6F3; /* Warm cream */
--text: #2B2B2B; /* Earth brown */
--accent-coral: #FF7F6E;
--accent-sage: #6EC1B5;
--accent-lavender: #B4A7D6;
```
