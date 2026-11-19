# Cinematic Dark Landing Page: Page Sections

Part of the [Cinematic Dark Landing Page specification](index.md).

## Component Specifications

### 1. Header Component

```tsx
// src/components/Header.tsx
'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import Link from 'next/link';

interface HeaderProps {
  brandName: string;
  ctaText: string;
  ctaHref: string;
}

export function Header({ brandName, ctaText, ctaHref }: HeaderProps) {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [0, 1]);
  const blur = useTransform(scrollY, [0, 100], [0, 20]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
      }}
    >
      {/* Background that fades in on scroll */}
      <motion.div
        className="absolute inset-0 bg-void/80 border-b border-glass-border"
        style={{ opacity }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-sm font-medium text-white tracking-wide"
          >
            {brandName}
          </Link>

          {/* CTA */}
          <Link
            href={ctaHref}
            className="btn-cinematic-sm"
          >
            {ctaText}
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
```

**Header Button CSS:**

```css
@layer components {
  .btn-cinematic-sm {
    padding: 8px 16px;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #FAFAFA;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.02em;
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .btn-cinematic-sm:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.3);
  }
}
```

---

### 2. Hero Section

```tsx
// src/components/Hero.tsx
'use client';

import { motion } from 'motion/react';
import { staggerContainer, staggerItem, slideUp } from '@/lib/animations';

interface HeroProps {
  headline: string;
  subtext: string;
  ctaText: string;
  ctaHref: string;
}

export function Hero({ headline, subtext, ctaText, ctaHref }: HeroProps) {
  return (
    <section className="section-viewport relative">
      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center px-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Headline */}
        <motion.h1
          variants={slideUp}
          className="text-cinematic-headline mb-8"
        >
          {headline}
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={staggerItem}
          className="text-cinematic-body mx-auto mb-12"
        >
          {subtext}
        </motion.p>

        {/* CTA */}
        <motion.div variants={staggerItem}>
          <a href={ctaHref} className="btn-cinematic">
            {ctaText}
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
          className="w-6 h-10 border border-glass-border rounded-full flex justify-center pt-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 bg-white/50 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
```

**Section CSS:**

```css
@layer components {
  .section-viewport {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 120px 0;
  }
}
```

---

### 3. Product Showcase Section

```tsx
// src/components/ProductShowcase.tsx
'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import Image from 'next/image';
import { GlassPanel } from './GlassPanel';
import { scaleIn, slideUp } from '@/lib/animations';

interface ProductShowcaseProps {
  imageSrc: string;
  imageAlt: string;
  tagline: string;
}

export function ProductShowcase({ imageSrc, imageAlt, tagline }: ProductShowcaseProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section ref={ref} className="section-viewport">
      <div className="relative max-w-5xl mx-auto px-6 text-center">
        {/* Product in glass panel */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={scaleIn}
        >
          <GlassPanel
            glow="indigo"
            enableMouseParallax
            className="p-4 md:p-8 mb-12"
          >
            {/* Blur layer for depth */}
            <div className="absolute inset-0 -z-10">
              <Image
                src={imageSrc}
                alt=""
                fill
                className="object-cover blur-3xl opacity-30 scale-110"
              />
            </div>

            {/* Product mockup with perspective */}
            <div className="relative" style={{ perspective: '1000px' }}>
              <motion.div
                className="relative"
                style={{ transform: 'rotateX(2deg)' }}
                whileHover={{ rotateX: 0, scale: 1.02 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  width={1200}
                  height={800}
                  className="rounded-lg"
                />
              </motion.div>
            </div>
          </GlassPanel>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={slideUp}
          className="text-cinematic-subtitle"
        >
          {tagline}
        </motion.p>
      </div>
    </section>
  );
}
```

---

### 4. Feature Section

