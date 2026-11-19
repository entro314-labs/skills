# Warm Human Dashboard: Motion

Part of the [Warm Human Dashboard specification](index.md).

## Animation System

### Spring Configurations (Gentle)
```typescript
// Warm, nurturing animations
const warmSpring = {
  type: 'spring',
  stiffness: 100,
  damping: 15,
  mass: 1,
};

// Card hover (gentle lift)
const cardHoverSpring = {
  type: 'spring',
  stiffness: 300,
  damping: 25,
};

// Achievement unlock (bouncy)
const achievementSpring = {
  type: 'spring',
  stiffness: 400,
  damping: 15,
};

// Number counter
const countUpConfig = {
  duration: 1.5,
  ease: [0.25, 0.46, 0.45, 0.94],
};
```

### Entrance Animations
```typescript
// Staggered cards
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: warmSpring,
  },
};

// Page transition
const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.4, ease: 'easeInOut' },
};
```

### Celebration Animation
```typescript
// Confetti burst on achievement
const celebrationVariants = {
  initial: { scale: 0, rotate: 0 },
  animate: {
    scale: [0, 1.2, 1],
    rotate: [0, -10, 10, 0],
    transition: {
      duration: 0.6,
      times: [0, 0.6, 1],
      ease: 'easeOut',
    },
  },
};

// Sparkle effect
const sparkleVariants = {
  animate: {
    scale: [0.5, 1, 0.5],
    opacity: [0, 1, 0],
    transition: {
      duration: 1,
      repeat: 2,
      ease: 'easeInOut',
    },
  },
};
```

---

## Animation Timing Reference

| Animation Type | Duration | Easing |
|----------------|----------|--------|
| Card hover | 0.3s | ease |
| Page transition | 0.4s | ease-in-out |
| Number count-up | 1.5s | ease-out |
| Progress fill | 1s | ease-out |
| Achievement unlock | 0.6s | spring (400/15) |
| Stagger delay | 0.1s | - |
| Float animation | 6s loop | ease-in-out |
| Spring stiffness | 100-400 | - |
