# Playful Geometric Landing Page: Page Sections

Part of the [Playful Geometric Landing Page specification](index.md).

## Component Specifications

### 1. Header Component

```tsx
// src/components/Header.tsx
'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { playfulSpring, tapSquish } from '@/lib/animations';

interface HeaderProps {
  brandName: string;
  navItems: Array<{ label: string; href: string }>;
  ctaText: string;
  ctaHref: string;
}

export function Header({ brandName, navItems, ctaText, ctaHref }: HeaderProps) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={playfulSpring}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-zinc-100"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            {/* Colorful shape logo */}
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-play-blue" />
              <div className="w-3 h-3 rounded-full bg-play-pink" />
              <div className="w-3 h-3 rounded-full bg-play-yellow" />
            </div>
            <span className="font-bold text-lg">{brandName}</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.div
                key={item.href}
                whileHover={{ y: -2 }}
                transition={playfulSpring}
              >
                <Link
                  href={item.href}
                  className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px -5px rgba(59, 130, 246, 0.4)' }}
            whileTap={tapSquish}
            transition={playfulSpring}
          >
            <Link
              href={ctaHref}
              className="btn-play-primary"
            >
              {ctaText}
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
```

---

### 2. Hero Component

```tsx
// src/components/Hero.tsx
'use client';

import { motion } from 'motion/react';
import { staggerContainer, staggerItem, playfulSpring, tapSquish } from '@/lib/animations';
import { FloatingShape } from './FloatingShape';

interface HeroProps {
  headline: string[];
  subtext: string;
  primaryCta: { text: string; href: string };
  secondaryCta: { text: string; href: string };
}

export function Hero({ headline, subtext, primaryCta, secondaryCta }: HeroProps) {
  // Split headline into colorful words
  const colors = ['text-play-blue', 'text-play-pink', 'text-play-yellow'];

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingShape type="circle" color="blue" size={100} position={{ x: '8%', y: '20%' }} />
        <FloatingShape type="triangle" color="pink" size={70} position={{ x: '85%', y: '15%' }} rotate={20} />
        <FloatingShape type="square" color="yellow" size={60} position={{ x: '75%', y: '60%' }} rotate={-15} />
        <FloatingShape type="circle" color="green" size={50} position={{ x: '12%', y: '70%' }} delay={1} />
        <FloatingShape type="triangle" color="purple" size={45} position={{ x: '90%', y: '75%' }} rotate={10} delay={1.5} />
        <FloatingShape type="square" color="orange" size={40} position={{ x: '5%', y: '50%' }} rotate={25} delay={2} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Headline with colored words */}
          <motion.h1
            variants={staggerItem}
            className="text-play-display mb-8"
          >
            {headline.map((word, index) => (
              <span
                key={index}
                className={`block ${colors[index % colors.length]}`}
              >
                {word}
              </span>
            ))}
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={staggerItem}
            className="text-play-subtitle max-w-xl mx-auto mb-12"
          >
            {subtext}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={staggerItem}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a
              href={primaryCta.href}
              className="btn-play-primary"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px -5px rgba(59, 130, 246, 0.4)' }}
              whileTap={tapSquish}
              transition={playfulSpring}
            >
              {primaryCta.text}
            </motion.a>
            <motion.a
              href={secondaryCta.href}
              className="btn-play-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={tapSquish}
              transition={playfulSpring}
            >
              {secondaryCta.text}
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
```

---

### 3. Logo Marquee Component

```tsx
// src/components/LogoMarquee.tsx
'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

interface LogoMarqueeProps {
  logos: Array<{ src: string; alt: string }>;
}

export function LogoMarquee({ logos }: LogoMarqueeProps) {
  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section className="py-16 overflow-hidden bg-zinc-50">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <p className="text-play-caption text-zinc-400">
          Trusted by teams at
        </p>
      </div>

      <div className="relative">
        <motion.div
          className="flex gap-16 items-center"
          animate={{ x: [0, -1920] }}
          transition={{
            x: {
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            },
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <motion.div
              key={index}
              className="shrink-0 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              whileHover={{ scale: 1.1, y: -5 }}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

---

### 4. Features Bento Grid

```tsx
// src/components/FeaturesBento.tsx
'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { staggerContainer, staggerItem, playfulSpring, hoverLift } from '@/lib/animations';

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: 'blue' | 'pink' | 'yellow' | 'green' | 'purple';
  size: 'small' | 'medium' | 'large';
}

