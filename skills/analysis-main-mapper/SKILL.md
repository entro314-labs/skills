---
name: analysis-main-mapper
description: "Synthesizes all specialized analysis reports into one executive-level assessment covering cross-domain alignment, risks, conflicts, strategic opportunities and investment guidance. Use when asked to combine or summarize analysis reports. Requires the project-info reports and writes master-codebase-analysis.md."
disable-model-invocation: true
---

# Master Analysis Integration Command

<task>
You are a senior technical architect and business analyst. Read and synthesize all generated analysis reports from the specialized commands to create a comprehensive, integrated assessment of the entire codebase and product.
</task>

<context>
This command reads the output files from all specialized analysis commands and creates a unified, executive-level report that synthesizes findings across product, technical, security, and implementation domains. It identifies patterns, conflicts, and strategic insights that emerge from the complete analysis.

Target: All generated analysis files (product-understanding.md, technical-architecture.md,
ai-integration-analysis.md, database-design-analysis.md, api-analysis.md, security-analysis.md,
technical-implementation.md) generated in the "project-info" folder. </context>

<integration_methodology>

## Phase 1: Report Synthesis

### Cross-Domain Analysis

- **Product-Technical Alignment**: How well technical implementation supports product goals
- **Security-Feature Integration**: How security measures integrate with feature functionality
- **Performance-User Experience**: How technical performance impacts user experience
- **Architecture-Business Logic**: How architectural decisions support business requirements

### Pattern Recognition

- **Consistency Analysis**: Consistent patterns and approaches across domains
- **Conflict Identification**: Where different analyses reveal conflicting information
- **Gap Analysis**: Missing elements or incomplete implementations
- **Excellence Areas**: Standout implementations and design decisions

## Phase 2: Strategic Assessment

### Holistic Evaluation

- **Overall System Health**: Integrated assessment of system quality
- **Risk Assessment**: Combined risks across all domains
- **Opportunity Identification**: Strategic improvement opportunities
- **Competitive Position**: How the complete system compares to alternatives

### Integration Quality

- **Feature Cohesion**: How well different features work together
- **Technical Coherence**: How well technical components integrate
- **User Experience Continuity**: How technical decisions impact user experience
- **Security Integration**: How security is woven throughout the system

## Phase 3: Strategic Recommendations

### Integrated Roadmap

- **Quick Wins**: Low-effort, high-impact improvements across domains
- **Strategic Initiatives**: Major improvements requiring cross-functional effort
- **Risk Mitigation**: Priority actions to address identified risks
- **Innovation Opportunities**: Areas for competitive advantage development

</integration_methodology>

<analysis_focus>

## Cross-Report Analysis Process

### 1. Product-Technical Synthesis

```
- Compare product features with technical implementation quality
- Identify where technical debt impacts user experience
- Find where technical capabilities enable new product opportunities
- Map user journey quality to technical architecture decisions
```

### 2. Security-Functionality Balance

```
- Assess how security measures impact user experience
- Identify security implementations that enable vs. hinder features
- Find areas where security and functionality are well-integrated
- Map security risks to business impact
```

### 3. Performance-Experience Integration

```
- Connect technical performance to user experience quality
- Identify where performance optimizations improve user workflows
- Find performance bottlenecks that impact key user actions
- Map scalability limitations to business growth potential
```

### 4. Architecture-Evolution Alignment

```
- Assess how current architecture supports future product evolution
- Identify architectural decisions that enable vs. constrain growth
- Find areas where architecture simplifies vs. complicates development
- Map technical flexibility to business agility
```

</analysis_focus>

<output_format>

## Master Codebase Analysis Report

### Executive Summary

- **Overall Assessment**: [Comprehensive quality rating with justification]
- **Key Strengths**: [Top 5 standout qualities across all domains]
- **Critical Concerns**: [Top 5 issues requiring immediate attention]
- **Strategic Position**: [How the system positions the organization competitively]
- **Investment Priorities**: [Where to focus development resources for maximum impact]

### Product-Technology Alignment

#### Product Vision Execution

- **Vision Realization**: [How well the technical implementation realizes the product vision]
- **User Experience Quality**: [How technical decisions impact user experience]
- **Feature Completeness**: [How fully product concepts are technically implemented]
- **Innovation Enablement**: [How the technology stack enables product innovation]

#### User Journey Technical Support

- **Critical Path Performance**: [How well technology supports key user workflows]
- **Experience Continuity**: [How consistently good experience is delivered across features]
- **Accessibility Implementation**: [How well technical implementation supports accessibility]
- **Mobile/Responsive Quality**: [How well technical implementation serves different devices]

### System Architecture Assessment

#### Architecture Coherence

- **Design Consistency**: [How consistently architectural patterns are applied]
- **Integration Quality**: [How well different system components work together]
- **Scalability Design**: [How well the architecture supports growth]
- **Maintainability**: [How easy the system is to modify and extend]

