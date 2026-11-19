---
name: business-analyze-business
description: "Analyzes all business documents in the current directory for investor readiness: maps documents, extracts metrics, cross-validates figures, searches the web for market and competitor data, and checks financial models and risks. Use when asked to validate business plans or pitch materials."
disable-model-invocation: true
---

# Comprehensive Business Document Analysis

Conduct exhaustive analysis of all business documents in the current directory and subdirectories for investor readiness validation.

## Instructions for business-validator agent

### Step 1: Document Discovery & Mapping

List all files in the current directory and subdirectories. Create a comprehensive map of:

- Business plans and strategy documents
- Financial models and projections
- Pitch decks and investor materials
- Market research and competitive analysis
- Marketing materials and press documents
- Product documentation
- Cap tables and legal documents

### Step 2: Systematic Document Analysis

For each document category:

**Business Strategy Documents:**

- Extract vision, mission, value proposition
- Identify target markets and customer segments
- Note go-to-market strategies
- Document competitive advantages claimed

**Financial Documents:**

- Extract all key metrics (revenue, costs, growth rates)
- Identify funding requirements and use of funds
- Note unit economics and margins
- Document break-even projections

**Market Research:**

- Extract TAM/SAM/SOM calculations
- Note competitor analysis completeness
- Identify market growth assumptions
- Document customer validation claims

### Step 3: Cross-Document Validation

Create a comparison matrix checking:

- Revenue figures consistency across documents
- User/customer numbers alignment
- Market size claims matching
- Team size and burn rate consistency
- Timeline and milestone alignment

### Step 4: External Market Validation

Conduct web searches to verify:

- Market size and growth rates for $INDUSTRY
- Competitor funding and traction
- Technology trends and adoption rates
- Regulatory environment changes
- Economic factors affecting the market

Search specifically for:

- Recent funding rounds in the space
- Market reports from Gartner, McKinsey, etc.
- Government statistics and databases
- Industry association data
- Academic research on the market

### Step 5: Competitive Intelligence Deep Dive

Research each mentioned competitor:

- Current funding and valuation
- User base and growth rates
- Product features and pricing
- Recent news and pivots
- Strengths and weaknesses

Identify missing competitors by searching:

- "$INDUSTRY startups $MARKET"
- "$SOLUTION providers $GEOGRAPHY"
- "Alternatives to $COMPETITOR"

### Step 6: Financial Model Validation

Analyze the financial projections:

- Check growth rate realism (compare to industry benchmarks)
- Validate CAC and LTV calculations
- Assess burn rate sustainability
- Verify revenue recognition timing
- Check for hidden costs or missing categories

Red flags to identify:

- Hockey stick growth without justification
- Declining CAC without explanation
- Margin improvements without operational changes
- Missing common expense categories
- Unrealistic conversion rate assumptions

### Step 7: Risk Assessment

Evaluate:

- Market risks (competition, saturation)
- Execution risks (team, technology)
- Financial risks (runway, unit economics)
- Regulatory risks (compliance, changes)
- Scalability risks (operations, technology)

### Step 8: Generate Comprehensive Report

Create a detailed report with:

1. **Executive Summary** (1 page max)
   - Business overview in 2 sentences
   - Investment thesis strength (1-10 score)
   - Top 3 strengths
   - Top 3 concerns
   - Overall recommendation

2. **Detailed Findings** (structured by severity)
   - Critical issues requiring immediate fix
   - Major concerns to address before pitching
   - Minor improvements for polish
   - Opportunities to strengthen the case

3. **Market Validation Results**
   - Confirmed claims with sources
   - Disputed claims with evidence
   - Missing market information
   - Competitive gaps identified

4. **Financial Analysis**
   - Model integrity assessment
   - Projection realism rating
   - Scenario analysis recommendations
   - Funding strategy evaluation

5. **Action Plan**
   - Prioritized fixes (must do before pitching)
   - Quick wins (can do in 1-2 days)
   - Strategic improvements (longer term)

6. **Supporting Data**
   - Comparison tables
   - Market research links
   - Competitor matrix
   - Assumption validation tracker

Save the report as `BUSINESS_VALIDATION_REPORT.md` in the root directory.

### Step 9: Create Quick Reference Documents

Generate these additional files:

1. **INVESTOR_QA_PREP.md** - Likely investor questions and suggested answers
2. **DATA_ROOM_CHECKLIST.md** - Missing documents for due diligence
3. **PITCH_REFINEMENTS.md** - Specific slide improvements needed
4. **COMPETITOR_MATRIX.csv** - Detailed competitive analysis
5. **METRICS_DASHBOARD.md** - Key metrics tracking template

$ARGUMENTS
