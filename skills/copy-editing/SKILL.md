---
name: copy-editing
description: Systematically edit, review, and improve existing marketing copy through seven focused passes (clarity, voice, so-what, proof, specificity, emotion, risk removal) plus quick word/sentence-level checks and a readability scorer. Use when the user says "edit this copy", "review my copy", "copy feedback", "proofread", "polish this", "make this better", or submits existing copy for improvement. For writing new copy from scratch, use the copywriting skill.
---

# Copy Editing

Systematically improve existing copy through focused editing passes while preserving the core message. Good copy editing isn't rewriting — it's enhancing. Multiple focused passes beat one unfocused review.

**Before starting:** know the goal of the copy, the target audience, and the desired action. If not stated, ask — editing without this context guarantees misaligned feedback. Also check for brand/product context files (`.claude/product-marketing-context.md`, brand voice guidelines) and use them to anchor voice edits.

**Key principles:**
- Don't change the core message; enhance it
- Each edit has a stated reason
- Preserve the author's voice while improving clarity
- After each sweep, verify earlier sweeps weren't compromised

## The Seven Sweeps

Run sequentially. For quick reviews, use the Quick-Pass Checks below instead.

### Sweep 1: Clarity
Can the reader understand it immediately? Flag confusing sentence structures, unclear pronoun references, jargon, ambiguity, missing context, and buried points. Confirm the "Rule of One" (one main idea per section) and the "You Rule" (copy speaks to the reader).

### Sweep 2: Voice and Tone
Is it consistent in how it sounds? Flag shifts between formal and casual, inconsistent personality, jarring mood changes, and word choices that don't match the brand. Read aloud to hear inconsistencies.

### Sweep 3: So What
Does every claim answer "why should I care?" For each statement ask "so what?" — if the copy doesn't answer with a deeper benefit, add the "which means…" bridge.

❌ "Our platform uses AI-powered analytics"
✅ "Our AI analytics surface insights you'd miss manually — so you make better decisions in half the time"

**Early-warning trigger:** if features outnumber benefits 2:1, raise this before anything else — it's the most common conversion killer.

### Sweep 4: Prove It
Is every claim supported? Flag unsubstantiated claims, "best/leading" without evidence, "trusted by thousands" (which thousands?), results without specifics. Recommend adding proof (named testimonials, data, third-party validation, guarantees) or softening the claim.

### Sweep 5: Specificity
Is it concrete enough to be compelling?

| Vague | Specific |
|-------|----------|
| Save time | Save 4 hours every week |
| Many customers | 2,847 teams |
| Fast results | Results in 14 days |
| Great support | Response within 2 hours |

Content that can't be made specific is probably filler — cut it.

### Sweep 6: Heightened Emotion
Does it make the reader feel something? Paint the "before" state vividly, use sensory language, micro-stories, and reflective questions. Emotion must serve the message — never manipulation.

### Sweep 7: Zero Risk
Have we removed every barrier to action? Check sections near CTAs: unanswered objections, missing trust signals, unclear next steps. Add risk reversals (guarantee, free trial, "no credit card required", "cancel anytime") and social proof near the CTA. A vague or buried CTA is the highest-impact fix — call it out first.

After Sweep 7, loop back through all sweeps once; finish when a full pass finds nothing new.

## Quick-Pass Checks

**Cut:** very, really, extremely, just, actually, basically, "in order to" (→ to), things/stuff.

**Replace:** utilize→use, implement→set up, leverage→use, facilitate→help, innovative→new, robust→strong, seamless→smooth. (Full table: `references/plain-english-alternatives.md`)

**Sentence level:** one idea per sentence, ≤25 words, front-load the point, vary lengths, active voice, kill nominalizations ("make a decision"→"decide"), remove exclamation points.

**Paragraph level:** one topic each, 2–4 sentences for web, strong openers, white space for scannability.

**Readability scoring:** run `scripts/readability_scorer.py` on the copy for Flesch-Kincaid grade and sentence-length stats. Target: grade 5–7 for marketing copy.

## Common Problems → Fixes

| Problem | Fix |
|---------|-----|
| Wall of features | Add "which means…" after each feature |
| Corporate speak | Ask "how would a human say this?" and use those words |
| Weak opening (company history, vague claims) | Lead with the reader's problem or desired outcome |
| Buried or vague CTA | Make it obvious, early, and repeated |
| Generic claims ("we help businesses grow") | Specify who, how, and by how much |
| Mixed audiences | Pick one audience and write directly to them |
| Feature overload | Focus on the 3–5 benefits that matter most |

## Working Process & Output

1. Run a sweep and present findings — what's wrong, why it hurts conversion, how to fix it
2. Propose specific edits, never just identify problems
3. Let the author make final decisions on voice-level judgment calls
4. Re-verify previous sweeps after each round of edits

**Format:** bottom line first (overall copy health), then findings sweep-by-sweep prioritized by conversion impact. Tag confidence: 🟢 clear improvement / 🟡 judgment call / 🔴 needs author input. When asked for a final polish, deliver the clean edited copy plus a summary of changes.

## Resources

- `references/plain-english-alternatives.md` — complex → simple word replacements
- `scripts/readability_scorer.py` — Flesch-Kincaid and sentence-length scoring

## Related Skills

- **copywriting** — when the copy needs rewriting from scratch, not editing
- **brand-voice** — when the problem is that copy sounds generic/AI-generated or off-brand
- **landing-page-copy** — when page structure/strategy needs work, not just words
