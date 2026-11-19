# Japanese Minimalist Landing Page - Exhaustive Technical Specification

A landing page inspired by Japanese design principles: Ma (negative space), Wabi-sabi (beauty in imperfection), and Kanso (simplicity). This is NOT generic minimalism - it's intentional restraint where space itself is a design element.

---

## Output Requirements

- **Framework**: Next.js with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with custom configuration
- **Animation**: Motion (extremely subtle - nearly imperceptible)
- **Smooth Scroll**: Lenis (very slow lerp: 0.05)
- **Output**: Single page component with all sections

---

## Page Structure Overview

```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER (nearly invisible - small text, extreme margins)        │
│                                                                 │
│  nav items                              logo mark               │
│  (10px, uppercase, tracked)             (simple line icon)      │
└─────────────────────────────────────────────────────────────────┘

                              (200px space)

┌─────────────────────────────────────────────────────────────────┐
│  HERO - Asymmetric Typography                                   │
│                                                                 │
│     ┌─────────────────┐                                         │
│     │                 │                                         │
│     │   LESS          │                                         │
│     │   IS            │                                         │
│     │   MORE          │         (massive negative space)        │
│     │                 │                                         │
│     │   subtitle      │                                         │
│     │   (small)       │                                         │
│     │                 │                                         │
│     │   [Explore]     │                                         │
│     └─────────────────┘                                         │
│                                                                 │
│  left: 15%                                                      │
└─────────────────────────────────────────────────────────────────┘

                              (200px space)

┌─────────────────────────────────────────────────────────────────┐
│  PHILOSOPHY - Single Statement                                  │
│                                                                 │
│                                                                 │
│              "The space between things                          │
│               is as important as                                │
│               the things themselves."                           │
│                                                                 │
│                     - attribution                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

                              (200px space)

┌─────────────────────────────────────────────────────────────────┐
│  FEATURE 1 - Image Left, Text Right (Wide Gap)                  │
│                                                                 │
│  ┌──────────────┐                 ┌─────────────────────────┐   │
│  │              │                 │  01                     │   │
│  │   [image]    │     120px gap   │                         │   │
│  │   grayscale  │                 │  FEATURE TITLE          │   │
│  │              │                 │                         │   │
│  │              │                 │  Description text with  │   │
│  └──────────────┘                 │  generous line height   │   │
│                                   │  and letter spacing.    │   │
│                                   └─────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘

                              (200px space)

┌─────────────────────────────────────────────────────────────────┐
│  FEATURE 2 - Text Left, Image Right (Reversed)                  │
│                                                                 │
│  ┌─────────────────────────┐                 ┌──────────────┐   │
│  │  02                     │                 │              │   │
│  │                         │     120px gap   │   [image]    │   │
│  │  FEATURE TITLE          │                 │   grayscale  │   │
│  │                         │                 │              │   │
│  │  Description text       │                 │              │   │
│  │  continues here.        │                 └──────────────┘   │
│  └─────────────────────────┘                                    │
└─────────────────────────────────────────────────────────────────┘

                              (200px space)

┌─────────────────────────────────────────────────────────────────┐
│  VERTICAL ACCENT - Side Text                                    │
│                                                                 │
│  │ 本                                                           │
│  │ 質  ──────────────────────────────────────────────────────   │
│  │ 的                                                           │
│  │                       Horizontal divider line                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

                              (200px space)

┌─────────────────────────────────────────────────────────────────┐
│  FEATURE 3 - Full Width Image with Overlay Text                 │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                         │    │
│  │                    [full bleed image]                   │    │
│  │                       grayscale                         │    │
│  │                                                         │    │
│  │         Small caption text                              │    │
│  │         bottom left                                     │    │
│  │                                                         │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

                              (200px space)

┌─────────────────────────────────────────────────────────────────┐
│  PRINCIPLES - Three Concepts                                    │
│                                                                 │
│      間                    簡素                   侘寂           │
│      MA                   KANSO                 WABI-SABI       │
│                                                                 │
│   Negative space      Simplicity             Imperfection       │
│   as presence         as clarity             as beauty          │
│                                                                 │
│   Brief description   Brief description      Brief description  │
│   with generous       continues with         ends here with     │
│   line height.        same styling.          same pattern.      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

                              (200px space)

┌─────────────────────────────────────────────────────────────────┐
│  TESTIMONIAL - Single Voice                                     │
│                                                                 │
│                                                                 │
│         "The simplicity brought clarity                         │
│          to everything we do."                                  │
│                                                                 │
│                                                                 │
│              Name                                               │
│              Role, Company                                      │
│                                                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

                              (200px space)

┌─────────────────────────────────────────────────────────────────┐
│  CTA - Minimal Call to Action                                   │
│                                                                 │
│                                                                 │
│              Begin your journey                                 │
│                                                                 │
│                 [Start]                                         │
│                                                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

                              (200px space)

┌─────────────────────────────────────────────────────────────────┐
│  FOOTER - Understated                                           │
│                                                                 │
│  Brand                                                          │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  Links (tiny)                              Social (icons only)  │
│                                                                 │
│                        © 2024                                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Parts

Read [brief.md](brief.md) for the short version of this style. The full specification is split into the files below; read the ones the task needs, in this order.

| File | Contains | Lines |
|---|---|---|
| [tokens.md](tokens.md) | Color System; Typography System; Texture System; Layout System; Responsive Considerations | 449 |
| [motion.md](motion.md) | Animation System | 195 |
| [components.md](components.md) | Button Components; Icon System; Image Treatment | 390 |
| [sections.md](sections.md) | Component Specifications | 774 |
| [page.md](page.md) | Sample Data Structure; Complete Page Assembly | 241 |

---

## Required npm Packages

```bash
npm install next react react-dom motion lenis
npm install -D typescript @types/react @types/node tailwindcss @tailwindcss/postcss postcss
```

Install the current releases. The versions this spec was checked against are in the stack table in [SKILL.md](../../../SKILL.md).

---

## What to ABSOLUTELY AVOID

1. **Bright, Saturated Colors** - No neon, no vibrant hues. Everything muted, desaturated, natural.

2. **Centered Layouts** - Almost nothing centered. Use asymmetric positioning (15%, 20%, not 50%).

3. **Fast Animations** - NO animations under 0.8s. Everything slow, contemplative. 1.2-2s typical.

4. **Dense Content** - NO packed sections. Massive negative space (200px+ padding) between everything.

5. **Glossy Effects** - NO gradients, NO shiny surfaces, NO glass effects. Matte, paper-like textures only.

6. **Drop Shadows** - NO box-shadow for depth. If shadows exist, they're barely perceptible.

7. **Decorative Elements** - NO flourishes, NO icons for decoration, NO background patterns.

8. **Bold Font Weights** - NO font-weight above 400. Primary text is 300 (light).

9. **Standard Hover States** - NO scale transforms, NO dramatic color changes. Opacity shifts only (1 → 0.7).

10. **Busy Backgrounds** - NO complex backgrounds. Solid colors with optional subtle grain texture.

11. **Multiple Focal Points** - ONE element dominates each section. Everything else recedes.

12. **Rounded Corners** - Minimal to none. Sharp, precise edges.

13. **Spring Animations** - NO bouncy physics. Use tween with custom easing only.

14. **Stock Photo Aesthetic** - NO colorful lifestyle images. Grayscale, high contrast, isolated subjects.

15. **Small Margins** - NO tight spacing. Gap values should be 80px, 120px, 200px-never 16px, 24px.

---

## Final Notes

This Japanese Minimalist style is about **absence as presence**. Every design decision should ask: "Can I remove this?" The goal is not emptiness but **intentional restraint**-a calm, contemplative experience where the user's attention is never fought for but gently guided.

Key differentiators from generic minimalism:
- **Asymmetry** over symmetry
- **Light weights** (300) over regular (400)
- **Very slow animations** (1.2-2s) over quick (0.2-0.3s)
- **Extreme whitespace** (200px) over moderate (40-60px)
- **Grayscale imagery** over color
- **Off-center positioning** over centered

The page should feel like a meditation-unhurried, breathing, with space for contemplation.
