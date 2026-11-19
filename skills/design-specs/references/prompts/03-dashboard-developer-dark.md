# Developer-First Dark Dashboard - Exhaustive Technical Specification

Generate a complete, production-ready developer dashboard using Next.js, TypeScript, Tailwind CSS, and Motion. This specification defines every visual element, animation parameter, and interactive behavior. Do not deviate from these values.

**Design Inspiration:** Linear (polish + speed), Supabase Studio (data-centric), VS Code (IDE layout), Vercel Dashboard (dark aesthetic), GitHub (developer patterns).

**Core Philosophy:** High information density without feeling cramped. Keyboard-first interactions. Dark UI that's easy on the eyes for extended use. Feels like infrastructure, not consumer software. Every millisecond matters.

---

## Output Requirements

- Single React component (or page with imported components)
- Next.js 14+ with App Router
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

## Color System

### CSS Custom Properties
```css
:root {
  /* Backgrounds - Dark gradient */
  --bg-base: #0A0A0B;           /* Deepest background */
  --bg-surface: #111113;         /* Cards, panels */
  --bg-elevated: #1A1A1D;        /* Modals, popovers */
  --bg-hover: #222226;           /* Hover states */
  --bg-active: #2A2A2E;          /* Active/pressed */
  --bg-selected: #1E3A2F;        /* Selected row (green tint) */
  --bg-code: #0D0D0F;            /* Code blocks */

  /* Borders */
  --border-subtle: rgba(255, 255, 255, 0.04);
  --border-default: rgba(255, 255, 255, 0.08);
  --border-strong: rgba(255, 255, 255, 0.12);
  --border-focus: rgba(16, 185, 129, 0.5);

  /* Text */
  --text-primary: #FAFAFA;       /* Headlines, primary */
  --text-secondary: #A1A1A6;     /* Body text */
  --text-muted: #666666;         /* Labels, placeholders */
  --text-code: #E4E4E7;          /* Code text */

  /* Accent - Emerald (Developer green) */
  --accent: #10B981;
  --accent-hover: #0D9668;
  --accent-soft: rgba(16, 185, 129, 0.1);
  --accent-glow: rgba(16, 185, 129, 0.2);
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
  --syntax-keyword: #C792EA;     /* Purple - keywords */
  --syntax-string: #C3E88D;      /* Green - strings */
  --syntax-number: #F78C6C;      /* Orange - numbers */
  --syntax-function: #82AAFF;    /* Blue - functions */
  --syntax-variable: #FFCB6B;    /* Yellow - variables */
  --syntax-comment: #546E7A;     /* Gray - comments */
  --syntax-operator: #89DDFF;    /* Cyan - operators */
  --syntax-property: #F07178;    /* Red - properties */

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

### Tailwind Extension
```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        base: '#0A0A0B',
        surface: '#111113',
        elevated: '#1A1A1D',
        hover: '#222226',
        active: '#2A2A2E',
        selected: '#1E3A2F',
        code: '#0D0D0F',
        accent: {
          DEFAULT: '#10B981',
          hover: '#0D9668',
          soft: 'rgba(16, 185, 129, 0.1)',
          glow: 'rgba(16, 185, 129, 0.2)',
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.04)',
          DEFAULT: 'rgba(255, 255, 255, 0.08)',
          strong: 'rgba(255, 255, 255, 0.12)',
        },
        syntax: {
          keyword: '#C792EA',
          string: '#C3E88D',
          number: '#F78C6C',
          function: '#82AAFF',
          variable: '#FFCB6B',
          comment: '#546E7A',
          operator: '#89DDFF',
          property: '#F07178',
        },
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'SF Mono', 'Consolas', 'monospace'],
      },
      fontSize: {
        'xs': ['11px', { lineHeight: '14px', letterSpacing: '0.02em' }],
        'sm': ['12px', { lineHeight: '16px' }],
        'base': ['13px', { lineHeight: '20px' }],
        'md': ['14px', { lineHeight: '20px' }],
        'lg': ['15px', { lineHeight: '22px' }],
        'xl': ['16px', { lineHeight: '24px' }],
        '2xl': ['18px', { lineHeight: '26px' }],
        '3xl': ['20px', { lineHeight: '28px' }],
        'code': ['13px', { lineHeight: '20px' }],
      },
      spacing: {
        'sidebar': '220px',
        'inspector': '320px',
        'command-bar': '48px',
        'status-bar': '24px',
      },
      borderRadius: {
        'sm': '4px',
        'md': '6px',
        'lg': '8px',
        'xl': '12px',
      },
      animation: {
        'shimmer': 'shimmer 2s infinite linear',
        'pulse-glow': 'pulse-glow 2s infinite',
        'slide-in': 'slide-in 0.15s ease-out',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        'slide-in': {
          '0%': { transform: 'translateY(-8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
};
```

---

## Typography System

### Font Stack
```css
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

---

## Component Specifications

### Command Bar (Top)

```tsx
<header className="command-bar">
  <div className="command-bar-left">
    <button className="sidebar-toggle">
      <MenuIcon />
    </button>
    <div className="breadcrumb">
      <span className="breadcrumb-item">acme-project</span>
      <ChevronRightIcon />
      <span className="breadcrumb-item active">Database</span>
    </div>
  </div>

  <button className="search-trigger">
    <SearchIcon />
    <span>Search or run command...</span>
    <kbd>⌘K</kbd>
  </button>

  <div className="command-bar-right">
    <button className="icon-btn">
      <BellIcon />
      <span className="notification-dot" />
    </button>
    <button className="icon-btn">
      <HelpIcon />
    </button>
    <div className="user-menu">
      <img src="/avatar.png" className="avatar" />
    </div>
  </div>
</header>
```

```css
.command-bar {
  height: 48px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border-subtle);
}

.command-bar-left,
.command-bar-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: var(--text-muted);
}

.breadcrumb-item {
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.1s ease;
}

.breadcrumb-item:hover {
  background: var(--bg-hover);
  color: var(--text-secondary);
}

.breadcrumb-item.active {
  color: var(--text-primary);
}

.breadcrumb svg {
  width: 14px;
  height: 14px;
}

.search-trigger {
  flex: 1;
  max-width: 500px;
  height: 32px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: 6px;
  color: var(--text-muted);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.1s ease;
}

.search-trigger:hover {
  background: var(--bg-hover);
  border-color: var(--border-default);
}

.search-trigger svg {
  width: 16px;
  height: 16px;
}

.search-trigger kbd {
  margin-left: auto;
}

.icon-btn {
  position: relative;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 6px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.1s ease;
}

.icon-btn:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

.icon-btn svg {
  width: 18px;
  height: 18px;
}

.notification-dot {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 6px;
  height: 6px;
  background: var(--error);
  border-radius: 50%;
}

.avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid var(--border-default);
}
```

---

### Sidebar Navigation

```tsx
<aside className="sidebar">
  {/* Project Selector */}
  <div className="project-selector">
    <div className="project-icon">A</div>
    <div className="project-info">
      <span className="project-name">acme-project</span>
      <span className="project-env">Production</span>
    </div>
    <ChevronDownIcon />
  </div>

  {/* Navigation */}
  <nav className="sidebar-nav">
    <NavSection title="Overview">
      <NavItem icon={HomeIcon} label="Dashboard" active />
      <NavItem icon={ActivityIcon} label="Logs" badge="Live" />
      <NavItem icon={ChartIcon} label="Analytics" />
    </NavSection>

    <NavSection title="Database">
      <NavItem icon={DatabaseIcon} label="Tables" />
      <NavItem icon={CodeIcon} label="SQL Editor" />
      <NavItem icon={KeyIcon} label="Migrations" />
    </NavSection>

    <NavSection title="Auth">
      <NavItem icon={UsersIcon} label="Users" count={1243} />
      <NavItem icon={ShieldIcon} label="Policies" />
      <NavItem icon={KeyIcon} label="API Keys" />
    </NavSection>

    <NavSection title="Settings">
      <NavItem icon={SettingsIcon} label="Project" />
      <NavItem icon={TeamIcon} label="Team" />
      <NavItem icon={WebhookIcon} label="Webhooks" />
    </NavSection>
  </nav>

  {/* Bottom Actions */}
  <div className="sidebar-footer">
    <button className="sidebar-action">
      <DocsIcon />
      <span>Documentation</span>
      <ExternalLinkIcon />
    </button>
    <button className="sidebar-action">
      <FeedbackIcon />
      <span>Feedback</span>
    </button>
  </div>
</aside>
```

```css
.sidebar {
  width: 220px;
  display: flex;
  flex-direction: column;
  background: var(--bg-surface);
  border-right: 1px solid var(--border-subtle);
}

.project-selector {
  height: 56px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid var(--border-subtle);
  cursor: pointer;
  transition: background 0.1s ease;
}

.project-selector:hover {
  background: var(--bg-hover);
}

.project-icon {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--accent) 0%, #059669 100%);
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  color: white;
}

.project-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.project-name {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.project-env {
  font-size: 11px;
  color: var(--accent);
}

.project-selector svg {
  width: 16px;
  height: 16px;
  color: var(--text-muted);
}

.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: 12px 8px;
}

.nav-section {
  margin-bottom: 20px;
}

.nav-section-title {
  padding: 0 8px 8px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 32px;
  padding: 0 8px;
  margin-bottom: 2px;
  border-radius: 6px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.1s ease;
}

.nav-item:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

.nav-item.active {
  background: var(--accent-soft);
  color: var(--accent);
}

.nav-item svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.nav-label {
  flex: 1;
  font-size: 13px;
  font-weight: 400;
}

.nav-item.active .nav-label {
  font-weight: 500;
}

.nav-badge {
  padding: 2px 6px;
  font-size: 10px;
  font-weight: 500;
  background: var(--success-soft);
  color: var(--success);
  border-radius: 4px;
}

.nav-count {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-muted);
}

.sidebar-footer {
  padding: 8px;
  border-top: 1px solid var(--border-subtle);
}

.sidebar-action {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 32px;
  padding: 0 8px;
  background: transparent;
  border: none;
  border-radius: 6px;
  color: var(--text-secondary);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.1s ease;
}

.sidebar-action:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

.sidebar-action svg {
  width: 14px;
  height: 14px;
}

.sidebar-action svg:last-child {
  margin-left: auto;
  width: 12px;
  height: 12px;
  color: var(--text-muted);
}
```

---

### Tab Bar

```tsx
<div className="tab-bar">
  <div className="tabs">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        className={`tab ${activeTab === tab.id ? 'active' : ''}`}
        onClick={() => setActiveTab(tab.id)}
      >
        <tab.icon className="tab-icon" />
        <span>{tab.label}</span>
        {tab.modified && <span className="tab-dot" />}
        <button className="tab-close">
          <XIcon />
        </button>
      </button>
    ))}
  </div>

  <div className="tab-actions">
    <button className="icon-btn-sm">
      <SplitIcon />
    </button>
    <button className="icon-btn-sm">
      <MaximizeIcon />
    </button>
  </div>
</div>
```

```css
.tab-bar {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border-subtle);
}

.tabs {
  display: flex;
  height: 100%;
  overflow-x: auto;
}

.tab {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 100%;
  padding: 0 16px;
  border-right: 1px solid var(--border-subtle);
  background: transparent;
  color: var(--text-secondary);
  font-size: 12px;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.1s ease;
}

.tab:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

.tab.active {
  background: var(--bg-base);
  color: var(--text-primary);
  border-bottom: 2px solid var(--accent);
  margin-bottom: -1px;
}

.tab-icon {
  width: 14px;
  height: 14px;
}

.tab-dot {
  width: 6px;
  height: 6px;
  background: var(--accent);
  border-radius: 50%;
}

.tab-close {
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 4px;
  color: var(--text-muted);
  opacity: 0;
  cursor: pointer;
  transition: all 0.1s ease;
}

.tab:hover .tab-close {
  opacity: 1;
}

.tab-close:hover {
  background: var(--bg-active);
  color: var(--text-primary);
}

.tab-close svg {
  width: 12px;
  height: 12px;
}

.tab-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 8px;
}

.icon-btn-sm {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 4px;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.1s ease;
}

.icon-btn-sm:hover {
  background: var(--bg-hover);
  color: var(--text-secondary);
}

.icon-btn-sm svg {
  width: 14px;
  height: 14px;
}
```

---

### Data Table

```tsx
<div className="table-container">
  <table className="data-table">
    <thead>
      <tr>
        <th className="th-checkbox">
          <Checkbox />
        </th>
        <th className="th-sortable" onClick={() => handleSort('id')}>
          <span>ID</span>
          <SortIcon direction={sortDir} />
        </th>
        <th className="th-sortable">
          <span>Email</span>
        </th>
        <th>Status</th>
        <th>Created</th>
        <th className="th-actions" />
      </tr>
    </thead>
    <tbody>
      {rows.map((row, index) => (
        <motion.tr
          key={row.id}
          className={`table-row ${selectedRows.includes(row.id) ? 'selected' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.02 }}
        >
          <td className="td-checkbox">
            <Checkbox checked={selectedRows.includes(row.id)} />
          </td>
          <td className="td-mono">{row.id}</td>
          <td className="td-primary">{row.email}</td>
          <td>
            <StatusBadge status={row.status} />
          </td>
          <td className="td-mono td-muted">{row.createdAt}</td>
          <td className="td-actions">
            <button className="row-action">
              <MoreIcon />
            </button>
          </td>
        </motion.tr>
      ))}
    </tbody>
  </table>
