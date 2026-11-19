# Cinematic Dark Landing Page: Brief

The short version of this style. The exhaustive specification starts at [index.md](index.md).

Linear's "liquid glass" aesthetic taken further. For products that want to feel like a movie, not a website.

### Layout Philosophy
- Maximum negative space
- One visual focus per viewport
- Sparse content - every word counts
- Depth-of-field feeling with blur layers

### Visual System

**Background:**
- Pure black or near-black (#050505)
- Subtle noise texture at 3% opacity
- Gradient orbs in background (very low opacity, large scale)
- Multiple blur layers at different depths

**Glass Panels:**
```css
.glass-hero {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.05) 0%,
    rgba(255, 255, 255, 0.02) 100%
  );
  backdrop-filter: blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```

**Light Effects:**
- Product shots with simulated studio lighting
- Rim lights on edges of glass elements
- Accent color glows behind key elements

### Animation

**Scroll (Lenis with slow lerp):**
```javascript
const lenis = new Lenis({
  lerp: 0.07, // Slower for cinematic feel
  duration: 1.5,
});
```

**Parallax Layers:**
- Background orbs: 0.3x scroll speed
- Product mockups: 0.8x scroll speed
- Text: 1x (normal)
- Creates depth as you scroll

**Subtle Continuous Motion:**
- Glass panels shift with mouse position (2-3px max)
- Background gradients slowly pulse (20s cycle)
- Occasional light "flare" across glass surfaces

### Typography
- Minimal text - large, impactful headlines only
- Font-weight animation on scroll into view (300 → 500)
- Consider animated letter-spacing on hover
