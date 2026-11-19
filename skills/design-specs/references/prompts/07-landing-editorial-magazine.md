# Editorial/Magazine Landing Page - Exhaustive Technical Specification

## Output Requirements

Generate a **single React component** that renders a complete editorial/magazine-style landing page. Requirements:
- Next.js 16+ with App Router
- TypeScript strict mode
- Tailwind CSS v4 with the custom theme below
- Motion for minimal scroll reveals (images only)
- Mobile-first responsive design
- CSS Grid for complex editorial layouts

**Philosophy**: The page should feel like opening a beautifully designed magazine or literary publication. Typography does ALL the heavy lifting. Images are art-directed, not decorative. Every element has editorial intention. Restraint is elegance.

---

## Page Structure Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ MASTHEAD - Minimal header with publication name, date, issue number         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                                                                             │
│                         THE FUTURE                                          │
│                         OF DESIGN                                           │
│                                                                             │
│                    A meditation on craft,                                   │
│                    intention, and the tools                                 │
│                    that shape our work                                      │
│                                                                             │
│                         ◆                                                   │
│                                                                             │
│                    By Sarah Chen                                            │
│                    December 2024                                            │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ ═══════════════════════════════════════════════════════════════════════════ │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                                                                      │  │
│  │                    [FULL-BLEED HERO IMAGE]                           │  │
│  │                         Duotone treatment                            │  │
│  │                                                                      │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  Photography by Marcus Webb - San Francisco, 2024                          │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│      01                                                                     │
│      ──                                                                     │
│                                                                             │
│      The Beginning                                                          │
│                                                                             │
│                                                                             │
│      T  he story of design is, at its                                      │
│         core, a story of intention.                                        │
│         Every curve, every pixel,                 "Design is not           │
│         every carefully considered               just what it looks        │
│         spacing decision reflects                like and feels like.      │
│         a choice made with purpose.              Design is how             │
│                                                   it works."               │
│         The best designers understand                                       │
│         that their role is not to                 - Steve Jobs             │
│         decorate, but to clarify...                                        │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│      ┌────────────────────────────────────────────────────────────────┐    │
│      │                                                                │    │
│      │  [IMAGE WITH TEXT WRAP]                                        │    │
│      │                                                                │    │
│      └────────────────────────────────────────────────────────────────┘    │
│      Fig. 1 - The intersection of form and function                        │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│      02                                                                     │
│      ──                                                                     │
│                                                                             │
│      The Craft                                                              │
│                                                                             │
│      Body text continues with generous                                      │
│      line height and comfortable reading                                    │
│      width. The column is offset from                                       │
│      center to create visual interest...                                    │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│      ┌────────────────────────────────────┬────────────────────────────┐   │
│      │                                    │                            │   │
│      │  THE KEY                           │    10,000+                 │   │
│      │  STATISTICS                        │    Hours of research       │   │
│      │  ══════════                        │                            │   │
│      │                                    │    47                      │   │
│      │  A look at the numbers             │    Countries studied       │   │
│      │  behind design impact              │                            │   │
│      │                                    │    $2.4T                   │   │
│      │                                    │    Economic impact         │   │
│      │                                    │                            │   │
│      └────────────────────────────────────┴────────────────────────────┘   │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│      03                                                                     │
│      ──                                                                     │
│                                                                             │
│      The Future                                                             │
│                                                                             │
│      [Continued body text...]                                               │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  ═══════════════════════════════════════════════════════════════════════   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│      ABOUT THE AUTHOR                                                       │
│      ─────────────────                                                      │
│                                                                             │
│      [Photo]  Sarah Chen is a design writer and                            │
│               researcher based in San Francisco.                            │
│               Her work explores the intersection                            │
│               of technology and human experience.                           │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│      RELATED READINGS                                                       │
│                                                                             │
│      ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                  │
│      │              │  │              │  │              │                  │
│      │   [Image]    │  │   [Image]    │  │   [Image]    │                  │
│      │              │  │              │  │              │                  │
│      │  Title       │  │  Title       │  │  Title       │                  │
│      │  Author      │  │  Author      │  │  Author      │                  │
│      └──────────────┘  └──────────────┘  └──────────────┘                  │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│      NEWSLETTER                                                             │
│                                                                             │
│      Subscribe to receive our weekly                                        │
│      curation of design thinking.                                           │
│                                                                             │
│      [email@example.com____________] [SUBSCRIBE]                            │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  ═══════════════════════════════════════════════════════════════════════   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│      PUBLICATION NAME                Issue 47 - December 2024               │
│                                                                             │
│      About  •  Archive  •  Subscribe  •  Contact                            │
│                                                                             │
│      © 2024 All rights reserved.                                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Color System

### CSS Custom Properties (define in globals.css)

```css
:root {
  /* Paper Tones - Warm, Not Stark */
  --bg-paper: #FAFAF8;           /* Warm off-white, like quality paper stock */
  --bg-cream: #F5F4F0;           /* Slightly darker cream for contrast */
  --bg-ivory: #FFFEF9;           /* Lighter variation */

  /* Text - Ink-Like */
  --text-primary: #1A1A1A;       /* Near black, not pure black */
  --text-secondary: #4A4A4A;     /* Dark gray for secondary text */
  --text-muted: #6B6B6B;         /* Muted for captions, dates */
  --text-light: #999999;         /* Very light for subtle elements */

  /* Editorial Accent - Restrained Use */
  --accent-editorial: #C41E3A;   /* Classic editorial red - used sparingly */
  --accent-hover: #A01830;       /* Darker red for hover */

  /* Rules & Dividers */
  --rule-heavy: #1A1A1A;         /* Black for heavy rules */
  --rule-light: #E5E4E0;         /* Light gray for subtle dividers */
  --rule-medium: #CCCCCC;        /* Medium gray */

  /* Functional */
  --link-color: #1A1A1A;         /* Links same as text */
  --link-underline: #C41E3A;     /* Red underline on hover */

  /* Duotone Overlay Colors */
  --duotone-dark: #1A1A1A;
  --duotone-light: #F5F4F0;
}
```

