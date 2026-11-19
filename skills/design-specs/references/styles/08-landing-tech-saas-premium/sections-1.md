# Tech SaaS Premium Landing Page: Page Sections (1 of 2)

Part of the [Tech SaaS Premium Landing Page specification](index.md).

## Section 1: Header (Sticky Navigation)

### Layout
```css
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 100;
  background: transparent;
  transition: background 0.3s ease, backdrop-filter 0.3s ease;
}
.header.scrolled {
  background: rgba(10, 10, 11, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-subtle);
}
```

### Contents (left to right)
1. **Logo**: 32px height, SVG wordmark, color: var(--text-primary)
2. **Navigation links**:
   - Gap: 32px between items
   - Font: 14px, font-weight: 500
   - Color: var(--text-secondary), hover: var(--text-primary)
   - Underline animation on hover (width 0 → 100%, height 1px)
3. **Right side**:
   - "Sign in" link: same style as nav
   - Primary CTA button: "Get Started" or "Start Free"

### Header Animation (Motion)
```jsx
<motion.header
  initial={{ y: -100, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ type: "spring", stiffness: 200, damping: 30 }}
/>
```

---

## Section 2: Hero Section

### Layout Grid
```css
.hero {
  min-height: 100vh;
  padding: 120px 48px 80px;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 64px;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
}
```

### Left Column (Copy)
1. **Eyebrow badge** (optional):
   ```css
   .hero-badge {
     display: inline-flex;
     align-items: center;
     gap: 8px;
     padding: 6px 12px;
     background: var(--accent-soft);
     border: 1px solid var(--accent);
     border-radius: 100px;
     font-size: 13px;
     font-weight: 500;
     color: var(--accent);
     margin-bottom: 24px;
   }
   ```

2. **Headline**:
   - Font: `text-display-xl`
   - Max-width: 600px
   - Gradient text on key word(s)
   - Example: "Build [products] that scale"

3. **Subheadline**:
   - Font: `text-body-lg`
   - Color: var(--text-secondary)
   - Max-width: 480px
   - Margin-top: 24px
   - 1-2 sentences, dev/infra tone

4. **CTA Group**:
   - Margin-top: 40px
   - Primary button + Secondary button (ghost style)
   - Gap: 16px between buttons

5. **Social proof micro** (optional):
   - Margin-top: 48px
   - "Used by teams at" + 4-5 small logos (grayscale, 20px height)

### Right Column (Visual)
Layered product mockup showing your dashboard/product UI.

```css
.hero-visual-wrapper {
  position: relative;
  perspective: 1000px;
}
.hero-visual-primary {
  position: relative;
  transform: rotateX(-10deg) rotateY(-5deg);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--border-subtle);
  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.05);
}
/* Secondary floating elements */
.hero-visual-secondary {
  position: absolute;
  top: -40px;
  right: -60px;
  width: 280px;
  transform: rotateX(-5deg) rotateY(-10deg);
  border-radius: 12px;
  border: 1px solid var(--border-subtle);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}
.hero-visual-tertiary {
  position: absolute;
  bottom: -30px;
  left: -40px;
  width: 240px;
  transform: rotateX(-5deg) rotateY(5deg);
}
```

### Hero Background Effects

**Gradient orbs (CSS):**
```css
.hero::before {
  content: '';
  position: absolute;
  top: 20%;
  left: 10%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
  filter: blur(80px);
  pointer-events: none;
}
.hero::after {
  content: '';
  position: absolute;
  top: 40%;
  right: 20%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%);
  filter: blur(80px);
  pointer-events: none;
}
```

**Canvas particle system:**
```jsx
// particles.tsx
'use client';
import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    const particleCount = 80;
    for (let i = 0; i < particleCount; i++) {
      particles.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    // Track mouse
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 11, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach((p) => {
        // Mouse attraction
        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          const force = (200 - dist) / 200;
          p.vx += (dx / dist) * force * 0.02;
          p.vy += (dy / dist) * force * 0.02;
        }

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Damping
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      });

      // Draw connections
      particles.current.forEach((p1, i) => {
        particles.current.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - dist / 100)})`;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
```

### Hero Animations (Motion)
```jsx
// Staggered entrance
const heroVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 25
    }
  }
};

// Visual entrance
const visualVariants = {
  hidden: { opacity: 0, y: 60, rotateX: 25 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: -10,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      delay: 0.4
    }
  }
};
```

---

## Section 3: Logo Wall (Social Proof)

### Layout
```css
.logo-wall {
  padding: 64px 48px;
  border-top: 1px solid var(--border-subtle);
  border-bottom: 1px solid var(--border-subtle);
}
.logo-wall-inner {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}
.logo-wall-label {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-muted);
  letter-spacing: 0.05em;
  margin-bottom: 32px;
}
.logo-wall-grid {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 48px;
  flex-wrap: wrap;
}
.logo-wall-item {
  opacity: 0.5;
  filter: grayscale(100%);
  transition: opacity 0.3s ease, filter 0.3s ease;
}
.logo-wall-item:hover {
  opacity: 1;
  filter: grayscale(0%);
}
.logo-wall-item img {
  height: 28px;
  width: auto;
}
```

### Animation
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-10%" }}
  transition={{ duration: 0.6 }}
/>
```

