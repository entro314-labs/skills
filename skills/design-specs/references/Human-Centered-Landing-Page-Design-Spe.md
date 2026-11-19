# Human-Centered Landing Page Design Specification

## Layout Structure

**Hero & Sections:**
- Full-viewport hero with subtle gradient background
- Generous vertical spacing between sections (150-200px)
- Content constrained to 1200px max-width with breathing room
- Asymmetric two-column layouts (40/60 or 60/40 splits)
- Overlapping content blocks with z-index layering
- Editorial-style image placements that break the grid

**Grid Systems:**
- Loose bento box layout with uneven card sizes
- Feature cards in irregular arrangements (not strict columns)
- CSS Grid with named areas for custom positioning
- Organic spacing that varies per section

**Background Elements:**
- Colored mountain illustrations as decorative section dividers
- Paper texture overlays moving at 0.3x scroll speed
- Large floating circle elements (soft gradients, semi-transparent)
- Subtle dot grid pattern at 10% opacity
- Organic blob shapes using SVG with smooth curves

---

## Scroll Behavior

**Gentle Parallax:**
- Hero background images at 0.5x scroll speed
- Paper textures at 0.3x scroll speed
- Floating circles at 0.7x scroll speed
- Lenis smooth scroll (no velocity blur - keep it calm)

**Scroll Reveals:**
- Intersection Observer with rootMargin: "-10%" (earlier trigger)
- Fade-in with subtle upward motion (translateY: 20px → 0)
- Staggered reveals with 150ms delay (slower than aggressive SaaS)
- Images fade and scale in (scale: 0.95 → 1)

---

## Animation Approach

**Entrance/Reveal (Subtle):**
- Feature cards fade in with gentle upward drift
- Images with soft scale-in effect (0.98 → 1)
- Text reveals character-by-character (stagger: 0.01s, very subtle)
- Icons draw in slowly (2s duration, ease: "power1.out")
- Section transitions with cross-fade between backgrounds

**Hover States (Gentle):**
- Cards: translateY(-4px) with soft shadow increase
- Buttons: scale(1.02) with ease-out
- Images: slight zoom (scale: 1.05) with 0.6s transition
- Text links: underline that draws from left (width: 0 → 100%)
- Rounded badges: gentle scale(1.08)

**Continuous Motion:**
- Floating circles slowly orbit (3-5s duration per rotation)
- Background gradients shift subtly (20s animation loop)
- Gentle pulse on accent elements (scale: 1 → 1.03, 4s loop)

---

## Visual Style

