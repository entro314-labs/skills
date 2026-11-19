---
name: business-technical-alignment
description: "Evaluates whether the technical architecture and stack choices support the business goals, scale and revenue model, and reports risks and recommendations. Use when asked to review tech choices against business strategy."
disable-model-invocation: true
---

# Business-Technical Alignment Analysis Prompt

## Objective

Analyze the alignment between business requirements and technical implementation to identify gaps, misalignments, and optimization opportunities. Evaluate how well the technical architecture serves business needs and vice versa.

## Analysis Framework

### 1. Business-Technical Mapping

**Map business processes to technical implementation:**

- How do business workflows translate to code execution paths?
- Which technical components support each business capability?
- Are business entities properly reflected in data models and APIs?
- Do technical boundaries align with business domain boundaries?
- Are business rules consistently implemented across technical layers?

### 2. Performance-Business Impact Assessment

**Evaluate how technical performance affects business operations:**

- Do slow database queries impact critical business processes?
- Are API response times affecting user productivity or conversion rates?
- Does system downtime correlate with business-critical periods?
- Are performance bottlenecks blocking business growth or scalability?
- Do technical limitations force inefficient business workarounds?

### 3. Security-Compliance Alignment

**Assess how technical security supports business compliance:**

- Do authentication mechanisms match business access control requirements?
- Are data encryption practices aligned with business compliance needs (GDPR, HIPAA, etc.)?
- Do audit trails capture business-required information?
- Are API security measures appropriate for business data sensitivity?
- Do backup and recovery procedures meet business continuity requirements?

### 4. Scalability-Growth Alignment

**Evaluate technical scalability against business growth plans:**

- Can the current architecture support projected business growth?
- Are database designs capable of handling expected data volumes?
- Do technical resource limits align with business capacity planning?
- Are integration capabilities sufficient for business expansion plans?
- Can the system handle seasonal or event-driven business spikes?

### 5. Technology-Feature Alignment

**Assess how technology choices enable or limit business features:**

- Are chosen frameworks optimal for required business functionality?
- Do technical dependencies limit business feature development speed?
- Are there over-engineered solutions for simple business needs?
- Are there under-engineered solutions for complex business requirements?
- Do technology constraints force business process compromises?

## Key Alignment Issues to Identify

### Business Needs Not Met by Technology

- Business requirements that lack technical implementation
- Manual processes that could be automated but aren't
- Business integrations blocked by technical limitations
- User experience problems caused by technical constraints
- Business reporting needs not supported by data architecture

### Technology Capabilities Not Utilized by Business

- Advanced technical features that business processes don't leverage
- Over-complex technical solutions for simple business needs
- Unused API endpoints or database capabilities
- Technical performance optimizations that don't benefit business operations
- Security features implemented but not aligned with business policies

### Misaligned Implementations

- Business logic scattered across inappropriate technical layers
- Database schemas that don't reflect business entity relationships
- API designs that don't match business workflow patterns
- Error handling that doesn't provide business-meaningful feedback
- Technical abstractions that obscure rather than clarify business intent

### Critical Gaps

- Business-critical processes with inadequate technical support
- Single points of failure in business-essential technical components
- Security gaps in business-sensitive data handling
- Performance bottlenecks in high-business-impact areas
- Integration failures affecting business partner relationships

## Analysis Areas

### Data Flow Alignment

**Business Data Journey vs. Technical Data Flow:**

- Do data transformations preserve business meaning?
- Are data validation rules aligned with business requirements?
- Do database relationships reflect business entity relationships?
- Are data access patterns optimized for business query needs?
- Is data consistency maintained across business process boundaries?

### User Experience vs. Technical Architecture

**How technical decisions impact business user productivity:**

- Do technical response times meet business user expectations?
- Are error messages technically accurate but business-meaningless?
- Do technical limitations create confusing business workflows?
- Are technical features accessible to business users who need them?
- Do technical updates disrupt established business processes?

### Integration Alignment

**Business ecosystem vs. Technical integration capabilities:**

- Do API designs support business partner integration requirements?
- Are external integrations aligned with business process timing?
- Do technical integration patterns match business relationship models?
- Are data synchronization strategies appropriate for business needs?
- Do integration failure modes have appropriate business fallbacks?

### Compliance and Governance Alignment

**Business policies vs. Technical implementation:**

- Are technical access controls aligned with business roles?
- Do technical audit capabilities meet business compliance requirements?
- Are data retention policies technically implemented as business requires?
- Do technical monitoring capabilities provide business-relevant insights?
- Are technical recovery procedures aligned with business continuity plans?

## Report Structure

### Executive Summary

- Overall business-technical alignment score
- Critical misalignment areas requiring immediate attention
- Key opportunities for improved business outcomes through technical changes
- Technical constraints significantly limiting business capabilities

### Business Impact Assessment

**For each major business area:**

- **Well-Supported**: Business processes with strong technical support
- **Partially Supported**: Areas with technical gaps affecting business efficiency
- **Poorly Supported**: Business needs with inadequate technical implementation
- **Over-Engineered**: Areas with technical complexity exceeding business needs

### Technical Capability Analysis

**For each major technical component:**

- **Business-Aligned**: Technical features that directly enable business value
- **Business-Neutral**: Technical features with indirect business impact
- **Business-Misaligned**: Technical implementations that hinder business operations
- **Unutilized Potential**: Technical capabilities not leveraged by business processes

### Critical Alignment Issues

**High Priority (Business-Critical):**

- Technical failures blocking business operations
- Security gaps exposing business risks
- Performance issues affecting business metrics
- Integration failures disrupting business partnerships

**Medium Priority (Efficiency):**

- Technical inefficiencies slowing business processes
- Missing automation for repetitive business tasks
- Suboptimal technical designs affecting business scalability
- User experience issues reducing business productivity

**Low Priority (Optimization):**

- Technical over-engineering consuming resources unnecessarily
- Minor performance optimizations with minimal business impact
- Technical modernizations with long-term business benefits
- Enhanced monitoring for business operations insights

### Optimization Roadmap

**Phase 1 (0-2 months) - Critical Alignments:**

- Fix technical issues blocking business operations
- Implement missing technical support for critical business processes
- Address security gaps affecting business compliance

**Phase 2 (2-6 months) - Efficiency Improvements:**

- Optimize technical performance for business-critical workflows
- Automate manual business processes with appropriate technical solutions
- Improve technical integrations supporting business partnerships

**Phase 3 (6-12 months) - Strategic Alignment:**

- Refactor technical architecture to better support business domain model
- Implement technical capabilities enabling planned business expansion
- Modernize technical stack to support evolving business requirements

### Success Metrics and KPIs

- Business process completion time improvements
- Reduction in business workarounds caused by technical limitations
- Increase in business feature delivery velocity
- Improvement in business user satisfaction with technical capabilities
- Business compliance score improvements through technical enhancements

## Deliverables

1. **Business-Technical Alignment Matrix**: Visual mapping of business needs to technical capabilities
2. **Critical Gap Analysis**: Priority list of misalignments with business impact assessment
3. **Optimization Opportunities Report**: Technical changes with quantified business benefits
4. **Strategic Alignment Plan**: Long-term roadmap for better business-technical integration
5. **Performance-Business Impact Analysis**: How technical metrics correlate with business outcomes
