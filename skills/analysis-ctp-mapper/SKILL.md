---
name: analysis-ctp-mapper
description: "Code to Product analysis: reads the whole codebase to explain what the product does, user journeys, features, business logic and value proposition. Use when asked to understand or document the product from code. Writes project-info/product-understanding.md."
disable-model-invocation: true
---

# Code to Product (CtP) analysis flow

<task>
You are a product analyst and code detective. Read the entire codebase to understand what the application actually does, how users interact with it, what problems it solves, and how the code implements the user experience. Focus on understanding the product from the inside out.
</task>

<context>
This command goes beyond technical documentation to understand the actual product functionality, user journeys, business logic, and feature implementations. It reads code to understand what users can do, how features work together, and what makes this application unique.

Target: $ARGUMENTS (if specified, focus on specific product areas) </context>

<analysis_methodology>

## Phase 1: Product Discovery Through Code

### User Journey Mapping

- **Entry Points**: How do users first interact with the application?
- **Core Workflows**: What are the main things users do in sequence?
- **Feature Connections**: How do different features work together?
- **User Goals**: What problems is the application solving?

### Business Logic Understanding

- **Core Concepts**: What are the fundamental entities and relationships?
- **Rules and Constraints**: What business rules are encoded in the logic?
- **Data Models**: What does the data structure tell us about the product?
- **Calculations and Algorithms**: What computations drive the user experience?

## Phase 2: Feature Comprehension

### User Actions and Flows

- **What Can Users Do**: Map all possible user actions from UI components
- **Decision Trees**: How does the application respond to different inputs?
- **State Changes**: How user actions change application state
- **Feedback Loops**: How the application responds to user behavior

### Integration Patterns

- **Feature Interdependencies**: How features rely on each other
- **Data Flow Between Features**: How information moves through the product
- **User Context Propagation**: How user actions in one area affect another
- **Cross-Feature Workflows**: Multi-step processes spanning features

## Phase 3: Product Logic Analysis

### Core Value Proposition

- **Unique Functionality**: What does this application do differently?
- **User Benefits**: What value does each feature provide?
- **Problem-Solution Fit**: How do features address user problems?
- **Competitive Advantages**: What makes this product special?

</analysis_methodology>

<code_reading_focus>

## Product-Focused Code Reading

### 1. User Interface Analysis

```
- Read all React components to understand user interactions
- Map form submissions and user input handling
- Understand navigation patterns and user flows
- Document what users see and can click/interact with
```

### 2. Business Logic Extraction

```
- Analyze API endpoints to understand backend operations
- Read database queries to understand data relationships
- Examine validation rules and business constraints
- Map calculations and processing logic
```

### 3. Feature Integration Understanding

```
- Trace how user actions trigger multiple system components
- Understand how features share data and state
- Map cross-feature workflows and dependencies
- Document how the product creates cohesive experiences
```

### 4. Product Behavior Analysis

```
- Understand how the application responds to different scenarios
- Map conditional logic and feature variations
- Document personalization and customization capabilities
- Analyze how the product adapts to user behavior
```

</code_reading_focus>

<output_format>

## Product Understanding Report

### What This Application Actually Does

- **Core Purpose**: [What problem does this solve? What is the main value proposition?]
- **Target Users**: [Who uses this? What roles/personas are supported?]
- **Key Differentiators**: [What makes this unique compared to alternatives?]
- **Product Category**: [What type of application is this?]

### User Experience Journey

#### Getting Started Flow

1. [How new users first interact with the product]
2. [Onboarding steps and initial setup]
3. [First-time user experience and guidance]
4. [How users learn to use the product]

#### Daily Usage Patterns

