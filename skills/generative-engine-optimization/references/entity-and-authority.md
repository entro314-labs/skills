# Entity presence and authority

Engines tie passages to entities (organizations, people, products, concepts). Ambiguous or inconsistent entities lose citations to clearer ones.

## Canonical naming

- Choose one canonical form of the brand/product/person name and one short descriptor ("Acme is a [category] for [audience]").
- Use it identically in: page titles, H1s, body copy, schema `name`, URLs/domain, social profiles, app-store and directory listings, press boilerplate, author bios.
- Keep a disambiguation sentence on the About page if the name is shared with other entities.

## Schema (JSON-LD) that supports entity understanding

| Type | Use for | Key properties |
|---|---|---|
| Organization | Company/brand | `name`, `url`, `logo`, `description`, `sameAs` |
| Person | Authors, founders, experts | `name`, `jobTitle`, `worksFor`, `sameAs`, `knowsAbout` |
| Product / SoftwareApplication | Offerings | `name`, `description`, `applicationCategory`, `offers`, `aggregateRating` only if real and visible |
| Article | Editorial pages | `headline`, `author` (Person), `datePublished`, `dateModified`, `publisher` |
| HowTo | Step content visible on page | `step` entries matching visible steps |
| FAQPage | Visible Q&A | `mainEntity` Q/A matching visible text exactly; do not expect rich results |

Rules: markup must mirror visible content; `sameAs` links only to profiles you control or authoritative records (official social profiles, Wikipedia/Wikidata entries when they exist, registries); keep `dateModified` honest; validate with a structured-data validator and keep one `@id` per entity so references resolve.

## External presence

Engines weigh what other sources say about an entity. Build consistent, accurate facts in places they draw from:
- Reputable publications and industry directories (accurate descriptions, founding date, location, category).
- Wikidata/Wikipedia only where notability criteria are genuinely met; never self-edit in violation of their rules.
- Author profiles on professional networks and publications, linked bidirectionally from the site.
- Reviews and comparison pages from third parties; correct factual errors where possible.
- Community discussions (forums, Q&A sites) where the entity is discussed naturally; no astroturfing.

## Content clusters

- Pick the entity or topic, define 5-10 supporting pages for its main sub-questions, link pillar <-> supporting pages with descriptive anchor text.
- Keep terminology consistent across the cluster; each page answers a distinct question.
- Refresh the cluster together so facts do not contradict each other.

## Authority checklist

- [ ] Named authors with verifiable credentials and bio pages
- [ ] Primary-source citations, not citations to other summaries
- [ ] Original data, with method and limitations
- [ ] Organization contact, address and ownership transparency
- [ ] Consistent facts across site, schema and third-party listings
- [ ] Update dates and corrections policy
- [ ] No contradictory claims between pages of the same site
