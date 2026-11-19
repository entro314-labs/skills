# Neobrutalist Landing Page - Exhaustive Technical Specification

## Output Requirements

Generate a **single React component** that renders a complete neobrutalist landing page. Requirements:
- Next.js with App Router
- TypeScript strict mode
- Tailwind CSS v4 with the custom theme below
- Motion for animations (TWEEN ONLY - NO SPRINGS)
- NO external icon libraries - custom stroke-only SVG icons
- Mobile-first responsive design

**Philosophy**: Reject polished SaaS aesthetics. Embrace deliberate rawness, hard edges, solid shadows, asymmetric layouts, and honest "this is a marketing page" energy. The anti-design IS the design.

---

## Page Structure Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│ HEADER - Fixed, transparent, black border-bottom 3px                    │
├─────────────────────────────────────────────────────────────────────────┤
│ HERO SECTION                                                            │
│ ┌──────────────────────────────────┬────────────────────────────────┐   │
│ │ MASSIVE HEADLINE                 │ Product Screenshot             │   │
│ │ with hard text shadow            │ Tilted 5-10deg                 │   │
│ │                                  │ Thick black border             │   │
│ │ Subheadline text                 │ Solid offset shadow            │   │
│ │                                  │                                │   │
│ │ [START FREE →] [SEE DEMO]        │                                │   │
│ └──────────────────────────────────┴────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────────────┤
│ MARQUEE - Infinite scroll, thick borders top/bottom                     │
│ ════════════════════════════════════════════════════════════════════    │
│ TRUSTED BY 10,000+ TEAMS • FEATURED IN TECHCRUNCH • 99.9% UPTIME •      │
│ ════════════════════════════════════════════════════════════════════    │
├─────────────────────────────────────────────────────────────────────────┤
│ FEATURES SECTION - Asymmetric bento grid                                │
│ ┌───────────────────────────┬───────────────┐                           │
│ │                           │               │                           │
│ │    FEATURE 01             │  FEATURE 02   │                           │
│ │    Large card             │  Smaller      │                           │
│ │                           │               │                           │
│ ├─────────────┬─────────────┴───────────────┤                           │
│ │ FEATURE 03  │        FEATURE 04           │                           │
│ │ Small       │        Wide card            │                           │
│ └─────────────┴─────────────────────────────┘                           │
├─────────────────────────────────────────────────────────────────────────┤
│ HOW IT WORKS - Numbered steps with oversized numbers                    │
│                                                                         │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐            │
│  │ 01             │  │ 02             │  │ 03             │            │
│  │ ════           │  │ ════           │  │ ════           │            │
│  │ Sign Up        │→→│ Connect        │→→│ Launch         │            │
│  │ Description    │  │ Description    │  │ Description    │            │
│  └────────────────┘  └────────────────┘  └────────────────┘            │
├─────────────────────────────────────────────────────────────────────────┤
│ SOCIAL PROOF SECTION                                                    │
│                                                                         │
│ Logo Wall (bordered grid)    │    Stats Block                          │
│ ┌────┬────┬────┬────┐        │    ┌─────────────────────────┐          │
│ │LOGO│LOGO│LOGO│LOGO│        │    │ 10,000+    │   99.9%    │          │
│ ├────┼────┼────┼────┤        │    │ USERS      │   UPTIME   │          │
│ │LOGO│LOGO│LOGO│LOGO│        │    ├────────────┼────────────┤          │
│ └────┴────┴────┴────┘        │    │ 50M+       │   <100ms   │          │
│                              │    │ REQUESTS   │   LATENCY  │          │
│                              │    └────────────┴────────────┘          │
├─────────────────────────────────────────────────────────────────────────┤
│ TESTIMONIALS - Horizontal scroll cards                                  │
│                                                                         │
│  ┌────────────────────┐ ┌────────────────────┐ ┌────────────────────┐  │
│  │ "Quote text..."    │ │ "Quote text..."    │ │ "Quote text..."    │  │
│  │                    │ │                    │ │                    │  │
│  │ - PERSON NAME      │ │ - PERSON NAME      │ │ - PERSON NAME      │  │
│  │   COMPANY          │ │   COMPANY          │ │   COMPANY          │  │
│  └────────────────────┘ └────────────────────┘ └────────────────────┘  │
├─────────────────────────────────────────────────────────────────────────┤
│ PRICING SECTION - Asymmetric 2-column                                   │
│                                                                         │
│  ┌─────────────────────────────┐  ┌─────────────────────────────────┐  │
│  │ FREE                        │  │ PRO ★                           │  │
│  │ $0/mo                       │  │ $29/mo                          │  │
│  │ ──────────────              │  │ ──────────────                  │  │
│  │ ✓ Feature one               │  │ ✓ Everything in Free            │  │
│  │ ✓ Feature two               │  │ ✓ Unlimited projects            │  │
│  │ ✓ Feature three             │  │ ✓ Priority support              │  │
│  │                             │  │ ✓ Custom integrations           │  │
│  │ [GET STARTED]               │  │ [START FREE TRIAL →]            │  │
│  └─────────────────────────────┘  └─────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────────┤
│ FAQ SECTION - Accordion with hard transitions                           │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ + HOW DOES BILLING WORK?                                        │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ − WHAT ABOUT SECURITY?                                          │   │
│  │   Answer text appears instantly, no fade                        │   │
│  └─────────────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────────────┤
│ FINAL CTA - Full-width accent background                                │
│ ╔═══════════════════════════════════════════════════════════════════╗  │
│ ║                                                                    ║  │
│ ║  READY TO START?                                                   ║  │
│ ║  Stop overthinking. Start building.                                ║  │
│ ║                                                                    ║  │
│ ║  [GET STARTED FREE →]                                              ║  │
│ ║                                                                    ║  │
│ ╚═══════════════════════════════════════════════════════════════════╝  │
├─────────────────────────────────────────────────────────────────────────┤
│ FOOTER - Minimal, bordered sections                                     │
│ Logo │ Links │ Links │ Links │ Social │                                 │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Color System

### CSS Custom Properties (define in globals.css)

```css
:root {
  /* Colours that also exist in the Tailwind theme point at it, so each value is written once, in @theme. */

  /* Backgrounds */
  --bg-primary: var(--color-neo-cream);      /* Warm off-white, paper-like */
  --bg-secondary: var(--color-neo-kraft);    /* Kraft paper tan */
  --bg-tertiary: var(--color-neo-kraft-dark);     /* Darker kraft */
  --bg-inverse: var(--color-neo-black);      /* Near black for inverted sections */

  /* Accent Colors - Bold, No Subtlety */
  --accent-hot: var(--color-neo-hot);      /* Aggressive orange - primary CTA */
  --accent-electric: var(--color-neo-electric); /* Pure saturated blue */
  --accent-acid: var(--color-neo-acid);     /* Acid green-yellow */
  --accent-magenta: var(--color-neo-magenta);  /* Hot magenta */
  --accent-cyan: var(--color-neo-cyan);     /* Electric cyan */

  /* Text */
  --text-primary: var(--color-neo-black);    /* Near black */
  --text-secondary: #4A4A4A;  /* Dark gray */
  --text-muted: #6B6B6B;      /* Medium gray */
  --text-inverse: var(--color-neo-cream);    /* Off-white on dark */

  /* Borders & Shadows - ALWAYS SOLID, NEVER BLURRED */
  --border-color: var(--color-neo-black);    /* Black borders */
  --border-width: 3px;        /* Thick borders everywhere */
  --shadow-color: var(--color-neo-black);    /* Black shadow default */
  --shadow-offset: 6px;       /* Standard offset */
  --shadow-offset-lg: 10px;   /* Large offset for hover */

  /* Functional */
  --success: var(--color-neo-success);         /* Bright green */
  --error: var(--color-neo-error);           /* Bright red */
  --warning: var(--color-neo-warning);         /* Yellow */
}
```

