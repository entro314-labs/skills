# Swiss Design / International Typographic Style Landing Page: Page Sections

Part of the [Swiss Design / International Typographic Style Landing Page specification](index.md).

## Section-by-Section Implementation

### 1. Navigation

Minimal, typography-focused navigation with no decorations.

```tsx
// components/Navigation.tsx
'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <nav className="max-w-swiss mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - Typography based */}
          <a
            href="/"
            className="text-lg font-bold tracking-tight uppercase"
          >
            Studio
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn(
                    'text-sm font-medium tracking-wide uppercase',
                    'text-black hover:text-red',
                    'transition-colors duration-fast'
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <a
            href="#contact"
            className={cn(
              'hidden md:inline-flex',
              'px-6 py-2',
              'bg-black text-white',
              'text-xs font-medium tracking-widest uppercase',
              'hover:bg-red transition-colors duration-fast'
            )}
          >
            Get in Touch
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            <div className="w-6 space-y-1.5">
              <span
                className={cn(
                  'block h-0.5 bg-black transition-transform duration-normal',
                  mobileOpen && 'rotate-45 translate-y-2'
                )}
              />
              <span
                className={cn(
                  'block h-0.5 bg-black transition-opacity duration-normal',
                  mobileOpen && 'opacity-0'
                )}
              />
              <span
                className={cn(
                  'block h-0.5 bg-black transition-transform duration-normal',
                  mobileOpen && '-rotate-45 -translate-y-2'
                )}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            'md:hidden overflow-hidden transition-all duration-normal',
            mobileOpen ? 'max-h-64' : 'max-h-0'
          )}
        >
          <ul className="py-4 space-y-4 border-t border-gray-200">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm font-medium tracking-wide uppercase"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
```

### 2. Hero Section

Massive typography with mathematical grid placement. Asymmetric but perfectly aligned.

```tsx
// sections/HeroSection.tsx
import { SwissGrid, GridColumn } from '@/components/SwissGrid';
import { Button } from '@/components/Button';

export function HeroSection() {
  return (
    <section className="min-h-screen pt-20 md:pt-24 pb-16 md:pb-24 flex items-center">
      <SwissGrid>
        {/* Rotated Year Label */}
        <GridColumn span={1} className="hidden lg:block relative">
          <span className="absolute bottom-0 left-0 text-xs font-bold tracking-ultra uppercase origin-bottom-left -rotate-90 whitespace-nowrap">
            Est. 2024
          </span>
        </GridColumn>

        {/* Main Headline */}
        <GridColumn span={12} start={1} className="lg:col-span-11 lg:col-start-2">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-none uppercase">
            We Design
            <br />
            <span className="text-red">Digital</span>
            <br />
            Experiences
          </h1>
        </GridColumn>

        {/* Subheadline and CTA */}
        <GridColumn span={12} start={1} className="lg:col-span-5 lg:col-start-2 mt-12 md:mt-16">
          <p className="text-lg md:text-xl font-normal leading-relaxed text-gray-600 mb-8">
            A strategic design studio focused on creating meaningful digital products that solve real problems.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="primary" size="lg">
              View Work
            </Button>
            <Button variant="outline" size="lg">
              About Us
            </Button>
          </div>
        </GridColumn>

        {/* Large Number */}
        <GridColumn span={12} start={1} className="lg:col-span-4 lg:col-start-9 mt-12 lg:mt-0 lg:self-end">
          <div className="text-right">
            <span className="block font-mono text-8xl md:text-9xl font-black tracking-tighter leading-none text-gray-100">
              01
            </span>
            <span className="block mt-2 text-xs font-medium tracking-widest uppercase text-gray-400">
              Selected Projects
            </span>
          </div>
        </GridColumn>

        {/* Bottom Border */}
        <GridColumn span={12} className="mt-16 md:mt-24">
          <div className="h-px bg-black" />
        </GridColumn>
      </SwissGrid>
    </section>
  );
}
```

### 3. Work/Projects Section

Grid-based project showcase with strong typography hierarchy.

