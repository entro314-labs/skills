# Tech SaaS Premium Landing Page - Complete Design Specification

You are a senior product designer and front-end engineer. Build a complete landing page in the premium tech SaaS style - a fusion of Linear, Supabase, and Clerk with meticulous attention to detail, sophisticated interactions, and data visualization.

**The product:** [Describe your product here]

---

## Technical Stack

```bash
npm install motion gsap lenis
```

Install the current releases. The versions this spec was checked against are in the stack table in [SKILL.md](../../../SKILL.md).

- Next.js with App Router
- React with TypeScript
- Tailwind CSS for all styling
- Motion for component animations
- GSAP + ScrollTrigger for scroll-based animations
- Lenis for smooth scrolling
- Canvas API for particle system

---

## Page Structure Overview

The page consists of exactly these sections in order:
1. **Header** (sticky navigation)
2. **Hero Section** (headline + product visual)
3. **Logo Wall** (social proof, subtle)
4. **Features Bento** (irregular grid of feature cards)
5. **Product Demo** (interactive dashboard mockup)
6. **How It Works** (3-step process with visual)
7. **Integrations** (logo grid with animations)
8. **Testimonials** (horizontal scroll)
9. **Pricing** (comparison table)
10. **CTA Section** (final call-to-action)
11. **Footer**

---

## Parts

Read [brief.md](brief.md) for the short version of this style. The full specification is split into the files below; read the ones the task needs, in this order.

| File | Contains | Lines |
|---|---|---|
| [tokens.md](tokens.md) | Color System; Typography; Responsive Breakpoints | 117 |
| [motion.md](motion.md) | Custom Cursor; Smooth Scroll (Lenis) | 81 |
| [components.md](components.md) | Buttons | 61 |
| [sections-1.md](sections-1.md) | Section 1: Header (Sticky Navigation); Section 2: Hero Section; Section 3: Logo Wall (Social Proof); Section 4: Features Bento Grid; Section 5: Product Demo (Interactive Dashboard) | 626 |
| [sections-2.md](sections-2.md) | Section 6: How It Works; Section 7: Integrations; Section 8: Testimonials (Horizontal Scroll); Section 9: Pricing (Comparison Table); Section 10: CTA Section; Section 11: Footer | 459 |

---

## What NOT to Do

- NO 3-column equal-width feature card grids
- NO centered hero with generic illustration
- NO soft pastel colors
- NO rounded, bubbly aesthetic (border-radius max 16px)
- NO generic stock illustrations
- NO "Trusted by 1000+ companies" as first element
- NO light mode (this is dark mode only)
- NO gradient borders (use solid or subtle)
- NO excessive animation (keep it premium, not playful)

---

## Output Requirements

Generate a single complete landing page with:
1. All 11 sections implemented exactly as specified
2. Canvas particle system in hero
3. Custom cursor component
4. Smooth scroll with Lenis
5. All scroll-triggered animations with GSAP/Motion
6. Responsive design for all breakpoints
7. Complete CSS/Tailwind styling matching specs
8. TypeScript types throughout
9. Example content populated

The code should be production-ready. Follow specifications exactly - do not deviate from colors, typography, spacing, or animation values.