### Tailwind Theme (globals.css)

```css
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  --color-neo-cream: #FFFEF0;
  --color-neo-kraft: #E8E4D9;
  --color-neo-kraft-dark: #D4CFC4;
  --color-neo-black: #1A1A1A;
  --color-neo-hot: #FF5C00;
  --color-neo-electric: #0066FF;
  --color-neo-acid: #BFFF00;
  --color-neo-magenta: #FF00FF;
  --color-neo-cyan: #00FFFF;
  --color-neo-success: #00CC66;
  --color-neo-error: #FF3333;
  --color-neo-warning: #FFCC00;

  --font-sans: "Space Grotesk", system-ui, sans-serif;
  --font-mono: "Space Mono", Menlo, monospace;
  --font-display: "Space Grotesk", system-ui, sans-serif;

  --text-display-xl: 120px;
  --text-display-xl--line-height: 1;
  --text-display-xl--letter-spacing: -0.03em;
  --text-display-xl--font-weight: 900;
  --text-display-lg: 96px;
  --text-display-lg--line-height: 1;
  --text-display-lg--letter-spacing: -0.03em;
  --text-display-lg--font-weight: 900;
  --text-display-md: 72px;
  --text-display-md--line-height: 1.05;
  --text-display-md--letter-spacing: -0.02em;
  --text-display-md--font-weight: 900;
  --text-display-sm: 56px;
  --text-display-sm--line-height: 1.1;
  --text-display-sm--letter-spacing: -0.02em;
  --text-display-sm--font-weight: 800;
  --text-heading-xl: 48px;
  --text-heading-xl--line-height: 1.1;
  --text-heading-xl--letter-spacing: -0.02em;
  --text-heading-xl--font-weight: 700;
  --text-heading-lg: 36px;
  --text-heading-lg--line-height: 1.15;
  --text-heading-lg--letter-spacing: -0.01em;
  --text-heading-lg--font-weight: 700;
  --text-heading-md: 28px;
  --text-heading-md--line-height: 1.2;
  --text-heading-md--letter-spacing: -0.01em;
  --text-heading-md--font-weight: 700;
  --text-heading-sm: 24px;
  --text-heading-sm--line-height: 1.25;
  --text-heading-sm--font-weight: 700;
  --text-body-xl: 20px;
  --text-body-xl--line-height: 1.5;
  --text-body-xl--font-weight: 500;
  --text-body-lg: 18px;
  --text-body-lg--line-height: 1.6;
  --text-body-lg--font-weight: 500;
  --text-body-md: 16px;
  --text-body-md--line-height: 1.6;
  --text-body-md--font-weight: 500;
  --text-body-sm: 14px;
  --text-body-sm--line-height: 1.5;
  --text-body-sm--font-weight: 500;
  --text-label: 12px;
  --text-label--line-height: 1.4;
  --text-label--letter-spacing: 0.1em;
  --text-label--font-weight: 700;
  --text-number-huge: 160px;
  --text-number-huge--line-height: 0.85;
  --text-number-huge--letter-spacing: -0.04em;
  --text-number-huge--font-weight: 900;
  --text-number-large: 120px;
  --text-number-large--line-height: 0.85;
  --text-number-large--letter-spacing: -0.04em;
  --text-number-large--font-weight: 900;

  --shadow-neo-sm: 4px 4px 0 0 #1A1A1A;
  --shadow-neo-md: 6px 6px 0 0 #1A1A1A;
  --shadow-neo-lg: 10px 10px 0 0 #1A1A1A;
  --shadow-neo-xl: 14px 14px 0 0 #1A1A1A;
  --shadow-neo-hot: 6px 6px 0 0 #FF5C00;
  --shadow-neo-hot-lg: 10px 10px 0 0 #FF5C00;
  --shadow-neo-electric: 6px 6px 0 0 #0066FF;
  --shadow-neo-electric-lg: 10px 10px 0 0 #0066FF;
  --shadow-neo-acid: 6px 6px 0 0 #BFFF00;
  --shadow-neo-acid-lg: 10px 10px 0 0 #BFFF00;
  --shadow-neo-magenta: 6px 6px 0 0 #FF00FF;
  --shadow-neo-cyan: 6px 6px 0 0 #00FFFF;

  --animate-marquee: marquee 25s linear infinite;
  --animate-marquee-reverse: marquee-reverse 25s linear infinite;
  --animate-blink: blink 1s step-end infinite;

  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-100%); }
  }
  @keyframes marquee-reverse {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(0); }
  }
  @keyframes blink {
    50% { opacity: 0; }
  }
}

/* No theme entry needed in v4: border-3, border-4, border-5, spacing 18, spacing 22, spacing 30, spacing 34, duration-75, duration-100, duration-150 */
```

---

## Typography System

### Font Loading (layout.tsx)

```tsx
import { Space_Grotesk, Space_Mono } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '700'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${spaceMono.variable}`}>
      <body className="font-sans bg-neo-cream text-neo-black antialiased">
        {children}
      </body>
    </html>
  );
}
```

### Typography Utility Classes

```css
/* Text Shadow for Headlines */
.text-shadow-neo {
  text-shadow: 4px 4px 0 #1A1A1A;
}

.text-shadow-neo-lg {
  text-shadow: 6px 6px 0 #1A1A1A;
}

.text-shadow-neo-white {
  text-shadow: 4px 4px 0 #FFFEF0;
}

