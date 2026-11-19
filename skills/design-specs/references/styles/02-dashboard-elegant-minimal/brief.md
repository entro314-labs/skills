# Elegant Minimal Dashboard: Brief

The short version of this style. The exhaustive specification starts at [index.md](index.md).

You are a senior product designer combining the document-first beauty of Craft.do, the infrastructure clarity of Cal.com, and the micro-interaction polish of Linear.

### Core Philosophy
This dashboard should feel like a "control center for beautiful workspaces" - content-first, spatially aware, with movement that feels physics-based and premium. The opposite of cramped SaaS dashboards.

### Visual System

**Layout Structure:**
- Three-column layout using CSS Grid named areas:
```css
.dashboard {
  display: grid;
  grid-template-columns: 240px 1fr 320px;
  grid-template-areas: "sidebar main context";
  height: 100vh;
}
```
- Sidebar: Slim, clear hierarchy (logo, nav sections, spaces/projects)
- Main: Content surface that feels like a "canvas" with generous padding
- Context Panel: Collapsible, shows relevant info based on selection

**Spacing Philosophy:**
- Base unit: 8px
- Component padding: 16-24px
- Section spacing: 32-48px
- "Breathing room" - never let elements touch the edges of their containers

**Color Palette (Light Mode):**
```css
--bg-base: #FAFAFA;
--bg-surface: #FFFFFF;
--bg-elevated: #FFFFFF;
--border-subtle: rgba(0, 0, 0, 0.06);
--border-default: rgba(0, 0, 0, 0.1);
--text-primary: #1A1A1A;
--text-secondary: #666666;
--text-muted: #999999;
--accent: #6366F1; /* Indigo - choose your own */
--accent-soft: rgba(99, 102, 241, 0.1);
```

**Typography:**
- Font family: Inter, SF Pro, or similar neutral sans-serif
- Headings: `font-weight: 600`, never bold (700+)
- Body: `font-weight: 400`, 14-15px
- Labels/meta: `font-weight: 500`, 12-13px, `color: var(--text-secondary)`
- Line height: 1.5 for body, 1.3 for headings

**Shadows & Depth:**
```css
/* Layered shadows for natural depth */
--shadow-sm: 0 1px 2px rgba(0,0,0,0.04);
--shadow-md: 0 2px 4px rgba(0,0,0,0.04), 0 4px 8px rgba(0,0,0,0.04);
--shadow-lg: 0 4px 8px rgba(0,0,0,0.04), 0 8px 16px rgba(0,0,0,0.06), 0 16px 32px rgba(0,0,0,0.04);
--shadow-hover: 0 8px 16px rgba(0,0,0,0.08), 0 16px 32px rgba(0,0,0,0.06);
```

**Card Styles (Craft.do inspiration):**
- Document/workspace cards with subtle backgrounds and optional "cover" color strips
- Mixed card sizes in grid: combine 1x1, 2x1, 1x2 cards
- Cards can have "style" indicators (minimal, editorial, notebook themes)
- Slight border-radius: 12-16px (NOT 24px - that's too bubbly)

### Animation System (Linear-style)

**Spring Physics Config (Motion):**
```javascript
const springConfig = {
  gentle: { type: "spring", stiffness: 150, damping: 20 },
  snappy: { type: "spring", stiffness: 300, damping: 30 },
  bouncy: { type: "spring", stiffness: 400, damping: 25 },
};
```

**Micro-interactions:**

Card hover:
```jsx
<motion.div
  whileHover={{
    y: -4,
    scale: 1.02,
    boxShadow: "0 8px 16px rgba(0,0,0,0.08), 0 16px 32px rgba(0,0,0,0.06)"
  }}
  transition={springConfig.gentle}
/>
```

Sidebar item selection:
```jsx
// Animated background pill that slides to selected item
<motion.div
  layoutId="sidebar-indicator"
  className="absolute inset-0 bg-accent-soft rounded-lg"
/>
```

Panel transitions:
```jsx
// Right panel slide
<motion.aside
  initial={{ x: 320, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  exit={{ x: 320, opacity: 0 }}
  transition={springConfig.snappy}
/>
```

**Custom Cursor Follower:**
```jsx
// Small circle (12px) following cursor with lerp
const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
// Use lerp (0.15 damping) in requestAnimationFrame
// Scale to 24px when hovering interactive elements
```

**Parallax Background Elements:**
- Subtle decorative shapes behind card grid
- Move at 0.3-0.5x scroll speed
- Low opacity (5-10%), large scale

### Interactive Patterns

**Command Palette (⌘K):**
- Modal with scale + opacity entrance (spring)
- Input auto-focused
- Results list with keyboard navigation
- Selected item has animated background (layoutId)

**Document Surface:**
- Feels like editing a beautiful card, not a text editor
- Block-based content (headings, text, callouts, checklists)
- Each block has subtle hover state indicating editability
- Drag handle appears on hover

### Component Requirements
- `<AppShell>`: Grid layout wrapper
- `<Sidebar>`: Navigation with animated selection indicator
- `<CardGrid>`: CSS Grid with mixed card sizes, stagger entrance animation
- `<DocCard>`: Card with optional cover, title, description, style badge
- `<ContextPanel>`: Collapsible side panel with smooth slide animation
- `<CommandPalette>`: Modal with spring animation, keyboard navigation

### Output
Single React component. Next.js + TypeScript + Tailwind. Motion for all animations. CSS Grid with named areas.