interface FeaturesBentoProps {
  features: Feature[];
}

const colorClasses = {
  blue: 'bg-play-blue text-white',
  pink: 'bg-play-pink text-white',
  yellow: 'bg-play-yellow text-zinc-900',
  green: 'bg-play-green text-white',
  purple: 'bg-play-purple text-white',
};

const sizeClasses = {
  small: 'col-span-1 row-span-1',
  medium: 'col-span-1 md:col-span-2 row-span-1',
  large: 'col-span-1 md:col-span-2 row-span-2',
};

export function FeaturesBento({ features }: FeaturesBentoProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section ref={ref} className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              whileHover={hoverLift}
              className={`
                ${colorClasses[feature.color]}
                ${sizeClasses[feature.size]}
                rounded-3xl p-8 cursor-pointer
              `}
            >
              {/* Icon */}
              <div className="mb-6 text-4xl">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-play-title text-2xl mb-4">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="opacity-90">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

---

### 5. How It Works Section

```tsx
// src/components/HowItWorks.tsx
'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { staggerContainer, staggerItem, playfulSpring } from '@/lib/animations';

interface Step {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: 'blue' | 'pink' | 'yellow';
}

interface HowItWorksProps {
  headline: string;
  steps: Step[];
}

const colorClasses = {
  blue: 'bg-play-blue',
  pink: 'bg-play-pink',
  yellow: 'bg-play-yellow',
};

export function HowItWorks({ headline, steps }: HowItWorksProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={playfulSpring}
          className="text-play-headline text-center mb-20"
        >
          {headline}
        </motion.h2>

        {/* Steps */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="text-center relative"
            >
              {/* Connector line (not on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-zinc-200">
                  <motion.div
                    className={`h-full ${colorClasses[step.color]}`}
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ delay: 0.5 + index * 0.2, duration: 0.5 }}
                    style={{ transformOrigin: 'left' }}
                  />
                </div>
              )}

              {/* Circle with icon */}
              <motion.div
                className={`
                  w-32 h-32 mx-auto mb-8 rounded-full
                  ${colorClasses[step.color]}
                  flex items-center justify-center text-white text-4xl
                  shadow-lg
                `}
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={playfulSpring}
              >
                {step.icon}
              </motion.div>

              {/* Number */}
              <p className="text-play-caption text-zinc-400 mb-2">
                Step {step.number}
              </p>

              {/* Title */}
              <h3 className="text-play-title text-xl mb-4">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-play-body max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

---

### 6. Testimonials Section

```tsx
// src/components/Testimonials.tsx
'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import Image from 'next/image';
import { staggerContainer, staggerItem, playfulSpring } from '@/lib/animations';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rotation: number;
}

interface TestimonialsProps {
  headline: string;
  testimonials: Testimonial[];
}

