---
name: business-codebase-alignment
description: "Assesses how well a codebase implements the business model: maps business requirements to code, finds gaps, misalignments and unimplemented rules, and produces a scored alignment report. Use when asked to check whether the code matches the business plan or product requirements."
disable-model-invocation: true
---

# Business-Codebase Alignment Assessment Prompt

You are tasked with analyzing the alignment between business logic requirements and technical implementation in a Next.js 15.3 codebase. Your goal is to identify misalignments, over-engineering, under-engineering, and opportunities to better serve business objectives through technical improvements.

## Alignment Analysis Framework

### 1. Business-Technical Mapping Analysis

#### A. Business Entity to Data Model Alignment

- **Compare:** Business entities (identified from domain analysis) vs. database schema
- **Assess:**
  - Entity relationship accuracy (do technical relationships match business relationships?)
  - Attribute completeness (are all business-critical attributes captured?)
  - Data type appropriateness (do technical types support business requirements?)
  - Constraint alignment (do database constraints enforce business rules?)
- **Identify:**
  - Business entities poorly represented in data models
  - Over-normalized or under-normalized data structures
  - Technical constraints that don't match business rules
  - Missing business relationships in technical implementation

#### B. Business Process to Code Flow Alignment

- **Compare:** Business workflows vs. technical implementation paths
- **Trace:**
  - Business process steps → API endpoints → UI components
  - Decision points in business logic → conditional code implementation
  - Business validations → technical validation implementation
  - Business exceptions → error handling code
- **Identify:**
  - Business processes not reflected in code structure
  - Technical complexity that doesn't serve business needs
  - Missing technical support for business decision points
  - Code flows that contradict business logic

### 2. User Experience to Business Goal Alignment

#### A. User Journey vs. Business Process Alignment

- **Compare:** Intended business user journeys vs. implemented UI flows
- **Analyze:**
  - Business goal achievement through UI design
  - User friction points that impact business objectives
  - UI complexity relative to business process complexity
  - User experience optimization for business KPIs
- **Identify:**
  - UI flows that don't support business goals
  - Missing UI elements for critical business processes
  - Over-complicated interfaces for simple business tasks
  - Under-designed interfaces for complex business needs

#### B. Feature Priority vs. Implementation Effort Alignment

- **Compare:** Business feature importance vs. technical implementation quality
- **Assess:**
  - High-business-value features with poor technical implementation
  - Low-business-value features with over-engineering
  - Business-critical features with technical debt
  - Nice-to-have features consuming disproportionate resources
- **Identify:**
  - Misaligned development priorities
  - Technical investment not matching business value
  - Business bottlenecks caused by technical limitations
  - Over-engineered solutions for simple business needs

### 3. Scalability Alignment Analysis

#### A. Business Growth vs. Technical Scalability

- **Compare:** Business scaling plans vs. technical architecture scalability
- **Evaluate:**
  - Data model scalability for business growth scenarios
  - API design scalability for increased business volume
  - UI performance for growing user bases
  - Business logic complexity vs. technical performance
- **Identify:**
  - Technical bottlenecks that will limit business growth
  - Over-engineered solutions for current business scale
  - Under-engineered solutions that won't support business growth
  - Architectural decisions that don't match business trajectory

#### B. Business Flexibility vs. Technical Adaptability

- **Compare:** Business model flexibility needs vs. code modularity
- **Assess:**
  - Configuration vs. hard-coded business rules
  - Extensibility for new business features
  - Technical debt that inhibits business changes
  - Architecture flexibility for business pivots
- **Identify:**
  - Rigid technical implementations limiting business agility
  - Over-flexible architectures without clear business justification
  - Hard-coded business logic that should be configurable
  - Technical decisions that lock in business assumptions

### 4. Performance vs. Business Requirements Alignment

#### A. Technical Performance vs. Business Performance Needs

- **Compare:** System performance metrics vs. business performance requirements
- **Analyze:**
  - Page load times vs. user experience business goals
  - API response times vs. business process efficiency needs
  - Database query performance vs. business reporting requirements
  - Real-time features vs. business collaboration needs
