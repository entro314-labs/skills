# Developer-First Dark Dashboard: Design Tokens

Part of the [Developer-First Dark Dashboard specification](index.md).

## Color System

### CSS Custom Properties
```css
:root {
  /* Colours that also exist in the Tailwind theme point at it, so each value is written once, in @theme. */

  /* Backgrounds - Dark gradient */
  --bg-base: var(--color-base);           /* Deepest background */
  --bg-surface: var(--color-surface);         /* Cards, panels */
  --bg-elevated: var(--color-elevated);        /* Modals, popovers */
  --bg-hover: var(--color-hover);           /* Hover states */
  --bg-active: var(--color-active);          /* Active/pressed */
  --bg-selected: var(--color-selected);        /* Selected row (green tint) */
  --bg-code: var(--color-code);            /* Code blocks */

  /* Borders */
  --border-subtle: var(--color-border-subtle);
  --border-default: var(--color-border);
  --border-strong: var(--color-border-strong);
  --border-focus: rgba(16, 185, 129, 0.5);

  /* Text */
  --text-primary: #FAFAFA;       /* Headlines, primary */
  --text-secondary: #A1A1A6;     /* Body text */
  --text-muted: #666666;         /* Labels, placeholders */
  --text-code: #E4E4E7;          /* Code text */

  /* Accent - Emerald (Developer green) */
  --accent: var(--color-accent);
  --accent-hover: var(--color-accent-hover);
  --accent-soft: var(--color-accent-soft);
  --accent-glow: var(--color-accent-glow);
  --accent-glow-strong: rgba(16, 185, 129, 0.4);

  /* Semantic Colors */
  --success: #10B981;
  --success-soft: rgba(16, 185, 129, 0.15);
  --warning: #F59E0B;
  --warning-soft: rgba(245, 158, 11, 0.15);
  --error: #EF4444;
  --error-soft: rgba(239, 68, 68, 0.15);
  --info: #3B82F6;
  --info-soft: rgba(59, 130, 246, 0.15);

  /* Syntax Highlighting */
  --syntax-keyword: var(--color-syntax-keyword);     /* Purple - keywords */
  --syntax-string: var(--color-syntax-string);      /* Green - strings */
  --syntax-number: var(--color-syntax-number);      /* Orange - numbers */
  --syntax-function: var(--color-syntax-function);    /* Blue - functions */
  --syntax-variable: var(--color-syntax-variable);    /* Yellow - variables */
  --syntax-comment: var(--color-syntax-comment);     /* Gray - comments */
  --syntax-operator: var(--color-syntax-operator);    /* Cyan - operators */
  --syntax-property: var(--color-syntax-property);    /* Red - properties */

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.5);
  --shadow-glow: 0 0 20px var(--accent-glow);
  --shadow-glow-strong: 0 0 30px var(--accent-glow-strong);

  /* Overlays */
  --overlay: rgba(0, 0, 0, 0.6);
  --overlay-strong: rgba(0, 0, 0, 0.8);
}
```

