# Tech SaaS Premium Landing Page: Design Tokens

Part of the [Tech SaaS Premium Landing Page specification](index.md).

## Color System

```css
:root {
  /* Backgrounds */
  --bg-base: #0A0A0B;           /* Primary page background */
  --bg-elevated: #111113;        /* Card backgrounds */
  --bg-surface: #18181B;         /* Elevated surfaces */
  --bg-hover: #1F1F23;           /* Hover states */

  /* Text */
  --text-primary: #FAFAFA;       /* Primary text */
  --text-secondary: #A1A1A6;     /* Secondary text */
  --text-muted: #52525B;         /* Muted text */

  /* Borders */
  --border-subtle: rgba(255, 255, 255, 0.06);
  --border-default: rgba(255, 255, 255, 0.1);
  --border-strong: rgba(255, 255, 255, 0.15);

  /* Accent (choose one for your brand) */
  --accent: #10B981;             /* Emerald green */
  --accent-hover: #059669;
  --accent-soft: rgba(16, 185, 129, 0.1);
  --accent-glow: rgba(16, 185, 129, 0.2);

  /* Gradient */
  --gradient-start: #6366F1;     /* Indigo */
  --gradient-end: #10B981;       /* Emerald */

  /* Functional */
  --success: #10B981;
  --warning: #F59E0B;
  --error: #EF4444;
}
```

---

## Typography

### Font Stack
```css
--font-display: 'Inter', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### Type Scale
```css
/* Display */
.text-display-xl { font-size: clamp(56px, 8vw, 96px); line-height: 1.0; font-weight: 600; letter-spacing: -0.03em; }
.text-display { font-size: clamp(40px, 5vw, 64px); line-height: 1.1; font-weight: 600; letter-spacing: -0.02em; }

/* Headings */
.text-h1 { font-size: 48px; line-height: 1.15; font-weight: 600; letter-spacing: -0.02em; }
.text-h2 { font-size: 36px; line-height: 1.2; font-weight: 600; letter-spacing: -0.01em; }
.text-h3 { font-size: 24px; line-height: 1.3; font-weight: 600; }
.text-h4 { font-size: 18px; line-height: 1.4; font-weight: 600; }

/* Body */
.text-body-lg { font-size: 18px; line-height: 1.6; font-weight: 400; }
.text-body { font-size: 16px; line-height: 1.6; font-weight: 400; }
.text-body-sm { font-size: 14px; line-height: 1.5; font-weight: 400; }

/* Labels */
.text-label { font-size: 12px; line-height: 1.4; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; }
.text-caption { font-size: 13px; line-height: 1.4; font-weight: 500; color: var(--text-secondary); }

/* Monospace */
.text-mono { font-family: var(--font-mono); font-size: 14px; }
.text-mono-sm { font-family: var(--font-mono); font-size: 13px; }
```

### Gradient Text
```css
.gradient-text {
  background: linear-gradient(135deg, var(--text-primary) 0%, var(--text-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.gradient-text-accent {
  background: linear-gradient(135deg, var(--gradient-start) 0%, var(--gradient-end) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

---

## Responsive Breakpoints

```css
/* Tablet */
@media (max-width: 1024px) {
  .hero { grid-template-columns: 1fr; text-align: center; }
  .hero-visual-wrapper { margin-top: 48px; }
  .features-grid { grid-template-columns: 1fr 1fr; }
  .features-grid .feature-card:nth-child(1) { grid-column: span 2; }
  .how-grid { grid-template-columns: 1fr; }
  .pricing-grid { grid-template-columns: 1fr; max-width: 400px; margin: 0 auto; }
  .footer-grid { grid-template-columns: 1fr 1fr; }
}

/* Mobile */
@media (max-width: 640px) {
  .hero { padding: 100px 24px 60px; }
  .features-grid { grid-template-columns: 1fr; }
  .features-grid .feature-card { grid-column: span 1 !important; }
  .integrations-grid { grid-template-columns: repeat(3, 1fr); }
  .footer-grid { grid-template-columns: 1fr; }
}
```