- **Identify:**
  - Performance bottlenecks impacting business operations
  - Over-optimization in areas with low business impact
  - Under-optimization in business-critical areas
  - Performance metrics not aligned with business KPIs

#### B. Resource Investment vs. Business Value Alignment

- **Compare:** Technical resource allocation vs. business priority areas
- **Evaluate:**
  - Development time spent on features vs. business impact
  - Technical complexity vs. business requirement complexity
  - Code maintenance effort vs. business feature usage
  - Infrastructure costs vs. business value generated
- **Identify:**
  - Resource misallocation between technical and business priorities
  - High-maintenance code for low-business-value features
  - Under-resourced technical areas supporting high-business-value features
  - Cost-inefficient technical solutions for business requirements

### 5. Security and Compliance Alignment

#### A. Business Risk vs. Technical Security Implementation

- **Compare:** Business risk assessment vs. technical security measures
- **Analyze:**
  - Business data sensitivity vs. protection implementation
  - Business compliance requirements vs. technical compliance features
  - Business user access needs vs. authentication/authorization implementation
  - Business audit requirements vs. logging and monitoring implementation
- **Identify:**
  - Over-secured areas with low business risk
  - Under-secured areas with high business risk
  - Security implementations that hinder business processes
  - Missing security for business-critical functions

#### B. Regulatory Requirements vs. Technical Compliance

- **Compare:** Business regulatory needs vs. technical compliance implementation
- **Check:**
  - Data handling regulations vs. technical data processing
  - Industry compliance requirements vs. technical implementations
  - Business audit trails vs. technical logging capabilities
  - Regulatory reporting needs vs. technical reporting features
- **Identify:**
  - Compliance gaps that pose business risks
  - Over-compliance creating unnecessary technical complexity
  - Technical implementations that don't meet regulatory standards
  - Missing technical support for compliance reporting

### 6. Integration Alignment Analysis

#### A. Business Ecosystem vs. Technical Integration Strategy

- **Compare:** Business partner/vendor relationships vs. technical integrations
- **Evaluate:**
  - Business workflow integrations vs. API integrations
  - Business data sharing needs vs. technical data exchange capabilities
  - Business process automation vs. technical automation implementation
  - Business communication needs vs. technical notification systems
- **Identify:**
  - Missing technical integrations for business partnerships
  - Over-integrated systems with limited business value
  - Integration complexity that doesn't match business relationship complexity
  - Business bottlenecks caused by poor technical integrations

## Business-Codebase Alignment Report Structure

### 1. Executive Alignment Summary

- **Overall Alignment Score** (1-10 scale)
  - Business-Technical Harmony Index
  - Critical Misalignment Areas
  - Alignment Strength Areas
  - Business Impact of Misalignments

- **Strategic Alignment Assessment**
  - Does technical architecture support business strategy?
  - Are development priorities aligned with business priorities?
  - Is technical complexity justified by business complexity?
  - Are technical investments generating expected business value?

### 2. Critical Misalignment Issues

```
- High Business Impact + Poor Technical Implementation
  - Feature: [Business critical feature]
  - Business Need: [What business requires]
  - Technical Reality: [How it's currently implemented]
  - Impact: [Business consequences]
  - Recommendation: [Technical improvement needed]

- Over-Engineering Issues
  - Feature: [Over-engineered feature]
  - Business Need: [Simple business requirement]
  - Technical Implementation: [Complex solution]
  - Impact: [Waste of resources/maintenance burden]
  - Recommendation: [Simplification approach]

- Under-Engineering Issues
  - Feature: [Under-engineered feature]
  - Business Need: [Complex business requirement]
  - Technical Implementation: [Insufficient solution]
  - Impact: [Business limitations/future scalability issues]
  - Recommendation: [Technical enhancement needed]
```

### 3. Business Value vs. Technical Investment Analysis

