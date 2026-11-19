# Japanese Minimalist Landing Page: Page Sections

Part of the [Japanese Minimalist Landing Page specification](index.md).

## Component Specifications

### 1. Header Component

```tsx
// src/components/Header.tsx
'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { fadeIn } from '@/lib/animations';

interface HeaderProps {
  brandName: string;
  navItems: Array<{ label: string; href: string }>;
}

export function Header({ brandName, navItems }: HeaderProps) {
  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="fixed top-0 left-0 right-0 z-50 bg-washi/80 backdrop-blur-xs"
    >
      <div className="container-zen">
        <div className="flex items-center justify-between h-20">
          {/* Navigation - Left */}
          <nav className="flex items-center gap-12">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-zen-label text-sumi-light hover:text-sumi transition-colors duration-800 ease-zen"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Brand Mark - Right */}
          <Link
            href="/"
            className="text-zen-caption text-sumi tracking-widest"
          >
            {brandName}
          </Link>
        </div>
      </div>

      {/* Subtle bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-sumi/10 to-transparent" />
    </motion.header>
  );
}
```

**Header CSS (in globals.css):**

```css
@layer components {
  .header-zen {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
    background-color: rgba(250, 249, 247, 0.8);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }

  .header-nav-link {
    font-family: var(--font-inter);
    font-weight: 400;
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--color-sumi-light);
    text-decoration: none;
    transition: color 0.8s cubic-bezier(0.25, 0.1, 0.25, 1);
  }

  .header-nav-link:hover {
    color: var(--color-sumi);
  }
}
```

---

### 2. Hero Component

```tsx
// src/components/Hero.tsx
'use client';

import { motion } from 'motion/react';
import { staggerContainer, staggerItem, lineDraw } from '@/lib/animations';

interface HeroProps {
  headline: string[];
  subtitle: string;
  ctaText: string;
  ctaHref: string;
}

export function Hero({ headline, subtitle, ctaText, ctaHref }: HeroProps) {
  return (
    <section className="min-h-screen flex items-center section-ma texture-washi">
      <div className="container-zen">
        <motion.div
          className="content-offset-left"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Headline - Stacked Words */}
          <div className="mb-16">
            {headline.map((word, index) => (
              <motion.h1
                key={index}
                variants={staggerItem}
                className="text-zen-display block"
              >
                {word}
              </motion.h1>
            ))}
          </div>

          {/* Divider Line */}
          <motion.div
            variants={lineDraw}
            className="w-16 h-px bg-sumi/30 mb-12"
          />

          {/* Subtitle */}
          <motion.p
            variants={staggerItem}
            className="text-zen-body max-w-xs mb-16"
          >
            {subtitle}
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={staggerItem}>
            <a
              href={ctaHref}
              className="btn-zen-minimal"
            >
              {ctaText}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
```

**Hero CSS:**

```css
@layer components {
  .hero-zen {
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding-top: 200px;
    padding-bottom: 200px;
  }

  .hero-headline-word {
    font-family: var(--font-cormorant);
    font-weight: 300;
    font-size: clamp(48px, 10vw, 140px);
    line-height: 0.95;
    letter-spacing: -0.03em;
    color: var(--color-sumi);
    display: block;
  }
}
```

---

### 3. Philosophy / Quote Section

```tsx
// src/components/Philosophy.tsx
'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { fadeIn, lineDraw } from '@/lib/animations';

interface PhilosophyProps {
  quote: string;
  attribution?: string;
}

export function Philosophy({ quote, attribution }: PhilosophyProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-150px' });

  return (
    <section ref={ref} className="section-ma-lg">
      <div className="container-zen">
        <div className="max-w-3xl mx-auto text-center">
          {/* Top decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-12 h-px bg-sumi/20 mx-auto mb-16 origin-center"
          />

          {/* Quote */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-zen-headline text-sumi/90 mb-12"
          >
            "{quote}"
          </motion.blockquote>

          {/* Attribution */}
          {attribution && (
            <motion.cite
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1.2, delay: 0.6 }}
              className="text-zen-caption text-sumi-faint not-italic"
            >
              - {attribution}
            </motion.cite>
          )}

          {/* Bottom decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.5, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-12 h-px bg-sumi/20 mx-auto mt-16 origin-center"
          />
        </div>
      </div>
    </section>
  );
}
```

---

### 4. Feature Section (Asymmetric)

