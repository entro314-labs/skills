# Playful Geometric Landing Page: Brief

The short version of this style. The exhaustive specification starts at [index.md](index.md).

For creative tools, design products, or when you want energetic optimism.

### Layout Philosophy
- Overlapping geometric shapes as structural elements
- Rotated containers (2-5 degrees)
- Shapes that extend beyond their containers
- Grid that shifts at different breakpoints

### Visual System

**Shapes:**
- Circles, triangles, rounded rectangles
- Shapes overlap and intersect
- Use shapes as containers for content
- Animated shapes in background

**Color:**
```css
--blue: #3B82F6;
--pink: #EC4899;
--yellow: #FBBF24;
--green: #10B981;
--purple: #8B5CF6;
/* Use boldly - this is playful */
```

**Texture:**
- Subtle noise overlay
- Gradient meshes
- Consider halftone dots or patterns

### Animation

**Energetic but Controlled:**
```javascript
const playfulSpring = {
  type: "spring",
  stiffness: 200,
  damping: 15, // Lower damping = more bounce
};
```

**Shape Animations:**
- Shapes rotate slowly (30s per rotation)
- Shapes scale on scroll
- Intersecting shapes animate when interacting

**Hover States:**
- More dramatic: scale(1.1), rotate(5deg)
- Color shifts
- Shapes "react" to cursor proximity