</div>
```

```css
.table-container {
  width: 100%;
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.data-table thead {
  position: sticky;
  top: 0;
  z-index: 10;
  background: var(--bg-surface);
}

.data-table th {
  height: 40px;
  padding: 0 16px;
  text-align: left;
  font-weight: 500;
  color: var(--text-muted);
  border-bottom: 1px solid var(--border-default);
  white-space: nowrap;
}

.th-sortable {
  cursor: pointer;
  user-select: none;
  transition: color 0.1s ease;
}

.th-sortable:hover {
  color: var(--text-secondary);
}

.th-sortable span {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.th-sortable svg {
  width: 12px;
  height: 12px;
}

.th-checkbox,
.td-checkbox {
  width: 44px;
  padding: 0 12px;
}

.th-actions,
.td-actions {
  width: 44px;
  padding: 0 8px;
}

.data-table tbody tr {
  border-bottom: 1px solid var(--border-subtle);
  transition: background 0.1s ease;
}

.data-table tbody tr:hover {
  background: var(--bg-hover);
}

.data-table tbody tr.selected {
  background: var(--bg-selected);
}

.data-table td {
  height: 48px;
  padding: 0 16px;
  color: var(--text-secondary);
}

.td-primary {
  color: var(--text-primary);
}

.td-mono {
  font-family: var(--font-mono);
  font-size: 12px;
}

.td-muted {
  color: var(--text-muted);
}

.row-action {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 4px;
  color: var(--text-muted);
  opacity: 0;
  cursor: pointer;
  transition: all 0.1s ease;
}

.data-table tbody tr:hover .row-action {
  opacity: 1;
}

.row-action:hover {
  background: var(--bg-active);
  color: var(--text-secondary);
}

.row-action svg {
  width: 16px;
  height: 16px;
}
```

### Status Badge
```css
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 500;
  border-radius: 4px;
}

.status-badge::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.status-badge.active {
  background: var(--success-soft);
  color: var(--success);
}

.status-badge.active::before {
  background: var(--success);
  animation: pulse-glow 2s infinite;
}

.status-badge.inactive {
  background: var(--bg-elevated);
  color: var(--text-muted);
}

.status-badge.inactive::before {
  background: var(--text-muted);
}

.status-badge.pending {
  background: var(--warning-soft);
  color: var(--warning);
}

.status-badge.pending::before {
  background: var(--warning);
}

.status-badge.error {
  background: var(--error-soft);
  color: var(--error);
}

.status-badge.error::before {
  background: var(--error);
}
```

---

### Code Block

```tsx
<div className="code-block">
  <div className="code-header">
    <span className="code-language">SQL</span>
    <div className="code-actions">
      <button className="code-action" onClick={handleCopy}>
        {copied ? <CheckIcon /> : <CopyIcon />}
        <span>{copied ? 'Copied!' : 'Copy'}</span>
      </button>
      <button className="code-action">
        <PlayIcon />
        <span>Run</span>
      </button>
    </div>
  </div>
  <div className="code-content">
    <div className="line-numbers">
      {lines.map((_, i) => (
        <span key={i}>{i + 1}</span>
      ))}
    </div>
    <pre className="code-pre">
      <code>{highlightedCode}</code>
    </pre>
  </div>
</div>
```

```css
.code-block {
  background: var(--bg-code);
  border: 1px solid var(--border-subtle);
  border-radius: 8px;
  overflow: hidden;
}

.code-header {
  height: 40px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border-subtle);
}

