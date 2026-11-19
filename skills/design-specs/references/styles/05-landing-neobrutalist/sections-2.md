# Neobrutalist Landing Page: Page Sections (2 of 3)

Part of the [Neobrutalist Landing Page specification](index.md).

## Component Specifications (continued)

### 5. How It Works Section

**Visual Structure**:
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  HOW IT WORKS                                                               │
│                                                                             │
│  Three steps. That's it.                                                    │
│                                                                             │
│  ┌─────────────────────┐    ┌─────────────────────┐    ┌─────────────────────┐
│  │                     │    │                     │    │                     │
│  │  ██████╗  ██╗      │    │  ██████╗  ██████╗  │    │  ██████╗  ██████╗  │
│  │  ██╔═══╝  ██║      │ →→ │  ██╔═══╝  ██╔═══╝  │ →→ │  ██╔═══╝  ██║ ██║  │
│  │  ██████╗  ██║      │    │  ██████╗  ██████╗  │    │  ██████╗  ██████╔╝  │
│  │  ╚═══██║  ██║      │    │  ╚═══██║  ╚═══██║  │    │  ╚═══██║  ╚═══██║   │
│  │  ██████║  ██║      │    │  ██████║  ██████║  │    │  ██████║  ██████║   │
│  │  ╚═════╝  ╚═╝      │    │  ╚═════╝  ╚═════╝  │    │  ╚═════╝  ╚═════╝   │
│  │                     │    │                     │    │                     │
│  │  ═════════════      │    │  ═════════════      │    │  ═════════════      │
│  │  SIGN UP            │    │  CONNECT            │    │  LAUNCH             │
│  │                     │    │                     │    │                     │
│  │  Create your free   │    │  Link your tools    │    │  Start using        │
│  │  account in 30 sec  │    │  in one click       │    │  immediately        │
│  │                     │    │                     │    │                     │
│  └─────────────────────┘    └─────────────────────┘    └─────────────────────┘
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**CSS**:
```css
.how-it-works-section {
  padding: 120px 48px;
  background: #FFFEF0;
}

.how-it-works-header {
  margin-bottom: 80px;
}

.how-it-works-steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  position: relative;
}

@media (max-width: 768px) {
  .how-it-works-steps {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

/* Arrow connector between steps */
.step-connector {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-connector::before,
.step-connector::after {
  content: '→';
  font-size: 24px;
  font-weight: 900;
  color: #1A1A1A;
}

.step-connector-1 {
  left: calc(33.333% - 24px);
}

.step-connector-2 {
  left: calc(66.666% - 24px);
}

@media (max-width: 768px) {
  .step-connector {
    display: none;
  }
}

.step-card {
  border: 3px solid #1A1A1A;
  padding: 48px 36px;
  background: #FFFEF0;
  box-shadow: 6px 6px 0 #1A1A1A;
  transition: transform 0.1s ease-out, box-shadow 0.1s ease-out;
}

.step-card:hover {
  transform: translate(-4px, -4px);
  box-shadow: 10px 10px 0 #1A1A1A;
}

.step-number {
  font-size: 80px;
  font-weight: 900;
  line-height: 0.85;
  letter-spacing: -0.04em;
  color: #E8E4D9;
  margin-bottom: 24px;
}

.step-divider {
  width: 60px;
  height: 4px;
  background: #1A1A1A;
  margin-bottom: 20px;
}

.step-title {
  font-size: 24px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  margin-bottom: 16px;
}

.step-description {
  font-size: 16px;
  line-height: 1.6;
  color: #4A4A4A;
}
```

**JSX Structure**:
```tsx
const steps = [
  { number: '01', title: 'SIGN UP', description: 'Create your free account in 30 seconds. No credit card, no BS.' },
  { number: '02', title: 'CONNECT', description: 'Link your existing tools with one click. We do the heavy lifting.' },
  { number: '03', title: 'LAUNCH', description: 'Start using immediately. Zero learning curve.' },
];

<section className="how-it-works-section">
  <div className="how-it-works-header">
    <p className="features-label">HOW IT WORKS</p>
    <h2 className="features-headline">
      Three steps. That's it.
    </h2>
  </div>

  <div className="how-it-works-steps">
    {steps.map((step, index) => (
      <motion.div
        key={step.number}
        className="step-card"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.15,
          ease: 'easeOut',
          delay: index * 0.1
        }}
        viewport={{ once: true }}
      >
        <div className="step-number">{step.number}</div>
        <div className="step-divider" />
        <h3 className="step-title">{step.title}</h3>
        <p className="step-description">{step.description}</p>
      </motion.div>
    ))}

    {/* Desktop connectors */}
    <div className="step-connector step-connector-1" aria-hidden="true" />
    <div className="step-connector step-connector-2" aria-hidden="true" />
  </div>
</section>
```

