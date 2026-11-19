# Prompting Notes

How to get a bespoke result out of the design prompts in this library, and what to write when the output still looks generic.

## Why output looks generic

AI models have seen millions of SaaS landing pages in training data and almost zero truly experimental web design. Asked for a style, a model pattern-matches the visual surface and strips out the technical complexity that makes the reference sites feel premium. Linear and Headspace are not impressive because of their layout. They are impressive because of:

- Canvas-based animations for the graph/network visualization
- Spring physics animations (they use Motion with spring configs)
- Real-time cursor tracking with smooth interpolation
- Subtle parallax on scroll with different layers moving at different rates
- Micro-interactions on every hover state with custom easing curves
- Animated graphs: data visualization is the ingredient most prompts leave out

## What to specify

Reference specific techniques, not abstract qualities.

**Layout**
- Use CSS Grid with named grid areas, not flex containers
- Single-page with sections that break the grid system
- Asymmetric layouts that change at each breakpoint
- Overlapping layers with z-index choreography

**Motion**
- Implement scroll-triggered GSAP animations with ScrollTrigger
- Build with Motion layout animations, not opacity fades
- Build with react-spring (`@react-spring/web`) for physics-based animations, not CSS transitions
- Every interactive element needs a spring animation with mass: 1, tension: 280, friction: 60
- Intersection Observer to trigger staggered fade-ins with 100ms delays
- Add scroll-velocity-based blur effects using Lenis smooth scroll
- Use variable fonts with animation on font-weight and width axes

**Cursor and canvas**
- Custom cursor interactions with pointer events
- Implement cursor follower div that lerps to cursor position with 0.15 damping
- Add a canvas element with animated particles that respond to mouse position
- Large-format WebGL gradient background using three.js and shader materials

**SVG and data visualization**
- SVG blob shapes with animated path morphing
- Add an animated SVG path that draws on scroll using stroke-dashoffset
- Build a force-directed graph with d3-force
- Create an interactive grid that morphs on hover using SVG transforms

More one-line techniques are in [technique-checklist.md](technique-checklist.md).

## Working with the prompts

1. Pick the prompt that matches the aesthetic goal.
2. Fill in the customization points: product description, accent colors, typography, and the sections you need.
3. State the tech stack if it differs from the defaults in [SKILL.md](../SKILL.md).
4. Name the libraries upfront: Motion, GSAP, Lenis.
5. Pair the text prompt with screenshot references when possible.
6. Request the page section by section (hero, then features, then footer) instead of the full page.
7. Reject the first output if it feels generic and demand structural changes. The model will still default to safe choices.

## Anti-patterns to reject explicitly

Tell the model NOT to create:

- 3-column equal-width feature card grids
- Centered hero with text-over-image
- Generic rounded cards with soft shadows
- Gradient backgrounds with random floating shapes (unless intentional)
- Stock icon libraries used generically (Heroicons, Lucide)
- "Trust the process" / "Built with love" copy
- Standard testimonial carousels
- Generic "How it works" 1-2-3 sections

## Implementation gotchas

- `backdrop-blur-xl` combined with `-translate-x-1/2` can flicker from compositing issues on some browsers. Add `will-change-transform` to the element to force GPU-accelerated compositing.
