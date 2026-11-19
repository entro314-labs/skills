# Neobrutalist Landing Page: Page Sections (3 of 3)

Part of the [Neobrutalist Landing Page specification](index.md).

## Component Specifications (continued)

### 8. Pricing Section

**Visual Structure**:
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  PRICING                                                                    │
│                                                                             │
│  Simple. Honest. No tricks.                                                 │
│                                                                             │
│  ┌───────────────────────────────────┐  ┌───────────────────────────────────┐
│  │                                   │  │ ★ MOST POPULAR                    │
│  │  FREE                             │  │                                   │
│  │                                   │  │  PRO                              │
│  │  $0                               │  │                                   │
│  │  ──────────                       │  │  $29/mo                           │
│  │  forever                          │  │  ──────────                       │
│  │                                   │  │  billed monthly                   │
│  │  ✓ Up to 5 projects               │  │                                   │
│  │  ✓ Basic integrations             │  │  ✓ Unlimited projects             │
│  │  ✓ Community support              │  │  ✓ All integrations               │
│  │  ✗ Advanced analytics             │  │  ✓ Priority support               │
│  │  ✗ Custom branding                │  │  ✓ Advanced analytics             │
│  │  ✗ API access                     │  │  ✓ Custom branding                │
│  │                                   │  │  ✓ Full API access                │
│  │  [GET STARTED]                    │  │                                   │
│  │                                   │  │  [START FREE TRIAL →]             │
│  └───────────────────────────────────┘  └───────────────────────────────────┘
│                                                                             │
│  NEED MORE? Contact sales for Enterprise pricing with custom limits.        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**CSS**:
```css
.pricing-section {
  padding: 120px 48px;
  background: #E8E4D9;
}

.pricing-grid {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 24px;
  max-width: 900px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .pricing-grid {
    grid-template-columns: 1fr;
  }
}

.pricing-card {
  border: 3px solid #1A1A1A;
  padding: 48px;
  background: #FFFEF0;
  box-shadow: 6px 6px 0 #1A1A1A;
  display: flex;
  flex-direction: column;
}

.pricing-card-featured {
  background: #1A1A1A;
  color: #FFFEF0;
  box-shadow: 6px 6px 0 #FF5C00;
  position: relative;
}

.pricing-badge {
  position: absolute;
  top: -16px;
  left: 24px;
  background: #BFFF00;
  color: #1A1A1A;
  padding: 8px 16px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border: 3px solid #1A1A1A;
}

.pricing-tier {
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #6B6B6B;
  margin-bottom: 12px;
}

.pricing-card-featured .pricing-tier {
  color: #888;
}

.pricing-price {
  font-size: 64px;
  font-weight: 900;
  letter-spacing: -0.03em;
  line-height: 1;
  margin-bottom: 8px;
}

.pricing-card-featured .pricing-price {
  color: #BFFF00;
}

.pricing-period {
  font-size: 14px;
  font-weight: 500;
  color: #6B6B6B;
  margin-bottom: 32px;
}

.pricing-card-featured .pricing-period {
  color: #888;
}

.pricing-divider {
  width: 100%;
  height: 3px;
  background: #1A1A1A;
  margin-bottom: 32px;
}

.pricing-card-featured .pricing-divider {
  background: #444;
}

.pricing-features {
  flex: 1;
  margin-bottom: 32px;
}

.pricing-feature {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 16px;
}

.pricing-feature-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
}

.pricing-feature-icon.included {
  color: #00CC66;
}

.pricing-feature-icon.excluded {
  color: #999;
}

.pricing-feature.excluded {
  color: #999;
}

.pricing-cta {
  width: 100%;
}

.pricing-note {
  text-align: center;
  margin-top: 48px;
  font-size: 15px;
  color: #6B6B6B;
}

.pricing-note a {
  color: #1A1A1A;
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 2px;
}
```

