---
name: business-logic-analysis-nextjs
description: "Extracts business logic from a Next.js codebase: server actions, route handlers, middleware, data models and domain workflows, producing a structured domain report. Use when asked to analyze or document business rules in a Next.js app."
disable-model-invocation: true
---

# Business Logic Analysis Prompt for Next.js Codebases

You are tasked with performing a comprehensive business logic analysis of a Next.js 15.3 codebase using Supabase, Tailwind CSS, and Shadcn UI. Your goal is to understand the business domain, identify implemented business rules, discover gaps in business logic, and provide recommendations for business process completeness.

## Business Logic Analysis Framework

### 1. Business Domain Discovery

#### A. Core Business Entities Identification

- **Examine:** Database schema, TypeScript types, API models
- **Extract:**
  - Primary business entities (User, Product, Order, etc.)
  - Entity relationships and hierarchies
  - Business entity lifecycle states
  - Core business attributes and their constraints
- **Identify:**
  - The business domain(s) the application serves
  - Primary value propositions
  - Key business processes supported

#### B. User Roles and Personas Analysis

- **Examine:** Authentication systems, role-based access, UI variations
- **Map:**
  - Different user types and their capabilities
  - Permission matrices across features
  - User journey variations by role
  - Business rules specific to each user type
- **Identify:**
  - Missing user roles that business logic suggests should exist
  - Incomplete role implementations
  - Role hierarchy gaps

### 2. Business Rules and Validation Analysis

#### A. Data Validation Rules

- **Examine:** Validation schemas, database constraints, form validations
- **Catalog:**
  - Business rules embedded in validation logic
  - Data integrity requirements
  - Business constraints (min/max values, required relationships)
  - Custom validation rules that reflect business requirements
- **Identify:**
  - Inconsistent validation rules across layers
  - Missing business validations
  - Validation rules that don't match business requirements

#### B. Business Process Rules

- **Examine:** API route logic, custom hooks, utility functions
- **Extract:**
  - Workflow rules and state transitions
  - Business calculations and formulas
  - Conditional logic based on business criteria
  - Approval processes and authorization flows
- **Identify:**
  - Incomplete business processes
  - Missing state transition validations
  - Business rules implemented inconsistently

### 3. Business Workflow Analysis

#### A. User Journey Mapping

- **Examine:** Route structures, component flows, form sequences
- **Map:**
  - Complete user journeys from entry to goal completion
  - Decision points and branching logic
  - Required vs. optional steps in processes
  - Error and exception handling in business contexts
- **Identify:**
  - Incomplete user journeys
  - Missing business process steps
  - Broken or confusing workflow logic

#### B. Business Process Completeness

- **Examine:** CRUD operations, API endpoints, UI flows
- **Analyze:**
  - End-to-end business processes (e.g., order fulfillment, user onboarding)
  - Integration points between business processes
  - Business event handling and notifications
  - Audit trails and business logging
- **Identify:**
  - Missing process steps
  - Incomplete business integrations
  - Gaps in business event handling

### 4. Business Logic Implementation Patterns

#### A. Business Rule Location Analysis

- **Examine:** Where business logic is implemented across the stack
- **Map:**
  - Database-level business rules (triggers, constraints)
  - API-level business logic (route handlers, middleware)
  - Client-side business validations
  - Shared business logic in utilities
- **Identify:**
  - Business logic scattered across inappropriate layers
  - Duplicated business rules
  - Missing centralized business logic

#### B. Business Data Flow Analysis

- **Examine:** How business data moves through the system
- **Trace:**
  - Data creation, modification, and deletion patterns
  - Business calculations and derived data
  - Data aggregations for business reporting
  - Business metrics and KPI calculations
- **Identify:**
  - Incomplete business data flows
  - Missing business calculations
  - Inconsistent business data handling

### 5. Business Feature Completeness Analysis

#### A. Feature Gap Analysis

- **Examine:** Implemented features vs. apparent business needs
- **Compare:**
  - CRUD operations vs. business entity complexity
  - UI features vs. business process requirements
  - API capabilities vs. business workflow needs
  - Reporting features vs. business intelligence requirements
- **Identify:**
  - Missing business features
  - Partially implemented business capabilities
  - Features that don't align with business logic

#### B. Business Integration Analysis

- **Examine:** External integrations, third-party services, APIs
- **Map:**
  - Business integrations with external systems
  - Payment processing business logic
  - Communication and notification business rules
  - Business reporting and analytics integrations
- **Identify:**
  - Missing business integrations
  - Incomplete integration implementations
  - Business processes requiring external services

### 6. Business Security and Compliance Analysis

#### A. Business Authorization Rules

- **Examine:** Permission systems, access controls, business-level security
- **Analyze:**
  - Business-driven access restrictions
  - Data ownership and sharing rules
  - Business compliance requirements
  - Audit and compliance logging
- **Identify:**
  - Missing business authorization rules
  - Incomplete compliance implementations
  - Business security gaps

#### B. Business Data Protection

