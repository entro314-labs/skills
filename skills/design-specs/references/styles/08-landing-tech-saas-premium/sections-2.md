# Tech SaaS Premium Landing Page: Page Sections (2 of 2)

Part of the [Tech SaaS Premium Landing Page specification](index.md).

## Section 6: How It Works

### Layout (3-Step with Visual)
```css
.how-section {
  padding: 120px 48px;
  max-width: 1200px;
  margin: 0 auto;
}
.how-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}
.how-steps {
  display: flex;
  flex-direction: column;
  gap: 48px;
}
```

### Step Item
```css
.step-item {
  display: flex;
  gap: 24px;
}
.step-number {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--accent-soft);
  border: 1px solid var(--accent);
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  color: var(--accent);
}
.step-content {
  flex: 1;
}
.step-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
}
.step-description {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.6;
}
```

### Visual (Right Side)
Vertical flow diagram or code snippet showing the process.

```css
.how-visual {
  position: relative;
  padding: 40px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: 16px;
}
```

### SVG Connection Lines (GSAP ScrollTrigger)
```jsx
// Draw connection lines between steps as user scrolls
useEffect(() => {
  const path = document.querySelector('.connection-path');
  const pathLength = path.getTotalLength();

  path.style.strokeDasharray = pathLength;
  path.style.strokeDashoffset = pathLength;

  gsap.to(path, {
    strokeDashoffset: 0,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: '.how-section',
      start: 'top 60%',
      end: 'bottom 40%',
      scrub: 1,
    }
  });
}, []);
```

---

## Section 7: Integrations

### Layout
```css
.integrations-section {
  padding: 120px 48px;
  text-align: center;
}
.integrations-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 24px;
  max-width: 900px;
  margin: 64px auto 0;
}
```

### Integration Badge
```css
.integration-badge {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: 16px;
  padding: 24px;
  transition: all 0.3s ease;
}
.integration-badge:hover {
  border-color: var(--border-default);
  transform: translateY(-4px) rotate(-2deg);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}
.integration-badge img {
  width: 48px;
  height: 48px;
  object-fit: contain;
  filter: grayscale(100%);
  opacity: 0.7;
  transition: all 0.3s ease;
}
.integration-badge:hover img {
  filter: grayscale(0%);
  opacity: 1;
}
```

### Animation (Staggered reveal)
```jsx
const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      delay: i * 0.05,
    }
  })
};
```

---

## Section 8: Testimonials (Horizontal Scroll)

### Layout
```css
.testimonials-section {
  padding: 120px 0;
  overflow: hidden;
}
.testimonials-header {
  text-align: center;
  padding: 0 48px;
  margin-bottom: 64px;
}
.testimonials-track {
  display: flex;
  gap: 24px;
  padding: 0 48px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.testimonials-track::-webkit-scrollbar {
  display: none;
}
```

### Testimonial Card
```css
.testimonial-card {
  flex-shrink: 0;
  width: 400px;
  padding: 32px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: 16px;
  scroll-snap-align: start;
}
.testimonial-quote {
  font-size: 16px;
  line-height: 1.7;
  color: var(--text-primary);
  margin-bottom: 24px;
}
.testimonial-author {
  display: flex;
  align-items: center;
  gap: 16px;
}
.testimonial-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--bg-surface);
}
.testimonial-name {
  font-size: 15px;
  font-weight: 600;
}
.testimonial-role {
  font-size: 13px;
  color: var(--text-secondary);
}
```

### Auto-scroll animation (optional GSAP)
```jsx
useEffect(() => {
  const track = document.querySelector('.testimonials-track');
  const totalWidth = track.scrollWidth - track.clientWidth;

  gsap.to(track, {
    scrollLeft: totalWidth,
    duration: 30,
    ease: "none",
    repeat: -1,
  });
}, []);
```

---

## Section 9: Pricing (Comparison Table)

### Layout
```css
.pricing-section {
  padding: 120px 48px;
  max-width: 1200px;
  margin: 0 auto;
}
.pricing-header {
  text-align: center;
  margin-bottom: 64px;
}
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
```

### Pricing Card
```css
.pricing-card {
  padding: 40px 32px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: 16px;
  text-align: center;
}
.pricing-card.featured {
  border-color: var(--accent);
  position: relative;
}
.pricing-card.featured::before {
  content: 'Most Popular';
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  padding: 4px 16px;
  background: var(--accent);
  color: #000;
  font-size: 12px;
  font-weight: 600;
  border-radius: 100px;
}
.pricing-tier {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 8px;
}
.pricing-price {
  font-size: 48px;
  font-weight: 600;
  margin-bottom: 8px;
}
.pricing-price span {
  font-size: 16px;
  font-weight: 400;
  color: var(--text-secondary);
}
.pricing-description {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 32px;
}
.pricing-features {
  text-align: left;
  margin-bottom: 32px;
}
.pricing-feature {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  font-size: 14px;
  border-bottom: 1px solid var(--border-subtle);
}
.pricing-feature:last-child {
  border-bottom: none;
}
.pricing-check {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--accent-soft);
  border-radius: 50%;
  color: var(--accent);
}
```

### Animated Checkmarks (GSAP)
```jsx
// Checkmarks draw in as section enters view
useEffect(() => {
  const checks = document.querySelectorAll('.pricing-check svg path');

  checks.forEach((path, i) => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;

    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 0.4,
      ease: "power2.out",
      delay: i * 0.05,
      scrollTrigger: {
        trigger: '.pricing-section',
        start: 'top 60%',
      }
    });
  });
}, []);
```

---

## Section 10: CTA Section

### Layout
```css
.cta-section {
  padding: 120px 48px;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.cta-container {
  max-width: 700px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}
```

### Background Effect
```css
.cta-section::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 400px;
  background: radial-gradient(ellipse, var(--accent-glow) 0%, transparent 70%);
  filter: blur(60px);
  pointer-events: none;
}
```

### Contents
1. Headline: `text-display`, center-aligned
2. Subheadline: `text-body-lg`, color: var(--text-secondary)
3. CTA buttons: Primary + Secondary, centered

---

## Section 11: Footer

### Layout
```css
.footer {
  padding: 80px 48px 40px;
  border-top: 1px solid var(--border-subtle);
}
.footer-grid {
  display: grid;
  grid-template-columns: 2fr repeat(4, 1fr);
  gap: 48px;
  max-width: 1200px;
  margin: 0 auto;
}
.footer-brand {
  /* Logo + description */
}
.footer-column h4 {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 16px;
}
.footer-column a {
  display: block;
  padding: 8px 0;
  font-size: 14px;
  color: var(--text-secondary);
  transition: color 0.2s ease;
}
.footer-column a:hover {
  color: var(--text-primary);
}
.footer-bottom {
  margin-top: 64px;
  padding-top: 24px;
  border-top: 1px solid var(--border-subtle);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: var(--text-muted);
}
```
