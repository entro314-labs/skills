---
name: ux-joy-audit
description: >-
  Audits web pages, flows, and UI components for human copy, end-to-end
  comprehension, zero-friction onboarding, liminal spaces, micro-interactions,
  dry-wit voice/celebrations, and non-forced Iris UI component upgrades — then
  injects the approved improvements. Use when the user asks to humanize copy,
  make a product easier to understand, improve UI/UX joy or craft, add
  celebrations/micro-interactions, review onboarding, or audit pages for Iris UI
  component fit.
---

# UX Clarity, Craft & Joy Audit

AI-built interfaces usually land in one of two traps: **sterile, robotic neutrality** (reads like a spec, zero physical feedback, dead transitions) or **loud gamification** (fake scores, guilt streaks, cheesy confetti). This skill audits pages to land in the sweet spot: **instantly understandable, warmly human, tactile, and quietly joyful** — without adding bloat or forcing components where they do not belong.

## Workflow

### 1. Inventory the Surface

Before proposing changes, read the actual code for the target route(s) and components:

1. **Trace the user journey end-to-end:** entry point (landing/empty state) → core loop → edge states (loading, waiting on AI, saving, undo, error, empty, completed).
2. **List all user-facing strings** on the surface: headings, descriptions, button labels, dialog titles/CTAs, badges, empty states, toasts, and inline help.
3. **Check available UI primitives first:** inspect the project's component library (e.g., `src/components/iris/` or equivalent) to see what is *already installed and unused* before recommending anything new.
4. **Check existing voice & brand tokens:** look for any existing message pools, CSS brand accents/motifs, reduced-motion utilities, and product invariants (e.g., anti-guilt rules, no streaks, no fake scores).

### 2. Run the Five-Lens Audit

Evaluate every target page through these five lenses. Only flag findings that genuinely help a real human.

#### Lens 1 — End-to-End Comprehension & Vocabulary
- **5-second test:** Can a stranger tell *what this is*, *why this screen exists*, and *what happens next* without visiting `/help`?
- **Complete loop:** Does the landing/overview show both *setup* AND *daily use*, ideally with a concrete visual preview instead of pure text?
- **Jargon budget:** Flag custom product terms (`Pulse`, `Slot`, `Ship line`, `Handoff`, `Compost`, etc.) that appear without an inline hint (`Popover`/`Tooltip`), or where the UI uses 2–3 different names for the same concept.
- **Outcome honesty:** When a dialog or action serves multiple outcomes (e.g., *"Mark shipped"* vs. *"Step back"*), make the title and CTA reflect the chosen outcome.

#### Lens 2 — Human Copy & Voice Calibration
- Replace stiff, passive, spec-like phrasing with direct, natural speech (*"What's on your plate?"* over *"Items currently awaiting triage"*).
- Check **tone targeting** (see [references/voice-and-pools.md](./references/voice-and-pools.md)):
  - Dry wit / self-aware sarcasm works when aimed at **shared chaos** (unfinished projects, shiny-object syndrome, endless refactors, inbox buildup).
  - **Never** aim sarcasm at low energy, rest, skipping a day, mistakes, or negative emotions. Those moments stay warm, calm, and protective.
- Look for static, repetitive strings in high-frequency moments (daily greetings, parking an idea, clearing an inbox, finishing a batch, shipping something) that deserve a **rotating, non-repeating message pool**.

#### Lens 3 — Onboarding & Zero-State Momentum
- **0-item check:** Does the empty state put the *primary first action* right in front of the user (not buried in a top-right header button or a link away to `/help`)?
- **Dead-end check:** If a getting-started checklist exists, does it render at 0 items, auto-check completed steps, give every active step a direct CTA, and surface prerequisites (e.g., optional API key or local tool) before the user hits a wall?
- **Bulk / low-friction capture:** Where users naturally arrive with a pile of existing items/ideas, check whether one-by-one modal creation is creating drop-off (consider a quick multi-line brain-dump option).

#### Lens 4 — Liminal Spaces, Celebrations & Tactile Micro-Interactions
Audit the in-between moments AI usually leaves dead:
- **Waiting & auto-save states:** Show *where* something is going (`"Heading to Queue…"` with Undo), or pair AI waiting with calm, honest status beats instead of a bare spinner.
- **Earned micro-celebrations:** Big milestones (crossing a finish line, clearing an inbox, zero blockers left, finishing a review batch) must feel distinct from routine CRUD toasts — never let a shipped project fire *"released its slot"*.
- **Physicality & motion:** Prefer quiet, spring-based state continuity over flashy effects:
  - Morphing status words (`TextMorph`) instead of snapping labels.
  - Odometer counters (`RollingNumber`) on badges/counts as items are triaged.
  - Inline confirm-with-undo (`ConfirmMorph`) for low-stakes destructive actions instead of jarring modals.
  - One **signature brand motion** tied to the product's visual metaphor (e.g., a progress mark gliding across a line as blockers drop).
- **Accessibility guardrail:** Every animation must respect `prefers-reduced-motion` (instant or fade-only fallback).

#### Lens 5 — Component Fit (Never Forced)
Consult [references/iris-fit-guide.md](./references/iris-fit-guide.md) when working in an Iris UI codebase (or map to the repo's design system):
1. Prefer **already-vendored unused components** first (e.g., `DatePicker`, `TagInput`, `TextMorph`, `RollingNumber`, `Popover`/`Tooltip`).
2. Recommend external/new components **only** when they remove real friction, make AI reasoning/memory transparent, or replace clunky hand-rolled UI.
3. Explicitly list tempting components to **skip** when they conflict with the product's ethos (e.g., percentage goal-trackers or KPI explainers in an anti-score app).

### 3. Present the Audit Plan

Unless the user asked to edit immediately, present a concise, scannable audit before touching code:

- **Top findings table:** `File / Screen | Lens | Current friction | Proposed upgrade`
- **Voice & message pool sample:** 3–5 concrete before → after rewrites and sample pool lines so the user can tune the sarcasm/warmth dial.
- **Component changes:** split into *use already-installed*, *add/vendor*, and *intentionally skipped*.

Wait for confirmation on tone and any new components before applying large edits.

### 4. Inject & Verify

When implementing the approved pass:

1. **Centralize copy pools** in a dedicated module (e.g., `src/lib/lines.ts`) with deterministic-per-day or session non-repeating selection and optional plain-tone fallback if the app supports it.
2. **Keep existing invariants untouched:** never weaken validation, accessibility labels, keyboard navigation, or privacy boundaries.
3. **Preserve vendored component conventions:** if syncing Iris UI components, follow the repo's sync script/notes and do not silently overwrite documented local patches.
4. **Verify end-to-end:**
   - Run the project's typecheck, lint/format, and test commands.
   - Check every touched screen in empty, loading, active, error, and reduced-motion states.
