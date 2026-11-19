# Developer-First Dark Dashboard: Components (1 of 3)

Part of the [Developer-First Dark Dashboard specification](index.md).

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
