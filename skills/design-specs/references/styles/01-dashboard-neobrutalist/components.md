# Neobrutalist Dashboard: Components

Part of the [Neobrutalist Dashboard specification](index.md).

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