- **High Business Value, Low Technical Investment**
  - Features that could significantly impact business with minimal technical effort
  - Quick wins for business improvement
  - Low-hanging fruit for development team

- **High Business Value, High Technical Investment**
  - Strategic technical initiatives that require significant investment
  - Business-critical improvements that justify major development effort
  - Long-term technical foundations for business growth

- **Low Business Value, High Technical Investment**
  - Over-engineered features consuming disproportionate resources
  - Technical debt in areas with limited business impact
  - Opportunities for technical simplification

- **Low Business Value, Low Technical Investment**
  - Nice-to-have features with appropriate technical implementation
  - Areas for potential feature removal or consolidation
  - Maintenance-mode features

### 4. User Experience Alignment Assessment

- **Business Goal Achievement Through UX**
  - UI flows that successfully drive business objectives
  - User experience elements that support business KPIs
  - Interface design aligned with business user needs

- **UX-Business Misalignments**
  - User interfaces that hinder business processes
  - Missing UI elements for business-critical tasks
  - User experience friction impacting business conversion
  - Interface complexity not justified by business requirements

### 5. Scalability and Future Readiness

- **Business Growth Readiness**
  - Technical architecture prepared for business scaling scenarios
  - Potential technical bottlenecks for business growth
  - Scalability investments aligned with business projections

- **Business Agility Support**
  - Technical flexibility for business model changes
  - Architecture adaptability for new business requirements
  - Technical debt limiting business agility

### 6. Performance and Efficiency Alignment

- **Business Performance Requirements vs. Technical Performance**
  - System performance meeting business operational needs
  - Performance optimization aligned with business priorities
  - Resource efficiency supporting business cost objectives

- **Development Efficiency vs. Business Delivery Speed**
  - Technical practices supporting business delivery timelines
  - Development bottlenecks impacting business feature delivery
  - Technical debt affecting business responsiveness

### 7. Risk and Compliance Alignment

- **Business Risk Coverage**
  - Technical security measures addressing business risks
  - Compliance implementations meeting business regulatory needs
  - Risk mitigation strategies aligned with business priorities

- **Risk-Effort Balance**
  - Security investments proportional to business risk levels
  - Compliance efforts matching regulatory business requirements
  - Risk management technical implementations with clear business justification

### 8. Alignment Improvement Roadmap

#### Immediate Alignment Fixes (0-3 months)

- Critical business features with simple technical fixes
- Over-engineered solutions that can be simplified quickly
- Missing technical elements blocking business processes
- Performance issues directly impacting business operations

#### Strategic Alignment Initiatives (3-12 months)

- Major technical investments for high-business-value features
- Architecture improvements for business scalability
- Technical debt reduction in business-critical areas
- Integration improvements for business process optimization

#### Long-term Business-Technical Strategy (12+ months)

- Technical foundation improvements for long-term business strategy
- Architecture evolution for business model flexibility
- Technology platform improvements for competitive business advantage
- Technical capability development for future business opportunities

## Analysis Instructions

1. **Map business requirements to technical implementation** - Create direct connections between business needs and code
2. **Assess value alignment** - Evaluate if technical effort matches business value
3. **Identify efficiency opportunities** - Find areas where better alignment could improve both business and technical outcomes
4. **Consider total cost of ownership** - Include maintenance, scalability, and evolution costs in alignment assessment
5. **Evaluate user impact** - Assess how technical decisions affect business user experience
6. **Check strategic alignment** - Ensure technical architecture supports long-term business strategy
7. **Prioritize by business impact** - Focus alignment improvements on areas with highest business value potential

## Output Format

Provide the alignment analysis in a structured markdown report with:

- Clear business impact assessments for each misalignment
- Quantified alignment scores where possible
- Specific examples of misalignment with code references
- Business value justification for each recommendation
- Implementation effort vs. business benefit analysis
- Priority levels based on business impact and technical effort
- Actionable roadmap items with clear business outcomes

Focus on being strategic, value-driven, and practical in your alignment assessment while providing specific technical guidance.