- **Examine:** Data handling, privacy implementations, business data policies
- **Check:**
  - Business data classification and handling
  - Privacy business rules (GDPR, etc.)
  - Data retention business policies
  - Business data sharing restrictions
- **Identify:**
  - Missing business data protection rules
  - Incomplete privacy implementations
  - Business compliance gaps

## Business Logic Report Structure

Generate a comprehensive business logic report with the following sections:

### 1. Business Domain Summary

- **Business Model Overview**
  - Core value proposition identified from codebase
  - Primary business entities and relationships
  - Revenue model indicators
  - Target user segments

- **Business Complexity Assessment**
  - Complexity score of business logic
  - Number of business entities and relationships
  - Depth of business rules implementation
  - Business process sophistication level

### 2. Business Rules Inventory

```
- Entity Business Rules
  - [Entity Name]: [List of business rules found]
  - Validation Rules: [Business validations implemented]
  - State Transition Rules: [Workflow rules identified]
  - Calculation Rules: [Business formulas and calculations]

- User Role Business Rules
  - [Role Name]: [Capabilities and restrictions]
  - Permission Rules: [Access control business logic]
  - Workflow Rules: [Role-specific business processes]

- Process Business Rules
  - [Process Name]: [Step-by-step business logic]
  - Approval Rules: [Authorization workflows]
  - Exception Rules: [Error handling business logic]
```

### 3. Business Logic Gaps Report

- **Missing Business Features**
  - Features suggested by data model but not implemented
  - Common business processes not found in UI
  - Expected integrations missing from business flows
  - Standard business validations not implemented

- **Incomplete Business Processes**
  - Processes with missing steps
  - Workflows without proper completion states
  - Business rules partially implemented
  - User journeys with dead ends

- **Business Rule Inconsistencies**
  - Conflicting business logic across layers
  - Inconsistent validation rules
  - Business calculations implemented differently
  - Role permissions with logical conflicts

### 4. Business Workflow Analysis

- **Complete User Journeys**
  - Successfully implemented end-to-end flows
  - Business processes with proper state management
  - Well-integrated business workflows

- **Broken or Incomplete Workflows**
  - User journeys with missing steps
  - Business processes without proper error handling
  - Workflows missing business logic validation
  - Processes without completion tracking

- **Business Process Optimization Opportunities**
  - Workflows that could be streamlined
  - Business rules that could be automated
  - Processes missing efficiency improvements
  - User experience gaps in business flows

### 5. Business Intelligence and Reporting Gaps

- **Missing Business Metrics**
  - KPIs that should be tracked based on business model
  - Business reporting capabilities not implemented
  - Analytics features missing from business processes
  - Dashboard components for business insights

- **Data Analysis Opportunities**
  - Business data not being utilized for insights
  - Potential business intelligence features
  - Missing business trend analysis
  - Opportunities for business process optimization

### 6. Business Scalability Analysis

- **Business Logic Scalability Issues**
  - Business rules that may not scale
  - Performance bottlenecks in business processes
  - Business logic that needs architectural changes
  - Scalability constraints in business workflows

- **Business Model Evolution Readiness**
  - Flexibility for business rule changes
  - Extensibility for new business features
  - Adaptability to business model pivots
  - Support for business growth scenarios

### 7. Business Risk Assessment

- **Business Logic Risks**
  - Critical business processes with single points of failure
  - Business rules without proper validation
  - Business data integrity risks
  - Business workflow security vulnerabilities

- **Compliance and Audit Risks**
  - Missing business audit trails
  - Compliance requirements not met
  - Business data handling risks
  - Regulatory compliance gaps

### 8. Business Logic Recommendations

#### Immediate Actions (Critical Business Gaps)

- Critical business processes to implement
- Essential business validations to add
- High-risk business logic issues to fix
- Urgent business workflow completions

#### Short-term Improvements (Business Enhancement)

- Business features to prioritize for development
- Business process optimizations to implement
- Business rule consolidations to perform
- Business integration improvements to make

#### Long-term Business Strategy (Strategic Business Logic)

- Business architecture improvements for scalability
- Business intelligence capabilities to develop
- Business model flexibility enhancements
- Business process automation opportunities

## Analysis Instructions

1. **Start with business entity mapping** - Understand what business the application serves
2. **Follow business workflows** - Trace complete business processes from start to finish
3. **Identify business rules** - Extract implicit and explicit business logic
4. **Check business completeness** - Verify that business processes are fully implemented
5. **Analyze business patterns** - Look for consistent business logic implementation
6. **Consider business evolution** - Assess readiness for business changes and growth
7. **Evaluate business risks** - Identify critical business logic vulnerabilities
8. **Prioritize business value** - Focus on business logic that impacts core value delivery

## Output Format

Provide the business analysis in a structured markdown report with:

- Business-focused language accessible to stakeholders
- Clear business impact assessments
- Specific business scenarios and use cases
- Business value prioritization (High, Medium, Low business impact)
- Actionable business recommendations with implementation guidance
- Business metrics to track improvement success

Focus on being business-oriented, value-driven, and strategic in your analysis while maintaining technical accuracy.
