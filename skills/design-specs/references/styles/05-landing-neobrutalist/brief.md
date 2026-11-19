# Neobrutalist Landing Page: Brief

The short version of this style. The exhaustive specification starts at [index.md](index.md).

Apply the neobrutalist dashboard aesthetic to a marketing page. Read the [neobrutalist dashboard brief](../01-dashboard-neobrutalist/brief.md) first: this brief builds on its visual system and only adds the landing page elements. Same principles: thick borders, solid shadows, zero border-radius, intentional "ugliness."

### Additional Landing Page Elements

**Hero:**
- Massive headline (80-120px) in tight tracking
- Hard offset shadow on headline text
- Product screenshot with thick black border, angled 5-10 degrees
- CTA button with solid shadow, caps text

**Marquee:**
- Infinite scroll text (GSAP, `repeat: -1, ease: "none"`)
- Thick border top and bottom
- ALL CAPS, spaced letters
- Consider dual rows moving opposite directions

**Feature Sections:**
- Asymmetric grid: `grid-template-columns: 1fr 2fr` or `2fr 1fr`
- Feature cards with colored solid shadows (not all black)
- Numbers displayed huge as design elements

**Social Proof:**
- Logo wall with thick borders around each logo
- Testimonial cards with offset shadow, bold quote marks
- Stats displayed in huge monospace numbers

### What to Avoid
- Rounded testimonial cards
- Gradient backgrounds
- Smooth scroll (use native or intentionally "sticky" scroll)
- Generic icon sets
