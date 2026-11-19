# Neobrutalist Landing Page - Exhaustive Technical Specification

---

## Output Requirements

Generate a **single React component** that renders a complete neobrutalist landing page. Requirements:
- Next.js with App Router
- TypeScript strict mode
- Tailwind CSS v4 with the custom theme in [tokens.md](tokens.md)
- Motion for animations (TWEEN ONLY - NO SPRINGS)
- NO external icon libraries - custom stroke-only SVG icons
- Mobile-first responsive design

**Philosophy**: Reject polished SaaS aesthetics. Embrace deliberate rawness, hard edges, solid shadows, asymmetric layouts, and honest "this is a marketing page" energy. The anti-design IS the design.

---

## Page Structure Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│ HEADER - Fixed, transparent, black border-bottom 3px                    │
├─────────────────────────────────────────────────────────────────────────┤
│ HERO SECTION                                                            │
│ ┌──────────────────────────────────┬────────────────────────────────┐   │
│ │ MASSIVE HEADLINE                 │ Product Screenshot             │   │
│ │ with hard text shadow            │ Tilted 5-10deg                 │   │
│ │                                  │ Thick black border             │   │
│ │ Subheadline text                 │ Solid offset shadow            │   │
│ │                                  │                                │   │
│ │ [START FREE →] [SEE DEMO]        │                                │   │
│ └──────────────────────────────────┴────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────────────┤
│ MARQUEE - Infinite scroll, thick borders top/bottom                     │
│ ════════════════════════════════════════════════════════════════════    │
│ TRUSTED BY 10,000+ TEAMS • FEATURED IN TECHCRUNCH • 99.9% UPTIME •      │
│ ════════════════════════════════════════════════════════════════════    │
├─────────────────────────────────────────────────────────────────────────┤
│ FEATURES SECTION - Asymmetric bento grid                                │
│ ┌───────────────────────────┬───────────────┐                           │
│ │                           │               │                           │
│ │    FEATURE 01             │  FEATURE 02   │                           │
│ │    Large card             │  Smaller      │                           │
│ │                           │               │                           │
│ ├─────────────┬─────────────┴───────────────┤                           │
│ │ FEATURE 03  │        FEATURE 04           │                           │
│ │ Small       │        Wide card            │                           │
│ └─────────────┴─────────────────────────────┘                           │
├─────────────────────────────────────────────────────────────────────────┤
│ HOW IT WORKS - Numbered steps with oversized numbers                    │
│                                                                         │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐            │
│  │ 01             │  │ 02             │  │ 03             │            │
│  │ ════           │  │ ════           │  │ ════           │            │
│  │ Sign Up        │→→│ Connect        │→→│ Launch         │            │
│  │ Description    │  │ Description    │  │ Description    │            │
│  └────────────────┘  └────────────────┘  └────────────────┘            │
├─────────────────────────────────────────────────────────────────────────┤
│ SOCIAL PROOF SECTION                                                    │
│                                                                         │
│ Logo Wall (bordered grid)    │    Stats Block                          │
│ ┌────┬────┬────┬────┐        │    ┌─────────────────────────┐          │
│ │LOGO│LOGO│LOGO│LOGO│        │    │ 10,000+    │   99.9%    │          │
│ ├────┼────┼────┼────┤        │    │ USERS      │   UPTIME   │          │
│ │LOGO│LOGO│LOGO│LOGO│        │    ├────────────┼────────────┤          │
│ └────┴────┴────┴────┘        │    │ 50M+       │   <100ms   │          │
│                              │    │ REQUESTS   │   LATENCY  │          │
│                              │    └────────────┴────────────┘          │
├─────────────────────────────────────────────────────────────────────────┤
│ TESTIMONIALS - Horizontal scroll cards                                  │
│                                                                         │
│  ┌────────────────────┐ ┌────────────────────┐ ┌────────────────────┐  │
│  │ "Quote text..."    │ │ "Quote text..."    │ │ "Quote text..."    │  │
│  │                    │ │                    │ │                    │  │
│  │ - PERSON NAME      │ │ - PERSON NAME      │ │ - PERSON NAME      │  │
│  │   COMPANY          │ │   COMPANY          │ │   COMPANY          │  │
│  └────────────────────┘ └────────────────────┘ └────────────────────┘  │
├─────────────────────────────────────────────────────────────────────────┤
│ PRICING SECTION - Asymmetric 2-column                                   │
│                                                                         │
│  ┌─────────────────────────────┐  ┌─────────────────────────────────┐  │
│  │ FREE                        │  │ PRO ★                           │  │
│  │ $0/mo                       │  │ $29/mo                          │  │
│  │ ──────────────              │  │ ──────────────                  │  │
│  │ ✓ Feature one               │  │ ✓ Everything in Free            │  │
│  │ ✓ Feature two               │  │ ✓ Unlimited projects            │  │
│  │ ✓ Feature three             │  │ ✓ Priority support              │  │
│  │                             │  │ ✓ Custom integrations           │  │
│  │ [GET STARTED]               │  │ [START FREE TRIAL →]            │  │
│  └─────────────────────────────┘  └─────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────────┤
│ FAQ SECTION - Accordion with hard transitions                           │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ + HOW DOES BILLING WORK?                                        │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ − WHAT ABOUT SECURITY?                                          │   │
│  │   Answer text appears instantly, no fade                        │   │
│  └─────────────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────────────┤
│ FINAL CTA - Full-width accent background                                │
│ ╔═══════════════════════════════════════════════════════════════════╗  │
│ ║                                                                    ║  │
│ ║  READY TO START?                                                   ║  │
│ ║  Stop overthinking. Start building.                                ║  │
│ ║                                                                    ║  │
│ ║  [GET STARTED FREE →]                                              ║  │
│ ║                                                                    ║  │
│ ╚═══════════════════════════════════════════════════════════════════╝  │
├─────────────────────────────────────────────────────────────────────────┤
│ FOOTER - Minimal, bordered sections                                     │
│ Logo │ Links │ Links │ Links │ Social │                                 │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Parts