.code-language {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  color: var(--text-muted);
  text-transform: uppercase;
}

.code-actions {
  display: flex;
  gap: 4px;
}

.code-action {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  padding: 0 10px;
  background: transparent;
  border: none;
  border-radius: 4px;
  color: var(--text-secondary);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.1s ease;
}

.code-action:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

.code-action svg {
  width: 14px;
  height: 14px;
}

.code-content {
  display: flex;
  overflow-x: auto;
}

.line-numbers {
  display: flex;
  flex-direction: column;
  padding: 16px 0;
  background: var(--bg-surface);
  border-right: 1px solid var(--border-subtle);
  user-select: none;
}

.line-numbers span {
  padding: 0 12px;
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 20px;
  color: var(--text-muted);
  text-align: right;
}

.code-pre {
  flex: 1;
  margin: 0;
  padding: 16px;
  overflow-x: auto;
}

.code-pre code {
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 20px;
  color: var(--text-code);
}

/* Syntax Highlighting */
.token.keyword { color: var(--syntax-keyword); }
.token.string { color: var(--syntax-string); }
.token.number { color: var(--syntax-number); }
.token.function { color: var(--syntax-function); }
.token.variable { color: var(--syntax-variable); }
.token.comment { color: var(--syntax-comment); font-style: italic; }
.token.operator { color: var(--syntax-operator); }
.token.property { color: var(--syntax-property); }
```

---

### Metric Card

```tsx
<div className="metric-card">
  <div className="metric-header">
    <span className="metric-label">Requests</span>
    <TrendingUpIcon className="metric-trend up" />
  </div>
  <div className="metric-value">1,234,567</div>
  <div className="metric-footer">
    <span className="metric-change up">+12.5%</span>
    <span className="metric-period">vs last 7 days</span>
  </div>
  <div className="metric-sparkline">
    <Sparkline data={sparklineData} />
  </div>
