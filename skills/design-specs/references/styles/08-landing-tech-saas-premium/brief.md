# Tech SaaS Premium Landing Page: Brief

The short version of this style. The exhaustive specification starts at [index.md](index.md).

Fusion of Linear, Supabase, Clerk - the best of modern dev-focused marketing with EXTRA polish.

### Core Philosophy
Every element should feel like it was meticulously crafted. The page should feel like a demo of the product's quality. Premium through attention to detail, not through flashiness.

### Layout

**Hero:**
- Left: Tight headline + short subcopy (dev/infra tone)
- Right: Layered product mockup at slight angle
- Use 12-column CSS Grid with named areas
- NO 3-column feature card row (the most generic pattern)

**Subsequent Sections:**
- Alternating layouts, never the same pattern twice
- Full-bleed dark sections with light content sections
- "Sections that breathe" - each feels like a standalone story

### Visual System

**Color (Dark + Accent):**
```css
--bg-dark: #0A0A0B;
--bg-section: #111113;
--text-light: #FAFAFA;
--accent: #10B981; /* Or brand-specific */
--accent-glow: rgba(16, 185, 129, 0.15);
--gradient-start: #6366F1;
--gradient-end: #10B981;
```

**Glassmorphism:**
```css
.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
}
```

**Glow Effects:**
```css
.accent-glow {
  box-shadow: 0 0 40px rgba(16, 185, 129, 0.2);
}
.text-glow {
  text-shadow: 0 0 30px rgba(16, 185, 129, 0.5);
}
```

### Technical Showcases (The Differentiator)

**Canvas Particle System:**
```javascript
// Mouse-reactive particles in hero
// Particles drift, attract toward cursor
// force = 50 / Math.pow(distance, 2)
// Trail effect with semi-transparent clear
```

**SVG Path Drawing:**
```javascript
// Network/connection lines that draw on scroll
// stroke-dasharray: pathLength
// stroke-dashoffset: pathLength → 0
// duration: 1.5s, ease: "power2.out"
```

**Animated Data Visualization:**
- Line graphs with animated path drawing
- Force-directed node graphs (d3-force)
- Interactive grids that morph on hover

**Custom Cursor:**
```javascript
// 20px circle, position: fixed
// Lerp to mouse position (0.15 damping)
// Scale 1.5x on hover over interactive elements
// mix-blend-mode: difference (optional)
```

### Animation System

**Scroll Effects (Lenis + GSAP):**
```javascript
// Smooth scroll with velocity tracking
// Velocity-based blur: filter: blur(${velocity * 0.3}px)
// Parallax layers at different speeds
```

**Motion Springs:**
```javascript
const premiumSpring = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 0.8,
};
```

**Entrance Animations:**
- Hero content staggers in (100ms delay between elements)
- Product mockups parallax into view
- Feature cards reveal with y-translation + opacity
- Integration logos pop in with scale

**Hover States:**
- Cards: translateY(-8px), shadow depth increase
- Buttons: scale(1.05) with spring easing
- Code blocks: subtle glow
- Integration badges: rotate(-2deg)

### Interactive Components

**Dashboard Mockup:**
- Position at 45° angle: `transform: rotateX(-15deg) rotateY(15deg)`
- Multi-layer shadows for depth
- "Live" state: blinking indicators, updating timestamps
- Internal charts that animate

**Code Blocks:**
- Syntax highlighting with brand colors
- Line numbers
- Copy button with success feedback
- Cursor blink animation

**Comparison Table:**
- Animated checkmarks appearing on scroll
- Hover row highlighting

### Typography

**Display:**
- Large headings: 72-120px
- Gradient text: `background: linear-gradient; -webkit-background-clip: text`
- Tight line-height: 1.1

**Technical:**
- Monospace for code, metrics, technical terms
- Uppercase labels with `letter-spacing: 0.1em`
