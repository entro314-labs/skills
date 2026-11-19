# Neobrutalist Landing Page: Sample Data and Page Assembly

Part of the [Neobrutalist Landing Page specification](index.md).

## Sample Data Structure

```typescript
// types.ts

export interface NavLink {
  label: string;
  href: string;
}

export interface Feature {
  number: string;
  title: string;
  description: string;
  accent?: boolean;
  wide?: boolean;
}

export interface Step {
  number: string;
  title: string;
  description: string;
}

export interface Stat {
  value: string;
  label: string;
  sublabel?: string;
}

export interface Testimonial {
  text: string;
  author: string;
  role: string;
  accent?: boolean;
}

export interface PricingPlan {
  tier: string;
  price: string;
  period: string;
  features: { text: string; included: boolean }[];
  cta: string;
  featured: boolean;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

// Sample data
export const sampleData = {
  header: {
    logoText: 'ACME',
    navLinks: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Docs', href: '/docs' },
      { label: 'Blog', href: '/blog' },
    ],
    ctaText: 'GET STARTED',
    ctaHref: '/signup',
  },
  hero: {
    headline: 'BUILD',
    headlineAccent: 'BETTER',
    subheadline: 'The tool that does the thing you need done, without the BS. Stop overthinking. Start shipping.',
    primaryCta: 'START FREE',
    secondaryCta: 'SEE IT WORK',
    badge: 'NEW v2.0',
  },
  marquee: {
    row1: ['TRUSTED BY 10,000+ TEAMS', 'FEATURED IN TECHCRUNCH', 'PRODUCT HUNT #1', 'BACKED BY YC'],
    row2: ['99.9% UPTIME', 'SOC2 CERTIFIED', 'GDPR COMPLIANT', 'LOVED BY DEVS'],
  },
  features: [
    { number: '01', title: 'LIGHTNING FAST', description: 'Built on edge infrastructure. Sub-100ms response times globally.', wide: false, accent: false },
    { number: '02', title: 'DEAD SIMPLE', description: 'No PhD required. If you can click, you can use it.', wide: false, accent: true },
    { number: '03', title: 'SECURE', description: 'Bank-grade encryption. SOC2 Type II certified.', wide: false, accent: false },
    { number: '04', title: 'INTEGRATES WITH EVERYTHING', description: 'Slack, GitHub, Linear, Notion, Figma, Jira, and 100+ more.', wide: true, accent: false },
  ],
  steps: [
    { number: '01', title: 'SIGN UP', description: 'Create your free account in 30 seconds. No credit card, no BS.' },
    { number: '02', title: 'CONNECT', description: 'Link your existing tools with one click. We do the heavy lifting.' },
    { number: '03', title: 'LAUNCH', description: 'Start using immediately. Zero learning curve.' },
  ],
  logos: ['Stripe', 'Vercel', 'Linear', 'Notion', 'Figma', 'Clerk', 'Supabase', 'Raycast', 'Resend', 'Cal', 'Descript', 'Loom'],
  stats: [
    { value: '10,000+', label: 'ACTIVE USERS' },
    { value: '99.9%', label: 'UPTIME' },
    { value: '50M+', label: 'REQUESTS', sublabel: 'MONTHLY' },
    { value: '<100ms', label: 'LATENCY', sublabel: 'P99' },
  ],
  testimonials: [
    { text: 'This tool changed how we work. Not kidding. We shipped 3x faster last quarter.', author: 'SARAH CHEN', role: 'CTO @ Acme Inc', accent: false },
    { text: 'Finally, something that just works. Shocking. Actually shocked.', author: 'MARCUS JOHNSON', role: 'Founder @ StartupXYZ', accent: true },
    { text: 'I deleted 5 other tools after trying this. Should\'ve found it sooner.', author: 'EMMA WILSON', role: 'Engineer @ TechCorp', accent: false },
    { text: 'Our team stopped complaining about tools. First time in 3 years.', author: 'JAMES PARK', role: 'VP Product @ Enterprise', accent: false },
  ],
  pricing: [
    {
      tier: 'FREE',
      price: '$0',
      period: 'forever',
      features: [
        { text: 'Up to 5 projects', included: true },
        { text: 'Basic integrations', included: true },
        { text: 'Community support', included: true },
        { text: 'Advanced analytics', included: false },
        { text: 'Custom branding', included: false },
        { text: 'API access', included: false },
      ],
      cta: 'GET STARTED',
      featured: false,
    },
    {
      tier: 'PRO',
      price: '$29',
      period: '/mo billed monthly',
      features: [
        { text: 'Unlimited projects', included: true },
        { text: 'All integrations', included: true },
        { text: 'Priority support', included: true },
        { text: 'Advanced analytics', included: true },
        { text: 'Custom branding', included: true },
        { text: 'Full API access', included: true },
      ],
      cta: 'START FREE TRIAL',
      featured: true,
    },
  ],
  faqs: [
    { question: 'HOW DOES BILLING WORK?', answer: 'Monthly billing, charged on the same day each month. We prorate upgrades and downgrades automatically. No surprises.' },
    { question: 'CAN I CANCEL ANYTIME?', answer: "Yes. No contracts, no commitments. Cancel from your dashboard in one click. We won't guilt-trip you or make it hard to leave." },
    { question: 'WHAT ABOUT DATA SECURITY?', answer: "SOC2 Type II certified. AES-256 encryption at rest and in transit. We don't sell your data. Ever. Full GDPR compliance." },
    { question: 'DO YOU OFFER REFUNDS?', answer: "30-day money-back guarantee, no questions asked. If you're not happy, we'll refund you. Simple as that." },
  ],
  footer: {
    logoText: 'ACME',
    tagline: 'The tool that does the thing you need done.',
    columns: [
      { title: 'PRODUCT', links: [{ label: 'Features', href: '#' }, { label: 'Pricing', href: '#' }, { label: 'Changelog', href: '#' }, { label: 'Roadmap', href: '#' }] },
      { title: 'COMPANY', links: [{ label: 'About', href: '#' }, { label: 'Careers', href: '#' }, { label: 'Contact', href: '#' }, { label: 'Press', href: '#' }] },
      { title: 'RESOURCES', links: [{ label: 'Docs', href: '#' }, { label: 'Blog', href: '#' }, { label: 'Help', href: '#' }, { label: 'API', href: '#' }] },
      { title: 'LEGAL', links: [{ label: 'Privacy', href: '#' }, { label: 'Terms', href: '#' }, { label: 'Cookies', href: '#' }, { label: 'Security', href: '#' }] },
    ],
    copyright: '© 2024 Acme Inc. All rights reserved.',
  },
};
```
