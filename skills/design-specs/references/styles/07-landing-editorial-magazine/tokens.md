# Editorial/Magazine Landing Page: Design Tokens

Part of the [Editorial/Magazine Landing Page specification](index.md).

## Color System

### CSS Custom Properties (define in globals.css)

```css
:root {
  /* Colours that also exist in the Tailwind theme point at it, so each value is written once, in @theme. */

  /* Paper Tones - Warm, Not Stark */
  --bg-paper: var(--color-paper);           /* Warm off-white, like quality paper stock */
  --bg-cream: var(--color-cream);           /* Slightly darker cream for contrast */
  --bg-ivory: var(--color-ivory);           /* Lighter variation */

  /* Text - Ink-Like */
  --text-primary: var(--color-ink);       /* Near black, not pure black */
  --text-secondary: var(--color-ink-secondary);     /* Dark gray for secondary text */
  --text-muted: var(--color-ink-muted);         /* Muted for captions, dates */
  --text-light: var(--color-ink-light);         /* Very light for subtle elements */

  /* Editorial Accent - Restrained Use */
  --accent-editorial: var(--color-editorial-red);   /* Classic editorial red - used sparingly */
  --accent-hover: var(--color-editorial-red-dark);       /* Darker red for hover */

  /* Rules & Dividers */
  --rule-heavy: var(--color-rule-heavy);         /* Black for heavy rules */
  --rule-light: var(--color-rule-light);         /* Light gray for subtle dividers */
  --rule-medium: var(--color-rule-medium);        /* Medium gray */

  /* Functional */
  --link-color: var(--color-ink);         /* Links same as text */
  --link-underline: var(--color-editorial-red);     /* Red underline on hover */

  /* Duotone Overlay Colors */
  --duotone-dark: var(--color-ink);
  --duotone-light: var(--color-cream);
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
