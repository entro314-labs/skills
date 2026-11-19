# Editorial/Magazine Landing Page: Motion

Part of the [Editorial/Magazine Landing Page specification](index.md).

## Animation System

### Minimal - Typography Does the Work

Editorial design relies on typography, not animation. Use restraint.

```typescript
// Motion Configuration
// ONLY for image reveals - NO text animation

// Simple image fade + scale on scroll into view
const imageReveal = {
  initial: { opacity: 0, scale: 1.03 },
  whileInView: { opacity: 1, scale: 1 },
  transition: {
    duration: 0.8,
    ease: [0.25, 0.1, 0.25, 1], // Smooth cubic-bezier
  },
  viewport: { once: true, margin: '-100px' },
};

// Subtle fade for sections
const sectionFade = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  transition: { duration: 0.6 },
  viewport: { once: true },
};

// NO stagger animations
// NO spring physics
// NO animated typography
// NO parallax (except subtle on hero image)
```

### Hover States

```css
/* Links - Underline style */
.editorial-link {
  color: var(--text-primary);
  text-decoration: none;
  background-image: linear-gradient(var(--editorial-red), var(--editorial-red));
  background-size: 0% 2px;
  background-position: 0% 100%;
  background-repeat: no-repeat;
  transition: background-size 0.3s ease;
}

.editorial-link:hover {
  background-size: 100% 2px;
}

/* Image grayscale to color */
.editorial-image-hover {
  filter: grayscale(100%);
  transition: filter 0.4s ease;
}

.editorial-image-hover:hover {
  filter: grayscale(0%);
}

/* Minimal card lift - subtle */
.editorial-card {
  transition: transform 0.3s ease;
}

.editorial-card:hover {
  transform: translateY(-4px);
}
```
