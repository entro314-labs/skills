# Technique Checklist

Layout, animation, effect and typography techniques collected from reference sites, as short specification lines. Pick the lines that fit the brief and paste them into a prompt; they are not one coherent design. The two landing specs ([saas-landing-spec.md](saas-landing-spec.md), [human-centered-landing-spec.md](human-centered-landing-spec.md)) show the same techniques arranged into full pages.

## Layout

- Infinite scrolling marquee text that repeats horizontally
- Text elements duplicate and wrap seamlessly with no visible breaks
- No traditional grid - content flows as continuous ribbon
- Asymmetric sections that break standard 12-column grid
- Hero section with large image bleeding 60% into viewport width
- Content blocks positioned using CSS Grid with `grid-template-columns: 2fr 3fr 2fr` creating uneven gutters
- Single-page scroll with full-viewport sections
- Sticky header that shrinks on scroll
- Bento box grid layout with uneven card sizes
- Asymmetric spacing between sections (not uniform padding)
- Paper texture overlays
- Full-bleed sections alternating with constrained content areas
- Mock dashboard UI prominently featured as hero - positioned at 45-degree viewing angle with subtle perspective transform
- Line graph with animated path drawing using stroke-dashoffset technique
- Alternating content blocks with image-left/text-right, then image-right/text-left
- Grid-based product showcase cards with 3-column layout at desktop, stacking at mobile
- CSS Grid with named template areas
- Overlapping layers with z-index choreography
- Full-bleed sections with viewport height units
- Floating elements positioned with absolute/fixed

## Animation

- Scroll-triggered fade-ins using Intersection Observer API
- Parallax on hero section background elements (moving at 0.5x scroll speed)
- Staggered entrance animations for feature cards (delay: 100ms between each)
- Smooth scroll behavior with CSS scroll-snap-type: y mandatory
- Micro-interactions on CTA buttons: scale(1.05) on hover with cubic-bezier(0.34, 1.56, 0.64, 1)
- Hover-triggered morphing on product demo cards
- Scroll velocity-based blur on background elements using Lenis smooth scroll
- Grid items that expand on hover, pushing adjacent items (using grid-template-columns with fr units)
- Texture parallax - paper texture moves slower than content (0.3x scroll speed)
- Floating/orbiting circle elements (position animated in circular path using transform: translate() with Math.sin/cos)
- Feature card reveals on scroll with stagger effect
- Screenshot mockups that tilt on scroll (rotateX: 5deg, rotateY: -5deg)
- Scroll-triggered section reveals with staggered opacity/y-translation
- Background gradient mesh that subtly shifts colors (using CSS custom properties and animation keyframes)
- Marquee: implement text as duplicated DOM elements using `transform: translateX()` with GSAP
- Marquee: use `gsap.to()` with `repeat: -1, ease: "none", duration: 20` for seamless loop
- Animated node connections with lines that draw using stroke-dasharray animation

## Common animation techniques

- Scroll-triggered reveals using IntersectionObserver + Motion
- Number counters using countUp.js or custom animation loop
- SVG path drawing with stroke-dashoffset animation
- Staggered children animations with sequential delays
- 3D card rotations on hover using CSS transforms with perspective
- Smooth scroll with Lenis or custom implementation

## Colors and effects

- Gradient overlays on hero images
- Subtle shadow lifting on card hover: translateY(-8px) with box-shadow depth change
- Pastel color palette with high contrast CTAs
- Textured backgrounds that change per section
- Icon animations (folder-plus, sky icon) that draw in on scroll
- Multiple overlapping circular elements creating depth
- Gradient backgrounds transitioning between sections
- Hover states on feature cards revealing more detail
- Soft gradient backgrounds transitioning between sections (purple-to-blue, blue-to-teal)
- Frosted glass morphism on dashboard panels (backdrop-filter: blur(20px) with semi-transparent backgrounds)
- Mock screenshots positioned with 8px border radius and multi-layer drop shadows

## Typography

- Variable font weight animations on headers (400 to 600 on scroll into view)
- Letter-spacing adjustments on hover states
- Large display fonts (72px+) with tight line-height (1.1)
- Large display headings with gradient text fills using background-clip: text
- Gradient text using background: linear-gradient + -webkit-background-clip: text
- Large display sizes (72-120px) for hero headings
- Increased letter-spacing (0.05-0.1em) for labels
- Monospace fonts for technical content/metrics
- Split lines with decorative separators

## Interactive components

- Tabbed interface showing different dashboard views
- Tag pills with rounded borders that animate scale on hover
- Logo wall with opacity fade-in on scroll
- Comparison table with animated checkmarks appearing
- CTA button with gradient background and hover glow
- Logo grid items scale up 1.05x on hover
- Integration badges rotate slightly on hover (-2deg)
- Button states with animated gradient shift
- Checkbox/toggle animations with smooth transitions

## Data visualization

- Scatter plot with quadrant labels (Leaders, Laggers, Niche Players, Controversial)
- Brand logos positioned as interactive dots
- Animated SVG paths for line charts with gradient stroke
- Circular avatars with colored borders for sentiment indicators

## Dashboard and product UI showcases

- Position at 45-degree angle using transform: rotateX(-15deg) rotateY(15deg)
- Add multiple shadow layers for depth
- Animate internal elements (charts drawing, numbers updating)
- Use backdrop-filter: blur for glassmorphism effect
- Show "live" state with blinking indicators or updating timestamps
