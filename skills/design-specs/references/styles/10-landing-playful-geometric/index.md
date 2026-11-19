# Playful Geometric Landing Page - Exhaustive Technical Specification

For creative tools, design products, or when you want energetic optimism. Bold shapes, vibrant colors, and motion that brings joy. This is NOT subtle-it's a visual playground where shapes are structural elements, color is used boldly, and animation brings personality.

---

## Output Requirements

- **Framework**: Next.js with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with custom configuration
- **Animation**: Motion (spring physics, bouncy feel)
- **Output**: Single page component with all sections

---

## Page Structure Overview

```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER - Transparent with pill nav                             │
│                                                                 │
│  ●Logo              About  Features  Pricing    [Get Started]   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  HERO - Shapes floating around text                             │
│                                                                 │
│       ▲                               ●                         │
│            ●                                                    │
│                                                                 │
│              MAKE                                               │
│              THINGS             ■                               │
│              BEAUTIFUL                                          │
│                                        ▲                        │
│     Subtext goes here in a                                      │
│     lighter weight font                      ●                  │
│                                                                 │
│        [Start Creating]     [Learn More]                        │
│                                                                 │
│    ■                                                            │
│                    ●                              ▲              │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  LOGOS MARQUEE - Bouncing on scroll                             │
│                                                                 │
│  ← Logo  Logo  Logo  Logo  Logo  Logo  Logo  Logo  Logo →       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

╭─────────────────────────────────────────────────────────────────╮
│  TILTED SECTION (-2deg) - Features Bento                        │
│                                                                 │
│   ┌──────────────────┐  ┌──────────────────┐  ┌────────────┐    │
│   │  ●               │  │      ▲           │  │            │    │
│   │  Feature 1       │  │  Feature 2       │  │  Feature 3 │    │
│   │  (BLUE bg)       │  │  (PINK bg)       │  │  (YELLOW)  │    │
│   │                  │  │                  │  │            │    │
│   └──────────────────┘  └──────────────────┘  └────────────┘    │
│   ┌────────────────────────────┐  ┌────────────────────────┐    │
│   │                            │  │        ■               │    │
│   │  Feature 4 (LARGE)         │  │  Feature 5             │    │
│   │  (GREEN bg)                │  │  (PURPLE bg)           │    │
│   └────────────────────────────┘  └────────────────────────┘    │
│                                                                 │
╰─────────────────────────────────────────────────────────────────╯

┌─────────────────────────────────────────────────────────────────┐
│  HOW IT WORKS - Numbered steps with bouncing shapes             │
│                                                                 │
│        (1)                   (2)                   (3)          │
│     ╭──────╮             ╭──────╮             ╭──────╮          │
│     │      │             │      │             │      │          │
│     │  ●   │  ───────▶   │  ■   │  ───────▶   │  ▲   │          │
│     │      │             │      │             │      │          │
│     ╰──────╯             ╰──────╯             ╰──────╯          │
│      Sign Up              Create               Share            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  TESTIMONIALS - Cards with random rotation                      │
│                                                                 │
│   ┌──────────────┐                                              │
│   │ "Quote..."   │  ┌──────────────┐                            │
│   │ - Name       │  │ "Quote..."   │   ┌──────────────┐         │
│   │ (rotate -3°) │  │ - Name       │   │ "Quote..."   │         │
│   └──────────────┘  │ (rotate 2°)  │   │ - Name       │         │
│                     └──────────────┘   │ (rotate -2°) │         │
│                                        └──────────────┘         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  PRICING - Pill-shaped cards                                    │
│                                                                 │
│   ╭──────────────╮  ╭──────────────────╮  ╭──────────────╮      │
│   │              │  │   POPULAR ●      │  │              │      │
│   │    Free      │  │                  │  │     Pro      │      │
│   │    $0        │  │      Plus        │  │     $49      │      │
│   │              │  │      $19         │  │              │      │
│   │  [Start]     │  │                  │  │  [Start]     │      │
│   │              │  │    [Start]       │  │              │      │
│   ╰──────────────╯  ╰──────────────────╯  ╰──────────────╯      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  CTA - Full-width with floating shapes                          │
│                                                                 │
│      ●                                                          │
│              Ready to create                                    │
│                something amazing?         ▲                     │
│                                                                 │
│                  [Get Started Free]                             │
│    ■                                              ●             │
│                         ▲                                       │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  FOOTER - Clean with colorful accents                           │
│                                                                 │
│  Logo          Product    Company    Resources    Legal         │
│                Link       Link       Link         Link          │
│                Link       Link       Link         Link          │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│  © 2024 Brand    ●  ■  ▲                      Twitter  GitHub   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Parts

Read [brief.md](brief.md) for the short version of this style. The full specification is split into the files below; read the ones the task needs, in this order.

| File | Contains | Lines |
|---|---|---|
| [tokens.md](tokens.md) | Color System; Typography System; Shape System; Responsive Considerations | 515 |
| [motion.md](motion.md) | Animation System | 183 |
| [components.md](components.md) | Tilted Section Component; Button Components | 137 |
| [sections.md](sections.md) | Component Specifications | 855 |
| [page.md](page.md) | Sample Data Structure | 147 |

---

## Required npm Packages

```bash
npm install next react react-dom motion
npm install -D typescript @types/react @types/node tailwindcss @tailwindcss/postcss postcss
```

Install the current releases. The versions this spec was checked against are in the stack table in [SKILL.md](../../../SKILL.md).

---

## What to ABSOLUTELY AVOID

1. **Muted, Safe Colors** - NO grays, NO pastels. Use bold, saturated colors.

2. **Static Layouts** - Everything should have potential for motion. Shapes float, cards lift, buttons bounce.

3. **Subtle Animations** - NO 0.2s fades. Use bouncy springs with lower damping (10-15).

4. **Corporate Tone** - NO stiff, serious language. Playful copy that matches the visual energy.

5. **Symmetry Everywhere** - Break the grid. Rotate cards slightly. Offset elements.

6. **Plain Rectangles** - Use pills, circles, blobs, squircles. Sharp corners are rare.

7. **Small Hover Effects** - Hover states should be dramatic: scale 1.1, rotate 5°, colorful shadows.

8. **Linear Easing** - Always use spring physics for interactive elements.

9. **Monochrome Sections** - Each section should have color variety. Multiple accent colors.

10. **Thin Fonts** - Use bold weights (600, 700, 800). Light weights don't match the energy.

11. **Small Typography** - Headlines should be massive (56-140px clamp).

12. **Invisible Shapes** - Background shapes should be clearly visible, not subtle accents.

13. **Standard Shadows** - Use colorful shadows that match the element's color.

14. **Slow Scroll Reveal** - Elements should bounce in energetically, not fade slowly.

15. **Boring Icons** - Use emoji or custom playful icons, not generic outline icons.

---

## Final Notes

This Playful Geometric style is about **joyful energy and bold expression**. Every element should feel alive-shapes float, buttons bounce, colors pop. It's a visual playground that communicates creativity and optimism.

Key differentiators:
- **Bold, saturated colors** - blue, pink, yellow, green, purple, orange
- **Geometric shapes** as structural elements, not decoration
- **Spring physics** with lower damping for bouncy feel
- **Tilted sections** and rotated cards
- **Massive typography** with colored words
- **Dramatic hover states** - scale, rotate, colorful shadows
- **Pills and circles** - no sharp rectangles
- **Energetic animations** - everything bounces in

The page should feel like it's celebrating creativity-confident, playful, and impossible to ignore. Serious product, playful presentation.