### Tailwind Theme (globals.css)

```css
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  --color-paper: #FAFAF8;
  --color-cream: #F5F4F0;
  --color-ivory: #FFFEF9;
  --color-ink: #1A1A1A;
  --color-ink-secondary: #4A4A4A;
  --color-ink-muted: #6B6B6B;
  --color-ink-light: #999999;
  --color-editorial-red: #C41E3A;
  --color-editorial-red-dark: #A01830;
  --color-rule-heavy: #1A1A1A;
  --color-rule-light: #E5E4E0;
  --color-rule-medium: #CCCCCC;

  --font-serif: "Playfair Display", Georgia, "Times New Roman", serif;
  --font-sans: Inter, system-ui, sans-serif;
  --font-display: "Playfair Display", Georgia, serif;

  /* Display Sizes - For Headlines */
  --text-display-hero: clamp(64px, 10vw, 120px);
  --text-display-hero--line-height: 0.95;
  --text-display-hero--letter-spacing: -0.03em;
  --text-display-hero--font-weight: 400;
  --text-display-xl: clamp(48px, 8vw, 96px);
  --text-display-xl--line-height: 1;
  --text-display-xl--letter-spacing: -0.025em;
  --text-display-xl--font-weight: 400;
  --text-display-lg: clamp(40px, 6vw, 72px);
  --text-display-lg--line-height: 1.05;
  --text-display-lg--letter-spacing: -0.02em;
  --text-display-lg--font-weight: 400;
  --text-display-md: clamp(32px, 5vw, 56px);
  --text-display-md--line-height: 1.1;
  --text-display-md--letter-spacing: -0.015em;
  --text-display-md--font-weight: 400;
  --text-display-sm: clamp(28px, 4vw, 40px);
  --text-display-sm--line-height: 1.15;
  --text-display-sm--letter-spacing: -0.01em;
  --text-display-sm--font-weight: 400;
  /* Section Headlines */
  --text-section-title: clamp(36px, 5vw, 56px);
  --text-section-title--line-height: 1.1;
  --text-section-title--letter-spacing: -0.02em;
  --text-section-title--font-weight: 400;
  /* Pull Quotes */
  --text-pull-quote: clamp(24px, 3vw, 36px);
  --text-pull-quote--line-height: 1.35;
  --text-pull-quote--letter-spacing: -0.01em;
  --text-pull-quote--font-weight: 400;
  /* Body Text */
  --text-body-lg: 20px;
  --text-body-lg--line-height: 1.75;
  --text-body-lg--font-weight: 400;
  --text-body: 18px;
  --text-body--line-height: 1.7;
  --text-body--font-weight: 400;
  --text-body-sm: 16px;
  --text-body-sm--line-height: 1.65;
  --text-body-sm--font-weight: 400;
  /* Utility Text */
  --text-caption: 12px;
  --text-caption--line-height: 1.5;
  --text-caption--letter-spacing: 0.1em;
  --text-caption--font-weight: 500;
  --text-overline: 11px;
  --text-overline--line-height: 1.4;
  --text-overline--letter-spacing: 0.15em;
  --text-overline--font-weight: 600;
  --text-byline: 14px;
  --text-byline--line-height: 1.5;
  --text-byline--letter-spacing: 0.02em;
  --text-byline--font-weight: 400;
  /* Section Numbers */
  --text-section-num: 14px;
  --text-section-num--line-height: 1;
  --text-section-num--letter-spacing: 0.1em;
  --text-section-num--font-weight: 600;

  --container-prose: 65ch;
  --container-prose-wide: 75ch;
  --container-prose-narrow: 55ch;
  --container-article: 720px;
  --container-content: 1200px;
  --container-full-bleed: 1400px;
}

/* No theme entry needed in v4: spacing 18, spacing 22, spacing 26, spacing 30, spacing 34, spacing 38, spacing 42, border-3, border-4, duration-600, duration-800, duration-1000 */
```

---

## Typography System

### Font Loading (layout.tsx)

```tsx
import { Playfair_Display, Inter } from 'next/font/google';

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${inter.variable}`}>
      <body className="font-sans bg-paper text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
```

### Typography Utility Classes

```css
/* Drop Cap - First letter of article */
.drop-cap::first-letter {
  font-family: var(--font-serif);
  font-size: 5.5em;
  float: left;
  line-height: 0.8;
  margin-right: 12px;
  margin-top: 8px;
  font-weight: 400;
  color: var(--text-primary);
}

/* Small Caps for bylines and dates */
.small-caps {
  font-variant: small-caps;
  letter-spacing: 0.05em;
  font-weight: 500;
}

/* Hanging punctuation for quotes */
.hanging-punctuation {
  text-indent: -0.4em;
}

/* Article body with optimal reading width */
.article-body {
  font-family: var(--font-sans);
  font-size: 18px;
  line-height: 1.7;
  max-width: 65ch;
  color: var(--text-primary);
}

/* Pull quote styling */
.pull-quote {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: clamp(24px, 3vw, 36px);
  line-height: 1.35;
  color: var(--text-primary);
}

.pull-quote-mark {
  font-family: var(--font-serif);
  font-size: 4em;
  line-height: 0.5;
  color: var(--rule-light);
  display: block;
  margin-bottom: 16px;
}

/* Section number styling */
.section-number {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: var(--text-muted);
}

