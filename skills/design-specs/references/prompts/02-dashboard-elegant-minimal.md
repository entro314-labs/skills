# Elegant Minimal Dashboard - Exhaustive Technical Specification

Generate a complete, production-ready dashboard application using Next.js, TypeScript, Tailwind CSS, and Motion. This specification defines every visual element, animation parameter, and interactive behavior. Do not deviate from these values.

**Design Inspiration:** Craft.do (document-first beauty), Cal.com (infrastructure clarity), Linear (micro-interaction polish).

**Core Philosophy:** This dashboard should feel like a "control center for beautiful workspaces" - content-first, spatially aware, with movement that feels physics-based and premium. The opposite of cramped SaaS dashboards.

---

## Output Requirements

- Single React component (or page with imported components)
- Next.js with App Router
- TypeScript strict mode
- Tailwind CSS for all styling
- Motion for all animations
- CSS Grid with named areas
- Keyboard-accessible (⌘K command palette)
- Light mode primary (dark mode optional)

---

## Dashboard Structure Overview

The dashboard consists of these elements:
1. App Shell (Grid Layout Wrapper)
2. Left Sidebar (Navigation)
3. Main Content Area (Canvas)
4. Right Context Panel (Collapsible)
5. Command Palette (⌘K Modal)
6. Header Bar (within main area)

---

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

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 2px 4px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.04);
  --shadow-lg: 0 4px 8px rgba(0, 0, 0, 0.04), 0 8px 16px rgba(0, 0, 0, 0.06), 0 16px 32px rgba(0, 0, 0, 0.04);
  --shadow-xl: 0 8px 16px rgba(0, 0, 0, 0.06), 0 16px 32px rgba(0, 0, 0, 0.08), 0 32px 64px rgba(0, 0, 0, 0.06);
  --shadow-hover: 0 8px 16px rgba(0, 0, 0, 0.08), 0 16px 32px rgba(0, 0, 0, 0.06);
  --shadow-focus: 0 0 0 3px rgba(99, 102, 241, 0.2);

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

  /* Same values as the :root shadows above. In v4 a theme variable and a CSS
     variable of the same name are one variable, so these cannot be var() references. */
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

---

## Component Specifications

### Sidebar

```tsx
<aside className="sidebar">
  {/* Logo/Brand */}
  <div className="sidebar-header">
    <Logo />
    <button className="sidebar-collapse-btn">
      <ChevronLeftIcon />
    </button>
  </div>

  {/* Search/Command */}
  <div className="sidebar-search">
    <button className="search-trigger">
      <SearchIcon />
      <span>Search</span>
      <kbd>⌘K</kbd>
    </button>
  </div>

  {/* Primary Navigation */}
  <nav className="sidebar-nav">
    <NavSection title="Overview">
      <NavItem icon={HomeIcon} label="Home" active />
      <NavItem icon={InboxIcon} label="Inbox" badge={3} />
      <NavItem icon={CalendarIcon} label="Calendar" />
      <NavItem icon={TasksIcon} label="Tasks" />
    </NavSection>

    <NavSection title="Workspaces">
      <NavItem icon={FolderIcon} label="Product" color="#6366F1" />
      <NavItem icon={FolderIcon} label="Marketing" color="#10B981" />
      <NavItem icon={FolderIcon} label="Engineering" color="#F59E0B" />
      <AddWorkspaceButton />
    </NavSection>
  </nav>

  {/* User/Settings */}
  <div className="sidebar-footer">
    <UserMenu />
  </div>
</aside>
```

```css
.sidebar {
  width: 240px;
  display: flex;
  flex-direction: column;
  background: var(--bg-surface);
  border-right: 1px solid var(--border-subtle);
}

.sidebar-header {
  height: 56px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-subtle);
}

.sidebar-search {
  padding: 12px 12px 8px;
}

.search-trigger {
  width: 100%;
  height: 36px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--bg-muted);
  border: 1px solid var(--border-subtle);
  border-radius: 8px;
  color: var(--text-muted);
  font-size: 13px;
  transition: all 0.15s ease;
}

.search-trigger:hover {
  background: var(--bg-hover);
  border-color: var(--border-default);
}

.search-trigger kbd {
  margin-left: auto;
  padding: 2px 6px;
  font-size: 11px;
  font-family: var(--font-mono);
  background: var(--bg-surface);
  border: 1px solid var(--border-default);
  border-radius: 4px;
  color: var(--text-muted);
}

.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: 8px 12px;
}

.sidebar-footer {
  padding: 12px;
  border-top: 1px solid var(--border-subtle);
}
```

