---
description: Build a feature through the full architecture → strategy → implementation → validation pipeline
argument-hint: <feature to build>
---

# Build Connected System

For the feature: $ARGUMENTS

## Mandatory Process

### Step 1: Architecture (use the solution-architect agent)

- Map the complete solution
- Identify all dependencies
- Plan integration points

### Step 2: Strategy (use the implementation-strategist agent)

- Get build order
- Understand phases
- Know connection points

### Step 3: Implementation

- Follow the strategy EXACTLY
- Test connections at each step
- Don't skip ahead
- Anti-layering gate: every layer of indirection must justify its existence with actual work (branching, validation, transformation, or distinct error handling). No forwarding wrappers, fallback chains, compatibility adapters, or single-implementation abstractions - connect layers directly (see the athens-to-crete skill's `references/anti-indirection.md`)

### Step 4: Validation (use the coherence-validator agent)

- Check completeness
- Verify connections
- Fix disconnections

### Step 5: Flow Testing (use the flow-analyzer agent)

- Test complete journeys
- Verify all paths
- Ensure reachability

SKIP NO STEPS. Each depends on the previous.
