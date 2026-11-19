# Editorial/Magazine Landing Page - Exhaustive Technical Specification

---

## Output Requirements

Generate a **single React component** that renders a complete editorial/magazine-style landing page. Requirements:
- Next.js with App Router
- TypeScript strict mode
- Tailwind CSS v4 with the custom theme in [tokens.md](tokens.md)
- Motion for minimal scroll reveals (images only)
- Mobile-first responsive design
- CSS Grid for complex editorial layouts

**Philosophy**: The page should feel like opening a beautifully designed magazine or literary publication. Typography does ALL the heavy lifting. Images are art-directed, not decorative. Every element has editorial intention. Restraint is elegance.

---

## Page Structure Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ MASTHEAD - Minimal header with publication name, date, issue number         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                                                                             │
│                         THE FUTURE                                          │
│                         OF DESIGN                                           │
│                                                                             │
│                    A meditation on craft,                                   │
│                    intention, and the tools                                 │
│                    that shape our work                                      │
│                                                                             │
│                         ◆                                                   │
│                                                                             │
│                    By Sarah Chen                                            │
│                    December 2024                                            │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ ═══════════════════════════════════════════════════════════════════════════ │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                                                                      │  │
│  │                    [FULL-BLEED HERO IMAGE]                           │  │
│  │                         Duotone treatment                            │  │
│  │                                                                      │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  Photography by Marcus Webb - San Francisco, 2024                          │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│      01                                                                     │
│      ──                                                                     │
│                                                                             │
│      The Beginning                                                          │
│                                                                             │
│                                                                             │
│      T  he story of design is, at its                                      │
│         core, a story of intention.                                        │
│         Every curve, every pixel,                 "Design is not           │
│         every carefully considered               just what it looks        │
│         spacing decision reflects                like and feels like.      │
│         a choice made with purpose.              Design is how             │
│                                                   it works."               │
│         The best designers understand                                       │
│         that their role is not to                 - Steve Jobs             │
│         decorate, but to clarify...                                        │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│      ┌────────────────────────────────────────────────────────────────┐    │
│      │                                                                │    │
│      │  [IMAGE WITH TEXT WRAP]                                        │    │
│      │                                                                │    │
│      └────────────────────────────────────────────────────────────────┘    │
│      Fig. 1 - The intersection of form and function                        │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│      02                                                                     │
│      ──                                                                     │
│                                                                             │
│      The Craft                                                              │
│                                                                             │
│      Body text continues with generous                                      │
│      line height and comfortable reading                                    │
│      width. The column is offset from                                       │
│      center to create visual interest...                                    │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│      ┌────────────────────────────────────┬────────────────────────────┐   │
│      │                                    │                            │   │
│      │  THE KEY                           │    10,000+                 │   │
│      │  STATISTICS                        │    Hours of research       │   │
│      │  ══════════                        │                            │   │
│      │                                    │    47                      │   │
│      │  A look at the numbers             │    Countries studied       │   │
│      │  behind design impact              │                            │   │
│      │                                    │    $2.4T                   │   │
│      │                                    │    Economic impact         │   │
│      │                                    │                            │   │
│      └────────────────────────────────────┴────────────────────────────┘   │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│      03                                                                     │
│      ──                                                                     │
│                                                                             │
│      The Future                                                             │
│                                                                             │
│      [Continued body text...]                                               │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  ═══════════════════════════════════════════════════════════════════════   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│      ABOUT THE AUTHOR                                                       │
│      ─────────────────                                                      │
│                                                                             │
│      [Photo]  Sarah Chen is a design writer and                            │
│               researcher based in San Francisco.                            │
│               Her work explores the intersection                            │
│               of technology and human experience.                           │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│      RELATED READINGS                                                       │
│                                                                             │
│      ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                  │
│      │              │  │              │  │              │                  │
│      │   [Image]    │  │   [Image]    │  │   [Image]    │                  │
│      │              │  │              │  │              │                  │
│      │  Title       │  │  Title       │  │  Title       │                  │
│      │  Author      │  │  Author      │  │  Author      │                  │
│      └──────────────┘  └──────────────┘  └──────────────┘                  │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│      NEWSLETTER                                                             │
│                                                                             │
│      Subscribe to receive our weekly                                        │
│      curation of design thinking.                                           │
│                                                                             │
│      [email@example.com____________] [SUBSCRIBE]                            │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  ═══════════════════════════════════════════════════════════════════════   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│      PUBLICATION NAME                Issue 47 - December 2024               │
│                                                                             │
│      About  •  Archive  •  Subscribe  •  Contact                            │
│                                                                             │
│      © 2024 All rights reserved.                                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Parts