</div>
```

```css
.metric-card {
  padding: 20px;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: 8px;
  transition: all 0.15s ease;
}

.metric-card:hover {
  border-color: var(--border-default);
  box-shadow: var(--shadow-glow);
}

.metric-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.metric-label {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.metric-trend {
  width: 16px;
  height: 16px;
}

.metric-trend.up {
  color: var(--success);
}

.metric-trend.down {
  color: var(--error);
}

.metric-value {
  font-family: var(--font-mono);
  font-size: 28px;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.2;
}

.metric-footer {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}

.metric-change {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
}

.metric-change.up {
  color: var(--success);
}

.metric-change.down {
  color: var(--error);
}

.metric-period {
  font-size: 12px;
  color: var(--text-muted);
}

.metric-sparkline {
  margin-top: 16px;
  height: 40px;
}
```

---

### Log Viewer

```tsx
<div className="log-viewer">
  <div className="log-header">
    <div className="log-filters">
      <select className="log-filter">
        <option>All Levels</option>
        <option>Error</option>
        <option>Warning</option>
        <option>Info</option>
        <option>Debug</option>
      </select>
      <input
        type="text"
        className="log-search"
        placeholder="Search logs..."
      />
    </div>
    <div className="log-actions">
      <button className="log-action">
        <PlayIcon />
        <span>Live</span>
      </button>
      <button className="log-action">
        <DownloadIcon />
      </button>
    </div>
  </div>

  <div className="log-content">
    {logs.map((log, index) => (
      <div
        key={index}
        className={`log-entry level-${log.level}`}
      >
        <span className="log-timestamp">{log.timestamp}</span>
        <span className={`log-level ${log.level}`}>{log.level}</span>
        <span className="log-message">{log.message}</span>
      </div>
    ))}
  </div>
</div>
```

```css
.log-viewer {
  display: flex;
  flex-direction: column;
  background: var(--bg-code);
  border: 1px solid var(--border-subtle);
  border-radius: 8px;
  overflow: hidden;
}

.log-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border-subtle);
}

