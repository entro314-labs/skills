# Cinematic Dark Landing Page: Sample Data and Page Assembly

Part of the [Cinematic Dark Landing Page specification](index.md).

## Sample Data Structure

```typescript
// src/data/content.ts

export interface SiteContent {
  brand: {
    name: string;
  };
  hero: {
    headline: string;
    subtext: string;
    cta: {
      text: string;
      href: string;
    };
  };
  productShowcase: {
    imageSrc: string;
    imageAlt: string;
    tagline: string;
  };
  features: Array<{
    headline: string;
    subtext?: string;
    visualSrc?: string;
  }>;
  quote?: {
    text: string;
    author: string;
    role?: string;
  };
  cta: {
    headline: string;
    buttonText: string;
    buttonHref: string;
  };
  footer: {
    links: Array<{
      label: string;
      href: string;
    }>;
  };
}

export const sampleContent: SiteContent = {
  brand: {
    name: 'Linear',
  },
  hero: {
    headline: 'Build software\nat the speed of thought',
    subtext: 'The issue tracking tool you\'ll actually enjoy using.',
    cta: {
      text: 'Get Started',
      href: '#',
    },
  },
  productShowcase: {
    imageSrc: '/images/product.png',
    imageAlt: 'Linear interface',
    tagline: 'Designed for modern software teams.',
  },
  features: [
    {
      headline: 'Made for keyboard-first workflows',
      subtext: 'Navigate, create, and manage without reaching for your mouse.',
    },
    {
      headline: 'Integrates with your stack',
      visualSrc: '/images/integrations.png',
    },
  ],
  quote: {
    text: 'Linear is the tool we\'ve always wanted for issue tracking.',
    author: 'Guillermo Rauch',
    role: 'CEO, Vercel',
  },
  cta: {
    headline: 'Ready to build?',
    buttonText: 'Start for free',
    buttonHref: '#',
  },
  footer: {
    links: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Docs', href: '#' },
      { label: 'Privacy', href: '#' },
    ],
  },
};
```

---

## Complete Page Assembly

```tsx
// src/app/page.tsx
'use client';

import { useCinematicScroll } from '@/hooks/useCinematicScroll';
import { CinematicBackground } from '@/components/CinematicBackground';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ProductShowcase } from '@/components/ProductShowcase';
import { Feature } from '@/components/Feature';
import { FullWidthVisual } from '@/components/FullWidthVisual';
import { Quote } from '@/components/Quote';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';
import { GlassPanel } from '@/components/GlassPanel';
import { Twitter, GitHub, Discord } from '@/components/icons/CinematicIcons';
import { sampleContent } from '@/data/content';
import Image from 'next/image';

export default function Home() {
  useCinematicScroll();

  const { brand, hero, productShowcase, features, quote, cta, footer } = sampleContent;

  return (
    <>
      <CinematicBackground />

      <main className="relative z-10">
        <Header
          brandName={brand.name}
          ctaText="Get Started"
          ctaHref="#"
        />

        <Hero
          headline={hero.headline}
          subtext={hero.subtext}
          ctaText={hero.cta.text}
          ctaHref={hero.cta.href}
        />

        <ProductShowcase
          imageSrc={productShowcase.imageSrc}
          imageAlt={productShowcase.imageAlt}
          tagline={productShowcase.tagline}
        />

        <Feature
          headline={features[0].headline}
          subtext={features[0].subtext}
          visual={
            <GlassPanel className="p-8" glow="emerald">
              <div className="h-64 flex items-center justify-center text-white/30">
                Keyboard visualization
              </div>
            </GlassPanel>
          }
        />

        <FullWidthVisual
          imageSrc={features[1].visualSrc!}
          imageAlt="Integrations"
          headline={features[1].headline}
        />

        {quote && (
          <Quote
            text={quote.text}
            author={quote.author}
            role={quote.role}
          />
        )}

        <CTA
          headline={cta.headline}
          buttonText={cta.buttonText}
          buttonHref={cta.buttonHref}
        />

        <Footer
          brandName={brand.name}
          links={footer.links}
          socialLinks={[
            { icon: <Twitter />, href: '#', label: 'Twitter' },
            { icon: <GitHub />, href: '#', label: 'GitHub' },
            { icon: <Discord />, href: '#', label: 'Discord' },
          ]}
        />
      </main>
    </>
  );
}
```
