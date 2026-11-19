# Developer-First Dark Dashboard: Brief

The short version of this style. The exhaustive specification starts at [index.md](index.md).

You are designing a dashboard that feels like a premium developer tool - the aesthetic of Linear, Supabase Studio, and VS Code merged into a cohesive interface.

### Core Philosophy
High information density without feeling cramped. Keyboard-first interactions. Dark UI that's easy on the eyes for extended use. Feels like infrastructure, not consumer software.

### Visual System

**Layout:**
- Classic "IDE" layout: sidebar nav, main content, optional side inspector
- Tabs for different views within main content
- Tables with sticky headers, inline editing
- Code blocks styled like real editors (syntax highlighting, line numbers)

**Color Palette (Dark Mode):**
```css
--bg-base: #0A0A0B;
--bg-surface: #111113;
--bg-elevated: #1A1A1D;
--bg-hover: #222226;
--border-subtle: rgba(255, 255, 255, 0.06);
--border-default: rgba(255, 255, 255, 0.1);
--text-primary: #FAFAFA;
--text-secondary: #A1A1A6;
--text-muted: #666666;
--accent: #10B981; /* Emerald green - dev tool feel */
--accent-glow: rgba(16, 185, 129, 0.2);
--error: #EF4444;
--warning: #F59E0B;
```

**Typography:**
- UI: Inter or SF Pro, 13-14px
- Code/data: JetBrains Mono or Fira Code, 13px
- Labels: 11-12px, uppercase with letter-spacing for categories
- Monospace everywhere data appears (timestamps, IDs, metrics)

**Glassmorphism (Tasteful):**
```css
.panel-glass {
  background: rgba(26, 26, 29, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.06);
}
```

**Glow Effects:**
```css
/* Accent glow on focus/active states */
.input:focus {
  box-shadow: 0 0 0 2px var(--accent-glow);
  border-color: var(--accent);
}
/* Subtle glow on important metrics */
.metric-card:hover {
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.1);
}
```

### Interactive Patterns

**Table UI:**
- Sticky header with sort indicators
- Row hover: subtle background change
- Row selection: checkbox column, accent background
- Inline editing: click cell to edit
- Pagination or infinite scroll

**Code Editor Region:**
- Monaco-style presentation (even if not functional)
- Line numbers in muted color
- Syntax highlighting for JSON/SQL/JavaScript
- Copy button on hover

**Keyboard Shortcuts:**
- Visible hints throughout UI (⌘K, ⌘/, etc.)
- Command palette for all actions
- Vim-style navigation optional

### Animation

**Minimal, Functional Motion:**
```javascript
const devSpring = {
  type: "spring",
  stiffness: 500,
  damping: 35,
};
```
- Fast transitions (150-200ms)
- Loading skeletons with shimmer
- Toast notifications slide in from corner
- Panel expansions are instant or very fast

### Component Requirements
- `<DevShell>`: IDE-style layout
- `<DataTable>`: High-density table with all features
- `<CodeBlock>`: Styled code display with copy button
- `<MetricCard>`: KPI display with optional sparkline
- `<LogViewer>`: Time-series log display with filters
- `<CommandBar>`: Top bar with keyboard shortcut hints
