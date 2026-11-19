# Neobrutalist Dashboard - Complete Design Specification

You are a senior product designer and front-end engineer. Build a complete dashboard interface in the neobrutalist style - raw, intentional, anti-polish aesthetic that rejects the homogeneous SaaS look.

**The product:** [Describe your product here]

---

## Technical Stack

```bash
npm install motion
```

- Next.js 16+ with App Router
- React 19+ with TypeScript
- Tailwind CSS for styling
- Motion for animations (tween-based, NOT spring)
- No external icon libraries - create simple inline SVGs

---

## Layout Structure

### App Shell Grid
```css
.dashboard-shell {
  display: grid;
  grid-template-columns: 220px 1fr;
  grid-template-rows: 64px 1fr;
  grid-template-areas:
    "sidebar header"
    "sidebar main";
  height: 100vh;
  background: #FFFEF0;
}
```

### Sidebar (Left Column)
- Width: 220px fixed
- Background: #E8E4D9 (kraft paper tan)
- Border-right: 3px solid #1A1A1A
- Padding: 24px 16px
- Position: sticky, full height

**Sidebar Contents:**
1. Logo area (top): 48px height, bold wordmark, no icon
2. Navigation section:
   - Section labels: 11px, uppercase, letter-spacing: 0.1em, color: #666
   - Nav items: 14px, font-weight: 600, padding: 12px 16px
   - Active state: background #BFFF00, box-shadow: 3px 3px 0 #1A1A1A
   - Hover state: background #FFF, transform: translate(-2px, -2px)
3. Bottom section: User avatar (40px square, border: 2px solid black) + settings icon

### Header (Top Row)
- Height: 64px fixed
- Background: #FFFEF0
- Border-bottom: 3px solid #1A1A1A
- Padding: 0 32px
- Display: flex, justify-content: space-between, align-items: center

**Header Contents (left to right):**
1. Page title: 24px, font-weight: 800, text-transform: uppercase
2. Search input: 280px width, height: 40px, border: 2px solid #1A1A1A, no border-radius
3. Action buttons group: Primary button + secondary icon buttons

### Main Content Area
- Background: #FFFEF0
- Padding: 32px
- Overflow-y: auto
- Custom scrollbar: 8px width, background #E8E4D9, thumb #1A1A1A

---

## Color System

```css
:root {
  /* Backgrounds */
  --bg-primary: #FFFEF0;      /* Warm off-white, paper-like */
  --bg-secondary: #E8E4D9;    /* Kraft paper tan */
  --bg-tertiary: #D4CFC4;     /* Darker kraft */

  /* Accent Colors */
  --accent-hot: #FF5C00;      /* Aggressive orange */
  --accent-electric: #0066FF; /* Pure blue */
  --accent-acid: #BFFF00;     /* Acid green-yellow */
  --accent-pink: #FF3366;     /* Hot pink */

  /* Text */
  --text-primary: #1A1A1A;    /* Near black */
  --text-secondary: #4A4A4A;  /* Dark gray */
  --text-muted: #7A7A7A;      /* Medium gray */

  /* Functional */
  --border: #1A1A1A;
  --shadow: #1A1A1A;
  --success: #00CC66;
  --warning: #FFCC00;
  --error: #FF3333;
}
```

---

## Typography

### Font Stack
```css
--font-display: 'Space Grotesk', 'Inter', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', 'IBM Plex Mono', monospace;
```

