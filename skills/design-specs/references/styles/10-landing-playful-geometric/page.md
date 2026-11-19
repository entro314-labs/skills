# Playful Geometric Landing Page: Sample Data and Page Assembly

Part of the [Playful Geometric Landing Page specification](index.md).

## Sample Data Structure

```typescript
// src/data/content.ts

export interface SiteContent {
  brand: {
    name: string;
  };
  navigation: Array<{ label: string; href: string }>;
  hero: {
    headline: string[];
    subtext: string;
    primaryCta: { text: string; href: string };
    secondaryCta: { text: string; href: string };
  };
  logos: Array<{ src: string; alt: string }>;
  features: Array<{
    title: string;
    description: string;
    icon: string;
    color: 'blue' | 'pink' | 'yellow' | 'green' | 'purple';
    size: 'small' | 'medium' | 'large';
  }>;
  howItWorks: {
    headline: string;
    steps: Array<{
      number: string;
      title: string;
      description: string;
      icon: string;
      color: 'blue' | 'pink' | 'yellow';
    }>;
  };
  testimonials: {
    headline: string;
    items: Array<{
      quote: string;
      author: string;
      role: string;
      company: string;
      avatar: string;
      rotation: number;
    }>;
  };
  pricing: {
    headline: string;
    tiers: Array<{
      name: string;
      price: string;
      period: string;
      description: string;
      features: string[];
      ctaText: string;
      ctaHref: string;
      popular?: boolean;
      color: 'blue' | 'pink' | 'purple';
    }>;
  };
  cta: {
    headline: string;
    subtext: string;
    buttonText: string;
    buttonHref: string;
  };
  footer: {
    columns: Array<{
      title: string;
      links: Array<{ label: string; href: string }>;
    }>;
  };
}

export const sampleContent: SiteContent = {
  brand: {
    name: 'Playful',
  },
  navigation: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About', href: '#about' },
  ],
  hero: {
    headline: ['MAKE', 'THINGS', 'BEAUTIFUL'],
    subtext: 'The creative toolkit that brings your wildest ideas to life. Design, animate, and ship faster than ever.',
    primaryCta: { text: 'Start Creating', href: '#' },
    secondaryCta: { text: 'Learn More', href: '#' },
  },
  logos: [
    { src: '/logos/logo1.svg', alt: 'Company 1' },
    { src: '/logos/logo2.svg', alt: 'Company 2' },
    { src: '/logos/logo3.svg', alt: 'Company 3' },
    { src: '/logos/logo4.svg', alt: 'Company 4' },
    { src: '/logos/logo5.svg', alt: 'Company 5' },
    { src: '/logos/logo6.svg', alt: 'Company 6' },
  ],
  features: [
    { title: 'Lightning Fast', description: 'Build in minutes, not hours.', icon: '⚡', color: 'blue', size: 'medium' },
    { title: 'Beautiful by Default', description: 'Every design looks stunning.', icon: '✨', color: 'pink', size: 'small' },
    { title: 'Collaborative', description: 'Work together seamlessly.', icon: '👥', color: 'yellow', size: 'small' },
    { title: 'Powerful Animations', description: 'Bring your designs to life with buttery smooth animations.', icon: '🎬', color: 'green', size: 'large' },
    { title: 'Export Anywhere', description: 'Ship to any platform.', icon: '🚀', color: 'purple', size: 'medium' },
  ],
  howItWorks: {
    headline: 'How it works',
    steps: [
      { number: '1', title: 'Sign Up', description: 'Create your free account in seconds.', icon: '📝', color: 'blue' },
      { number: '2', title: 'Create', description: 'Build something amazing with our tools.', icon: '🎨', color: 'pink' },
      { number: '3', title: 'Share', description: 'Show the world what you made.', icon: '🌍', color: 'yellow' },
    ],
  },
  testimonials: {
    headline: 'Loved by creators',
    items: [
      { quote: 'This tool changed how I approach design. Everything is so intuitive!', author: 'Sarah Chen', role: 'Designer', company: 'Figma', avatar: '/avatars/1.jpg', rotation: -3 },
      { quote: 'The animations are incredible. My clients are always impressed.', author: 'Marcus Johnson', role: 'Creative Director', company: 'Studio', avatar: '/avatars/2.jpg', rotation: 2 },
      { quote: 'Finally, a tool that keeps up with my creativity.', author: 'Emma Wilson', role: 'Illustrator', company: 'Freelance', avatar: '/avatars/3.jpg', rotation: -2 },
    ],
  },
  pricing: {
    headline: 'Simple pricing',
    tiers: [
      { name: 'Free', price: '$0', period: 'month', description: 'Perfect for getting started', features: ['5 projects', 'Basic shapes', 'Community support'], ctaText: 'Start Free', ctaHref: '#', color: 'blue' },
      { name: 'Pro', price: '$19', period: 'month', description: 'For serious creators', features: ['Unlimited projects', 'All shapes & animations', 'Priority support', 'Team collaboration'], ctaText: 'Get Pro', ctaHref: '#', popular: true, color: 'pink' },
      { name: 'Enterprise', price: '$49', period: 'month', description: 'For large teams', features: ['Everything in Pro', 'Custom branding', 'SSO & security', 'Dedicated support'], ctaText: 'Contact Sales', ctaHref: '#', color: 'purple' },
    ],
  },
  cta: {
    headline: 'Ready to create something amazing?',
    subtext: 'Join thousands of creators who are already building the future.',
    buttonText: 'Get Started Free',
    buttonHref: '#',
  },
  footer: {
    columns: [
      { title: 'Product', links: [{ label: 'Features', href: '#' }, { label: 'Pricing', href: '#' }, { label: 'Changelog', href: '#' }] },
      { title: 'Company', links: [{ label: 'About', href: '#' }, { label: 'Blog', href: '#' }, { label: 'Careers', href: '#' }] },
      { title: 'Resources', links: [{ label: 'Documentation', href: '#' }, { label: 'Help Center', href: '#' }, { label: 'Community', href: '#' }] },
      { title: 'Legal', links: [{ label: 'Privacy', href: '#' }, { label: 'Terms', href: '#' }] },
    ],
  },
};
```