/* Uppercase Labels */
.label-neo {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

/* Monospace Numbers */
.number-neo {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
}
```

---

## Layout System

### Base Layout Classes

```css
/* Full-viewport sections with NO centering by default */
.section-full {
  min-height: 100vh;
  padding: 120px 48px;
  position: relative;
}

/* Asymmetric container - NOT centered */
.container-neo {
  max-width: 1400px;
  margin-left: 48px;
  margin-right: 48px;
  padding: 0;
}

/* Centered container for specific sections */
.container-neo-center {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 48px;
}

/* Grid gaps with visible borders */
.grid-bordered {
  gap: 3px;
  background: #1A1A1A;
  padding: 3px;
}

.grid-bordered > * {
  background: #FFFEF0;
}
```

### Responsive Breakpoints

```typescript
// breakpoints.ts
export const breakpoints = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet
  lg: '1024px',  // Small desktop
  xl: '1280px',  // Desktop
  '2xl': '1536px', // Large desktop
};
```

---

## Component Specifications

### 1. Header Component

```tsx
interface HeaderProps {
  logoText: string;
  navLinks: { label: string; href: string }[];
  ctaText: string;
  ctaHref: string;
}
```

**Visual Structure**:
```
┌────────────────────────────────────────────────────────────────────────────┐
│ LOGO▪TEXT        NAV  NAV  NAV  NAV              [GET STARTED →]           │
│════════════════════════════════════════════════════════════════════════════│
```

**CSS**:
```css
.header-neo {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: #FFFEF0;
  border-bottom: 3px solid #1A1A1A;
  padding: 16px 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-logo {
  font-size: 24px;
  font-weight: 900;
  letter-spacing: -0.02em;
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-logo-mark {
  width: 12px;
  height: 12px;
  background: #FF5C00;
  transform: rotate(45deg);
}

.header-nav {
  display: flex;
  gap: 32px;
}

.header-nav-link {
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 8px 0;
  border-bottom: 3px solid transparent;
  transition: border-color 0.1s ease-out;
}

.header-nav-link:hover {
  border-bottom-color: #1A1A1A;
}
```

**JSX Structure**:
```tsx
<header className="header-neo">
  <div className="header-logo">
    <span className="header-logo-mark" />
    {logoText}
  </div>

  <nav className="header-nav">
    {navLinks.map((link) => (
      <a key={link.href} href={link.href} className="header-nav-link">
        {link.label}
      </a>
    ))}
  </nav>

  <NeoButton variant="primary" href={ctaHref}>
    {ctaText}
  </NeoButton>
</header>
```

---

### 2. Hero Section

**Visual Structure**:
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  ██████╗ ██╗   ██╗██╗██╗     ██████╗                                       │
│  ██╔══██╗██║   ██║██║██║     ██╔══██╗                                      │
│  ██████╔╝██║   ██║██║██║     ██║  ██║    ┌──────────────────────────────┐  │
│  ██╔══██╗██║   ██║██║██║     ██║  ██║    │                              │  │
│  ██████╔╝╚██████╔╝██║███████╗██████╔╝    │   Product Screenshot         │  │
│  ╚═════╝  ╚═════╝ ╚═╝╚══════╝╚═════╝     │   Tilted 5deg               │  │
│                                           │   3px black border          │  │
│  BETTER                                   │   6px solid shadow          │  │
│                                           │                              │  │
│  The tool that does the thing            └──────────────────────────────┘  │
│  you need done, without the BS.                                            │
│                                           ▲                                 │
│  [START FREE →]    SEE IT WORK           │ Shadow offset                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**CSS**:
```css
.hero-section {
  min-height: 100vh;
  padding: 160px 48px 120px;
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 64px;
  align-items: center;
}

@media (max-width: 1024px) {
  .hero-section {
    grid-template-columns: 1fr;
    padding: 140px 24px 80px;
    gap: 48px;
  }
}

.hero-content {
  max-width: 720px;
}

.hero-headline {
  font-size: 96px;
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.03em;
  text-shadow: 6px 6px 0 #1A1A1A;
  margin-bottom: 8px;
}

@media (max-width: 1024px) {
  .hero-headline {
    font-size: 64px;
    text-shadow: 4px 4px 0 #1A1A1A;
  }
}

@media (max-width: 640px) {
  .hero-headline {
    font-size: 48px;
    text-shadow: 3px 3px 0 #1A1A1A;
  }
}

.hero-headline-accent {
  color: #FF5C00;
  display: block;
  text-shadow: 6px 6px 0 #1A1A1A;
}

.hero-subheadline {
  font-size: 24px;
  font-weight: 500;
  line-height: 1.4;
  color: #4A4A4A;
  margin-top: 24px;
  max-width: 540px;
}

.hero-cta-group {
  display: flex;
  gap: 16px;
  margin-top: 40px;
  flex-wrap: wrap;
}

.hero-image-container {
  position: relative;
}

.hero-image-wrapper {
  transform: rotate(3deg);
  border: 3px solid #1A1A1A;
  box-shadow: 12px 12px 0 #1A1A1A;
  overflow: hidden;
  background: #FFFEF0;
}

.hero-image {
  width: 100%;
  height: auto;
  display: block;
}

/* Decorative badge */
.hero-badge {
  position: absolute;
  top: -20px;
  right: -20px;
  background: #BFFF00;
  border: 3px solid #1A1A1A;
  padding: 12px 20px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transform: rotate(8deg);
  box-shadow: 4px 4px 0 #1A1A1A;
}
```

**JSX Structure**:
```tsx
<section className="hero-section">
  <div className="hero-content">
    <h1 className="hero-headline">
      BUILD
      <span className="hero-headline-accent">BETTER</span>
    </h1>
    <p className="hero-subheadline">
      The tool that does the thing you need done, without the BS.
      Stop overthinking. Start shipping.
    </p>
    <div className="hero-cta-group">
      <NeoButton variant="primary" size="lg">
        START FREE <ArrowRightIcon />
      </NeoButton>
      <NeoButton variant="ghost" size="lg">
        SEE IT WORK
      </NeoButton>
    </div>
  </div>

  <div className="hero-image-container">
    <div className="hero-image-wrapper">
      <img
        src="/product-screenshot.png"
        alt="Product interface"
        className="hero-image"
      />
    </div>
    <div className="hero-badge">NEW v2.0</div>
  </div>
</section>
```

---

### 3. Marquee Section

**Visual Structure**:
```
════════════════════════════════════════════════════════════════════════════════
│  TRUSTED BY 10,000+ TEAMS • FEATURED IN TECHCRUNCH • PRODUCT HUNT #1 •  → →  │
════════════════════════════════════════════════════════════════════════════════
│  ← ← • 99.9% UPTIME • SOC2 CERTIFIED • GDPR COMPLIANT • LOVED BY DEVS •      │
════════════════════════════════════════════════════════════════════════════════
```

**CSS**:
```css
.marquee-section {
  background: #BFFF00;
  border-top: 3px solid #1A1A1A;
  border-bottom: 3px solid #1A1A1A;
  padding: 0;
  overflow: hidden;
}

.marquee-track {
  display: flex;
  width: max-content;
}

.marquee-content {
  display: flex;
  align-items: center;
  gap: 48px;
  padding: 20px 24px;
  animation: marquee 25s linear infinite;
}

.marquee-content-reverse {
  animation: marquee-reverse 25s linear infinite;
}

.marquee-item {
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 12px;
}

.marquee-separator {
  width: 8px;
  height: 8px;
  background: #1A1A1A;
  transform: rotate(45deg);
  flex-shrink: 0;
}

/* Dual row marquee */
.marquee-row-1 {
  background: #BFFF00;
  border-bottom: 3px solid #1A1A1A;
}

.marquee-row-2 {
  background: #FF5C00;
  color: #FFFEF0;
}

.marquee-row-2 .marquee-separator {
  background: #FFFEF0;
}
```

**JSX Structure**:
```tsx
<section className="marquee-section">
  {/* Row 1 - Left to right */}
  <div className="marquee-row-1">
    <div className="marquee-track">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="marquee-content">
          <span className="marquee-item">TRUSTED BY 10,000+ TEAMS</span>
          <span className="marquee-separator" />
          <span className="marquee-item">FEATURED IN TECHCRUNCH</span>
          <span className="marquee-separator" />
          <span className="marquee-item">PRODUCT HUNT #1</span>
          <span className="marquee-separator" />
          <span className="marquee-item">BACKED BY YC</span>
          <span className="marquee-separator" />
        </div>
      ))}
    </div>
  </div>

  {/* Row 2 - Right to left */}
  <div className="marquee-row-2">
    <div className="marquee-track">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="marquee-content marquee-content-reverse">
          <span className="marquee-item">99.9% UPTIME</span>
          <span className="marquee-separator" />
          <span className="marquee-item">SOC2 CERTIFIED</span>
          <span className="marquee-separator" />
          <span className="marquee-item">GDPR COMPLIANT</span>
          <span className="marquee-separator" />
          <span className="marquee-item">LOVED BY DEVS</span>
          <span className="marquee-separator" />
        </div>
      ))}
    </div>
  </div>
</section>
```

---

### 4. Features Bento Grid

**Visual Structure**:
```
┌───────────────────────────────────────────┬────────────────────────┐
│                                           │                        │
│  01                                       │  02                    │
│  ══                                       │  ══                    │
│  LIGHTNING FAST                           │  DEAD SIMPLE           │
│                                           │                        │
│  Built on edge infrastructure.            │  No PhD required.      │
│  <100ms response globally.                │  If you can click,     │
│                                           │  you can use it.       │
│  [Animation: Counter 0→100]               │                        │
│                                           │                        │
├─────────────────┬─────────────────────────┴────────────────────────┤
│                 │                                                   │
│  03             │  04                                               │
│  ══             │  ══                                               │
│  SECURE         │  INTEGRATES WITH EVERYTHING                      │
│                 │                                                   │
│  Bank-grade     │  Slack, GitHub, Linear, Notion, Figma,           │
│  encryption.    │  Jira, Asana, Discord, and 100+ more.            │
│                 │                                                   │
│                 │  [Grid of integration logos]                      │
│                 │                                                   │
└─────────────────┴───────────────────────────────────────────────────┘
```

**CSS**:
```css
.features-section {
  padding: 120px 48px;
  background: #E8E4D9;
}