.section-number-divider {
  width: 24px;
  height: 2px;
  background: var(--text-muted);
  margin-top: 8px;
  margin-bottom: 24px;
}

/* Image caption styling */
.image-caption {
  font-family: var(--font-sans);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-top: 16px;
  padding-left: 20px;
  border-left: 2px solid var(--rule-heavy);
}

/* Figure label */
.figure-label {
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: var(--text-secondary);
}
```

---

## Layout System

### Editorial Grid

```css
/* 12-column editorial grid */
.editorial-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

@media (max-width: 768px) {
  .editorial-grid {
    grid-template-columns: repeat(6, 1fr);
    gap: 16px;
    padding: 0 20px;
  }
}

/* Content spans - offset from center for visual interest */
.span-article {
  grid-column: 2 / 8;
}

.span-wide {
  grid-column: 2 / 11;
}

.span-center {
  grid-column: 3 / 10;
}

.span-full {
  grid-column: 1 / -1;
}

.span-left-narrow {
  grid-column: 1 / 5;
}

.span-right-wide {
  grid-column: 5 / 12;
}

/* Pull quote in margin */
.span-pull-quote {
  grid-column: 8 / 12;
  margin-top: -100px; /* Intentional overlap */
}

@media (max-width: 1024px) {
  .span-article {
    grid-column: 1 / 7;
  }
  .span-wide {
    grid-column: 1 / -1;
  }
  .span-center {
    grid-column: 1 / -1;
  }
  .span-pull-quote {
    grid-column: 1 / -1;
    margin-top: 48px;
  }
}

@media (max-width: 768px) {
  .span-article,
  .span-wide,
  .span-center,
  .span-left-narrow,
  .span-right-wide {
    grid-column: 1 / -1;
  }
}

/* Full-bleed image that breaks container */
.full-bleed {
  grid-column: 1 / -1;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  width: 100vw;
}
```

### Section Spacing

```css
/* Generous whitespace between sections */
.section-spacing {
  padding-top: 120px;
  padding-bottom: 120px;
}

.section-spacing-lg {
  padding-top: 160px;
  padding-bottom: 160px;
}

.section-spacing-sm {
  padding-top: 80px;
  padding-bottom: 80px;
}

@media (max-width: 768px) {
  .section-spacing {
    padding-top: 80px;
    padding-bottom: 80px;
  }
  .section-spacing-lg {
    padding-top: 100px;
    padding-bottom: 100px;
  }
  .section-spacing-sm {
    padding-top: 60px;
    padding-bottom: 60px;
  }
}
```

---

## Component Specifications

### 1. Masthead (Header)

**Visual Structure**:
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  THE DESIGN REVIEW              Issue 47              December 2024         │
│  ───────────────────────────────────────────────────────────────────────    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**CSS**:
```css
.masthead {
  padding: 24px 0;
  border-bottom: 1px solid var(--rule-light);
}

.masthead-inner {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.masthead-title {
  font-family: var(--font-serif);
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--text-primary);
}

.masthead-meta {
  display: flex;
  gap: 32px;
}

.masthead-meta-item {
  font-family: var(--font-sans);
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
}

@media (max-width: 640px) {
  .masthead-inner {
    flex-direction: column;
    align-items: center;
    gap: 12px;
    text-align: center;
  }
  .masthead-meta {
    gap: 24px;
  }
}
```

**JSX Structure**:
```tsx
<header className="masthead">
  <div className="masthead-inner">
    <h1 className="masthead-title">THE DESIGN REVIEW</h1>
    <div className="masthead-meta">
      <span className="masthead-meta-item">Issue 47</span>
      <span className="masthead-meta-item">December 2024</span>
    </div>
  </div>
</header>
```

---

### 2. Hero Section (Typography-Focused)

**Visual Structure**:
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                                                                             │
│                                                                             │
│                           THE FUTURE                                        │
│                           OF DESIGN                                         │
│                                                                             │
│                                                                             │
│                      A meditation on craft,                                 │
│                      intention, and the tools                               │
│                      that shape our work                                    │
│                                                                             │
│                                                                             │
│                              ◆                                              │
│                                                                             │
│                                                                             │
│                         By Sarah Chen                                       │
│                         December 2024                                       │
│                                                                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**CSS**:
```css
.hero-editorial {
  min-height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 120px 24px;
}

.hero-headline {
  font-family: var(--font-serif);
  font-size: clamp(64px, 10vw, 120px);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: -0.03em;
  color: var(--text-primary);
  margin-bottom: 48px;
}

.hero-headline-line {
  display: block;
}

.hero-subheadline {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: clamp(20px, 3vw, 28px);
  font-weight: 400;
  line-height: 1.5;
  color: var(--text-secondary);
  max-width: 480px;
  margin-bottom: 64px;
}

.hero-ornament {
  font-size: 16px;
  color: var(--text-muted);
  margin-bottom: 64px;
}

.hero-byline {
  text-align: center;
}

