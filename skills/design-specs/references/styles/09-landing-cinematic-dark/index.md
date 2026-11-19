# Cinematic Dark Landing Page - Exhaustive Technical Specification

Linear's "liquid glass" aesthetic taken further. A landing page that feels like a movie, not a website. Maximum impact through restraint. Each scroll reveals a new scene. Depth-of-field through blur layers. Sparse content where every word counts.

---

## Output Requirements

- **Framework**: Next.js with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with custom configuration
- **Animation**: Motion + GSAP (for scroll-triggered parallax)
- **Smooth Scroll**: Lenis (very slow lerp: 0.07 for cinematic feel)
- **Output**: Single page component with all sections
- **Mode**: Dark mode ONLY - no light mode variant

---

## Page Structure Overview

```
┌─────────────────────────────────────────────────────────────────┐
│  FULL VIEWPORT - HERO                                           │
│                                                                 │
│     ╭─────────────────────────────────────────────────────╮     │
│     │                                                     │     │
│     │                  [gradient orb blur]                │     │
│     │                                                     │     │
│     ╰─────────────────────────────────────────────────────╯     │
│                                                                 │
│                         HEADLINE                                │
│                     (72-96px, centered)                         │
│                                                                 │
│                   One line of subtext                           │
│                                                                 │
│                       [Start]                                   │
│                                                                 │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                   (noise overlay)                       │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  FULL VIEWPORT - PRODUCT SHOWCASE                               │
│                                                                 │
│              ╭───────────────────────────────╮                  │
│              │                               │                  │
│              │    ┌─────────────────────┐    │   (glass panel)  │
│              │    │                     │    │                  │
│              │    │   [product mockup]  │    │                  │
│              │    │    with perspective │    │                  │
│              │    │      & blur layers  │    │                  │
│              │    │                     │    │                  │
│              │    └─────────────────────┘    │                  │
│              │                               │                  │
│              ╰───────────────────────────────╯                  │
│                                                                 │
│                    "A single line of text"                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  FULL VIEWPORT - FEATURE 1                                      │
│                                                                 │
│                     ○ (gradient orb - different color)          │
│                                                                 │
│                                                                 │
│              Feature Headline Here                              │
│                                                                 │
│            Brief supporting text. Nothing more.                 │
│                                                                 │
│                                                                 │
│               ┌─────────────────────────┐                       │
│               │   [visual element]      │                       │
│               │    floating with        │                       │
│               │    subtle parallax      │                       │
│               └─────────────────────────┘                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  FULL VIEWPORT - FEATURE 2                                      │
│                                                                 │
│   ┌────────────────────────────────────────────────────────┐    │
│   │                                                        │    │
│   │                  [full-width visual]                   │    │
│   │                  edge-to-edge glow                     │    │
│   │                                                        │    │
│   └────────────────────────────────────────────────────────┘    │
│                                                                 │
│                                                                 │
│                    Short Headline                               │
│                                                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  FULL VIEWPORT - SINGLE QUOTE                                   │
│                                                                 │
│                                                                 │
│                                                                 │
│                                                                 │
│           "A powerful statement that resonates."                │
│                                                                 │
│                         - Name                                  │
│                                                                 │
│                                                                 │
│                                                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  FULL VIEWPORT - CTA                                            │
│                                                                 │
│                                                                 │
│                                                                 │
│                       Ready to begin?                           │
│                                                                 │
│                         [Start]                                 │
│                                                                 │
│                                                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  FOOTER - Minimal                                               │
│                                                                 │
│  Logo                                           Links  Social   │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│                        © 2024 Brand                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Parts

Read [brief.md](brief.md) for the short version of this style. The full specification is split into the files below; read the ones the task needs, in this order.

| File | Contains | Lines |
|---|---|---|
| [tokens.md](tokens.md) | Color System; Typography System; Background System; Glass Morphism System; Responsive Considerations | 535 |
| [motion.md](motion.md) | Animation System | 183 |
| [components.md](components.md) | Button Components; Icon System | 169 |
| [sections.md](sections.md) | Component Specifications | 608 |
| [page.md](page.md) | Sample Data Structure; Complete Page Assembly | 195 |

---

## Required npm Packages

```bash
npm install next react react-dom motion lenis gsap
npm install -D typescript @types/react @types/node tailwindcss @tailwindcss/postcss postcss
```

Install the current releases. The versions this spec was checked against are in the stack table in [SKILL.md](../../../SKILL.md).

---

## What to ABSOLUTELY AVOID

1. **Dense Content** - NO more than 20-30 words per viewport. Let visuals speak.

2. **Bright Colors** - NO saturated colors. Everything subtle, muted, glowing softly.

3. **Multiple CTAs** - ONE call-to-action per section maximum. Often zero.

4. **Feature Lists** - NO bullet points, NO feature grids. One concept at a time.

5. **Light Mode** - This is dark mode ONLY. No light variant.

6. **Busy Animations** - NO bouncy, energetic movement. Everything slow, smooth, cinematic.

7. **Small Text** - Headlines should be 48-96px. Subtext should be sparse.

8. **Competing Elements** - ONE focal point per viewport. Everything else recedes.

9. **Testimonial Carousels** - At most ONE powerful quote. No carousel.

10. **Salesy Copy** - NO urgency, NO "limited time", NO aggressive marketing language.

11. **Crowded Layouts** - Full-height sections. Massive negative space.

12. **Fast Scroll** - Lenis lerp should be 0.07 or lower. Scrolling feels like gliding.

13. **Sharp Edges on Glass** - Glass panels need 24px+ border-radius and rim lighting.

14. **Static Backgrounds** - Gradient orbs should pulse slowly. Light flares should sweep.

15. **Generic Stock Photos** - Product mockups only. High-quality renders with depth.

---

## Final Notes

This Cinematic Dark style is about **atmosphere over information**. Every scroll should feel like a scene transition in a film. Maximum impact through restraint-every element must earn its place.

Key differentiators:
- **Full-viewport sections** - one concept per screen
- **Sparse content** - 20-30 words maximum per section
- **Glass morphism** with rim lighting and light flares
- **Gradient orbs** for ambient depth
- **Very slow scroll** (lerp: 0.07) for cinematic pacing
- **Subtle parallax** on multiple layers
- **Mouse-reactive glass panels** (2-3px movement)
- **Near-black background** (#050505) with no light mode

The page should feel like a movie trailer-atmospheric, confident, mysterious. Not selling features, but evoking emotion.
