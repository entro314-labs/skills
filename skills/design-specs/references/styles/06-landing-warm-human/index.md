# Warm Human Landing Page - Exhaustive Technical Specification

Generate a complete, production-ready landing page using Next.js, TypeScript, Tailwind CSS, and Motion. This specification defines every visual element, animation parameter, and interactive behavior. Do not deviate from these values.

**Target Products:** Wellness apps (Headspace, Calm), home services (Thumbtack, Houzz), education platforms (Coursera, Skillshare), personal finance, childcare, senior care, mental health, coaching/consulting.

**Design Philosophy:** The page must feel like a warm invitation from a trusted friend, not a sales pitch. Every element should communicate care, thoughtfulness, and humanity. Calm, confident, approachable. Sophisticated but accessible.

---

## Output Requirements

- Single React component (or page with imported components)
- Next.js with App Router
- TypeScript strict mode
- Tailwind CSS for all styling
- Motion for animations
- Lenis for smooth scrolling
- Fully responsive (mobile-first)
- Complete page with all sections implemented

---

## Page Structure Overview

The page consists of these sections in order:
1. Navigation Header (sticky)
2. Hero Section
3. Trusted By / Logo Wall
4. Features Section (alternating image/text)
5. How It Works (3-step process)
6. Benefits Bento Grid
7. Testimonials Carousel
8. Pricing Section
9. FAQ Accordion
10. CTA Section
11. Footer

---

## Parts

Read [brief.md](brief.md) for the short version of this style. The full specification is split into the files below; read the ones the task needs, in this order.

| File | Contains | Lines |
|---|---|---|
| [tokens.md](tokens.md) | Color System; Typography System; Layout System; Background Textures; Responsive Breakpoints | 489 |
| [motion.md](motion.md) | Animation System; Smooth Scroll Implementation; Custom Cursor (Optional); Animation Timing Reference | 324 |
| [components.md](components.md) | Form Components | 125 |
| [sections-1.md](sections-1.md) | Component Specifications: Navigation Header, Mobile Menu, Hero Section, Hero Animation Sequence, Floating Circles Component, Button Components, Logo Wall / Trusted By Section, Features Section (Alternating Layout), How It Works Section, Benefits Bento Grid | 710 |
| [sections-2.md](sections-2.md) | Component Specifications: Testimonials Carousel, Pricing Section, FAQ Accordion, CTA Section, Footer | 412 |
| [page.md](page.md) | Sample Data Structure | 71 |

---

## What to Avoid

1. **Velocity-based blur effects** - Keep everything calm and clear
2. **Aggressive scroll choreography** - No snapping, jarring transitions
3. **Complex canvas particle systems** - Too technical, not warm
4. **Multiple competing animations** - One thing at a time
5. **Dashboard mockups** - This is human-centered, not tech-focused
6. **Technical jargon** - Speak human
7. **Sharp, geometric shapes** - Use organic, rounded forms
8. **High contrast aggressive colors** - Stick to warm pastels
9. **Fast, bouncy springs** - Use soft, smooth motion
10. **Dense, cramped layouts** - Generous breathing room always

---

## Focus On

1. **Smooth, natural motion** - Like a gentle breath
2. **Generous spacing** - Let elements breathe
3. **Warm, inviting colors** - Pastels and earth tones
4. **Editorial photography** - Real people, real moments
5. **Subtle, meaningful animations** - Every motion has purpose
6. **Readability and comfort** - Easy on the eyes
7. **Organic shapes** - Rounded corners, soft edges
8. **Clear hierarchy** - Guide the eye naturally
9. **Trust indicators** - Social proof, testimonials
10. **Single, clear CTAs** - Don't overwhelm with choices

---

## Required npm Packages

```bash
npm install motion lenis
npm install @radix-ui/react-accordion  # For FAQ
npm install clsx tailwind-merge        # For conditional classes
```

Install the current releases. The versions this spec was checked against are in the stack table in [SKILL.md](../../../SKILL.md).

---

## Final Notes

This specification prioritizes **warmth, clarity, and trust** over technical impressiveness. Every design decision should answer: "Does this make the user feel welcomed and at ease?"

The goal is a page that feels like a conversation with a caring friend, not a sales pitch. Generous space, soft motion, warm colors, and clear messaging create an experience that invites rather than demands.

Generate the complete page following these specifications exactly. Do not improvise or add elements not specified here.