### Type Scale
```css
/* Display/Headlines */
.text-display { font-size: 64px; line-height: 1.0; font-weight: 800; letter-spacing: -0.03em; }
.text-h1 { font-size: 48px; line-height: 1.1; font-weight: 800; letter-spacing: -0.02em; }
.text-h2 { font-size: 32px; line-height: 1.2; font-weight: 700; letter-spacing: -0.01em; }
.text-h3 { font-size: 24px; line-height: 1.3; font-weight: 700; }
.text-h4 { font-size: 18px; line-height: 1.4; font-weight: 600; }

/* Body */
.text-body-lg { font-size: 18px; line-height: 1.6; font-weight: 500; }
.text-body { font-size: 15px; line-height: 1.6; font-weight: 500; }
.text-body-sm { font-size: 13px; line-height: 1.5; font-weight: 500; }

/* Labels & Captions */
.text-label { font-size: 11px; line-height: 1.4; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; }
.text-caption { font-size: 12px; line-height: 1.4; font-weight: 500; }

/* Monospace (for data) */
.text-mono-lg { font-family: var(--font-mono); font-size: 32px; font-weight: 700; }
.text-mono { font-family: var(--font-mono); font-size: 14px; font-weight: 500; }
.text-mono-sm { font-family: var(--font-mono); font-size: 12px; font-weight: 500; }
```

---

## Component Specifications

### Metric Cards
Large KPI display cards with prominent numbers.

```css
.metric-card {
  background: var(--bg-primary);
  border: 3px solid var(--border);
  box-shadow: 6px 6px 0 var(--shadow);
  padding: 24px;
  min-width: 200px;
}
.metric-card:hover {
  transform: translate(-3px, -3px);
  box-shadow: 9px 9px 0 var(--shadow);
  transition: transform 0.1s ease-out, box-shadow 0.1s ease-out;
}
```

**Metric Card Contents:**
1. Label: 11px uppercase, letter-spacing: 0.1em, color: var(--text-secondary), margin-bottom: 8px
2. Value: 48px monospace, font-weight: 700, color: var(--text-primary)
3. Change indicator: 14px, inline with small arrow icon
   - Positive: color #00CC66, arrow up
   - Negative: color #FF3333, arrow down
4. Optional: Mini sparkline (40px height, stroke-only, 2px stroke width)

**Layout for Metric Cards:**
```css
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}
```

### Data Table
High-density table with strong visual hierarchy.

```css
.data-table {
  width: 100%;
  border-collapse: collapse;
  border: 3px solid var(--border);
}
.data-table th {
  background: var(--bg-secondary);
  border-bottom: 3px solid var(--border);
  padding: 16px 20px;
  text-align: left;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.data-table td {
  padding: 16px 20px;
  border-bottom: 1px solid var(--border);
  font-size: 14px;
  font-family: var(--font-mono);
}
.data-table tr:nth-child(even) {
  background: rgba(0, 0, 0, 0.02);
}
.data-table tr:hover {
  background: var(--accent-acid);
}
```

**Table Features:**
- Sortable columns: Click header to sort, show arrow indicator (▲/▼)
- Row selection: Checkbox column (square, not rounded), selected rows get accent background
- Actions column: Icon buttons (edit, delete) appear on row hover
- Pagination: Below table, showing "1-20 of 847" with prev/next buttons

### Sidebar Navigation Item
```css
.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  cursor: pointer;
  border: 2px solid transparent;
  transition: none; /* Instant state changes */
}
.nav-item:hover {
  background: var(--bg-primary);
  border-color: var(--border);
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0 var(--shadow);
}
.nav-item.active {
  background: var(--accent-acid);
  border-color: var(--border);
  box-shadow: 3px 3px 0 var(--shadow);
}
.nav-item.active::before {
  content: ">";
  font-weight: 800;
  margin-right: 4px;
}
```

### Buttons

**Primary Button:**
```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  background: var(--accent-acid);
  color: var(--text-primary);
  border: 3px solid var(--border);
  box-shadow: 4px 4px 0 var(--shadow);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 0.1s ease-out, box-shadow 0.1s ease-out;
}
.btn-primary:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 var(--shadow);
}
.btn-primary:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 var(--shadow);
}
```

**Secondary Button:**
```css
.btn-secondary {
  padding: 14px 28px;
  background: transparent;
  color: var(--text-primary);
  border: 3px solid var(--border);
  box-shadow: 4px 4px 0 var(--shadow);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  cursor: pointer;
}
.btn-secondary:hover {
  background: var(--bg-secondary);
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 var(--shadow);
}
```

