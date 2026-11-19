# Neobrutalist Dashboard: Brief

The short version of this style. The exhaustive specification starts at [index.md](index.md).

You are a senior product designer specializing in neobrutalist web interfaces. Design a dashboard that rejects polish in favor of raw, intentional ugliness that becomes beautiful through its honesty.

### Core Philosophy
Neobrutalism is NOT just "bold borders and bright colors" - it's a rejection of the homogeneous rounded-corner, soft-shadow SaaS aesthetic. Every element should feel deliberately placed, almost uncomfortably honest about being a UI element.

### Visual System

**Layout Structure:**
- NO rounded corners anywhere. Use `border-radius: 0` globally
- Thick, visible borders: `border: 3px solid black` minimum
- Elements should overlap intentionally using negative margins (`margin-left: -20px`)
- Grid with visible structure - consider showing the grid lines as design elements
- Asymmetric layouts using CSS Grid: `grid-template-columns: 1fr 2fr 1.5fr` (never equal columns)
- Cards stack with visible offset: `transform: translate(4px, 4px)` with solid shadow behind

**Color Palette:**
```css
--bg-primary: #FFFEF0; /* Warm off-white, almost paper */
--bg-secondary: #E8E4D9; /* Kraft paper tan */
--accent-hot: #FF5C00; /* Aggressive orange */
--accent-electric: #0066FF; /* Pure blue */
--accent-acid: #BFFF00; /* Acid green-yellow */
--text-primary: #1A1A1A; /* Near black */
--shadow: #1A1A1A; /* Solid black shadows, NO blur */
```

**Typography:**
- Display: Use a grotesque sans-serif with tight tracking (Space Grotesk, Inter Tight, or Darker Grotesque)
- Headlines: 48-64px, `font-weight: 800`, `letter-spacing: -0.03em`
- Body: 14-16px, `font-weight: 500`
- Labels: ALL CAPS with `letter-spacing: 0.1em`, 11px
- Monospace for all data/numbers (JetBrains Mono, IBM Plex Mono)

**Shadows & Depth:**
```css
/* NO soft shadows. Only hard-offset solid shadows */
.card {
  box-shadow: 4px 4px 0 #1A1A1A;
}
.card:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #1A1A1A;
}
/* Or colored shadows for emphasis */
.card-accent {
  box-shadow: 6px 6px 0 #FF5C00;
}
```

**Interactive Elements:**

Buttons:
```css
.btn {
  border: 3px solid black;
  background: #BFFF00;
  padding: 12px 24px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow: 4px 4px 0 black;
  transition: transform 0.1s ease, box-shadow 0.1s ease;
}
.btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 black;
}
.btn:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 black;
}
```

Form inputs:
- Thick borders, no background or very light tint
- Focus state: background becomes accent color, text inverts
- No subtle focus rings - make it obvious

**Data Visualization:**
- Bar charts with solid colors, thick borders around bars
- NO gradients on charts
- Grid lines visible and bold
- Consider "stacked box" visualization instead of traditional charts
- Numbers displayed in large monospace type as the primary visual

**Animation (Minimal & Intentional):**
- Use Motion with `type: "tween"` NOT springs (springs are too "soft")
- Hover: `duration: 0.1`, `ease: "easeOut"` - snappy, not fluid
- Page transitions: hard cuts or very fast slides (200ms max)
- Loading states: rectangular progress bars, not spinners
- Consider intentionally "janky" animations - steps, not easing

**What to Avoid:**
- Rounded corners
- Soft shadows (blur > 0)
- Gradients
- Smooth, buttery animations
- Icons with fill (use stroke-only, 2px minimum)
- Generic card layouts

### Layout Example
```
┌─────────────────────────────────────────────────────────┐
│ [LOGO]  DASHBOARD    PROJECTS    SETTINGS    [■■■ USER]│
├─────────┬───────────────────────────────────────────────┤
│         │                                               │
│ NAV     │  ┌─────────────────┐  ┌─────────────────┐    │
│ ════    │  │ METRIC A        │  │ METRIC B        │    │
│         │  │ ████████████    │  │ ██████          │    │
│ > HOME  │  │ 2,847           │  │ 1,203           │    │
│ > DATA  │  └─────────────────┘  └─────────────────┘    │
│ > USERS │                                               │
│ > LOGS  │  ┌─────────────────────────────────────────┐ │
│         │  │ RECENT ACTIVITY                          │ │
│         │  │ ─────────────────────────────────────── │ │
│         │  │ 12:34  User X did thing                 │ │
│         │  │ 12:33  System event occurred            │ │
│         │  └─────────────────────────────────────────┘ │
└─────────┴───────────────────────────────────────────────┘
```

### Component Requirements
- `<DashboardShell>`: Main layout wrapper with visible grid structure
- `<MetricCard>`: Large number display with thick border, solid shadow
- `<DataTable>`: High-density table with alternating row backgrounds (not subtle gray, use the accent colors)
- `<NavItem>`: Text-only with arrow indicator (`>`) for active state
- `<StatusBadge>`: Uppercase, bordered, solid background colors

### Output
Single React component file. Next.js + TypeScript + Tailwind CSS. No external icon libraries - create simple SVG shapes inline. All animations via CSS transitions or Motion `tween`.