```tsx
// src/components/Feature.tsx
'use client';

import { motion, useInView } from 'motion/react';
import { useRef, ReactNode } from 'react';
import { slideUp, staggerContainer, staggerItem } from '@/lib/animations';
import { useParallax } from '@/hooks/useParallax';

interface FeatureProps {
  headline: string;
  subtext?: string;
  visual: ReactNode;
  visualPosition?: 'above' | 'below';
}

export function Feature({
  headline,
  subtext,
  visual,
  visualPosition = 'below',
}: FeatureProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const { ref: parallaxRef, y } = useParallax({ speed: 0.15 });

  return (
    <section ref={ref} className="section-viewport">
      <motion.div
        className="max-w-5xl mx-auto px-6 text-center"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Visual above text */}
        {visualPosition === 'above' && (
          <motion.div
            ref={parallaxRef}
            style={{ y }}
            variants={staggerItem}
            className="mb-16"
          >
            {visual}
          </motion.div>
        )}

        {/* Headline */}
        <motion.h2
          variants={slideUp}
          className="text-cinematic-title mb-6"
        >
          {headline}
        </motion.h2>

        {/* Subtext */}
        {subtext && (
          <motion.p
            variants={staggerItem}
            className="text-cinematic-body mx-auto"
          >
            {subtext}
          </motion.p>
        )}

        {/* Visual below text */}
        {visualPosition === 'below' && (
          <motion.div
            ref={parallaxRef}
            style={{ y }}
            variants={staggerItem}
            className="mt-16"
          >
            {visual}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
```

---

### 5. Full-Width Visual Section

```tsx
// src/components/FullWidthVisual.tsx
'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import Image from 'next/image';
import { slideUp } from '@/lib/animations';

interface FullWidthVisualProps {
  imageSrc: string;
  imageAlt: string;
  headline?: string;
}

export function FullWidthVisual({ imageSrc, imageAlt, headline }: FullWidthVisualProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="section-viewport">
      <div className="w-full max-w-7xl mx-auto px-6">
        {/* Full-width image with glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Glow behind image */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1/2 bg-linear-to-t from-accent-glow to-transparent blur-3xl" />
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-glass-border">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={1920}
              height={1080}
              className="w-full"
            />
          </div>
        </motion.div>

        {/* Optional headline */}
        {headline && (
          <motion.h2
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={slideUp}
            className="text-cinematic-title text-center mt-16"
          >
            {headline}
          </motion.h2>
        )}
      </div>
    </section>
  );
}
```

---

### 6. Quote Section

```tsx
// src/components/Quote.tsx
'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

interface QuoteProps {
  text: string;
  author: string;
  role?: string;
}

export function Quote({ text, author, role }: QuoteProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });

  return (
    <section ref={ref} className="section-viewport">
      <div className="max-w-3xl mx-auto px-6 text-center">
        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-cinematic-md text-white/90 mb-12"
        >
          "{text}"
        </motion.blockquote>

        {/* Attribution */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <p className="text-white/80 font-medium mb-1">
            {author}
          </p>
          {role && (
            <p className="text-cinematic-caption">
              {role}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
```

---

### 7. CTA Section

```tsx
// src/components/CTA.tsx
'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { slideUp, staggerContainer, staggerItem } from '@/lib/animations';

interface CTAProps {
  headline: string;
  buttonText: string;
  buttonHref: string;
}

export function CTA({ headline, buttonText, buttonHref }: CTAProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });

  return (
    <section ref={ref} className="section-viewport">
      <motion.div
        className="max-w-2xl mx-auto px-6 text-center"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Headline */}
        <motion.h2
          variants={slideUp}
          className="text-cinematic-title mb-12"
        >
          {headline}
        </motion.h2>

        {/* Button */}
        <motion.div variants={staggerItem}>
          <a href={buttonHref} className="btn-cinematic btn-cinematic-glow">
            {buttonText}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
```

---

### 8. Footer Component

```tsx
// src/components/Footer.tsx
'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import Link from 'next/link';

interface FooterProps {
  brandName: string;
  links: Array<{ label: string; href: string }>;
  socialLinks: Array<{ icon: React.ReactNode; href: string; label: string }>;
}

export function Footer({ brandName, links, socialLinks }: FooterProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <footer ref={ref} className="relative py-24 border-t border-glass-border">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16"
        >
          {/* Brand */}
          <Link href="/" className="text-lg font-medium text-white">
            {brandName}
          </Link>

          {/* Links + Social */}
          <div className="flex flex-wrap items-center gap-8">
            {/* Links */}
            <nav className="flex gap-6">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/50 hover:text-white transition-colors duration-400"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Social */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-white/50 hover:text-white transition-colors duration-400"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-px bg-glass-border mb-8 origin-left"
        />

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-sm text-white/30">
            © {new Date().getFullYear()} {brandName}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
```
