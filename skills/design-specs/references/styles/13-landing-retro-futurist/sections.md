# Retro-Futurist Landing Page: Page Sections

Part of the [Retro-Futurist Landing Page specification](index.md).

## Section-by-Section Implementation

### 1. Navigation

```tsx
// components/Navigation.tsx
'use client';

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { useState } from 'react';
import { StatusLight } from './StatusLight';

const navItems = [
  { label: 'Mission', href: '#mission' },
  { label: 'Technology', href: '#tech' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Contact', href: '#contact' },
];

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-space-navy/80 backdrop-blur-md border-b border-teal/20">
      <nav className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-burst flex items-center justify-center">
              <span className="font-display text-space-navy font-bold text-xs">★</span>
            </div>
            <span className="font-display text-lg font-bold uppercase tracking-widest text-cream-text">
              Cosmos
            </span>
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn(
                    'font-display text-sm uppercase tracking-widest',
                    'text-cream-text/70 hover:text-orange',
                    'transition-colors duration-300'
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Status & CTA */}
          <div className="hidden md:flex items-center gap-6">
            <StatusLight status="active" label="Systems Online" />
            <a
              href="#launch"
              className={cn(
                'px-6 py-2 bg-orange text-space-navy',
                'font-display font-bold text-xs uppercase tracking-widest',
                'hover:bg-orange-light transition-colors duration-300',
                'clip-path-angled'
              )}
            >
              Launch
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            <div className="w-6 space-y-1.5">
              <motion.span
                className="block h-0.5 bg-cream-text"
                animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 8 : 0 }}
              />
              <motion.span
                className="block h-0.5 bg-cream-text"
                animate={{ opacity: mobileOpen ? 0 : 1 }}
              />
              <motion.span
                className="block h-0.5 bg-cream-text"
                animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -8 : 0 }}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{ height: mobileOpen ? 'auto' : 0 }}
          className="md:hidden overflow-hidden"
        >
          <ul className="py-4 space-y-4 border-t border-teal/20">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block font-display text-sm uppercase tracking-widest text-cream-text"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </nav>
    </header>
  );
}
```

### 2. Hero Section

```tsx
// sections/HeroSection.tsx
'use client';

import { motion } from 'motion/react';
import { Button } from '@/components/Button';
import { Starburst } from '@/components/Starburst';
import { OrbitRing } from '@/components/OrbitRing';
import { retroEntrance, staggerContainer, fadeUpScale } from '@/lib/motion';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-space">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        {/* Stars */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cream-text rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.5,
            }}
          />
        ))}
      </div>

      {/* Orbiting elements */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <OrbitRing size={600} duration={30} color="rgba(0, 180, 216, 0.3)" thickness={1}>
          <div className="w-4 h-4 bg-teal rounded-full shadow-[0_0_20px_rgba(0,180,216,0.8)]" />
        </OrbitRing>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <OrbitRing size={800} duration={40} color="rgba(247, 127, 0, 0.2)" thickness={1} reverse>
          <div className="w-3 h-3 bg-orange rounded-full shadow-[0_0_15px_rgba(247,127,0,0.8)]" />
        </OrbitRing>
      </div>

      {/* Starbursts */}
      <div className="absolute top-20 right-20 opacity-30">
        <Starburst size={80} color="#F77F00" />
      </div>
      <div className="absolute bottom-40 left-10 opacity-20">
        <Starburst size={60} points={6} color="#00B4D8" />
      </div>

      {/* Main content */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        {/* Overline */}
        <motion.div variants={fadeUpScale}>
          <span className="inline-block px-4 py-2 border border-teal/50 rounded-full font-mono text-xs uppercase tracking-mega text-teal mb-8">
            Mission 2024
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          variants={retroEntrance}
          className="font-display text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-ultra leading-none text-cream-text mb-6"
        >
          The Future
          <br />
          <span className="text-orange text-glow-orange">Is Now</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeUpScale}
          className="font-body text-lg md:text-xl text-cream-text/70 tracking-wide leading-relaxed max-w-2xl mx-auto mb-10"
        >
          Embark on a journey through innovation. Where yesterday's dreams become today's reality.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={fadeUpScale}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button variant="primary" size="lg">
            Begin Mission
          </Button>
          <Button variant="outline" size="lg">
            Explore More
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={fadeUpScale}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-xs uppercase tracking-mega text-cream-text/50">
            Scroll to Explore
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-cream-text/30 flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 bg-orange rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-space-navy to-transparent" />
    </section>
  );
}
```

