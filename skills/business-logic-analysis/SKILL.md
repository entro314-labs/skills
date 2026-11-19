---
name: business-logic-analysis
description: "Extracts and documents the business logic and domain model of a codebase: entities, rules, workflows, validations and state transitions, as a structured report. Use when asked to analyze or document business rules or the domain of an existing project."
disable-model-invocation: true
---

# Business Logic & Domain Analysis Prompt

## Objective

Analyze this codebase to understand its business domain, core functionality, and business logic implementation. Generate actionable insights about business requirements alignment, workflow efficiency, and functional gaps.

## Analysis Framework

### 1. Business Domain Discovery

**Identify the core business domain:**

- What problem does this application solve?
- Who are the primary users/stakeholders?
- What industry/sector does it serve?
- What are the key business entities and relationships?

### 2. Core Functionality Mapping

**Document primary features and capabilities:**

- List main user-facing features
- Identify core business workflows and processes
- Map user journeys through the application
- Document data flows and business rules
- Identify integration points with external systems

### 3. Business Logic Assessment

**Evaluate implementation quality:**

- Are business rules consistently implemented?
- Is domain logic properly separated from technical concerns?
- Are validation rules comprehensive and correctly placed?
- Is business logic duplicated across different layers?
- Are there missing business rules or incomplete implementations?

### 4. User Experience & Workflow Analysis

**Assess functional effectiveness:**

- Are user workflows intuitive and efficient?
- Are there broken or incomplete user journeys?
- Do error messages provide meaningful business context?
- Are permission/authorization rules properly implemented?
- Are there usability issues affecting business operations?

### 5. Data & Business Model Evaluation

**Review data handling from business perspective:**

- Do data models accurately reflect business entities?
- Are business relationships properly modeled?
- Is data validation aligned with business requirements?
- Are there data consistency issues affecting business operations?
- Are audit trails and business reporting capabilities adequate?

## Key Issues to Identify

### Missing Business Logic

- Incomplete business rule implementations
- Missing validation for critical business scenarios
- Absent error handling for business exceptions
- Missing authorization checks for sensitive operations
- Incomplete audit trails for compliance requirements

### Business Logic Problems

- Business rules hardcoded in UI or database layers
- Inconsistent business rule enforcement across features
- Complex business logic buried in technical components
- Business workflows that don't match actual requirements
- Duplicate or conflicting business logic implementations

### Functional Gaps

- Features referenced but not implemented
- Incomplete user workflows or dead-end scenarios
- Missing integration with required external systems
- Inadequate reporting or analytics capabilities
- Missing administrative or management functions

### User Experience Issues

- Confusing or inefficient user workflows
- Missing feedback for critical business operations
- Inadequate error messaging for business scenarios
- Poor handling of edge cases in business processes
- Missing accessibility features required for compliance

## Report Structure

### Executive Summary

- Business domain overview and primary purpose
- Key functional strengths and critical gaps
- Priority business issues requiring attention
- Overall business logic health score

### Business Domain Analysis

- Core business entities and relationships
- Primary user roles and their workflows
- Key business processes and rules
- External integrations and dependencies

### Functional Assessment

**For each major business area:**

- **Complete Features**: Well-implemented functionality
- **Incomplete Features**: Partial implementations needing completion
- **Missing Features**: Required functionality that's absent
- **Problematic Features**: Existing functionality with business logic issues

### Business Logic Quality Review

- **Consistency**: Are business rules uniformly applied?
- **Location**: Is business logic in appropriate layers?
- **Completeness**: Are all business scenarios handled?
- **Clarity**: Is business intent clear in the code?

### Workflow Efficiency Analysis

- User journey effectiveness ratings
- Bottlenecks in business processes
- Areas where automation could improve efficiency
- Integration gaps affecting business operations

### Priority Recommendations

**High Priority (Business Critical):**

- Issues affecting core business operations
- Security/compliance gaps
- Data integrity problems

**Medium Priority (Efficiency):**

- Workflow improvements
- User experience enhancements
- Integration optimizations

**Low Priority (Enhancement):**

- Nice-to-have features
- Minor UX improvements
- Non-critical automation opportunities

### Implementation Roadmap

- Quick wins that improve business operations immediately
- Medium-term enhancements for efficiency gains
- Long-term strategic improvements
- Estimated business impact for each recommendation

## Deliverables

1. **Business Requirements Alignment Report**: How well does the current implementation match apparent business needs?
2. **Functional Gap Analysis**: What business functionality is missing or incomplete?
3. **Business Logic Health Assessment**: Quality and consistency of business rule implementation
4. **User Workflow Optimization Plan**: Recommendations for improving business process efficiency
5. **Priority Action List**: Ranked list of business-impact improvements with effort estimates

## Success Metrics

- Business logic consistency score
- Functional completeness percentage
- User workflow efficiency rating
- Business requirement alignment assessment
- Critical business issue count and severity
