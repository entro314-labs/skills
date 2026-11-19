# Editorial/Magazine Landing Page: Page Sections (1 of 2)

Part of the [Editorial/Magazine Landing Page specification](index.md).

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
