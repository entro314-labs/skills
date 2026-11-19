# Japanese Minimalist Landing Page: Sample Data and Page Assembly

Part of the [Japanese Minimalist Landing Page specification](index.md).

## Sample Data Structure

```typescript
// src/data/content.ts

export interface SiteContent {
  brand: {
    name: string;
  };
  navigation: Array<{
    label: string;
    href: string;
  }>;
  hero: {
    headline: string[];
    subtitle: string;
    cta: {
      text: string;
      href: string;
    };
  };
  philosophy: {
    quote: string;
    attribution?: string;
  };
  features: Array<{
    number: string;
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
  }>;
  principles: Array<{
    kanji: string;
    romaji: string;
    title: string;
    description: string;
  }>;
  testimonial: {
    quote: string;
    author: string;
    role: string;
    company: string;
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
    name: 'MUJI',
  },
  navigation: [
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#work' },
    { label: 'Contact', href: '#contact' },
  ],
  hero: {
    headline: ['LESS', 'IS', 'MORE'],
    subtitle: 'A meditation on essential design. Where space itself becomes the message.',
    cta: {
      text: 'Explore',
      href: '#about',
    },
  },
  philosophy: {
    quote: 'The space between things is as important as the things themselves.',
    attribution: 'Japanese Design Philosophy',
  },
  features: [
    {
      number: '01',
      title: 'Intentional Simplicity',
      description: 'Every element serves a purpose. Nothing is added for decoration alone. What remains is essential.',
      imageSrc: '/images/feature-01.jpg',
      imageAlt: 'Minimal interior space',
    },
    {
      number: '02',
      title: 'Natural Materials',
      description: 'Wood, paper, stone. Materials that age gracefully and connect us to the natural world.',
      imageSrc: '/images/feature-02.jpg',
      imageAlt: 'Natural wood texture',
    },
    {
      number: '03',
      title: 'Thoughtful Restraint',
      description: 'The courage to leave out. To trust in emptiness. To let the essential speak for itself.',
      imageSrc: '/images/feature-03.jpg',
      imageAlt: 'Empty room with single object',
    },
  ],
  principles: [
    {
      kanji: '間',
      romaji: 'MA',
      title: 'Negative Space',
      description: 'Space is not empty-it is a presence. The pause between notes that gives music meaning.',
    },
    {
      kanji: '簡素',
      romaji: 'KANSO',
      title: 'Simplicity',
      description: 'Eliminate the unnecessary. What remains is clarity, purpose, and essential beauty.',
    },
    {
      kanji: '侘寂',
      romaji: 'WABI-SABI',
      title: 'Imperfection',
      description: 'Beauty in the imperfect, impermanent, and incomplete. The crack in the pottery.',
    },
  ],
  testimonial: {
    quote: 'The simplicity brought clarity to everything we do. It changed how we think about our work.',
    author: 'Takeshi Yamamoto',
    role: 'Creative Director',
    company: 'Studio Zero',
  },
  cta: {
    headline: 'Begin your journey',
    buttonText: 'Start',
    buttonHref: '/contact',
  },
  footer: {
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'Contact', href: '/contact' },
    ],
  },
};
```

---

## Complete Page Assembly

```tsx
// src/app/page.tsx
'use client';

import { useZenScroll } from '@/hooks/useZenScroll';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Philosophy } from '@/components/Philosophy';
import { Feature } from '@/components/Feature';
import { VerticalAccent } from '@/components/VerticalAccent';
import { FullBleedImage } from '@/components/FullBleedImage';
import { Principles } from '@/components/Principles';
import { Testimonial } from '@/components/Testimonial';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';
import { Twitter, Instagram, LinkedIn } from '@/components/icons/ZenIcons';
import { sampleContent } from '@/data/content';

export default function Home() {
  useZenScroll();

  const { brand, navigation, hero, philosophy, features, principles, testimonial, cta, footer } = sampleContent;

  return (
    <main className="texture-washi">
      <Header
        brandName={brand.name}
        navItems={navigation}
      />

      <Hero
        headline={hero.headline}
        subtitle={hero.subtitle}
        ctaText={hero.cta.text}
        ctaHref={hero.cta.href}
      />

      <Philosophy
        quote={philosophy.quote}
        attribution={philosophy.attribution}
      />

      <Feature
        {...features[0]}
        reverse={false}
      />

      <VerticalAccent
        kanji="本質的"
        meaning="ESSENTIAL"
      />

      <Feature
        {...features[1]}
        reverse={true}
      />

      <FullBleedImage
        imageSrc="/images/full-bleed.jpg"
        imageAlt="Contemplative space"
        caption="The beauty of restraint"
      />

      <Feature
        {...features[2]}
        reverse={false}
      />

      <Principles principles={principles} />

      <Testimonial {...testimonial} />

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
          { icon: <Instagram />, href: '#', label: 'Instagram' },
          { icon: <LinkedIn />, href: '#', label: 'LinkedIn' },
        ]}
      />
    </main>
  );
}
```
