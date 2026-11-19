# skills

Agent Skills from entro314.labs. Each skill is a folder under `skills/` with a `SKILL.md`, following the [Agent Skills](https://agentskills.io) format.

## Skills

| Skill | What it does |
| --- | --- |
| [ui-declutter](skills/ui-declutter/SKILL.md) | Edits the visible text and decoration of a web page, app screen, game menu, chart or dashboard down to what its user needs. |

### brand-writing

Six writing skills that install together as the `brand-writing` plugin. Intended flow: `positioning-messaging` → `brand-voice` → `copywriting` / `landing-page-copy` → `copy-editing`, with `ux-writing` for in-product text.

| Skill | What it does |
| --- | --- |
| [positioning-messaging](skills/positioning-messaging/SKILL.md) | Positioning, messaging hierarchy, value propositions, taglines and brand or founder stories. |
| [brand-voice](skills/brand-voice/SKILL.md) | Develops and documents a brand voice, and keeps it intact in AI-assisted writing. |
| [copywriting](skills/copywriting/SKILL.md) | Persuasive copy for single assets: ads, emails, headlines, product descriptions and CTAs. |
| [landing-page-copy](skills/landing-page-copy/SKILL.md) | Whole-page copy for landing, home, pricing and sales pages, section by section. |
| [copy-editing](skills/copy-editing/SKILL.md) | Improves existing copy in seven focused passes, with a readability scorer. |
| [ux-writing](skills/ux-writing/SKILL.md) | Interface microcopy: buttons, labels, errors, empty states, forms and notifications. |

### remotion

Eight skills for making videos in React with [Remotion](https://www.remotion.dev) (v4+), installed together as the `remotion` plugin. `remotion-core` is the core; the others build on it. Remotion has its own license terms for company use.

| Skill | What it does |
| --- | --- |
| [remotion-core](skills/remotion-core/SKILL.md) | Core Remotion guidance: compositions, frame-driven animation, timing, media, fonts, 3D and effects. |
| [remotion-project-conventions](skills/remotion-project-conventions/SKILL.md) | Naming, file organisation, theming, accessibility and testing for a Remotion codebase. |
| [remotion-transitions](skills/remotion-transitions/SKILL.md) | Scene transitions, light leaks and custom presentations with `@remotion/transitions`. |
| [remotion-maplibre-maps](skills/remotion-maplibre-maps/SKILL.md) | Animated maps with MapLibre and Turf, with no account, API key or token. |
| [remotion-explainer-videos](skills/remotion-explainer-videos/SKILL.md) | Workflow for explainer, tutorial, walkthrough and diagram-narrated videos. |
| [remotion-promo-videos](skills/remotion-promo-videos/SKILL.md) | Planning and building promo, launch and short-form social videos, with templates. |
| [remotion-product-film](skills/remotion-product-film/SKILL.md) | Writes a product video brief from the codebase, then builds a cinematic film from the real interface: perspective camera, lifted components, checks and delivery package. |
| [remotion-rendering](skills/remotion-rendering/SKILL.md) | Rendering to video, stills, GIF and transparent video from the CLI or Node.js. |

### crete

[Athens to Crete](https://github.com/entro314-labs/athens-to-crete), an integration-first engineering methodology: understand the real problem, reuse what exists, verify the path end to end. It is a full Claude Code plugin with ten `/crete:*` commands, four subagents, a session-start reminder and the `athens-to-crete` skill. It lives in [`plugins/crete/`](plugins/crete/README.md).

### codebase-analysis

Codebase analysis prompts and mappers: architecture, API, database, security, AI integration, gap and alignment reports, plus deep-dive and investigation workflows.

| Skill | What it does |
| --- | --- |
| [analysis-ai-mapper](skills/analysis-ai-mapper/SKILL.md) | Analyzes how AI and machine learning are implemented in a codebase: SDKs, model and provider management, prompts, AI feature flows, cost and fallback handling. |
| [analysis-api-mapper](skills/analysis-api-mapper/SKILL.md) | Analyzes API architecture in a codebase: style, endpoints, request and response patterns, data contracts, authentication, caching, rate limiting and integrations. |
| [analysis-code-to-copy](skills/analysis-code-to-copy/SKILL.md) | Turns a product understanding report into actual website and marketing copy focused on user experience and benefits instead of technical mechanisms, with anti-pattern checks. |
| [analysis-ctp-mapper](skills/analysis-ctp-mapper/SKILL.md) | Code to Product analysis: reads the whole codebase to explain what the product does, user journeys, features, business logic and value proposition. |
| [analysis-database-mapper](skills/analysis-database-mapper/SKILL.md) | Analyzes database design in a codebase: schema, relationships, query and ORM patterns, indexing, multi-tenancy, performance and scalability. |
| [analysis-deep-tech-mapper](skills/analysis-deep-tech-mapper/SKILL.md) | Analyzes how specific features are technically implemented: module design, algorithms, design patterns, performance, concurrency, resource handling and extension points. |
| [analysis-gap-analysis-command](skills/analysis-gap-analysis-command/SKILL.md) | Compares generated analysis reports against the actual implementation to find gaps and misalignments across database, API, UI, types and security layers, and incomplete features. |
| [analysis-implementation-alignment-command](skills/analysis-implementation-alignment-command/SKILL.md) | Implements fixes from a gap analysis: generates code, migrations, API endpoints, UI components and types to resolve misalignments, in database, types, API, UI order. |
| [analysis-main-mapper](skills/analysis-main-mapper/SKILL.md) | Synthesizes all specialized analysis reports into one executive-level assessment covering cross-domain alignment, risks, conflicts, strategic opportunities and investment guidance. |
| [analysis-security-mapper](skills/analysis-security-mapper/SKILL.md) | Analyzes security in a codebase: authentication, authorization, data protection at rest and in transit, input validation, vulnerability prevention and compliance. |
| [analysis-tech-mapper](skills/analysis-tech-mapper/SKILL.md) | Analyzes technical architecture: architectural style, stack, layers, data flow, integration patterns, performance and scalability, infrastructure. |
| [codebase-analysis-comprehensive](skills/codebase-analysis-comprehensive/SKILL.md) | Runs an exhaustive multi-section codebase analysis covering architecture, data flow, features, quality, security, performance and documentation gaps, producing a detailed report. |
| [codebase-analysis-universal](skills/codebase-analysis-universal/SKILL.md) | Runs a language-agnostic codebase analysis covering structure, stack, architecture, patterns, quality and risks, producing a standardized report. |
| [technical-stack-analysis](skills/technical-stack-analysis/SKILL.md) | Analyzes a codebase's technical stack and architecture: dependencies, versions, structure, patterns, integrations and technical debt, producing a structured technical report. |
| [folder-documentation](skills/folder-documentation/SKILL.md) | Generates technical documentation for a folder or module: purpose, file inventory, key components, data flow and usage. |
| [migration-refactoring-analysis](skills/migration-refactoring-analysis/SKILL.md) | Analyzes a codebase in preparation for a migration or large refactor: inventories legacy patterns, dependencies and risks, and produces a phased migration plan. |
| [nextjs-codebase-analysis](skills/nextjs-codebase-analysis/SKILL.md) | Analyzes a Next.js 15.3 codebase: App Router structure, server and client components, data fetching, caching, auth, performance and conventions, producing a structured report. |
| [supabase-auth-investigation](skills/supabase-auth-investigation/SKILL.md) | Investigates a Next.js 15 project's remote Supabase auth and RBAC setup (schemas, policies, roles, triggers) and produces a blueprint for creating users correctly. |
| [knowledge-extract](skills/knowledge-extract/SKILL.md) | Extracts and documents domain knowledge, business logic, domain models, APIs, workflows, configuration, error handling and test patterns from a codebase into synthesized documentation. |
| [deep-dive](skills/deep-dive/SKILL.md) | Performs a six-phase, multi-perspective exploration of a topic, concept or codebase area across technical, business and operational dimensions, ending in a structured deep-dive document. |
| [investigate](skills/investigate/SKILL.md) | Investigates a topic, technology or approach by combining codebase search with web research, compares options and delivers a recommendation with evidence, risks and next steps. |

### business-analysis

Business analysis of a codebase: business logic, business-technical alignment, investor readiness, executive summaries and discrepancy checks.

| Skill | What it does |
| --- | --- |
| [business-analyze-business](skills/business-analyze-business/SKILL.md) | Analyzes all business documents in the current directory for investor readiness: maps documents, extracts metrics, cross-validates figures, searches the web for market and competitor data, and checks financial models and risks. |
| [business-codebase-alignment](skills/business-codebase-alignment/SKILL.md) | Assesses how well a codebase implements the business model: maps business requirements to code, finds gaps, misalignments and unimplemented rules, and produces a scored alignment report. |
| [business-executive-summary](skills/business-executive-summary/SKILL.md) | Generates a six-section executive summary of a business validation analysis covering overview, findings, financials, market position, investment readiness and recommendations. |
| [business-investor-readiness](skills/business-investor-readiness/SKILL.md) | Assesses whether a pitch deck, business plan, financial model and due diligence materials are ready for investors, and outputs a readiness scorecard, gap analysis and checklist. |
| [business-logic-analysis](skills/business-logic-analysis/SKILL.md) | Extracts and documents the business logic and domain model of a codebase: entities, rules, workflows, validations and state transitions, as a structured report. |
| [business-logic-analysis-nextjs](skills/business-logic-analysis-nextjs/SKILL.md) | Extracts business logic from a Next.js codebase: server actions, route handlers, middleware, data models and domain workflows, producing a structured domain report. |
| [business-spot-discrepancies](skills/business-spot-discrepancies/SKILL.md) | Scans business documents for inconsistencies in financial metrics, market size claims, timelines and positioning, and flags each with document references and fixes. |
| [business-technical-alignment](skills/business-technical-alignment/SKILL.md) | Evaluates whether the technical architecture and stack choices support the business goals, scale and revenue model, and reports risks and recommendations. |

### drift-prevention

Drift-prevention workflow: PROJECT_MANIFEST and REFACTOR_PLAN templates, hook scripts, and audit, review, standardize, validate, refactor and cleanup skills built around them.

| Skill | What it does |
| --- | --- |
| [drift-prevention-kit](skills/drift-prevention-kit/SKILL.md) | Templates and scripts for the drift-prevention workflow: DRIFT_PREVENTION_GUIDE, PROJECT_MANIFEST and REFACTOR_PLAN templates (two variants each), pre and post edit hook scripts, and the original settings example. |
| [audit](skills/audit/SKILL.md) | Runs a security and architecture audit covering hardcoded secrets, input sanitization, auth, dependency vulnerabilities and drift from PROJECT_MANIFEST patterns, then reports findings with remediation priorities. |
| [review](skills/review/SKILL.md) | Performs a code review covering architecture, quality and drift, checking pattern compliance, style, performance, security and naming against PROJECT_MANIFEST standards using git diff and log. |
| [standardize](skills/standardize/SKILL.md) | Standardizes code to patterns defined in PROJECT_MANIFEST.md: Result<T, E> API calls, React component structure, type safety, file naming, import style and formatting, with backups and diff preview. |
| [validate](skills/validate/SKILL.md) | Validates the codebase against patterns recorded in PROJECT_MANIFEST.md: type safety (no any), Result<T, E> API patterns, component structure, error handling, naming, and imports, with a compliance report. |
| [refactor-plan](skills/refactor-plan/SKILL.md) | Executes systematic refactoring from a REFACTOR_PLAN.md in priority order (critical, consistency, quality phases), validating with tests and updating the plan after each item. |
| [technical-debt](skills/technical-debt/SKILL.md) | Analyzes the codebase for technical debt, categorizing issues as breaking, consistency or quality with file locations, effort estimates and fix suggestions, and writes them to REFACTOR_PLAN.md. |
| [clean](skills/clean/SKILL.md) | Cleans up a codebase by removing dead code, duplicates, unused dependencies and misplaced or temporary files, with dry-run default, confirmation before deletions and test validation afterwards. |
| [benchmark](skills/benchmark/SKILL.md) | Measures and analyzes performance across build time, bundle size, runtime rendering, API latency, memory and code-quality metrics, then recommends optimizations with before/after comparisons. |
| [dependencies](skills/dependencies/SKILL.md) | Analyzes project dependencies for security vulnerabilities, outdated packages, version drift, unused or duplicate packages and bundle size impact using npm audit, outdated and ls. |

### code-quality

Code quality and security: reviews, debugging, testing, TDD, refactoring, performance, benchmarks, health checks, hardening and CI verification.

| Skill | What it does |
| --- | --- |
| [quality-benchmark](skills/quality-benchmark/SKILL.md) | Runs a multi-phase performance benchmark suite for a target: baselines with hyperfine, cargo/go/JMH/deno benchmarks, wrk HTTP load tests, database and memory profiling, then reports bottlenecks and optimizations. |
| [quality-clean](skills/quality-clean/SKILL.md) | Cleans up technical debt in a target: removes dead code, unused imports and commented-out blocks, fixes lint issues, consolidates duplication, updates deprecated usage, and commits per cleanup type with tests. |
| [quality-debug](skills/quality-debug/SKILL.md) | Guides systematic root cause debugging for errors, stack traces, logs, memory leaks, race conditions, and performance symptoms, with Java, Go, Rust, and Deno specific strategies and prevention steps. |
| [quality-health-check](skills/quality-health-check/SKILL.md) | Designs and implements health monitoring for services, databases, and infrastructure: health endpoints, dependency checks, status aggregation, alerting, and status reporting. |
| [quality-perf](skills/quality-perf/SKILL.md) | Analyzes and optimizes performance of a target: profiling with language-specific tools (Java, Go, Rust), algorithm and data structure review, N+1 and index issues, async processing, caching strategies, and load testing. |
| [quality-refactor](skills/quality-refactor/SKILL.md) | Refactors code safely with code smell detection, design pattern application (extract method, strategy, builder, factory), test verification, and incremental commits, with safe, dry-run, and aggressive modes. |
| [quality-review](skills/quality-review/SKILL.md) | Performs a code and project review of latest git changes, a file, architecture, security, or performance with quick, standard, or deep modes and focus areas, producing a structured findings report. |
| [quality-standardize](skills/quality-standardize/SKILL.md) | Applies consistent coding standards across a codebase: detects naming, structure, and formatting inconsistencies, defines naming rules, rewrites files and renames them, and sets up linters and formatters. |
| [quality-tdd](skills/quality-tdd/SKILL.md) | Sets up a test-driven development workflow for a feature: picks the language's test framework, writes failing tests first (Red), adds a skeleton implementation, then drives to passing and refactors, with parallel worktree option. |
| [quality-technical-debt](skills/quality-technical-debt/SKILL.md) | Assesses and prioritizes technical debt in a target: static analysis, code smell and anti-pattern detection, outdated dependency health, complexity and test coverage gaps, with a remediation plan. |
| [quality-validate](skills/quality-validate/SKILL.md) | Runs comprehensive validation across the codebase: compilation, type checks, linting, static analysis, tests, and dependency verification for Java, Go, Rust, and Deno/TypeScript, and saves a report. |
| [security-audit](skills/security-audit/SKILL.md) | Runs a comprehensive security and compliance audit covering code vulnerabilities, dependency CVEs, infrastructure and container configuration, secrets, and regulatory frameworks (PCI, SOX, GDPR), producing a report with remediation steps. |
| [security-harden](skills/security-harden/SKILL.md) | Applies security hardening to code and infrastructure, making real changes: distroless containers, pinned dependencies, secure env setup, secret handling, and compliance levels (basic, strict, paranoid; SOC2, PCI, HIPAA). |
| [debug](skills/debug/SKILL.md) | Debugs a described issue systematically: analyzes the error, checks logs, suggests tools and troubleshooting steps, identifies likely root causes and recommends fixes with commands and files to check. |
| [test](skills/test/SKILL.md) | Creates comprehensive tests for a given target: unit, integration, edge case, performance and accessibility tests, using the project's existing testing framework and patterns with data setup and cleanup. |
| [optimize](skills/optimize/SKILL.md) | Analyzes the current codebase and suggests optimizations for performance, developer experience, maintainability and user experience, prioritizing high-impact low-effort improvements with implementation details. |
| [optimize-database-performance](skills/optimize-database-performance/SKILL.md) | Optimizes database performance: slow query analysis with EXPLAIN, index strategy, PostgreSQL and MySQL tuning, connection pooling, caching, partitioning and monitoring. |
| [simplify-code](skills/simplify-code/SKILL.md) | Refactors complex code for readability and maintainability while preserving behavior: complexity analysis, method extraction, conditional simplification, naming and structure improvements, with a change summary. |
| [review-git](skills/review-git/SKILL.md) | Reviews the latest commit or uncommitted changes for security, code quality, tests, performance and documentation, and produces a severity-rated checklist with line references. |
| [verify-ci](skills/verify-ci/SKILL.md) | Verifies the repository is in a working state by detecting the package manager, installing dependencies, then running lint, typecheck, build and tests, fixing failures and staging fixes. |

### thinking-tools

Reasoning, explanation and research helpers: structured thinking, options, elaboration, roadmaps, TL;DRs, summaries, diagrams, visualizations and web research.

| Skill | What it does |
| --- | --- |
| [meta-api](skills/meta-api/SKILL.md) | Generates complete API endpoints (REST, gRPC, or GraphQL) with implementation, tests, authentication, validation, security measures, documentation, and example client code for a given description and framework. |
| [meta-changelog](skills/meta-changelog/SKILL.md) | Generates changelogs from git commits, pull requests, and tags following conventional changelog and Keep a Changelog standards, grouped by type and version. |
| [meta-diagram](skills/meta-diagram/SKILL.md) | Generates architecture, flow, sequence, class, and entity-relationship diagrams from code structure and documentation using ASCII art and mermaid syntax. |
| [meta-document](skills/meta-document/SKILL.md) | Generates user-facing project documentation by analyzing the codebase, config, and git history: README, API docs, and changelog, kept in sync with code. |
| [meta-explain](skills/meta-explain/SKILL.md) | Explains code, architecture, or technical concepts with overview, code breakdown, patterns, gotchas, and testing and performance notes, and gives implementation guidance for new approaches, at selectable depth. |
| [meta-research](skills/meta-research/SKILL.md) | Performs structured web research with quick, deep, or comprehensive depth, source validation, and actionable summaries for technology evaluations and fact-checking. |
| [meta-summary](skills/meta-summary/SKILL.md) | Produces concise, actionable summaries of a conversation, file, codebase, or topic in selectable formats (TLDR, key decisions, action items, next steps). |
| [meta-visualize](skills/meta-visualize/SKILL.md) | Generates explanatory diagrams from code, logic, and system architecture as mermaid, PlantUML, or graphviz (flowchart, sequence, ERD, architecture), saving files under docs/diagrams by default. |
| [think](skills/think/SKILL.md) | Applies a structured six-phase reasoning framework (framing, first principles, systems, contrarian, creative, critical evaluation) to a topic, problem or decision and outputs insights and a recommendation. |
| [apply-thinking-to](skills/apply-thinking-to/SKILL.md) | Rewrites a prompt file using extended-thinking patterns such as progressive reasoning, layered analytical frameworks and verification steps. |
| [elaborate](skills/elaborate/SKILL.md) | Produces an in-depth analysis and implementation guide for one technical approach, covering architecture, roadmap, code examples, testing, deployment, risks and alternatives. |
| [options](skills/options/SKILL.md) | Analyzes 3-5 approaches to a task or problem, listing benefits, trade-offs, effort and best-fit scenarios with a comparison matrix and recommendation. |
| [map](skills/map/SKILL.md) | Maps out the high-level strategy for an initiative as a Markdown roadmap with strategic goals, milestone checkpoints, risks and resource estimates. |
| [tldr](skills/tldr/SKILL.md) | Generates concise, actionable TL;DR summaries of topics, documents, codebases, meetings or projects with bottom line, key points, next steps and critical notes. |
| [deep-web-research](skills/deep-web-research/SKILL.md) | Runs extensive web research using multiple WebSearch queries and 8-12 WebFetch sources, cross-references claims and writes a detailed report with findings and recommendations. |
| [quick-web-research](skills/quick-web-research/SKILL.md) | Performs fast web research using WebSearch plus WebFetch on the top 2-3 sources and returns a concise development-focused summary. |

### dev-guides

Reference libraries for Next.js, Clerk and Supabase, macOS and Swift, Python and PySide, design specifications and AI instruction files, plus three frontend subagents. Subagents: `ui-engineer`, `ui-ux-designer`, `react-nextjs-expert` (in [`agents/`](agents/)).

| Skill | What it does |
| --- | --- |
| [nextjs-guides](skills/nextjs-guides/SKILL.md) | Reference library of Next.js 15 era guides: App Router patterns, core API, components, shadcn/ui, Tailwind CSS 4, testing, performance, SEO, deployment, troubleshooting and third-party integrations. |
| [clerk-supabase-guides](skills/clerk-supabase-guides/SKILL.md) | Reference library for Clerk and Supabase with Next.js: Clerk integration and security audit, Supabase CLI, local development and migrations, testing and extensions, Postgres performance, migrating Supabase Auth to Clerk, and user creation. |
| [macos-swift-guides](skills/macos-swift-guides/SKILL.md) | Reference library for macOS and Swift development with AI agents: architecture, SwiftUI UI rules, data persistence, system integration, performance and security, testing strategy, legacy migration, dos and don'ts, and agent workflows. |
| [python-pyside-guides](skills/python-pyside-guides/SKILL.md) | Reference library for Python 3.13+, PySide 6 and QtQuick/QML 6.8 desktop development: development guide, dos and don'ts, and AI agent workflow. |
| [design-specs](skills/design-specs/SKILL.md) | Library of exhaustive design specifications for dashboards and landing pages in named styles (neobrutalist, elegant minimal, developer dark, warm human, editorial, tech SaaS premium, cinematic dark, playful geometric, Japanese minimalist, Swiss, retro-futurist), plus layout notes and master design prompts. |
| [ai-instruction-templates](skills/ai-instruction-templates/SKILL.md) | Templates and examples for AI assistant instruction files: core principles, project configuration, MCP server documentation, common-mistakes file, CLAUDE.md memory examples, CLAUDE patterns and config-variable notes, and a set of .cursorrules files with their license. |
| [myroomie-guides](skills/myroomie-guides/SKILL.md) | MyRoomie project knowledge: business logic, development guides for the Next.js 15 platform, architecture notes and the project's earlier CLAUDE.md memory. |

### dev-workflow

Development workflow skills: commits, PRs, releases, CI generation, deployment, project setup, migrations, API and schema design, planning and parallel work.

| Skill | What it does |
| --- | --- |
| [ci-setup](skills/ci-setup/SKILL.md) | Guides setting up a CI/CD pipeline: picks a platform (GitHub Actions, GitLab CI, Jenkins and others), configures build, test matrix, caching, quality gates, Docker builds, security scanning and deployments. |
| [cleanup-context](skills/cleanup-context/SKILL.md) | Reduces token usage of a project's memory bank by analyzing CLAUDE.md, CLAUDE-*.md and README.md, removing obsolete or duplicate content, consolidating overlapping files and archiving resolved documentation. |
| [consolidate-domain](skills/consolidate-domain/SKILL.md) | Coordinates four specialist roles (duplication detection, merge strategy, refactoring, integration validation) to merge redundant code within a single domain or directory without adding functionality. |
| [cpr](skills/cpr/SKILL.md) | Commits current changes, pushes the branch to the remote and opens a pull request with gh, returning the PR URL. |
| [create-command](skills/create-command/SKILL.md) | Interactive assistant that creates new Claude slash commands: interviews the user, classifies the command pattern, picks project or user location, writes the command file and updates docs. |
| [deps](skills/deps/SKILL.md) | Audits project dependencies across Java, Go, Rust, Node, Python and Deno: security scan, outdated and unused packages, lighter alternatives, staged update plan and license compliance, with a risk-scored report. |
| [design-database-schema](skills/design-database-schema/SKILL.md) | Designs optimized relational database schemas with entity modeling, PostgreSQL DDL for users, roles, products and orders, constraints, indexing, normalization, migrations and performance planning. |
| [design-rest-api](skills/design-rest-api/SKILL.md) | Designs a RESTful API architecture: resource modeling, versioning, Express.js route and controller structure, validation, authentication, pagination, error handling, rate limiting and documentation. |
| [development-bug-fix](skills/development-bug-fix/SKILL.md) | Runs a git-based bug fix workflow: creates a GitHub issue, creates a bugfix branch, fixes the bug, commits, pushes, and opens a PR linked to the issue with gh. |
| [development-dependencies](skills/development-dependencies/SKILL.md) | Manages project dependencies across package managers: security audits, version updates, outdated and unused package detection, coupling analysis, and health reports with step-by-step update plans. |
| [development-integrate](skills/development-integrate/SKILL.md) | Builds an integration between a source and target system (services, APIs, databases): analyzes existing integrations, implements clients with error handling, retries, and monitoring, and adds tests. |
| [development-migrate](skills/development-migrate/SKILL.md) | Plans and executes migrations of databases, APIs, dependencies, code patterns, and infrastructure with risk assessment, backups, migration scripts, execution plan, validation, and rollback procedures. |
| [development-onboard](skills/development-onboard/SKILL.md) | Sets up a complete development environment for a new team member: detects languages and frameworks, installs prerequisite tools, configures dependencies, builds and runs tests, and produces onboarding steps. |
| [development-project-setup](skills/development-project-setup/SKILL.md) | Scaffolds a new project: standard directory structure, .gitignore, README, env files, license, changelog, version control init, and language-specific conventions. |
| [development-prototype](skills/development-prototype/SKILL.md) | Builds a rapid working proof-of-concept for an idea (APIs, real-time, data pipelines) with core features, tests, performance metrics, and a validation report, in chosen tech modes. |
| [generate-command](skills/generate-command/SKILL.md) | Explains and scaffolds a reusable project-level Claude Code slash command: naming, $ARGUMENTS usage, .claude/commands layout, metadata and version control, then asks what command to create. |
| [ideate-commands](skills/ideate-commands/SKILL.md) | Brainstorms 5-10 useful project-specific slash commands for a given project or situation, each with name, purpose, key actions, parameters and example usage. |
| [implement-graphql-api](skills/implement-graphql-api/SKILL.md) | Implements a GraphQL API: Apollo Server setup, SDL schema with scalars, enums and Relay-style connections, resolvers, DataLoader batching, authentication, subscriptions, query complexity limits and testing. |
| [migrate-to-typescript](skills/migrate-to-typescript/SKILL.md) | Plans and executes migrating a JavaScript project to TypeScript: analysis, tsconfig with strict mode, bundler integration, incremental file renaming, @types packages, type annotations, error resolution and CI type checking. |
| [modernize-deps](skills/modernize-deps/SKILL.md) | Updates and modernizes project dependencies: audits outdated and vulnerable packages across npm, pip and composer, applies patch, minor then major updates incrementally, reviews breaking changes and re-runs tests, build and lint. |
| [next-steps](skills/next-steps/SKILL.md) | Analyzes project state (plan files, git history, TODOs, tasks, CI status) and recommends a prioritized list of next tasks with effort, dependencies and follow-ups. |
| [parallel-enhanced](skills/parallel-enhanced/SKILL.md) | Sets up a parallel multi-agent development workflow from an existing plan: creates git worktrees per agent, adds a deno.json launch task and work-stealing task claiming. |
| [pipeline](skills/pipeline/SKILL.md) | Generates a batch processing pipeline for a given purpose, with examples for Java, Go, Rust, Kubernetes, CI/CD, headless Claude and data tools, plus a script template and monitoring. |
| [prepare-release](skills/prepare-release/SKILL.md) | Prepares and validates a release: picks a semantic version, runs the pre-release checklist, creates a release branch, bumps versions, generates the changelog, builds and tests artifacts, tags and publishes. |
| [progress](skills/progress/SKILL.md) | Records development progress as timestamped markdown files under ./progress/YYYY-MM-DD/ and views entries by today, date or all. |
| [schema](skills/schema/SKILL.md) | Manages database schemas with actions for migrations (golang-migrate, Flyway, Diesel, Liquibase), CRUD code generation and test data seeding, with rollback and safety features. |
| [setup](skills/setup/SKILL.md) | Sets up a new project environment: Node.js version via fnm and .nvmrc, pnpm, ESLint, Prettier, TypeScript, git init and .gitignore, .env.example, common scripts, Docker files and a README. |
| [setup-automated-releases](skills/setup-automated-releases/SKILL.md) | Sets up automated releases: version tracking, Conventional Commits docs, PR template, GitHub Actions release and PR-check workflows, release notes config, README badges and Keep a Changelog setup. |
| [sync](skills/sync/SKILL.md) | Compares keybindings and settings across Cursor, VS Code and Zed, reports common and conflicting bindings, proposes a unified scheme and generates a Deno sync script and deno.json task. |
| [translate](skills/translate/SKILL.md) | Converts code between programming languages, frameworks or paradigms while preserving behavior and idioms, with construct mappings, dependency mapping, tests and validation. |
| [workflow-ci-gen](skills/workflow-ci-gen/SKILL.md) | Generates CI/CD pipelines by detecting the stack (Go, Rust, Java, Node/Deno, Python, Docker, Kubernetes), with matrix tests, caching, security scanning, container push, and deploy for GitHub Actions, GitLab CI, or CircleCI. |
| [workflow-commit](skills/workflow-commit/SKILL.md) | Generates a conventional commit message from the staged git diff (type, scope, imperative description, body, breaking-change footer) and creates the commit. |
| [workflow-coordinate](skills/workflow-coordinate/SKILL.md) | Coordinates multiple Claude instances on a large feature: splits work streams, writes a coordination plan under /tmp, sets up git worktrees, and gives launch commands and a progress-check script. |
| [workflow-deploy](skills/workflow-deploy/SKILL.md) | Deploys containerized apps to Kubernetes: locates k8s, infra, or deploy directories, creates or updates manifests (Deployment, Service, Ingress, HPA), sets image tags from git SHA, templates secrets, and adds GitHub Actions deploy steps. |
| [workflow-git-workflow](skills/workflow-git-workflow/SKILL.md) | Guides common Git workflows: feature and hotfix branches, staged commits with message templates, pushing, conflict resolution, merging, and pull request steps following best practices. |
| [workflow-monitor](skills/workflow-monitor/SKILL.md) | Sets up observability for applications, infrastructure, or business metrics: metrics, logs, traces, golden signals, Prometheus and Grafana style stacks, alert rules, log collection, and dashboards. |
| [workflow-parallel](skills/workflow-parallel/SKILL.md) | Sets up parallel development with git worktrees and work-stealing Claude agents that claim tasks from a shared queue, with setup, launch, status, and cleanup actions. |
| [workflow-plan](skills/workflow-plan/SKILL.md) | Creates project plans with codebase analysis, hierarchical task breakdown, dependencies, risk assessment, and progress tracking, single-agent or multi-agent with worktrees. |
| [workflow-pr](skills/workflow-pr/SKILL.md) | Analyzes the current branch and creates a descriptive pull request with summary, changes, testing, breaking changes, checklist, reviewers, and draft or template options. |
| [workflow-release](skills/workflow-release/SKILL.md) | Automates a release: determines the semantic version from conventional commits, bumps versions, generates the changelog, tags, publishes, and supports dry-run, prerelease, and patch/minor/major types. |
| [zed-task](skills/zed-task/SKILL.md) | Generates a Zed editor task definition for .zed/tasks.json from a plain-language description, using Zed variables, and creates or extends the file. |

## Install

### Claude Code

Add the marketplace once, then install the plugins you want:

```
/plugin marketplace add entro314-labs/skills
/plugin install ui-declutter@entro314-labs
/plugin install brand-writing@entro314-labs
/plugin install remotion@entro314-labs
/plugin install crete@entro314-labs
/plugin install codebase-analysis@entro314-labs
/plugin install business-analysis@entro314-labs
/plugin install drift-prevention@entro314-labs
/plugin install code-quality@entro314-labs
/plugin install thinking-tools@entro314-labs
/plugin install dev-guides@entro314-labs
/plugin install dev-workflow@entro314-labs
```

The same from a shell:

```sh
claude plugin marketplace add entro314-labs/skills
claude plugin install ui-declutter@entro314-labs
claude plugin install brand-writing@entro314-labs
claude plugin install remotion@entro314-labs
claude plugin install crete@entro314-labs
claude plugin install codebase-analysis@entro314-labs
claude plugin install business-analysis@entro314-labs
claude plugin install drift-prevention@entro314-labs
claude plugin install code-quality@entro314-labs
claude plugin install thinking-tools@entro314-labs
claude plugin install dev-guides@entro314-labs
claude plugin install dev-workflow@entro314-labs
```

### Other agents

The [`skills`](https://github.com/vercel-labs/skills) CLI installs into Claude Code, Cursor, Codex and other agents:

```sh
npx skills add entro314-labs/skills --list            # see what is available
npx skills add entro314-labs/skills -s ui-declutter   # install one skill
```

### By hand

Copy a skill folder into your agent's skills directory, for example `~/.claude/skills/ui-declutter/`.

## Adding a skill

1. Create `skills/<name>/SKILL.md`. The frontmatter needs `name` (matching the folder name) and `description` (what the skill does and when to use it). Put supporting files next to it in `references/`, `scripts/` and `evals/`.
2. Add an entry to `plugins` in [`.claude-plugin/marketplace.json`](.claude-plugin/marketplace.json). To ship several skills as one plugin, list them all in `skills`:

   ```json
   {
     "name": "<name>",
     "description": "<one sentence>",
     "source": "./",
     "strict": false,
     "skills": ["./skills/<name>"]
   }
   ```

3. Add a row to the table above and a line to [CHANGELOG.md](CHANGELOG.md).
4. Run `claude plugin validate . --strict`.

Pull requests with new skills or fixes are welcome. Keep a skill free of secrets, personal paths and client material.

## License

[MIT](LICENSE)
