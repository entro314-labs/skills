---
name: migration-refactoring-analysis
description: "Analyzes a codebase in preparation for a migration or large refactor: inventories legacy patterns, dependencies and risks, and produces a phased migration plan. Use when planning a framework migration, version upgrade or major refactor."
disable-model-invocation: true
---

# Codebase Analysis Prompt for Migration & Refactoring Projects

## Analysis Objective

Conduct a thorough exploration of this codebase to identify migration/refactoring opportunities, focusing on legacy code, duplications, and architectural improvements. Generate a comprehensive report highlighting obsolete elements, redundancies, and modernization recommendations.

## Exploration Strategy

### 1. Initial Overview

- List all top-level directories and their purpose
- Identify key configuration files (package.json, tsconfig.json, etc.)
- Understand the project's tech stack, frameworks, and libraries
- Identify entry points to the application
- **Flag deprecated dependencies and outdated library versions**
- **Identify configuration for obsolete tooling or build systems**

### 2. Architecture Analysis

- Map the overall architecture (frontend/backend separation, microservices, etc.)
- Identify patterns used (MVC, MVVM, Clean Architecture, etc.)
- Document the dependency graph between major components
- Analyze the communication patterns between components
- **Identify architectural anti-patterns that should be refactored**
- **Detect misaligned architectural patterns mixing old and new approaches**
- **Map legacy systems integrated with newer components**

### 3. Business Logic Exploration

- Identify core domain models and entities
- Map business workflows and processes
- Understand authorization and permissions models
- Document business rules and validations
- **Flag outdated business logic that may no longer align with requirements**
- **Identify logic duplicated across legacy and modern components**
- **Detect business rules implemented inconsistently across the codebase**

### 4. Frontend Analysis

- Evaluate component structure and hierarchy
- Analyze state management approach
- Check routing implementation
- Review UI/UX patterns and consistency
- Assess responsiveness and accessibility
- Verify frontend-backend integration points
- **Identify legacy UI frameworks coexisting with modern ones**
- **Flag deprecated frontend libraries and outdated patterns**
- **Detect mixing of multiple component paradigms (class vs. functional)**
- **Identify inconsistent styling approaches across components**

### 5. Backend Analysis

- Examine API structure and RESTfulness
- Review database schema and relationships
- Analyze data access patterns
- Check authentication mechanisms
- Evaluate error handling and logging
- Assess performance optimization techniques
- **Identify legacy API endpoints and outdated patterns**
- **Detect multiple authentication mechanisms from different eras**
- **Flag deprecated backend libraries and frameworks**
- **Identify inconsistent API design patterns**

### 6. Code Quality Assessment

- Check for consistent coding standards
- Identify code duplication
- Assess test coverage and quality
- Review error handling practices
- Evaluate comments and documentation
- Check for security vulnerabilities
- **Flag code with outdated syntax predating modern language features**
- **Identify technical debt markers (TODO, FIXME, HACK comments)**
- **Detect commented-out functionality that should be removed**

## Migration-Specific Issues to Identify

### Legacy Code Elements

- Deprecated API usage and library calls
- Outdated language syntax that could be modernized
- Code using obsolete design patterns
- References to deprecated features/libraries
- Code targeting outdated browser/environment requirements
- Functions duplicating modern library capabilities
- Logic addressing outdated business requirements

### Version Inconsistencies

- Mixed version dependencies of the same library
- Inconsistent TypeScript/JavaScript feature usage
- Mixing of legacy and modern frameworks
- Inconsistent API versioning
- Different versions of the same component or utility
- Parallel implementations using different stacks

### Duplicate and Overlapping Functionality

- Multiple implementations of the same feature with different technologies
- Utilities reimplemented in different modules
- Business logic duplicated across frontend and backend
- Redundant validation logic
- Overlapping components with similar functionality
- Copy-pasted code blocks with minor variations
- Multiple solutions to the same problem in different areas
- Parallel implementations from different development eras

### Technical Debt Indicators

- Comments indicating temporary solutions
- Code marked with "TODO", "FIXME", "HACK"
- Excessive complexity in specific modules
- Inconsistent patterns indicating emergency fixes
- Abnormally large files or functions
- High cyclomatic complexity
- Functions with numerous parameters
- Dead code paths that are never executed

### Migration Path Blockers

- Tightly coupled components preventing incremental refactoring
- Critical features without adequate test coverage
- Undocumented dependencies between components
- Custom patches to third-party libraries
- Hardcoded configuration values that should be environment variables
- Browser/environment-specific code that's difficult to abstract
- Inconsistent error handling that could break during migration

## Refactoring Opportunity Assessment

### Code Modernization

- ES5 -> ES6+ syntax upgrades
- Class components -> functional components with hooks
- Callback patterns -> Promise/async-await
- Traditional CSS -> CSS-in-JS or utility classes
- Traditional bundling -> modern build systems
- Legacy state management -> modern alternatives

### Architectural Refactoring