.features-header {
  margin-bottom: 64px;
}

.features-label {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #4A4A4A;
  margin-bottom: 16px;
}

.features-headline {
  font-size: 56px;
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -0.02em;
}

.features-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto auto;
  gap: 3px;
  background: #1A1A1A;
  padding: 3px;
}

.features-grid > * {
  background: #FFFEF0;
}

@media (max-width: 1024px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
}

/* Feature Card Base */
.feature-card {
  padding: 48px;
  display: flex;
  flex-direction: column;
  position: relative;
}

.feature-card:hover {
  background: #FFFEF0;
}

/* Large feature card */
.feature-card-lg {
  min-height: 400px;
}

/* Wide feature card */
.feature-card-wide {
  grid-column: span 2;
}

@media (max-width: 1024px) {
  .feature-card-wide {
    grid-column: span 1;
  }
}

.feature-number {
  font-size: 120px;
  font-weight: 900;
  line-height: 0.85;
  letter-spacing: -0.04em;
  color: #E8E4D9;
  margin-bottom: 24px;
}

.feature-title {
  font-size: 28px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.01em;
  margin-bottom: 16px;
}

.feature-description {
  font-size: 16px;
  line-height: 1.6;
  color: #4A4A4A;
  max-width: 400px;
}

/* Feature card with accent */
.feature-card-accent {
  background: #FF5C00;
  color: #FFFEF0;
}

.feature-card-accent .feature-number {
  color: rgba(255, 255, 255, 0.2);
}

.feature-card-accent .feature-description {
  color: rgba(255, 255, 255, 0.8);
}
```

**JSX Structure**:
```tsx
<section className="features-section">
  <div className="features-header">
    <p className="features-label">FEATURES</p>
    <h2 className="features-headline">
      Everything you need.<br />
      Nothing you don't.
    </h2>
  </div>

  <div className="features-grid">
    {/* Large card - top left */}
    <div className="feature-card feature-card-lg">
      <span className="feature-number">01</span>
      <h3 className="feature-title">LIGHTNING FAST</h3>
      <p className="feature-description">
        Built on edge infrastructure. Sub-100ms response times globally.
        Because waiting is for loading screens, not your tools.
      </p>
      <AnimatedCounter value={100} suffix="ms" />
    </div>

    {/* Standard card - top right */}
    <div className="feature-card feature-card-accent">
      <span className="feature-number">02</span>
      <h3 className="feature-title">DEAD SIMPLE</h3>
      <p className="feature-description">
        No PhD required. If you can click, you can use it.
        We obsess over simplicity so you don't have to.
      </p>
    </div>

    {/* Small card - bottom left */}
    <div className="feature-card">
      <span className="feature-number">03</span>
      <h3 className="feature-title">SECURE</h3>
      <p className="feature-description">
        Bank-grade encryption. SOC2 Type II certified.
        Your data is safer here than in Fort Knox.
      </p>
    </div>

    {/* Wide card - bottom right (spans 2 on desktop becomes full width) */}
    <div className="feature-card feature-card-wide">
      <span className="feature-number">04</span>
      <h3 className="feature-title">INTEGRATES WITH EVERYTHING</h3>
      <p className="feature-description">
        Slack, GitHub, Linear, Notion, Figma, Jira, Asana, Discord,
        and 100+ more. If it exists, we connect to it.
      </p>
      <IntegrationLogos />
    </div>
  </div>
</section>
```

---

### 5. How It Works Section

**Visual Structure**:
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  HOW IT WORKS                                                               │
│                                                                             │
│  Three steps. That's it.                                                    │
│                                                                             │
│  ┌─────────────────────┐    ┌─────────────────────┐    ┌─────────────────────┐
│  │                     │    │                     │    │                     │
│  │  ██████╗  ██╗      │    │  ██████╗  ██████╗  │    │  ██████╗  ██████╗  │
│  │  ██╔═══╝  ██║      │ →→ │  ██╔═══╝  ██╔═══╝  │ →→ │  ██╔═══╝  ██║ ██║  │
│  │  ██████╗  ██║      │    │  ██████╗  ██████╗  │    │  ██████╗  ██████╔╝  │
│  │  ╚═══██║  ██║      │    │  ╚═══██║  ╚═══██║  │    │  ╚═══██║  ╚═══██║   │
│  │  ██████║  ██║      │    │  ██████║  ██████║  │    │  ██████║  ██████║   │
│  │  ╚═════╝  ╚═╝      │    │  ╚═════╝  ╚═════╝  │    │  ╚═════╝  ╚═════╝   │
│  │                     │    │                     │    │                     │
│  │  ═════════════      │    │  ═════════════      │    │  ═════════════      │
│  │  SIGN UP            │    │  CONNECT            │    │  LAUNCH             │
│  │                     │    │                     │    │                     │
│  │  Create your free   │    │  Link your tools    │    │  Start using        │
│  │  account in 30 sec  │    │  in one click       │    │  immediately        │
│  │                     │    │                     │    │                     │
│  └─────────────────────┘    └─────────────────────┘    └─────────────────────┘
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**CSS**:
```css
.how-it-works-section {
  padding: 120px 48px;
  background: #FFFEF0;
}

.how-it-works-header {
  margin-bottom: 80px;
}

.how-it-works-steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  position: relative;
}