**JSX Structure**:
```tsx
const plans = [
  {
    tier: 'FREE',
    price: '$0',
    period: 'forever',
    features: [
      { text: 'Up to 5 projects', included: true },
      { text: 'Basic integrations', included: true },
      { text: 'Community support', included: true },
      { text: 'Advanced analytics', included: false },
      { text: 'Custom branding', included: false },
      { text: 'API access', included: false },
    ],
    cta: 'GET STARTED',
    featured: false,
  },
  {
    tier: 'PRO',
    price: '$29',
    period: '/mo billed monthly',
    features: [
      { text: 'Unlimited projects', included: true },
      { text: 'All integrations', included: true },
      { text: 'Priority support', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Custom branding', included: true },
      { text: 'Full API access', included: true },
    ],
    cta: 'START FREE TRIAL',
    featured: true,
  },
];

<section className="pricing-section">
  <div className="features-header" style={{ textAlign: 'center' }}>
    <p className="features-label">PRICING</p>
    <h2 className="features-headline">
      Simple. Honest. No tricks.
    </h2>
  </div>

  <div className="pricing-grid">
    {plans.map((plan) => (
      <div
        key={plan.tier}
        className={`pricing-card ${plan.featured ? 'pricing-card-featured' : ''}`}
      >
        {plan.featured && <div className="pricing-badge">★ MOST POPULAR</div>}
        <div className="pricing-tier">{plan.tier}</div>
        <div className="pricing-price">{plan.price}</div>
        <div className="pricing-period">{plan.period}</div>
        <div className="pricing-divider" />

        <div className="pricing-features">
          {plan.features.map((feature, index) => (
            <div
              key={index}
              className={`pricing-feature ${!feature.included ? 'excluded' : ''}`}
            >
              <span className={`pricing-feature-icon ${feature.included ? 'included' : 'excluded'}`}>
                {feature.included ? '✓' : '✗'}
              </span>
              {feature.text}
            </div>
          ))}
        </div>

        <NeoButton
          variant={plan.featured ? 'primary' : 'secondary'}
          className="pricing-cta"
        >
          {plan.cta} {plan.featured && <ArrowRightIcon />}
        </NeoButton>
      </div>
    ))}
  </div>

  <p className="pricing-note">
    NEED MORE? <a href="/contact">Contact sales</a> for Enterprise pricing.
  </p>
</section>
```

### 9. FAQ Section (Accordion)

**Visual Structure**:
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  QUESTIONS?                                                                 │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ + HOW DOES BILLING WORK?                                                ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ − CAN I CANCEL ANYTIME?                                                 ││
│  │ ───────────────────────────────────────────────────────────────────     ││
│  │ Yes. No contracts, no commitments. Cancel from your dashboard in       ││
│  │ one click. We won't guilt-trip you or make it hard to leave.           ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ + WHAT ABOUT DATA SECURITY?                                             ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ + DO YOU OFFER REFUNDS?                                                 ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**CSS**:
```css
.faq-section {
  padding: 120px 48px;
  background: #FFFEF0;
}

.faq-list {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  border: 3px solid #1A1A1A;
  margin-bottom: -3px; /* Collapse borders */
  background: #FFFEF0;
}

.faq-item:first-child {
  border-top-width: 3px;
}

.faq-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 32px;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  transition: background 0.1s ease-out;
}

.faq-trigger:hover {
  background: #F5F3EB;
}

.faq-icon {
  font-size: 24px;
  font-weight: 900;
  transition: transform 0.1s ease-out;
}

.faq-item.open .faq-icon {
  transform: rotate(45deg);
}

.faq-content {
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.1s ease-out;
}

.faq-item.open .faq-content {
  max-height: 500px;
}

.faq-answer {
  padding: 0 32px 24px;
  font-size: 15px;
  line-height: 1.6;
  color: #4A4A4A;
}

.faq-answer-divider {
  width: 100%;
  height: 2px;
  background: #E8E4D9;
  margin-bottom: 16px;
}
```

**JSX Structure**:
```tsx
const faqs = [
  {
    question: 'HOW DOES BILLING WORK?',
    answer: 'Monthly billing, charged on the same day each month. We prorate upgrades and downgrades automatically. No surprises.',
  },
  {
    question: 'CAN I CANCEL ANYTIME?',
    answer: "Yes. No contracts, no commitments. Cancel from your dashboard in one click. We won't guilt-trip you or make it hard to leave.",
  },
  {
    question: 'WHAT ABOUT DATA SECURITY?',
    answer: "SOC2 Type II certified. AES-256 encryption at rest and in transit. We don't sell your data. Ever. Full GDPR compliance.",
  },
  {
    question: 'DO YOU OFFER REFUNDS?',
    answer: "30-day money-back guarantee, no questions asked. If you're not happy, we'll refund you. Simple as that.",
  },
];

const [openIndex, setOpenIndex] = useState<number | null>(1);

<section className="faq-section">
  <div className="features-header" style={{ textAlign: 'center' }}>
    <p className="features-label">FAQ</p>
    <h2 className="features-headline">Questions?</h2>
  </div>

  <div className="faq-list">
    {faqs.map((faq, index) => (
      <div
        key={index}
        className={`faq-item ${openIndex === index ? 'open' : ''}`}
      >
        <button
          className="faq-trigger"
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
        >
          <span>{faq.question}</span>
          <span className="faq-icon">+</span>
        </button>
        <div className="faq-content">
          <div className="faq-answer">
            <div className="faq-answer-divider" />
            {faq.answer}
          </div>
        </div>
      </div>
    ))}
  </div>
</section>
```

### 10. Final CTA Section

