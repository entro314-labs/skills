# Neobrutalist Landing Page: Motion

Part of the [Neobrutalist Landing Page specification](index.md).

## Animation System

### CRITICAL: NO SPRINGS - TWEEN ONLY

Neobrutalism demands snappy, intentional animations. NO elastic/bouncy movements.

```typescript
// Motion Configuration
// ONLY USE THESE TRANSITION TYPES:

// Snappy hover states
const hoverTransition = {
  type: 'tween',
  duration: 0.1,
  ease: 'easeOut',
};

// Quick entrance animations
const entranceTransition = {
  type: 'tween',
  duration: 0.15,
  ease: [0.25, 0.1, 0.25, 1], // cubic-bezier
};

// Instant state changes (FAQ open/close)
const instantTransition = {
  type: 'tween',
  duration: 0.1,
  ease: 'linear',
};

// Staggered children
const staggerContainer = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: entranceTransition,
  },
};
```

### Hover State Transforms

```css
/* Card hover - lift and increase shadow */
.neo-card {
  transition: transform 0.1s ease-out, box-shadow 0.1s ease-out;
}

.neo-card:hover {
  transform: translate(-4px, -4px);
  box-shadow: 10px 10px 0 #1A1A1A;
}

/* Button hover - subtle lift */
.neo-button {
  transition: transform 0.1s ease-out, box-shadow 0.1s ease-out;
}

.neo-button:hover {
  transform: translate(-2px, -2px);
  box-shadow: 8px 8px 0 #1A1A1A;
}

/* Button active - press down */
.neo-button:active {
  transform: translate(0, 0);
  box-shadow: 4px 4px 0 #1A1A1A;
}

/* Link hover - underline growth */
.neo-link {
  position: relative;
}

.neo-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 3px;
  background: currentColor;
  transition: width 0.1s ease-out;
}

.neo-link:hover::after {
  width: 100%;
}
```

### Scroll Behavior

```css
/* Native scroll - NO smooth scroll library */
html {
  scroll-behavior: auto; /* Intentionally NOT smooth */
}

/* Optional: Snappy scroll-snap for sections */
.snap-container {
  scroll-snap-type: y mandatory;
}

.snap-section {
  scroll-snap-align: start;
}
```
