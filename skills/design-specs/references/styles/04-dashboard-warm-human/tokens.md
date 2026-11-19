# Warm Human Dashboard: Design Tokens

Part of the [Warm Human Dashboard specification](index.md).

## Color System

### CSS Custom Properties
```css
:root {
  /* Colours that also exist in the Tailwind theme point at it, so each value is written once, in @theme. */

  /* Backgrounds */
  --bg-base: var(--color-cream-100);            /* Warm cream - page background */
  --bg-surface: #FFFFFF;          /* Cards, panels */
  --bg-elevated: #FFFFFF;         /* Modals, popovers */
  --bg-accent: #FFF4ED;           /* Soft peach tint - highlights */
  --bg-accent-secondary: #F0F7F4; /* Soft sage tint */
  --bg-accent-tertiary: #EEF4FD;  /* Soft blue tint */
  --bg-muted: var(--color-cream-200);            /* Subtle sections */

  /* Text */
  --text-primary: var(--color-warm-brown-900);        /* Warm dark brown - headlines */
  --text-secondary: var(--color-warm-brown-500);      /* Body text */
  --text-muted: var(--color-warm-brown-300);          /* Captions, labels */
  --text-inverse: #FFFFFF;        /* On colored backgrounds */
  --text-accent: #E85D3B;         /* Accent text */

  /* Accent Colors - Warm & Friendly */
  --accent-coral: var(--color-coral-500);        /* Primary accent - warm coral */
  --accent-coral-hover: var(--color-coral-600);
  --accent-coral-soft: var(--color-coral-100);
  --accent-coral-softer: var(--color-coral-50);

  --accent-sage: var(--color-sage-500);         /* Success, positive - sage green */
  --accent-sage-hover: var(--color-sage-600);
  --accent-sage-soft: var(--color-sage-50);

  --accent-blue: var(--color-friendly-blue);         /* Info, links - friendly blue */
  --accent-blue-soft: rgba(91, 141, 239, 0.1);

  --accent-gold: var(--color-friendly-gold);         /* Achievements, stars */
  --accent-gold-soft: rgba(245, 166, 35, 0.15);

  --accent-lavender: var(--color-friendly-lavender);     /* Meditation, calm - soft purple */
  --accent-lavender-soft: rgba(167, 139, 250, 0.1);

  /* Semantic Colors */
  --success: #7CB798;
  --success-soft: rgba(124, 183, 152, 0.15);
  --warning: #F5A623;
  --warning-soft: rgba(245, 166, 35, 0.15);
  --error: #E85D3B;
  --error-soft: rgba(232, 93, 59, 0.15);

  /* Gradients */
  --gradient-warm: linear-gradient(135deg, #FFE4D9 0%, #FFD5C8 100%);
  --gradient-sage: linear-gradient(135deg, #D4EDE0 0%, #C4E3D4 100%);
  --gradient-sunset: linear-gradient(135deg, #FF7F5C 0%, #F5A623 100%);
  --gradient-calm: linear-gradient(135deg, #A78BFA 0%, #7CB798 100%);
  --gradient-progress: linear-gradient(90deg, #7CB798 0%, #5B8DEF 100%);

  /* Shadows - Soft & Warm */
  --shadow-sm: 0 2px 8px rgba(45, 42, 38, 0.04);
  --shadow-md: 0 4px 16px rgba(45, 42, 38, 0.06);
  --shadow-lg: 0 8px 32px rgba(45, 42, 38, 0.08);
  --shadow-xl: 0 16px 48px rgba(45, 42, 38, 0.10);
  --shadow-coral: 0 4px 16px rgba(255, 127, 92, 0.2);
  --shadow-hover: 0 12px 40px rgba(45, 42, 38, 0.10);

  /* Borders */
  --border-subtle: rgba(45, 42, 38, 0.06);
  --border-default: rgba(45, 42, 38, 0.10);

  /* Focus */
  --focus-ring: 0 0 0 3px rgba(255, 127, 92, 0.25);
}
```

