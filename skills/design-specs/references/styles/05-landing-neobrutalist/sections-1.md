# Neobrutalist Landing Page: Page Sections (1 of 3)

Part of the [Neobrutalist Landing Page specification](index.md).

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