.log-filters {
  display: flex;
  gap: 8px;
}

.log-filter,
.log-search {
  height: 32px;
  padding: 0 12px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: 6px;
  color: var(--text-secondary);
  font-size: 13px;
}

.log-filter:focus,
.log-search:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 2px var(--accent-glow);
}

.log-search {
  width: 200px;
}

.log-actions {
  display: flex;
  gap: 4px;
}

.log-action {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 12px;
  background: transparent;
  border: none;
  border-radius: 6px;
  color: var(--text-secondary);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.1s ease;
}

.log-action:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

.log-action svg {
  width: 14px;
  height: 14px;
}

.log-content {
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 1.6;
}

.log-entry {
  display: flex;
  gap: 12px;
  padding: 4px 12px;
  transition: background 0.1s ease;
}

.log-entry:hover {
  background: var(--bg-hover);
}

.log-timestamp {
  color: var(--text-muted);
  flex-shrink: 0;
}

.log-level {
  width: 56px;
  flex-shrink: 0;
  font-weight: 500;
  text-transform: uppercase;
}

.log-level.error {
  color: var(--error);
}

.log-level.warn {
  color: var(--warning);
}

.log-level.info {
  color: var(--info);
}

.log-level.debug {
  color: var(--text-muted);
}

.log-message {
  color: var(--text-secondary);
  word-break: break-word;
}

