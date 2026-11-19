# Editorial/Magazine Landing Page: Page Sections (2 of 2)

Part of the [Editorial/Magazine Landing Page specification](index.md).

## Component Specifications (continued)

### 7. Statistics Box

**Visual Structure**:
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  ┌───────────────────────────────────┬──────────────────────────────────┐  │
│  │                                   │                                  │  │
│  │  THE KEY                          │    10,000+                       │  │
│  │  STATISTICS                       │    Hours of research             │  │
│  │  ══════════════                   │    ──────────────────            │  │
│  │                                   │                                  │  │
│  │  A look at the numbers            │    47                            │  │
│  │  behind design impact             │    Countries studied             │  │
│  │                                   │    ──────────────────            │  │
│  │                                   │                                  │  │
│  │                                   │    $2.4T                         │  │
│  │                                   │    Economic impact               │  │
│  │                                   │                                  │  │
│  └───────────────────────────────────┴──────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**CSS**:
```css
.stats-box {
  border: 1px solid var(--rule-heavy);
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 80px 0;
}

@media (max-width: 768px) {
  .stats-box {
    grid-template-columns: 1fr;
  }
}

.stats-box-header {
  padding: 48px;
  border-right: 1px solid var(--rule-heavy);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media (max-width: 768px) {
  .stats-box-header {
    border-right: none;
    border-bottom: 1px solid var(--rule-heavy);
  }
}

.stats-box-label {
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 8px;
}

.stats-box-title {
  font-family: var(--font-serif);
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 400;
  line-height: 1.15;
  letter-spacing: -0.01em;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.stats-box-title-line {
  width: 60px;
  height: 3px;
  background: var(--rule-heavy);
  margin-bottom: 24px;
}

.stats-box-description {
  font-family: var(--font-sans);
  font-size: 15px;
  line-height: 1.6;
  color: var(--text-secondary);
}

.stats-box-values {
  padding: 48px;
}

.stat-item {
  margin-bottom: 32px;
}

.stat-item:last-child {
  margin-bottom: 0;
}

.stat-value {
  font-family: var(--font-serif);
  font-size: clamp(36px, 5vw, 48px);
  font-weight: 400;
  line-height: 1;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.stat-label {
  font-family: var(--font-sans);
  font-size: 13px;
  color: var(--text-muted);
  padding-bottom: 16px;
  border-bottom: 1px solid var(--rule-light);
}
```

**JSX Structure**:
```tsx
const stats = [
  { value: '10,000+', label: 'Hours of research' },
  { value: '47', label: 'Countries studied' },
  { value: '$2.4T', label: 'Economic impact' },
];

<div className="stats-box">
  <div className="stats-box-header">
    <span className="stats-box-label">The Key</span>
    <h3 className="stats-box-title">Statistics</h3>
    <div className="stats-box-title-line" />
    <p className="stats-box-description">
      A look at the numbers behind design impact and its measurable
      influence on business outcomes.
    </p>
  </div>

  <div className="stats-box-values">
    {stats.map((stat, index) => (
      <div key={index} className="stat-item">
        <div className="stat-value">{stat.value}</div>
        <div className="stat-label">{stat.label}</div>
      </div>
    ))}
  </div>
</div>
```

### 8. Author Bio Section

**Visual Structure**:
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│      ABOUT THE AUTHOR                                                       │
│      ─────────────────                                                      │
│                                                                             │
│      ┌──────────┐  Sarah Chen is a design writer and researcher            │
│      │          │  based in San Francisco. Her work explores the           │
│      │  Photo   │  intersection of technology and human experience.        │
│      │          │                                                          │
│      └──────────┘  She has written for The New York Times, Wired,          │
│                    and Fast Company. This is her third piece for           │
│                    The Design Review.                                       │
│                                                                             │
│                    @sarahchen                                               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**CSS**:
```css
.author-bio-section {
  padding: 80px 0;
  border-top: 1px solid var(--rule-light);
}

.author-bio-label {
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 8px;
}

.author-bio-label-line {
  width: 100px;
  height: 1px;
  background: var(--rule-heavy);
  margin-bottom: 40px;
}

.author-bio-content {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 32px;
  align-items: start;
}

@media (max-width: 640px) {
  .author-bio-content {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}

.author-bio-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  filter: grayscale(100%);
}

.author-bio-text {
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.7;
  color: var(--text-secondary);
}

.author-bio-text p {
  margin-bottom: 16px;
}

.author-bio-handle {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  margin-top: 8px;
}
```

