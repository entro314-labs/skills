# Build and launch checklist

Implementation detail (semantic structure, accessibility, performance, motion, SEO metadata, mobile layout) is in `copywriting-landing-page-implementation`. Form, CTA and trust rules are in `copywriting-conversion-optimization-and-page-audits` (`references/page-element-rules.md`). This file keeps what a copy deliverable needs.

## Forms (copy view)

| Goal | Fields |
|---|---|
| Email capture | Email only |
| Free trial | Email plus password, or email only with magic link |
| Demo booking | Name, email, company |
| Purchase | Email plus payment processor |
| Lead capture | 5 fields or fewer |

Every extra field costs conversion; ask only what the next step needs. Button text equals the action ("Create account"); privacy line near the button; reassurance text ("We'll only email you once"); specific errors ("Email is required", not "Error in field 3").

## Compliance

- Email or data collection: privacy policy link in footer pointing to a real URL.
- Payment: terms of service and refund or cancellation policy.
- EU audience: cookie consent mechanism before deployment.
- Affiliate: relationship disclosed before the first affiliate link, clear and visible.
- No false claims; no fabricated testimonials, reviews or counts; example content marked as such.
- Page title 50-60 characters, meta description 150-160, social-share title, description and image set.

## Pre-delivery checklist

- [ ] One goal, one primary CTA, same text repeated; at most one secondary text link
- [ ] Headline passes the 5-second test and matches the traffic source
- [ ] Section count and order match the page-type template
- [ ] Proof is real, specific and placed next to claims and CTAs
- [ ] Top objections handled in hero, benefits, CTA area and FAQ
- [ ] Risk reversal visible near the final CTA; urgency is real or absent
- [ ] No banned vocabulary; claims specific; reads aloud naturally
- [ ] Forms minimal; mobile layout checked at 375px
- [ ] Accessibility baseline met (see the implementation skill)
- [ ] Footer links and compliance items present
- [ ] Tracking events defined (cta_clicked, form_submitted, page_viewed)
- [ ] Deliverables: copy by section, page code if requested, this checklist