#### Technology Stack Effectiveness

- **Technology Appropriateness**: [How well chosen technologies fit the use case]
- **Stack Integration**: [How well different technologies work together]
- **Performance Characteristics**: [Overall system performance and optimization]
- **Development Velocity**: [How technology choices impact development speed]

### Feature Implementation Quality

#### Core Feature Analysis

- **[Primary Feature Set]**:
  - **Implementation Quality**: [Technical implementation assessment]
  - **User Experience Impact**: [How implementation affects user experience]
  - **Performance Characteristics**: [Speed, reliability, scalability]
  - **Security Integration**: [How security is built into the feature]
  - **Extension Potential**: [How easily the feature can be enhanced]

#### AI Integration Excellence

- **AI Architecture Quality**: [How well AI is integrated into the system]
- **User Experience Enhancement**: [How AI improves user experience]
- **Performance and Cost**: [AI efficiency and cost optimization]
- **Learning and Adaptation**: [How well AI improves over time]

### Security and Compliance Posture

#### Security Integration Quality

- **Security by Design**: [How well security is built into architecture]
- **User Experience Impact**: [How security measures affect usability]
- **Compliance Implementation**: [How well regulatory requirements are met]
- **Risk Management**: [How effectively security risks are managed]

#### Data Protection Excellence

- **Privacy Implementation**: [How well user privacy is protected]
- **Data Governance**: [How well data is managed throughout its lifecycle]
- **Encryption and Protection**: [Quality of data protection measures]
- **Access Control**: [Effectiveness of access control systems]

### Performance and Scalability

#### Current Performance Profile

- **User-Facing Performance**: [How fast and responsive the system feels to users]
- **Backend Performance**: [How efficiently the system processes data and requests]
- **Resource Utilization**: [How efficiently the system uses computational resources]
- **Bottleneck Analysis**: [Where performance constraints are most limiting]

#### Scalability Readiness

- **Growth Capacity**: [How much growth the current system can handle]
- **Scaling Strategies**: [How the system can be scaled when needed]
- **Performance Predictability**: [How well performance scales with increased load]
- **Cost Scalability**: [How costs scale with system growth]

### Development and Operational Excellence

#### Development Experience

- **Code Quality**: [Overall maintainability and readability of the codebase]
- **Development Velocity**: [How quickly new features can be developed]
- **Testing Coverage**: [How well the system is tested and validated]
- **Documentation Quality**: [How well the system is documented]

#### Operational Readiness

- **Monitoring and Observability**: [How well the system can be monitored in production]
- **Deployment and Reliability**: [How reliably the system can be deployed and run]
- **Error Handling**: [How gracefully the system handles errors and failures]
- **Incident Response**: [How well the system supports troubleshooting and recovery]

### Cross-Domain Risk Analysis

#### High-Priority Risks

1. **[Risk Category]**: [Description and potential impact]
   - **Likelihood**: [Probability of occurrence]
   - **Impact**: [Severity if it occurs]
   - **Mitigation**: [Recommended actions]
   - **Timeline**: [Urgency for addressing]

#### Medium-Priority Risks

[Same structure for secondary risks]

#### Risk Interdependencies

- **Cascading Risks**: [How risks in one area could trigger problems in others]
- **Risk Concentration**: [Areas where multiple risks converge]
- **Risk Mitigation Conflicts**: [Where fixing one risk might create others]

### Strategic Opportunities

#### Innovation Enablers

- **Technical Capabilities**: [Technical strengths that enable new product opportunities]
- **Market Differentiators**: [Technical features that provide competitive advantage]
- **Platform Potential**: [How the system could become a platform for others]
- **Data Opportunities**: [How data assets could create new value]

#### Efficiency Improvements

- **Development Acceleration**: [How to speed up feature development]
- **Operational Optimization**: [How to reduce operational costs and complexity]
- **User Experience Enhancement**: [How to improve user satisfaction and engagement]
- **Performance Optimization**: [How to improve system performance and scalability]

### Integrated Recommendations

#### Immediate Actions (Next 30 Days)

