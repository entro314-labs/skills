# Warm Human Landing Page: Design Tokens

Part of the [Warm Human Landing Page specification](index.md).

## Color System

### CSS Custom Properties
```css
:root {
  /* Colours that also exist in the Tailwind theme point at it, so each value is written once, in @theme. */

  /* Backgrounds */
  --bg-primary: var(--color-cream-200);       /* Warm cream - main background */
  --bg-secondary: #FFFFFF;      /* Pure white - cards */
  --bg-tertiary: var(--color-cream-300);       /* Slightly darker cream - alternating sections */
  --bg-accent: var(--color-cream-100);         /* Peachy tint - highlight areas */

  /* Text */
  --text-primary: var(--color-earth-900);      /* Deep earth tone - headlines */
  --text-secondary: var(--color-earth-700);    /* Medium gray - body text */
  --text-tertiary: #8A8A8A;     /* Light gray - captions, labels */
  --text-inverse: #FFFFFF;      /* White - on colored backgrounds */

  /* Accent Colors */
  --accent-coral: var(--color-coral-500);      /* Primary CTA, warm emphasis */
  --accent-coral-hover: var(--color-coral-600);
  --accent-coral-light: var(--color-coral-50);
  --accent-coral-glow: rgba(255, 127, 110, 0.3);

  --accent-sage: var(--color-sage-500);       /* Secondary accent, trust */
  --accent-sage-light: var(--color-sage-50);

  --accent-lavender: var(--color-lavender-500);   /* Tertiary accent, calm */
  --accent-lavender-light: var(--color-lavender-50);

  --accent-peach: #FFB89A;      /* Warm backgrounds, gradients */
  --accent-gold: #F5C77E;       /* Highlights, stars */

  /* Gradients */
  --gradient-warm: linear-gradient(135deg, #FFB89A 0%, #B4A7D6 100%);
  --gradient-hero: linear-gradient(180deg, #FFF9F5 0%, #F8F6F3 100%);
  --gradient-card: linear-gradient(180deg, #FFFFFF 0%, #FAFAF8 100%);
  --gradient-text: linear-gradient(90deg, #FF7F6E 0%, #B4A7D6 100%);

  /* Shadows */
  --shadow-sm: 0 2px 8px rgba(43, 43, 43, 0.06);
  --shadow-md: 0 4px 16px rgba(43, 43, 43, 0.08);
  --shadow-lg: 0 8px 32px rgba(43, 43, 43, 0.10);
  --shadow-coral: 0 4px 16px rgba(255, 127, 110, 0.25);
  --shadow-card-hover: 0 12px 40px rgba(43, 43, 43, 0.12);

  /* Borders */
  --border-subtle: rgba(43, 43, 43, 0.06);
  --border-light: rgba(43, 43, 43, 0.08);
  --border-card: rgba(43, 43, 43, 0.05);

  /* Focus States */
  --focus-ring: 0 0 0 3px rgba(255, 127, 110, 0.3);
}
```

### Tailwind Theme
```css
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  --color-cream-50: #FFFDFB;
  --color-cream-100: #FFF9F5;
  --color-cream-200: #F8F6F3;
  --color-cream-300: #F0EDE8;
  --color-cream-400: #E5E0D9;
  --color-earth-700: #5A5A5A;
  --color-earth-800: #3D3D3D;
  --color-earth-900: #2B2B2B;
  --color-coral-50: rgba(255, 127, 110, 0.1);
  --color-coral-100: #FFE5E0;
  --color-coral-400: #FF9B8A;
  --color-coral-500: #FF7F6E;
  --color-coral-600: #FF6B57;
  --color-sage-50: rgba(110, 193, 181, 0.1);
  --color-sage-400: #8DD4C8;
  --color-sage-500: #6EC1B5;
  --color-sage-600: #5BB0A4;
  --color-lavender-50: rgba(180, 167, 214, 0.1);
  --color-lavender-400: #C7BDE3;
  --color-lavender-500: #B4A7D6;
  --color-lavender-600: #A193C9;

  --font-serif: Fraunces, Lora, Georgia, serif;
  --font-sans: Inter, system-ui, sans-serif;

  --text-display-xl: 72px;
  --text-display-xl--line-height: 1.1;
  --text-display-xl--letter-spacing: -0.02em;
  --text-display-lg: 56px;
  --text-display-lg--line-height: 1.15;
  --text-display-lg--letter-spacing: -0.02em;
  --text-display-md: 44px;
  --text-display-md--line-height: 1.2;
  --text-display-md--letter-spacing: -0.01em;
  --text-display-sm: 36px;
  --text-display-sm--line-height: 1.25;
  --text-display-sm--letter-spacing: -0.01em;
  --text-heading-lg: 28px;
  --text-heading-lg--line-height: 1.3;
  --text-heading-md: 24px;
  --text-heading-md--line-height: 1.35;
  --text-heading-sm: 20px;
  --text-heading-sm--line-height: 1.4;
  --text-body-lg: 18px;
  --text-body-lg--line-height: 1.7;
  --text-body-lg--letter-spacing: 0.01em;
  --text-body-md: 16px;
  --text-body-md--line-height: 1.7;
  --text-body-md--letter-spacing: 0.01em;
  --text-body-sm: 14px;
  --text-body-sm--line-height: 1.6;
  --text-caption: 13px;
  --text-caption--line-height: 1.5;
  --text-caption--letter-spacing: 0.02em;
  --text-eyebrow: 12px;
  --text-eyebrow--line-height: 1.4;
  --text-eyebrow--letter-spacing: 0.15em;

  --spacing-section: 160px;
  --spacing-section-sm: 100px;

  --radius-2xl: 16px;
  --radius-3xl: 24px;
  --radius-4xl: 32px;

  --container-content: 1200px;
  --container-reading: 70ch;
}

/* No theme entry needed in v4: spacing 18, spacing 22, spacing 30, spacing 34 */
```