```tsx
// sections/WorkSection.tsx
import { SwissGrid, GridColumn } from '@/components/SwissGrid';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  image: string;
}

const projects: Project[] = [
  {
    id: '1',
    number: '01',
    title: 'Minimal Banking App',
    category: 'Product Design',
    year: '2024',
    image: '/projects/project-01.jpg',
  },
  {
    id: '2',
    number: '02',
    title: 'E-Commerce Platform',
    category: 'Web Development',
    year: '2024',
    image: '/projects/project-02.jpg',
  },
  {
    id: '3',
    number: '03',
    title: 'Brand Identity System',
    category: 'Branding',
    year: '2023',
    image: '/projects/project-03.jpg',
  },
  {
    id: '4',
    number: '04',
    title: 'Mobile Health App',
    category: 'UI/UX Design',
    year: '2023',
    image: '/projects/project-04.jpg',
  },
];

export function WorkSection() {
  return (
    <section id="work" className="py-16 md:py-24 bg-white">
      <SwissGrid>
        {/* Section Header */}
        <GridColumn span={12} className="mb-12 md:mb-16">
          <div className="flex items-end justify-between border-b-2 border-black pb-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight uppercase">
              Selected Work
            </h2>
            <span className="text-xs font-bold tracking-ultra uppercase text-gray-400">
              2023-2024
            </span>
          </div>
        </GridColumn>

        {/* Projects Grid */}
        {projects.map((project, index) => (
          <GridColumn
            key={project.id}
            span={12}
            className={cn(
              'md:col-span-6',
              // Alternate large/small layout
              index % 3 === 0 && 'md:col-span-12 lg:col-span-8',
              index % 3 === 1 && 'lg:col-span-4',
              index % 3 === 2 && 'lg:col-span-6',
            )}
          >
            <a
              href={`/work/${project.id}`}
              className="group block"
            >
              {/* Project Image - Grayscale, no rounded corners */}
              <div className="relative aspect-4/3 overflow-hidden bg-gray-100">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className={cn(
                    'object-cover grayscale',
                    'transition-all duration-slow',
                    'group-hover:grayscale-0'
                  )}
                />

                {/* Project Number Overlay */}
                <span className="absolute top-4 left-4 font-mono text-4xl font-black text-white mix-blend-difference">
                  {project.number}
                </span>
              </div>

              {/* Project Info */}
              <div className="mt-4 flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight group-hover:text-red transition-colors duration-fast">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {project.category}
                  </p>
                </div>
                <span className="text-xs font-mono tracking-tight text-gray-400">
                  {project.year}
                </span>
              </div>
            </a>
          </GridColumn>
        ))}

        {/* View All Link */}
        <GridColumn span={12} className="mt-12 md:mt-16 text-center">
          <a
            href="/work"
            className={cn(
              'inline-flex items-center gap-2',
              'text-sm font-medium tracking-widest uppercase',
              'text-black hover:text-red',
              'border-b-2 border-black hover:border-red',
              'transition-colors duration-fast',
              'pb-1'
            )}
          >
            View All Projects
            <span aria-hidden>→</span>
          </a>
        </GridColumn>
      </SwissGrid>
    </section>
  );
}
```

### 4. About/Services Section

Asymmetric two-column layout with large typography and structured information.

```tsx
// sections/AboutSection.tsx
import { SwissGrid, GridColumn } from '@/components/SwissGrid';
import { NumberDisplay } from '@/components/NumberDisplay';

interface Service {
  number: string;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    number: '01',
    title: 'Strategy',
    description: 'Research, positioning, and planning to define clear objectives.',
  },
  {
    number: '02',
    title: 'Design',
    description: 'Visual systems, interfaces, and experiences built to last.',
  },
  {
    number: '03',
    title: 'Development',
    description: 'Clean, performant code that brings designs to life.',
  },
  {
    number: '04',
    title: 'Growth',
    description: 'Optimization and iteration based on real data.',
  },
];

const stats = [
  { number: '12+', label: 'Years Experience' },
  { number: '84', label: 'Projects Delivered' },
  { number: '100%', label: 'Client Satisfaction' },
];

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-gray-100">
      <SwissGrid>
        {/* Section Label */}
        <GridColumn span={12} className="mb-8 md:mb-12">
          <span className="text-xs font-bold tracking-ultra uppercase text-red">
            About
          </span>
        </GridColumn>

        {/* Main Statement */}
        <GridColumn span={12} className="lg:col-span-8 mb-12 lg:mb-0">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            We believe in the power of systematic thinking and objective design to solve complex problems.
          </h2>
        </GridColumn>

        {/* Stats */}
        <GridColumn span={12} className="lg:col-span-4 lg:pl-8">
          <div className="grid grid-cols-3 lg:grid-cols-1 gap-8 lg:gap-6">
            {stats.map((stat) => (
              <NumberDisplay
                key={stat.label}
                number={stat.number}
                label={stat.label}
                size="md"
              />
            ))}
          </div>
        </GridColumn>

        {/* Divider */}
        <GridColumn span={12} className="my-12 md:my-16">
          <div className="h-px bg-black" />
        </GridColumn>

        {/* Services Header */}
        <GridColumn span={12} className="mb-8">
          <h3 className="text-xs font-bold tracking-ultra uppercase">
            Services
          </h3>
        </GridColumn>

        {/* Services Grid */}
        {services.map((service) => (
          <GridColumn
            key={service.number}
            span={12}
            className="md:col-span-6 lg:col-span-3"
          >
            <div className="group">
              <span className="block font-mono text-4xl font-black text-gray-200 group-hover:text-red transition-colors duration-fast">
                {service.number}
              </span>
              <h4 className="mt-4 text-xl font-semibold tracking-tight">
                {service.title}
              </h4>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          </GridColumn>
        ))}
      </SwissGrid>
    </section>
  );
}
```

