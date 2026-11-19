# Warm Human Landing Page: Page Sections (1 of 2)

Part of the [Warm Human Landing Page specification](index.md).

## Component Specifications

### Navigation Header

```tsx
// Structure
<header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
  <nav className="max-w-content mx-auto px-6 md:px-10 lg:px-12">
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

### Hero Section

```tsx
// Structure
<section className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden">
  {/* Background */}
  <div className="absolute inset-0 bg-linear-to-b from-cream-100 to-cream-200" />

  {/* Floating Circles */}
  <FloatingCircle size={300} color="coral" position={{ top: '10%', right: '-5%' }} />
  <FloatingCircle size={200} color="sage" position={{ bottom: '20%', left: '-3%' }} />
  <FloatingCircle size={150} color="lavender" position={{ top: '40%', right: '30%' }} />

  {/* Paper Texture Overlay */}
  <div className="absolute inset-0 bg-paper-texture opacity-[0.03] pointer-events-none" />

  <div className="container-main relative z-10">
    <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center">
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
          <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent" />
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
              <CheckIcon className="w-5 h-5 text-sage-500 mt-0.5 shrink-0" />
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
