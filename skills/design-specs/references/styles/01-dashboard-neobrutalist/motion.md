# Neobrutalist Dashboard: Motion

Part of the [Neobrutalist Dashboard specification](index.md).

## Animation Specifications

### General Principles
- Use Motion with `type: "tween"` - NO springs (too soft for brutalist)
- Durations: 0.1s for hovers, 0.15s for state changes, 0.2s max for reveals
- Easing: "easeOut" or "linear" - avoid bouncy curves
- Prefer instant state changes where possible

### Hover Animations (Motion)
```jsx
// Card/Button hover
<motion.div
  whileHover={{
    x: -3,
    y: -3,
    boxShadow: "9px 9px 0 #1A1A1A"
  }}
  whileTap={{
    x: 2,
    y: 2,
    boxShadow: "2px 2px 0 #1A1A1A"
  }}
  transition={{ type: "tween", duration: 0.1, ease: "easeOut" }}
/>
```

### Page/Section Transitions
```jsx
// Instant cuts preferred, or very fast slides
const pageTransition = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { type: "tween", duration: 0.15, ease: "easeOut" }
};
```

### List Stagger (for tables, activity feeds)
```jsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03, // Very fast stagger
      delayChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "tween", duration: 0.1 }
  }
};
```

### Loading States
- Use rectangular progress bars, NOT spinners
- Skeleton loaders with solid color blocks (no shimmer gradient)
- Progress bar: 8px height, border: 2px solid black, fill with accent color

```css
.progress-bar {
  height: 8px;
  background: var(--bg-secondary);
  border: 2px solid var(--border);
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: var(--accent-acid);
  transition: width 0.2s linear;
}
```

### Modal Animation
```jsx
// Overlay
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.1 }}
/>

// Modal content - hard scale, no spring
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.95 }}
  transition={{ type: "tween", duration: 0.15, ease: "easeOut" }}
/>
```
