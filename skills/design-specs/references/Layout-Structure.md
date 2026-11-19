**Layout Structure:**
- Infinite scrolling marquee text that repeats horizontally
- Asymmetric sections that break standard 12-column grid
- Hero section with large image bleeding 60% into viewport width
- Content blocks positioned using CSS Grid with `grid-template-columns: 2fr 3fr 2fr` creating uneven gutters
- Single-page scroll with full-viewport sections
- Asymmetric spacing between sections (not uniform padding)
- Full-bleed sections alternating with constrained content areas


**Animation Specs:**
- Scroll-triggered fade-ins using Intersection Observer API
- Parallax on hero section background elements (moving at 0.5x scroll speed)
- Staggered entrance animations for feature cards (delay: 100ms between each)
- Micro-interactions on CTA buttons: scale(1.05) on hover with cubic-bezier(0.34, 1.56, 0.64, 1)
- Hover-triggered morphing on product demo cards
- Scroll velocity-based blur on background elements using Lenis smooth scroll
- Grid items that expand on hover, pushing adjacent items (using grid-template-columns with fr units)
- Texture parallax - added texture moves slower than content (0.3x scroll speed)
- Feature card reveals on scroll with stagger effect
- Background gradient mesh that subtly shifts colors (using CSS custom properties and animation keyframes)

**Colors/Effects:**
- Subtle gradient overlays on hero images
- Subtle shadow lifting on card hover: translateY(-8px) with box-shadow depth change
- Pastel color palette with high contrast CTAs
- Textured backgrounds that change per section
- Hover states on feature cards revealing more detail

**Typography:**
- Variable font weight animations on headers (400 to 600 on scroll into view)
- Letter-spacing adjustments on hover states
- Large display fonts (72px+) with tight line-height (1.1)
- Implement text as duplicated DOM elements using `transform: translateX()` with GSAP
- Use `gsap.to()` with `repeat: -1, ease: "none", duration: 20` for seamless loop

**Common Animation Techniques:**
1. Scroll-triggered reveals using IntersectionObserver + Framer Motion
2. Number counters using countUp.js or custom animation loop
3. SVG path drawing with stroke-dashoffset animation
4. Staggered children animations with sequential delays
5. 3D card rotations on hover using CSS transforms with perspective
6. Smooth scroll with Lenis