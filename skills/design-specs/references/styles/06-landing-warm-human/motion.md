# Warm Human Landing Page: Motion

Part of the [Warm Human Landing Page specification](index.md).

## Animation System

### Scroll-based Reveals
```typescript
// Intersection Observer Configuration
const observerOptions = {
  root: null,
  rootMargin: '-10%',  // Earlier trigger than aggressive SaaS
  threshold: 0,
};

// Motion Scroll Reveal Variants
const scrollReveal = {
  hidden: {
    opacity: 0,
    y: 20,  // Subtle, not dramatic
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],  // Smooth, non-aggressive
    },
  },
};

// Staggered Children
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,  // Slower than aggressive SaaS (0.1)
      delayChildren: 0.1,
    },
  },
};

// Image Reveal (Scale)
const imageReveal = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};
```

### Hover Animations
```typescript
// Card Hover
const cardHover = {
  rest: {
    y: 0,
    boxShadow: '0 2px 8px rgba(43, 43, 43, 0.06)',
  },
  hover: {
    y: -4,
    boxShadow: '0 8px 32px rgba(43, 43, 43, 0.10)',
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

// Button Hover
const buttonHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  tap: { scale: 0.98 },
};

// Image Hover (Subtle Zoom)
const imageHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

// Link Underline
const linkUnderline = {
  rest: { width: 0 },
  hover: {
    width: '100%',
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};
```

### Continuous Ambient Motion
```typescript
// Floating Circle Animation
const floatingAnimation = {
  x: [0, 20, 0],
  y: [0, -15, 0],
  transition: {
    duration: 6,  // Slow, calming
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

// Gentle Pulse (for accent elements)
const pulseAnimation = {
  scale: [1, 1.03, 1],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

// Background Gradient Shift
const gradientShift = {
  background: [
    'linear-gradient(135deg, #FFB89A 0%, #B4A7D6 100%)',
    'linear-gradient(135deg, #B4A7D6 0%, #FFB89A 100%)',
    'linear-gradient(135deg, #FFB89A 0%, #B4A7D6 100%)',
  ],
  transition: {
    duration: 20,
    repeat: Infinity,
    ease: 'linear',
  },
};
```

### Spring Physics (Soft)
```typescript
// Soft spring for gentle interactions
const softSpring = {
  type: 'spring',
  stiffness: 100,  // Lower than aggressive SaaS (300)
  damping: 20,     // Higher damping for smoother motion
  mass: 1,
};

// For toggle switches
const toggleSpring = {
  type: 'spring',
  stiffness: 500,
  damping: 30,
};
```

---

## Smooth Scroll Implementation

### Lenis Configuration (Calm)
```typescript
import Lenis from 'lenis';

const lenis = new Lenis({
  lerp: 0.1,        // Smoother than default (0.1 vs 0.15)
  duration: 1.2,    // Slightly longer scroll duration
  smoothWheel: true,
  wheelMultiplier: 0.8,  // Slower scroll speed
  touchMultiplier: 1.5,
  infinite: false,
});

// Animation loop
function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// NO velocity blur - keep it calm
// Do NOT implement scroll velocity effects
```

### Parallax Setup
```typescript
import { useScroll, useTransform } from 'motion/react';

// Hero Background Parallax
const HeroParallax = () => {
  const { scrollY } = useScroll();

  // Background at 0.5x speed
  const bgY = useTransform(scrollY, [0, 1000], [0, 500]);

  // Paper texture at 0.3x speed
  const textureY = useTransform(scrollY, [0, 1000], [0, 300]);

  // Floating circles at 0.7x speed
  const circleY = useTransform(scrollY, [0, 1000], [0, 700]);

  return (
    <div className="relative">
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-hero-image"
      />
      <motion.div
        style={{ y: textureY }}
        className="absolute inset-0 bg-paper-texture opacity-[0.03]"
      />
      <motion.div
        style={{ y: circleY }}
        className="absolute"
      >
        <FloatingCircle />
      </motion.div>
    </div>
  );
};
```

---

## Custom Cursor (Optional)

```tsx
const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    const damping = 0.2;  // Gentler than aggressive (0.15)

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      cursorX += (mouseX - cursorX) * damping;
      cursorY += (mouseY - cursorY) * damping;

      cursor.style.transform = `translate(${cursorX - 15}px, ${cursorY - 15}px)`;
      requestAnimationFrame(animate);
    };

    // Detect hoverable elements
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const hoverables = document.querySelectorAll('a, button, [data-cursor-hover]');
    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      hoverables.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`
        fixed top-0 left-0 pointer-events-none z-9999
        w-[30px] h-[30px] rounded-full
        bg-coral-500/30
        transition-[width,height] duration-200
        ${isHovering ? 'w-[40px] h-[40px]' : ''}
      `}
      style={{ willChange: 'transform' }}
    />
  );
};
```

---

## Animation Timing Reference

| Animation Type | Duration | Easing |
|----------------|----------|--------|
| Hover states | 0.3s | ease-out |
| Scroll reveals | 0.8s | cubic-bezier(0.25, 0.46, 0.45, 0.94) |
| Page transitions | 0.6s | ease-in-out |
| Floating motion | 4-6s loops | ease-in-out |
| Background shifts | 20s loops | linear |
| Stagger delay | 0.15s | - |
| Spring stiffness | 100 | - |
| Spring damping | 20 | - |
| Cursor lerp | 0.2 | - |