.log-entry.level-error {
  background: var(--error-soft);
}
```

---

### Command Palette

```tsx
const CommandPalette = () => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="command-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            onClick={onClose}
          />

          <motion.div
            className="command-palette"
            initial={{ opacity: 0, scale: 0.98, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="command-input-wrapper">
              <SearchIcon />
              <input
                type="text"
                placeholder="Type a command or search..."
                autoFocus
              />
            </div>

            <div className="command-results">
              <div className="command-group">
                <div className="command-group-title">Recent</div>
                {recentCommands.map((cmd) => (
                  <CommandItem key={cmd.id} command={cmd} />
                ))}
              </div>

              <div className="command-group">
                <div className="command-group-title">Actions</div>
                {actions.map((cmd) => (
                  <CommandItem key={cmd.id} command={cmd} />
                ))}
              </div>
            </div>

            <div className="command-footer">
              <span><kbd>↑↓</kbd> Navigate</span>
              <span><kbd>↵</kbd> Select</span>
              <span><kbd>ESC</kbd> Close</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
```

```css
.command-overlay {
  position: fixed;
  inset: 0;
  background: var(--overlay);
  z-index: 100;
}

.command-palette {
  position: fixed;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 560px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-default);
  border-radius: 12px;
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  z-index: 101;
}

.command-input-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid var(--border-subtle);
}

.command-input-wrapper svg {
  width: 18px;
  height: 18px;
  color: var(--text-muted);
}

.command-input-wrapper input {
  flex: 1;
  background: transparent;
  border: none;
  font-size: 15px;
  color: var(--text-primary);
  outline: none;
}

.command-input-wrapper input::placeholder {
  color: var(--text-muted);
}

.command-results {
  max-height: 360px;
  overflow-y: auto;
  padding: 8px;
}

.command-group {
  margin-bottom: 8px;
}

.command-group:last-child {
  margin-bottom: 0;
}

.command-group-title {
  padding: 8px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.command-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.1s ease;
}

.command-item:hover,
.command-item.selected {
  background: var(--bg-hover);
}

.command-item.selected {
  background: var(--accent-soft);
}

.command-item svg {
  width: 16px;
  height: 16px;
  color: var(--text-muted);
}

.command-item.selected svg {
  color: var(--accent);
}

.command-item-label {
  flex: 1;
  font-size: 14px;
  color: var(--text-primary);
}

.command-item-shortcut {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-muted);
}

.command-footer {
  display: flex;
  gap: 16px;
  padding: 12px 16px;
  background: var(--bg-surface);
  border-top: 1px solid var(--border-subtle);
}

.command-footer span {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: var(--text-muted);
}

.command-footer kbd {
  padding: 2px 5px;
  font-family: var(--font-mono);
  font-size: 10px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-default);
  border-radius: 4px;
}
```

---

### Status Bar (Bottom)

```tsx
<footer className="status-bar">
  <div className="status-left">
    <span className="status-item">
      <GitBranchIcon />
      main
    </span>
    <span className="status-item">
      <SyncIcon className="spinning" />
      Syncing...
    </span>
  </div>

  <div className="status-right">
    <span className="status-item success">
      <CircleIcon />
      All systems operational
    </span>
    <span className="status-item">
      <ClockIcon />
      Last sync: 2m ago
    </span>
  </div>
</footer>
```

```css
.status-bar {
  height: 24px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--bg-surface);
  border-top: 1px solid var(--border-subtle);
  font-size: 11px;
}

.status-left,
.status-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text-muted);
}

.status-item svg {
  width: 12px;
  height: 12px;
}

.status-item.success {
  color: var(--success);
}