**Visual Structure**:
```
╔═══════════════════════════════════════════════════════════════════════════════╗
║                                                                                ║
║         ██████╗ ███████╗ █████╗ ██████╗ ██╗   ██╗██████╗                      ║
║         ██╔══██╗██╔════╝██╔══██╗██╔══██╗╚██╗ ██╔╝╚════██╗                     ║
║         ██████╔╝█████╗  ███████║██║  ██║ ╚████╔╝   ▄███╔╝                     ║
║         ██╔══██╗██╔══╝  ██╔══██║██║  ██║  ╚██╔╝    ▀▀══╝                      ║
║         ██║  ██║███████╗██║  ██║██████╔╝   ██║     ██╗                        ║
║         ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝    ╚═╝     ╚═╝                        ║
║                                                                                ║
║         Stop overthinking. Start building.                                     ║
║         Get started in 30 seconds.                                             ║
║                                                                                ║
║                    [GET STARTED FREE →]                                        ║
║                                                                                ║
╚═══════════════════════════════════════════════════════════════════════════════╝
```

**CSS**:
```css
.final-cta-section {
  padding: 160px 48px;
  background: #FF5C00;
  color: #FFFEF0;
  text-align: center;
  border-top: 3px solid #1A1A1A;
  border-bottom: 3px solid #1A1A1A;
}

.final-cta-headline {
  font-size: 80px;
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.03em;
  text-shadow: 6px 6px 0 #1A1A1A;
  margin-bottom: 24px;
}

@media (max-width: 1024px) {
  .final-cta-headline {
    font-size: 56px;
    text-shadow: 4px 4px 0 #1A1A1A;
  }
}

@media (max-width: 640px) {
  .final-cta-headline {
    font-size: 40px;
    text-shadow: 3px 3px 0 #1A1A1A;
  }
}

.final-cta-subheadline {
  font-size: 24px;
  font-weight: 500;
  opacity: 0.9;
  margin-bottom: 8px;
}

.final-cta-note {
  font-size: 16px;
  opacity: 0.7;
  margin-bottom: 48px;
}

.final-cta-button {
  background: #1A1A1A;
  color: #FFFEF0;
  border: 3px solid #1A1A1A;
  box-shadow: 6px 6px 0 #FFFEF0;
}

.final-cta-button:hover {
  transform: translate(-3px, -3px);
  box-shadow: 9px 9px 0 #FFFEF0;
}
```

**JSX Structure**:
```tsx
<section className="final-cta-section">
  <motion.h2
    className="final-cta-headline"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.15, ease: 'easeOut' }}
    viewport={{ once: true }}
  >
    READY?
  </motion.h2>
  <p className="final-cta-subheadline">
    Stop overthinking. Start building.
  </p>
  <p className="final-cta-note">
    Get started in 30 seconds. No credit card required.
  </p>
  <NeoButton
    variant="inverted"
    size="xl"
    className="final-cta-button"
  >
    GET STARTED FREE <ArrowRightIcon />
  </NeoButton>
</section>
```

### 11. Footer

**Visual Structure**:
```
┌────────────────────────────────────────────────────────────────────────────────┐
│                                                                                │
│  LOGO▪TEXT           PRODUCT      COMPANY      RESOURCES     LEGAL            │
│                      Features     About        Docs          Privacy          │
│  The tagline         Pricing      Careers      Blog          Terms            │
│  goes here.          Changelog    Contact      Help          Cookies          │
│                      Roadmap      Press        API           Security         │
│                                                                                │
│ ══════════════════════════════════════════════════════════════════════════════│
│                                                                                │
│  © 2024 Company Inc.     [X] [GitHub] [Discord] [LinkedIn]                    │
│                                                                                │
└────────────────────────────────────────────────────────────────────────────────┘
```

**CSS**:
```css
.footer {
  padding: 80px 48px 40px;
  background: #1A1A1A;
  color: #FFFEF0;
}

.footer-top {
  display: grid;
  grid-template-columns: 1.5fr repeat(4, 1fr);
  gap: 48px;
  margin-bottom: 64px;
}

@media (max-width: 1024px) {
  .footer-top {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
}

@media (max-width: 640px) {
  .footer-top {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

.footer-brand {
  max-width: 280px;
}

.footer-logo {
  font-size: 24px;
  font-weight: 900;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.footer-logo-mark {
  width: 12px;
  height: 12px;
  background: #FF5C00;
  transform: rotate(45deg);
}

.footer-tagline {
  font-size: 14px;
  color: #888;
  line-height: 1.5;
}

.footer-column-title {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #888;
  margin-bottom: 20px;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-link {
  font-size: 14px;
  font-weight: 500;
  color: #FFFEF0;
  transition: color 0.1s ease-out;
}

.footer-link:hover {
  color: #BFFF00;
}

.footer-divider {
  width: 100%;
  height: 3px;
  background: #333;
  margin-bottom: 32px;
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 24px;
}

.footer-copyright {
  font-size: 13px;
  color: #888;
}

.footer-social {
  display: flex;
  gap: 16px;
}

.footer-social-link {
  width: 40px;
  height: 40px;
  border: 2px solid #444;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.1s ease-out, background 0.1s ease-out;
}

.footer-social-link:hover {
  border-color: #FFFEF0;
  background: #FFFEF0;
}

.footer-social-link:hover svg {
  color: #1A1A1A;
}

.footer-social-link svg {
  width: 18px;
  height: 18px;
  color: #FFFEF0;
}
```