Read [brief.md](brief.md) for the short version of this style. The full specification is split into the files below; read the ones the task needs, in this order.

| File | Contains | Lines |
|---|---|---|
| [tokens.md](tokens.md) | Color System; Typography System; Layout System | 390 |
| [motion.md](motion.md) | Animation System | 76 |
| [components.md](components.md) | Link Styling Component | 26 |
| [sections-1.md](sections-1.md) | Component Specifications: 1. Masthead (Header), 2. Hero Section (Typography-Focused), 3. Horizontal Rule / Divider, 4. Full-Bleed Image with Caption, 5. Article Section with Drop Cap and Pull Quote, 6. Inline Image with Caption | 592 |
| [sections-2.md](sections-2.md) | Component Specifications: 7. Statistics Box, 8. Author Bio Section, 9. Related Readings Grid, 10. Newsletter Signup, 11. Footer | 659 |
| [page.md](page.md) | Sample Data Structure | 141 |

---

## Required npm Packages

```bash
npm install next react react-dom motion
npm install -D typescript @types/node @types/react @types/react-dom tailwindcss @tailwindcss/postcss postcss
```

Install the current releases. The versions this spec was checked against are in the stack table in [SKILL.md](../../../SKILL.md).

**Note**: Minimal dependencies. No animation libraries beyond Motion. No icon libraries (no icons needed). Focus on typography.

---

## What to ABSOLUTELY AVOID

1. **Busy animations** - Let typography speak, not movement
2. **Rounded corners on images** - Keep editorial sharpness
3. **Drop shadows** - Clean, flat aesthetic
4. **Gradients** - Solid colors only
5. **Generic sans-serif everywhere** - Serif headlines are essential
6. **Competing visual elements** - One hero element per section
7. **Standard "website" patterns** - This is a publication, not a SaaS site
8. **Animated typography** - Words should be read, not watched
9. **Icon libraries** - No icons, typography is the icon
10. **Too many colors** - Restrained palette, maybe 2-3 colors total
11. **Equal-width columns** - Varied spans create visual interest
12. **Centered everything** - Offset content creates tension
13. **Small body text** - Reading comfort is paramount (min 18px)
14. **Tight line-height** - Generous vertical rhythm (1.7+)

---

## Final Notes

- **Typography First**: The page should feel like a designed publication. Headlines, body text, captions-all carefully considered.
- **Restraint is Elegance**: Minimal color. Minimal animation. Maximum impact through craft.
- **Reading Experience**: Optimize for comfortable, sustained reading. Proper column width (65ch), generous line-height, quality fonts.
- **Art Direction**: Every image should feel intentional. Consider duotone treatments, non-standard crops.
- **White Space**: Generous margins and section spacing. Let content breathe.
- **Editorial Details**: Drop caps, pull quotes, figure numbers, bylines-the details that make it feel published.
- **Grid Mastery**: Use CSS Grid with varied column spans. Offset from center. Create asymmetric tension.
- **Print Inspiration**: Think New York Times Magazine, The New Yorker, Bloomberg Businessweek.

Generate a complete, production-ready component implementing every part of this specification. Every section should be present with real, placeholder-free content. The result should feel like a beautifully designed magazine article.
