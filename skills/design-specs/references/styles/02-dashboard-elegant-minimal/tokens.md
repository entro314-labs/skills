# Elegant Minimal Dashboard: Design Tokens

Part of the [Elegant Minimal Dashboard specification](index.md).

## Color System

### CSS Custom Properties (Light Mode)
```css
:root {
  /* Backgrounds */
  --bg-base: #FAFAFA;           /* App background */
  --bg-surface: #FFFFFF;         /* Cards, panels */
  --bg-elevated: #FFFFFF;        /* Modals, dropdowns */
  --bg-hover: #F5F5F5;           /* Hover states */
  --bg-active: #F0F0F0;          /* Active/pressed states */
  --bg-muted: #F7F7F7;           /* Subtle backgrounds */

  /* Borders */
  --border-subtle: rgba(0, 0, 0, 0.04);
  --border-default: rgba(0, 0, 0, 0.08);
  --border-strong: rgba(0, 0, 0, 0.12);
  --border-focus: rgba(99, 102, 241, 0.5);

  /* Text */
  --text-primary: #1A1A1A;       /* Headlines, primary text */
  --text-secondary: #666666;     /* Body text, descriptions */
  --text-muted: #999999;         /* Labels, timestamps */
  --text-placeholder: #BBBBBB;   /* Input placeholders */
  --text-inverse: #FFFFFF;       /* Text on dark backgrounds */

  /* Accent Colors */
  --accent-primary: #6366F1;     /* Indigo - primary actions */
  --accent-primary-hover: #5558E3;
  --accent-soft: rgba(99, 102, 241, 0.08);
  --accent-softer: rgba(99, 102, 241, 0.04);

  /* Semantic Colors */
  --success: #10B981;
  --success-soft: rgba(16, 185, 129, 0.1);
  --warning: #F59E0B;
  --warning-soft: rgba(245, 158, 11, 0.1);
  --error: #EF4444;
  --error-soft: rgba(239, 68, 68, 0.1);
  --info: #3B82F6;
  --info-soft: rgba(59, 130, 246, 0.1);

  /* Overlay */
  --overlay-light: rgba(0, 0, 0, 0.02);
  --overlay-medium: rgba(0, 0, 0, 0.4);
  --overlay-dark: rgba(0, 0, 0, 0.6);
}
```

### Dark Mode (Optional)
```css
[data-theme="dark"] {
  --bg-base: #0A0A0A;
  --bg-surface: #141414;
  --bg-elevated: #1A1A1A;
  --bg-hover: #1F1F1F;
  --bg-active: #262626;
  --bg-muted: #111111;

  --border-subtle: rgba(255, 255, 255, 0.04);
  --border-default: rgba(255, 255, 255, 0.08);
  --border-strong: rgba(255, 255, 255, 0.12);

  --text-primary: #FAFAFA;
  --text-secondary: #A1A1A1;
  --text-muted: #737373;
  --text-placeholder: #525252;
  --text-inverse: #0A0A0A;

  --accent-soft: rgba(99, 102, 241, 0.15);
  --accent-softer: rgba(99, 102, 241, 0.08);
}
```

