---
title: 'Tailwind CSS 4+ Complete Reference'
description: 'For AI Assistants: CSS-first configuration, new utilities, and Oxide engine.'
category: 'Nextjs Tailwind Shadcn Docs'
---

# Tailwind CSS 4+ Complete Reference

_For AI Assistants: CSS-first configuration, new utilities, and Oxide engine_

## 🚀 Revolutionary Changes in v4

### Key Transformations

- **🔥 Oxide Engine**: 5x faster full builds, 100x faster incremental builds
- **📝 CSS-First Config**: No more JavaScript configuration files
- **🎨 OKLCH Colors**: Better color perception and accessibility
- **⚡ Lightning CSS**: Built-in CSS processing
- **🏗️ CSS Cascade Layers**: Proper specificity management
- **🔧 Zero Config**: Automatic content detection

---

## 📋 Configuration Setup

### PostCSS Configuration

```javascript
// postcss.config.mjs
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

### Global CSS Structure

```css
/* globals.css */
@import 'tailwindcss';
@import 'tw-animate-css';

@theme {
  /* Configuration goes here */
}

:root {
  /* CSS variables for theming */
}

@theme inline {
  /* Map variables to Tailwind tokens */
}

@layer base {
  /* Base styles */
}

@layer components {
  /* Component styles */
}

