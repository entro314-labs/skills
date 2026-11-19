# Neobrutalist Landing Page: Design Tokens

Part of the [Neobrutalist Landing Page specification](index.md).

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