Read [brief.md](brief.md) for the short version of this style. The full specification is split into the files below; read the ones the task needs, in this order.

| File | Contains | Lines |
|---|---|---|
| [tokens.md](tokens.md) | Color System; Typography System; Layout System | 277 |
| [motion.md](motion.md) | Animation System | 124 |
| [components.md](components.md) | Button Components; Custom SVG Icons (Stroke Only); Animated Counter Component | 274 |
| [sections-1.md](sections-1.md) | Component Specifications: 1. Header Component, 2. Hero Section, 3. Marquee Section, 4. Features Bento Grid | 572 |
| [sections-2.md](sections-2.md) | Component Specifications: 5. How It Works Section, 6. Social Proof Section (Logo Wall + Stats), 7. Testimonials Section | 534 |
| [sections-3.md](sections-3.md) | Component Specifications: 8. Pricing Section, 9. FAQ Section (Accordion), 10. Final CTA Section, 11. Footer | 695 |
| [page.md](page.md) | Sample Data Structure | 160 |

---

## Required npm Packages

```bash
npm install next react react-dom motion
npm install -D typescript @types/node @types/react @types/react-dom tailwindcss @tailwindcss/postcss postcss
```

Install the current releases. The versions this spec was checked against are in the stack table in [SKILL.md](../../../SKILL.md).

**Note**: Minimal dependencies. No GSAP (use CSS animations instead). No Lenis (native scroll). No icon libraries (custom stroke SVGs).

---

## What to ABSOLUTELY AVOID

1. **Rounded corners** - NEVER use border-radius > 0 anywhere
2. **Soft/blurred shadows** - ALL shadows must be solid offset (blur: 0)
3. **Gradients** - NO linear-gradient, radial-gradient, or gradient overlays
4. **Spring animations** - NO Motion spring physics, bouncy effects
5. **Smooth scrolling** - Native scroll only, no Lenis/Locomotive
6. **Icon libraries** - NO Lucide, Heroicons, Feather, etc. Custom stroke SVGs only
7. **Symmetric layouts** - Avoid centered, equal-column grids
8. **Subtle opacity** - Commit to solid colors, minimal opacity use
9. **Serif fonts** - Stick to geometric sans-serif (Space Grotesk)
10. **Decorative elements** - No swooshes, blobs, or organic shapes
11. **3D transforms** - Minimal use, keep flat aesthetic
12. **Parallax effects** - Keep elements in flat plane
13. **Hover glows** - No box-shadow color transitions

---

## Final Notes

- **Intentional Roughness**: The design should feel deliberately raw and honest, not polished
- **High Contrast**: Strong color choices, no wishy-washy grays
- **Typography as Design**: Large bold headlines ARE the visual elements
- **Grid Visible**: Borders should be prominent, gaps visible
- **Fast Interactions**: All hover states snappy (100-150ms max)
- **Mobile Considerations**: Stack aggressively, maintain border thickness
- **Accessibility**: Despite rough aesthetic, maintain proper contrast ratios and focus states
- **Print-Inspired**: Think zines, punk flyers, constructivist posters

Generate a complete, production-ready component implementing every part of this specification. Every section should be present with real, placeholder-free content. The result should be immediately usable as a landing page.
