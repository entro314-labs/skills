---
name: copywriting
description: Write persuasive, high-converting copy for any format — ads, sales pages, emails, headlines, product descriptions, CTAs, and social posts. Applies awareness-stage targeting (Eugene Schwartz), Voice-of-Customer research, proven frameworks (AIDA, PAS, PASTOR, BAB, FAB, 4Ps, TIMER, Hormozi Value Equation), psychological triggers with ethical guardrails, readability rules, and a pre-flight checklist. Use when asked to write, rewrite, improve, or review any marketing or sales copy. Triggers on "write copy", "headline", "CTA", "sales page", "ad copy", "email copy", "product description", "value prop", "persuasive writing". For full landing pages use landing-page-copy; for editing existing drafts use copy-editing; for interface text use ux-writing.
---

# Copywriting

Copywriting is strategic writing designed to move someone toward a decision — not creative writing. Research before writing, framework before words, checklist before publishing.

> Great copy is never written. It's discovered. Find the words your buyer already uses — then play them back.

## Core Principles

1. **Positioning comes first.** If the positioning is wrong, no copy will save it (see `positioning-messaging` skill).
2. **Clarity over cleverness.** If a reader has to think about what you mean, you've lost them. Plain language wins almost every A/B test.
3. **Benefits over features.** Features describe the product; benefits describe the customer's life after buying. Lead with the outcome.
4. **Specificity over vagueness.** "Cut your reporting from 4 hours to 15 minutes" beats "save time." Exact numbers = credibility; round numbers = skepticism.
5. **Customer language over company language.** Extract copy from Voice-of-Customer research; don't invent it.
6. **One CTA per piece.** Multiple asks dilute attention. Every piece of copy has one job.
7. **Honest over sensational.** Never fabricate statistics, testimonials, or urgency. Persuasion becomes manipulation the moment copy bypasses informed choice by distorting reality.

## Workflow

### Step 1 — Gather context (required before writing)

Check for existing product/brand context first (`.claude/product-marketing-context.md`, `CLAUDE.md`, brand guidelines, prior messaging). Then establish — asking the user for whatever is missing:

- **The one reader**: Who exactly is this for? One specific person, not a demographic range. What keeps them up at night? What have they tried that failed? What's their dream outcome? What objection will they raise before buying?
- **Awareness stage**: Unaware → Problem Aware → Solution Aware → Product Aware → Most Aware (see `references/frameworks.md`). Cold traffic ≈ stages 1–2, warm ≈ 3–4, hot ≈ 5.
- **The objective**: What belief, feeling, or action must change? What's the ONE action you want them to take?
- **The format**: Ad, page, email, description, script — and channel constraints.
- **Proof available**: numbers, testimonials, case studies, credentials.

