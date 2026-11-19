# Warm Human Landing Page - Exhaustive Technical Specification

Generate a complete, production-ready landing page using Next.js, TypeScript, Tailwind CSS, and Motion. This specification defines every visual element, animation parameter, and interactive behavior. Do not deviate from these values.

**Target Products:** Wellness apps (Headspace, Calm), home services (Thumbtack, Houzz), education platforms (Coursera, Skillshare), personal finance, childcare, senior care, mental health, coaching/consulting.

**Design Philosophy:** The page must feel like a warm invitation from a trusted friend, not a sales pitch. Every element should communicate care, thoughtfulness, and humanity. Calm, confident, approachable. Sophisticated but accessible.

---

## Output Requirements

- Single React component (or page with imported components)
- Next.js 14+ with App Router
- TypeScript strict mode
- Tailwind CSS for all styling
- Motion for animations
- Lenis for smooth scrolling
- Fully responsive (mobile-first)
- Complete page with all sections implemented

---

## Page Structure Overview

The page consists of these sections in order:
1. Navigation Header (sticky)
2. Hero Section
3. Trusted By / Logo Wall
4. Features Section (alternating image/text)
5. How It Works (3-step process)
6. Benefits Bento Grid
7. Testimonials Carousel
8. Pricing Section
9. FAQ Accordion
10. CTA Section
11. Footer

---

## Color System

### CSS Custom Properties
```css
:root {
  /* Backgrounds */
  --bg-primary: #F8F6F3;       /* Warm cream - main background */
  --bg-secondary: #FFFFFF;      /* Pure white - cards */
  --bg-tertiary: #F0EDE8;       /* Slightly darker cream - alternating sections */
  --bg-accent: #FFF9F5;         /* Peachy tint - highlight areas */

  /* Text */
  --text-primary: #2B2B2B;      /* Deep earth tone - headlines */
  --text-secondary: #5A5A5A;    /* Medium gray - body text */
  --text-tertiary: #8A8A8A;     /* Light gray - captions, labels */
  --text-inverse: #FFFFFF;      /* White - on colored backgrounds */

  /* Accent Colors */
  --accent-coral: #FF7F6E;      /* Primary CTA, warm emphasis */
  --accent-coral-hover: #FF6B57;
  --accent-coral-light: rgba(255, 127, 110, 0.1);
  --accent-coral-glow: rgba(255, 127, 110, 0.3);

  --accent-sage: #6EC1B5;       /* Secondary accent, trust */
  --accent-sage-light: rgba(110, 193, 181, 0.1);

  --accent-lavender: #B4A7D6;   /* Tertiary accent, calm */
  --accent-lavender-light: rgba(180, 167, 214, 0.1);

  --accent-peach: #FFB89A;      /* Warm backgrounds, gradients */
  --accent-gold: #F5C77E;       /* Highlights, stars */

  /* Gradients */
  --gradient-warm: linear-gradient(135deg, #FFB89A 0%, #B4A7D6 100%);
  --gradient-hero: linear-gradient(180deg, #FFF9F5 0%, #F8F6F3 100%);
  --gradient-card: linear-gradient(180deg, #FFFFFF 0%, #FAFAF8 100%);
  --gradient-text: linear-gradient(90deg, #FF7F6E 0%, #B4A7D6 100%);

  /* Shadows */
  --shadow-sm: 0 2px 8px rgba(43, 43, 43, 0.06);
  --shadow-md: 0 4px 16px rgba(43, 43, 43, 0.08);
  --shadow-lg: 0 8px 32px rgba(43, 43, 43, 0.10);
  --shadow-coral: 0 4px 16px rgba(255, 127, 110, 0.25);
  --shadow-card-hover: 0 12px 40px rgba(43, 43, 43, 0.12);

  /* Borders */
  --border-subtle: rgba(43, 43, 43, 0.06);
  --border-light: rgba(43, 43, 43, 0.08);
  --border-card: rgba(43, 43, 43, 0.05);

  /* Focus States */
  --focus-ring: 0 0 0 3px rgba(255, 127, 110, 0.3);
}
```

