# Developer-First Dark Dashboard: Components (3 of 3)

Part of the [Developer-First Dark Dashboard specification](index.md).

## Component Specifications (continued)

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
