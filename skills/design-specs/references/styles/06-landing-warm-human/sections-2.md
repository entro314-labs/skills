# Warm Human Landing Page: Page Sections (2 of 2)

Part of the [Warm Human Landing Page specification](index.md).

## Component Specifications (continued)

### Testimonials Carousel

```tsx
<section className="section bg-cream-200 overflow-hidden">
  <div className="container-main">
    <div className="text-center max-w-2xl mx-auto mb-16">
      <motion.span className="eyebrow mb-4 block">Testimonials</motion.span>
      <motion.h2 className="heading-display-md">
        Stories from our community
      </motion.h2>
    </div>
  </div>

  {/* Full-width Carousel */}
  <div className="relative">
    <motion.div
      className="flex gap-6 px-6 cursor-grab active:cursor-grabbing"
      drag="x"
      dragConstraints={{ left: -((testimonials.length - 1) * 420), right: 0 }}
      dragElastic={0.1}
    >
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={testimonial.id}
          className="testimonial-card shrink-0 w-[380px]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          {/* Stars */}
          <div className="flex gap-1 mb-4">
            {[1,2,3,4,5].map((star) => (
              <StarIcon key={star} className="w-5 h-5 text-accent-gold" />
            ))}
          </div>

          {/* Quote */}
          <p className="quote text-lg mb-6">"{testimonial.quote}"</p>

          {/* Author */}
          <div className="flex items-center gap-4">
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-coral-100"
            />
            <div>
              <p className="font-medium text-earth-900">{testimonial.name}</p>
              <p className="text-sm text-earth-700">{testimonial.role}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>

    {/* Fade Edges */}
    <div className="absolute left-0 top-0 bottom-0 w-16 bg-linear-to-r from-cream-200 to-transparent pointer-events-none" />
    <div className="absolute right-0 top-0 bottom-0 w-16 bg-linear-to-l from-cream-200 to-transparent pointer-events-none" />
  </div>
</section>
```

```css
.testimonial-card {
  background: white;
  padding: 32px;
  border-radius: 24px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-card);
}

.quote {
  font-family: var(--font-serif);
  font-size: 18px;
  font-weight: 400;
  font-style: italic;
  line-height: 1.6;
  color: var(--text-primary);
}
```

### Pricing Section

```tsx
<section className="section">
  <div className="container-main">
    <div className="text-center max-w-2xl mx-auto mb-16">
      <motion.span className="eyebrow mb-4 block">Pricing</motion.span>
      <motion.h2 className="heading-display-md mb-4">
        Simple, transparent pricing
      </motion.h2>
      <motion.p className="body-lg">
        Start free, upgrade when you're ready.
      </motion.p>
    </div>

    {/* Pricing Toggle (Monthly/Annual) */}
    <div className="flex items-center justify-center gap-4 mb-12">
      <span className={`text-sm ${isAnnual ? 'text-earth-700' : 'text-earth-900 font-medium'}`}>
        Monthly
      </span>
      <button
        onClick={() => setIsAnnual(!isAnnual)}
        className="relative w-14 h-8 rounded-full bg-cream-300 transition-colors"
      >
        <motion.div
          className="absolute top-1 left-1 w-6 h-6 rounded-full bg-coral-500"
          animate={{ x: isAnnual ? 24 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>
      <span className={`text-sm ${isAnnual ? 'text-earth-900 font-medium' : 'text-earth-700'}`}>
        Annual <span className="text-coral-500">(Save 20%)</span>
      </span>
    </div>

    {/* Pricing Cards */}
    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {plans.map((plan, index) => (
        <motion.div
          key={plan.id}
          className={`pricing-card ${plan.featured ? 'pricing-card-featured' : ''}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          {plan.featured && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-coral-500 text-white text-xs font-medium rounded-full">
              Most Popular
            </span>
          )}

          <h3 className="heading-sm mb-2">{plan.name}</h3>
          <p className="text-sm text-earth-700 mb-6">{plan.description}</p>

          <div className="mb-6">
            <span className="text-4xl font-serif font-medium text-earth-900">
              ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
            </span>
            <span className="text-earth-700">/month</span>
          </div>

          <button className={plan.featured ? 'btn-primary w-full' : 'btn-secondary w-full'}>
            {plan.cta}
          </button>

          <ul className="mt-8 space-y-3">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <CheckIcon className="w-5 h-5 text-sage-500 shrink-0" />
                <span className="text-earth-700">{feature}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  </div>
