# Elegant Minimal Dashboard: Motion

Part of the [Elegant Minimal Dashboard specification](index.md).

## Animation System

### Spring Physics Configurations
```typescript
// Motion Spring Configs
const springs = {
  // Gentle - for subtle movements
  gentle: {
    type: "spring",
    stiffness: 150,
    damping: 20,
    mass: 1,
  },

  // Snappy - for UI interactions
  snappy: {
    type: "spring",
    stiffness: 300,
    damping: 30,
    mass: 1,
  },

  // Bouncy - for playful interactions
  bouncy: {
    type: "spring",
    stiffness: 400,
    damping: 25,
    mass: 0.8,
  },

  // Stiff - for fast, precise movements
  stiff: {
    type: "spring",
    stiffness: 500,
    damping: 35,
    mass: 1,
  },
};
```

### Card Hover Animation
```typescript
const cardHover = {
  rest: {
    y: 0,
    scale: 1,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
  },
  hover: {
    y: -4,
    scale: 1.02,
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.08), 0 16px 32px rgba(0, 0, 0, 0.06)',
    transition: springs.gentle,
  },
};
```

### Staggered Grid Entrance
```typescript
const gridContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const gridItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springs.snappy,
  },
};
```

### Panel Slide Animation
```typescript
const panelSlide = {
  initial: { x: 320, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 320, opacity: 0 },
  transition: springs.snappy,
};
```

### Modal Scale Animation
```typescript
const modalAnimation = {
  initial: { opacity: 0, scale: 0.95, y: -20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: -20 },
  transition: springs.bouncy,
};
```

### layoutId for Shared Animations
```typescript
// Sidebar indicator that slides to selected item
<motion.div
  layoutId="sidebar-indicator"
  className="absolute inset-0 bg-accent-soft rounded-lg"
  transition={springs.stiff}
/>

// Command palette result indicator
<motion.div
  layoutId="command-indicator"
  className="absolute inset-0 bg-accent-soft rounded-lg"
  transition={springs.stiff}
/>
```

---

### Custom Cursor Follower (Optional)

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
    const damping = 0.15;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      cursorX += (mouseX - cursorX) * damping;
      cursorY += (mouseY - cursorY) * damping;

      cursor.style.transform = `translate(${cursorX - 6}px, ${cursorY - 6}px)`;
      requestAnimationFrame(animate);
    };

    const hoverables = document.querySelectorAll('a, button, [data-cursor-hover]');
    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', () => setIsHovering(true));
      el.addEventListener('mouseleave', () => setIsHovering(false));
    });

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`
        fixed top-0 left-0 pointer-events-none z-9999
        rounded-full bg-accent-primary/20
        transition-[width,height] duration-150
        ${isHovering ? 'w-6 h-6' : 'w-3 h-3'}
      `}
      style={{ willChange: 'transform' }}
    />
  );
};
```

---

### Parallax Background Elements (Optional)

```tsx
const ParallaxBackground = () => {
  const { scrollY } = useScroll();

  const shape1Y = useTransform(scrollY, [0, 1000], [0, 300]);
  const shape2Y = useTransform(scrollY, [0, 1000], [0, 500]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <motion.div
        style={{ y: shape1Y }}
        className="absolute top-[10%] right-[10%] w-64 h-64 rounded-full bg-accent-primary/5 blur-3xl"
      />
      <motion.div
        style={{ y: shape2Y }}
        className="absolute bottom-[20%] left-[5%] w-96 h-96 rounded-full bg-purple-500/5 blur-3xl"
      />
    </div>
  );
};
```

---

## Animation Timing Reference

| Animation Type | Spring Config | Use Case |
|----------------|---------------|----------|
| Card hover | gentle (stiffness: 150) | Subtle lift effect |
| Nav indicator | stiff (stiffness: 500) | Snappy selection |
| Panel slide | snappy (stiffness: 300) | Side panel open/close |
| Modal entrance | bouncy (stiffness: 400) | Command palette |
| Grid stagger | snappy + 0.05s delay | Card grid entrance |
| Cursor lerp | damping: 0.15 | Custom cursor |