@media (max-width: 768px) {
  .how-it-works-steps {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

/* Arrow connector between steps */
.step-connector {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-connector::before,
.step-connector::after {
  content: '→';
  font-size: 24px;
  font-weight: 900;
  color: #1A1A1A;
}

.step-connector-1 {
  left: calc(33.333% - 24px);
}

.step-connector-2 {
  left: calc(66.666% - 24px);
}

@media (max-width: 768px) {
  .step-connector {
    display: none;
  }
}

.step-card {
  border: 3px solid #1A1A1A;
  padding: 48px 36px;
  background: #FFFEF0;
  box-shadow: 6px 6px 0 #1A1A1A;
  transition: transform 0.1s ease-out, box-shadow 0.1s ease-out;
}

.step-card:hover {
  transform: translate(-4px, -4px);
  box-shadow: 10px 10px 0 #1A1A1A;
}

.step-number {
  font-size: 80px;
  font-weight: 900;
  line-height: 0.85;
  letter-spacing: -0.04em;
  color: #E8E4D9;
  margin-bottom: 24px;
}

.step-divider {
  width: 60px;
  height: 4px;
  background: #1A1A1A;
  margin-bottom: 20px;
}

.step-title {
  font-size: 24px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  margin-bottom: 16px;
}

.step-description {
  font-size: 16px;
  line-height: 1.6;
  color: #4A4A4A;
}
```

**JSX Structure**:
```tsx
const steps = [
  { number: '01', title: 'SIGN UP', description: 'Create your free account in 30 seconds. No credit card, no BS.' },
  { number: '02', title: 'CONNECT', description: 'Link your existing tools with one click. We do the heavy lifting.' },
  { number: '03', title: 'LAUNCH', description: 'Start using immediately. Zero learning curve.' },
];

<section className="how-it-works-section">
  <div className="how-it-works-header">
    <p className="features-label">HOW IT WORKS</p>
    <h2 className="features-headline">
      Three steps. That's it.
    </h2>
  </div>

  <div className="how-it-works-steps">
    {steps.map((step, index) => (
      <motion.div
        key={step.number}
        className="step-card"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.15,
          ease: 'easeOut',
          delay: index * 0.1
        }}
        viewport={{ once: true }}
      >
        <div className="step-number">{step.number}</div>
        <div className="step-divider" />
        <h3 className="step-title">{step.title}</h3>
        <p className="step-description">{step.description}</p>
      </motion.div>
    ))}

    {/* Desktop connectors */}
    <div className="step-connector step-connector-1" aria-hidden="true" />
    <div className="step-connector step-connector-2" aria-hidden="true" />
  </div>
</section>
```

---

### 6. Social Proof Section (Logo Wall + Stats)

**Visual Structure**:
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  TRUSTED BY TEAMS AT                                                        │
│                                                                             │
│  ┌────────┬────────┬────────┬────────┐    ┌───────────────────────────────┐│
│  │ STRIPE │ VERCEL │ LINEAR │ NOTION ││    │  10,000+     │    99.9%      ││
│  ├────────┼────────┼────────┼────────┤│    │  ════════    │    ════════   ││
│  │ FIGMA  │ CLERK  │ SUPABASE│ RAYCAST│    │  ACTIVE      │    UPTIME     ││
│  ├────────┼────────┼────────┼────────┤│    │  USERS       │               ││
│  │ RESEND │ CAL    │ DESCRIPT│ LOOM  ││    ├──────────────┼───────────────┤│
│  └────────┴────────┴────────┴────────┘│    │  50M+        │    <100ms     ││
│                                        │    │  ════════    │    ════════   ││
│                                        │    │  REQUESTS    │    LATENCY    ││
│                                        │    │  MONTHLY     │    P99        ││
│                                        │    └──────────────┴───────────────┘│
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**CSS**:
```css
.social-proof-section {
  padding: 120px 48px;
  background: #1A1A1A;
  color: #FFFEF0;
}

.social-proof-layout {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 64px;
  align-items: start;
}

@media (max-width: 1024px) {
  .social-proof-layout {
    grid-template-columns: 1fr;
    gap: 48px;
  }
}

/* Logo Wall */
.logo-wall {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3px;
  background: #FFFEF0;
  padding: 3px;
}

@media (max-width: 640px) {
  .logo-wall {
    grid-template-columns: repeat(2, 1fr);
  }
}

.logo-cell {
  background: #1A1A1A;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 2 / 1;
  transition: background 0.1s ease-out;
}

.logo-cell:hover {
  background: #2A2A2A;
}

.logo-cell svg,
.logo-cell img {
  height: 24px;
  width: auto;
  opacity: 0.8;
  filter: brightness(0) invert(1); /* Make logos white */
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3px;
  background: #FFFEF0;
  padding: 3px;
}

.stat-cell {
  background: #1A1A1A;
  padding: 40px 32px;
}

.stat-value {
  font-size: 48px;
  font-weight: 900;
  letter-spacing: -0.03em;
  color: #BFFF00;
  margin-bottom: 8px;
}

.stat-divider {
  width: 48px;
  height: 3px;
  background: #FFFEF0;
  margin-bottom: 12px;
}

.stat-label {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #888;
}

.stat-sublabel {
  font-size: 11px;
  font-weight: 500;
  color: #666;
  margin-top: 4px;
}
```

**JSX Structure**:
```tsx
const logos = ['Stripe', 'Vercel', 'Linear', 'Notion', 'Figma', 'Clerk', 'Supabase', 'Raycast', 'Resend', 'Cal', 'Descript', 'Loom'];

const stats = [
  { value: '10,000+', label: 'ACTIVE USERS' },
  { value: '99.9%', label: 'UPTIME' },
  { value: '50M+', label: 'REQUESTS', sublabel: 'MONTHLY' },
  { value: '<100ms', label: 'LATENCY', sublabel: 'P99' },
];

<section className="social-proof-section">
  <p className="features-label" style={{ color: '#888' }}>TRUSTED BY TEAMS AT</p>

  <div className="social-proof-layout">
    {/* Logo Wall */}
    <div className="logo-wall">
      {logos.map((logo) => (
        <div key={logo} className="logo-cell">
          <CompanyLogo name={logo} />
        </div>
      ))}
    </div>

    {/* Stats Grid */}
    <div className="stats-grid">
      {stats.map((stat) => (
        <div key={stat.label} className="stat-cell">
          <div className="stat-value">{stat.value}</div>
          <div className="stat-divider" />
          <div className="stat-label">{stat.label}</div>
          {stat.sublabel && <div className="stat-sublabel">{stat.sublabel}</div>}
        </div>
      ))}
    </div>
  </div>
</section>
```

---

### 7. Testimonials Section

**Visual Structure**:
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  WHAT PEOPLE SAY                                                            │
│                                                                             │
│  ← Drag to scroll →                                                         │
│                                                                             │
│  ┌─────────────────────────┐ ┌─────────────────────────┐ ┌─────────────────│
│  │ "                       │ │ "                       │ │ "               │
│  │ This tool changed how   │ │ Finally, something that │ │ I deleted 5    │
│  │ we work. Not kidding.   │ │ just works. Shocking.   │ │ other tools    │
│  │ We shipped 3x faster    │ │ Actually shocked.       │ │ after trying   │
│  │ last quarter."          │ │                         │ │ this."         │
│  │                    "    │ │                    "    │ │                │
│  │ ────────────────────    │ │ ────────────────────    │ │ ───────────────│
│  │ - SARAH CHEN            │ │ - MARCUS JOHNSON        │ │ - EMMA WILSON  │
│  │   CTO @ Acme Inc        │ │   Founder @ StartupXYZ  │ │   Engineer @   │
│  └─────────────────────────┘ └─────────────────────────┘ └─────────────────│
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**CSS**:
```css
.testimonials-section {
  padding: 120px 0;
  background: #FFFEF0;
  overflow: hidden;
}

.testimonials-header {
  padding: 0 48px;
  margin-bottom: 48px;
}

.testimonials-scroll {
  display: flex;
  gap: 24px;
  padding: 0 48px;
  overflow-x: auto;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  cursor: grab;
}

.testimonials-scroll::-webkit-scrollbar {
  display: none;
}

.testimonials-scroll:active {
  cursor: grabbing;
}

.testimonial-card {
  flex-shrink: 0;
  width: 400px;
  border: 3px solid #1A1A1A;
  padding: 40px;
  background: #FFFEF0;
  box-shadow: 6px 6px 0 #1A1A1A;
}

@media (max-width: 640px) {
  .testimonial-card {
    width: 320px;
    padding: 32px;
  }
}

.testimonial-quote-mark {
  font-size: 72px;
  font-weight: 900;
  line-height: 0.5;
  color: #E8E4D9;
  margin-bottom: 16px;
}

.testimonial-text {
  font-size: 18px;
  font-weight: 500;
  line-height: 1.5;
  margin-bottom: 32px;
}

.testimonial-divider {
  width: 100%;
  height: 3px;
  background: #1A1A1A;
  margin-bottom: 20px;
}

.testimonial-author {
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.testimonial-role {
  font-size: 13px;
  font-weight: 500;
  color: #6B6B6B;
  margin-top: 4px;
}

/* Accent card variant */
.testimonial-card-accent {
  background: #0066FF;
  color: #FFFEF0;
  box-shadow: 6px 6px 0 #1A1A1A;
}

.testimonial-card-accent .testimonial-quote-mark {
  color: rgba(255, 255, 255, 0.2);
}

.testimonial-card-accent .testimonial-divider {
  background: #FFFEF0;
}

.testimonial-card-accent .testimonial-role {
  color: rgba(255, 255, 255, 0.7);
}
```

**JSX Structure**:
```tsx
const testimonials = [
  {
    text: "This tool changed how we work. Not kidding. We shipped 3x faster last quarter.",
    author: "SARAH CHEN",
    role: "CTO @ Acme Inc",
    accent: false,
  },
  {
    text: "Finally, something that just works. Shocking. Actually shocked.",
    author: "MARCUS JOHNSON",
    role: "Founder @ StartupXYZ",
    accent: true,
  },
  {
    text: "I deleted 5 other tools after trying this. Should've found it sooner.",
    author: "EMMA WILSON",
    role: "Engineer @ TechCorp",
    accent: false,
  },
  {
    text: "Our team stopped complaining about tools. First time in 3 years.",
    author: "JAMES PARK",
    role: "VP Product @ Enterprise",
    accent: false,
  },
];

<section className="testimonials-section">
  <div className="testimonials-header">
    <p className="features-label">WHAT PEOPLE SAY</p>
    <h2 className="features-headline">
      Don't take our word for it.
    </h2>
  </div>

  <div className="testimonials-scroll">
    {testimonials.map((testimonial, index) => (
      <motion.div
        key={index}
        className={`testimonial-card ${testimonial.accent ? 'testimonial-card-accent' : ''}`}
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.15, ease: 'easeOut', delay: index * 0.1 }}
        viewport={{ once: true }}
      >
        <div className="testimonial-quote-mark">"</div>
        <p className="testimonial-text">{testimonial.text}"</p>
        <div className="testimonial-divider" />
        <div className="testimonial-author">- {testimonial.author}</div>
        <div className="testimonial-role">{testimonial.role}</div>
      </motion.div>
    ))}
  </div>
