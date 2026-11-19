# Tech SaaS Premium Landing Page - Complete Design Specification

You are a senior product designer and front-end engineer. Build a complete landing page in the premium tech SaaS style - a fusion of Linear, Supabase, and Clerk with meticulous attention to detail, sophisticated interactions, and data visualization.

**The product:** [Describe your product here]

---

## Technical Stack

```bash
npm install framer-motion gsap @studio-freight/lenis
```

- Next.js 14+ with App Router
- React 18+ with TypeScript
- Tailwind CSS for all styling
- Framer Motion for component animations
- GSAP + ScrollTrigger for scroll-based animations
- Lenis for smooth scrolling
- Canvas API for particle system

---

## Page Structure Overview

The page consists of exactly these sections in order:
1. **Header** (sticky navigation)
2. **Hero Section** (headline + product visual)
3. **Logo Wall** (social proof, subtle)
4. **Features Bento** (irregular grid of feature cards)
5. **Product Demo** (interactive dashboard mockup)
6. **How It Works** (3-step process with visual)
7. **Integrations** (logo grid with animations)
8. **Testimonials** (horizontal scroll)
9. **Pricing** (comparison table)
10. **CTA Section** (final call-to-action)
11. **Footer**

---

## Color System

```css
:root {
  /* Backgrounds */
  --bg-base: #0A0A0B;           /* Primary page background */
  --bg-elevated: #111113;        /* Card backgrounds */
  --bg-surface: #18181B;         /* Elevated surfaces */
  --bg-hover: #1F1F23;           /* Hover states */

  /* Text */
  --text-primary: #FAFAFA;       /* Primary text */
  --text-secondary: #A1A1A6;     /* Secondary text */
  --text-muted: #52525B;         /* Muted text */

  /* Borders */
  --border-subtle: rgba(255, 255, 255, 0.06);
  --border-default: rgba(255, 255, 255, 0.1);
  --border-strong: rgba(255, 255, 255, 0.15);

  /* Accent (choose one for your brand) */
  --accent: #10B981;             /* Emerald green */
  --accent-hover: #059669;
  --accent-soft: rgba(16, 185, 129, 0.1);
  --accent-glow: rgba(16, 185, 129, 0.2);

  /* Gradient */
  --gradient-start: #6366F1;     /* Indigo */
  --gradient-end: #10B981;       /* Emerald */

  /* Functional */
  --success: #10B981;
  --warning: #F59E0B;
  --error: #EF4444;
}
```

---

## Typography

### Font Stack
```css
--font-display: 'Inter', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### Type Scale
```css
/* Display */
.text-display-xl { font-size: clamp(56px, 8vw, 96px); line-height: 1.0; font-weight: 600; letter-spacing: -0.03em; }
.text-display { font-size: clamp(40px, 5vw, 64px); line-height: 1.1; font-weight: 600; letter-spacing: -0.02em; }

/* Headings */
.text-h1 { font-size: 48px; line-height: 1.15; font-weight: 600; letter-spacing: -0.02em; }
.text-h2 { font-size: 36px; line-height: 1.2; font-weight: 600; letter-spacing: -0.01em; }
.text-h3 { font-size: 24px; line-height: 1.3; font-weight: 600; }
.text-h4 { font-size: 18px; line-height: 1.4; font-weight: 600; }

/* Body */
.text-body-lg { font-size: 18px; line-height: 1.6; font-weight: 400; }
.text-body { font-size: 16px; line-height: 1.6; font-weight: 400; }
.text-body-sm { font-size: 14px; line-height: 1.5; font-weight: 400; }

/* Labels */
.text-label { font-size: 12px; line-height: 1.4; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; }
.text-caption { font-size: 13px; line-height: 1.4; font-weight: 500; color: var(--text-secondary); }

