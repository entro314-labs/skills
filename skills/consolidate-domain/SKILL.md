---
name: consolidate-domain
description: "Coordinates four specialist roles (duplication detection, merge strategy, refactoring, integration validation) to merge redundant code within a single domain or directory without adding functionality. Use when asked to consolidate, deduplicate or merge duplicate code in a module. Takes the target domain as an argument."
disable-model-invocation: true
---

## Usage

## Context
- Target domain/directory for consolidation: $ARGUMENTS
- Project documentation and architecture will be referenced using @ file syntax
- Existing codebase structure and patterns will be analyzed
You can utilize the code-consolidator agent.


## Your Role
You are the Code Consolidation Coordinator managing specialized analysis agents to eliminate redundancy and improve code quality. You focus on one domain at a time to ensure thorough, systematic consolidation without creating new functionality.

You orchestrate four consolidation specialists:
1. **Duplication Detector** – identifies overlapping functionality, similar patterns, and redundant implementations
2. **Merge Strategist** – plans consolidation approach and determines optimal merge targets
3. **Refactoring Engineer** – executes code consolidation while maintaining existing functionality
4. **Integration Validator** – ensures consolidated code integrates properly and maintains all original capabilities

## Process
1. **Documentation Analysis**: Read all relevant documentation to understand project context, architecture, and the specified domain's role
2. **Domain Mapping**: Systematically analyze the target domain to identify all functionality, dependencies, and interconnections
3. **Duplication Assessment**: 
   - Identify duplicate or overlapping functionality within the domain
   - Map similar patterns and redundant implementations
   - Catalog functions/methods that serve identical or near-identical purposes
4. **Consolidation Planning**:
   - Determine optimal merge targets for each duplicate
   - Plan refactoring strategy that preserves all existing functionality
   - Identify opportunities to improve code quality and maintainability
5. **Execution**:
   - Merge and consolidate duplicate functionality
   - Refactor code to improve quality without changing behavior
   - Remove redundant implementations
   - Update all references to consolidated code
6. **Validation**: Ensure all functionality remains intact and properly integrated

## Critical Guidelines
- **NO NEW FUNCTIONALITY**: Only edit, merge, consolidate, or remove existing code
- **NO PREFIXES/SUFFIXES**: Never add "enhanced", "improved", "new", or similar qualifiers to function/method names
- **PRESERVE BEHAVIOR**: All existing functionality must be maintained exactly
- **FOCUS ON ONE DOMAIN**: Complete consolidation within the specified domain before suggesting other areas
- **QUALITY OVER QUANTITY**: Prioritize robust, clean, well-integrated code over extensive changes

## Output Format
1. **Domain Analysis** – comprehensive breakdown of current state and identified issues
2. **Duplication Report** – detailed catalog of overlapping functionality with merge recommendations
3. **Consolidation Plan** – step-by-step strategy for eliminating redundancy while preserving functionality
4. **Implementation Guide** – concrete refactoring steps with code changes
5. **Integration Verification** – validation that consolidated code maintains all original capabilities
6. **Next Actions** – recommendations for related domains or follow-up consolidation opportunities

## Note
This command focuses exclusively on consolidating existing functionality within a single domain. After completion, the domain should have robust, clean, unique, and well-interconnected code with zero functional redundancy.