.hero-author {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.05em;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.hero-date {
  font-family: var(--font-sans);
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
}
```

**JSX Structure**:
```tsx
<section className="hero-editorial">
  <h1 className="hero-headline">
    <span className="hero-headline-line">THE FUTURE</span>
    <span className="hero-headline-line">OF DESIGN</span>
  </h1>

  <p className="hero-subheadline">
    A meditation on craft, intention, and the tools that shape our work
  </p>

  <div className="hero-ornament">◆</div>

  <div className="hero-byline">
    <p className="hero-author">By Sarah Chen</p>
    <p className="hero-date">December 2024</p>
  </div>
</section>
```

---

### 3. Horizontal Rule / Divider

**CSS**:
```css
/* Heavy rule */
.rule-heavy {
  width: 100%;
  height: 3px;
  background: var(--rule-heavy);
  border: none;
  margin: 0;
}

/* Light rule */
.rule-light {
  width: 100%;
  height: 1px;
  background: var(--rule-light);
  border: none;
  margin: 0;
}

/* Centered short rule */
.rule-short {
  width: 80px;
  height: 2px;
  background: var(--rule-heavy);
  border: none;
  margin: 48px auto;
}

/* Ornamental divider */
.divider-ornament {
  text-align: center;
  padding: 48px 0;
  font-size: 14px;
  color: var(--text-muted);
  letter-spacing: 0.5em;
}
```

---

### 4. Full-Bleed Image with Caption

**Visual Structure**:
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  ╔═══════════════════════════════════════════════════════════════════════╗ │
│  ║                                                                        ║ │
│  ║                         [FULL-BLEED IMAGE]                             ║ │
│  ║                          Duotone treatment                             ║ │
│  ║                                                                        ║ │
│  ╚═══════════════════════════════════════════════════════════════════════╝ │
│                                                                             │
│  │ Photography by Marcus Webb - San Francisco, 2024                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**CSS**:
```css
.full-bleed-image-section {
  padding: 80px 0;
}

.full-bleed-image-wrapper {
  position: relative;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  overflow: hidden;
}

.full-bleed-image {
  width: 100%;
  height: auto;
  display: block;
  aspect-ratio: 21 / 9;
  object-fit: cover;
}

/* Duotone effect */
.full-bleed-image-duotone {
  filter: grayscale(100%) contrast(1.1);
  mix-blend-mode: multiply;
}

.full-bleed-image-overlay {
  position: absolute;
  inset: 0;
  background: var(--cream);
  mix-blend-mode: screen;
  pointer-events: none;
}

.full-bleed-caption {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.full-bleed-caption-text {
  font-family: var(--font-sans);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
  padding-left: 20px;
  border-left: 2px solid var(--rule-heavy);
}
```

**JSX Structure**:
```tsx
<section className="full-bleed-image-section">
  <motion.div
    className="full-bleed-image-wrapper"
    initial={{ opacity: 0, scale: 1.05 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, ease: 'easeOut' }}
    viewport={{ once: true, margin: '-100px' }}
  >
    <img
      src="/hero-image.jpg"
      alt="Design workspace"
      className="full-bleed-image full-bleed-image-duotone"
    />
    <div className="full-bleed-image-overlay" aria-hidden="true" />
  </motion.div>

  <div className="full-bleed-caption">
    <p className="full-bleed-caption-text">
      Photography by Marcus Webb - San Francisco, 2024
    </p>
  </div>
</section>
```

---

### 5. Article Section with Drop Cap and Pull Quote

**Visual Structure**:
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│      01                                                                     │
│      ──                                                                     │
│                                                                             │
│      The Beginning                                                          │
│                                                                             │
│                                                                             │
│      T  he story of design is, at its                                      │
│         core, a story of intention.          ┌────────────────────────┐    │
│         Every curve, every pixel,            │                        │    │
│         every carefully considered           │  "Design is not        │    │
│         spacing decision reflects            │  just what it looks    │    │
│         a choice made with purpose.          │  like and feels like.  │    │
│                                              │  Design is how         │    │
│         The best designers understand        │  it works."            │    │
│         that their role is not to            │                        │    │
│         decorate, but to clarify.            │  - Steve Jobs          │    │
│         They create systems that             │                        │    │
│         communicate meaning through          └────────────────────────┘    │
│         form, not despite it...                                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**CSS**:
```css
.article-section {
  padding: 80px 0;
}

.article-section-header {
  margin-bottom: 48px;
}

.article-section-number {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  margin-bottom: 8px;
}

.article-section-number-line {
  width: 24px;
  height: 2px;
  background: var(--text-muted);
  margin-bottom: 32px;
}

.article-section-title {
  font-family: var(--font-serif);
  font-size: clamp(36px, 5vw, 56px);
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--text-primary);
}

.article-content-grid {
  display: grid;
  grid-template-columns: 6fr 4fr;
  gap: 80px;
  align-items: start;
}

@media (max-width: 1024px) {
  .article-content-grid {
    grid-template-columns: 1fr;
    gap: 48px;
  }
}

.article-body {
  font-family: var(--font-sans);
  font-size: 18px;
  line-height: 1.7;
  color: var(--text-primary);
}

.article-body p {
  margin-bottom: 24px;
}

.article-body p:first-of-type {
  /* Drop cap styles applied via ::first-letter */
}

.article-body p:first-of-type::first-letter {
  font-family: var(--font-serif);
  font-size: 5.5em;
  float: left;
  line-height: 0.8;
  margin-right: 12px;
  margin-top: 8px;
  font-weight: 400;
}

/* Pull Quote in margin */
.pull-quote-container {
  position: sticky;
  top: 120px;
}

.pull-quote {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: clamp(24px, 2.5vw, 32px);
  line-height: 1.4;
  color: var(--text-primary);
}

.pull-quote-mark {
  font-family: var(--font-serif);
  font-size: 72px;
  line-height: 0.5;
  color: var(--rule-light);
  display: block;
  margin-bottom: 16px;
  margin-left: -8px;
}

.pull-quote-attribution {
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: var(--text-muted);
  margin-top: 24px;
}

.pull-quote-attribution::before {
  content: '- ';
}
```

**JSX Structure**:
```tsx
<section className="article-section editorial-grid">
  <div className="span-wide">
    <div className="article-section-header">
      <div className="article-section-number">01</div>
      <div className="article-section-number-line" />
      <h2 className="article-section-title">The Beginning</h2>
    </div>

    <div className="article-content-grid">
      <div className="article-body">
        <p>
          The story of design is, at its core, a story of intention.
          Every curve, every pixel, every carefully considered spacing
          decision reflects a choice made with purpose. The best designers
          understand that their role is not to decorate, but to clarify.
        </p>
        <p>
          They create systems that communicate meaning through form,
          not despite it. In an age of infinite digital possibility,
          constraint becomes liberation. The grid becomes a guide.
          Typography becomes voice.
        </p>
        <p>
          This understanding didn't emerge overnight. It evolved through
          centuries of craft, from the precision of letterpress to the
          fluidity of digital tools. Each generation built upon the last,
          refining principles that transcend any single medium.
        </p>
      </div>

      <aside className="pull-quote-container">
        <blockquote className="pull-quote">
          <span className="pull-quote-mark">"</span>
          Design is not just what it looks like and feels like.
          Design is how it works.
        </blockquote>
        <cite className="pull-quote-attribution">Steve Jobs</cite>
      </aside>
    </div>
  </div>
</section>
```

---

### 6. Inline Image with Caption

**Visual Structure**:
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│      ┌────────────────────────────────────────────────────────────────┐    │
│      │                                                                │    │
│      │                         [IMAGE]                                │    │
│      │                                                                │    │
│      └────────────────────────────────────────────────────────────────┘    │
│      │ Fig. 1 - The intersection of form and function reveals        │    │
│        itself in the careful balance of negative space.                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**CSS**:
```css
.inline-figure {
  margin: 64px 0;
}

.inline-figure-image {
  width: 100%;
  height: auto;
  display: block;
}

.inline-figure-caption {
  display: flex;
  gap: 12px;
  margin-top: 16px;
  padding-left: 20px;
  border-left: 2px solid var(--rule-heavy);
}

.inline-figure-label {
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: var(--text-secondary);
  flex-shrink: 0;
}

.inline-figure-text {
  font-family: var(--font-sans);
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-muted);
}
```

**JSX Structure**:
```tsx
<figure className="inline-figure">
  <motion.img
    src="/figure-1.jpg"
    alt="Design workspace showing the balance of form and function"
    className="inline-figure-image"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
  />
  <figcaption className="inline-figure-caption">
    <span className="inline-figure-label">Fig. 1 -</span>
    <span className="inline-figure-text">
      The intersection of form and function reveals itself
      in the careful balance of negative space.
    </span>
  </figcaption>