### 6. Social Proof Section (Logo Wall + Stats)

**Visual Structure**:
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  TRUSTED BY TEAMS AT                                                        │
│                                                                             │
│  ┌────────┬────────┬────────┬────────┐    ┌───────────────────────────────┐│
│  │ STRIPE │ VERCEL │ LINEAR │ NOTION ││    │  10,000+     │    99.9%      ││
│  ├────────┼────────┼────────┼────────┤│    │  ════════    │    ════════   ││
│  │ FIGMA  │ CLERK  │ SUPABASE│ RAYCAST│    │  ACTIVE      │    UPTIME     ││
│  ├────────┼────────┼────────┼────────┤│    │  USERS       │               ││
│  │ RESEND │ CAL    │ DESCRIPT│ LOOM  ││    ├──────────────┼───────────────┤│
│  └────────┴────────┴────────┴────────┘│    │  50M+        │    <100ms     ││
│                                        │    │  ════════    │    ════════   ││
│                                        │    │  REQUESTS    │    LATENCY    ││
│                                        │    │  MONTHLY     │    P99        ││
│                                        │    └──────────────┴───────────────┘│
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**CSS**:
```css
.social-proof-section {
  padding: 120px 48px;
  background: #1A1A1A;
  color: #FFFEF0;
}

.social-proof-layout {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 64px;
  align-items: start;
}

@media (max-width: 1024px) {
  .social-proof-layout {
    grid-template-columns: 1fr;
    gap: 48px;
  }
}

/* Logo Wall */
.logo-wall {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3px;
  background: #FFFEF0;
  padding: 3px;
}

@media (max-width: 640px) {
  .logo-wall {
    grid-template-columns: repeat(2, 1fr);
  }
}

.logo-cell {
  background: #1A1A1A;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 2 / 1;
  transition: background 0.1s ease-out;
}

.logo-cell:hover {
  background: #2A2A2A;
}

.logo-cell svg,
.logo-cell img {
  height: 24px;
  width: auto;
  opacity: 0.8;
  filter: brightness(0) invert(1); /* Make logos white */
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3px;
  background: #FFFEF0;
  padding: 3px;
}

.stat-cell {
  background: #1A1A1A;
  padding: 40px 32px;
}

.stat-value {
  font-size: 48px;
  font-weight: 900;
  letter-spacing: -0.03em;
  color: #BFFF00;
  margin-bottom: 8px;
}

.stat-divider {
  width: 48px;
  height: 3px;
  background: #FFFEF0;
  margin-bottom: 12px;
}

.stat-label {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #888;
}

.stat-sublabel {
  font-size: 11px;
  font-weight: 500;
  color: #666;
  margin-top: 4px;
}
```

**JSX Structure**:
```tsx
const logos = ['Stripe', 'Vercel', 'Linear', 'Notion', 'Figma', 'Clerk', 'Supabase', 'Raycast', 'Resend', 'Cal', 'Descript', 'Loom'];

const stats = [
  { value: '10,000+', label: 'ACTIVE USERS' },
  { value: '99.9%', label: 'UPTIME' },
  { value: '50M+', label: 'REQUESTS', sublabel: 'MONTHLY' },
  { value: '<100ms', label: 'LATENCY', sublabel: 'P99' },
];

<section className="social-proof-section">
  <p className="features-label" style={{ color: '#888' }}>TRUSTED BY TEAMS AT</p>

  <div className="social-proof-layout">
    {/* Logo Wall */}
    <div className="logo-wall">
      {logos.map((logo) => (
        <div key={logo} className="logo-cell">
          <CompanyLogo name={logo} />
        </div>
      ))}
    </div>

    {/* Stats Grid */}
    <div className="stats-grid">
      {stats.map((stat) => (
        <div key={stat.label} className="stat-cell">
          <div className="stat-value">{stat.value}</div>
          <div className="stat-divider" />
          <div className="stat-label">{stat.label}</div>
          {stat.sublabel && <div className="stat-sublabel">{stat.sublabel}</div>}
        </div>
      ))}
    </div>
  </div>
</section>
```

### 7. Testimonials Section

