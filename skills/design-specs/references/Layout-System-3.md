**Layout System:**
- Mock dashboard UI prominently featured as hero - positioned at 45-degree viewing angle with subtle perspective transform
- Line graph with animated path drawing using stroke-dashoffset technique
- Alternating content blocks with image-left/text-right, then image-right/text-left
- Infinite scrolling marquee text that repeats horizontally
- Text elements duplicate and wrap seamlessly with no visible breaks
- No traditional grid - content flows as continuous ribbon
- Asymmetric sections that break standard 12-column grid
- Grid-based product showcase cards with 3-column layout at desktop, stacking at mobile
- Bento box grid layout with uneven card sizes
- CSS Grid with named template areas
- Asymmetric spacing between sections (not uniform padding)
- Full-bleed sections alternating with constrained content areas
3. Overlapping layers with z-index choreography
4. Full-bleed sections with viewport height units
5. Floating elements positioned with absolute/fixed



**Animation Specs:**
- Parallax on hero section background elements (moving at 0.5x scroll speed)
- Staggered entrance animations for feature cards (delay: 100ms between each)
- Micro-interactions on CTA buttons: scale(1.05) on hover with cubic-bezier(0.34, 1.56, 0.64, 1)
- Hover-triggered morphing on product demo cards
- Scroll velocity-based blur on background elements using Lenis smooth scroll
- Grid items that expand on hover, pushing adjacent items (using grid-template-columns with fr units)
- Animated node connections with lines that draw using stroke-dasharray animation
- Feature card reveals on scroll with stagger effect
- Screenshot mockups that tilt on scroll (rotateX: 5deg, rotateY: -5deg)


**Colors/Effects:**
- Gradient overlays on hero images
- Subtle shadow lifting on card hover: translateY(-8px) with box-shadow depth change
- Textured backgrounds that change per section
- Icon animations (folder-plus, sky icon) that draw in on scroll
- Gradient backgrounds transitioning between sections
- Hover states on feature cards revealing more detail
- Frosted glass morphism on dashboard panels (backdrop-filter: blur(20px) with semi-transparent backgrounds)

**Interactive Components:**
- Tabbed interface showing different dashboard views
- Tag pills with rounded borders that animate scale on hover
- Logo wall with opacity fade-in on scroll
- Comparison table with animated checkmarks appearing
- CTA button with gradient background and hover glow
- Logo grid items scale up 1.05x on hover
- Integration badges rotate slightly on hover (-2deg)
- Button states with animated gradient shift
- Checkbox/toggle animations with smooth transitions


**Data Visualization:**
- Scatter plot with quadrant labels (Leaders, Laggers, Niche Players, Controversial)
- Brand logos positioned as interactive dots
- Animated SVG paths for line charts with gradient stroke
- Circular avatars with colored borders for sentiment indicators

**Dashboard/Product UI Showcases:**
1. Position at 45-degree angle using transform: rotateX(-15deg) rotateY(15deg)
2. Add multiple shadow layers for depth
3. Animate internal elements (charts drawing, numbers updating)
4. Use backdrop-filter: blur for glassmorphism effect
5. Show "live" state with blinking indicators or updating timestamps


**Typography:**
- Variable font weight animations on headers (400 to 600 on scroll into view)
- Letter-spacing adjustments on hover states
- Large display fonts (72px+) with tight line-height (1.1)
- Large display headings with gradient text fills using background-clip: text
1. Gradient text using background: linear-gradient + -webkit-background-clip: text
2. Large display sizes (72-120px) for hero headings
3. Increased letter-spacing (0.05-0.1em) for labels
4. Monospace fonts for technical content/metrics
5. Split lines with decorative separators



