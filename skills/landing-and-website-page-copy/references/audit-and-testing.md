# Page audit output and experiment ideas

Scoring rubrics, audit modes, funnel diagnostics, message match and A/B design (sample-size math, run rules, integrity checks) are in `copywriting-conversion-optimization-and-page-audits`. Use it for any audit or test plan. This file holds the output order used with this skill's page-type templates and an experiment idea list.

## Audit output order

1. 5-second test: pass or fail, with what a visitor understands.
2. Quick summary: overall assessment, ship or not, tracking status.
3. Priority issues: element, problem, specific fix (2-4), highest conversion impact first (value proposition, headline, CTA, visual hierarchy, proof, objections, friction).
4. High-impact improvements: current, change, expected impact (High/Medium/Low).
5. Quick wins ranked by impact over effort.
6. Experiments table: test, hypothesis, expected impact.
7. Rewritten headline, subheadline and CTA, each with a reason (BEFORE / AFTER / WHY).
8. What is working (do not change).
9. For later (post-launch ideas).

Report scores as judgments, not measurements.

## Experiment ideas

| Page | Tests |
|---|---|
| Homepage | Hero headline (outcome vs category); social proof placement (above vs below hero); CTA copy (action vs benefit); nav visibility (full vs minimal) |
| Landing page | Long vs short copy; video vs text hero; single vs multiple CTA; testimonial format (text, video, case study); price anchoring |
| Pricing | 2 vs 3 vs 4 tiers; comparison table; annual vs monthly default; "most popular" badge; FAQ |
| Signup | Single vs multi-step; social login; field reduction; progress indicator; benefit reminders during form |

Priority: headline, CTA text, proof type and placement, hero image (or none), form fields, pricing display, page length. Without enough traffic to reach the required sample size, write 2-3 variants and test them qualitatively with the target audience instead. Record per variant: hypothesis, changed sections, primary metric, decision, parent version.

## Lean tracking (minimum)

| Event | Properties |
|---|---|
| cta_clicked | button_text, button_location |
| form_submitted | form_type |
| page_viewed | referrer_source |

Nice to have: scroll depth at 25/50/75/100; video_played; form_start and time to complete. Defer heatmaps, session recordings and complex funnel tracking until there is real traffic and revenue. Goal: know visitor-to-conversion rate and which CTA location performs. Treat any quoted lift percentages from case studies or checklists as unverified; only your own test results count.