### Tailwind Extension
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFDFB',
          100: '#FFF9F5',
          200: '#F8F6F3',
          300: '#F0EDE8',
          400: '#E5E0D9',
        },
        earth: {
          700: '#5A5A5A',
          800: '#3D3D3D',
          900: '#2B2B2B',
        },
        coral: {
          50: 'rgba(255, 127, 110, 0.1)',
          100: '#FFE5E0',
          400: '#FF9B8A',
          500: '#FF7F6E',
          600: '#FF6B57',
        },
        sage: {
          50: 'rgba(110, 193, 181, 0.1)',
          400: '#8DD4C8',
          500: '#6EC1B5',
          600: '#5BB0A4',
        },
        lavender: {
          50: 'rgba(180, 167, 214, 0.1)',
          400: '#C7BDE3',
          500: '#B4A7D6',
          600: '#A193C9',
        },
      },
      fontFamily: {
        serif: ['Fraunces', 'Lora', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['72px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['56px', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-md': ['44px', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display-sm': ['36px', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'heading-lg': ['28px', { lineHeight: '1.3' }],
        'heading-md': ['24px', { lineHeight: '1.35' }],
        'heading-sm': ['20px', { lineHeight: '1.4' }],
        'body-lg': ['18px', { lineHeight: '1.7', letterSpacing: '0.01em' }],
        'body-md': ['16px', { lineHeight: '1.7', letterSpacing: '0.01em' }],
        'body-sm': ['14px', { lineHeight: '1.6' }],
        'caption': ['13px', { lineHeight: '1.5', letterSpacing: '0.02em' }],
        'eyebrow': ['12px', { lineHeight: '1.4', letterSpacing: '0.15em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        'section': '160px',
        'section-sm': '100px',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      },
      maxWidth: {
        'content': '1200px',
        'reading': '70ch',
      },
    },
  },
};
```

---

## Typography System

### Font Stack
```css
/* Serif - Headlines & Quotes */
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&display=swap');

/* Sans-serif - Body & UI */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
```

### Typography Classes
```css
/* Display Headlines - Serif */
.heading-display-xl {
  font-family: var(--font-serif);
  font-size: 72px;
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--text-primary);
}

.heading-display-lg {
  font-family: var(--font-serif);
  font-size: 56px;
  font-weight: 500;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--text-primary);
}

.heading-display-md {
  font-family: var(--font-serif);
  font-size: 44px;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: var(--text-primary);
}

.heading-display-sm {
  font-family: var(--font-serif);
  font-size: 36px;
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: -0.01em;
  color: var(--text-primary);
}

/* Section Headlines - Sans */
.heading-lg {
  font-family: var(--font-sans);
  font-size: 28px;
  font-weight: 600;
  line-height: 1.3;
  color: var(--text-primary);
}

.heading-md {
  font-family: var(--font-sans);
  font-size: 24px;
  font-weight: 600;
  line-height: 1.35;
  color: var(--text-primary);
}

.heading-sm {
  font-family: var(--font-sans);
  font-size: 20px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--text-primary);
}

/* Body Text */
.body-lg {
  font-family: var(--font-sans);
  font-size: 18px;
  font-weight: 400;
  line-height: 1.7;
  letter-spacing: 0.01em;
  color: var(--text-secondary);
  max-width: 70ch;
}

.body-md {
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.7;
  letter-spacing: 0.01em;
  color: var(--text-secondary);
  max-width: 70ch;
}

/* Labels & Captions */
.eyebrow {
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent-coral);
}

.caption {
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0.02em;
  color: var(--text-tertiary);
}

