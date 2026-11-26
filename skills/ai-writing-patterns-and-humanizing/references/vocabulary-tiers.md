# Vocabulary tiers and replacement tables

Tiers exist to reduce false positives: a word that is fine alone becomes a signal only in clusters or at density. Replacements are defaults. Prefer a specific replacement (number, name, mechanism) over a synonym, and keep a flagged word when it is clearly the right one.

## Tier 1: always replace

| Flagged | Replace with |
|---|---|
| delve / delve into | explore, dig into, look at |
| landscape (metaphor) | field, space, industry, world |
| tapestry | describe the actual complexity |
| realm | area, field, domain |
| paradigm | model, approach, framework (reserve for literal paradigm shifts) |
| embark, commence | start, begin |
| testament to | shows, proves, demonstrates |
| robust | strong, reliable, or give the number ("handles 10,000 requests/sec") |
| comprehensive | thorough, complete, full |
| cutting-edge | latest, newest, advanced |
| leverage (verb) | use |
| pivotal | important, key, critical |
| underscores (verb) | highlights, shows |
| meticulous(ly) | careful, detailed, precise |
| seamless(ly) | smooth, easy, without friction |
| utilize | use |
| nestled | is located, sits |
| vibrant, thriving, bustling | describe what makes it so, or cut |
| showcasing | showing, demonstrating |
| deep dive / dive into | look at, examine |
| unpack | explain, break down |
| intricate(ies) | complex, detailed, or name the complexity |
| ever-evolving | changing, growing |
| enduring | lasting (or give the duration) |
| daunting | hard, difficult |
| holistic(ally) | complete, full |
| actionable | practical, concrete |
| impactful | effective (or describe the impact) |
| learnings | lessons, findings |
| thought leader(ship) | expert (or state the contribution) |
| best practices | what works, proven methods |
| synergy / synergistic | describe the actual combined effect; say what combines with what |
| interplay | relationship, interaction |
| in order to | to |
| due to the fact that | because |
| serves as | is |
| features (verb), boasts | has, includes ("The camera has a 50-megapixel sensor") |
| presents (inflated) | is, shows, gives |
| ascertain | find out, determine |
| endeavor | effort, attempt, try |
| prioritize | say what to do first |
| ensure | check that, verify |
| game-changer, "at its core", "only time will tell", "the future looks bright" | cut; describe what changed |

Hype adjectives (groundbreaking, revolutionary, unprecedented, transformative, state-of-the-art, innovative): delete the label and describe the specific change. "cutting-edge technology" becomes "a technique that reduces processing time by half".

## Tier 2: flag only when two or more share a paragraph

harness, navigate, foster, elevate, unleash, streamline, empower, bolster, spearhead, facilitate, underpin, encompass, catalyze, reimagine, galvanize, augment, cultivate, illuminate, elucidate, juxtapose, cornerstone, paramount, overarching, underpinnings, quintessential, nascent, burgeoning, poised (to).

| Flagged | Replace with |
|---|---|
| resonate | connect with, appeal to, matter to (keep "resonate" for acoustics) |
| nuanced | specific, subtle, or name the nuance |
| crucial, vital, imperative (generic intensifiers) | cut and show the consequence ("If you skip the backup, you lose everything") |
| multifaceted | name the facets, or cut |
| myriad, plethora | many, or give a number |
| ecosystem (metaphor) | system, community, market |
| revolutionize, transformative | describe what changed and how |
| paradigm-shifting | describe what shifted |

## Tier 3: flag only at high density (about 3% of total words or more)

significant(ly), innovative/innovation, effective(ly), dynamic(s), scalable/scalability, compelling, unprecedented, exceptional(ly), remarkable(ly), sophisticated, instrumental, world-class, state-of-the-art, best-in-class.

Fix: a number, a comparison, a named precedent, or name what is new, what scales, why it compels. Do not swap one adjective for another.

## Filler and structural phrases

| Flagged | Fix |
|---|---|
| It is important to note that the data shows | The data shows |
| It's worth mentioning / It should be noted / Needless to say / It goes without saying / Without further ado | delete |
| The reality is that | cut |
| In terms of | rewrite |
| At this point in time | now |
| In the event that | if |
| has the ability to | can |
| When it comes to | cut or name the subject |
| in the realm of / in the world of | in, or restructure |
| Moving forward (as transition) | cut |
| Moreover, Furthermore, Additionally, In addition | and, also, but, so, because, which means, even so (keep "furthermore" for formal argument extension) |
| In summary, Overall, In conclusion | cut; end on a specific point |
| That being said, On the other hand | but, yet, however; do not overuse one |

## Confidence-calibration adverbs

Interestingly, Importantly, Notably, Surprisingly, Significantly, Certainly, Undoubtedly, Without a doubt: let the fact speak. Flag by density.

## Technical writing exceptions

When the profile is technical-blog, these keep their technical meaning and are not flagged: robust, comprehensive, seamless, ecosystem, leverage (only when the sentence is about an actual platform or API leverage), facilitate, underpin, streamline. Still flag: delve, tapestry, beacon, embark, testament to, game-changer, harness.

## Weak signals

"whilst" is dialect, "swift" and "commendable" are only weakly associated with machine text, curly quotes are typography. Flag these only if the user asks.