</section>
```

---

### 8. Pricing Section

**Visual Structure**:
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  PRICING                                                                    │
│                                                                             │
│  Simple. Honest. No tricks.                                                 │
│                                                                             │
│  ┌───────────────────────────────────┐  ┌───────────────────────────────────┐
│  │                                   │  │ ★ MOST POPULAR                    │
│  │  FREE                             │  │                                   │
│  │                                   │  │  PRO                              │
│  │  $0                               │  │                                   │
│  │  ──────────                       │  │  $29/mo                           │
│  │  forever                          │  │  ──────────                       │
│  │                                   │  │  billed monthly                   │
│  │  ✓ Up to 5 projects               │  │                                   │
│  │  ✓ Basic integrations             │  │  ✓ Unlimited projects             │
│  │  ✓ Community support              │  │  ✓ All integrations               │
│  │  ✗ Advanced analytics             │  │  ✓ Priority support               │
│  │  ✗ Custom branding                │  │  ✓ Advanced analytics             │
│  │  ✗ API access                     │  │  ✓ Custom branding                │
│  │                                   │  │  ✓ Full API access                │
│  │  [GET STARTED]                    │  │                                   │
│  │                                   │  │  [START FREE TRIAL →]             │
│  └───────────────────────────────────┘  └───────────────────────────────────┘
│                                                                             │
│  NEED MORE? Contact sales for Enterprise pricing with custom limits.        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**CSS**:
```css
.pricing-section {
  padding: 120px 48px;
  background: #E8E4D9;
}

.pricing-grid {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 24px;
  max-width: 900px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .pricing-grid {
    grid-template-columns: 1fr;
  }
}

.pricing-card {
  border: 3px solid #1A1A1A;
  padding: 48px;
  background: #FFFEF0;
  box-shadow: 6px 6px 0 #1A1A1A;
  display: flex;
  flex-direction: column;
}

.pricing-card-featured {
  background: #1A1A1A;
  color: #FFFEF0;
  box-shadow: 6px 6px 0 #FF5C00;
  position: relative;
}

.pricing-badge {
  position: absolute;
  top: -16px;
  left: 24px;
  background: #BFFF00;
  color: #1A1A1A;
  padding: 8px 16px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border: 3px solid #1A1A1A;
}

.pricing-tier {
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #6B6B6B;
  margin-bottom: 12px;
}

.pricing-card-featured .pricing-tier {
  color: #888;
}

.pricing-price {
  font-size: 64px;
  font-weight: 900;
  letter-spacing: -0.03em;
  line-height: 1;
  margin-bottom: 8px;
}

.pricing-card-featured .pricing-price {
  color: #BFFF00;
}

.pricing-period {
  font-size: 14px;
  font-weight: 500;
  color: #6B6B6B;
  margin-bottom: 32px;
}

.pricing-card-featured .pricing-period {
  color: #888;
}

.pricing-divider {
  width: 100%;
  height: 3px;
  background: #1A1A1A;
  margin-bottom: 32px;
}

.pricing-card-featured .pricing-divider {
  background: #444;
}

.pricing-features {
  flex: 1;
  margin-bottom: 32px;
}

.pricing-feature {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 16px;
}

.pricing-feature-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
}

.pricing-feature-icon.included {
  color: #00CC66;
}

.pricing-feature-icon.excluded {
  color: #999;
}

.pricing-feature.excluded {
  color: #999;
}

.pricing-cta {
  width: 100%;
}

.pricing-note {
  text-align: center;
  margin-top: 48px;
  font-size: 15px;
  color: #6B6B6B;
}

.pricing-note a {
  color: #1A1A1A;
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 2px;
}
```

**JSX Structure**:
```tsx
const plans = [
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
];

<section className="pricing-section">
  <div className="features-header" style={{ textAlign: 'center' }}>
    <p className="features-label">PRICING</p>
    <h2 className="features-headline">
      Simple. Honest. No tricks.
    </h2>
  </div>

  <div className="pricing-grid">
    {plans.map((plan) => (
      <div
        key={plan.tier}
        className={`pricing-card ${plan.featured ? 'pricing-card-featured' : ''}`}
      >
        {plan.featured && <div className="pricing-badge">★ MOST POPULAR</div>}
        <div className="pricing-tier">{plan.tier}</div>
        <div className="pricing-price">{plan.price}</div>
        <div className="pricing-period">{plan.period}</div>
        <div className="pricing-divider" />

        <div className="pricing-features">
          {plan.features.map((feature, index) => (
            <div
              key={index}
              className={`pricing-feature ${!feature.included ? 'excluded' : ''}`}
            >
              <span className={`pricing-feature-icon ${feature.included ? 'included' : 'excluded'}`}>
                {feature.included ? '✓' : '✗'}
              </span>
              {feature.text}
            </div>
          ))}
        </div>

        <NeoButton
          variant={plan.featured ? 'primary' : 'secondary'}
          className="pricing-cta"
        >
          {plan.cta} {plan.featured && <ArrowRightIcon />}
        </NeoButton>
      </div>
    ))}
  </div>

  <p className="pricing-note">
    NEED MORE? <a href="/contact">Contact sales</a> for Enterprise pricing.
  </p>
</section>
```

---

### 9. FAQ Section (Accordion)

**Visual Structure**:
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  QUESTIONS?                                                                 │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ + HOW DOES BILLING WORK?                                                ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ − CAN I CANCEL ANYTIME?                                                 ││
│  │ ───────────────────────────────────────────────────────────────────     ││
│  │ Yes. No contracts, no commitments. Cancel from your dashboard in       ││
│  │ one click. We won't guilt-trip you or make it hard to leave.           ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ + WHAT ABOUT DATA SECURITY?                                             ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ + DO YOU OFFER REFUNDS?                                                 ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**CSS**:
```css
.faq-section {
  padding: 120px 48px;
  background: #FFFEF0;
}