**Colors:**
- Warm pastel palette (soft peach, sage green, dusty blue)
- Cream/off-white backgrounds (#F8F6F3)
- Deep earth tones for text (#2B2B2B)
- Accent colors: warm coral (#FF7F6E), soft teal (#6EC1B5)
- Gradient overlays with warm tones (peach to lavender)

**Textures & Depth:**
- Paper grain texture at 3% opacity
- Soft noise texture overlay
- Gentle drop shadows (0 2px 8px rgba(0,0,0,0.08))
- Frosted glass with subtle blur (backdrop-filter: blur(12px))
- Organic shapes with soft edges (border-radius: 30px+)

**Photography/Illustration:**
- Large real estate/renovation photography with soft lighting
- Custom illustrations with organic, hand-drawn feel
- Image borders with 16px radius
- Subtle border around images (2px, rgba(0,0,0,0.05))

---

## Typography

**Display:**
- Serif fonts for headlines (Tiempos, Fraunces, or Lora)
- Large but not overwhelming: 54-72px
- Comfortable line-height (1.2)
- Gradient text with warm tones (optional, not overused)

**Body:**
- Sans-serif for body (Inter, Untitled Sans, or General Sans)
- Generous line-height (1.7)
- Comfortable reading width (70 characters max)
- Letter-spacing: slight increase (0.01em) for breathing room

**Hierarchy:**
- Eyebrow labels in uppercase with 0.15em letter-spacing
- Medium font weight for most text (500)
- Strategic use of bold (600) for emphasis
- Captions in smaller size (14px) with muted color

---

## Interactive Elements

**Cards:**
- Large padding (40-60px)
- Rounded corners (24px)
- Subtle hover lift (4px up)
- Background color shift on hover (lighter by 5%)
- Optional icon that scales slightly on hover

**Buttons:**
- Rounded (12px radius)
- Generous padding (16px 32px)
- Soft shadow that expands on hover
- Color shift animation (0.3s)
- Primary: solid color, Secondary: outlined

**Forms:**
- Large input fields (56px height)
- Rounded corners (12px)
- Focus state with soft glow (box-shadow with brand color)
- Floating labels that shrink on focus
- Subtle animations on validation

**Navigation:**
- Sticky header with soft shadow on scroll
- Smooth color transition from transparent to solid
- Menu items with underline animation
- Mobile menu with slide-in (not aggressive)

---

## Custom Elements

**Cursor (Optional):**
- Soft circle (30px diameter)
- position: fixed with gentle lerp (0.2 damping)
- Expands on hover over clickable elements (40px)
- Soft color (rgba(255,127,110,0.3))
- No inversion effect (keep it subtle)

**Floating Circles:**
```javascript
// Large organic circles (200-400px)
// Soft gradient fills with transparency
// Animate position using Math.sin/cos
// Slow orbital motion (4-6s per rotation)
// Blur filter (20px) for depth
```

**Marquee (If Used):**
- Slow infinite scroll (30s duration)
- Testimonials or partner logos
- Transparent fade on edges
- Pauses on hover

**Illustrations:**
- Custom SVG icons (3px stroke, rounded caps)
- Draw-in animation on scroll (3s duration, very smooth)
- Organic shapes, not geometric
- Warm color palette

---

## Section Treatments

**Hero:**
- Large headline with generous spacing
- Single supporting paragraph
- Prominent CTA (not multiple competing CTAs)
- Large hero image/illustration (60% width)
- Subtle floating circles in background

**Features:**
- Image + text in alternating layout
- Large images (50% width minimum)
- Short, punchy headlines
- Descriptive paragraphs (not bullet points)
- Optional small icon accent

**Testimonials:**
- Large quotes in serif font
- Customer photo (circular, 80px)
- Name + role below
- Horizontal scroll on mobile (not stacked)
- Soft card backgrounds

**Footer:**
- Generous padding
- Organized columns with breathing room
- Soft background color
- Newsletter signup with large input
- Social links with hover lift

---

## Technical Implementation

**Core Libraries:**
```
npm install gsap @studio-freight/lenis motion
```

**Simplified Patterns:**
- Lenis smooth scroll (config: lerp: 0.1, duration: 1.2)
- Motion for hover states and reveals
- Intersection Observer for scroll triggers
- CSS custom properties for theming
- requestAnimationFrame for floating circles only

**Avoid:**
- Velocity-based blur
- Aggressive scroll choreography
- Complex canvas particle systems
- Multiple competing animations
- Data visualization libraries
- Dashboard mockups

**Focus On:**
- Smooth, natural motion
- Generous spacing and breathing room
- Warm, inviting colors
- Editorial photography
- Subtle, meaningful animations
- Readability and comfort

---

## Animation Timing

**Standard Durations:**
- Hover states: 0.3s
- Scroll reveals: 0.8s
- Page transitions: 0.6s
- Floating motion: 4-6s loops
- Background shifts: 20s loops

**Easing:**
- Prefer: ease-out, ease-in-out
- Spring physics with soft damping
- No sharp or aggressive easing
- Custom cubic-bezier for smoothness: cubic-bezier(0.25, 0.46, 0.45, 0.94)

---

## Design Philosophy

**Principles:**
- Clarity over complexity
- Breathing room over density
- Warmth over precision
- Human over technical
- Subtle over aggressive
- Editorial over promotional
- Trust over hype

**Mood:**
- Calm, confident, approachable
- Thoughtful, considered
- Warm, inviting
- Modern but timeless
- Sophisticated but accessible