**Icon Button:**
```css
.btn-icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 2px solid var(--border);
  box-shadow: 3px 3px 0 var(--shadow);
  cursor: pointer;
}
.btn-icon:hover {
  background: var(--accent-acid);
  transform: translate(-2px, -2px);
  box-shadow: 5px 5px 0 var(--shadow);
}
```

### Form Inputs

**Text Input:**
```css
.input-text {
  width: 100%;
  height: 48px;
  padding: 0 16px;
  background: var(--bg-primary);
  border: 3px solid var(--border);
  font-size: 15px;
  font-weight: 500;
  outline: none;
}
.input-text:focus {
  background: var(--accent-acid);
  box-shadow: 4px 4px 0 var(--shadow);
}
.input-text::placeholder {
  color: var(--text-muted);
}
```

**Select Dropdown:**
```css
.select {
  appearance: none;
  width: 100%;
  height: 48px;
  padding: 0 40px 0 16px;
  background: var(--bg-primary) url('data:image/svg+xml,...') no-repeat right 16px center;
  background-size: 12px;
  border: 3px solid var(--border);
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}
.select:focus {
  box-shadow: 4px 4px 0 var(--shadow);
}
```

**Checkbox:**
```css
.checkbox {
  width: 20px;
  height: 20px;
  appearance: none;
  background: var(--bg-primary);
  border: 2px solid var(--border);
  cursor: pointer;
}
.checkbox:checked {
  background: var(--accent-acid);
}
.checkbox:checked::after {
  content: "✓";
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 800;
}
```

### Status Badges
```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  border: 2px solid var(--border);
}
.badge-success { background: #00CC66; color: #000; }
.badge-warning { background: #FFCC00; color: #000; }
.badge-error { background: #FF3333; color: #FFF; }
.badge-info { background: #0066FF; color: #FFF; }
.badge-neutral { background: var(--bg-secondary); color: var(--text-primary); }
```

### Charts & Data Visualization

**Bar Chart:**
```css
.bar-chart {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  height: 200px;
  padding: 16px;
  border: 3px solid var(--border);
  background: var(--bg-primary);
}
.bar {
  flex: 1;
  background: var(--accent-electric);
  border: 2px solid var(--border);
  min-width: 24px;
  transition: none;
}
.bar:hover {
  background: var(--accent-acid);
}
```

**Line Chart (SVG):**
```css
.line-chart {
  border: 3px solid var(--border);
  background: var(--bg-primary);
}
.line-chart path {
  fill: none;
  stroke: var(--accent-hot);
  stroke-width: 3px;
  stroke-linecap: square; /* Not rounded - brutalist */
}
.line-chart .grid-line {
  stroke: var(--border);
  stroke-width: 1px;
  stroke-dasharray: 4 4;
}
```

### Activity Feed / Log
```css
.activity-feed {
  border: 3px solid var(--border);
  background: var(--bg-primary);
}
.activity-item {
  display: flex;
  gap: 16px;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border);
  font-size: 14px;
}
.activity-item:last-child {
  border-bottom: none;
}
.activity-time {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-muted);
  min-width: 80px;
}
.activity-content {
  flex: 1;
}
.activity-user {
  font-weight: 700;
}
```

### Modal / Dialog
```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal {
  background: var(--bg-primary);
  border: 4px solid var(--border);
  box-shadow: 12px 12px 0 var(--shadow);
  padding: 0;
  max-width: 560px;
  width: 90%;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 3px solid var(--border);
  background: var(--bg-secondary);
}
.modal-title {
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}
.modal-close {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--border);
  background: transparent;
  cursor: pointer;
  font-size: 18px;
  font-weight: 800;
}
.modal-close:hover {
  background: var(--accent-hot);
  color: white;
}
.modal-body {
  padding: 24px;
}
.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 20px 24px;
  border-top: 3px solid var(--border);
  background: var(--bg-secondary);
}
```