---

## Typography System

### Font Stack
```css
/* Put these @import lines at the very top of globals.css, above @import "tailwindcss".
   A browser ignores an @import that comes after other rules. */
/* Serif - Headlines & Quotes */
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&display=swap');

/* Sans-serif - Body & UI */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
```

### Typography Classes
```css
/* Display Headlines - Serif */
.heading-display-xl {
  font-family: var(--font-serif);
  font-size: 72px;
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--text-primary);
}

.heading-display-lg {
  font-family: var(--font-serif);
  font-size: 56px;
  font-weight: 500;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--text-primary);
}

.heading-display-md {
  font-family: var(--font-serif);
  font-size: 44px;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: var(--text-primary);
}

.heading-display-sm {
  font-family: var(--font-serif);
  font-size: 36px;
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: -0.01em;
  color: var(--text-primary);
}

/* Section Headlines - Sans */
.heading-lg {
  font-family: var(--font-sans);
  font-size: 28px;
  font-weight: 600;
  line-height: 1.3;
  color: var(--text-primary);
}

.heading-md {
  font-family: var(--font-sans);
  font-size: 24px;
  font-weight: 600;
  line-height: 1.35;
  color: var(--text-primary);
}

.heading-sm {
  font-family: var(--font-sans);
  font-size: 20px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--text-primary);
}

/* Body Text */
.body-lg {
  font-family: var(--font-sans);
  font-size: 18px;
  font-weight: 400;
  line-height: 1.7;
  letter-spacing: 0.01em;
  color: var(--text-secondary);
  max-width: 70ch;
}

.body-md {
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.7;
  letter-spacing: 0.01em;
  color: var(--text-secondary);
  max-width: 70ch;
}

/* Labels & Captions */
.eyebrow {
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent-coral);
}

.caption {
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0.02em;
  color: var(--text-tertiary);
}

/* Quote Text */
.quote {
  font-family: var(--font-serif);
  font-size: 24px;
  font-weight: 400;
  line-height: 1.5;
  font-style: italic;
  color: var(--text-primary);
}
```

### Gradient Text (Use Sparingly)
```css
.gradient-text {
  background: var(--gradient-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## Layout System

### Container
```css
.container-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

@media (min-width: 768px) {
  .container-main {
    padding: 0 40px;
  }
}

@media (min-width: 1024px) {
  .container-main {
    padding: 0 48px;
  }
}
```

### Section Spacing
```css
.section {
  padding-top: 100px;
  padding-bottom: 100px;
}

@media (min-width: 768px) {
  .section {
    padding-top: 140px;
    padding-bottom: 140px;
  }
}

@media (min-width: 1024px) {
  .section {
    padding-top: 160px;
    padding-bottom: 160px;
  }
}
```

### Asymmetric Grid Layout
```css
/* 40/60 Split */
.grid-asymmetric-40-60 {
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  align-items: center;
}

@media (min-width: 1024px) {
  .grid-asymmetric-40-60 {
    grid-template-columns: 40% 1fr;
    gap: 80px;
  }
}

/* 60/40 Split */
.grid-asymmetric-60-40 {
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  align-items: center;
}

@media (min-width: 1024px) {
  .grid-asymmetric-60-40 {
    grid-template-columns: 1fr 40%;
    gap: 80px;
  }
}
```

### Bento Grid
```css
.bento-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 768px) {
  .bento-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto auto auto;
    gap: 24px;
  }

  /* First card spans full width */
  .bento-grid > :first-child {
    grid-column: span 2;
  }

  /* Third card taller */
  .bento-grid > :nth-child(3) {
    grid-row: span 2;
  }
}

@media (min-width: 1024px) {
  .bento-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  .bento-grid > :first-child {
    grid-column: span 2;
  }
}
```

---

## Background Textures

### Paper Texture (CSS)
```css
.bg-paper-texture {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.03;
  pointer-events: none;
}
```

### Dot Pattern
```css
.bg-dot-pattern {
  background-image: radial-gradient(
    circle,
    rgba(43, 43, 43, 0.1) 1px,
    transparent 1px
  );
  background-size: 24px 24px;
  pointer-events: none;
}
```

---

## Responsive Breakpoints

```css
/* Mobile First */
/* Base: 0-639px */

/* Tablet: 640px+ */
@media (min-width: 640px) { /* sm */ }

/* Tablet Landscape: 768px+ */
@media (min-width: 768px) { /* md */ }

/* Desktop: 1024px+ */
@media (min-width: 1024px) { /* lg */ }

/* Large Desktop: 1280px+ */
@media (min-width: 1280px) { /* xl */ }
```

### Typography Scaling
```css
.heading-display-lg {
  font-size: 36px;
}

@media (min-width: 640px) {
  .heading-display-lg {
    font-size: 44px;
  }
}

@media (min-width: 768px) {
  .heading-display-lg {
    font-size: 52px;
  }
}

@media (min-width: 1024px) {
  .heading-display-lg {
    font-size: 56px;
  }
}
```

### Section Spacing Scaling
```css
.section {
  padding-top: 80px;
  padding-bottom: 80px;
}

@media (min-width: 768px) {
  .section {
    padding-top: 120px;
    padding-bottom: 120px;
  }
}

@media (min-width: 1024px) {
  .section {
    padding-top: 160px;
    padding-bottom: 160px;
  }
}
```