### 3. Mission Stats Section

```tsx
// sections/StatsSection.tsx
'use client';

import { motion } from 'motion/react';
import { MissionCounter } from '@/components/MissionCounter';
import { RadarDisplay } from '@/components/RadarDisplay';
import { StatusLight } from '@/components/StatusLight';
import { staggerContainer, fadeUpScale } from '@/lib/motion';

const stats = [
  { value: 2847, label: 'Missions Completed', suffix: '+' },
  { value: 99.7, label: 'Success Rate', suffix: '%' },
  { value: 156, label: 'Active Systems', prefix: '' },
  { value: 24, label: 'Global Stations', suffix: '' },
];

export function StatsSection() {
  return (
    <section className="py-24 md:py-32 bg-space-navy relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 180, 216, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 180, 216, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="font-display text-xs uppercase tracking-mega text-teal mb-4 block">
            Mission Control
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-widest text-cream-text">
            Real-Time Status
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Stats grid */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="lg:col-span-2 grid grid-cols-2 gap-8"
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={fadeUpScale}>
                <MissionCounter
                  value={stat.value}
                  label={stat.label}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Radar display */}
          <div className="flex flex-col items-center gap-6">
            <RadarDisplay size={250} />
            <div className="flex items-center gap-6">
              <StatusLight status="active" label="Online" />
              <StatusLight status="warning" label="Alert" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

### 4. Features/Technology Section

```tsx
// sections/TechnologySection.tsx
'use client';

import { motion } from 'motion/react';
import { RetroCard } from '@/components/RetroCard';
import { Starburst } from '@/components/Starburst';
import { staggerContainer, fadeUpScale } from '@/lib/motion';

const technologies = [
  {
    icon: '◎',
    title: 'Quantum Drive',
    description: 'Next-generation propulsion system enabling faster-than-light travel across the galaxy.',
  },
  {
    icon: '◈',
    title: 'Neural Link',
    description: 'Direct brain-computer interface for seamless communication between crew and vessel.',
  },
  {
    icon: '◉',
    title: 'Fusion Core',
    description: 'Clean, unlimited energy powering all systems with zero emissions.',
  },
  {
    icon: '◇',
    title: 'Holo-Display',
    description: 'Three-dimensional holographic interfaces for intuitive command and control.',
  },
];