/* Quote Text */
.quote {
  font-family: var(--font-serif);
  font-size: 24px;
  font-weight: 400;
  line-height: 1.5;
  font-style: italic;
  color: var(--text-primary);
}
```

### Gradient Text (Use Sparingly)
```css
.gradient-text {
  background: var(--gradient-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## Layout System

### Container
```css
.container-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

@media (min-width: 768px) {
  .container-main {
    padding: 0 40px;
  }
}

@media (min-width: 1024px) {
  .container-main {
    padding: 0 48px;
  }
}
```

### Section Spacing
```css
.section {
  padding-top: 100px;
  padding-bottom: 100px;
}

@media (min-width: 768px) {
  .section {
    padding-top: 140px;
    padding-bottom: 140px;
  }
}

@media (min-width: 1024px) {
  .section {
    padding-top: 160px;
    padding-bottom: 160px;
  }
}
```

### Asymmetric Grid Layout
```css
/* 40/60 Split */
.grid-asymmetric-40-60 {
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  align-items: center;
}

@media (min-width: 1024px) {
  .grid-asymmetric-40-60 {
    grid-template-columns: 40% 1fr;
    gap: 80px;
  }
}

/* 60/40 Split */
.grid-asymmetric-60-40 {
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  align-items: center;
}

@media (min-width: 1024px) {
  .grid-asymmetric-60-40 {
    grid-template-columns: 1fr 40%;
    gap: 80px;
  }
}
```

### Bento Grid
```css
.bento-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 768px) {
  .bento-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto auto auto;
    gap: 24px;
  }

  /* First card spans full width */
  .bento-grid > :first-child {
    grid-column: span 2;
  }

  /* Third card taller */
  .bento-grid > :nth-child(3) {
    grid-row: span 2;
  }
}

@media (min-width: 1024px) {
  .bento-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  .bento-grid > :first-child {
    grid-column: span 2;
  }
}
```

---

## Component Specifications

### Navigation Header

```tsx
// Structure
<header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
  <nav className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-12">
    <div className="flex items-center justify-between h-20 md:h-24">
      {/* Logo */}
      <Logo />

      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center gap-8">
        <NavLink>Features</NavLink>
        <NavLink>Pricing</NavLink>
        <NavLink>About</NavLink>
        <NavLink>Blog</NavLink>
      </ul>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button className="hidden md:block">Log in</button>
        <button className="btn-primary">Get Started</button>
      </div>

      {/* Mobile Menu Toggle */}
      <MobileMenuButton />
    </div>
  </nav>
</header>
```

```css
/* Header States */
.header {
  background: transparent;
  backdrop-filter: none;
  border-bottom: 1px solid transparent;
}

.header.scrolled {
  background: rgba(248, 246, 243, 0.95);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-subtle);
  box-shadow: var(--shadow-sm);
}

/* Nav Link */
.nav-link {
  font-family: var(--font-sans);
  font-size: 15px;
  font-weight: 500;
  color: var(--text-secondary);
  position: relative;
  padding: 8px 0;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: var(--text-primary);
}

/* Underline Animation */
.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--accent-coral);
  border-radius: 1px;
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

/* Login Button */
.btn-login {
  font-size: 15px;
  font-weight: 500;
  color: var(--text-secondary);
  padding: 10px 20px;
  transition: color 0.3s ease;
}

.btn-login:hover {
  color: var(--text-primary);
}
```

### Mobile Menu
```css
.mobile-menu {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 400px;
  height: 100vh;
  background: var(--bg-primary);
  padding: 100px 32px 40px;
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.08);
  transform: translateX(100%);
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.mobile-menu.open {
  transform: translateX(0);
}

.mobile-menu-overlay {
  position: fixed;
  inset: 0;
  background: rgba(43, 43, 43, 0.3);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.mobile-menu-overlay.open {
  opacity: 1;
  visibility: visible;
}

.mobile-nav-link {
  display: block;
  font-family: var(--font-serif);
  font-size: 28px;
  font-weight: 500;
  color: var(--text-primary);
  padding: 16px 0;
  border-bottom: 1px solid var(--border-light);
}
```

---

### Hero Section

```tsx
// Structure
<section className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden">
  {/* Background */}
  <div className="absolute inset-0 bg-gradient-to-b from-cream-100 to-cream-200" />

  {/* Floating Circles */}
  <FloatingCircle size={300} color="coral" position={{ top: '10%', right: '-5%' }} />
  <FloatingCircle size={200} color="sage" position={{ bottom: '20%', left: '-3%' }} />
  <FloatingCircle size={150} color="lavender" position={{ top: '40%', right: '30%' }} />

  {/* Paper Texture Overlay */}
  <div className="absolute inset-0 bg-paper-texture opacity-[0.03] pointer-events-none" />

  <div className="container-main relative z-10">
    <div className="grid lg:grid-cols-[1fr,1.2fr] gap-12 lg:gap-20 items-center">
      {/* Content */}
      <div className="max-w-xl">
        <motion.span className="eyebrow mb-6 block">
          Welcome to Serenity
        </motion.span>

        <motion.h1 className="heading-display-lg mb-6">
          Find your calm in the everyday chaos
        </motion.h1>

        <motion.p className="body-lg mb-10">
          A mindful approach to wellness that fits your life.
          Simple practices, guided by experts, designed for real people with real schedules.
        </motion.p>

        <motion.div className="flex flex-col sm:flex-row gap-4">
          <button className="btn-primary">Start Your Journey</button>
          <button className="btn-secondary">Watch Demo</button>
        </motion.div>

        {/* Trust Indicator */}
        <motion.div className="mt-10 flex items-center gap-4">
          <div className="flex -space-x-3">
            {avatars.map((avatar, i) => (
              <img
                key={i}
                src={avatar}
                className="w-10 h-10 rounded-full border-2 border-cream-200"
              />
            ))}
          </div>
          <div>
            <div className="flex items-center gap-1 mb-1">
              {[1,2,3,4,5].map((star) => (
                <StarIcon key={star} className="w-4 h-4 text-accent-gold" />
              ))}
            </div>
            <p className="caption">Loved by 50,000+ members</p>
          </div>
        </motion.div>
      </div>

      {/* Hero Image */}
      <motion.div className="relative">
        <div className="relative rounded-3xl overflow-hidden shadow-lg">
          <img
            src="/hero-image.jpg"
            alt="Person meditating peacefully"
            className="w-full h-auto"
          />
          {/* Subtle Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        </div>

        {/* Floating Card */}
        <motion.div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sage-50 flex items-center justify-center">
              <HeartIcon className="w-5 h-5 text-sage-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-earth-900">Daily Check-in</p>
              <p className="text-xs text-earth-700">How are you feeling?</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </div>
</section>
```

### Hero Animation Sequence
```typescript
// Motion Variants
const heroContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      mass: 1,
    },
  },
};

const heroImage = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 25,
      mass: 1,
      delay: 0.3,
    },
  },
};

// Floating card enters from side
const floatingCard = {
  hidden: { opacity: 0, x: -40, y: 20 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      delay: 0.8,
    },
  },
};
```

---

### Floating Circles Component

```tsx
interface FloatingCircleProps {
  size: number;
  color: 'coral' | 'sage' | 'lavender' | 'peach';
  position: { top?: string; bottom?: string; left?: string; right?: string };
  parallaxSpeed?: number;
}

const colorMap = {
  coral: 'rgba(255, 127, 110, 0.15)',
  sage: 'rgba(110, 193, 181, 0.15)',
  lavender: 'rgba(180, 167, 214, 0.2)',
  peach: 'rgba(255, 184, 154, 0.2)',
};

const FloatingCircle = ({
  size,
  color,
  position,
  parallaxSpeed = 0.7
}: FloatingCircleProps) => {
  const { scrollY } = useScroll();

  const y = useTransform(
    scrollY,
    [0, 1000],
    [0, 1000 * parallaxSpeed]
  );

  return (
    <motion.div
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle at 30% 30%, ${colorMap[color]}, transparent 70%)`,
        filter: 'blur(40px)',
        ...position,
        y,
      }}
      animate={{
        x: [0, 20, 0],
        y: [0, -15, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};
```

---

### Button Components

```css
/* Primary Button */
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 32px;
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 600;
  color: white;
  background: var(--accent-coral);
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(255, 127, 110, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: var(--accent-coral-hover);
  transform: scale(1.02);
  box-shadow: 0 6px 24px rgba(255, 127, 110, 0.4);
}

.btn-primary:active {
  transform: scale(0.98);
}

.btn-primary:focus-visible {
  outline: none;
  box-shadow: var(--focus-ring), 0 4px 16px rgba(255, 127, 110, 0.3);
}

/* Secondary Button */
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 32px;
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  background: transparent;
  border: 2px solid var(--border-light);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: var(--bg-secondary);
  border-color: var(--accent-coral);
  color: var(--accent-coral);
}

.btn-secondary:active {
  transform: scale(0.98);
}

/* Ghost Button */
.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  font-family: var(--font-sans);
  font-size: 15px;
  font-weight: 500;
  color: var(--accent-coral);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-ghost:hover {
  color: var(--accent-coral-hover);
}

.btn-ghost svg {
  transition: transform 0.3s ease;
}

.btn-ghost:hover svg {
  transform: translateX(4px);
}
```

---

### Logo Wall / Trusted By Section

```tsx
<section className="py-16 md:py-20 bg-cream-200/50">
  <div className="container-main">
    <motion.p
      className="text-center caption mb-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6 }}
    >
      Trusted by teams at
    </motion.p>

    <motion.div
      className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {logos.map((logo, index) => (
        <motion.img
          key={logo.name}
          src={logo.src}
          alt={logo.name}
          className="h-8 md:h-10 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
        />
      ))}
    </motion.div>
  </div>
</section>
```

---

### Features Section (Alternating Layout)

```tsx
<section className="section bg-cream-200">
  <div className="container-main">
    {/* Section Header */}
    <div className="text-center max-w-2xl mx-auto mb-20">
      <motion.span className="eyebrow mb-4 block">Features</motion.span>
      <motion.h2 className="heading-display-md mb-6">
        Everything you need to feel your best
      </motion.h2>
      <motion.p className="body-lg mx-auto">
        Simple, thoughtful tools designed to support your wellbeing journey.
      </motion.p>
    </div>

    {/* Feature Rows */}
    <div className="space-y-24 lg:space-y-32">
      {features.map((feature, index) => (
        <FeatureRow
          key={feature.id}
          feature={feature}
          reversed={index % 2 === 1}
        />
      ))}
    </div>
  </div>
</section>
```

```tsx
// Feature Row Component
const FeatureRow = ({ feature, reversed }: FeatureRowProps) => {
  return (
    <motion.div
      className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
        reversed ? 'lg:grid-flow-dense' : ''
      }`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Image */}
      <motion.div
        className={reversed ? 'lg:col-start-2' : ''}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="relative">
          <img
            src={feature.image}
            alt={feature.title}
            className="w-full rounded-3xl shadow-lg"
          />
          {/* Image Border */}
          <div className="absolute inset-0 rounded-3xl border-2 border-black/5 pointer-events-none" />
        </div>
      </motion.div>

      {/* Content */}
      <div className={`${reversed ? 'lg:col-start-1 lg:row-start-1' : ''} max-w-lg`}>
        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-coral-50 flex items-center justify-center mb-6">
          <feature.icon className="w-7 h-7 text-coral-500" />
        </div>

        <h3 className="heading-lg mb-4">{feature.title}</h3>
        <p className="body-md mb-6">{feature.description}</p>

        {/* Feature List */}
        <ul className="space-y-3">
          {feature.points.map((point, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckIcon className="w-5 h-5 text-sage-500 mt-0.5 flex-shrink-0" />
              <span className="text-earth-700">{point}</span>
            </li>
          ))}
        </ul>

        <button className="btn-ghost mt-8">
          Learn more <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};
```

---

### How It Works Section

```tsx
<section className="section bg-cream-100">
  <div className="container-main">
    <div className="text-center max-w-2xl mx-auto mb-16">
      <motion.span className="eyebrow mb-4 block">How It Works</motion.span>
      <motion.h2 className="heading-display-md">
        Get started in minutes
      </motion.h2>
    </div>

    <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
      {steps.map((step, index) => (
        <motion.div
          key={step.id}
          className="relative text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{
            duration: 0.6,
            delay: index * 0.15,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          {/* Step Number */}
          <div className="w-16 h-16 rounded-full bg-coral-500 text-white flex items-center justify-center mx-auto mb-6">
            <span className="font-serif text-2xl font-medium">{index + 1}</span>
          </div>

          {/* Connector Line (except last) */}
          {index < steps.length - 1 && (
            <div className="hidden md:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)] h-[2px] bg-coral-100">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-coral-300" />
            </div>
          )}

          <h3 className="heading-sm mb-3">{step.title}</h3>
          <p className="body-sm text-earth-700 max-w-xs mx-auto">{step.description}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>
```

---

### Benefits Bento Grid

```tsx
<section className="section">
  <div className="container-main">
    <div className="text-center max-w-2xl mx-auto mb-16">
      <motion.span className="eyebrow mb-4 block">Benefits</motion.span>
      <motion.h2 className="heading-display-md">
        Why people love Serenity
      </motion.h2>
    </div>

    <div className="bento-grid">
      {/* Large Featured Card */}
      <motion.div
        className="bento-card bento-card-featured"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6 }}
        whileHover={{ y: -4 }}
      >
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <span className="eyebrow mb-4 block">Most Popular</span>
            <h3 className="heading-lg mb-4">Daily 5-minute meditations</h3>
            <p className="body-md">
              Perfect for busy schedules. Quick, effective sessions that fit into any routine.
            </p>
          </div>
          <div className="w-full md:w-64 h-48 rounded-2xl bg-gradient-warm flex items-center justify-center">
            <ClockIcon className="w-16 h-16 text-white/80" />
          </div>
        </div>
      </motion.div>

      {/* Regular Cards */}
      {benefits.map((benefit, index) => (
        <motion.div
          key={benefit.id}
          className="bento-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
          whileHover={{ y: -4 }}
        >
          <div className={`w-12 h-12 rounded-xl ${benefit.bgColor} flex items-center justify-center mb-5`}>
            <benefit.icon className={`w-6 h-6 ${benefit.iconColor}`} />
          </div>
          <h3 className="heading-sm mb-3">{benefit.title}</h3>
          <p className="body-sm text-earth-700">{benefit.description}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>
```

```css
.bento-card {
  background: white;
  padding: 32px;
  border-radius: 24px;
  border: 1px solid var(--border-card);
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
}

.bento-card:hover {
  box-shadow: var(--shadow-md);
}

.bento-card-featured {
  background: linear-gradient(180deg, #FFFFFF 0%, #FAFAF8 100%);
  padding: 40px;
}

@media (min-width: 768px) {
  .bento-card {
    padding: 36px;
  }

  .bento-card-featured {
    padding: 48px;
  }
}
```

---

### Testimonials Carousel

```tsx
<section className="section bg-cream-200 overflow-hidden">
  <div className="container-main">
    <div className="text-center max-w-2xl mx-auto mb-16">
      <motion.span className="eyebrow mb-4 block">Testimonials</motion.span>
      <motion.h2 className="heading-display-md">
        Stories from our community
      </motion.h2>
    </div>
  </div>

  {/* Full-width Carousel */}
  <div className="relative">
    <motion.div
      className="flex gap-6 px-6 cursor-grab active:cursor-grabbing"
      drag="x"
      dragConstraints={{ left: -((testimonials.length - 1) * 420), right: 0 }}
      dragElastic={0.1}
    >
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={testimonial.id}
          className="testimonial-card flex-shrink-0 w-[380px]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          {/* Stars */}
          <div className="flex gap-1 mb-4">
            {[1,2,3,4,5].map((star) => (
              <StarIcon key={star} className="w-5 h-5 text-accent-gold" />
            ))}
          </div>

          {/* Quote */}
          <p className="quote text-lg mb-6">"{testimonial.quote}"</p>

          {/* Author */}
          <div className="flex items-center gap-4">
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-coral-100"
            />
            <div>
              <p className="font-medium text-earth-900">{testimonial.name}</p>
              <p className="text-sm text-earth-700">{testimonial.role}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>

    {/* Fade Edges */}
    <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-cream-200 to-transparent pointer-events-none" />
    <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-cream-200 to-transparent pointer-events-none" />
  </div>
</section>
```

```css
.testimonial-card {
  background: white;
  padding: 32px;
  border-radius: 24px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-card);
}

.quote {
  font-family: var(--font-serif);
  font-size: 18px;
  font-weight: 400;
  font-style: italic;
  line-height: 1.6;
  color: var(--text-primary);
}
```

---

### Pricing Section

```tsx
<section className="section">
  <div className="container-main">
    <div className="text-center max-w-2xl mx-auto mb-16">
      <motion.span className="eyebrow mb-4 block">Pricing</motion.span>
      <motion.h2 className="heading-display-md mb-4">
        Simple, transparent pricing
      </motion.h2>
      <motion.p className="body-lg">
        Start free, upgrade when you're ready.
      </motion.p>
    </div>

    {/* Pricing Toggle (Monthly/Annual) */}
    <div className="flex items-center justify-center gap-4 mb-12">
      <span className={`text-sm ${isAnnual ? 'text-earth-700' : 'text-earth-900 font-medium'}`}>
        Monthly
      </span>
      <button
        onClick={() => setIsAnnual(!isAnnual)}
        className="relative w-14 h-8 rounded-full bg-cream-300 transition-colors"
      >
        <motion.div
          className="absolute top-1 left-1 w-6 h-6 rounded-full bg-coral-500"
          animate={{ x: isAnnual ? 24 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>
      <span className={`text-sm ${isAnnual ? 'text-earth-900 font-medium' : 'text-earth-700'}`}>
        Annual <span className="text-coral-500">(Save 20%)</span>
      </span>
    </div>

    {/* Pricing Cards */}
    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {plans.map((plan, index) => (
        <motion.div
          key={plan.id}
          className={`pricing-card ${plan.featured ? 'pricing-card-featured' : ''}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          {plan.featured && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-coral-500 text-white text-xs font-medium rounded-full">
              Most Popular
            </span>
          )}

          <h3 className="heading-sm mb-2">{plan.name}</h3>
          <p className="text-sm text-earth-700 mb-6">{plan.description}</p>

          <div className="mb-6">
            <span className="text-4xl font-serif font-medium text-earth-900">
              ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
            </span>
            <span className="text-earth-700">/month</span>
          </div>

          <button className={plan.featured ? 'btn-primary w-full' : 'btn-secondary w-full'}>
            {plan.cta}
          </button>

          <ul className="mt-8 space-y-3">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <CheckIcon className="w-5 h-5 text-sage-500 flex-shrink-0" />
                <span className="text-earth-700">{feature}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  </div>
</section>
```

```css
.pricing-card {
  position: relative;
  background: white;
  padding: 36px;
  border-radius: 24px;
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-sm);
}