### 5. Testimonials/Clients Section

Typography-forward testimonial display with client logos.

```tsx
// sections/TestimonialsSection.tsx
import { SwissGrid, GridColumn } from '@/components/SwissGrid';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

const testimonial: Testimonial = {
  quote: "Their systematic approach to design transformed how we think about our product. Every decision was intentional, every element purposeful.",
  author: "Sarah Chen",
  role: "CEO",
  company: "TechCorp",
};

const clients = [
  'Google',
  'Apple',
  'Microsoft',
  'Stripe',
  'Airbnb',
  'Spotify',
];

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-black text-white">
      <SwissGrid>
        {/* Section Label */}
        <GridColumn span={12} className="mb-12 md:mb-16">
          <span className="text-xs font-bold tracking-ultra uppercase text-red">
            Testimonial
          </span>
        </GridColumn>

        {/* Quote */}
        <GridColumn span={12} className="lg:col-span-10 lg:col-start-2">
          <blockquote>
            <p className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed tracking-tight">
              "{testimonial.quote}"
            </p>
            <footer className="mt-8 md:mt-12">
              <cite className="not-italic">
                <span className="block text-lg font-semibold">
                  {testimonial.author}
                </span>
                <span className="block mt-1 text-sm text-gray-400">
                  {testimonial.role}, {testimonial.company}
                </span>
              </cite>
            </footer>
          </blockquote>
        </GridColumn>

        {/* Divider */}
        <GridColumn span={12} className="my-12 md:my-16">
          <div className="h-px bg-gray-800" />
        </GridColumn>

        {/* Clients Header */}
        <GridColumn span={12} className="mb-8">
          <span className="text-xs font-bold tracking-ultra uppercase text-gray-400">
            Trusted By
          </span>
        </GridColumn>

        {/* Client Logos as Typography */}
        <GridColumn span={12}>
          <div className="flex flex-wrap gap-x-12 gap-y-6">
            {clients.map((client) => (
              <span
                key={client}
                className="text-xl md:text-2xl font-semibold tracking-tight text-gray-500 hover:text-white transition-colors duration-fast"
              >
                {client}
              </span>
            ))}
          </div>
        </GridColumn>
      </SwissGrid>
    </section>
  );
}
```

### 6. Process Section

Numbered steps with clean typography hierarchy.

```tsx
// sections/ProcessSection.tsx
import { SwissGrid, GridColumn } from '@/components/SwissGrid';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

const steps: ProcessStep[] = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We begin by understanding your business, users, and goals through research and stakeholder interviews.',
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'We define the problem, identify opportunities, and create a roadmap for success.',
  },
  {
    number: '03',
    title: 'Design',
    description: 'We craft systematic solutions through wireframes, prototypes, and visual design.',
  },
  {
    number: '04',
    title: 'Build',
    description: 'We develop clean, scalable code that brings the design to life.',
  },
  {
    number: '05',
    title: 'Launch',
    description: 'We deploy, monitor, and iterate based on real-world data and feedback.',
  },
];

export function ProcessSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <SwissGrid>
        {/* Section Header */}
        <GridColumn span={12} className="lg:col-span-4 mb-12 lg:mb-0">
          <span className="block text-xs font-bold tracking-ultra uppercase text-red mb-4">
            Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            How We Work
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            A systematic approach to solving complex design challenges.
          </p>
        </GridColumn>

        {/* Process Steps */}
        <GridColumn span={12} className="lg:col-span-7 lg:col-start-6">
          <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
            {steps.map((step) => (
              <div
                key={step.number}
                className="group py-6 md:py-8 grid grid-cols-12 gap-4 items-start"
              >
                <span className="col-span-2 font-mono text-2xl md:text-3xl font-black text-gray-200 group-hover:text-red transition-colors duration-fast">
                  {step.number}
                </span>
                <div className="col-span-10">
                  <h3 className="text-xl font-semibold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </GridColumn>
      </SwissGrid>
    </section>
  );
}
```

### 7. Contact Section

Large typography CTA with minimal form.

