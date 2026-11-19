# Developer-First Dark Dashboard: Motion

Part of the [Developer-First Dark Dashboard specification](index.md).

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
