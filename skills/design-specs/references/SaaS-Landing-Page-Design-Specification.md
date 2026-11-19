# SaaS Landing Page Design Specification

## Layout Structure

**Hero & Sections:**
- Full-viewport sections (100vh) with flexbox centering
- Dashboard mockup at 45° angle (transform: rotateX(-15deg) rotateY(15deg))
- Multi-layer drop shadows for depth
- Sticky header that shrinks on scroll
- Full-bleed sections alternating with constrained content areas

**Grid Systems:**
- Bento box with uneven card sizes using CSS Grid named areas
- 3-column product cards (desktop), stacking at mobile
- No strict 12-column grid - irregular feature card arrangement
- Grid items expand on hover, pushing adjacent items (fr units)
- Asymmetric spacing between sections

**Content Blocks:**
- Alternating image-left/text-right layout
- Floating integration badge grid
- Award badge carousel with infinite scroll
- Logo wall with scroll-triggered opacity
- Testimonial cards with horizontal drag scrolling

**Background Elements:**
- Colored mountain illustrations per section (purple, blue, green)
- Paper texture overlays moving at 0.3x scroll speed
- Gradient mesh animation on hero
- Subtle grid dot pattern overlay
- Floating/orbiting circle elements (animated with Math.sin/cos)

---

## Scroll Behavior

**Smooth Scroll:**
- Lenis library with velocity tracking
- Scroll velocity-based blur on backgrounds
- CSS scroll-snap-type: y mandatory for section snapping
- Parallax: hero backgrounds at 0.5x, textures at 0.3x

**Scroll Triggers:**
- Intersection Observer with rootMargin: "-20%"
- Section reveals with staggered opacity/y-translation
- SVG icon drawing on scroll into view
- Screenshot mockups tilt (rotateX: 5deg, rotateY: -5deg)
- Variable font weight shift (400→600)

---

## Animation Techniques

**Entrance/Reveal:**
- Staggered feature cards (100ms delay between)
- Number counters animating upward on scroll
- Chart data points drawing sequentially
- Integration logos popping in with delay
- SVG path drawing with stroke-dashoffset
- Animated node connections with stroke-dasharray

**Hover States:**
- Buttons: scale(1.05) with cubic-bezier(0.34, 1.56, 0.64, 1)
- Cards: translateY(-8px) with shadow depth change
- Product demo cards morphing on hover
- Logo grid: scale(1.05x)
- Integration badges: rotate(-2deg)
- 3D card rotation (rotateY: 5deg)
- Border glow on metric cards

**Marquee:**
- Infinite horizontal scroll using GSAP
- Duplicated text spans with translateX(0% to -100%)
- Linear easing (ease: "none")
- Dual rows with opposite directions

**Advanced:**
- FLIP technique for organizational mode morphing
- Canvas particle system with mouse interaction
- Custom cursor (20px circle, position: fixed, lerp with 0.15 damping)
- Spring physics config: stiffness: 300, damping: 30, mass: 0.8

---

## Visual Effects

**Glass/Depth:**
- Frosted glass on dashboard panels (backdrop-filter: blur(20px))
- Glassmorphism on cards (backdrop-filter: blur(10px))
- Semi-transparent rgba backgrounds
- Multi-layer shadows (0 4px 6px, 0 10px 20px)

**Colors:**
- Pastel palette with high-contrast CTAs
- Gradient overlays on hero images
- Gradient backgrounds transitioning between sections
- Gradient stroke on SVG line charts
- Purple tint overlay (mix-blend-mode: multiply with #6B46C1)
- Gradient mesh using multiple radial-gradient layers
- Border glows using box-shadow

**Textures:**
- Paper texture overlays at subtle opacity
- Noise texture overlays at 5% opacity
- Section-specific theming with colored mountains

---

## Interactive Components

**Data Visualization:**
- Line graphs with animated path drawing
- Bar graphs as SVG with stroke-dasharray on scroll
- Scatter plot with quadrant labels (Leaders, Laggers, Niche Players, Controversial)
- Brand logos as interactive dots
- Network map with pulsing city dots and animated connection lines
- Circular avatars with colored sentiment borders

**UI Elements:**
- Tabbed dashboard views
- Tag pills with rounded borders, scale on hover
- Dropdown selector with animated chevron
- Code blocks with line numbers, syntax highlighting, cursor blink
- Comparison table with animated checkmarks
- Checkbox/toggle with smooth transitions
- Copy-to-clipboard button with feedback

**Dashboard Features:**
- "Live" state with blinking indicators
- Updating timestamps
- Animating internal charts
- Metric cards with hover glow

---

## Typography

**Display:**
- Large headings: 72-120px with tight line-height (1.1)
- Gradient text fills (background: linear-gradient + background-clip: text)
- Variable font animation (font-variation-settings: 'wght' 400 to 700)

**Body & Labels:**
- Metric labels in all-caps with letter-spacing: 0.1em
- Monospace (JetBrains Mono) for code/numeric data
- Letter-spacing adjustments on hover
- Caption text with increased line-height
- Decorative line separators

---

## Technical Implementation

**Libraries:**
```
npm install gsap @studio-freight/lenis motion
npm install locomotive-scroll splitting
```

**Core Patterns:**
- CSS Grid with explicit track sizing: grid-template-columns: repeat(12, 1fr)
- Motion spring: transition={{ type: "spring", stiffness: 200, damping: 20 }}
- Intersection Observer for scroll triggers with rootMargin: "-20%"
- Canvas animations with requestAnimationFrame loop
- Web Animations API for choreographed sequences
- CSS custom properties for dynamic theming
- transform: matrix3d() for 3D transforms
- pointer-events: none on overlay elements
- will-change: transform on animated elements

**Cursor Implementation:**
```javascript
// Custom cursor div: 20px diameter, position: fixed, pointer-events: none
gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0.15, ease: "power2.out" })
// Scale on hover: transform: scale(1.5)
// Inversion: mix-blend-mode: difference
```

**Scroll Velocity Blur:**
```javascript
// velocity = (currentScrollY - previousScrollY) / deltaTime
// filter: blur(${velocity * 0.5}px)
// Threshold: if (velocity > 5)
```

**Variable Font:**
```css
@font-face {
  font-family: 'InterVariable';
  font-weight: 100 900;
  font-stretch: 75% 125%;
}

.animated-text {
  font-variation-settings: 'wght' 400, 'wdth' 100;
  animation: fontShift 2s ease-in-out infinite alternate;
}

@keyframes fontShift {
  to { font-variation-settings: 'wght' 700, 'wdth' 115; }
}
```

**Canvas Particle System:**
```javascript
// Initialize particles array with x, y, vx, vy
// On mousemove: force = 50 / Math.pow(distance, 2)
// Update in requestAnimationFrame loop
// Trail effect: ctx.fillStyle = 'rgba(0,0,0,0.05)', ctx.fillRect(0,0,w,h)
```

**SVG Path Drawing:**
```javascript
// Initial: stroke-dasharray equal to path length, stroke-dashoffset same value
// On ScrollTrigger: animate stroke-dashoffset to 0
// duration: 1.5, ease: "power2.out"
```

**GSAP Marquee:**
```javascript
// Duplicate text spans (4+ times)
// gsap.to() with repeat: -1, ease: "none", duration: 20
// translateX from 0% to -100%
// position: absolute with calculated offsets
// display: inline-block, white-space: nowrap
```