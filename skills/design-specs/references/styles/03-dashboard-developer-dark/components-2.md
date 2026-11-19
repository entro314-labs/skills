# Developer-First Dark Dashboard: Components (2 of 3)

Part of the [Developer-First Dark Dashboard specification](index.md).

## Component Specifications (continued)

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