1. **[Action Item]**:
   - **Domain**: [Product/Technical/Security/etc.]
   - **Rationale**: [Why this is important now]
   - **Impact**: [Expected benefits]
   - **Resources**: [What's needed to execute]
   - **Success Metrics**: [How to measure success]

#### Short-Term Initiatives (Next 90 Days)

[Same structure for quarterly initiatives]

#### Long-Term Strategic Investments (6-12 Months)

[Same structure for strategic initiatives]

### Quality Benchmarking

#### Industry Comparison

- **Technical Architecture**: [How the architecture compares to industry standards]
- **Security Posture**: [How security compares to industry best practices]
- **User Experience**: [How UX compares to competitive products]
- **Development Practices**: [How development practices compare to industry standards]

#### Maturity Assessment

- **Product Maturity**: [How mature the product features are]
- **Technical Maturity**: [How mature the technical implementation is]
- **Operational Maturity**: [How mature the operational practices are]
- **Security Maturity**: [How mature the security implementation is]

### Investment Analysis

#### Return on Investment Priorities

1. **[Investment Area]**:
   - **Investment Required**: [Time, money, people needed]
   - **Expected Returns**: [Benefits and impact]
   - **Risk Assessment**: [Probability of success]
   - **Timeline**: [When returns will be realized]

#### Resource Allocation Recommendations

- **Development Focus**: [Where to focus development resources]
- **Infrastructure Investment**: [Where to invest in infrastructure]
- **Security Investment**: [Where to invest in security improvements]
- **Product Investment**: [Where to invest in product capabilities]

### Future Evolution Strategy

#### Architectural Evolution

- **Technology Modernization**: [How to evolve the technology stack]
- **Architecture Refactoring**: [How to improve architectural design]
- **Performance Scaling**: [How to prepare for increased scale]
- **Feature Platform**: [How to build a platform for rapid feature development]

#### Product Evolution

- **Feature Roadmap Support**: [How technology can enable product roadmap]
- **User Experience Evolution**: [How to continuously improve user experience]
- **Market Expansion**: [How technology can support new markets]
- **Innovation Pipeline**: [How to maintain innovation velocity]

### Conclusion and Next Steps

#### Overall System Health

- **Strengths to Leverage**: [Key strengths to build upon]
- **Weaknesses to Address**: [Critical areas for improvement]
- **Opportunities to Pursue**: [Strategic opportunities to explore]
- **Threats to Mitigate**: [Risks to actively manage]

#### Success Framework

- **Key Performance Indicators**: [Metrics to track system health and improvement]
- **Milestone Checkpoints**: [Regular review points for progress assessment]
- **Success Criteria**: [How to measure the success of recommended initiatives]
- **Continuous Improvement**: [How to maintain ongoing system quality and evolution]

</output_format>

<verification_requirements>

## Integration Analysis Validation

- **Report Consistency**: Findings must be consistent across different domain reports
- **Gap Identification**: Missing information or analysis gaps must be identified
- **Conflict Resolution**: Conflicting information between reports must be addressed
- **Synthesis Quality**: Integration must create insights beyond individual reports
- **Actionability**: Recommendations must be specific and implementable

## Strategic Quality Checks

- **Business Alignment**: Do technical findings align with business needs?
- **Risk Prioritization**: Are risks properly prioritized by business impact?
- **Investment Guidance**: Are investment recommendations well-justified?
- **Timeline Realism**: Are recommended timelines achievable?

</verification_requirements>

<usage_examples>

## Full Integration Analysis

```
/master:integrate:all-reports
```

## Specific Focus Integration

```
/master:integrate:all-reports "focus on security and performance integration"
/master:integrate:all-reports "emphasize product-technical alignment"
/master:integrate:all-reports "prioritize scalability and growth concerns"
```

## Stakeholder-Specific Integration

```
/master:integrate:all-reports "executive summary focus"
/master:integrate:all-reports "technical leadership focus"
/master:integrate:all-reports "product management focus"
```

</usage_examples>

<file_reading_process>

## Analysis File Integration Process

### 1. File Discovery and Reading

```
- Automatically detect all generated analysis files
- Read and parse each specialized report
- Extract key findings, metrics, and recommendations
- Identify cross-references and connections between reports
```

### 2. Cross-Domain Synthesis

```
- Map relationships between product features and technical implementation
- Connect security measures to user experience impact
- Link performance characteristics to business outcomes
- Identify architecture decisions that impact multiple domains
```

### 3. Conflict Resolution

```
- Identify contradictory findings between reports
- Resolve conflicts based on code evidence and impact
- Flag areas where further investigation is needed
- Provide integrated perspective on disputed areas
```

### 4. Strategic Integration

```
- Synthesize findings into strategic insights
- Prioritize recommendations by impact and feasibility
- Create integrated roadmap across all domains
- Develop comprehensive risk and opportunity assessment
```

</file_reading_process>

<output_file_generation>

## Generated Documentation File

The command will create: `master-codebase-analysis.md`

### File Structure

- Executive summary with overall assessment and priorities
- Integrated analysis of product-technical alignment
- Cross-domain risk and opportunity assessment
- Strategic recommendations with timelines and impact
- Quality benchmarking and competitive positioning
- Investment analysis and resource allocation guidance

### Integration Value

- **Holistic View**: Complete picture rather than fragmented analysis
- **Strategic Insights**: Patterns and opportunities visible only through integration
- **Prioritized Action**: Clear guidance on what to focus on first
- **Risk Integration**: Understanding of how risks compound across domains
- **Investment Guidance**: Clear ROI analysis for improvement initiatives

</output_file_generation>
