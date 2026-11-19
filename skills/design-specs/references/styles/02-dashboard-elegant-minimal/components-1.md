# Elegant Minimal Dashboard: Components (1 of 2)

Part of the [Elegant Minimal Dashboard specification](index.md).

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
