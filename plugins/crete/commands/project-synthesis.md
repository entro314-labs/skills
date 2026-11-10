---
description: Full project synthesis - reconcile docs, code, and vision into a coherent architecture and connected implementation plan
argument-hint: <project or area to synthesize>
---

# Project Synthesis - Athens to Crete Paradigm

For comprehensive project understanding: $ARGUMENTS

## 🏛️ Mission: Map Reality, Not Assumptions

**DON'T BUILD ROADS ACROSS SEAS. USE BOATS.**

Before ANY implementation, we need complete semantic coherence across:

- **What we're building** (project vision)
- **Who we're building for** (user needs)
- **How it should work** (logical architecture)
- **What exists already** (current state)

## Hard Rules

- **Pass isolation:** during gap analysis, do not propose improvements beyond correctness; during opportunity/roadmap work, do not relitigate correctness findings. Every finding goes into a shared register with a step tag; steps reference each other's findings by ID, never duplicate them.
- Do not invent requirements. Reconstruct intent from evidence; mark inferred intent with confidence (high/medium/low) and cite the evidence.
- Do not confuse "the code runs" with "the feature is correct," and do not confuse "this could be different" with "this should be different."

## Mandatory Synthesis Process

### Step 1: Documentation Archaeology (use the solution-architect agent)

1. **Problem Analysis**
   - What is the user ACTUALLY trying to achieve?
   - Is this the right problem to solve?
   - Are we addressing symptoms or root causes?

2. **Consume ALL information sources** (adapt paths to the project):

```text
docs/                → Technical truth and project vision (the "should be" state)
src/                 → Implementation reality (the "is" state)
CLAUDE.md / AGENTS.md → Development principles and context
product-understanding.md → User context (if present)
```

3. **Required Deep Read with Existing Resources Audit:**
   - Map technical stack capabilities vs. project needs
   - Identify documentation conflicts and outdated assumptions
   - Extract core user stories and business logic
   - Audit implementation gaps vs. documented intent
   - Similar patterns in codebase? Reusable components/libraries?
   - Why build new vs. adapt existing?

### Step 2: Semantic Integration (use the solution-architect agent)

```text
Start Point → Process Steps → End Point
     ↓            ↓              ↓
[Entry]  →  [Transform]  →  [Output]
     ↓            ↓              ↓
[Errors] →  [Handling]  →  [Recovery]
```

1. **Problem Space Mapping**
   - What problem are we REALLY solving?
   - Who are the actual end users?
   - What workflows must work seamlessly?

2. **Solution Space Analysis**
   - What already exists and works?
   - What's half-implemented and disconnected?
   - What's documented but not built?
   - What's built but not documented?

3. **Reality Check**
   - Do documented goals match implementation?
   - Do technical choices support user workflows?

### Step 3: Gap & Inconsistency Analysis (use the coherence-validator agent)

Find the disconnections:

- **Documentation Conflicts**: where sources disagree
- **Implementation Gaps**: features documented but missing
- **Architectural Misalignment**: code that doesn't serve user goals
- **Technical Debt**: components that work but don't connect
- **User Journey Breaks**: workflows that lead nowhere

### Step 4: Coherent Architecture Design (use the implementation-strategist agent)

Design the boat, don't build roads:

1. **Decomposition**: core (must have) / supporting (should have) / enhancements (nice to have)
2. **Dependency Order**: foundation → logic → service → presentation → integration
3. **Integration Strategy**: entry points, data flow, state management, error boundaries

### Step 5: Implementation Roadmap (use the implementation-strategist agent)

Produce the phased plan (foundation → core logic → interfaces → user layer → polish), and at EACH phase verify:

- Previous phase complete?
- Current phase connects?
- Next phase prepared?
- Integration points work?

### Step 6: Validation & Flow Testing (use the flow-analyzer agent)

Map EVERY journey (user-initiated, system-triggered, API-driven, event-based) and validate each path end-to-end:

```text
START → STEPS → BRANCH → ERROR → END
```

## Required Outputs

1. **Project Truth Document** - reconciled vision, validated requirements, aligned technical approach, success metrics
2. **Gap Analysis Report** - missing implementations, conflicting docs, architectural inconsistencies, journey breaks
3. **Coherent Architecture Blueprint** - component map, data flows, workflow charts, integration points
4. **Connected Implementation Plan** - exact build order with reasons, quality gates at each step, no parallel work until dependencies are met
5. **Unified Findings Register** - every finding gets an ID, severity or value, confidence, effort (S/M/L), affected layers/files, and dependencies on other findings by ID. Ordering: correctness defects on invariants, auth, transactions, state, and data integrity outrank everything; then remaining gaps; then opportunities by value/effort. Score each opportunity (user value, effort, risk, requires new abstraction? - bias strongly to no) with a verdict: **do / defer / reject**, each with a one-line reason. Rejected ideas with stated reasons are first-class output - they prevent re-proposal next run.

## Anti-Overengineering Constraints (non-negotiable)

- No new abstraction without at least two concrete, existing call sites. Hypothetical future call sites do not count.
- Prefer deletion over addition - if an improvement can be expressed as a simplification, express it that way.
- No configuration surfaces, options, or extension points for needs that do not exist yet.
- No speculative generality: no plugin systems, no "framework within the framework," no future-proofing.
- Half-built features: recommend complete or delete - never leave half.
- If two proposals conflict, prefer the one that leaves less code behind.

## Athens to Crete Validation

Before proceeding with ANY implementation:

- [ ] Can you explain the complete user journey?
- [ ] Are all dependencies logical and necessary?
- [ ] Would a new developer understand the architecture?
- [ ] Does the implementation match documented intent?
- [ ] Any "roads across seas" (impossible solutions)?
- [ ] Any "shipcopters" (overcomplicated inventions)?
- [ ] Identified the "boats" (existing solutions to leverage)?

## Remember: Semantic Coherence > Syntactic Correctness

We're not building code that compiles. We're building systems that make sense.
Every feature must be a bridge, not an island.