.faq-list {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  border: 3px solid #1A1A1A;
  margin-bottom: -3px; /* Collapse borders */
  background: #FFFEF0;
}

.faq-item:first-child {
  border-top-width: 3px;
}

.faq-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 32px;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  transition: background 0.1s ease-out;
}

.faq-trigger:hover {
  background: #F5F3EB;
}

.faq-icon {
  font-size: 24px;
  font-weight: 900;
  transition: transform 0.1s ease-out;
}

.faq-item.open .faq-icon {
  transform: rotate(45deg);
}

.faq-content {
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.1s ease-out;
}

.faq-item.open .faq-content {
  max-height: 500px;
}

.faq-answer {
  padding: 0 32px 24px;
  font-size: 15px;
  line-height: 1.6;
  color: #4A4A4A;
}

.faq-answer-divider {
  width: 100%;
  height: 2px;
  background: #E8E4D9;
  margin-bottom: 16px;
}
```

**JSX Structure**:
```tsx
const faqs = [
  {
    question: 'HOW DOES BILLING WORK?',
    answer: 'Monthly billing, charged on the same day each month. We prorate upgrades and downgrades automatically. No surprises.',
  },
  {
    question: 'CAN I CANCEL ANYTIME?',
    answer: "Yes. No contracts, no commitments. Cancel from your dashboard in one click. We won't guilt-trip you or make it hard to leave.",
  },
  {
    question: 'WHAT ABOUT DATA SECURITY?',
    answer: "SOC2 Type II certified. AES-256 encryption at rest and in transit. We don't sell your data. Ever. Full GDPR compliance.",
  },
  {
    question: 'DO YOU OFFER REFUNDS?',
    answer: "30-day money-back guarantee, no questions asked. If you're not happy, we'll refund you. Simple as that.",
  },
];

const [openIndex, setOpenIndex] = useState<number | null>(1);

<section className="faq-section">
  <div className="features-header" style={{ textAlign: 'center' }}>
    <p className="features-label">FAQ</p>
    <h2 className="features-headline">Questions?</h2>
  </div>

  <div className="faq-list">
    {faqs.map((faq, index) => (
      <div
        key={index}
        className={`faq-item ${openIndex === index ? 'open' : ''}`}
      >
        <button
          className="faq-trigger"
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
        >
          <span>{faq.question}</span>
          <span className="faq-icon">+</span>
        </button>
        <div className="faq-content">
          <div className="faq-answer">
            <div className="faq-answer-divider" />
            {faq.answer}
          </div>
        </div>
      </div>
    ))}
  </div>
</section>
```

---

### 10. Final CTA Section

**Visual Structure**:
```
╔═══════════════════════════════════════════════════════════════════════════════╗
║                                                                                ║
║         ██████╗ ███████╗ █████╗ ██████╗ ██╗   ██╗██████╗                      ║
║         ██╔══██╗██╔════╝██╔══██╗██╔══██╗╚██╗ ██╔╝╚════██╗                     ║
║         ██████╔╝█████╗  ███████║██║  ██║ ╚████╔╝   ▄███╔╝                     ║
║         ██╔══██╗██╔══╝  ██╔══██║██║  ██║  ╚██╔╝    ▀▀══╝                      ║
║         ██║  ██║███████╗██║  ██║██████╔╝   ██║     ██╗                        ║
║         ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝    ╚═╝     ╚═╝                        ║
║                                                                                ║
║         Stop overthinking. Start building.                                     ║
║         Get started in 30 seconds.                                             ║
║                                                                                ║
║                    [GET STARTED FREE →]                                        ║
║                                                                                ║
╚═══════════════════════════════════════════════════════════════════════════════╝
```

**CSS**:
```css
.final-cta-section {
  padding: 160px 48px;
  background: #FF5C00;
  color: #FFFEF0;
  text-align: center;
  border-top: 3px solid #1A1A1A;
  border-bottom: 3px solid #1A1A1A;
}

.final-cta-headline {
  font-size: 80px;
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.03em;
  text-shadow: 6px 6px 0 #1A1A1A;
  margin-bottom: 24px;
}

@media (max-width: 1024px) {
  .final-cta-headline {
    font-size: 56px;
    text-shadow: 4px 4px 0 #1A1A1A;
  }
}

@media (max-width: 640px) {
  .final-cta-headline {
    font-size: 40px;
    text-shadow: 3px 3px 0 #1A1A1A;
  }
}

.final-cta-subheadline {
  font-size: 24px;
  font-weight: 500;
  opacity: 0.9;
  margin-bottom: 8px;
}

.final-cta-note {
  font-size: 16px;
  opacity: 0.7;
  margin-bottom: 48px;
}

.final-cta-button {
  background: #1A1A1A;
  color: #FFFEF0;
  border: 3px solid #1A1A1A;
  box-shadow: 6px 6px 0 #FFFEF0;
}

.final-cta-button:hover {
  transform: translate(-3px, -3px);
  box-shadow: 9px 9px 0 #FFFEF0;
}
```

**JSX Structure**:
```tsx
<section className="final-cta-section">
  <motion.h2
    className="final-cta-headline"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.15, ease: 'easeOut' }}
    viewport={{ once: true }}
  >
    READY?
  </motion.h2>
  <p className="final-cta-subheadline">
    Stop overthinking. Start building.
  </p>
  <p className="final-cta-note">
    Get started in 30 seconds. No credit card required.
  </p>
  <NeoButton
    variant="inverted"
    size="xl"
    className="final-cta-button"
  >
    GET STARTED FREE <ArrowRightIcon />
  </NeoButton>
</section>
```

---

### 11. Footer

**Visual Structure**:
```
┌────────────────────────────────────────────────────────────────────────────────┐
│                                                                                │
│  LOGO▪TEXT           PRODUCT      COMPANY      RESOURCES     LEGAL            │
│                      Features     About        Docs          Privacy          │
│  The tagline         Pricing      Careers      Blog          Terms            │
│  goes here.          Changelog    Contact      Help          Cookies          │
│                      Roadmap      Press        API           Security         │
│                                                                                │
│ ══════════════════════════════════════════════════════════════════════════════│
│                                                                                │
│  © 2024 Company Inc.     [X] [GitHub] [Discord] [LinkedIn]                    │
│                                                                                │
└────────────────────────────────────────────────────────────────────────────────┘
```

**CSS**:
```css
.footer {
  padding: 80px 48px 40px;
  background: #1A1A1A;
  color: #FFFEF0;
}

.footer-top {
  display: grid;
  grid-template-columns: 1.5fr repeat(4, 1fr);
  gap: 48px;
  margin-bottom: 64px;
}