### Navigation Item with Animated Indicator

```tsx
const NavItem = ({ icon: Icon, label, active, badge, color }) => {
  return (
    <motion.button
      className={`nav-item ${active ? 'active' : ''}`}
      whileHover={{ backgroundColor: 'var(--bg-hover)' }}
      whileTap={{ scale: 0.98 }}
    >
      {active && (
        <motion.div
          layoutId="nav-indicator"
          className="nav-indicator"
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 30,
          }}
        />
      )}

      <div className="nav-item-content">
        {color ? (
          <div
            className="nav-color-dot"
            style={{ backgroundColor: color }}
          />
        ) : (
          <Icon className="nav-icon" />
        )}
        <span className="nav-label">{label}</span>
        {badge && <span className="nav-badge">{badge}</span>}
      </div>
    </motion.button>
  );
};
```

```css
.nav-item {
  position: relative;
  width: 100%;
  height: 36px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s ease;
}

.nav-item:hover {
  background: var(--bg-hover);
}

.nav-indicator {
  position: absolute;
  inset: 0;
  background: var(--accent-soft);
  border-radius: 8px;
  z-index: 0;
}

.nav-item-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.nav-icon {
  width: 18px;
  height: 18px;
  color: var(--text-secondary);
}

.nav-item.active .nav-icon {
  color: var(--accent-primary);
}

.nav-color-dot {
  width: 10px;
  height: 10px;
  border-radius: 3px;
}

.nav-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
}

.nav-item.active .nav-label {
  color: var(--text-primary);
}

.nav-badge {
  margin-left: auto;
  padding: 2px 8px;
  font-size: 11px;
  font-weight: 600;
  color: var(--accent-primary);
  background: var(--accent-soft);
  border-radius: 10px;
}
```

### Nav Section
```css
.nav-section {
  margin-bottom: 16px;
}

.nav-section-title {
  padding: 8px 12px 6px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
}
```

---

### Main Content Header

```tsx
<header className="content-header">
  <div className="header-left">
    <button className="mobile-menu-btn md:hidden">
      <MenuIcon />
    </button>

    <div className="breadcrumb">
      <span>Workspaces</span>
      <ChevronRightIcon />
      <span className="current">Product</span>
    </div>
  </div>

  <div className="header-actions">
    <button className="btn-icon">
      <FilterIcon />
    </button>
    <button className="btn-icon">
      <ViewGridIcon />
    </button>
    <button className="btn-primary">
      <PlusIcon />
      New Document
    </button>
  </div>
</header>
```

```css
.content-header {
  height: 56px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--bg-base);
  border-bottom: 1px solid var(--border-subtle);
  position: sticky;
  top: 0;
  z-index: 20;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--text-muted);
}

.breadcrumb .current {
  color: var(--text-primary);
  font-weight: 500;
}

.breadcrumb svg {
  width: 16px;
  height: 16px;
  color: var(--text-muted);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}
```

---

### Card Grid (Document Cards)

```tsx
<div className="card-grid">
  {documents.map((doc, index) => (
    <motion.div
      key={doc.id}
      className={`doc-card ${doc.size}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.05,
        type: "spring",
        stiffness: 200,
        damping: 25,
      }}
      whileHover={{
        y: -4,
        boxShadow: 'var(--shadow-hover)',
        transition: { type: "spring", stiffness: 300, damping: 25 }
      }}
    >
      {doc.cover && (
        <div
          className="card-cover"
          style={{ backgroundColor: doc.cover }}
        />
      )}
      <div className="card-content">
        <div className="card-icon">
          <doc.icon />
        </div>
        <h3 className="card-title">{doc.title}</h3>
        <p className="card-description">{doc.description}</p>
        <div className="card-meta">
          <span className="card-date">{doc.updatedAt}</span>
          {doc.style && (
            <span className="card-style-badge">{doc.style}</span>
          )}
        </div>
      </div>
    </motion.div>
  ))}
