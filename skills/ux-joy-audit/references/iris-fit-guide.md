# Iris UI Component Fit Guide

Use this guide during **Lens 5 (Component Fit)** to match UX problems to Iris UI components cleanly — and avoid forcing flashy components that add noise or break product principles.

Always check `src/components/iris/` first to see what is already vendored.

## 1. Comprehension, Onboarding & Navigation

| UX Problem | Iris Component | Good Fit When… |
|---|---|---|
| Explaining how multiple inputs/steps converge on one goal | `path-diagram` | Landing pages or `/help` where a 3-second visual beats 3 paragraphs |
| Unfamiliar domain words scattered across screens | `popover` (e.g. `TermHint`) / `tooltip` | First-encounter terms (`Pulse`, `Shortlist`, `Compost`, `Sidecar`) need 1–2 sentence inline definitions |
| Multi-step first-run checklist | `disclosure` + `progress-ring` + `item` | State-driven onboarding that auto-checks off and disappears once active |
| Compact 3–5 item top nav | `pill-nav` + `user-menu` | Replacing hand-rolled header links and separate desktop/mobile account menus |
| Discoverable keyboard shortcuts | `blocks/shortcut-sheet` + `command-palette` | App has `⌘K` or keyboard moves users rarely discover |
| Long detail pages with secondary sections | `tabs`, `property-panel`, `expandable-card` | Primary work stays above the fold; history/metadata tucks cleanly away |

## 2. AI Transparency & Human-in-the-Loop

| UX Problem | Iris Component | Good Fit When… |
|---|---|---|
| Waiting on an LLM feels stuck or opaque | `thinking-state` + `agent-trace` | Multi-step agent or interview turns with tool calls |
| Reviewing AI-proposed items or field edits | `change-approval` | Human toggles which proposed findings/changes to keep before applying |
| Surfacing what the app remembers about the user | `memory-panel` | Replacing flat summary text with inspectable, editable/forgettable facts |
| Showing provenance (files, URLs, transcripts) | `source-citations` | Separating *read / inferred / could not check* or linking extracted items to sources |
| Showing BYOK / API token spend | `token-meter` | Replacing tiny raw token counts with a clear, trustworthy usage bar |

## 3. Low-Friction Inputs & Daily Actions

| UX Problem | Iris Component | Good Fit When… |
|---|---|---|
| Two adjacent buttons for a primary + secondary variant | `split-button` | `Add project` (+ *Brain dump*), `Review inbox` (+ *Sort all*), `Snooze 1w` (+ *Pick date*) |
| Low-stakes delete / disconnect / dismiss | `confirm-morph` | Inline confirm + Undo without jarring modal dialogs (keep `alert-dialog` for irreversible account deletion) |
| Comma-separated text inputs for names/folders/tags | `tag-input` | Turning error-prone text strings into clean chips |
| Snooze / defer limited to fixed presets | `date-picker` | Backend supports arbitrary dates ("next Monday", "after launch") |
| Copyable URLs, MCP endpoints, tokens | `copy-field` | Replacing hand-rolled `<code>` + `CopyButton` combos |
| Horizontal filter toggles or quick reason tags | `chip-row` | Replacing manual flex rows of ghost `Button`s |
| Fast bulk filtering on large tables | `filter-table` | Triaging 50+ items/folders with status/activity chips |
| Power-user card actions without visual clutter | `context-menu` | Right-click shortcuts on Kanban cards |
| High activation energy for typing messy thoughts | `voice-input` | Optional ADHD-friendly dictation for notes, handoffs, and open-ended answers |

## 4. Quiet Tactile Delight

| Moment | Iris Component | Effect |
|---|---|---|
| Status label transitions (`3 left` → `Ready`, `Snooze` → `Snoozed`) | `text-morph` | Shared letters glide smoothly instead of snapping |
| Counts changing during triage (Inbox, Pulse queue, Parking lot) | `rolling-number` | Digits roll like a physical counter |
| Calm waiting label | `text-shimmer` | Subtle breathing highlight while work runs |

## 5. Components to Skip Unless the Domain Truly Demands Them

- **Anti-score / anti-guilt conflict:** `goal-tracker` (large percentages/timeline scrubbers), `metric-explainer` (weighted KPI scores). Do not introduce these into calm/neurodivergent tools.
- **Wrong domain:** `slot-picker` (calendar meeting booking), `availability-calendar`, `event-calendar`, `timezone-planner`, `billing-toggle`, `permissions-matrix`, `shared-checklist` (multiplayer).
- **Over-engineered chrome:** `sidebar-nav` or `menubar` (when nav has ≤4 links), `rich-text-editor` (when items should stay 1-line), `agent-lanes` / `changeset-review` / `prompt-bar` (unless building a multi-agent IDE/chat).
