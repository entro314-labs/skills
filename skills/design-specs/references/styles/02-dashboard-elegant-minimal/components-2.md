# Elegant Minimal Dashboard: Components (2 of 2)

Part of the [Elegant Minimal Dashboard specification](index.md).

## Component Specifications (continued)

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
