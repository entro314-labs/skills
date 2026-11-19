**Layout Structure:**
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


**Animation Specs:**
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

**Colors/Effects:**
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
6. Smooth scroll with Lenis or custom implementation
