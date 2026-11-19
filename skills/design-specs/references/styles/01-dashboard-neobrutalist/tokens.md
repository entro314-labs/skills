# Neobrutalist Dashboard: Design Tokens

Part of the [Neobrutalist Dashboard specification](index.md).

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