@media (max-width: 1024px) {
  .footer-top {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
}

@media (max-width: 640px) {
  .footer-top {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

.footer-brand {
  max-width: 280px;
}

.footer-logo {
  font-size: 24px;
  font-weight: 900;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.footer-logo-mark {
  width: 12px;
  height: 12px;
  background: #FF5C00;
  transform: rotate(45deg);
}

.footer-tagline {
  font-size: 14px;
  color: #888;
  line-height: 1.5;
}

.footer-column-title {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #888;
  margin-bottom: 20px;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-link {
  font-size: 14px;
  font-weight: 500;
  color: #FFFEF0;
  transition: color 0.1s ease-out;
}

.footer-link:hover {
  color: #BFFF00;
}

.footer-divider {
  width: 100%;
  height: 3px;
  background: #333;
  margin-bottom: 32px;
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 24px;
}

.footer-copyright {
  font-size: 13px;
  color: #888;
}

.footer-social {
  display: flex;
  gap: 16px;
}

.footer-social-link {
  width: 40px;
  height: 40px;
  border: 2px solid #444;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.1s ease-out, background 0.1s ease-out;
}

.footer-social-link:hover {
  border-color: #FFFEF0;
  background: #FFFEF0;
}

.footer-social-link:hover svg {
  color: #1A1A1A;
}

.footer-social-link svg {
  width: 18px;
  height: 18px;
  color: #FFFEF0;
}
```

---

## Animation System

### CRITICAL: NO SPRINGS - TWEEN ONLY

Neobrutalism demands snappy, intentional animations. NO elastic/bouncy movements.

```typescript
// Motion Configuration
// ONLY USE THESE TRANSITION TYPES:

// Snappy hover states
const hoverTransition = {
  type: 'tween',
  duration: 0.1,
  ease: 'easeOut',
};

// Quick entrance animations
const entranceTransition = {
  type: 'tween',
  duration: 0.15,
  ease: [0.25, 0.1, 0.25, 1], // cubic-bezier
};

// Instant state changes (FAQ open/close)
const instantTransition = {
  type: 'tween',
  duration: 0.1,
  ease: 'linear',
};

// Staggered children
const staggerContainer = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: entranceTransition,
  },
};
```

### Hover State Transforms

```css
/* Card hover - lift and increase shadow */
.neo-card {
  transition: transform 0.1s ease-out, box-shadow 0.1s ease-out;
}

.neo-card:hover {
  transform: translate(-4px, -4px);
  box-shadow: 10px 10px 0 #1A1A1A;
}

/* Button hover - subtle lift */
.neo-button {
  transition: transform 0.1s ease-out, box-shadow 0.1s ease-out;
}

.neo-button:hover {
  transform: translate(-2px, -2px);
  box-shadow: 8px 8px 0 #1A1A1A;
}

/* Button active - press down */
.neo-button:active {
  transform: translate(0, 0);
  box-shadow: 4px 4px 0 #1A1A1A;
}

/* Link hover - underline growth */
.neo-link {
  position: relative;
}

.neo-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 3px;
  background: currentColor;
  transition: width 0.1s ease-out;
}

.neo-link:hover::after {
  width: 100%;
}
```

### Scroll Behavior

```css
/* Native scroll - NO smooth scroll library */
html {
  scroll-behavior: auto; /* Intentionally NOT smooth */
}

/* Optional: Snappy scroll-snap for sections */
.snap-container {
  scroll-snap-type: y mandatory;
}

.snap-section {
  scroll-snap-align: start;
}
```

---

## Button Components

### NeoButton Component

```tsx
interface NeoButtonProps {
  variant: 'primary' | 'secondary' | 'ghost' | 'inverted';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
  xl: 'px-10 py-5 text-xl',
};

const variantClasses = {
  primary: `
    bg-neo-hot text-neo-cream
    border-3 border-neo-black
    shadow-neo-md
    hover:translate-x-[-2px] hover:translate-y-[-2px]
    hover:shadow-neo-lg
    active:translate-x-0 active:translate-y-0
    active:shadow-neo-sm
  `,
  secondary: `
    bg-neo-cream text-neo-black
    border-3 border-neo-black
    shadow-neo-md
    hover:bg-neo-kraft
    hover:translate-x-[-2px] hover:translate-y-[-2px]
    hover:shadow-neo-lg
    active:translate-x-0 active:translate-y-0
    active:shadow-neo-sm
  `,
  ghost: `
    bg-transparent text-neo-black
    border-3 border-transparent
    hover:border-neo-black
    hover:shadow-neo-sm
  `,
  inverted: `
    bg-neo-black text-neo-cream
    border-3 border-neo-black
    shadow-[6px_6px_0_0_#FFFEF0]
    hover:translate-x-[-3px] hover:translate-y-[-3px]
    hover:shadow-[9px_9px_0_0_#FFFEF0]
  `,
};

export function NeoButton({
  variant,
  size = 'md',
  children,
  href,
  onClick,
  className = '',
}: NeoButtonProps) {
  const classes = `
    inline-flex items-center justify-center gap-2
    font-bold uppercase tracking-wider
    transition-all duration-100 ease-out
    cursor-pointer
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
```

---

## Custom SVG Icons (Stroke Only)

```tsx
// Icons must be stroke-only, 2-3px stroke width, no fills

export function ArrowRightIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      <path d="M4 10H16" />
      <path d="M11 5L16 10L11 15" />
    </svg>
  );
}

export function CheckIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
    >
      <path d="M4 10L8 14L16 6" />
    </svg>
  );
}

export function CrossIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="square"
    >
      <path d="M5 5L15 15" />
      <path d="M15 5L5 15" />
    </svg>
  );
}

export function PlusIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
    >
      <path d="M10 4V16" />
      <path d="M4 10H16" />
    </svg>
  );
}

// Social icons - also stroke only
export function TwitterIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
    >
      <path d="M2 2L8 10M18 2L12 10M8 10L2 18M12 10L18 18" />
    </svg>
  );
}

export function GitHubIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="10" cy="10" r="8" />
      <path d="M6 15C6 12 8 11 10 11C12 11 14 12 14 15" />
      <circle cx="7" cy="8" r="1.5" />
      <circle cx="13" cy="8" r="1.5" />
    </svg>
  );
}
```

---

## Animated Counter Component

```tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 1.5,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      // Linear easing (no smooth curves for neobrutalism)
      setCount(Math.floor(progress * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, duration]);

  return (
    <motion.span
      ref={ref}
      className="font-mono text-5xl font-bold tracking-tight"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.1 }}
    >
      {prefix}{count}{suffix}
    </motion.span>
  );
}
```

---

## Required npm Packages

```bash
npm install next react react-dom motion
npm install -D typescript @types/node @types/react @types/react-dom tailwindcss @tailwindcss/postcss postcss
```

Install the current releases. The versions this spec was checked against are in the stack table in the skill's SKILL.md.

**Note**: Minimal dependencies. No GSAP (use CSS animations instead). No Lenis (native scroll). No icon libraries (custom stroke SVGs).

---

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

---

## What to ABSOLUTELY AVOID

1. **Rounded corners** - NEVER use border-radius > 0 anywhere
2. **Soft/blurred shadows** - ALL shadows must be solid offset (blur: 0)
3. **Gradients** - NO linear-gradient, radial-gradient, or gradient overlays
4. **Spring animations** - NO Motion spring physics, bouncy effects
5. **Smooth scrolling** - Native scroll only, no Lenis/Locomotive
6. **Icon libraries** - NO Lucide, Heroicons, Feather, etc. Custom stroke SVGs only
7. **Symmetric layouts** - Avoid centered, equal-column grids
8. **Subtle opacity** - Commit to solid colors, minimal opacity use
9. **Serif fonts** - Stick to geometric sans-serif (Space Grotesk)
10. **Decorative elements** - No swooshes, blobs, or organic shapes
11. **3D transforms** - Minimal use, keep flat aesthetic
12. **Parallax effects** - Keep elements in flat plane
13. **Hover glows** - No box-shadow color transitions

---

## Final Notes

- **Intentional Roughness**: The design should feel deliberately raw and honest, not polished
- **High Contrast**: Strong color choices, no wishy-washy grays
- **Typography as Design**: Large bold headlines ARE the visual elements
- **Grid Visible**: Borders should be prominent, gaps visible
- **Fast Interactions**: All hover states snappy (100-150ms max)
- **Mobile Considerations**: Stack aggressively, maintain border thickness
- **Accessibility**: Despite rough aesthetic, maintain proper contrast ratios and focus states
- **Print-Inspired**: Think zines, punk flyers, constructivist posters

Generate a complete, production-ready component implementing all specifications above. Every section should be present with real, placeholder-free content. The result should be immediately usable as a landing page.