</div>
```

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding: 24px;
}

/* Mixed card sizes */
.doc-card.size-wide {
  grid-column: span 2;
}

.doc-card.size-tall {
  grid-row: span 2;
}

.doc-card {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.2s ease;
}

.doc-card:hover {
  border-color: var(--border-default);
}

.card-cover {
  height: 8px;
  width: 100%;
}

.card-content {
  padding: 20px;
}

.card-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-muted);
  border-radius: 10px;
  margin-bottom: 16px;
}

.card-icon svg {
  width: 20px;
  height: 20px;
  color: var(--text-secondary);
}

.card-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 6px;
  line-height: 1.4;
}

.card-description {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-date {
  font-size: 12px;
  color: var(--text-muted);
}

.card-style-badge {
  padding: 4px 8px;
  font-size: 11px;
  font-weight: 500;
  color: var(--accent-primary);
  background: var(--accent-soft);
  border-radius: 4px;
}
```

---

### Context Panel (Right Side)

```tsx
<AnimatePresence>
  {contextPanelOpen && (
    <motion.aside
      className="context-panel"
      initial={{ x: 320, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 320, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      <div className="context-header">
        <h2>Document Details</h2>
        <button onClick={closePanel}>
          <XIcon />
        </button>
      </div>

      <div className="context-content">
        {/* Preview */}
        <div className="context-preview">
          <img src={selectedDoc.thumbnail} alt="" />
        </div>

        {/* Properties */}
        <div className="context-section">
          <h3 className="context-section-title">Properties</h3>
          <div className="property-row">
            <span className="property-label">Created</span>
            <span className="property-value">{selectedDoc.createdAt}</span>
          </div>
          <div className="property-row">
            <span className="property-label">Modified</span>
            <span className="property-value">{selectedDoc.updatedAt}</span>
          </div>
          <div className="property-row">
            <span className="property-label">Owner</span>
            <span className="property-value">{selectedDoc.owner}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="context-section">
          <h3 className="context-section-title">Tags</h3>
          <div className="tags-list">
            {selectedDoc.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
            <button className="tag tag-add">+ Add</button>
          </div>
        </div>

        {/* Activity */}
        <div className="context-section">
          <h3 className="context-section-title">Recent Activity</h3>
          <div className="activity-list">
            {activities.map(activity => (
              <div key={activity.id} className="activity-item">
                <img src={activity.user.avatar} className="activity-avatar" />
                <div className="activity-content">
                  <p>{activity.description}</p>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.aside>
  )}
</AnimatePresence>
```

```css
.context-panel {
  width: 320px;
  background: var(--bg-surface);
  border-left: 1px solid var(--border-subtle);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.context-header {
  height: 56px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-subtle);
}

.context-header h2 {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.context-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.context-preview {
  width: 100%;
  height: 160px;
  background: var(--bg-muted);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 24px;
}

.context-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.context-section {
  margin-bottom: 24px;
}

.context-section-title {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 12px;
}

.property-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid var(--border-subtle);
}

.property-label {
  font-size: 13px;
  color: var(--text-muted);
}

.property-value {
  font-size: 13px;
  color: var(--text-primary);
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-secondary);
  background: var(--bg-muted);
  border-radius: 6px;
}

.tag-add {
  color: var(--accent-primary);
  background: var(--accent-softer);
  cursor: pointer;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.activity-item {
  display: flex;
  gap: 12px;
}

.activity-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  flex-shrink: 0;
}

.activity-content p {
  font-size: 13px;
  color: var(--text-primary);
  line-height: 1.4;
  margin-bottom: 4px;
}

.activity-time {
  font-size: 12px;
  color: var(--text-muted);
}
```

---

### Command Palette (⌘K)