export function Testimonials({ headline, testimonials }: TestimonialsProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section ref={ref} className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={playfulSpring}
          className="text-play-headline text-center mb-20"
        >
          {headline}
        </motion.h2>

        {/* Testimonial cards with random rotation */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              whileHover={{
                y: -10,
                rotate: 0,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
              }}
              transition={playfulSpring}
              className="bg-white rounded-3xl p-8 shadow-card cursor-pointer"
              style={{ rotate: `${testimonial.rotation}deg` }}
            >
              {/* Quote */}
              <p className="text-play-body-lg text-zinc-800 mb-8">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold text-zinc-900">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-zinc-500">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

---

### 7. Pricing Section

```tsx
// src/components/Pricing.tsx
'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { staggerContainer, staggerItem, playfulSpring, tapSquish } from '@/lib/animations';

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
  popular?: boolean;
  color: 'blue' | 'pink' | 'purple';
}

interface PricingProps {
  headline: string;
  tiers: PricingTier[];
}

const borderColorClasses = {
  blue: 'border-play-blue',
  pink: 'border-play-pink',
  purple: 'border-play-purple',
};

const bgColorClasses = {
  blue: 'bg-play-blue',
  pink: 'bg-play-pink',
  purple: 'bg-play-purple',
};

export function Pricing({ headline, tiers }: PricingProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-zinc-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={playfulSpring}
          className="text-play-headline text-center mb-20"
        >
          {headline}
        </motion.h2>

        {/* Pricing cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={playfulSpring}
              className={`
                relative bg-white rounded-[40px] p-8 shadow-card
                ${tier.popular ? `border-4 ${borderColorClasses[tier.color]}` : 'border border-zinc-100'}
              `}
            >
              {/* Popular badge */}
              {tier.popular && (
                <div className={`
                  absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1
                  ${bgColorClasses[tier.color]} text-white text-sm font-semibold
                  rounded-full
                `}>
                  Most Popular
                </div>
              )}

              {/* Name */}
              <h3 className="text-xl font-semibold text-zinc-900 mb-2">
                {tier.name}
              </h3>

              {/* Price */}
              <div className="mb-4">
                <span className="text-5xl font-bold text-zinc-900">
                  {tier.price}
                </span>
                <span className="text-zinc-500">
                  /{tier.period}
                </span>
              </div>

              {/* Description */}
              <p className="text-zinc-500 mb-8">
                {tier.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <span className={`w-5 h-5 rounded-full ${bgColorClasses[tier.color]} flex items-center justify-center`}>
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                      </svg>
                    </span>
                    <span className="text-zinc-600">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <motion.a
                href={tier.ctaHref}
                className={`
                  block w-full py-4 text-center font-semibold rounded-full
                  ${tier.popular
                    ? `${bgColorClasses[tier.color]} text-white`
                    : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200'
                  }
                  transition-colors
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={tapSquish}
                transition={playfulSpring}
              >
                {tier.ctaText}
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

---

### 8. CTA Section

```tsx
// src/components/CTA.tsx
'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { playfulSpring, tapSquish } from '@/lib/animations';
import { FloatingShape } from './FloatingShape';

interface CTAProps {
  headline: string;
  subtext: string;
  buttonText: string;
  buttonHref: string;
}

export function CTA({ headline, subtext, buttonText, buttonHref }: CTAProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section ref={ref} className="py-24 md:py-32 relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingShape type="circle" color="blue" size={120} position={{ x: '5%', y: '20%' }} />
        <FloatingShape type="triangle" color="pink" size={80} position={{ x: '90%', y: '15%' }} rotate={15} />
        <FloatingShape type="square" color="yellow" size={60} position={{ x: '85%', y: '70%' }} rotate={-20} />
        <FloatingShape type="circle" color="green" size={50} position={{ x: '10%', y: '75%' }} delay={1} />
        <FloatingShape type="triangle" color="purple" size={70} position={{ x: '50%', y: '80%' }} rotate={30} delay={1.5} />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={playfulSpring}
          className="text-play-headline mb-6"
        >
          {headline}
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ ...playfulSpring, delay: 0.1 }}
          className="text-play-subtitle mb-12"
        >
          {subtext}
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ ...playfulSpring, delay: 0.2 }}
        >
          <motion.a
            href={buttonHref}
            className="btn-play-primary btn-play-lg"
            whileHover={{ scale: 1.1, boxShadow: '0 15px 40px -5px rgba(59, 130, 246, 0.5)' }}
            whileTap={tapSquish}
            transition={playfulSpring}
          >
            {buttonText}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
```

---

### 9. Footer Component

```tsx
// src/components/Footer.tsx
'use client';

import { motion } from 'motion/react';
import Link from 'next/link';

interface FooterProps {
  brandName: string;
  columns: Array<{
    title: string;
    links: Array<{ label: string; href: string }>;
  }>;
  socialLinks: Array<{ icon: React.ReactNode; href: string; label: string }>;
}

export function Footer({ brandName, columns, socialLinks }: FooterProps) {
  return (
    <footer className="bg-zinc-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-play-blue" />
                <div className="w-3 h-3 rounded-full bg-play-pink" />
                <div className="w-3 h-3 rounded-full bg-play-yellow" />
              </div>
              <span className="font-bold text-lg">{brandName}</span>
            </div>

            {/* Social links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-zinc-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((column, index) => (
            <div key={index}>
              <h4 className="font-semibold text-sm text-zinc-400 uppercase tracking-wider mb-4">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-zinc-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} {brandName}. All rights reserved.
          </p>

          {/* Decorative shapes */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-play-blue" />
            <div className="w-2 h-2 rounded-sm bg-play-pink" />
            <div
              className="w-0 h-0"
              style={{
                borderLeft: '4px solid transparent',
                borderRight: '4px solid transparent',
                borderBottom: '7px solid #FBBF24',
              }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
```