```tsx
// src/components/Feature.tsx
'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import Image from 'next/image';

interface FeatureProps {
  number: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
}

export function Feature({
  number,
  title,
  description,
  imageSrc,
  imageAlt,
  reverse = false,
}: FeatureProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="section-ma">
      <div className="container-zen">
        <div className={`grid-asymmetric ${reverse ? 'grid-asymmetric-reverse' : ''}`}>
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
            className={`relative aspect-4/5 overflow-hidden ${reverse ? 'order-2' : 'order-1'}`}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover grayscale contrast-[1.05]"
            />
          </motion.div>

          {/* Content */}
          <div className={`flex flex-col justify-center ${reverse ? 'order-1' : 'order-2'}`}>
            {/* Number */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="text-zen-number mb-8"
            >
              {number}
            </motion.span>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-zen-title mb-8"
            >
              {title}
            </motion.h2>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-12 h-px bg-sumi/20 mb-8 origin-left"
            />

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-zen-body max-w-sm"
            >
              {description}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Feature CSS:**

```css
@layer components {
  .feature-image-zen {
    position: relative;
    aspect-ratio: 4 / 5;
    overflow: hidden;
  }

  .feature-image-zen img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%) contrast(1.05);
    transition: filter 1.5s cubic-bezier(0.25, 0.1, 0.25, 1);
  }

  /* Optional: subtle color on hover */
  .feature-image-zen:hover img {
    filter: grayscale(70%) contrast(1.02);
  }
}
```

---

### 5. Full Bleed Image Section

```tsx
// src/components/FullBleedImage.tsx
'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import Image from 'next/image';

interface FullBleedImageProps {
  imageSrc: string;
  imageAlt: string;
  caption?: string;
}

export function FullBleedImage({ imageSrc, imageAlt, caption }: FullBleedImageProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} className="section-ma-sm">
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative w-full aspect-video md:aspect-21/9"
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover grayscale"
        />

        {/* Caption overlay */}
        {caption && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="absolute bottom-8 left-8 md:bottom-12 md:left-12"
          >
            <p className="text-zen-caption text-washi/80">
              {caption}
            </p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
```

---

### 6. Vertical Accent Divider

```tsx
// src/components/VerticalAccent.tsx
'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

interface VerticalAccentProps {
  kanji: string;
  meaning: string;
}

export function VerticalAccent({ kanji, meaning }: VerticalAccentProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="section-ma-sm">
      <div className="container-zen">
        <div className="flex items-center gap-8">
          {/* Vertical Kanji */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-vertical text-kanji text-2xl text-sumi/30 tracking-widest"
          >
            {kanji}
          </motion.div>

          {/* Horizontal Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex-1 h-px bg-sumi/10 origin-left"
          />

          {/* Meaning */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="text-zen-label"
          >
            {meaning}
          </motion.span>
        </div>
      </div>
    </section>
  );
}
```

---

### 7. Principles Section (Three Columns)

```tsx
// src/components/Principles.tsx
'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

interface Principle {
  kanji: string;
  romaji: string;
  title: string;
  description: string;
}

interface PrinciplesProps {
  principles: Principle[];
}

export function Principles({ principles }: PrinciplesProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="section-ma">
      <div className="container-zen">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.romaji}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 1.5,
                delay: 0.2 * index,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-center"
            >
              {/* Kanji */}
              <p className="text-kanji text-4xl md:text-5xl text-sumi/20 mb-4">
                {principle.kanji}
              </p>

              {/* Romaji */}
              <p className="text-zen-caption mb-8">
                {principle.romaji}
              </p>

              {/* Title */}
              <h3 className="text-zen-title mb-6">
                {principle.title}
              </h3>

              {/* Description */}
              <p className="text-zen-body text-sm max-w-xs mx-auto">
                {principle.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### 8. Testimonial Section

```tsx
// src/components/Testimonial.tsx
'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export function Testimonial({ quote, author, role, company }: TestimonialProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-150px' });

  return (
    <section ref={ref} className="section-ma-lg bg-washi-warm texture-washi">
      <div className="container-zen">
        <div className="max-w-2xl mx-auto text-center">
          {/* Quote */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-zen-headline text-2xl md:text-3xl mb-16"
          >
            "{quote}"
          </motion.blockquote>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-8 h-px bg-sumi/20 mx-auto mb-8 origin-center"
          />

          {/* Author Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.2, delay: 0.6 }}
          >
            <p className="text-zen-body-large text-sumi mb-2">
              {author}
            </p>
            <p className="text-zen-caption text-sumi-faint">
              {role}, {company}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

---

### 9. CTA Section

```tsx
// src/components/CTA.tsx
'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

interface CTAProps {
  headline: string;
  buttonText: string;
  buttonHref: string;
}

export function CTA({ headline, buttonText, buttonHref }: CTAProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="section-ma-lg">
      <div className="container-zen">
        <div className="max-w-lg mx-auto text-center">
          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-zen-headline mb-16"
          >
            {headline}
          </motion.h2>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            <a href={buttonHref} className="btn-zen-minimal">
              {buttonText}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

---

### 10. Footer Component

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
    <footer ref={ref} className="section-ma-sm border-t border-sumi/5">
      <div className="container-zen">
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="mb-16"
        >
          <p className="text-zen-title">{brandName}</p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full h-px bg-sumi/10 mb-12 origin-left"
        />

        {/* Bottom Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8"
        >
          {/* Links */}
          <nav className="flex flex-wrap gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-zen-label text-sumi-light hover:text-sumi transition-colors duration-800"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social */}
          <div className="flex items-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-sumi-light hover:text-sumi transition-colors duration-800"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-zen-label text-sumi-faint">
            © {new Date().getFullYear()}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
```
