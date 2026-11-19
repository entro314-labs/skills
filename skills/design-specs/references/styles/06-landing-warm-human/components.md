# Warm Human Landing Page: Components

Part of the [Warm Human Landing Page specification](index.md).

## Form Components

### Input Field
```css
.input-field {
  width: 100%;
  height: 56px;
  padding: 0 20px;
  font-family: var(--font-sans);
  font-size: 16px;
  color: var(--text-primary);
  background: white;
  border: 2px solid var(--border-light);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.input-field::placeholder {
  color: var(--text-tertiary);
}

.input-field:hover {
  border-color: var(--border-subtle);
}

.input-field:focus {
  outline: none;
  border-color: var(--accent-coral);
  box-shadow: 0 0 0 4px rgba(255, 127, 110, 0.1);
}

/* With Floating Label */
.input-wrapper {
  position: relative;
}

.input-label {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: var(--text-tertiary);
  pointer-events: none;
  transition: all 0.2s ease;
}

.input-field:focus + .input-label,
.input-field:not(:placeholder-shown) + .input-label {
  top: 8px;
  transform: translateY(0);
  font-size: 12px;
  color: var(--accent-coral);
}
```

### Textarea
```css
.textarea-field {
  width: 100%;
  min-height: 140px;
  padding: 16px 20px;
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-primary);
  background: white;
  border: 2px solid var(--border-light);
  border-radius: 12px;
  resize: vertical;
  transition: all 0.3s ease;
}

.textarea-field:focus {
  outline: none;
  border-color: var(--accent-coral);
  box-shadow: 0 0 0 4px rgba(255, 127, 110, 0.1);
}
```

### Checkbox
```css
.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.checkbox {
  appearance: none;
  width: 22px;
  height: 22px;
  border: 2px solid var(--border-light);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.checkbox:checked {
  background: var(--accent-coral);
  border-color: var(--accent-coral);
}

.checkbox:checked::after {
  content: '';
  position: absolute;
  left: 6px;
  top: 2px;
  width: 6px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox:focus {
  box-shadow: 0 0 0 4px rgba(255, 127, 110, 0.2);
}
```