**JSX Structure**:
```tsx
<section className="author-bio-section editorial-grid">
  <div className="span-article">
    <div className="author-bio-label">About the Author</div>
    <div className="author-bio-label-line" />

    <div className="author-bio-content">
      <img
        src="/author-sarah.jpg"
        alt="Sarah Chen"
        className="author-bio-image"
      />
      <div className="author-bio-text">
        <p>
          Sarah Chen is a design writer and researcher based in San Francisco.
          Her work explores the intersection of technology and human experience.
        </p>
        <p>
          She has written for The New York Times, Wired, and Fast Company.
          This is her third piece for The Design Review.
        </p>
        <span className="author-bio-handle">@sarahchen</span>
      </div>
    </div>
  </div>
</section>
```

### 9. Related Readings Grid

**Visual Structure**:
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│      RELATED READINGS                                                       │
│                                                                             │
│      ┌────────────────┐  ┌────────────────┐  ┌────────────────┐            │
│      │                │  │                │  │                │            │
│      │    [Image]     │  │    [Image]     │  │    [Image]     │            │
│      │                │  │                │  │                │            │
│      ├────────────────┤  ├────────────────┤  ├────────────────┤            │
│      │ The Art of     │  │ Typography     │  │ Designing      │            │
│      │ Restraint      │  │ as Voice       │  │ for Meaning    │            │
│      │                │  │                │  │                │            │
│      │ By James Park  │  │ By Emma Liu    │  │ By David Kim   │            │
│      └────────────────┘  └────────────────┘  └────────────────┘            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**CSS**:
```css
.related-section {
  padding: 80px 0;
  border-top: 1px solid var(--rule-light);
}

.related-label {
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 48px;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

@media (max-width: 768px) {
  .related-grid {
    grid-template-columns: 1fr;
    gap: 48px;
  }
}

.related-card {
  display: block;
  text-decoration: none;
  color: inherit;
}

.related-card-image {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  margin-bottom: 20px;
  filter: grayscale(100%);
  transition: filter 0.4s ease;
}

.related-card:hover .related-card-image {
  filter: grayscale(0%);
}

.related-card-title {
  font-family: var(--font-serif);
  font-size: 22px;
  font-weight: 400;
  line-height: 1.25;
  letter-spacing: -0.01em;
  color: var(--text-primary);
  margin-bottom: 12px;
  transition: color 0.2s ease;
}

.related-card:hover .related-card-title {
  color: var(--editorial-red);
}

.related-card-author {
  font-family: var(--font-sans);
  font-size: 13px;
  color: var(--text-muted);
}
```

**JSX Structure**:
```tsx
const relatedArticles = [
  {
    image: '/related-1.jpg',
    title: 'The Art of Restraint',
    author: 'James Park',
    href: '/articles/restraint',
  },
  {
    image: '/related-2.jpg',
    title: 'Typography as Voice',
    author: 'Emma Liu',
    href: '/articles/typography',
  },
  {
    image: '/related-3.jpg',
    title: 'Designing for Meaning',
    author: 'David Kim',
    href: '/articles/meaning',
  },
];

<section className="related-section editorial-grid">
  <div className="span-wide">
    <div className="related-label">Related Readings</div>

    <div className="related-grid">
      {relatedArticles.map((article, index) => (
        <a key={index} href={article.href} className="related-card">
          <img
            src={article.image}
            alt={article.title}
            className="related-card-image"
          />
          <h3 className="related-card-title">{article.title}</h3>
          <span className="related-card-author">By {article.author}</span>
        </a>
      ))}
    </div>
  </div>
</section>
```

### 10. Newsletter Signup