.pricing-card-featured {
  border: 2px solid var(--accent-coral);
  box-shadow: var(--shadow-coral);
  transform: scale(1.02);
}

@media (min-width: 768px) {
  .pricing-card-featured {
    transform: scale(1.05);
  }
}
```

---

### FAQ Accordion

```tsx
<section className="section bg-cream-200">
  <div className="container-main max-w-3xl">
    <div className="text-center mb-16">
      <motion.span className="eyebrow mb-4 block">FAQ</motion.span>
      <motion.h2 className="heading-display-md">
        Common questions
      </motion.h2>
    </div>

    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <motion.div
          key={faq.id}
          className="faq-item"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <button
            className="faq-trigger"
            onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
          >
            <span className="font-medium text-earth-900">{faq.question}</span>
            <motion.div
              animate={{ rotate: openFaq === faq.id ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDownIcon className="w-5 h-5 text-earth-700" />
            </motion.div>
          </button>

          <AnimatePresence>
            {openFaq === faq.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="overflow-hidden"
              >
                <p className="pt-4 pb-2 text-earth-700 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  </div>
</section>
```

```css
.faq-item {
  background: white;
  border-radius: 16px;
  border: 1px solid var(--border-card);
  overflow: hidden;
}

.faq-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s ease;
}

.faq-trigger:hover {
  background: var(--bg-accent);
}
```

---

### CTA Section

```tsx
<section className="section bg-gradient-warm relative overflow-hidden">
  {/* Background Decoration */}
  <div className="absolute inset-0">
    <FloatingCircle size={400} color="peach" position={{ top: '-20%', right: '-10%' }} />
    <FloatingCircle size={300} color="lavender" position={{ bottom: '-15%', left: '-8%' }} />
  </div>

  <div className="container-main relative z-10">
    <div className="text-center max-w-2xl mx-auto">
      <motion.h2
        className="heading-display-md text-white mb-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Ready to start your journey?
      </motion.h2>

      <motion.p
        className="body-lg text-white/90 mb-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Join thousands of people who have found more calm, clarity, and joy in their daily lives.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <button className="btn-primary bg-white text-coral-500 hover:bg-cream-100">
          Get Started Free
        </button>
      </motion.div>

      <motion.p
        className="mt-6 text-sm text-white/70"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        No credit card required. Cancel anytime.
      </motion.p>
    </div>
  </div>
</section>
```

---

### Footer

```tsx
<footer className="bg-cream-300 pt-20 pb-8">
  <div className="container-main">
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
      {/* Brand Column */}
      <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-8 lg:mb-0">
        <Logo className="h-8 mb-4" />
        <p className="text-sm text-earth-700 max-w-xs mb-6">
          Helping you find peace and balance in everyday life.
        </p>

        {/* Social Links */}
        <div className="flex gap-4">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              className="w-10 h-10 rounded-full bg-cream-200 flex items-center justify-center text-earth-700 hover:bg-coral-500 hover:text-white transition-all duration-300"
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>

      {/* Link Columns */}
      {footerLinks.map((column) => (
        <div key={column.title}>
          <h4 className="font-medium text-earth-900 mb-4">{column.title}</h4>
          <ul className="space-y-3">
            {column.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm text-earth-700 hover:text-coral-500 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Newsletter */}
      <div className="col-span-2 md:col-span-2 lg:col-span-1">
        <h4 className="font-medium text-earth-900 mb-4">Stay in touch</h4>
        <p className="text-sm text-earth-700 mb-4">
          Weekly tips for mindful living.
        </p>
        <form className="flex gap-2">
          <input
            type="email"
            placeholder="Your email"
            className="flex-1 px-4 py-3 rounded-xl bg-white border border-border-light text-sm focus:outline-none focus:ring-2 focus:ring-coral-500/30"
          />
          <button className="px-4 py-3 bg-coral-500 text-white rounded-xl hover:bg-coral-600 transition-colors">
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="pt-8 border-t border-earth-900/10 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-sm text-earth-700">
        © 2024 Serenity. All rights reserved.
      </p>
      <div className="flex gap-6">
        <a href="/privacy" className="text-sm text-earth-700 hover:text-coral-500 transition-colors">
          Privacy Policy
        </a>
        <a href="/terms" className="text-sm text-earth-700 hover:text-coral-500 transition-colors">
          Terms of Service
        </a>
      </div>
    </div>
  </div>
</footer>
```

---

## Form Components

### Input Field
```css
.input-field {
  width: 100%;
  height: 56px;
  padding: 0 20px;
  font-family: var(--font-sans);
  font-size: 16px;
  color: var(--text-primary);
  background: white;
  border: 2px solid var(--border-light);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.input-field::placeholder {
  color: var(--text-tertiary);
}

.input-field:hover {
  border-color: var(--border-subtle);
}

.input-field:focus {
  outline: none;
  border-color: var(--accent-coral);
  box-shadow: 0 0 0 4px rgba(255, 127, 110, 0.1);
}

/* With Floating Label */
.input-wrapper {
  position: relative;
}

.input-label {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: var(--text-tertiary);
  pointer-events: none;
  transition: all 0.2s ease;
}

.input-field:focus + .input-label,
.input-field:not(:placeholder-shown) + .input-label {
  top: 8px;
  transform: translateY(0);
  font-size: 12px;
  color: var(--accent-coral);
}
```

### Textarea
```css
.textarea-field {
  width: 100%;
  min-height: 140px;
  padding: 16px 20px;
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-primary);
  background: white;
  border: 2px solid var(--border-light);
  border-radius: 12px;
  resize: vertical;
  transition: all 0.3s ease;
}

.textarea-field:focus {
  outline: none;
  border-color: var(--accent-coral);
  box-shadow: 0 0 0 4px rgba(255, 127, 110, 0.1);
}
```

### Checkbox
```css
.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.checkbox {
  appearance: none;
  width: 22px;
  height: 22px;
  border: 2px solid var(--border-light);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.checkbox:checked {
  background: var(--accent-coral);
  border-color: var(--accent-coral);
}

.checkbox:checked::after {
  content: '';
  position: absolute;
  left: 6px;
  top: 2px;
  width: 6px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox:focus {
  box-shadow: 0 0 0 4px rgba(255, 127, 110, 0.2);
}
```

---

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
import Lenis from '@studio-freight/lenis';

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
        fixed top-0 left-0 pointer-events-none z-[9999]
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

## Background Textures

### Paper Texture (CSS)
```css
.bg-paper-texture {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.03;
  pointer-events: none;
}
```

### Dot Pattern
```css
.bg-dot-pattern {
  background-image: radial-gradient(
    circle,
    rgba(43, 43, 43, 0.1) 1px,
    transparent 1px
  );
  background-size: 24px 24px;
  pointer-events: none;
}
```

---

## Responsive Breakpoints

```css
/* Mobile First */
/* Base: 0-639px */

/* Tablet: 640px+ */
@media (min-width: 640px) { /* sm */ }

/* Tablet Landscape: 768px+ */
@media (min-width: 768px) { /* md */ }

/* Desktop: 1024px+ */
@media (min-width: 1024px) { /* lg */ }

/* Large Desktop: 1280px+ */
@media (min-width: 1280px) { /* xl */ }
```

### Typography Scaling
```css
.heading-display-lg {
  font-size: 36px;
}

@media (min-width: 640px) {
  .heading-display-lg {
    font-size: 44px;
  }
}

@media (min-width: 768px) {
  .heading-display-lg {
    font-size: 52px;
  }
}

@media (min-width: 1024px) {
  .heading-display-lg {
    font-size: 56px;
  }
}
```

### Section Spacing Scaling
```css
.section {
  padding-top: 80px;
  padding-bottom: 80px;
}

@media (min-width: 768px) {
  .section {
    padding-top: 120px;
    padding-bottom: 120px;
  }
}

@media (min-width: 1024px) {
  .section {
    padding-top: 160px;
    padding-bottom: 160px;
  }
}
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

---

## What to Avoid

1. **Velocity-based blur effects** - Keep everything calm and clear
2. **Aggressive scroll choreography** - No snapping, jarring transitions
3. **Complex canvas particle systems** - Too technical, not warm
4. **Multiple competing animations** - One thing at a time
5. **Dashboard mockups** - This is human-centered, not tech-focused
6. **Technical jargon** - Speak human
7. **Sharp, geometric shapes** - Use organic, rounded forms
8. **High contrast aggressive colors** - Stick to warm pastels
9. **Fast, bouncy springs** - Use soft, smooth motion
10. **Dense, cramped layouts** - Generous breathing room always

---

## Focus On

1. **Smooth, natural motion** - Like a gentle breath
2. **Generous spacing** - Let elements breathe
3. **Warm, inviting colors** - Pastels and earth tones
4. **Editorial photography** - Real people, real moments
5. **Subtle, meaningful animations** - Every motion has purpose
6. **Readability and comfort** - Easy on the eyes
7. **Organic shapes** - Rounded corners, soft edges
8. **Clear hierarchy** - Guide the eye naturally
9. **Trust indicators** - Social proof, testimonials
10. **Single, clear CTAs** - Don't overwhelm with choices

---

## Required npm Packages

```bash
npm install motion @studio-freight/lenis
npm install @radix-ui/react-accordion  # For FAQ
npm install clsx tailwind-merge        # For conditional classes
```

---

## Sample Data Structure

```typescript
// Features
const features = [
  {
    id: 1,
    icon: MeditationIcon,
    title: "Guided meditations",
    description: "Expert-led sessions for every mood and moment. From 3-minute quick resets to deep 30-minute journeys.",
    image: "/features/meditation.jpg",
    points: [
      "100+ guided sessions",
      "New content weekly",
      "Offline access"
    ],
  },
  // ... more features
];

// Testimonials
const testimonials = [
  {
    id: 1,
    quote: "Serenity helped me find 10 minutes of peace in my chaotic day. It's become my morning ritual.",
    name: "Sarah Chen",
    role: "Busy parent of three",
    avatar: "/avatars/sarah.jpg",
  },
  // ... more testimonials
];

// Pricing Plans
const plans = [
  {
    id: 'free',
    name: 'Free',
    description: 'Get started with basics',
    monthlyPrice: 0,
    annualPrice: 0,
    cta: 'Start Free',
    featured: false,
    features: [
      '5 guided meditations',
      'Daily mindfulness tips',
      'Basic progress tracking',
    ],
  },
  {
    id: 'plus',
    name: 'Plus',
    description: 'For committed practitioners',
    monthlyPrice: 12,
    annualPrice: 9,
    cta: 'Get Plus',
    featured: true,
    features: [
      'Unlimited meditations',
      'Sleep stories',
      'Mood tracking',
      'Offline access',
      'Personal insights',
    ],
  },
  // ... more plans
];
```

---

## Final Notes

This specification prioritizes **warmth, clarity, and trust** over technical impressiveness. Every design decision should answer: "Does this make the user feel welcomed and at ease?"

The goal is a page that feels like a conversation with a caring friend, not a sales pitch. Generous space, soft motion, warm colors, and clear messaging create an experience that invites rather than demands.

Generate the complete page following these specifications exactly. Do not improvise or add elements not specified here.
