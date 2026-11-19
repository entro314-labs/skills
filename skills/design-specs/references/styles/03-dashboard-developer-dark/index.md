# Developer-First Dark Dashboard - Exhaustive Technical Specification

Generate a complete, production-ready developer dashboard using Next.js, TypeScript, Tailwind CSS, and Motion. This specification defines every visual element, animation parameter, and interactive behavior. Do not deviate from these values.

**Design Inspiration:** Linear (polish + speed), Supabase Studio (data-centric), VS Code (IDE layout), Vercel Dashboard (dark aesthetic), GitHub (developer patterns).

**Core Philosophy:** High information density without feeling cramped. Keyboard-first interactions. Dark UI that's easy on the eyes for extended use. Feels like infrastructure, not consumer software. Every millisecond matters.

---

## Output Requirements

- Single React component (or page with imported components)
- Next.js with App Router
- TypeScript strict mode
- Tailwind CSS for all styling
- Motion for minimal, fast animations
- Dark mode only (no light mode)
- Keyboard-accessible (Command Palette + shortcuts)
- Monospace fonts for all data

---

## Dashboard Structure Overview

The dashboard uses an IDE-style layout:
1. Top Command Bar (global actions + search)
2. Left Sidebar (navigation)
3. Main Content Area with Tabs
4. Right Inspector Panel (optional, context-aware)
5. Status Bar (bottom)

---

## Parts

Read [brief.md](brief.md) for the short version of this style. The full specification is split into the files below; read the ones the task needs, in this order.

| File | Contains | Lines |
|---|---|---|
| [tokens.md](tokens.md) | Color System; Typography System; Layout System | 367 |
| [motion.md](motion.md) | Animation System | 90 |
| [components-1.md](components-1.md) | Component Specifications: Command Bar (Top), Sidebar Navigation, Tab Bar | 542 |
| [components-2.md](components-2.md) | Component Specifications: Data Table, Status Badge, Code Block, Metric Card, Log Viewer | 652 |
| [components-3.md](components-3.md) | Component Specifications: Command Palette, Status Bar (Bottom), Inspector Panel (Right Side); Button Components; Form Components; Keyboard Shortcuts Reference | 705 |
| [page.md](page.md) | Sample Data Structure | 46 |

---

## Required npm Packages

```bash
npm install motion
npm install @radix-ui/react-dialog        # Modals
npm install @radix-ui/react-dropdown-menu # Dropdowns
npm install @radix-ui/react-checkbox      # Checkboxes
npm install @radix-ui/react-select        # Selects
npm install cmdk                          # Command palette
npm install prismjs                       # Syntax highlighting
npm install lucide-react                  # Icons
npm install clsx tailwind-merge           # Utilities
```

Install the current releases. The versions this spec was checked against are in the stack table in [SKILL.md](../../../SKILL.md).

---

## Final Notes

This specification prioritizes **speed, density, and developer-focused UX**. Every interaction should feel instant and purposeful.

Key principles:
1. **High information density** - Pack more into less space without clutter
2. **Keyboard-first** - Every action should have a keyboard shortcut
3. **Monospace for data** - All IDs, timestamps, and code in monospace
4. **Fast animations** - 100-150ms max, no bouncy springs
5. **Glow effects** - Subtle green glow for focus and success states
6. **Dark only** - No light mode, optimized for extended use

Generate the complete dashboard following these specifications exactly. Do not improvise or add elements not specified here.
