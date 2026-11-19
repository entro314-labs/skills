# Retro-Futurist Landing Page: Motion

Part of the [Retro-Futurist Landing Page specification](index.md).

## Motion & Animation System

Animation is CENTRAL to Retro-Futurism. Orbits, pulses, and scan lines create the space-age feel.

### Animation Configuration

```typescript
// lib/motion.ts
import { Variants, Transition } from 'motion/react';

// Base transitions
export const retroTransition: Transition = {
  duration: 0.6,
  ease: [0.34, 1.56, 0.64, 1], // Slight overshoot for playful feel
};

export const smoothTransition: Transition = {
  duration: 0.8,
  ease: [0.25, 0.1, 0.25, 1],
};

// Orbit animation (continuous)
export const orbitAnimation = (duration: number = 20, radius: number = 200) => ({
  animate: {
    rotate: 360,
  },
  transition: {
    duration,
    repeat: Infinity,
    ease: 'linear',
  },
  style: {
    transformOrigin: `center ${radius}px`,
  },
});

// Pulse glow animation
export const pulseGlow: Variants = {
  animate: {
    boxShadow: [
      '0 0 20px rgba(247, 127, 0, 0.5)',
      '0 0 40px rgba(247, 127, 0, 0.8), 0 0 60px rgba(0, 180, 216, 0.3)',
      '0 0 20px rgba(247, 127, 0, 0.5)',
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Scan line effect
export const scanLine: Variants = {
  animate: {
    y: ['-100%', '100%'],
    opacity: [0, 1, 1, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'linear',
      times: [0, 0.1, 0.9, 1],
    },
  },
};

// Entrance animation with retro flair
export const retroEntrance: Variants = {
  initial: {
    opacity: 0,
    scale: 0.8,
    rotate: -5,
  },
  animate: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: retroTransition,
  },
};

// Stagger container
export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Fade up with scale
export const fadeUpScale: Variants = {
  initial: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: smoothTransition,
  },
};

// Typewriter effect
export const typewriter = (text: string, speed: number = 100) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text]);

  return displayText;
};
```

### CSS Animations

```css
/* Orbit animation */
@keyframes orbit {
  from {
    transform: rotate(0deg) translateX(var(--orbit-radius, 100px)) rotate(0deg);
  }
  to {
    transform: rotate(360deg) translateX(var(--orbit-radius, 100px)) rotate(-360deg);
  }
}

.orbit {
  animation: orbit var(--orbit-duration, 20s) linear infinite;
}

/* Reverse orbit */
.orbit-reverse {
  animation: orbit var(--orbit-duration, 15s) linear infinite reverse;
}

/* Pulse glow */
@keyframes pulse-glow {
  0%, 100% {
    box-shadow:
      0 0 20px rgba(247, 127, 0, 0.5),
      0 0 40px rgba(247, 127, 0, 0.2);
  }
  50% {
    box-shadow:
      0 0 40px rgba(247, 127, 0, 0.8),
      0 0 80px rgba(247, 127, 0, 0.4),
      0 0 120px rgba(0, 180, 216, 0.2);
  }
}

.pulse-glow {
  animation: pulse-glow 3s ease-in-out infinite;
}

/* Scan line */
@keyframes scan-line {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(100%);
    opacity: 0;
  }
}

.scan-line::after {
  content: '';
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00B4D8, transparent);
  box-shadow: 0 0 10px #00B4D8, 0 0 20px #00B4D8;
  animation: scan-line 4s ease-in-out infinite;
}

/* Blink effect for status lights */
@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

.blink {
  animation: blink 1s ease-in-out infinite;
}

/* Radar sweep */
@keyframes radar-sweep {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.radar-sweep {
  animation: radar-sweep 4s linear infinite;
  transform-origin: center;
}

/* Float animation */
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.float {
  animation: float 6s ease-in-out infinite;
}
```

### Scroll Behavior

```typescript
// lib/scroll.ts
'use client';

import Lenis from 'lenis';

export function initSmoothScroll() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  return lenis;
}
```