- Monolith -> microservices opportunities
- Class inheritance -> composition patterns
- Tightly coupled -> loosely coupled components
- Global state -> contextualized state
- Direct API calls -> abstracted data services
- Complex components -> atomic design patterns

### Technology Migration Paths

- For each outdated library/framework, identify:
  - Modern equivalent technology
  - Migration complexity (simple, moderate, complex)
  - Migration approach (incremental vs. complete rewrite)
  - Risks associated with the migration
  - Potential interim hybrid approach

## Report Structure

### 1. Executive Summary

- Overview of the codebase migration readiness
- Key legacy systems and technical debt
- Critical migration/refactoring priorities
- High-level modernization roadmap

### 2. Legacy System Assessment

- Inventory of deprecated technologies
- Evaluation of outdated architectural patterns
- Assessment of legacy code quality and maintainability
- Heat map of technical debt concentration
- Version incompatibilities and conflicts

### 3. Duplication Analysis

- Map of duplicate functionality across the codebase
- Assessment of inconsistent implementations
- Overlapping utilities and helpers
- Redundant business logic implementations
- Parallel systems serving similar purposes

### 4. Detailed Migration Findings

For each category (frontend, backend, business logic, etc.):

- Legacy elements to replace (high priority)
- Duplicate systems to consolidate (medium priority)
- Technical debt to address (priority based on impact)
- Each finding should include:
  - Issue description
  - Location in codebase
  - Current vs. modern approach
  - Suggested refactoring strategy
  - Migration complexity estimate (simple, moderate, complex)
  - Dependencies and risks

### 5. Refactoring Roadmap

- Phased migration approach
- Dependencies between refactoring efforts
- Critical path for migration
- Suggested order of components to refactor
- Potential interim solutions during migration
- Testing strategy for refactored components

### 6. Migration Metrics

- Estimated effort by component
- Technical debt reduction projections
- Modernization impact assessment
- Code quality improvement projections
- Performance/maintenance improvement estimates

### 7. Modernization Best Practices

- Recommended patterns for the refactored codebase
- Coding standards for new implementations
- Testing requirements for migrated components
- Documentation needs for the modernized system

## Documentation Generation

### README.md

Generate a comprehensive README.md file that includes:

- Project title and description
- Current and target technology stack
- Project structure explanation
- Migration status indicators
- Prerequisites and dependencies
- Installation and setup instructions
- Environment configuration
- Development workflow (start, build, test commands)
- Migration/refactoring guidelines
- Key features and capabilities
- API overview (including legacy and modern endpoints)
- Testing approach
- Contributing guidelines for the refactoring effort
- Troubleshooting common migration issues
- License information
- Credits and acknowledgments

### Documentation File

Create a detailed documentation.md file covering:

1. **Architecture Documentation**
   - Current vs. target architecture comparison
   - Legacy component identification
   - Migration strategy for each architectural component
   - Dependency graph highlighting refactoring impact

2. **Frontend Documentation**
   - Legacy vs. modern component inventory
   - State management migration approach
   - UI/UX modernization strategy
   - Third-party integration updates
   - Build system migration path

3. **Backend Documentation**
   - API modernization strategy
   - Authentication system updates
   - Legacy endpoint handling approach
   - Data migration considerations
   - Performance optimization opportunities

4. **Database Documentation**
   - Schema evolution strategy
   - Data migration approach
   - Query optimization for new patterns
   - ORM/data access modernization
   - Redundant data identification

5. **Migration Process**
   - Refactoring strategy and phases
   - Testing approach for refactored components
   - Feature parity validation
   - Rollback procedures
   - Parallel operation considerations

6. **Testing Strategy**
   - Test coverage for legacy code
   - Testing approach for refactored components
   - Regression testing strategy
   - Performance comparison methodology
   - Migration validation testing

7. **Maintenance During Migration**
   - Guidelines for hybrid codebase maintenance
   - Feature freeze recommendations
   - Dealing with bugs in legacy code
   - Documentation of interim solutions
   - Training needs for the team

Ensure both files are well-formatted with proper Markdown syntax, including headings, lists, code blocks, and tables where appropriate.

## Pre-Implementation Verification

For each modernization or refactoring recommendation:

- Verify if similar modern implementations already exist elsewhere in the codebase
- Check if there are abandoned or incomplete migration attempts
- Assess if existing utilities or libraries could fulfill the need
- Confirm that the recommended approach aligns with the target architecture
- Validate that the recommended implementation doesn't create new duplications
- Evaluate backward compatibility requirements
- Consider data migration implications

## Additional Instructions

- Provide concrete code examples comparing legacy and modern approaches
- Include line numbers and file paths for specific issues
- Prioritize high-impact, low-risk refactoring opportunities
- Focus on actionable insights rather than minor stylistic preferences
- Acknowledge assumptions made during the analysis
- Highlight potential risks associated with each refactoring recommendation
- Identify "quick wins" that can demonstrate migration value early
- For large legacy systems, suggest incremental migration approaches
- Recommend appropriate testing strategies for each refactoring suggestion