```tsx
// sections/ContactSection.tsx
import { SwissGrid, GridColumn } from '@/components/SwissGrid';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

export function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-24 bg-gray-100">
      <SwissGrid>
        {/* Section Label */}
        <GridColumn span={12} className="mb-8">
          <span className="text-xs font-bold tracking-ultra uppercase text-red">
            Contact
          </span>
        </GridColumn>

        {/* Large CTA */}
        <GridColumn span={12} className="lg:col-span-8 mb-12 lg:mb-0">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-none uppercase">
            Let's Work
            <br />
            Together
          </h2>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl">
            Have a project in mind? We'd love to hear about it. Send us a message and we'll get back to you within 24 hours.
          </p>
        </GridColumn>

        {/* Contact Info */}
        <GridColumn span={12} className="lg:col-span-4">
          <div className="space-y-8">
            <div>
              <span className="block text-xs font-bold tracking-ultra uppercase text-gray-400 mb-2">
                Email
              </span>
              <a
                href="mailto:hello@studio.com"
                className="text-xl font-semibold hover:text-red transition-colors duration-fast"
              >
                hello@studio.com
              </a>
            </div>
            <div>
              <span className="block text-xs font-bold tracking-ultra uppercase text-gray-400 mb-2">
                Phone
              </span>
              <a
                href="tel:+1234567890"
                className="text-xl font-semibold hover:text-red transition-colors duration-fast"
              >
                +1 (234) 567-890
              </a>
            </div>
            <div>
              <span className="block text-xs font-bold tracking-ultra uppercase text-gray-400 mb-2">
                Address
              </span>
              <address className="not-italic text-gray-600 leading-relaxed">
                123 Design Street
                <br />
                Zurich, Switzerland
              </address>
            </div>
          </div>
        </GridColumn>

        {/* Divider */}
        <GridColumn span={12} className="my-12 md:my-16">
          <div className="h-px bg-black" />
        </GridColumn>

        {/* Contact Form */}
        <GridColumn span={12} className="lg:col-span-8">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Name"
                name="name"
                placeholder="Your name"
                required
              />
              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="your@email.com"
                required
              />
            </div>
            <Input
              label="Subject"
              name="subject"
              placeholder="Project inquiry"
            />
            <div>
              <label
                htmlFor="message"
                className="block text-xs font-medium tracking-widest uppercase mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                placeholder="Tell us about your project..."
                className="w-full px-4 py-3 bg-white text-black border-2 border-black focus:outline-hidden focus:border-red transition-colors duration-fast placeholder:text-gray-400 resize-none"
                required
              />
            </div>
            <Button type="submit" variant="primary" size="lg">
              Send Message
            </Button>
          </form>
        </GridColumn>
      </SwissGrid>
    </section>
  );
}
```

### 8. Footer

Minimal, information-dense footer with clear grid structure.

```tsx
// components/Footer.tsx
import { SwissGrid, GridColumn } from '@/components/SwissGrid';

const footerLinks = {
  work: [
    { label: 'All Projects', href: '/work' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Archive', href: '/archive' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Team', href: '/team' },
    { label: 'Careers', href: '/careers' },
  ],
  connect: [
    { label: 'Twitter', href: 'https://twitter.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'Dribbble', href: 'https://dribbble.com' },
  ],
};

export function Footer() {
  return (
    <footer className="py-12 md:py-16 bg-black text-white">
      <SwissGrid>
        {/* Logo and Tagline */}
        <GridColumn span={12} className="lg:col-span-4 mb-12 lg:mb-0">
          <a href="/" className="text-2xl font-bold tracking-tight uppercase">
            Studio
          </a>
          <p className="mt-4 text-sm text-gray-400 leading-relaxed max-w-xs">
            A strategic design studio focused on creating meaningful digital products.
          </p>
        </GridColumn>

        {/* Links */}
        <GridColumn span={4} className="lg:col-span-2 lg:col-start-7">
          <span className="block text-xs font-bold tracking-ultra uppercase text-gray-400 mb-4">
            Work
          </span>
          <ul className="space-y-3">
            {footerLinks.work.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-gray-300 hover:text-white transition-colors duration-fast"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </GridColumn>

        <GridColumn span={4} className="lg:col-span-2">
          <span className="block text-xs font-bold tracking-ultra uppercase text-gray-400 mb-4">
            Company
          </span>
          <ul className="space-y-3">
            {footerLinks.company.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-gray-300 hover:text-white transition-colors duration-fast"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </GridColumn>

        <GridColumn span={4} className="lg:col-span-2">
          <span className="block text-xs font-bold tracking-ultra uppercase text-gray-400 mb-4">
            Connect
          </span>
          <ul className="space-y-3">
            {footerLinks.connect.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-300 hover:text-white transition-colors duration-fast"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </GridColumn>

        {/* Bottom Bar */}
        <GridColumn span={12} className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Studio. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="/privacy"
                className="text-xs text-gray-500 hover:text-white transition-colors duration-fast"
              >
                Privacy
              </a>
              <a
                href="/terms"
                className="text-xs text-gray-500 hover:text-white transition-colors duration-fast"
              >
                Terms
              </a>
            </div>
          </div>
        </GridColumn>
      </SwissGrid>
    </footer>
  );
}
```