**Visual Structure**:
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  WHAT PEOPLE SAY                                                            │
│                                                                             │
│  ← Drag to scroll →                                                         │
│                                                                             │
│  ┌─────────────────────────┐ ┌─────────────────────────┐ ┌─────────────────│
│  │ "                       │ │ "                       │ │ "               │
│  │ This tool changed how   │ │ Finally, something that │ │ I deleted 5    │
│  │ we work. Not kidding.   │ │ just works. Shocking.   │ │ other tools    │
│  │ We shipped 3x faster    │ │ Actually shocked.       │ │ after trying   │
│  │ last quarter."          │ │                         │ │ this."         │
│  │                    "    │ │                    "    │ │                │
│  │ ────────────────────    │ │ ────────────────────    │ │ ───────────────│
│  │ - SARAH CHEN            │ │ - MARCUS JOHNSON        │ │ - EMMA WILSON  │
│  │   CTO @ Acme Inc        │ │   Founder @ StartupXYZ  │ │   Engineer @   │
│  └─────────────────────────┘ └─────────────────────────┘ └─────────────────│
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**CSS**:
```css
.testimonials-section {
  padding: 120px 0;
  background: #FFFEF0;
  overflow: hidden;
}

.testimonials-header {
  padding: 0 48px;
  margin-bottom: 48px;
}

.testimonials-scroll {
  display: flex;
  gap: 24px;
  padding: 0 48px;
  overflow-x: auto;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  cursor: grab;
}

.testimonials-scroll::-webkit-scrollbar {
  display: none;
}

.testimonials-scroll:active {
  cursor: grabbing;
}

.testimonial-card {
  flex-shrink: 0;
  width: 400px;
  border: 3px solid #1A1A1A;
  padding: 40px;
  background: #FFFEF0;
  box-shadow: 6px 6px 0 #1A1A1A;
}

@media (max-width: 640px) {
  .testimonial-card {
    width: 320px;
    padding: 32px;
  }
}

.testimonial-quote-mark {
  font-size: 72px;
  font-weight: 900;
  line-height: 0.5;
  color: #E8E4D9;
  margin-bottom: 16px;
}

.testimonial-text {
  font-size: 18px;
  font-weight: 500;
  line-height: 1.5;
  margin-bottom: 32px;
}

.testimonial-divider {
  width: 100%;
  height: 3px;
  background: #1A1A1A;
  margin-bottom: 20px;
}

.testimonial-author {
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.testimonial-role {
  font-size: 13px;
  font-weight: 500;
  color: #6B6B6B;
  margin-top: 4px;
}

/* Accent card variant */
.testimonial-card-accent {
  background: #0066FF;
  color: #FFFEF0;
  box-shadow: 6px 6px 0 #1A1A1A;
}

.testimonial-card-accent .testimonial-quote-mark {
  color: rgba(255, 255, 255, 0.2);
}

.testimonial-card-accent .testimonial-divider {
  background: #FFFEF0;
}

.testimonial-card-accent .testimonial-role {
  color: rgba(255, 255, 255, 0.7);
}
```

**JSX Structure**:
```tsx
const testimonials = [
  {
    text: "This tool changed how we work. Not kidding. We shipped 3x faster last quarter.",
    author: "SARAH CHEN",
    role: "CTO @ Acme Inc",
    accent: false,
  },
  {
    text: "Finally, something that just works. Shocking. Actually shocked.",
    author: "MARCUS JOHNSON",
    role: "Founder @ StartupXYZ",
    accent: true,
  },
  {
    text: "I deleted 5 other tools after trying this. Should've found it sooner.",
    author: "EMMA WILSON",
    role: "Engineer @ TechCorp",
    accent: false,
  },
  {
    text: "Our team stopped complaining about tools. First time in 3 years.",
    author: "JAMES PARK",
    role: "VP Product @ Enterprise",
    accent: false,
  },
];

<section className="testimonials-section">
  <div className="testimonials-header">
    <p className="features-label">WHAT PEOPLE SAY</p>
    <h2 className="features-headline">
      Don't take our word for it.
    </h2>
  </div>

  <div className="testimonials-scroll">
    {testimonials.map((testimonial, index) => (
      <motion.div
        key={index}
        className={`testimonial-card ${testimonial.accent ? 'testimonial-card-accent' : ''}`}
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.15, ease: 'easeOut', delay: index * 0.1 }}
        viewport={{ once: true }}
      >
        <div className="testimonial-quote-mark">"</div>
        <p className="testimonial-text">{testimonial.text}"</p>
        <div className="testimonial-divider" />
        <div className="testimonial-author">- {testimonial.author}</div>
        <div className="testimonial-role">{testimonial.role}</div>
      </motion.div>
    ))}
  </div>
</section>
```