@layer utilities {
  /* Custom utilities */
}
```

---

## 🎨 @theme Directive Configuration

### Typography System

```css
@theme {
  /* Font Families */
  --font-display: 'Inter', 'system-ui', 'sans-serif';
  --font-body: 'Inter', 'system-ui', 'sans-serif';
  --font-mono: 'JetBrains Mono', 'Menlo', 'monospace';
  --font-heading: 'Playfair Display', 'serif';

  /* Font Sizes */
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  --font-size-4xl: 2.25rem;
  --font-size-5xl: 3rem;
  --font-size-6xl: 3.75rem;
  --font-size-7xl: 4.5rem;
  --font-size-8xl: 6rem;
  --font-size-9xl: 8rem;

  /* Line Heights */
  --line-height-none: 1;
  --line-height-tight: 1.25;
  --line-height-snug: 1.375;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.625;
  --line-height-loose: 2;

  /* Letter Spacing */
  --letter-spacing-tighter: -0.05em;
  --letter-spacing-tight: -0.025em;
  --letter-spacing-normal: 0em;
  --letter-spacing-wide: 0.025em;
  --letter-spacing-wider: 0.05em;
  --letter-spacing-widest: 0.1em;
}
```

### Color System with OKLCH

```css
@theme {
  /* Primary Colors (OKLCH format) */
  --color-blue-50: oklch(0.97 0.013 240);
  --color-blue-100: oklch(0.93 0.054 240);
  --color-blue-200: oklch(0.86 0.108 240);
  --color-blue-300: oklch(0.78 0.162 240);
  --color-blue-400: oklch(0.69 0.216 240);
  --color-blue-500: oklch(0.64 0.27 240);
  --color-blue-600: oklch(0.57 0.243 240);
  --color-blue-700: oklch(0.5 0.216 240);
  --color-blue-800: oklch(0.43 0.189 240);
  --color-blue-900: oklch(0.36 0.162 240);
  --color-blue-950: oklch(0.24 0.108 240);

  /* Semantic Colors */
  --color-primary: oklch(0.5 0.2 240);
  --color-secondary: oklch(0.7 0.1 120);
  --color-accent: oklch(0.6 0.25 300);
  --color-success: oklch(0.7 0.15 150);
  --color-warning: oklch(0.84 0.16 84);
  --color-error: oklch(0.6 0.25 27);
  --color-info: oklch(0.7 0.15 200);

  /* Neutral Colors */
  --color-neutral-50: oklch(0.99 0.002 270);
  --color-neutral-100: oklch(0.97 0.004 270);
  --color-neutral-200: oklch(0.93 0.008 270);
  --color-neutral-300: oklch(0.87 0.012 270);
  --color-neutral-400: oklch(0.71 0.016 270);
  --color-neutral-500: oklch(0.55 0.02 270);
  --color-neutral-600: oklch(0.45 0.016 270);
  --color-neutral-700: oklch(0.35 0.012 270);
  --color-neutral-800: oklch(0.25 0.008 270);
  --color-neutral-900: oklch(0.15 0.004 270);
  --color-neutral-950: oklch(0.08 0.002 270);
}
```

### Spacing & Layout

```css
@theme {
  /* Spacing Scale */
  --spacing-px: 1px;
  --spacing-0: 0px;
  --spacing-0_5: 0.125rem;
  --spacing-1: 0.25rem;
  --spacing-1_5: 0.375rem;
  --spacing-2: 0.5rem;
  --spacing-2_5: 0.625rem;
  --spacing-3: 0.75rem;
  --spacing-3_5: 0.875rem;
  --spacing-4: 1rem;
  --spacing-5: 1.25rem;
  --spacing-6: 1.5rem;
  --spacing-7: 1.75rem;
  --spacing-8: 2rem;
  --spacing-9: 2.25rem;
  --spacing-10: 2.5rem;
  --spacing-11: 2.75rem;
  --spacing-12: 3rem;
  --spacing-14: 3.5rem;
  --spacing-16: 4rem;
  --spacing-20: 5rem;
  --spacing-24: 6rem;
  --spacing-28: 7rem;
  --spacing-32: 8rem;
  --spacing-36: 9rem;
  --spacing-40: 10rem;
  --spacing-44: 11rem;
  --spacing-48: 12rem;
  --spacing-52: 13rem;
  --spacing-56: 14rem;
  --spacing-60: 15rem;
  --spacing-64: 16rem;
  --spacing-72: 18rem;
  --spacing-80: 20rem;
  --spacing-96: 24rem;

  /* Border Radius */
  --radius-none: 0px;
  --radius-sm: 0.125rem;
  --radius: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;
  --radius-3xl: 1.5rem;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-md: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  --shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
}
```

### Responsive Breakpoints

```css
@theme {
  /* Default Breakpoints */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;

  /* Custom Breakpoints */
  --breakpoint-xs: 475px;
  --breakpoint-3xl: 1920px;
  --breakpoint-4xl: 2560px;
  --breakpoint-mobile: 640px;
  --breakpoint-tablet: 768px;
  --breakpoint-laptop: 1024px;
  --breakpoint-desktop: 1280px;
  --breakpoint-wide: 1536px;
}
```

### Animation & Transitions

```css
@theme {
  /* Transition Durations */
  --duration-75: 75ms;
  --duration-100: 100ms;
  --duration-150: 150ms;
  --duration-200: 200ms;
  --duration-300: 300ms;
  --duration-500: 500ms;
  --duration-700: 700ms;
  --duration-1000: 1000ms;

  /* Easing Functions */
  --ease-linear: linear;
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --ease-elastic: cubic-bezier(0.175, 0.885, 0.32, 1.275);

  /* Custom Animations */
  --animate-spin: spin 1s linear infinite;
  --animate-ping: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
  --animate-pulse: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  --animate-bounce: bounce 1s infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes ping {
  75%,
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

@keyframes pulse {
  50% {
    opacity: 0.5;
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: none;
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}
```

---

## 🛠️ New Utilities in v4

### Size Utilities (Replaces w-_/h-_)

```html
<!-- Old way -->
<div class="w-10 h-10">Square</div>
<div class="w-full h-full">Full size</div>

<!-- New way -->
<div class="size-10">Square</div>
<div class="size-full">Full size</div>

<!-- Other size utilities -->
<div class="size-4">16px square</div>
<div class="size-px">1px square</div>
<div class="size-auto">Auto size</div>
<div class="size-fit">Fit content</div>
<div class="size-min">Min content</div>
<div class="size-max">Max content</div>
```

### Dynamic Utilities (No Configuration Needed)

```html
<!-- Any number works without pre-configuration -->
<div class="grid grid-cols-15 gap-23 mt-17 px-23">
  <div class="text-[17px] leading-[1.2] tracking-[0.05em]">
    <div class="bg-[oklch(0.7_0.15_200)] text-[#ff6b35]">
      <!-- Percentage values -->
      <div class="w-[85%] h-[45%] opacity-[0.15]">
        <!-- CSS variables -->
        <div class="text-[var(--color-primary)] bg-[var(--color-accent)]"></div>
      </div>
    </div>
  </div>
</div>
```

### Enhanced Gradients

```html
<!-- Linear gradients with angles -->
<div class="bg-linear-to-r from-blue-500 to-purple-500">
  <div class="bg-linear-45 from-red-500 to-yellow-500">
    <div class="bg-linear-[135deg] from-green-500 to-blue-500">
      <!-- Radial gradients -->
      <div class="bg-radial from-purple-500 to-pink-500">
        <div class="bg-radial-[at_top] from-blue-500 to-transparent">
          <div class="bg-radial-[circle_at_center] from-yellow-500 to-red-500">
            <!-- Conic gradients -->
            <div class="bg-conic from-red-500 via-yellow-500 to-red-500">
              <div class="bg-conic-[from_45deg] from-blue-500 to-purple-500"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

### Container Queries

```html
<!-- Container query setup -->
<div class="@container">
  <div class="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-4">
    <!-- Content adapts to container, not viewport -->
  </div>
</div>

<!-- Container query breakpoints -->
<div class="@container">
  <div class="text-sm @xs:text-base @sm:text-lg @md:text-xl @lg:text-2xl">
    Responsive to container size
  </div>
</div>

<!-- Named containers -->
<div class="@container/sidebar">
  <div class="@sm/sidebar:hidden @lg/sidebar:block">Responsive to sidebar container</div>
</div>
```

### 3D Transforms

```html
<!-- 3D Perspective -->
<div class="perspective-500">
  <div class="transform-3d rotate-x-45 rotate-y-30">3D transformed element</div>
</div>

<!-- 3D Transforms -->
<div class="rotate-x-12">Rotate on X axis</div>
<div class="rotate-y-45">Rotate on Y axis</div>
<div class="rotate-z-90">Rotate on Z axis</div>
<div class="translate-z-10">Translate on Z axis</div>
<div class="scale-z-50">Scale on Z axis</div>

<!-- Perspective values -->
<div class="perspective-none">No perspective</div>
<div class="perspective-250">250px perspective</div>
<div class="perspective-500">500px perspective</div>
<div class="perspective-1000">1000px perspective</div>
```

### Data Attribute Utilities

```html
<!-- State-based styling -->
<div data-state="open" class="data-[state=open]:bg-green-500">Open state styling</div>

<button data-pressed class="data-[pressed]:bg-blue-600">Pressed state</button>

<!-- Custom data attributes -->
<div data-theme="dark" class="data-[theme=dark]:bg-gray-900">Dark theme styling</div>

<div data-loading class="data-[loading]:opacity-50">Loading state</div>
```

### Enhanced Typography

```html
<!-- Text decoration utilities -->
<p class="text-decoration-wavy">Wavy underline</p>
<p class="text-decoration-dotted">Dotted underline</p>
<p class="text-decoration-double">Double underline</p>

<!-- Text wrap utilities -->
<p class="text-wrap">Normal text wrapping</p>
<p class="text-nowrap">No text wrapping</p>
<p class="text-balance">Balanced text wrapping</p>
<p class="text-pretty">Pretty text wrapping</p>

<!-- Font variant utilities -->
<p class="font-variant-numeric-tabular">Tabular numbers</p>
<p class="font-variant-numeric-oldstyle">Old style numbers</p>
<p class='font-feature-settings-["ss01"]'>Stylistic set 01</p>
```

### Logical Properties

```html
<!-- Logical spacing -->
<div class="ms-4">Margin start (left in LTR, right in RTL)</div>
<div class="me-4">Margin end</div>
<div class="ps-4">Padding start</div>
<div class="pe-4">Padding end</div>

<!-- Logical borders -->
<div class="border-s">Border start</div>
<div class="border-e">Border end</div>
<div class="border-is">Border inline start</div>
<div class="border-ie">Border inline end</div>
```

---

## 🎭 @utility Directive (Custom Utilities)

### Creating Custom Utilities

```css
@utility btn-primary {
  background: linear-gradient(135deg, var(--color-blue-500), var(--color-purple-500));
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius);
  font-weight: 600;
  transition: all 200ms var(--ease-smooth);
  border: none;
  cursor: pointer;
}

@utility btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgb(0 0 0 / 0.3);
}

@utility btn-primary:active {
  transform: translateY(0);
}

@utility btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}
```

### Responsive Custom Utilities

```css
@utility card {
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
  transition: all 200ms var(--ease-smooth);
}

@utility card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

/* Responsive variants */
@media (min-width: 768px) {
  @utility card {
    padding: 2rem;
  }
}
```

### Component-Style Utilities

```css
@utility form-input {
  appearance: none;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  transition: all 150ms var(--ease-smooth);
}

@utility form-input:focus {
  outline: none;
  border-color: var(--color-primary);
  ring: 2px solid var(--color-primary);
  ring-opacity: 0.2;
}

@utility form-input:invalid {
  border-color: var(--color-error);
}

@utility form-input::placeholder {
  color: var(--color-muted-foreground);
}
```

---

## 🔄 Migration from v3 to v4

### Breaking Changes Summary

#### Removed Utilities

```html
<!-- ❌ No longer available -->
bg-opacity-50 → bg-black/50 text-opacity-75 → text-black/75 divide-opacity-25 → divide-black/25
placeholder-opacity-50 → placeholder-black/50 ring-opacity-75 → ring-black/75 flex-shrink-0 →
shrink-0 flex-shrink → shrink flex-grow-0 → grow-0 flex-grow → grow overflow-ellipsis →
text-ellipsis overflow-clip → text-clip
```

#### Renamed Utilities

```html
<!-- ❌ Old names -->
shadow-sm → shadow-xs shadow → shadow-sm rounded-sm → rounded-xs rounded → rounded-sm blur-sm →
blur-xs blur → blur-sm outline-none → outline-hidden ring → ring-3 (now defaults to 1px)
```

#### Color System Changes

```html
<!-- ❌ Old HSL colors -->
bg-blue-500 # Previously HSL

<!-- ✅ New OKLCH colors -->
bg-blue-500 # Now OKLCH (better color accuracy)

<!-- Manual color conversion needed for custom colors -->
<!-- HSL: 220 14% 96% → OKLCH: oklch(0.96 0.014 240) -->
```

#### Border and Ring Changes

```html
<!-- Borders now use currentColor by default -->
<div class="border">
  <!-- Now uses currentColor, not gray-200 -->
  <div class="border-gray-200">
    <!-- Explicit color needed for gray borders -->

    <!-- Rings use currentColor and 1px by default -->
    <div class="ring">
      <!-- Now 1px currentColor, not 3px blue -->
      <div class="ring-3 ring-blue-500"><!-- Explicit width and color --></div>
    </div>
  </div>
</div>
```

### Automated Migration

```bash
# Use official upgrade tool
npx @tailwindcss/upgrade@next

# This will:
# 1. Update dependencies
# 2. Convert tailwind.config.js to CSS
# 3. Update removed/renamed utilities
# 4. Create postcss.config.mjs
# 5. Update import statements
```

### Manual Migration Steps

#### 1. Update Dependencies

```bash
npm uninstall tailwindcss autoprefixer tailwindcss-animate
npm install tailwindcss@next @tailwindcss/postcss@next postcss tw-animate-css
```

#### 2. Convert Config to CSS

```css
/* Before: tailwind.config.js */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6';
      }
      ,
      fontFamily: {
        display:
          [ 'Inter',
          'sans-serif'];
      }
    }
  }
}

/* After: globals.css */
@theme {
  --color-primary: oklch(0.64 0.15 240);
  --font-display: 'Inter', 'sans-serif';
}
```

#### 3. Update PostCSS Config

```javascript
// Before: postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

// After: postcss.config.mjs
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

#### 4. Update CSS Imports

```css
/* Before */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* After */
@import 'tailwindcss';
```

#### 5. Update Animation Imports

```css
/* Before */
@import 'tailwindcss-animate';

/* After */
@import 'tw-animate-css';
```

---

## 🎨 Theming with CSS Variables

### Setting Up Theme Variables

```css
:root {
  /* Light theme */
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.5 0.2 240);
  --primary-foreground: oklch(0.98 0.02 240);
  --secondary: oklch(0.97 0.02 240);
  --secondary-foreground: oklch(0.145 0 0);
  --accent: oklch(0.97 0.02 240);
  --accent-foreground: oklch(0.145 0 0);
  --muted: oklch(0.97 0.02 240);
  --muted-foreground: oklch(0.556 0.016 270);
  --border: oklch(0.922 0.008 270);
  --input: oklch(0.922 0.008 270);
  --ring: oklch(0.5 0.2 240);
}

.dark {
  /* Dark theme */
  --background: oklch(0.094 0.004 270);
  --foreground: oklch(0.98 0.002 270);
  --primary: oklch(0.7 0.18 240);
  --primary-foreground: oklch(0.08 0.004 270);
  --secondary: oklch(0.162 0.008 270);
  --secondary-foreground: oklch(0.98 0.002 270);
  --accent: oklch(0.162 0.008 270);
  --accent-foreground: oklch(0.98 0.002 270);
  --muted: oklch(0.162 0.008 270);
  --muted-foreground: oklch(0.661 0.012 270);
  --border: oklch(0.162 0.008 270);
  --input: oklch(0.162 0.008 270);
  --ring: oklch(0.7 0.18 240);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
}
```

### Usage Examples

```html
<!-- Semantic color usage -->
<div class="bg-background text-foreground">
  <button class="bg-primary text-primary-foreground">Primary Button</button>
  <button class="bg-secondary text-secondary-foreground">Secondary Button</button>
  <div class="bg-muted text-muted-foreground">Muted content</div>
</div>

<!-- Border and focus states -->
<input class="border border-input focus:ring-2 focus:ring-ring" />
<div class="border border-border">Bordered content</div>
```

---

## 📱 Responsive Design Patterns

### Mobile-First Approach

```html
<!-- Base styles apply to mobile, then scale up -->
<div class="p-4 md:p-6 lg:p-8 xl:p-12">
  <h1 class="text-2xl md:text-3xl lg:text-4xl xl:text-5xl">Responsive Heading</h1>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    <!-- Responsive grid -->
  </div>
</div>
```

### Container Queries for Components

```html
<!-- Component-based responsive design -->
<div class="@container">
  <div class="p-4 @sm:p-6 @lg:p-8">
    <h2 class="text-lg @sm:text-xl @lg:text-2xl">Container Query Title</h2>
    <div class="grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-3">
      <!-- Grid responds to container, not viewport -->
    </div>
  </div>
</div>

<!-- Multiple named containers -->
<div class="@container/main">
  <aside class="@container/sidebar">
    <div class="text-sm @md/sidebar:text-base @lg/main:text-lg">
      Text size based on different containers
    </div>
  </aside>
</div>
```

### Print Styles

```html
<!-- Print-specific utilities -->
<div class="block print:hidden">Won't appear in print</div>
<div class="hidden print:block">Only appears in print</div>
<div class="text-black print:text-gray-800">Different colors for print</div>
<div class="p-4 print:p-0">No padding when printing</div>
```

---

## 🎯 Performance Optimization

### Content Detection

```css
/* Optimize build performance with specific sources */
@import 'tailwindcss';
@source "src/**/*.{js,ts,jsx,tsx}";
@source "components/**/*.{js,ts,jsx,tsx}";
@source "!node_modules/**/*";
@source "!.next/**/*";
@source "!dist/**/*";
```

### CSS Layers for Specificity Control

```css
@layer base, components, utilities;

@layer base {
  html {
    color-scheme: light dark;
  }

  body {
    font-family: var(--font-body);
    line-height: 1.5;
  }
}

@layer components {
  .btn {
    @apply px-4 py-2 rounded font-medium transition-colors;
  }

  .card {
    @apply bg-card border border-border rounded-lg p-6 shadow-sm;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

### Tree Shaking Optimization

```css
/* Only include utilities that are actually used */
@import 'tailwindcss';

/* Avoid importing entire icon libraries */
/* Instead of: @import "heroicons"; */
/* Use specific imports in JavaScript */
```

This comprehensive reference covers all the major changes and features in Tailwind CSS 4+, providing
AI assistants with the knowledge needed to work effectively with the new CSS-first approach and
enhanced utility system.
