# Playful Geometric Landing Page: Motion

Part of the [Playful Geometric Landing Page specification](index.md).

## Animation System

### Core Animation Values

```typescript
// src/lib/animations.ts
import { Variants, Transition } from 'motion/react';

// Playful spring - bouncy
export const playfulSpring: Transition = {
  type: 'spring',
  stiffness: 200,
  damping: 15,
};

// Extra bouncy spring
export const bouncySpring: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 10,
};

// Gentle spring
export const gentleSpring: Transition = {
  type: 'spring',
  stiffness: 150,
  damping: 20,
};

// Quick tween
export const quickTween: Transition = {
  type: 'tween',
  duration: 0.3,
  ease: 'easeOut',
};

// Fade in with bounce
export const fadeInBounce: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15,
    },
  },
};

// Pop in
export const popIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 15,
    },
  },
};

// Stagger container
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Stagger item with bounce
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15,
    },
  },
};

// Wiggle animation for shapes
export const wiggle: Variants = {
  initial: { rotate: 0 },
  animate: {
    rotate: [-3, 3, -3],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Hover lift
export const hoverLift = {
  y: -10,
  scale: 1.05,
  transition: playfulSpring,
};

// Hover rotate
export const hoverRotate = {
  rotate: 5,
  scale: 1.1,
  transition: playfulSpring,
};

// Tap squish
export const tapSquish = {
  scale: 0.95,
  transition: { duration: 0.1 },
};
```

### Scroll-Triggered Animation Component

```tsx
// src/components/AnimateInView.tsx
'use client';

import { motion, useInView } from 'motion/react';
import { useRef, ReactNode } from 'react';
import { fadeInBounce, popIn, playfulSpring } from '@/lib/animations';

interface AnimateInViewProps {
  children: ReactNode;
  variant?: 'bounce' | 'pop' | 'slide';
  delay?: number;
  className?: string;
}

export function AnimateInView({
  children,
  variant = 'bounce',
  delay = 0,
  className = '',
}: AnimateInViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  const variants = variant === 'pop' ? popIn : fadeInBounce;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```
