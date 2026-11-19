# Japanese Minimalist Landing Page: Design Tokens

Part of the [Japanese Minimalist Landing Page specification](index.md).

## Color System

### CSS Custom Properties

```css
:root {
  /* Borders */
  --border-subtle: rgba(26, 26, 26, 0.08);
  --border-medium: rgba(26, 26, 26, 0.15);
}
```

### Tailwind Theme

```css
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  /* Base - Rice Paper Whites */
  --color-washi: #FAF9F7;
  --color-washi-warm: #F5F3EF;
  --color-washi-cool: #FAFBFA;

  /* Ink - Sumi Blacks */
  --color-sumi: #1A1A1A;
  --color-sumi-soft: #2D2D2D;
  --color-sumi-light: #666666;
  --color-sumi-faint: #999999;

  /* Accent - Vermillion (Shu) */
  --color-vermillion: #C7372F;
  --color-vermillion-dark: #A62D27;

  /* Secondary - Forest (Matsu) */
  --color-matsu: #2D5A4A;
  --color-matsu-light: #3D7A64;

  /* Neutral - Stone (Ishi) */
  --color-ishi: #8B8680;
  --color-ishi-light: #B5B0A8;
  --color-ishi-dark: #5C5955;

  /* Natural - Wood (Ki) */
  --color-ki: #C4A77D;
  --color-ki-light: #D9C9A8;
  --color-ki-dark: #A68B5B;

  --text-display-xl: clamp(48px, 8vw, 120px);
  --text-display-xl--line-height: 1.0;
  --text-display-xl--letter-spacing: -0.02em;
  --text-display-lg: clamp(36px, 5vw, 72px);
  --text-display-lg--line-height: 1.1;
  --text-display-lg--letter-spacing: -0.01em;
  --text-display-md: clamp(28px, 4vw, 48px);
  --text-display-md--line-height: 1.2;
  --text-display-md--letter-spacing: 0;
  --text-body-lg: 18px;
  --text-body-lg--line-height: 1.9;
  --text-body-lg--letter-spacing: 0.02em;
  --text-body: 16px;
  --text-body--line-height: 1.9;
  --text-body--letter-spacing: 0.02em;
  --text-body-sm: 14px;
  --text-body-sm--line-height: 1.8;
  --text-body-sm--letter-spacing: 0.02em;
  --text-caption: 11px;
  --text-caption--line-height: 1.6;
  --text-caption--letter-spacing: 0.15em;
  --text-label: 10px;
  --text-label--line-height: 1.5;
  --text-label--letter-spacing: 0.2em;

  --spacing-ma-xs: 40px;
  --spacing-ma-sm: 80px;
  --spacing-ma-md: 120px;
  --spacing-ma-lg: 200px;
  --spacing-ma-xl: 280px;

  --container-content-narrow: 480px;
  --container-content: 640px;
  --container-content-wide: 800px;
  --container-container: 1200px;
  --container-container-wide: 1400px;

  --ease-zen: cubic-bezier(0.25, 0.1, 0.25, 1);
  --ease-settle: cubic-bezier(0.22, 1, 0.36, 1);
}

@theme inline {
  --font-sans: var(--font-inter), system-ui, sans-serif;
  --font-display: var(--font-cormorant), Georgia, serif;
}

/* No theme entry needed in v4: font-thin, font-extralight, font-light, font-normal, duration-800, duration-1000, duration-1200, duration-1500, duration-2000 */
```

---

## Typography System

### Font Loading

```typescript
// src/app/layout.tsx
import { Inter, Cormorant } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400'],
  display: 'swap',
});

const cormorant = Cormorant({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="bg-washi text-sumi font-sans font-light antialiased">
        {children}
      </body>
    </html>
  );
}
```

### Typography Utility Classes