export function TechnologySection() {
  return (
    <section
      id="tech"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0D1B2A 0%, #1B3A5F 50%, #0D1B2A 100%)',
      }}
    >
      {/* Angled overlay */}
      <div
        className="absolute inset-0"
        style={{ clipPath: 'polygon(0 5%, 100% 0, 100% 95%, 0 100%)' }}
      />

      {/* Starbursts */}
      <div className="absolute top-40 left-10 opacity-20">
        <Starburst size={100} color="#F77F00" />
      </div>
      <div className="absolute bottom-20 right-20 opacity-15">
        <Starburst size={120} points={12} color="#00B4D8" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="font-display text-xs uppercase tracking-mega text-orange mb-4 block">
            Advanced Systems
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-widest text-cream-text mb-4">
            Tomorrow's Technology
          </h2>
          <p className="font-body text-lg text-cream-text/60 max-w-2xl mx-auto">
            Pioneering innovations that push the boundaries of what's possible.
          </p>
        </div>

        {/* Technology cards */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {technologies.map((tech) => (
            <motion.div key={tech.title} variants={fadeUpScale}>
              <RetroCard variant="glass" cornerAccent>
                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <div className="shrink-0 w-16 h-16 rounded-full bg-gradient-atomic flex items-center justify-center">
                    <span className="text-space-navy text-2xl">{tech.icon}</span>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-display text-xl font-bold uppercase tracking-wider text-cream-text mb-2">
                      {tech.title}
                    </h3>
                    <p className="font-body text-cream-text/60 leading-relaxed">
                      {tech.description}
                    </p>
                  </div>
                </div>
              </RetroCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

### 5. Timeline/Process Section

```tsx
// sections/TimelineSection.tsx
'use client';

import { motion } from 'motion/react';
import { staggerContainer, fadeUpScale } from '@/lib/motion';

const timelineSteps = [
  {
    year: '2020',
    title: 'Foundation',
    description: 'Initial research and development phase begins.',
  },
  {
    year: '2022',
    title: 'Prototype',
    description: 'First successful test of core systems.',
  },
  {
    year: '2023',
    title: 'Launch',
    description: 'Public release and initial deployment.',
  },
  {
    year: '2024',
    title: 'Expansion',
    description: 'Global rollout and advanced features.',
  },
  {
    year: '2025',
    title: 'The Future',
    description: 'Next-generation capabilities unlocked.',
  },
];

export function TimelineSection() {
  return (
    <section id="timeline" className="py-24 md:py-32 bg-space-navy">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="font-display text-xs uppercase tracking-mega text-teal mb-4 block">
            Mission Timeline
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-widest text-cream-text">
            Launch Sequence
          </h2>
        </div>

        {/* Timeline */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-teal via-orange to-teal -translate-x-1/2" />

          {/* Timeline items */}
          {timelineSteps.map((step, index) => (
            <motion.div
              key={step.year}
              variants={fadeUpScale}
              className={`relative flex items-center gap-8 mb-16 last:mb-0 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              {/* Content */}
              <div className={`w-1/2 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                <span className="font-mono text-4xl font-bold text-orange">
                  {step.year}
                </span>
                <h3 className="font-display text-xl font-bold uppercase tracking-wider text-cream-text mt-2">
                  {step.title}
                </h3>
                <p className="font-body text-cream-text/60 mt-2">
                  {step.description}
                </p>
              </div>

              {/* Center dot */}
              <div className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-space-navy border-4 border-orange shadow-[0_0_20px_rgba(247,127,0,0.5)]" />

              {/* Spacer for other side */}
              <div className="w-1/2" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

### 6. CTA Section

```tsx
// sections/CTASection.tsx
'use client';

import { motion } from 'motion/react';
import { Button } from '@/components/Button';
import { DiagonalStripes } from '@/components/DiagonalStripes';
import { Starburst } from '@/components/Starburst';
import { retroEntrance } from '@/lib/motion';

export function CTASection() {
  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      {/* Background with diagonal stripes */}
      <DiagonalStripes
        color1="#F77F00"
        color2="#0D1B2A"
        stripeWidth={15}
        className="absolute inset-0 opacity-20"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-space-navy/90 via-space-navy/70 to-space-navy/90" />

      {/* Starbursts */}
      <div className="absolute top-10 left-1/4 opacity-30">
        <Starburst size={150} color="#F77F00" />
      </div>
      <div className="absolute bottom-10 right-1/4 opacity-20">
        <Starburst size={100} points={12} color="#00B4D8" />
      </div>

      {/* Content */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={retroEntrance}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
      >
        <span className="font-display text-xs uppercase tracking-mega text-teal mb-6 block">
          Ready for Liftoff?
        </span>

        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-ultra leading-none text-cream-text mb-6">
          Join the
          <br />
          <span className="text-orange text-glow-orange">Mission</span>
        </h2>

        <p className="font-body text-lg md:text-xl text-cream-text/70 max-w-2xl mx-auto mb-10">
          Be part of something extraordinary. The countdown to the future starts now.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="primary" size="lg">
            Launch Now
          </Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>

        {/* Countdown teaser */}
        <div className="mt-16 flex items-center justify-center gap-8">
          {['D', 'H', 'M', 'S'].map((unit, i) => (
            <div key={unit} className="text-center">
              <div className="font-mono text-3xl md:text-4xl font-bold text-orange">
                {String(Math.floor(Math.random() * 99)).padStart(2, '0')}
              </div>
              <div className="font-mono text-xs uppercase tracking-widest text-cream-text/50 mt-1">
                {unit === 'D' ? 'Days' : unit === 'H' ? 'Hours' : unit === 'M' ? 'Min' : 'Sec'}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
```

### 7. Contact Section

```tsx
// sections/ContactSection.tsx
'use client';

import { motion } from 'motion/react';
import { Button } from '@/components/Button';
import { staggerContainer, fadeUpScale } from '@/lib/motion';

export function ContactSection() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-cosmic-blue">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="font-display text-xs uppercase tracking-mega text-orange mb-4 block">
            Communications
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-widest text-cream-text">
            Open Channel
          </h2>
        </div>

        {/* Contact form */}
        <motion.form
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={fadeUpScale}>
              <label className="font-mono text-xs uppercase tracking-widest text-cream-text/70 mb-2 block">
                Call Sign
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-3 bg-space-navy/50 border-2 border-teal/30 rounded-lg text-cream-text font-body placeholder:text-cream-text/30 focus:outline-hidden focus:border-orange transition-colors"
              />
            </motion.div>
            <motion.div variants={fadeUpScale}>
              <label className="font-mono text-xs uppercase tracking-widest text-cream-text/70 mb-2 block">
                Frequency
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 bg-space-navy/50 border-2 border-teal/30 rounded-lg text-cream-text font-body placeholder:text-cream-text/30 focus:outline-hidden focus:border-orange transition-colors"
              />
            </motion.div>
          </div>

          <motion.div variants={fadeUpScale}>
            <label className="font-mono text-xs uppercase tracking-widest text-cream-text/70 mb-2 block">
              Transmission
            </label>
            <textarea
              rows={6}
              placeholder="Your message..."
              className="w-full px-4 py-3 bg-space-navy/50 border-2 border-teal/30 rounded-lg text-cream-text font-body placeholder:text-cream-text/30 focus:outline-hidden focus:border-orange transition-colors resize-none"
            />
          </motion.div>

          <motion.div variants={fadeUpScale} className="text-center">
            <Button type="submit" variant="primary" size="lg">
              Send Transmission
            </Button>
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
}
```

### 8. Footer

```tsx
// components/Footer.tsx
import { Starburst } from './Starburst';

const footerLinks = {
  mission: [
    { label: 'Overview', href: '#' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Technology', href: '#tech' },
  ],
  resources: [
    { label: 'Documentation', href: '#' },
    { label: 'Support', href: '#' },
    { label: 'Status', href: '#' },
  ],
  company: [
    { label: 'About', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#contact' },
  ],
};

export function Footer() {
  return (
    <footer className="py-16 bg-space-navy-dark border-t border-teal/20 relative overflow-hidden">
      {/* Starburst decoration */}
      <div className="absolute top-10 right-10 opacity-10">
        <Starburst size={200} color="#F77F00" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          {/* Logo & tagline */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-burst flex items-center justify-center">
                <span className="font-display text-space-navy font-bold text-xs">★</span>
              </div>
              <span className="font-display text-lg font-bold uppercase tracking-widest text-cream-text">
                Cosmos
              </span>
            </div>
            <p className="font-body text-sm text-cream-text/50 leading-relaxed">
              The future is now. Join us on this extraordinary journey.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-display text-xs uppercase tracking-mega text-orange mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="font-body text-sm text-cream-text/60 hover:text-cream-text transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-teal/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-cream-text/40">
            © {new Date().getFullYear()} Cosmos. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="font-mono text-xs text-cream-text/40 hover:text-cream-text transition-colors">
              Privacy
            </a>
            <a href="#" className="font-mono text-xs text-cream-text/40 hover:text-cream-text transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
```
