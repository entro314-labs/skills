# Elegant Minimal Dashboard - Exhaustive Technical Specification

Generate a complete, production-ready dashboard application using Next.js, TypeScript, Tailwind CSS, and Motion. This specification defines every visual element, animation parameter, and interactive behavior. Do not deviate from these values.

**Design Inspiration:** Craft.do (document-first beauty), Cal.com (infrastructure clarity), Linear (micro-interaction polish).

**Core Philosophy:** This dashboard should feel like a "control center for beautiful workspaces" - content-first, spatially aware, with movement that feels physics-based and premium. The opposite of cramped SaaS dashboards.

---

## Output Requirements

- Single React component (or page with imported components)
- Next.js with App Router
- TypeScript strict mode
- Tailwind CSS for all styling
- Motion for all animations
- CSS Grid with named areas
- Keyboard-accessible (⌘K command palette)
- Light mode primary (dark mode optional)

---

## Dashboard Structure Overview

The dashboard consists of these elements:
1. App Shell (Grid Layout Wrapper)
2. Left Sidebar (Navigation)
3. Main Content Area (Canvas)
4. Right Context Panel (Collapsible)
5. Command Palette (⌘K Modal)
6. Header Bar (within main area)

---

## Parts

Read [brief.md](brief.md) for the short version of this style. The full specification is split into the files below; read the ones the task needs, in this order.

| File | Contains | Lines |
|---|---|---|
| [tokens.md](tokens.md) | Color System; Typography System; Layout System | 342 |
| [motion.md](motion.md) | Animation System; Animation Timing Reference | 220 |
| [components-1.md](components-1.md) | Component Specifications: Sidebar, Navigation Item with Animated Indicator, Nav Section, Main Content Header, Card Grid (Document Cards), Context Panel (Right Side) | 668 |
| [components-2.md](components-2.md) | Component Specifications: Command Palette (⌘K), Button Components; Form Components; Keyboard Navigation | 493 |
| [page.md](page.md) | Sample Data Structure | 68 |

---

## Required npm Packages

```bash
npm install motion
npm install @radix-ui/react-dialog     # For command palette
npm install @radix-ui/react-dropdown-menu  # For menus
npm install clsx tailwind-merge        # For conditional classes
npm install lucide-react               # For icons
```

Install the current releases. The versions this spec was checked against are in the stack table in [SKILL.md](../../../SKILL.md).

---

## Final Notes

This specification prioritizes **clarity, precision, and polish**. The dashboard should feel like a premium control center where every interaction is intentional and satisfying.

Key principles:
1. **Generous spacing** - Never let elements feel cramped
2. **Subtle shadows** - Layered shadows create natural depth
3. **Physics-based motion** - Spring animations feel natural
4. **Clear hierarchy** - Information should be scannable
5. **Micro-interactions** - Small details (hover states, indicators) create polish

Generate the complete dashboard following these specifications exactly. Do not improvise or add elements not specified here.