**Voice-of-Customer research** — if any of these exist, mine them for exact phrases before writing: support tickets, sales call recordings, reviews (yours *and* competitors'), user interviews, Reddit/forum threads. Build a message bank:

| Theme | Verbatim quote | Source | Use in |
|---|---|---|---|
| Pain | "Spending 3 hours/day on reports" | Support ticket | Headline |
| Outcome | "Just want it done in 5 minutes" | G2 review | Subhead |
| Objection | "Too complicated to set up" | Competitor review | FAQ / objection section |

### Step 2 — Pick the framework

| Writing... | Use |
|---|---|
| Cold ad / social post | PAS |
| Landing page / general purpose | AIDA |
| Long-form sales page / VSL | PASTOR or 4Ps |
| Short, space-constrained copy | BAB |
| Product bullets / technical audience | FAB |
| Testimonial / case study | BAB |
| Offer description | TIMER lever mapping |
| Executive memo / stakeholder update | BLUF (bottom line up front) |
| Quality review of any copy | 4 C's + pre-flight checklist |

Full framework details with examples: `references/frameworks.md`

Match mechanism to the reader's state — this is what separates copy that converts from pretty prose:

- **Anxious** → emphasize safety, certainty, support
- **Frustrated** → emphasize relief and speed
- **Aspirational** → emphasize identity, status, progress
- **Skeptical** → emphasize proof, transparency, specificity; more evidence, less flourish

Every major block of copy should have a psychological job you can name (agitation, proof, identity, relief, objection removal). If a block has no job, cut it.

### Step 3 — Write the headline first

Spend 50% of your effort here — 80% of readers read only the headline. A headline's only job is to earn the next line.

Every strong headline has ≥2 of the **4 U's**: Useful, Urgent, Unique, Ultra-specific.

Top formulas (more in `references/frameworks.md`):

| Formula | Example |
|---|---|
| How to [outcome] without [pain/objection] | "How to deploy faster without complex configs" |
| Get [result] in [timeframe] | "Get 100 leads in 30 days" |
| The [category] for [audience] | "The analytics platform for indie founders" |
| Question implying the problem | "Still wasting 10 hours/week on manual invoicing?" |
| From [bad] to [good] in [time] | "From spreadsheet chaos to automated reports in 15 minutes" |
| Number list | "7 landing page mistakes killing your conversions" |
| Stop [pain]. Start [pleasure]. | "Stop chasing approvals. Start shipping." |
| Warning | "Don't launch your page until you fix these 5 copy errors" |
| Social proof hook | "How a 3-person agency closed $2M with cold email" |
| Challenge | "What if you could double response rates without writing more emails?" |

**Headline checklist:** Specific benefit? Audience implied? Curiosity or urgency? Under ~12 words? Could it stand alone? Write 3–5 variants — headline changes have the biggest A/B impact.

### Step 4 — Write the body

Apply the framework structure, then layer triggers where they do real work:

| Trigger | How | Rule |
|---|---|---|
| Social proof | Exact numbers: "487 five-star reviews", named testimonials with results | Specific and attributed, or don't use it |
| Scarcity / urgency | "3 spots left in April", "offer ends Friday" | Only when REAL — fake urgency destroys trust permanently |
| Loss aversion | "Stop losing $X/month" — frame inaction as a cost | Ground the number in evidence |
| Risk reversal | Guarantee, free trial, "no credit card required" | Place near the CTA |
| Authority | Credentials, years, certifications | Relevant ones only |
| Reciprocity | Give real value first (free tool, template, audit) | The gift must be genuinely useful |

**Place proof at the resistance point** — where skepticism rises, not just at the end. After every bold claim, the next line should answer "prove it."

**Handle objections before they become exit reasons:**

| Objection | Copy response |
|---|---|
| "Too expensive" | ROI: "Pays for itself in 2 weeks based on time saved" |
| "Won't work for me" | Similar-customer case study |
| "No time to implement" | "Setup takes 10 minutes. We guide you through it." |
| "What if it doesn't work?" | Guarantee / risk reversal |
| "Not ready now" | Real cost of waiting + low-friction first step |

Placement: FAQ section, testimonials that answer the objection, and immediately before the CTA.

### Step 5 — Language rules (non-negotiable)

- **Grade 5–7 reading level** (Flesch-Kincaid). ≤14 words per sentence average — comprehension drops sharply above.
- **Small words win**: "use" not "utilize", "buy" not "purchase", "help" not "facilitate".
- **Active voice**: "We generate reports" not "reports are generated". ("By zombies" test: if you can append it, it's passive.)
- **More "you" than "we"**: enter the reader's world before talking about yourself. Never open with "We are…"
- **Their exact language** from VoC — not industry jargon, not your internal terms.
- **Vary sentence rhythm.** Short sentences hit hard. Longer ones let an idea breathe. Read it aloud — if it sounds like a brochure, rewrite.
- **No AI-isms or corporate speak**: no "leverage", "seamless", "delve", "game-changer", "unlock the power of", "Here's the thing", "It's worth noting". Full blocklist: `references/language-and-readability.md`.

### Step 6 — Write the CTA

One ask. Always one.

Formula: `[Action verb] + [specific outcome] + [friction reducer]`

- "Start My Free Trial — no credit card required"
- "Get the Complete Checklist"
- "Book Your Free Audit — takes 2 minutes"

Rules:
- Never "Submit", "Click here", "Learn more".
- First person ("Start **My** Trial") tends to win for warm audiences; can feel presumptuous for cold traffic.
- Match commitment to temperature — cold: "See How It Works"; warm: "Start Free Trial"; hot: "Get Instant Access".
- Micro-copy underneath kills the last objection: "Cancel anytime."

### Step 7 — Pre-flight checklist

Run `references/preflight-checklist.md` before anything goes live. Core gates:

- **Strategy**: one avatar, awareness stage matched, enters their existing conversation, one goal.
- **Structure**: framework applied, headline has 2+ U's, no buried lede.
- **Language**: grade ≤7, ≤14 words/sentence, sounds human aloud, more you than we.
- **Persuasion**: every claim specific and backed, urgency real, benefits not features.
- **CTA**: one ask, verb-led, names the outcome.
- **The competitor test**: if a competitor could swap their logo onto this copy, it's not differentiated enough.

## Format-Specific Notes

**Email subject lines** (determine ~47% of opens): under 50 characters, match the tone of what's inside, test preview text as a second headline. Formulas: curiosity gap ("I almost didn't send this…"), number ("3 headlines worth stealing"), benefit + timeframe, genuine last-chance.

**Product descriptions**: lead line = single most compelling benefit → sensory/outcome detail → benefits-first bullet list (`[Feature] that [advantage], so you [benefit]`) → one inline proof point → specific CTA. For a full spec-by-spec product breakdown, document specs precisely (dimensions, materials, warranty) and pair every feature with its function and value.

**A/B testing**: one variable at a time, hypothesis first ("If we change X, then Y, because Z — measured by M, success = threshold"), prioritize by ICE score (Impact × Confidence ÷ Effort), run to significance (~100+ conversions per variant), document learnings in a swipe file, iterate on winners.

## Output Format

Deliver ready-to-use copy organized by its structure (not artificial labeled sections like "FINAL COPY:"). For headlines and CTAs, give 2–3 options with one-line rationale each. Briefly note framework choice and key decisions as conversational context — then the copy itself.

## References

- `references/frameworks.md` — 5 Stages of Awareness, AIDA, PAS, PASTOR, BAB, FAB, 4Ps, TIMER, Hormozi Value Equation, 4 C's, framework selector
- `references/language-and-readability.md` — readability targets, small-word swaps, filler elimination, AI-ism blocklist, empathy patterns
- `references/preflight-checklist.md` — full scored go/no-go checklist

## Related Skills

- **copy-editing** — systematic multi-pass improvement of existing copy (use after drafting)
- **landing-page-copy** — full page structure, section-by-section
- **positioning-messaging** — when the problem is strategy (what to say), not wording
- **brand-voice** — defining/preserving how the brand sounds
- **ux-writing** — interface microcopy, where clarity beats persuasion