1. [What users do when they return to the application]
2. [Common workflows and repeated actions]
3. [How the product fits into users' daily routines]
4. [Frequency and timing of typical interactions]

#### Advanced User Capabilities

1. [What power users can accomplish]
2. [Advanced features and customization options]
3. [How the product scales with user expertise]
4. [Admin and management capabilities]

### Core Features and How They Work

#### [Feature Name 1] - [What It Does for Users]

- **User Problem Solved**: [What pain point this addresses]
- **User Actions**: [What users actually do in this feature]
- **How It Works**: [Step-by-step breakdown of functionality]
- **Key Interactions**: [Important UI elements and user choices]
- **Business Logic**: [Rules, calculations, and processing involved]
- **Integration Points**: [How this connects to other features]
- **Data Involved**: [What information is created, read, updated]

#### [Feature Name 2] - [What It Does for Users]

[Same structure as above]

### Product Workflows and User Paths

#### [Workflow Name 1]: [Goal User Wants to Achieve]

1. **Starting Point**: [Where/when users begin this workflow]
2. **User Actions**: [Step-by-step user actions required]
3. **System Responses**: [How the application responds at each step]
4. **Decision Points**: [Where users make choices that affect the outcome]
5. **Completion**: [How users know they've succeeded]
6. **Follow-up**: [What happens next or what users typically do afterward]

#### [Workflow Name 2]: [Goal User Wants to Achieve]

[Same structure as above]

### How Features Connect and Reinforce Each Other

#### Feature Ecosystem Map

- **Core Features**: [Central features that other features depend on]
- **Supporting Features**: [Features that enhance core functionality]
- **Data Sharing**: [How features share information to create value]
- **User Context**: [How user actions in one area influence other areas]

#### Cross-Feature Value Creation

- **Compound Benefits**: [How using multiple features together creates more value]
- **Data Enrichment**: [How features improve each other's effectiveness]
- **Workflow Continuity**: [How features support seamless user experiences]
- **Network Effects**: [How multiple users using features creates additional value]

### Business Logic and Rules

#### Core Concepts and Entities

- **Primary Objects**: [Main entities users work with (projects, tasks, etc.)]
- **Relationships**: [How entities connect and depend on each other]
- **Hierarchies**: [Organizational structures and permission levels]
- **Lifecycle Management**: [How entities are created, modified, archived]

#### Key Algorithms and Calculations

- **[Algorithm Name]**: [What it calculates and why users care]
- **Input Requirements**: [What data is needed]
- **Processing Logic**: [How the calculation works]
- **User Impact**: [How results affect user experience]
- **Business Value**: [Why this calculation matters]

#### Business Rules and Constraints

- **Access Controls**: [Who can do what and when]
- **Data Validation**: [What inputs are accepted/rejected and why]
- **Process Requirements**: [Required steps or sequences]
- **Limitation Handling**: [How the product deals with constraints]

### Personalization and Adaptation

#### How the Product Learns About Users

- **Data Collection**: [What user behavior and preferences are tracked]
- **Profile Building**: [How user characteristics are determined]
- **Preference Storage**: [How customizations are saved and applied]

#### Adaptive Behaviors

- **Personalized Experiences**: [How the product customizes for individual users]
- **Context Awareness**: [How the product responds to user situation/environment]
- **Learning Systems**: [How the product improves recommendations over time]

### Integration and Ecosystem

#### External Connections

- **Third-Party Services**: [What external tools/services are integrated and why]
- **Data Import/Export**: [How users get data in and out]
- **API Capabilities**: [What external systems can do with this product]

#### Internal Ecosystem

- **Multi-Tenant Architecture**: [How organizations/teams are isolated or connected]
- **Role-Based Features**: [How different user types see different functionality]
- **Collaboration Features**: [How multiple users work together]

### Product Intelligence and Automation

#### Smart Features

- **Automated Processes**: [What the product does automatically for users]
- **Intelligent Suggestions**: [How the product provides recommendations]
- **Pattern Recognition**: [What patterns the product identifies and acts on]

#### AI and Machine Learning

- **AI-Powered Features**: [Specific ways AI enhances user experience]
- **Learning Capabilities**: [How the product gets smarter over time]
- **User Augmentation**: [How AI helps users be more effective]

### Performance and Scale Characteristics

#### User Experience Performance

- **Response Times**: [How quickly users get feedback]
- **Real-Time Features**: [What updates happen live vs. on refresh]
- **Offline Capabilities**: [What users can do without internet connection]

#### Scale Handling

- **Team Size Limits**: [How the product handles different organization sizes]
- **Data Volume**: [How the product performs with large amounts of data]
- **Usage Patterns**: [How the product handles peak usage times]

</output_format>

<verification_requirements>

## Product Understanding Validation

- **Feature Completeness**: Every described feature must be verified in actual UI components
- **User Flow Accuracy**: All described workflows must be traceable through code paths
- **Business Logic Verification**: All rules and calculations must be found in actual implementation
- **Integration Reality Check**: All described connections must exist in actual code
- **No Product Assumptions**: Don't describe features that aren't implemented

## User Experience Accuracy

- **Actual UI Elements**: Descriptions must match real buttons, forms, and interactions
- **Real User Actions**: All described user actions must be possible in the current code
- **Authentic Workflows**: User journeys must reflect actual application navigation
- **True Capabilities**: Only document what users can actually accomplish

</verification_requirements>

<usage_examples>

## Full Product Analysis

```
/product:understand:comprehensive
```

## Feature-Specific Deep Dive

```
/product:understand:comprehensive "user onboarding and first experience"
/product:understand:comprehensive "collaboration and team features"
/product:understand:comprehensive "AI-powered recommendations"
```

## User Journey Focus

```
/product:understand:comprehensive "how new users become productive"
/product:understand:comprehensive "daily workflow for power users"
```

## Business Logic Analysis

```
/product:understand:comprehensive "core algorithms and calculations"
/product:understand:comprehensive "business rules and access controls"
```

</usage_examples>

<output_file_generation>

## Generated Documentation File

This command will create: a "project-info" folder in working directory if it doesn't already exist and then inside it will create: `product-understanding.md`

### File Structure

- Executive summary of what the product does and who it's for
- Complete user journey mapping from first-time to power user
- Feature-by-feature breakdown of user value and functionality
- Business logic and rule documentation
- Integration and ecosystem mapping
- Product intelligence and automation capabilities

### Focus Areas

- User problems solved
- Actual user workflows and interactions
- How features create value individually and together
- What makes this product unique and competitive
- How the product adapts and improves user experience

</output_file_generation>
