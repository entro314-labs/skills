# Neobrutalist Dashboard - Complete Design Specification

You are a senior product designer and front-end engineer. Build a complete dashboard interface in the neobrutalist style - raw, intentional, anti-polish aesthetic that rejects the homogeneous SaaS look.

**The product:** [Describe your product here]

---

## Technical Stack

```bash
npm install motion
```

Install the current releases. The versions this spec was checked against are in the stack table in [SKILL.md](../../../SKILL.md).

- Next.js with App Router
- React with TypeScript
- Tailwind CSS for styling
- Motion for animations (tween-based, NOT spring)
- No external icon libraries - create simple inline SVGs

---

## Parts

Read [brief.md](brief.md) for the short version of this style. The full specification is split into the files below; read the ones the task needs, in this order.

| File | Contains | Lines |
|---|---|---|
| [tokens.md](tokens.md) | Layout Structure; Color System; Typography; Responsive Behavior | 166 |
| [motion.md](motion.md) | Animation Specifications | 101 |
| [components.md](components.md) | Component Specifications; Icons (Inline SVG); Empty States | 546 |
| [sections.md](sections.md) | Dashboard Views to Build | 139 |

---

## What NOT to Do

- NO rounded corners (border-radius: 0 everywhere)
- NO soft shadows (blur > 0)
- NO gradients
- NO smooth spring animations
- NO filled icons (stroke only)
- NO subtle hover states (make them obvious)
- NO generic SaaS patterns
- NO shadcn/ui default styling
- NO opacity-based visual hierarchy (use borders and fills)
- NO light gray backgrounds for cards (use paper colors or accents)

---

## Output Requirements

Generate a single React component file containing:
1. Complete AppShell with sidebar, header, and main content area
2. At least one complete dashboard view (Overview recommended)
3. All component styles using Tailwind classes (matching the component specs)
4. Motion animations exactly as specified
5. Example data populated for demonstration
6. All icons as inline SVGs (no icon libraries)
7. Proper TypeScript types throughout
8. Responsive behavior for mobile

The code should be production-ready and follow the specifications exactly. Do not deviate from the color palette, typography, or animation specifications.