```css
/* src/app/globals.css */
/* Continues globals.css, after the @import "tailwindcss" line and the @theme blocks above */

@layer base {
  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    background-color: var(--color-washi);
    color: var(--color-sumi);
    font-family: var(--font-inter);
    font-weight: 300;
    line-height: 1.9;
    letter-spacing: 0.02em;
  }

  ::selection {
    background-color: var(--color-vermillion);
    color: var(--color-washi);
  }
}

@layer components {
  /* Display Typography - Light Weight */
  .text-zen-display {
    font-family: var(--font-cormorant);
    font-weight: 300;
    font-size: clamp(48px, 8vw, 120px);
    line-height: 1.0;
    letter-spacing: -0.02em;
    color: var(--color-sumi);
  }

  .text-zen-headline {
    font-family: var(--font-cormorant);
    font-weight: 300;
    font-size: clamp(36px, 5vw, 64px);
    line-height: 1.1;
    letter-spacing: -0.01em;
  }

  .text-zen-title {
    font-family: var(--font-inter);
    font-weight: 300;
    font-size: clamp(24px, 3vw, 32px);
    line-height: 1.3;
    letter-spacing: 0.01em;
  }

  /* Body Typography - Generous Spacing */
  .text-zen-body {
    font-family: var(--font-inter);
    font-weight: 300;
    font-size: 16px;
    line-height: 1.9;
    letter-spacing: 0.02em;
    color: var(--color-sumi-light);
  }

  .text-zen-body-large {
    font-family: var(--font-inter);
    font-weight: 300;
    font-size: 18px;
    line-height: 1.9;
    letter-spacing: 0.02em;
  }

  /* Caption Typography - Uppercase, Tracked */
  .text-zen-caption {
    font-family: var(--font-inter);
    font-weight: 400;
    font-size: 11px;
    line-height: 1.6;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--color-sumi-light);
  }

  .text-zen-label {
    font-family: var(--font-inter);
    font-weight: 400;
    font-size: 10px;
    line-height: 1.5;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--color-sumi-faint);
  }

  /* Number Typography */
  .text-zen-number {
    font-family: var(--font-cormorant);
    font-weight: 300;
    font-size: 14px;
    letter-spacing: 0.05em;
    color: var(--color-sumi-faint);
  }

  /* Vertical Text */
  .text-vertical {
    writing-mode: vertical-rl;
    text-orientation: mixed;
  }

  /* Japanese Characters */
  .text-kanji {
    font-family: 'Noto Sans JP', var(--font-inter), sans-serif;
    font-weight: 300;
  }
}
```

---

## Texture System

### Washi Paper Texture (CSS Only)

```css
@layer components {
  /* Subtle paper texture using CSS noise */
  .texture-washi {
    position: relative;
  }

  .texture-washi::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    opacity: 0.03;
    pointer-events: none;
    mix-blend-mode: multiply;
  }

  /* Alternative grain texture */
  .texture-grain {
    position: relative;
  }

  .texture-grain::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence baseFrequency='0.8' type='turbulence' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E");
    opacity: 0.02;
    pointer-events: none;
  }
}
```

### SVG Filter for Grain

```tsx
// Include in layout or page component
const GrainFilter = () => (
  <svg className="fixed w-0 h-0" aria-hidden="true">
    <defs>
      <filter id="grain-filter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.8"
          numOctaves="4"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
    </defs>
  </svg>
);
```

---

## Layout System

### Asymmetric Grid

```css
@layer components {
  /* Asymmetric 1:2 ratio grid */
  .grid-asymmetric {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 120px;
    align-items: start;
  }

  /* Dramatic 1:3 ratio grid */
  .grid-dramatic {
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 120px;
    align-items: start;
  }

  /* Reversed asymmetric */
  .grid-asymmetric-reverse {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 120px;
    align-items: start;
  }

  /* Off-center content container */
  .content-offset-left {
    max-width: 500px;
    margin-left: 15%;
  }

  .content-offset-right {
    max-width: 500px;
    margin-left: auto;
    margin-right: 15%;
  }

  /* Centered but narrow */
  .content-narrow-center {
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }
}
```

### Ma (Negative Space) Sections

```css
@layer components {
  /* Section with extreme vertical padding */
  .section-ma {
    padding-top: 200px;
    padding-bottom: 200px;
  }

  .section-ma-sm {
    padding-top: 120px;
    padding-bottom: 120px;
  }

  .section-ma-lg {
    padding-top: 280px;
    padding-bottom: 280px;
  }

  /* Container with horizontal breathing room */
  .container-zen {
    width: 100%;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 48px;
    padding-right: 48px;
  }

  @media (max-width: 768px) {
    .container-zen {
      padding-left: 24px;
      padding-right: 24px;
    }

    .section-ma {
      padding-top: 120px;
      padding-bottom: 120px;
    }
  }
}
```

---

## Responsive Considerations

```css
@layer components {
  /* Mobile adjustments */
  @media (max-width: 768px) {
    .section-ma {
      padding-top: 120px;
      padding-bottom: 120px;
    }

    .section-ma-lg {
      padding-top: 160px;
      padding-bottom: 160px;
    }

    .grid-asymmetric,
    .grid-asymmetric-reverse {
      grid-template-columns: 1fr;
      gap: 60px;
    }

    .content-offset-left,
    .content-offset-right {
      margin-left: 0;
      margin-right: 0;
      max-width: 100%;
    }

    .text-zen-display {
      font-size: clamp(36px, 12vw, 72px);
    }
  }
}
```
