# Crawler access, rendering and llms.txt

## 1. Check access before anything else

A page that cannot be fetched or indexed cannot be cited. Audit in this order:

1. `robots.txt` at the host root: look for `User-agent: *` + `Disallow: /`, legacy "block all bots" blocks, and per-bot rules.
2. HTTP layer: WAF, rate limiting or bot-challenge pages returning 403/429/CAPTCHA to non-browser clients; geo-blocks; login or consent walls hiding body text.
3. Rendering: fetch the URL with a plain HTTP client (no JavaScript). If the main content is missing from the raw HTML, many AI crawlers will not see it. Server-render or pre-render the primary content.
4. Indexation: canonical tags, `noindex` (meta or `X-Robots-Tag`), sitemap inclusion, redirects/chains, soft-404s.
5. Page weight/structure: main content near the top of the DOM, not buried after huge inline scripts; avoid content inside iframes or only in images/PDF scans.

## 2. Crawler user agents: decide per purpose

Operators typically run separate agents for training, search indexing and user-initiated fetches. Blocking one does not block the others. Names change; confirm against each operator's current documentation before editing rules.

| Purpose | Examples (verify current) | Effect of blocking |
|---|---|---|
| Model training | GPTBot, ClaudeBot, CCBot (Common Crawl), Google-Extended, Applebot-Extended | Opts content out of training; Google-Extended and Applebot-Extended are control tokens, not separate crawlers |
| Search / retrieval index | OAI-SearchBot, PerplexityBot, Claude-SearchBot, Googlebot, Bingbot | Removes site from that engine's AI search results |
| User-initiated fetch | ChatGPT-User, Claude-User, Perplexity-User | Assistant cannot open the page when a user asks about it |

Notes:
- Google AI Overviews eligibility follows normal Google Search indexing (Googlebot) and snippet controls (`nosnippet`, `max-snippet`, `data-nosnippet`); `Google-Extended` does not control it.
- Copilot-style answers draw on the Bing index; Bingbot access matters.
- Robots rules are advisory; verify in server logs that the agents actually fetch pages and get 200s.

Example allowing search/user fetchers while opting out of training:

```
User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: *
Allow: /
```

This is a policy choice, not a recommendation: if the goal is maximum visibility and training use is acceptable, allow all.

## 3. llms.txt

What it is: a proposed Markdown file at `/llms.txt` that gives LLM-based tools a curated map of the site. It is a navigation aid, not a permission mechanism and not an access-control file.

Limits:
- It does not unblock anything. If listed pages are blocked, erroring or unindexed, it does nothing.
- No evidence available here shows that major engines use it for citation selection. Treat benefit as speculative; low cost, low expected effect.
- It never substitutes for entity quality, content quality or indexation.

Layout:

```markdown
# Site or Brand Name

> One-sentence summary of what the site is and who it is for.

Optional short paragraph of context (scope, audience, update cadence).

## Docs
- [Getting started](https://example.com/docs/start): install and first run
- [API reference](https://example.com/docs/api): endpoints, auth, errors

## Guides
- [Topic guide](https://example.com/guides/topic): what it covers in one line

## Optional
- [Changelog](https://example.com/changelog): release history
```

Rules: H1 is the name; blockquote is the summary; H2 sections hold `- [Title](url): description` lists; serve as `text/plain` or `text/markdown` at the root; link only canonical, indexable, 200-status URLs; keep descriptions factual; an `## Optional` section marks lower-priority links. A longer `/llms-full.txt` with page content inlined is sometimes offered; same caveats apply.

Maintenance: regenerate when sections are added or removed; check for dead links.