```tsx
const CommandPalette = () => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="command-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="command-modal"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
            }}
          >
            {/* Input */}
            <div className="command-input-wrapper">
              <SearchIcon className="command-search-icon" />
              <input
                type="text"
                className="command-input"
                placeholder="Search or jump to..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
              <kbd className="command-kbd">ESC</kbd>
            </div>

            {/* Results */}
            <div className="command-results">
              {filteredResults.map((result, index) => (
                <motion.button
                  key={result.id}
                  className={`command-result ${index === selectedIndex ? 'selected' : ''}`}
                  onClick={() => handleSelect(result)}
                >
                  {index === selectedIndex && (
                    <motion.div
                      layoutId="command-indicator"
                      className="command-result-indicator"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                  <div className="command-result-content">
                    <result.icon className="command-result-icon" />
                    <span className="command-result-label">{result.label}</span>
                    {result.shortcut && (
                      <kbd className="command-result-shortcut">{result.shortcut}</kbd>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Footer */}
            <div className="command-footer">
              <span>
                <kbd>↑↓</kbd> to navigate
              </span>
              <span>
                <kbd>↵</kbd> to select
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
```

```css
.command-backdrop {
  position: fixed;
  inset: 0;
  background: var(--overlay-medium);
  z-index: 100;
}

.command-modal {
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 560px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-default);
  border-radius: 16px;
  box-shadow: var(--shadow-xl);
  overflow: hidden;
  z-index: 101;
}

.command-input-wrapper {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-subtle);
}

.command-search-icon {
  width: 20px;
  height: 20px;
  color: var(--text-muted);
  margin-right: 12px;
}

.command-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 16px;
  color: var(--text-primary);
  outline: none;
}

.command-input::placeholder {
  color: var(--text-placeholder);
}

.command-kbd {
  padding: 4px 8px;
  font-size: 11px;
  font-family: var(--font-mono);
  color: var(--text-muted);
  background: var(--bg-muted);
  border: 1px solid var(--border-default);
  border-radius: 4px;
}

.command-results {
  max-height: 320px;
  overflow-y: auto;
  padding: 8px;
}

.command-result {
  position: relative;
  width: 100%;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
}

.command-result-indicator {
  position: absolute;
  inset: 0;
  background: var(--accent-soft);
  border-radius: 8px;
  z-index: 0;
}

.command-result-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
}

.command-result-icon {
  width: 18px;
  height: 18px;
  color: var(--text-secondary);
}

.command-result.selected .command-result-icon {
  color: var(--accent-primary);
}

.command-result-label {
  flex: 1;
  text-align: left;
  font-size: 14px;
  color: var(--text-primary);
}

.command-result-shortcut {
  padding: 4px 8px;
  font-size: 11px;
  font-family: var(--font-mono);
  color: var(--text-muted);
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: 4px;
}

.command-footer {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 20px;
  border-top: 1px solid var(--border-subtle);
  background: var(--bg-muted);
}

.command-footer span {
  font-size: 12px;
  color: var(--text-muted);
}

.command-footer kbd {
  padding: 2px 6px;
  font-size: 10px;
  font-family: var(--font-mono);
  background: var(--bg-surface);
  border: 1px solid var(--border-default);
  border-radius: 4px;
  margin-right: 4px;
}
```

---

### Button Components

```css
/* Primary Button */
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 36px;
  padding: 0 16px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-inverse);
  background: var(--accent-primary);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-primary:hover {
  background: var(--accent-primary-hover);
}

.btn-primary:active {
  transform: scale(0.98);
}

.btn-primary:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus);
}

/* Secondary Button */
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 36px;
  padding: 0 16px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-primary);
  background: var(--bg-surface);
  border: 1px solid var(--border-default);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;
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
  height: 36px;
  padding: 0 12px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-ghost:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

/* Icon Button */
.btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  color: var(--text-secondary);
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-icon:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

.btn-icon svg {
  width: 18px;
  height: 18px;
}
```

---

## Animation System

### Spring Physics Configurations
```typescript
// Motion Spring Configs
const springs = {
  // Gentle - for subtle movements
  gentle: {
    type: "spring",
    stiffness: 150,
    damping: 20,
    mass: 1,
  },

  // Snappy - for UI interactions
  snappy: {
    type: "spring",
    stiffness: 300,
    damping: 30,
    mass: 1,
  },

  // Bouncy - for playful interactions
  bouncy: {
    type: "spring",
    stiffness: 400,
    damping: 25,
    mass: 0.8,
  },

  // Stiff - for fast, precise movements
  stiff: {
    type: "spring",
    stiffness: 500,
    damping: 35,
    mass: 1,
  },
};
```