### Tailwind Theme
```css
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  --color-cream-50: #FFFDFB;
  --color-cream-100: #FDF9F6;
  --color-cream-200: #FAF6F3;
  --color-cream-300: #F5F0EC;
  --color-warm-brown-900: #2D2A26;
  --color-warm-brown-700: #4A4540;
  --color-warm-brown-500: #6B6560;
  --color-warm-brown-300: #9A9590;
  --color-coral-50: rgba(255, 127, 92, 0.05);
  --color-coral-100: rgba(255, 127, 92, 0.1);
  --color-coral-200: #FFCAB8;
  --color-coral-400: #FF9A7D;
  --color-coral-500: #FF7F5C;
  --color-coral-600: #F06C48;
  --color-sage-50: rgba(124, 183, 152, 0.1);
  --color-sage-100: #D4EDE0;
  --color-sage-200: #B8DFC8;
  --color-sage-400: #8FC7A6;
  --color-sage-500: #7CB798;
  --color-sage-600: #6AA588;
  --color-friendly-blue: #5B8DEF;
  --color-friendly-gold: #F5A623;
  --color-friendly-lavender: #A78BFA;

  --font-serif: Fraunces, Lora, Georgia, serif;
  --font-sans: Inter, "General Sans", system-ui, sans-serif;

  --text-display: 36px;
  --text-display--line-height: 1.2;
  --text-display--letter-spacing: -0.02em;
  --text-heading-lg: 28px;
  --text-heading-lg--line-height: 1.25;
  --text-heading-lg--letter-spacing: -0.01em;
  --text-heading-md: 24px;
  --text-heading-md--line-height: 1.3;
  --text-heading-md--letter-spacing: -0.01em;
  --text-heading-sm: 20px;
  --text-heading-sm--line-height: 1.35;
  --text-title: 18px;
  --text-title--line-height: 1.4;
  --text-body-lg: 16px;
  --text-body-lg--line-height: 1.6;
  --text-body: 15px;
  --text-body--line-height: 1.6;
  --text-body-sm: 14px;
  --text-body-sm--line-height: 1.5;
  --text-caption: 13px;
  --text-caption--line-height: 1.4;
  --text-label: 12px;
  --text-label--line-height: 1.4;
  --text-label--letter-spacing: 0.02em;

  --radius-xl: 16px;
  --radius-2xl: 20px;
  --radius-3xl: 24px;
  --radius-4xl: 32px;
  --radius-blob: 60% 40% 30% 70% / 60% 30% 70% 40%;

  --spacing-safe: env(safe-area-inset-bottom);

  --animate-float: float 6s ease-in-out infinite;
  --animate-pulse-soft: pulse-soft 3s ease-in-out infinite;
  --animate-bounce-gentle: bounce-gentle 0.6s ease-out;
  --animate-count-up: count-up 1s ease-out;
  --animate-confetti: confetti 0.8s ease-out forwards;

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  @keyframes pulse-soft {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }
  @keyframes bounce-gentle {
    0% { transform: scale(0.8); opacity: 0; }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes confetti {
    0% { transform: scale(0) rotate(0deg); opacity: 1; }
    100% { transform: scale(1) rotate(360deg); opacity: 0; }
  }
}

/* No theme entry needed in v4: spacing 18, spacing 22 */
```

---

## Typography System

### Font Stack
```css
/* Put these @import lines at the very top of globals.css, above @import "tailwindcss".
   A browser ignores an @import that comes after other rules. */
/* Serif - Headlines (Warmth & Humanity) */
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&display=swap');

/* Sans - Body (Readability) */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
```

### Typography Classes
```css
/* Display Headlines - Serif */
.heading-display {
  font-family: var(--font-serif);
  font-size: 36px;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--text-primary);
}

.heading-lg {
  font-family: var(--font-serif);
  font-size: 28px;
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: -0.01em;
  color: var(--text-primary);
}

.heading-md {
  font-family: var(--font-serif);
  font-size: 24px;
  font-weight: 500;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: var(--text-primary);
}

.heading-sm {
  font-family: var(--font-sans);
  font-size: 20px;
  font-weight: 600;
  line-height: 1.35;
  color: var(--text-primary);
}

/* Body Text */
.body-lg {
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  color: var(--text-secondary);
}

.body {
  font-family: var(--font-sans);
  font-size: 15px;
  font-weight: 400;
  line-height: 1.6;
  color: var(--text-secondary);
}

.body-sm {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  color: var(--text-secondary);
}

/* Labels & Captions */
.caption {
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 400;
  line-height: 1.4;
  color: var(--text-muted);
}

.label {
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--text-muted);
}

/* Numbers - Friendly */
.stat-number {
  font-family: var(--font-serif);
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  color: var(--text-primary);
}

/* Encouraging Text */
.encouraging {
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--accent-coral);
}
```

---

## Layout System

### App Shell
```tsx
<div className="warm-shell">
  {/* Decorative Background Elements */}
  <div className="background-decorations">
    <div className="blob blob-1" />
    <div className="blob blob-2" />
    <div className="blob blob-3" />
  </div>

  {/* Content */}
  <div className="content-wrapper">
    <header className="top-nav">...</header>
    <main className="main-content">...</main>
    <nav className="bottom-nav">...</nav>
  </div>
</div>
```

```css
.warm-shell {
  min-height: 100vh;
  background: var(--bg-base);
  position: relative;
  overflow-x: hidden;
}

.background-decorations {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.blob {
  position: absolute;
  border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  filter: blur(60px);
  opacity: 0.4;
  animation: float 8s ease-in-out infinite;
}

.blob-1 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, rgba(255, 127, 92, 0.15) 0%, rgba(255, 127, 92, 0.05) 100%);
  top: -10%;
  right: -10%;
  animation-delay: 0s;
}

.blob-2 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, rgba(124, 183, 152, 0.15) 0%, rgba(124, 183, 152, 0.05) 100%);
  bottom: 20%;
  left: -8%;
  animation-delay: -2s;
}

.blob-3 {
  width: 250px;
  height: 250px;
  background: linear-gradient(135deg, rgba(167, 139, 250, 0.15) 0%, rgba(167, 139, 250, 0.05) 100%);
  top: 40%;
  right: -5%;
  animation-delay: -4s;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}

.content-wrapper {
  position: relative;
  z-index: 1;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 20px;
  padding-bottom: calc(80px + env(safe-area-inset-bottom));
}

@media (min-width: 768px) {
  .content-wrapper {
    max-width: 800px;
    padding: 0 40px;
    padding-bottom: 40px;
  }
}
```