.status-item.error {
  color: var(--error);
}

.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

---

### Inspector Panel (Right Side)

```tsx
<aside className="inspector">
  <div className="inspector-header">
    <h3>Row Details</h3>
    <button className="icon-btn-sm" onClick={closeInspector}>
      <XIcon />
    </button>
  </div>

  <div className="inspector-content">
    <div className="inspector-section">
      <h4 className="inspector-section-title">Properties</h4>
      <div className="property-list">
        <div className="property-item">
          <span className="property-key">id</span>
          <span className="property-value mono">usr_abc123xyz</span>
        </div>
        <div className="property-item">
          <span className="property-key">email</span>
          <span className="property-value">john@example.com</span>
        </div>
        <div className="property-item">
          <span className="property-key">created_at</span>
          <span className="property-value mono">2024-01-15T10:30:00Z</span>
        </div>
        <div className="property-item">
          <span className="property-key">status</span>
          <StatusBadge status="active" />
        </div>
      </div>
    </div>

    <div className="inspector-section">
      <h4 className="inspector-section-title">Raw JSON</h4>
      <CodeBlock
        language="json"
        code={JSON.stringify(selectedRow, null, 2)}
      />
    </div>

    <div className="inspector-section">
      <h4 className="inspector-section-title">Activity</h4>
      <div className="activity-timeline">
        {activities.map((activity) => (
          <div key={activity.id} className="activity-item">
            <div className="activity-dot" />
            <div className="activity-content">
              <p>{activity.description}</p>
              <span className="activity-time">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>

  <div className="inspector-footer">
    <button className="btn-secondary">Edit</button>
    <button className="btn-danger">Delete</button>
  </div>
</aside>
```

```css
.inspector {
  width: 320px;
  display: flex;
  flex-direction: column;
  background: var(--bg-surface);
  border-left: 1px solid var(--border-subtle);
}

.inspector-header {
  height: 48px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-subtle);
}

.inspector-header h3 {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
}

.inspector-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.inspector-section {
  margin-bottom: 24px;
}

.inspector-section-title {
  margin-bottom: 12px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.property-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.property-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}

.property-key {
  font-size: 12px;
  color: var(--text-muted);
  flex-shrink: 0;
}

.property-value {
  font-size: 13px;
  color: var(--text-primary);
  text-align: right;
  word-break: break-all;
}

.property-value.mono {
  font-family: var(--font-mono);
  font-size: 12px;
}

.activity-timeline {
  display: flex;
  flex-direction: column;
}

.activity-item {
  display: flex;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--border-subtle);
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-dot {
  width: 8px;
  height: 8px;
  margin-top: 6px;
  background: var(--accent);
  border-radius: 50%;
  flex-shrink: 0;
}

.activity-content p {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.4;
  margin-bottom: 4px;
}

.activity-time {
  font-size: 11px;
  color: var(--text-muted);
}

.inspector-footer {
  padding: 12px 16px;
  display: flex;
  gap: 8px;
  border-top: 1px solid var(--border-subtle);
}
```

---

## Button Components

```css
/* Primary Button */
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 32px;
  padding: 0 14px;
  font-size: 13px;
  font-weight: 500;
  color: #0A0A0B;
  background: var(--accent);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.1s ease;
}

.btn-primary:hover {
  background: var(--accent-hover);
}

.btn-primary:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--accent-glow);
}

/* Secondary Button */
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 32px;
  padding: 0 14px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-primary);
  background: var(--bg-elevated);
  border: 1px solid var(--border-default);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.1s ease;
}

.btn-secondary:hover {
  background: var(--bg-hover);
  border-color: var(--border-strong);
}

/* Ghost Button */
.btn-ghost {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 32px;
  padding: 0 12px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.1s ease;
}

.btn-ghost:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

/* Danger Button */
.btn-danger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 32px;
  padding: 0 14px;
  font-size: 13px;
  font-weight: 500;
  color: var(--error);
  background: var(--error-soft);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.1s ease;
}

.btn-danger:hover {
  background: var(--error);
  color: white;
}
```

---

## Animation System

### Spring Configuration (Fast & Minimal)
```typescript
const devSpring = {
  type: "spring",
  stiffness: 500,
  damping: 35,
  mass: 1,
};

const instantTransition = {
  duration: 0.1,
  ease: [0.4, 0, 0.2, 1],
};

const fastTransition = {
  duration: 0.15,
  ease: [0.4, 0, 0.2, 1],
};
```

