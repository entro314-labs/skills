# Extracting and Building a Voice Profile

Two input modes (company content, individual samples) plus a build mode when no samples exist. Thresholds below are starting heuristics, not validated rules.

## Mode A: Company or brand content

Sample 10-20 pages:

| Page type | Count | Note |
|---|---|---|
| Blog posts | 8-10 | Strongest voice signal |
| Landing pages | 2-3 | Formulaic, weaker signal |
| Case studies | 2-3 | |
| Comparison pages | 1-2 | |

Mix recent and older pages to detect drift. Strip navigation, footer and sidebar. Record title, URL, raw text and word count per page.

Analyze six areas:

| Area | Look for |
|---|---|
| Tone | Formality, emotional register, authority stance, humor, directness |
| Vocabulary | Reading level, jargon, power words, avoided words, repeated unique terms |
| Sentence structure | Sentence length, paragraph length, opening patterns, transitions, fragments |
| Formatting | Header style, list use, emphasis, CTA placement and wording |
| Content structure | Length band (under 800, 800-1500, over 1500 words), data/example frequency, narrative vs information-driven |
| Persona | Inferred reader role, assumed knowledge, point of view (I/we/you) |

## Mode B: Individual samples

- Input: 3-5 pieces the author is proud of. If the total is under about 500 words, ask for more before analyzing.
- Corporate-voice check: heavy passive voice (roughly over 30%), no personal opinions, and heavy hedging suggest edited committee copy. Ask for an unfiltered sample (email, chat message, quick post).
- Rhythm check: if over about 40% of sentences fall in one length band, flag the rhythm as monotone and ask whether that is intended.
- Transition fingerprints: find bridge phrases that recur 3+ times and record them verbatim, not paraphrased.
- Conflict rule: weight the 3 most recent samples 2x. State where voice is inconsistent ("recent samples lean X, older lean Y") and ask which direction to keep.
- Reasoning order: analyze samples, extract signals per dimension, synthesize conflicts, validate against the quality bar, output.

## Mode C: Build from interview (no samples)

Ask 10-15 questions in four groups:

| Group | Questions |
|---|---|
| Identity | 3-5 personality words; core belief; background; differentiator |
| Audience | Specific audience; what builds their trust; what turns them off |
| Positioning | Expert, peer, rebel or guide; accessible vs exclusive; approachable vs authoritative |
| Aspiration | Admired voices; what not to sound like; signature words; words to avoid; appetite for humor, profanity, hot takes |

## Output profile

1. Voice summary (2-3 sentences).
2. 3 core traits with practical meaning.
3. 5-row tone spectrum (see voice-guide-template.md).
4. Vocabulary: USE / AVOID / jargon level.
5. Rhythm: sentences, paragraphs, openings, formatting.
6. 3 on-brand and 3 off-brand phrases with reasons.
7. 3-5 DO and DON'T rules.

Depth levels: quick (top 5 traits plus 3 do/don't rules), standard (full profile; default), deep (full profile plus 10 before/after rewrites plus a reusable writing-prompt template).

## Quality bar (all five must pass)

- Recognizable without a byline.
- Actionable for a human or AI writer.
- Differentiated from competitors.
- Authentic.
- Consistent across social, email and long-form.

## Maintenance

Save a dated profile per brand or person; on re-runs compare new samples against the prior profile and flag drift.