### Card Hover Animation
```typescript
const cardHover = {
  rest: {
    y: 0,
    scale: 1,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
  },
  hover: {
    y: -4,
    scale: 1.02,
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.08), 0 16px 32px rgba(0, 0, 0, 0.06)',
    transition: springs.gentle,
  },
};
```

### Staggered Grid Entrance
```typescript
const gridContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const gridItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springs.snappy,
  },
};
```

### Panel Slide Animation
```typescript
const panelSlide = {
  initial: { x: 320, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 320, opacity: 0 },
  transition: springs.snappy,
};
```

### Modal Scale Animation
```typescript
const modalAnimation = {
  initial: { opacity: 0, scale: 0.95, y: -20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: -20 },
  transition: springs.bouncy,
};
```

### layoutId for Shared Animations
```typescript
// Sidebar indicator that slides to selected item
<motion.div
  layoutId="sidebar-indicator"
  className="absolute inset-0 bg-accent-soft rounded-lg"
  transition={springs.stiff}
/>

// Command palette result indicator
<motion.div
  layoutId="command-indicator"
  className="absolute inset-0 bg-accent-soft rounded-lg"
  transition={springs.stiff}
/>
```

---

### Custom Cursor Follower (Optional)

```tsx
const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    const damping = 0.15;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      cursorX += (mouseX - cursorX) * damping;
      cursorY += (mouseY - cursorY) * damping;

      cursor.style.transform = `translate(${cursorX - 6}px, ${cursorY - 6}px)`;
      requestAnimationFrame(animate);
    };

    const hoverables = document.querySelectorAll('a, button, [data-cursor-hover]');
    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', () => setIsHovering(true));
      el.addEventListener('mouseleave', () => setIsHovering(false));
    });

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`
        fixed top-0 left-0 pointer-events-none z-9999
        rounded-full bg-accent-primary/20
        transition-[width,height] duration-150
        ${isHovering ? 'w-6 h-6' : 'w-3 h-3'}
      `}
      style={{ willChange: 'transform' }}
    />
  );
};
```

---

### Parallax Background Elements (Optional)

```tsx
const ParallaxBackground = () => {
  const { scrollY } = useScroll();

  const shape1Y = useTransform(scrollY, [0, 1000], [0, 300]);
  const shape2Y = useTransform(scrollY, [0, 1000], [0, 500]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <motion.div
        style={{ y: shape1Y }}
        className="absolute top-[10%] right-[10%] w-64 h-64 rounded-full bg-accent-primary/5 blur-3xl"
      />
      <motion.div
        style={{ y: shape2Y }}
        className="absolute bottom-[20%] left-[5%] w-96 h-96 rounded-full bg-purple-500/5 blur-3xl"
      />
    </div>
  );
};
```

---

## Form Components

### Input Field
```css
.input-field {
  width: 100%;
  height: 40px;
  padding: 0 12px;
  font-size: 14px;
  color: var(--text-primary);
  background: var(--bg-surface);
  border: 1px solid var(--border-default);
  border-radius: 8px;
  transition: all 0.15s ease;
}

.input-field::placeholder {
  color: var(--text-placeholder);
}

.input-field:hover {
  border-color: var(--border-strong);
}

.input-field:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px var(--accent-softer);
}
```

### Select
```css
.select-field {
  width: 100%;
  height: 40px;
  padding: 0 36px 0 12px;
  font-size: 14px;
  color: var(--text-primary);
  background: var(--bg-surface);
  border: 1px solid var(--border-default);
  border-radius: 8px;
  appearance: none;
  background-image: url("data:image/svg+xml,..."); /* Chevron icon */
  background-repeat: no-repeat;
  background-position: right 12px center;
  cursor: pointer;
  transition: all 0.15s ease;
}

.select-field:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px var(--accent-softer);
}
```

### Toggle Switch
```tsx
const Toggle = ({ checked, onChange }) => {
  return (
    <button
      className={`toggle ${checked ? 'checked' : ''}`}
      onClick={() => onChange(!checked)}
    >
      <motion.div
        className="toggle-thumb"
        animate={{ x: checked ? 16 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </button>
  );
};
```

```css
.toggle {
  width: 40px;
  height: 24px;
  padding: 2px;
  background: var(--bg-muted);
  border: 1px solid var(--border-default);
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.15s ease;
}

.toggle.checked {
  background: var(--accent-primary);
  border-color: var(--accent-primary);
}

.toggle-thumb {
  width: 18px;
  height: 18px;
  background: white;
  border-radius: 50%;
  box-shadow: var(--shadow-sm);
}
```