### Component Animations
```typescript
// Table row entrance
const rowAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.1 },
};

// Panel slide
const panelSlide = {
  initial: { x: 320, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 320, opacity: 0 },
  transition: fastTransition,
};

// Command palette
const commandPaletteAnimation = {
  initial: { opacity: 0, scale: 0.98, y: -10 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.98, y: -10 },
  transition: fastTransition,
};

// Toast notification
const toastAnimation = {
  initial: { opacity: 0, y: -10, x: 0 },
  animate: { opacity: 1, y: 0, x: 0 },
  exit: { opacity: 0, y: -10, x: 0 },
  transition: fastTransition,
};
```

### Loading States
```css
/* Skeleton shimmer */
.skeleton {
  background: linear-gradient(
    90deg,
    var(--bg-elevated) 25%,
    var(--bg-hover) 50%,
    var(--bg-elevated) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 2s infinite linear;
  border-radius: 4px;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Loading spinner */
.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid var(--border-default);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
```

---

## Form Components

### Input Field
```css
.input-field {
  width: 100%;
  height: 36px;
  padding: 0 12px;
  font-family: var(--font-sans);
  font-size: 13px;
  color: var(--text-primary);
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: 6px;
  transition: all 0.1s ease;
}

.input-field::placeholder {
  color: var(--text-muted);
}

.input-field:hover {
  border-color: var(--border-default);
}

.input-field:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 2px var(--accent-glow);
}

/* Monospace Input (for code/IDs) */
.input-mono {
  font-family: var(--font-mono);
  font-size: 12px;
}
```

### Checkbox
```css
.checkbox {
  appearance: none;
  width: 16px;
  height: 16px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-default);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.1s ease;
}

.checkbox:hover {
  border-color: var(--accent);
}

.checkbox:checked {
  background: var(--accent);
  border-color: var(--accent);
}

.checkbox:checked::after {
  content: '';
  display: block;
  width: 4px;
  height: 8px;
  margin: 2px auto;
  border: solid #0A0A0B;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox:focus-visible {
  box-shadow: 0 0 0 2px var(--accent-glow);
}
```

### Select
```css
.select-field {
  height: 36px;
  padding: 0 32px 0 12px;
  font-size: 13px;
  color: var(--text-primary);
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: 6px;
  appearance: none;
  background-image: url("data:image/svg+xml,...");
  background-repeat: no-repeat;
  background-position: right 10px center;
  cursor: pointer;
  transition: all 0.1s ease;
}

.select-field:hover {
  border-color: var(--border-default);
}

.select-field:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 2px var(--accent-glow);
}
```

---

## Keyboard Shortcuts Reference

```typescript
// Global shortcuts
const shortcuts = {
  'cmd+k': 'Open command palette',
  'cmd+/': 'Toggle sidebar',
  'cmd+\\': 'Toggle inspector',
  'cmd+s': 'Save',
  'cmd+shift+p': 'Toggle preview',
  'cmd+enter': 'Execute query',
  'escape': 'Close modal/panel',
  'cmd+f': 'Search in view',
  'cmd+shift+f': 'Global search',
};

// Table navigation (when focused)
const tableShortcuts = {
  'j': 'Move down',
  'k': 'Move up',
  'x': 'Toggle selection',
  'enter': 'Open details',
  'delete': 'Delete selected',
};
```

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

---

## Sample Data Structure

```typescript
// Table data
const users = [
  {
    id: 'usr_abc123xyz',
    email: 'john@example.com',
    status: 'active',
    createdAt: '2024-01-15T10:30:00Z',
  },
  // ... more users
];

// Logs data
const logs = [
  {
    timestamp: '2024-01-15 10:30:45',
    level: 'info',
    message: 'Database connection established',
  },
  {
    timestamp: '2024-01-15 10:30:46',
    level: 'error',
    message: 'Failed to authenticate user: invalid credentials',
  },
  // ... more logs
];

// Navigation
const navigation = [
  {
    title: 'Overview',
    items: [
      { id: 'dashboard', icon: HomeIcon, label: 'Dashboard' },
      { id: 'logs', icon: ActivityIcon, label: 'Logs', badge: 'Live' },
      { id: 'analytics', icon: ChartIcon, label: 'Analytics' },
    ],
  },
  // ... more sections
];
```

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
