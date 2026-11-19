The problem is that AI models have seen millions of SaaS landing pages in training data and almost zero truly experimental web design. Here's what actually works:

Reference specific aesthetics, not abstract qualities:


Use CSS Grid with named grid areas, not flex containers
Implement scroll-triggered GSAP animations with ScrollTrigger
Use variable fonts with animation on font-weight and width axes
Build with Framer Motion layout animations, not opacity fades

Break the component pattern:

single-page with sections that break the grid system
asymmetric layouts that change at each breakpoint
overlapping layers with z-index choreography
custom cursor interactions with pointer events

Constrain the palette/system:

The reality:
AI will still default to safe choices. You'll get better results by:

Providing actual screenshot references
Iterating section by section rather than full page
Asking for specific animation libraries/techniques upfront
Rejecting the first output and demanding structural changes


Right - because the AI is pattern-matching the visual style but stripping out the technical complexity that makes those sites feel premium. Linear and Headspace aren't impressive because of their layout, they're impressive because of:

What Linear actually does:

Canvas-based animations for the graph/network visualization
Spring physics animations (they use Framer Motion with spring configs)
Subtle parallax on scroll with different layers moving at different rates
Micro-interactions on every hover state with custom easing curves

What you need to specify:

Add a canvas element with animated particles that respond to mouse position
Implement cursor follower div that lerps to cursor position with 0.15 damping
Add scroll-velocity-based blur effects using Lenis smooth scroll

The missing ingredient - data visualization: Linear's impressive because of the animated graphs.

Add an animated SVG path that draws on scroll using stroke-dashoffset
Build a force-directed graph with d3-force
Create an interactive grid that morphs on hover using SVG transforms