### Toast / Notification
```css
.toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  padding: 16px 24px;
  background: var(--text-primary);
  color: var(--bg-primary);
  border: 3px solid var(--border);
  box-shadow: 6px 6px 0 var(--accent-acid);
  font-size: 14px;
  font-weight: 600;
  max-width: 400px;
  z-index: 1100;
}
.toast-success { box-shadow: 6px 6px 0 #00CC66; }
.toast-error { box-shadow: 6px 6px 0 #FF3333; }
```

---

## Animation Specifications

### General Principles
- Use Motion with `type: "tween"` - NO springs (too soft for brutalist)
- Durations: 0.1s for hovers, 0.15s for state changes, 0.2s max for reveals
- Easing: "easeOut" or "linear" - avoid bouncy curves
- Prefer instant state changes where possible

### Hover Animations (Motion)
```jsx
// Card/Button hover
<motion.div
  whileHover={{
    x: -3,
    y: -3,
    boxShadow: "9px 9px 0 #1A1A1A"
  }}
  whileTap={{
    x: 2,
    y: 2,
    boxShadow: "2px 2px 0 #1A1A1A"
  }}
  transition={{ type: "tween", duration: 0.1, ease: "easeOut" }}
/>
```

### Page/Section Transitions
```jsx
// Instant cuts preferred, or very fast slides
const pageTransition = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { type: "tween", duration: 0.15, ease: "easeOut" }
};
```

### List Stagger (for tables, activity feeds)
```jsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03, // Very fast stagger
      delayChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "tween", duration: 0.1 }
  }
};
```

### Loading States
- Use rectangular progress bars, NOT spinners
- Skeleton loaders with solid color blocks (no shimmer gradient)
- Progress bar: 8px height, border: 2px solid black, fill with accent color

```css
.progress-bar {
  height: 8px;
  background: var(--bg-secondary);
  border: 2px solid var(--border);
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: var(--accent-acid);
  transition: width 0.2s linear;
}
```

### Modal Animation
```jsx
// Overlay
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.1 }}
/>

// Modal content - hard scale, no spring
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.95 }}
  transition={{ type: "tween", duration: 0.15, ease: "easeOut" }}
/>
```

---

## Dashboard Views to Build

### 1. Overview / Home View
**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ [HEADER: Page Title + Search + Actions]                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐           │
│  │ METRIC  │ │ METRIC  │ │ METRIC  │ │ METRIC  │           │
│  │ 2,847   │ │ $12.4K  │ │ 94.2%   │ │ 1,203   │           │
│  │ +12%    │ │ +8.3%   │ │ -0.4%   │ │ +23     │           │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘           │
│                                                             │
│  ┌─────────────────────────────┐ ┌─────────────────────┐   │
│  │ CHART                       │ │ ACTIVITY            │   │
│  │ ████████████████████████    │ │ 12:34 User did X    │   │
│  │ █████████████               │ │ 12:33 System event  │   │
│  │ ████████████████            │ │ 12:32 User did Y    │   │
│  │                             │ │ 12:31 ...           │   │
│  └─────────────────────────────┘ └─────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Grid for main content:**
```css
.overview-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto 1fr;
  gap: 24px;
}
.metrics-row {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}
.chart-area {
  grid-column: 1;
}
.activity-area {
  grid-column: 2;
}
```