</figure>
```

---

### 7. Statistics Box

**Visual Structure**:
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  ┌───────────────────────────────────┬──────────────────────────────────┐  │
│  │                                   │                                  │  │
│  │  THE KEY                          │    10,000+                       │  │
│  │  STATISTICS                       │    Hours of research             │  │
│  │  ══════════════                   │    ──────────────────            │  │
│  │                                   │                                  │  │
│  │  A look at the numbers            │    47                            │  │
│  │  behind design impact             │    Countries studied             │  │
│  │                                   │    ──────────────────            │  │
│  │                                   │                                  │  │
│  │                                   │    $2.4T                         │  │
│  │                                   │    Economic impact               │  │
│  │                                   │                                  │  │
│  └───────────────────────────────────┴──────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**CSS**:
```css
.stats-box {
  border: 1px solid var(--rule-heavy);
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 80px 0;
}

@media (max-width: 768px) {
  .stats-box {
    grid-template-columns: 1fr;
  }
}

.stats-box-header {
  padding: 48px;
  border-right: 1px solid var(--rule-heavy);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media (max-width: 768px) {
  .stats-box-header {
    border-right: none;
    border-bottom: 1px solid var(--rule-heavy);
  }
}

.stats-box-label {
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 8px;
}

.stats-box-title {
  font-family: var(--font-serif);
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 400;
  line-height: 1.15;
  letter-spacing: -0.01em;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.stats-box-title-line {
  width: 60px;
  height: 3px;
  background: var(--rule-heavy);
  margin-bottom: 24px;
}

.stats-box-description {
  font-family: var(--font-sans);
  font-size: 15px;
  line-height: 1.6;
  color: var(--text-secondary);
}

.stats-box-values {
  padding: 48px;
}

.stat-item {
  margin-bottom: 32px;
}

.stat-item:last-child {
  margin-bottom: 0;
}

.stat-value {
  font-family: var(--font-serif);
  font-size: clamp(36px, 5vw, 48px);
  font-weight: 400;
  line-height: 1;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.stat-label {
  font-family: var(--font-sans);
  font-size: 13px;
  color: var(--text-muted);
  padding-bottom: 16px;
  border-bottom: 1px solid var(--rule-light);
}
```

**JSX Structure**:
```tsx
const stats = [
  { value: '10,000+', label: 'Hours of research' },
  { value: '47', label: 'Countries studied' },
  { value: '$2.4T', label: 'Economic impact' },
];

<div className="stats-box">
  <div className="stats-box-header">
    <span className="stats-box-label">The Key</span>
    <h3 className="stats-box-title">Statistics</h3>
    <div className="stats-box-title-line" />
    <p className="stats-box-description">
      A look at the numbers behind design impact and its measurable
      influence on business outcomes.
    </p>
  </div>

  <div className="stats-box-values">
    {stats.map((stat, index) => (
      <div key={index} className="stat-item">
        <div className="stat-value">{stat.value}</div>
        <div className="stat-label">{stat.label}</div>
      </div>
    ))}
  </div>
</div>
```

---

### 8. Author Bio Section

**Visual Structure**:
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│      ABOUT THE AUTHOR                                                       │
│      ─────────────────                                                      │
│                                                                             │
│      ┌──────────┐  Sarah Chen is a design writer and researcher            │
│      │          │  based in San Francisco. Her work explores the           │
│      │  Photo   │  intersection of technology and human experience.        │
│      │          │                                                          │
│      └──────────┘  She has written for The New York Times, Wired,          │
│                    and Fast Company. This is her third piece for           │
│                    The Design Review.                                       │
│                                                                             │
│                    @sarahchen                                               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**CSS**:
```css
.author-bio-section {
  padding: 80px 0;
  border-top: 1px solid var(--rule-light);
}

.author-bio-label {
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 8px;
}

.author-bio-label-line {
  width: 100px;
  height: 1px;
  background: var(--rule-heavy);
  margin-bottom: 40px;
}

.author-bio-content {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 32px;
  align-items: start;
}

@media (max-width: 640px) {
  .author-bio-content {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}

.author-bio-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  filter: grayscale(100%);
}

.author-bio-text {
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.7;
  color: var(--text-secondary);
}

.author-bio-text p {
  margin-bottom: 16px;
}

.author-bio-handle {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  margin-top: 8px;
}
```

**JSX Structure**:
```tsx
<section className="author-bio-section editorial-grid">
  <div className="span-article">
    <div className="author-bio-label">About the Author</div>
    <div className="author-bio-label-line" />

    <div className="author-bio-content">
      <img
        src="/author-sarah.jpg"
        alt="Sarah Chen"
        className="author-bio-image"
      />
      <div className="author-bio-text">
        <p>
          Sarah Chen is a design writer and researcher based in San Francisco.
          Her work explores the intersection of technology and human experience.
        </p>
        <p>
          She has written for The New York Times, Wired, and Fast Company.
          This is her third piece for The Design Review.
        </p>
        <span className="author-bio-handle">@sarahchen</span>
      </div>
    </div>
  </div>
</section>
```

---

### 9. Related Readings Grid

**Visual Structure**:
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│      RELATED READINGS                                                       │
│                                                                             │
│      ┌────────────────┐  ┌────────────────┐  ┌────────────────┐            │
│      │                │  │                │  │                │            │
│      │    [Image]     │  │    [Image]     │  │    [Image]     │            │
│      │                │  │                │  │                │            │
│      ├────────────────┤  ├────────────────┤  ├────────────────┤            │
│      │ The Art of     │  │ Typography     │  │ Designing      │            │
│      │ Restraint      │  │ as Voice       │  │ for Meaning    │            │
│      │                │  │                │  │                │            │
│      │ By James Park  │  │ By Emma Liu    │  │ By David Kim   │            │
│      └────────────────┘  └────────────────┘  └────────────────┘            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**CSS**:
```css
.related-section {
  padding: 80px 0;
  border-top: 1px solid var(--rule-light);
}

.related-label {
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 48px;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

@media (max-width: 768px) {
  .related-grid {
    grid-template-columns: 1fr;
    gap: 48px;
  }
}

.related-card {
  display: block;
  text-decoration: none;
  color: inherit;
}

.related-card-image {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  margin-bottom: 20px;
  filter: grayscale(100%);
  transition: filter 0.4s ease;
}

.related-card:hover .related-card-image {
  filter: grayscale(0%);
}

.related-card-title {
  font-family: var(--font-serif);
  font-size: 22px;
  font-weight: 400;
  line-height: 1.25;
  letter-spacing: -0.01em;
  color: var(--text-primary);
  margin-bottom: 12px;
  transition: color 0.2s ease;
}

.related-card:hover .related-card-title {
  color: var(--editorial-red);
}

.related-card-author {
  font-family: var(--font-sans);
  font-size: 13px;
  color: var(--text-muted);
}
```

**JSX Structure**:
```tsx
const relatedArticles = [
  {
    image: '/related-1.jpg',
    title: 'The Art of Restraint',
    author: 'James Park',
    href: '/articles/restraint',
  },
  {
    image: '/related-2.jpg',
    title: 'Typography as Voice',
    author: 'Emma Liu',
    href: '/articles/typography',
  },
  {
    image: '/related-3.jpg',
    title: 'Designing for Meaning',
    author: 'David Kim',
    href: '/articles/meaning',
  },
];

<section className="related-section editorial-grid">
  <div className="span-wide">
    <div className="related-label">Related Readings</div>

    <div className="related-grid">
      {relatedArticles.map((article, index) => (
        <a key={index} href={article.href} className="related-card">
          <img
            src={article.image}
            alt={article.title}
            className="related-card-image"
          />
          <h3 className="related-card-title">{article.title}</h3>
          <span className="related-card-author">By {article.author}</span>
        </a>
      ))}
    </div>
  </div>
</section>
```

---

### 10. Newsletter Signup

**Visual Structure**:
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                              NEWSLETTER                                     │
│                                                                             │
│                    Subscribe to receive our weekly                          │
│                    curation of design thinking.                             │
│                                                                             │
│                 ┌─────────────────────────────────────┐                    │
│                 │ your@email.com                      │  SUBSCRIBE         │
│                 └─────────────────────────────────────┘                    │
│                                                                             │
│                    No spam. Unsubscribe anytime.                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**CSS**:
```css
.newsletter-section {
  padding: 100px 24px;
  text-align: center;
  background: var(--cream);
}

.newsletter-label {
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 24px;
}

.newsletter-description {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: clamp(20px, 3vw, 26px);
  line-height: 1.5;
  color: var(--text-secondary);
  max-width: 400px;
  margin: 0 auto 40px;
}

.newsletter-form {
  display: flex;
  gap: 0;
  max-width: 480px;
  margin: 0 auto;
}

@media (max-width: 640px) {
  .newsletter-form {
    flex-direction: column;
    gap: 12px;
  }
}

.newsletter-input {
  flex: 1;
  padding: 16px 20px;
  font-family: var(--font-sans);
  font-size: 15px;
  border: 1px solid var(--rule-heavy);
  border-right: none;
  background: var(--paper);
  color: var(--text-primary);
  outline: none;
  transition: border-color 0.2s ease;
}

.newsletter-input:focus {
  border-color: var(--editorial-red);
}

.newsletter-input::placeholder {
  color: var(--text-muted);
}

@media (max-width: 640px) {
  .newsletter-input {
    border-right: 1px solid var(--rule-heavy);
  }
}

.newsletter-button {
  padding: 16px 32px;
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: var(--rule-heavy);
  color: var(--paper);
  border: 1px solid var(--rule-heavy);
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}

.newsletter-button:hover {
  background: var(--editorial-red);
  border-color: var(--editorial-red);
}

.newsletter-disclaimer {
  font-family: var(--font-sans);
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 20px;
}
```

**JSX Structure**:
```tsx
<section className="newsletter-section">
  <div className="newsletter-label">Newsletter</div>
  <p className="newsletter-description">
    Subscribe to receive our weekly curation of design thinking.
  </p>

  <form className="newsletter-form" onSubmit={handleSubmit}>
    <input
      type="email"
      className="newsletter-input"
      placeholder="your@email.com"
      required
    />
    <button type="submit" className="newsletter-button">
      Subscribe
    </button>
  </form>

  <p className="newsletter-disclaimer">
    No spam. Unsubscribe anytime.
  </p>
</section>
```

---

### 11. Footer

**Visual Structure**:
```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ═══════════════════════════════════════════════════════════════════════   │
│                                                                             │
│      THE DESIGN REVIEW                         Issue 47 - December 2024    │
│                                                                             │
│      About  •  Archive  •  Subscribe  •  Contact                           │
│                                                                             │
│      © 2024 The Design Review. All rights reserved.                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**CSS**:
```css
.footer-editorial {
  padding: 64px 24px;
  border-top: 3px solid var(--rule-heavy);
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-main {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 40px;
}

@media (max-width: 640px) {
  .footer-main {
    flex-direction: column;
    align-items: center;
    gap: 16px;
    text-align: center;
  }
}

.footer-title {
  font-family: var(--font-serif);
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--text-primary);
}

.footer-issue {
  font-family: var(--font-sans);
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.footer-nav {
  display: flex;
  gap: 32px;
  margin-bottom: 32px;
  justify-content: center;
}

.footer-nav-link {
  font-family: var(--font-sans);
  font-size: 13px;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-nav-link:hover {
  color: var(--editorial-red);
}

.footer-copyright {
  font-family: var(--font-sans);
  font-size: 12px;
  color: var(--text-muted);
  text-align: center;
}
```

**JSX Structure**:
```tsx
<footer className="footer-editorial">
  <div className="footer-inner">
    <div className="footer-main">
      <span className="footer-title">THE DESIGN REVIEW</span>
      <span className="footer-issue">Issue 47 - December 2024</span>
    </div>

    <nav className="footer-nav">
      <a href="/about" className="footer-nav-link">About</a>
      <a href="/archive" className="footer-nav-link">Archive</a>
      <a href="/subscribe" className="footer-nav-link">Subscribe</a>
      <a href="/contact" className="footer-nav-link">Contact</a>
    </nav>

    <p className="footer-copyright">
      © 2024 The Design Review. All rights reserved.
    </p>
  </div>
</footer>
```

---

## Animation System

### Minimal - Typography Does the Work

Editorial design relies on typography, not animation. Use restraint.

```typescript
// Motion Configuration
// ONLY for image reveals - NO text animation

// Simple image fade + scale on scroll into view
const imageReveal = {
  initial: { opacity: 0, scale: 1.03 },
  whileInView: { opacity: 1, scale: 1 },
  transition: {
    duration: 0.8,
    ease: [0.25, 0.1, 0.25, 1], // Smooth cubic-bezier
  },
  viewport: { once: true, margin: '-100px' },
};

// Subtle fade for sections
const sectionFade = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  transition: { duration: 0.6 },
  viewport: { once: true },
};

// NO stagger animations
// NO spring physics
// NO animated typography
// NO parallax (except subtle on hero image)
```

### Hover States

```css
/* Links - Underline style */
.editorial-link {
  color: var(--text-primary);
  text-decoration: none;
  background-image: linear-gradient(var(--editorial-red), var(--editorial-red));
  background-size: 0% 2px;
  background-position: 0% 100%;
  background-repeat: no-repeat;
  transition: background-size 0.3s ease;
}

.editorial-link:hover {
  background-size: 100% 2px;
}

/* Image grayscale to color */
.editorial-image-hover {
  filter: grayscale(100%);
  transition: filter 0.4s ease;
}

.editorial-image-hover:hover {
  filter: grayscale(0%);
}

/* Minimal card lift - subtle */
.editorial-card {
  transition: transform 0.3s ease;
}

.editorial-card:hover {
  transform: translateY(-4px);
}
```

---

## Link Styling Component

```tsx
interface EditorialLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

export function EditorialLink({ href, children, external }: EditorialLinkProps) {
  return (
    <a
      href={href}
      className="editorial-link"
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  );
}
```

---

## Required npm Packages

```json
{
  "dependencies": {
    "next": "^16.4.0",
    "react": "^19.3.0",
    "react-dom": "^19.3.0",
    "motion": "^14.14.0"
  },
  "devDependencies": {
    "typescript": "^7.0.0",
    "@types/node": "^26.6.0",
    "@types/react": "^19.3.0",
    "@types/react-dom": "^19.3.0",
    "tailwindcss": "^4.3.0",
    "@tailwindcss/postcss": "^4.3.0",
    "postcss": "^8.5.0"
  }
}
```

**Note**: Minimal dependencies. No animation libraries beyond Motion. No icon libraries (no icons needed). Focus on typography.

---

## Sample Data Structure

```typescript
// types.ts

export interface Article {
  title: string;
  subtitle: string;
  author: string;
  date: string;
  issueNumber: string;
  heroImage: string;
  heroCaption: string;
  sections: ArticleSection[];
}

export interface ArticleSection {
  number: string;
  title: string;
  content: string[];
  pullQuote?: PullQuote;
  figure?: Figure;
}

export interface PullQuote {
  text: string;
  attribution: string;
}

export interface Figure {
  src: string;
  alt: string;
  label: string;
  caption: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface RelatedArticle {
  image: string;
  title: string;
  author: string;
  href: string;
}

export interface Author {
  name: string;
  image: string;
  bio: string;
  handle: string;
}

// Sample data
export const sampleArticle: Article = {
  title: 'THE FUTURE OF DESIGN',
  subtitle: 'A meditation on craft, intention, and the tools that shape our work',
  author: 'Sarah Chen',
  date: 'December 2024',
  issueNumber: '47',
  heroImage: '/hero-design.jpg',
  heroCaption: 'Photography by Marcus Webb - San Francisco, 2024',
  sections: [
    {
      number: '01',
      title: 'The Beginning',
      content: [
        'The story of design is, at its core, a story of intention. Every curve, every pixel, every carefully considered spacing decision reflects a choice made with purpose. The best designers understand that their role is not to decorate, but to clarify.',
        'They create systems that communicate meaning through form, not despite it. In an age of infinite digital possibility, constraint becomes liberation. The grid becomes a guide. Typography becomes voice.',
        'This understanding didn\'t emerge overnight. It evolved through centuries of craft, from the precision of letterpress to the fluidity of digital tools. Each generation built upon the last, refining principles that transcend any single medium.',
      ],
      pullQuote: {
        text: 'Design is not just what it looks like and feels like. Design is how it works.',
        attribution: 'Steve Jobs',
      },
      figure: {
        src: '/figure-1.jpg',
        alt: 'The intersection of form and function',
        label: 'Fig. 1',
        caption: 'The intersection of form and function reveals itself in the careful balance of negative space.',
      },
    },
    {
      number: '02',
      title: 'The Craft',
      content: [
        'Great design emerges from deep understanding-of materials, of constraints, of human needs. It requires patience, iteration, and the willingness to discard what doesn\'t serve the whole.',
        'The most skilled practitioners develop an intuition that looks like magic but is actually the distillation of countless hours of practice. They see possibilities where others see limitations.',
      ],
    },
    {
      number: '03',
      title: 'The Future',
      content: [
        'As we look ahead, the fundamental questions remain unchanged: How do we create meaningful experiences? How do we respect the people who use what we make? How do we balance innovation with responsibility?',
        'The answers will evolve, but the inquiry itself is eternal. Design, at its best, is an act of service-a bridge between possibility and reality, between intention and impact.',
      ],
    },
  ],
};

export const stats: Stat[] = [
  { value: '10,000+', label: 'Hours of research' },
  { value: '47', label: 'Countries studied' },
  { value: '$2.4T', label: 'Economic impact' },
];

export const relatedArticles: RelatedArticle[] = [
  {
    image: '/related-1.jpg',
    title: 'The Art of Restraint',
    author: 'James Park',
    href: '/articles/restraint',
  },
  {
    image: '/related-2.jpg',
    title: 'Typography as Voice',
    author: 'Emma Liu',
    href: '/articles/typography',
  },
  {
    image: '/related-3.jpg',
    title: 'Designing for Meaning',
    author: 'David Kim',
    href: '/articles/meaning',
  },
];

export const author: Author = {
  name: 'Sarah Chen',
  image: '/author-sarah.jpg',
  bio: 'Sarah Chen is a design writer and researcher based in San Francisco. Her work explores the intersection of technology and human experience. She has written for The New York Times, Wired, and Fast Company. This is her third piece for The Design Review.',
  handle: '@sarahchen',
};
```

---

## What to ABSOLUTELY AVOID

1. **Busy animations** - Let typography speak, not movement
2. **Rounded corners on images** - Keep editorial sharpness
3. **Drop shadows** - Clean, flat aesthetic
4. **Gradients** - Solid colors only
5. **Generic sans-serif everywhere** - Serif headlines are essential
6. **Competing visual elements** - One hero element per section
7. **Standard "website" patterns** - This is a publication, not a SaaS site
8. **Animated typography** - Words should be read, not watched
9. **Icon libraries** - No icons, typography is the icon
10. **Too many colors** - Restrained palette, maybe 2-3 colors total
11. **Equal-width columns** - Varied spans create visual interest
12. **Centered everything** - Offset content creates tension
13. **Small body text** - Reading comfort is paramount (min 18px)
14. **Tight line-height** - Generous vertical rhythm (1.7+)

---

## Final Notes

- **Typography First**: The page should feel like a designed publication. Headlines, body text, captions-all carefully considered.
- **Restraint is Elegance**: Minimal color. Minimal animation. Maximum impact through craft.
- **Reading Experience**: Optimize for comfortable, sustained reading. Proper column width (65ch), generous line-height, quality fonts.
- **Art Direction**: Every image should feel intentional. Consider duotone treatments, non-standard crops.
- **White Space**: Generous margins and section spacing. Let content breathe.
- **Editorial Details**: Drop caps, pull quotes, figure numbers, bylines-the details that make it feel published.
- **Grid Mastery**: Use CSS Grid with varied column spans. Offset from center. Create asymmetric tension.
- **Print Inspiration**: Think New York Times Magazine, The New Yorker, Bloomberg Businessweek.

Generate a complete, production-ready component implementing all specifications above. Every section should be present with real, placeholder-free content. The result should feel like a beautifully designed magazine article.