---

## Section 4: Features Bento Grid

### Layout (Asymmetric Grid)
```css
.features-section {
  padding: 120px 48px;
  max-width: 1400px;
  margin: 0 auto;
}
.features-header {
  text-align: center;
  margin-bottom: 64px;
}
.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto;
  gap: 24px;
}

/* Card sizes - create visual interest */
.feature-card:nth-child(1) { grid-column: span 2; } /* Wide */
.feature-card:nth-child(2) { grid-column: span 1; } /* Normal */
.feature-card:nth-child(3) { grid-column: span 1; } /* Normal */
.feature-card:nth-child(4) { grid-column: span 2; } /* Wide */
/* Or use explicit grid-area for more control */
```

### Feature Card Styles
```css
.feature-card {
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: 16px;
  padding: 32px;
  position: relative;
  overflow: hidden;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}
.feature-card:hover {
  border-color: var(--border-default);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

/* Card with visual */
.feature-card-visual {
  padding-bottom: 0;
}
.feature-card-visual .feature-visual {
  margin: 32px -32px -32px;
  height: 200px;
  background: var(--bg-surface);
  border-top: 1px solid var(--border-subtle);
}

/* Card with glow effect */
.feature-card-glow::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
}
```

### Feature Card Contents
1. **Icon** (top): 40px, stroke-based SVG, color: var(--accent)
2. **Title**: 20px, font-weight: 600, margin-top: 20px
3. **Description**: 15px, color: var(--text-secondary), margin-top: 12px, line-height: 1.6
4. **Visual** (optional): Code snippet, mini-chart, or UI preview

### Feature Card Animation
```jsx
<motion.div
  className="feature-card"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-10%" }}
  transition={{
    type: "spring",
    stiffness: 150,
    damping: 20,
    delay: index * 0.1
  }}
  whileHover={{ y: -8 }}
/>
```

---

## Section 5: Product Demo (Interactive Dashboard)

### Layout
```css
.demo-section {
  padding: 120px 48px;
  background: var(--bg-elevated);
  position: relative;
  overflow: hidden;
}
.demo-container {
  max-width: 1200px;
  margin: 0 auto;
}
.demo-header {
  text-align: center;
  margin-bottom: 64px;
}
```

### Dashboard Mockup
```css
.dashboard-mockup {
  position: relative;
  perspective: 2000px;
  max-width: 1000px;
  margin: 0 auto;
}
.dashboard-frame {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: 16px;
  overflow: hidden;
  transform: rotateX(10deg);
  box-shadow:
    0 50px 100px -20px rgba(0, 0, 0, 0.5),
    0 30px 60px -30px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.05);
}

/* Dashboard chrome */
.dashboard-topbar {
  height: 40px;
  background: var(--bg-elevated);
  border-bottom: 1px solid var(--border-subtle);
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 8px;
}
.dashboard-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--border-default);
}
.dashboard-dot.red { background: #EF4444; }
.dashboard-dot.yellow { background: #F59E0B; }
.dashboard-dot.green { background: #10B981; }

/* Dashboard content */
.dashboard-content {
  display: grid;
  grid-template-columns: 200px 1fr 280px;
  height: 500px;
}
.dashboard-sidebar {
  background: var(--bg-base);
  border-right: 1px solid var(--border-subtle);
  padding: 16px;
}
.dashboard-main {
  padding: 24px;
}
.dashboard-panel {
  background: var(--bg-elevated);
  border-left: 1px solid var(--border-subtle);
  padding: 16px;
}
```

### Animated Elements Inside Dashboard
```css
/* Line chart drawing animation */
.chart-line {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: drawLine 2s ease-out forwards;
}
@keyframes drawLine {
  to { stroke-dashoffset: 0; }
}

/* Metrics counting up */
.metric-value {
  font-family: var(--font-mono);
  font-size: 32px;
  font-weight: 600;
}

/* Blinking cursor in code block */
.cursor-blink {
  animation: blink 1s step-end infinite;
}
@keyframes blink {
  50% { opacity: 0; }
}

/* Live indicator pulse */
.live-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--success);
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.2); }
}
```

### Demo Section Animation
```jsx
// Entrance on scroll
<motion.div
  initial={{ opacity: 0, y: 100, rotateX: 25 }}
  whileInView={{ opacity: 1, y: 0, rotateX: 10 }}
  viewport={{ once: true, margin: "-20%" }}
  transition={{ type: "spring", stiffness: 50, damping: 20 }}
/>
```