### 2. Data Table View
Full-width data table with filters and actions.

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ [HEADER]                                                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ FILTERS: [Status ▼] [Date ▼] [Search...]   [+ ADD]  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ □  NAME          STATUS    DATE       AMOUNT    ... │   │
│  │────────────────────────────────────────────────────│   │
│  │ □  Item One      ACTIVE    2024-01    $1,234       │   │
│  │ □  Item Two      PENDING   2024-01    $567        │   │
│  │ □  Item Three    ACTIVE    2024-01    $8,901       │   │
│  │ ...                                                 │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  [← PREV]  Showing 1-20 of 847  [NEXT →]                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 3. Detail / Single Item View
View for a single record with sections.

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ [HEADER: ← Back to List | Item Name | Actions]              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────┐ ┌─────────────────────────────┐   │
│  │ SUMMARY             │ │ DETAILS                      │   │
│  │                     │ │                              │   │
│  │ Status: [ACTIVE]    │ │ Field 1: Value               │   │
│  │ Created: 2024-01-15 │ │ Field 2: Value               │   │
│  │ Updated: 2024-01-20 │ │ Field 3: Value               │   │
│  │                     │ │ ...                          │   │
│  └─────────────────────┘ └─────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ ACTIVITY LOG                                         │   │
│  │ ─────────────────────────────────────────────────── │   │
│  │ 2024-01-20 12:34  Status changed to Active          │   │
│  │ 2024-01-19 09:15  Comment added by User             │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 4. Settings View
Form-based settings with clear sections.

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ [HEADER: SETTINGS]                                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  GENERAL                                                    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Company Name    [________________________]           │   │
│  │ Email           [________________________]           │   │
│  │ Timezone        [Select...              ▼]           │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  NOTIFICATIONS                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ □ Email notifications                                │   │
│  │ □ Push notifications                                 │   │
│  │ □ Weekly digest                                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  DANGER ZONE                                                │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ [DELETE ACCOUNT]                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  [SAVE CHANGES]                                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Icons (Inline SVG)

Create simple, stroke-based icons. No fills. 2px stroke width. Square viewBox (24x24).

```jsx
// Plus icon
const PlusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

// Arrow right
const ArrowRightIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12,5 19,12 12,19" />
  </svg>
);

// Arrow left
const ArrowLeftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12,5 5,12 12,19" />
  </svg>
);

// Close/X
const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="6" y1="6" x2="18" y2="18" />
    <line x1="18" y1="6" x2="6" y2="18" />
  </svg>
);

// Search
const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="6" />
    <line x1="15.5" y1="15.5" x2="20" y2="20" />
  </svg>
);

// Settings (gear)
const SettingsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41" />
  </svg>
);

// User
const UserIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
  </svg>
);

// Edit (pencil)
const EditIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 6l3 3L9 18H6v-3L15 6z" />
  </svg>
);

// Trash
const TrashIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 7h14l-1 12H6L5 7z" />
    <path d="M9 7V5h6v2" />
    <line x1="4" y1="7" x2="20" y2="7" />
  </svg>
);

// Chevron down
const ChevronDownIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6,9 12,15 18,9" />
  </svg>
);

// Check
const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="5,12 10,17 19,8" />
  </svg>
);
```

---

## Responsive Behavior

### Breakpoints
```css
/* Desktop first */
@media (max-width: 1200px) {
  .metrics-row { grid-template-columns: repeat(2, 1fr); }
  .overview-grid { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  .dashboard-shell {
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "main";
  }
  .sidebar {
    position: fixed;
    left: -220px;
    top: 0;
    height: 100vh;
    z-index: 100;
    transition: left 0.15s ease-out;
  }
  .sidebar.open {
    left: 0;
    box-shadow: 8px 0 0 rgba(0,0,0,0.2);
  }
  .metrics-row { grid-template-columns: 1fr; }
  .header { padding: 0 16px; }
  .main-content { padding: 16px; }
}
```

### Mobile Menu Toggle
```jsx
// Hamburger icon for mobile
const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="18" x2="20" y2="18" />
  </svg>
);
```

---

## Empty States

When there's no data, show clear empty states:

```css
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 32px;
  border: 3px dashed var(--border);
  background: var(--bg-secondary);
  text-align: center;
}
.empty-state-title {
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 8px;
}
.empty-state-message {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 24px;
}
```

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
3. All component styles using Tailwind classes (matching the specs above)
4. Motion animations exactly as specified
5. Example data populated for demonstration
6. All icons as inline SVGs (no icon libraries)
7. Proper TypeScript types throughout
8. Responsive behavior for mobile

The code should be production-ready and follow the specifications exactly. Do not deviate from the color palette, typography, or animation specifications.