</section>
```

```css
.pricing-card {
  position: relative;
  background: white;
  padding: 36px;
  border-radius: 24px;
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-sm);
}

.pricing-card-featured {
  border: 2px solid var(--accent-coral);
  box-shadow: var(--shadow-coral);
  transform: scale(1.02);
}

@media (min-width: 768px) {
  .pricing-card-featured {
    transform: scale(1.05);
  }
}
```

### FAQ Accordion

```tsx
<section className="section bg-cream-200">
  <div className="container-main max-w-3xl">
    <div className="text-center mb-16">
      <motion.span className="eyebrow mb-4 block">FAQ</motion.span>
      <motion.h2 className="heading-display-md">
        Common questions
      </motion.h2>
    </div>

    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <motion.div
          key={faq.id}
          className="faq-item"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <button
            className="faq-trigger"
            onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
          >
            <span className="font-medium text-earth-900">{faq.question}</span>
            <motion.div
              animate={{ rotate: openFaq === faq.id ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDownIcon className="w-5 h-5 text-earth-700" />
            </motion.div>
          </button>

          <AnimatePresence>
            {openFaq === faq.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="overflow-hidden"
              >
                <p className="pt-4 pb-2 text-earth-700 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  </div>
</section>
```

```css
.faq-item {
  background: white;
  border-radius: 16px;
  border: 1px solid var(--border-card);
  overflow: hidden;
}

.faq-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s ease;
}

.faq-trigger:hover {
  background: var(--bg-accent);
}
```

### CTA Section

```tsx
<section className="section bg-gradient-warm relative overflow-hidden">
  {/* Background Decoration */}
  <div className="absolute inset-0">
    <FloatingCircle size={400} color="peach" position={{ top: '-20%', right: '-10%' }} />
    <FloatingCircle size={300} color="lavender" position={{ bottom: '-15%', left: '-8%' }} />
  </div>

  <div className="container-main relative z-10">
    <div className="text-center max-w-2xl mx-auto">
      <motion.h2
        className="heading-display-md text-white mb-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Ready to start your journey?
      </motion.h2>

      <motion.p
        className="body-lg text-white/90 mb-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Join thousands of people who have found more calm, clarity, and joy in their daily lives.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <button className="btn-primary bg-white text-coral-500 hover:bg-cream-100">
          Get Started Free
        </button>
      </motion.div>

      <motion.p
        className="mt-6 text-sm text-white/70"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        No credit card required. Cancel anytime.
      </motion.p>
    </div>
  </div>
</section>
```

### Footer

```tsx
<footer className="bg-cream-300 pt-20 pb-8">
  <div className="container-main">
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
      {/* Brand Column */}
      <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-8 lg:mb-0">
        <Logo className="h-8 mb-4" />
        <p className="text-sm text-earth-700 max-w-xs mb-6">
          Helping you find peace and balance in everyday life.
        </p>

        {/* Social Links */}
        <div className="flex gap-4">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              className="w-10 h-10 rounded-full bg-cream-200 flex items-center justify-center text-earth-700 hover:bg-coral-500 hover:text-white transition-all duration-300"
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>

      {/* Link Columns */}
      {footerLinks.map((column) => (
        <div key={column.title}>
          <h4 className="font-medium text-earth-900 mb-4">{column.title}</h4>
          <ul className="space-y-3">
            {column.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm text-earth-700 hover:text-coral-500 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Newsletter */}
      <div className="col-span-2 md:col-span-2 lg:col-span-1">
        <h4 className="font-medium text-earth-900 mb-4">Stay in touch</h4>
        <p className="text-sm text-earth-700 mb-4">
          Weekly tips for mindful living.
        </p>
        <form className="flex gap-2">
          <input
            type="email"
            placeholder="Your email"
            className="flex-1 px-4 py-3 rounded-xl bg-white border border-border-light text-sm focus:outline-hidden focus:ring-2 focus:ring-coral-500/30"
          />
          <button className="px-4 py-3 bg-coral-500 text-white rounded-xl hover:bg-coral-600 transition-colors">
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="pt-8 border-t border-earth-900/10 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-sm text-earth-700">
        © 2024 Serenity. All rights reserved.
      </p>
      <div className="flex gap-6">
        <a href="/privacy" className="text-sm text-earth-700 hover:text-coral-500 transition-colors">
          Privacy Policy
        </a>
        <a href="/terms" className="text-sm text-earth-700 hover:text-coral-500 transition-colors">
          Terms of Service
        </a>
      </div>
    </div>
  </div>
</footer>
```