### Tailwind Theme
```css
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  --font-sans: Inter, "SF Pro Display", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", "SF Mono", Consolas, monospace;

  --text-xs: 12px;
  --text-xs--line-height: 16px;
  --text-xs--letter-spacing: 0.01em;
  --text-sm: 13px;
  --text-sm--line-height: 18px;
  --text-base: 14px;
  --text-base--line-height: 22px;
  --text-md: 15px;
  --text-md--line-height: 24px;
  --text-lg: 16px;
  --text-lg--line-height: 24px;
  --text-xl: 18px;
  --text-xl--line-height: 26px;
  --text-2xl: 20px;
  --text-2xl--line-height: 28px;
  --text-3xl: 24px;
  --text-3xl--line-height: 32px;
  --text-4xl: 28px;
  --text-4xl--line-height: 36px;

  --spacing-sidebar: 240px;
  --spacing-context: 320px;

  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;

  /* Shadows: var(--shadow-sm) in plain CSS and the shadow-sm utility read the same variable */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 2px 4px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.04);
  --shadow-lg: 0 4px 8px rgba(0, 0, 0, 0.04), 0 8px 16px rgba(0, 0, 0, 0.06), 0 16px 32px rgba(0, 0, 0, 0.04);
  --shadow-xl: 0 8px 16px rgba(0, 0, 0, 0.06), 0 16px 32px rgba(0, 0, 0, 0.08), 0 32px 64px rgba(0, 0, 0, 0.06);
  --shadow-hover: 0 8px 16px rgba(0, 0, 0, 0.08), 0 16px 32px rgba(0, 0, 0, 0.06);
  --shadow-focus: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

@theme inline {
  --color-base: var(--bg-base);
  --color-surface: var(--bg-surface);
  --color-elevated: var(--bg-elevated);
  --color-accent: var(--accent-primary);
  --color-accent-hover: var(--accent-primary-hover);
  --color-accent-soft: var(--accent-soft);
  --color-accent-softer: var(--accent-softer);
  --color-border-subtle: var(--border-subtle);
  --color-border: var(--border-default);
  --color-border-strong: var(--border-strong);
}

/* No theme entry needed in v4: spacing 4.5, spacing 13, spacing 15, spacing 18 */
```

---

## Typography System

### Font Stack
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
```

### Typography Classes
```css
/* Page Title */
.title-page {
  font-family: var(--font-sans);
  font-size: 24px;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.02em;
  color: var(--text-primary);
}

/* Section Title */
.title-section {
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--text-primary);
}

/* Card Title */
.title-card {
  font-family: var(--font-sans);
  font-size: 15px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--text-primary);
}

/* Body Text */
.text-body {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 400;
  line-height: 1.6;
  color: var(--text-secondary);
}

/* Small Body */
.text-small {
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 400;
  line-height: 1.5;
  color: var(--text-secondary);
}

/* Labels */
.text-label {
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: 0.01em;
  color: var(--text-muted);
}

/* Overline */
.text-overline {
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
}

/* Code/Mono */
.text-mono {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 400;
  line-height: 1.5;
}
```

---

## Layout System

### App Shell (Grid Layout)
```tsx
<div className="app-shell">
  <aside className="sidebar">...</aside>
  <main className="main-content">...</main>
  <aside className="context-panel">...</aside>
</div>
```

```css
.app-shell {
  display: grid;
  grid-template-columns: 240px 1fr 320px;
  grid-template-areas: "sidebar main context";
  height: 100vh;
  background: var(--bg-base);
}

/* Collapsed context panel */
.app-shell.context-collapsed {
  grid-template-columns: 240px 1fr 0;
}

.sidebar {
  grid-area: sidebar;
  background: var(--bg-surface);
  border-right: 1px solid var(--border-subtle);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.main-content {
  grid-area: main;
  background: var(--bg-base);
  overflow-y: auto;
  padding: 0;
}

.context-panel {
  grid-area: context;
  background: var(--bg-surface);
  border-left: 1px solid var(--border-subtle);
  overflow-y: auto;
  overflow-x: hidden;
}
```

### Responsive Breakpoints
```css
/* Tablet: Hide context panel */
@media (max-width: 1280px) {
  .app-shell {
    grid-template-columns: 240px 1fr;
    grid-template-areas: "sidebar main";
  }

  .context-panel {
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    width: 320px;
    z-index: 40;
    transform: translateX(100%);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .context-panel.open {
    transform: translateX(0);
  }
}

/* Mobile: Collapsible sidebar */
@media (max-width: 768px) {
  .app-shell {
    grid-template-columns: 1fr;
    grid-template-areas: "main";
  }

  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 280px;
    z-index: 50;
    transform: translateX(-100%);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .sidebar.open {
    transform: translateX(0);
  }
}
```

### Spacing System
```css
/* Base unit: 8px */
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
```