### Tailwind Theme
```css
/* src/app/globals.css */
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --color-base: #0A0A0B;
  --color-surface: #111113;
  --color-elevated: #1A1A1D;
  --color-hover: #222226;
  --color-active: #2A2A2E;
  --color-selected: #1E3A2F;
  --color-code: #0D0D0F;
  --color-accent: #10B981;
  --color-accent-hover: #0D9668;
  --color-accent-soft: rgba(16, 185, 129, 0.1);
  --color-accent-glow: rgba(16, 185, 129, 0.2);
  --color-border-subtle: rgba(255, 255, 255, 0.04);
  --color-border: rgba(255, 255, 255, 0.08);
  --color-border-strong: rgba(255, 255, 255, 0.12);
  --color-syntax-keyword: #C792EA;
  --color-syntax-string: #C3E88D;
  --color-syntax-number: #F78C6C;
  --color-syntax-function: #82AAFF;
  --color-syntax-variable: #FFCB6B;
  --color-syntax-comment: #546E7A;
  --color-syntax-operator: #89DDFF;
  --color-syntax-property: #F07178;

  --font-sans: Inter, "SF Pro Display", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", "Fira Code", "SF Mono", Consolas, monospace;

  --text-xs: 11px;
  --text-xs--line-height: 14px;
  --text-xs--letter-spacing: 0.02em;
  --text-sm: 12px;
  --text-sm--line-height: 16px;
  --text-base: 13px;
  --text-base--line-height: 20px;
  --text-md: 14px;
  --text-md--line-height: 20px;
  --text-lg: 15px;
  --text-lg--line-height: 22px;
  --text-xl: 16px;
  --text-xl--line-height: 24px;
  --text-2xl: 18px;
  --text-2xl--line-height: 26px;
  --text-3xl: 20px;
  --text-3xl--line-height: 28px;
  /* Named code-size, not code: --text-code is already the code text colour in :root */
  --text-code-size: 13px;
  --text-code-size--line-height: 20px;

  --spacing-sidebar: 220px;
  --spacing-inspector: 320px;
  --spacing-command-bar: 48px;
  --spacing-status-bar: 24px;

  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 12px;

  --animate-shimmer: shimmer 2s infinite linear;
  --animate-pulse-glow: pulse-glow 2s infinite;
  --animate-slide-in: slide-in 0.15s ease-out;

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  @keyframes pulse-glow {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }
  @keyframes slide-in {
    0% { transform: translateY(-8px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }
}
```

---

## Typography System

### Font Stack
```css
/* Put these @import lines at the very top of globals.css, above @import "tailwindcss".
   A browser ignores an @import that comes after other rules. */
/* UI Font */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

/* Code Font */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap');
```

### Typography Classes
```css
/* Page Title */
.title-page {
  font-family: var(--font-sans);
  font-size: 18px;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: var(--text-primary);
}

/* Section Title */
.title-section {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--text-primary);
}

/* Body Text */
.text-body {
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 400;
  line-height: 1.5;
  color: var(--text-secondary);
}

/* Labels */
.text-label {
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 500;
  line-height: 1.3;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--text-muted);
}

/* Monospace - Data Display */
.text-mono {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 400;
  line-height: 1.5;
  color: var(--text-code);
}

/* Keyboard Shortcut */
.kbd {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  padding: 2px 6px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-default);
  border-radius: 4px;
  color: var(--text-muted);
}
```

---

## Layout System

### App Shell (IDE Layout)
```tsx
<div className="dev-shell">
  <header className="command-bar">...</header>
  <div className="dev-shell-body">
    <aside className="sidebar">...</aside>
    <main className="main-content">
      <div className="tab-bar">...</div>
      <div className="content-area">...</div>
    </main>
    <aside className="inspector">...</aside>
  </div>
  <footer className="status-bar">...</footer>
</div>
```

```css
.dev-shell {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: var(--bg-base);
  color: var(--text-primary);
}

.command-bar {
  height: 48px;
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border-subtle);
  flex-shrink: 0;
}

.dev-shell-body {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.sidebar {
  width: 220px;
  background: var(--bg-surface);
  border-right: 1px solid var(--border-subtle);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.tab-bar {
  height: 40px;
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border-subtle);
  flex-shrink: 0;
}

.content-area {
  flex: 1;
  overflow: auto;
}

.inspector {
  width: 320px;
  background: var(--bg-surface);
  border-left: 1px solid var(--border-subtle);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
}

.status-bar {
  height: 24px;
  background: var(--bg-surface);
  border-top: 1px solid var(--border-subtle);
  flex-shrink: 0;
}
```

### Responsive Behavior
```css
/* Hide inspector on smaller screens */
@media (max-width: 1280px) {
  .inspector {
    position: fixed;
    right: 0;
    top: 48px;
    bottom: 24px;
    transform: translateX(100%);
    transition: transform 0.15s ease;
    z-index: 40;
  }

  .inspector.open {
    transform: translateX(0);
  }
}

/* Collapse sidebar on tablet */
@media (max-width: 1024px) {
  .sidebar {
    width: 56px;
  }

  .sidebar .nav-label {
    display: none;
  }
}

/* Mobile: Overlay sidebar */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: 0;
    top: 48px;
    bottom: 24px;
    width: 260px;
    transform: translateX(-100%);
    transition: transform 0.15s ease;
    z-index: 50;
  }

  .sidebar.open {
    transform: translateX(0);
  }
}
```