/* Monospace */
.text-mono { font-family: var(--font-mono); font-size: 14px; }
.text-mono-sm { font-family: var(--font-mono); font-size: 13px; }
```

### Gradient Text
```css
.gradient-text {
  background: linear-gradient(135deg, var(--text-primary) 0%, var(--text-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.gradient-text-accent {
  background: linear-gradient(135deg, var(--gradient-start) 0%, var(--gradient-end) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

---

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

### Header Animation (Framer Motion)
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

### Hero Animations (Framer Motion)
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

---

## Section 6: How It Works

### Layout (3-Step with Visual)
```css
.how-section {
  padding: 120px 48px;
  max-width: 1200px;
  margin: 0 auto;
}
.how-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}
.how-steps {
  display: flex;
  flex-direction: column;
  gap: 48px;
}
```

### Step Item
```css
.step-item {
  display: flex;
  gap: 24px;
}
.step-number {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--accent-soft);
  border: 1px solid var(--accent);
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  color: var(--accent);
}
.step-content {
  flex: 1;
}
.step-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
}
.step-description {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.6;
}
```

### Visual (Right Side)
Vertical flow diagram or code snippet showing the process.

```css
.how-visual {
  position: relative;
  padding: 40px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: 16px;
}
```

### SVG Connection Lines (GSAP ScrollTrigger)
```jsx
// Draw connection lines between steps as user scrolls
useEffect(() => {
  const path = document.querySelector('.connection-path');
  const pathLength = path.getTotalLength();

  path.style.strokeDasharray = pathLength;
  path.style.strokeDashoffset = pathLength;

  gsap.to(path, {
    strokeDashoffset: 0,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: '.how-section',
      start: 'top 60%',
      end: 'bottom 40%',
      scrub: 1,
    }
  });
}, []);
```

---

## Section 7: Integrations

### Layout
```css
.integrations-section {
  padding: 120px 48px;
  text-align: center;
}
.integrations-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 24px;
  max-width: 900px;
  margin: 64px auto 0;
}
```

### Integration Badge
```css
.integration-badge {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: 16px;
  padding: 24px;
  transition: all 0.3s ease;
}
.integration-badge:hover {
  border-color: var(--border-default);
  transform: translateY(-4px) rotate(-2deg);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}
.integration-badge img {
  width: 48px;
  height: 48px;
  object-fit: contain;
  filter: grayscale(100%);
  opacity: 0.7;
  transition: all 0.3s ease;
}
.integration-badge:hover img {
  filter: grayscale(0%);
  opacity: 1;
}
```

### Animation (Staggered reveal)
```jsx
const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      delay: i * 0.05,
    }
  })
};
```

---

## Section 8: Testimonials (Horizontal Scroll)

### Layout
```css
.testimonials-section {
  padding: 120px 0;
  overflow: hidden;
}
.testimonials-header {
  text-align: center;
  padding: 0 48px;
  margin-bottom: 64px;
}
.testimonials-track {
  display: flex;
  gap: 24px;
  padding: 0 48px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.testimonials-track::-webkit-scrollbar {
  display: none;
}
```

### Testimonial Card
```css
.testimonial-card {
  flex-shrink: 0;
  width: 400px;
  padding: 32px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: 16px;
  scroll-snap-align: start;
}
.testimonial-quote {
  font-size: 16px;
  line-height: 1.7;
  color: var(--text-primary);
  margin-bottom: 24px;
}
.testimonial-author {
  display: flex;
  align-items: center;
  gap: 16px;
}
.testimonial-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--bg-surface);
}
.testimonial-name {
  font-size: 15px;
  font-weight: 600;
}
.testimonial-role {
  font-size: 13px;
  color: var(--text-secondary);
}
```

### Auto-scroll animation (optional GSAP)
```jsx
useEffect(() => {
  const track = document.querySelector('.testimonials-track');
  const totalWidth = track.scrollWidth - track.clientWidth;

  gsap.to(track, {
    scrollLeft: totalWidth,
    duration: 30,
    ease: "none",
    repeat: -1,
  });
}, []);
```

---

## Section 9: Pricing (Comparison Table)

### Layout
```css
.pricing-section {
  padding: 120px 48px;
  max-width: 1200px;
  margin: 0 auto;
}
.pricing-header {
  text-align: center;
  margin-bottom: 64px;
}
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
```

### Pricing Card
```css
.pricing-card {
  padding: 40px 32px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: 16px;
  text-align: center;
}
.pricing-card.featured {
  border-color: var(--accent);
  position: relative;
}
.pricing-card.featured::before {
  content: 'Most Popular';
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  padding: 4px 16px;
  background: var(--accent);
  color: #000;
  font-size: 12px;
  font-weight: 600;
  border-radius: 100px;
}
.pricing-tier {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 8px;
}
.pricing-price {
  font-size: 48px;
  font-weight: 600;
  margin-bottom: 8px;
}
.pricing-price span {
  font-size: 16px;
  font-weight: 400;
  color: var(--text-secondary);
}
.pricing-description {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 32px;
}
.pricing-features {
  text-align: left;
  margin-bottom: 32px;
}
.pricing-feature {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  font-size: 14px;
  border-bottom: 1px solid var(--border-subtle);
}
.pricing-feature:last-child {
  border-bottom: none;
}
.pricing-check {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--accent-soft);
  border-radius: 50%;
  color: var(--accent);
}
```

### Animated Checkmarks (GSAP)
```jsx
// Checkmarks draw in as section enters view
useEffect(() => {
  const checks = document.querySelectorAll('.pricing-check svg path');

  checks.forEach((path, i) => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;

    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 0.4,
      ease: "power2.out",
      delay: i * 0.05,
      scrollTrigger: {
        trigger: '.pricing-section',
        start: 'top 60%',
      }
    });
  });
}, []);
```

---

## Section 10: CTA Section

### Layout
```css
.cta-section {
  padding: 120px 48px;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.cta-container {
  max-width: 700px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}
```

### Background Effect
```css
.cta-section::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 400px;
  background: radial-gradient(ellipse, var(--accent-glow) 0%, transparent 70%);
  filter: blur(60px);
  pointer-events: none;
}
```

### Contents
1. Headline: `text-display`, center-aligned
2. Subheadline: `text-body-lg`, color: var(--text-secondary)
3. CTA buttons: Primary + Secondary, centered

---

## Section 11: Footer

### Layout
```css
.footer {
  padding: 80px 48px 40px;
  border-top: 1px solid var(--border-subtle);
}
.footer-grid {
  display: grid;
  grid-template-columns: 2fr repeat(4, 1fr);
  gap: 48px;
  max-width: 1200px;
  margin: 0 auto;
}
.footer-brand {
  /* Logo + description */
}
.footer-column h4 {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 16px;
}
.footer-column a {
  display: block;
  padding: 8px 0;
  font-size: 14px;
  color: var(--text-secondary);
  transition: color 0.2s ease;
}
.footer-column a:hover {
  color: var(--text-primary);
}
.footer-bottom {
  margin-top: 64px;
  padding-top: 24px;
  border-top: 1px solid var(--border-subtle);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: var(--text-muted);
}
```

---

## Buttons

### Primary Button
```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 28px;
  background: var(--accent);
  color: #000;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.btn-primary:hover {
  background: var(--accent-hover);
  transform: translateY(-2px);
  box-shadow: 0 10px 20px var(--accent-glow);
}
```

### Secondary Button
```css
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 28px;
  background: transparent;
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 600;
  border: 1px solid var(--border-default);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.btn-secondary:hover {
  background: var(--bg-elevated);
  border-color: var(--border-strong);
}
```

### Button Animation
```jsx
<motion.button
  whileHover={{ scale: 1.02, y: -2 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 400, damping: 25 }}
/>
```

---

## Custom Cursor

```jsx
// components/CustomCursor.tsx
'use client';
import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const isHovering = useRef(false);

  const springConfig = { stiffness: 500, damping: 28 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 10);
      cursorY.set(e.clientY - 10);
    };

    const handleMouseEnter = () => { isHovering.current = true; };
    const handleMouseLeave = () => { isHovering.current = false; };

    window.addEventListener('mousemove', handleMouseMove);

    document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-5 h-5 rounded-full border border-white/30 pointer-events-none z-[9999] mix-blend-difference"
      style={{ x, y }}
    />
  );
}
```

---

## Smooth Scroll (Lenis)

```jsx
// components/SmoothScroll.tsx
'use client';
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return <>{children}</>;
}
```

---

## Responsive Breakpoints

```css
/* Tablet */
@media (max-width: 1024px) {
  .hero { grid-template-columns: 1fr; text-align: center; }
  .hero-visual-wrapper { margin-top: 48px; }
  .features-grid { grid-template-columns: 1fr 1fr; }
  .features-grid .feature-card:nth-child(1) { grid-column: span 2; }
  .how-grid { grid-template-columns: 1fr; }
  .pricing-grid { grid-template-columns: 1fr; max-width: 400px; margin: 0 auto; }
  .footer-grid { grid-template-columns: 1fr 1fr; }
}

/* Mobile */
@media (max-width: 640px) {
  .hero { padding: 100px 24px 60px; }
  .features-grid { grid-template-columns: 1fr; }
  .features-grid .feature-card { grid-column: span 1 !important; }
  .integrations-grid { grid-template-columns: repeat(3, 1fr); }
  .footer-grid { grid-template-columns: 1fr; }
}
```

---

## What NOT to Do

- NO 3-column equal-width feature card grids
- NO centered hero with generic illustration
- NO soft pastel colors
- NO rounded, bubbly aesthetic (border-radius max 16px)
- NO generic stock illustrations
- NO "Trusted by 1000+ companies" as first element
- NO light mode (this is dark mode only)
- NO gradient borders (use solid or subtle)
- NO excessive animation (keep it premium, not playful)

---

## Output Requirements

Generate a single complete landing page with:
1. All 11 sections implemented exactly as specified
2. Canvas particle system in hero
3. Custom cursor component
4. Smooth scroll with Lenis
5. All scroll-triggered animations with GSAP/Framer Motion
6. Responsive design for all breakpoints
7. Complete CSS/Tailwind styling matching specs
8. TypeScript types throughout
9. Example content populated

The code should be production-ready. Follow specifications exactly - do not deviate from colors, typography, spacing, or animation values.