**Visual Structure**:
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                              NEWSLETTER                                     │
│                                                                             │
│                    Subscribe to receive our weekly                          │
│                    curation of design thinking.                             │
│                                                                             │
│                 ┌─────────────────────────────────────┐                    │
│                 │ your@email.com                      │  SUBSCRIBE         │
│                 └─────────────────────────────────────┘                    │
│                                                                             │
│                    No spam. Unsubscribe anytime.                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**CSS**:
```css
.newsletter-section {
  padding: 100px 24px;
  text-align: center;
  background: var(--cream);
}

.newsletter-label {
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 24px;
}

.newsletter-description {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: clamp(20px, 3vw, 26px);
  line-height: 1.5;
  color: var(--text-secondary);
  max-width: 400px;
  margin: 0 auto 40px;
}

.newsletter-form {
  display: flex;
  gap: 0;
  max-width: 480px;
  margin: 0 auto;
}

@media (max-width: 640px) {
  .newsletter-form {
    flex-direction: column;
    gap: 12px;
  }
}

.newsletter-input {
  flex: 1;
  padding: 16px 20px;
  font-family: var(--font-sans);
  font-size: 15px;
  border: 1px solid var(--rule-heavy);
  border-right: none;
  background: var(--paper);
  color: var(--text-primary);
  outline: none;
  transition: border-color 0.2s ease;
}

.newsletter-input:focus {
  border-color: var(--editorial-red);
}

.newsletter-input::placeholder {
  color: var(--text-muted);
}

@media (max-width: 640px) {
  .newsletter-input {
    border-right: 1px solid var(--rule-heavy);
  }
}

.newsletter-button {
  padding: 16px 32px;
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: var(--rule-heavy);
  color: var(--paper);
  border: 1px solid var(--rule-heavy);
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}

.newsletter-button:hover {
  background: var(--editorial-red);
  border-color: var(--editorial-red);
}

.newsletter-disclaimer {
  font-family: var(--font-sans);
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 20px;
}
```

**JSX Structure**:
```tsx
<section className="newsletter-section">
  <div className="newsletter-label">Newsletter</div>
  <p className="newsletter-description">
    Subscribe to receive our weekly curation of design thinking.
  </p>

  <form className="newsletter-form" onSubmit={handleSubmit}>
    <input
      type="email"
      className="newsletter-input"
      placeholder="your@email.com"
      required
    />
    <button type="submit" className="newsletter-button">
      Subscribe
    </button>
  </form>

  <p className="newsletter-disclaimer">
    No spam. Unsubscribe anytime.
  </p>
</section>
```

### 11. Footer

**Visual Structure**:
```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ═══════════════════════════════════════════════════════════════════════   │
│                                                                             │
│      THE DESIGN REVIEW                         Issue 47 - December 2024    │
│                                                                             │
│      About  •  Archive  •  Subscribe  •  Contact                           │
│                                                                             │
│      © 2024 The Design Review. All rights reserved.                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**CSS**:
```css
.footer-editorial {
  padding: 64px 24px;
  border-top: 3px solid var(--rule-heavy);
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-main {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 40px;
}

@media (max-width: 640px) {
  .footer-main {
    flex-direction: column;
    align-items: center;
    gap: 16px;
    text-align: center;
  }
}

.footer-title {
  font-family: var(--font-serif);
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--text-primary);
}

.footer-issue {
  font-family: var(--font-sans);
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.footer-nav {
  display: flex;
  gap: 32px;
  margin-bottom: 32px;
  justify-content: center;
}

.footer-nav-link {
  font-family: var(--font-sans);
  font-size: 13px;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-nav-link:hover {
  color: var(--editorial-red);
}

.footer-copyright {
  font-family: var(--font-sans);
  font-size: 12px;
  color: var(--text-muted);
  text-align: center;
}
```

**JSX Structure**:
```tsx
<footer className="footer-editorial">
  <div className="footer-inner">
    <div className="footer-main">
      <span className="footer-title">THE DESIGN REVIEW</span>
      <span className="footer-issue">Issue 47 - December 2024</span>
    </div>

    <nav className="footer-nav">
      <a href="/about" className="footer-nav-link">About</a>
      <a href="/archive" className="footer-nav-link">Archive</a>
      <a href="/subscribe" className="footer-nav-link">Subscribe</a>
      <a href="/contact" className="footer-nav-link">Contact</a>
    </nav>

    <p className="footer-copyright">
      © 2024 The Design Review. All rights reserved.
    </p>
  </div>
</footer>
```