---

## Animation Timing Reference

| Animation Type | Spring Config | Use Case |
|----------------|---------------|----------|
| Card hover | gentle (stiffness: 150) | Subtle lift effect |
| Nav indicator | stiff (stiffness: 500) | Snappy selection |
| Panel slide | snappy (stiffness: 300) | Side panel open/close |
| Modal entrance | bouncy (stiffness: 400) | Command palette |
| Grid stagger | snappy + 0.05s delay | Card grid entrance |
| Cursor lerp | damping: 0.15 | Custom cursor |

---

## Keyboard Navigation

```typescript
// Command Palette keyboard handling
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    // Open command palette
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setIsOpen(true);
    }

    // Close on Escape
    if (e.key === 'Escape') {
      setIsOpen(false);
    }

    // Navigate results
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, results.length - 1));
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    }

    // Select result
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSelect(results[selectedIndex]);
    }
  };

  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}, [selectedIndex, results]);
```

---

## Required npm Packages

```bash
npm install motion
npm install @radix-ui/react-dialog     # For command palette
npm install @radix-ui/react-dropdown-menu  # For menus
npm install clsx tailwind-merge        # For conditional classes
npm install lucide-react               # For icons
```

Install the current releases. The versions this spec was checked against are in the stack table in the skill's SKILL.md.

---

## Sample Data Structure

```typescript
// Documents
const documents = [
  {
    id: '1',
    title: 'Q4 Product Roadmap',
    description: 'Strategic planning document for Q4 initiatives and feature releases.',
    icon: DocumentIcon,
    cover: '#6366F1',
    style: 'Minimal',
    updatedAt: '2h ago',
    createdAt: 'Oct 15, 2024',
    owner: 'Sarah Chen',
    tags: ['Product', 'Strategy'],
    size: 'wide',
  },
  {
    id: '2',
    title: 'Brand Guidelines',
    description: 'Complete brand identity system including logos, colors, and typography.',
    icon: PaletteIcon,
    cover: '#10B981',
    style: 'Editorial',
    updatedAt: '1d ago',
    createdAt: 'Sep 28, 2024',
    owner: 'Mike Johnson',
    tags: ['Design', 'Brand'],
    size: 'default',
  },
  // ... more documents
];

// Navigation
const navigation = [
  {
    title: 'Overview',
    items: [
      { id: 'home', icon: HomeIcon, label: 'Home' },
      { id: 'inbox', icon: InboxIcon, label: 'Inbox', badge: 3 },
      { id: 'calendar', icon: CalendarIcon, label: 'Calendar' },
      { id: 'tasks', icon: TasksIcon, label: 'Tasks' },
    ],
  },
  {
    title: 'Workspaces',
    items: [
      { id: 'product', icon: FolderIcon, label: 'Product', color: '#6366F1' },
      { id: 'marketing', icon: FolderIcon, label: 'Marketing', color: '#10B981' },
      { id: 'engineering', icon: FolderIcon, label: 'Engineering', color: '#F59E0B' },
    ],
  },
];

// Command palette results
const commandResults = [
  { id: '1', icon: DocumentIcon, label: 'New Document', shortcut: '⌘N' },
  { id: '2', icon: FolderIcon, label: 'New Workspace', shortcut: '⌘⇧N' },
  { id: '3', icon: SearchIcon, label: 'Search Documents', shortcut: '⌘F' },
  { id: '4', icon: SettingsIcon, label: 'Settings', shortcut: '⌘,' },
  // ... more commands
];
```

---

## Final Notes

This specification prioritizes **clarity, precision, and polish**. The dashboard should feel like a premium control center where every interaction is intentional and satisfying.

Key principles:
1. **Generous spacing** - Never let elements feel cramped
2. **Subtle shadows** - Layered shadows create natural depth
3. **Physics-based motion** - Spring animations feel natural
4. **Clear hierarchy** - Information should be scannable
5. **Micro-interactions** - Small details (hover states, indicators) create polish

Generate the complete dashboard following these specifications exactly. Do not improvise or add elements not specified here.
