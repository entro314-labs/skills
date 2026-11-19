---
name: analysis-ai-mapper
description: "Analyzes how AI and machine learning are implemented in a codebase: SDKs, model and provider management, prompts, AI feature flows, cost and fallback handling. Use when asked to map or document AI integration. Writes project-info/ai-integration-analysis.md."
disable-model-invocation: true
---

# AI Integration Analysis Command

<task>
You are an AI engineering specialist. Analyze the codebase to understand how AI and machine learning are implemented, integrated, and used throughout the application. Focus on AI architecture, data flows, model usage, and intelligent features.
</task>

<context>
This command provides deep insight into AI implementation patterns, machine learning integration, prompt engineering, model management, and intelligent feature development. It's designed for AI engineers and developers working on AI-powered features.

Target: $ARGUMENTS (if specified, focus on specific AI features or components) </context>

<analysis_methodology>

## Phase 1: AI Architecture Discovery

### AI Integration Patterns

- **AI Framework and SDKs**: What AI libraries and SDKs are used
- **Model Management**: How AI models are selected, configured, and switched
- **Provider Integration**: How multiple AI providers are handled
- **Fallback Strategies**: How AI failures are handled and recovered

### AI Service Architecture

- **Client-Side AI**: Browser-based AI processing and capabilities
- **Server-Side AI**: Backend AI processing and API integration
- **Edge AI**: Edge function AI processing and optimization
- **Hybrid Patterns**: Combination of client/server/edge AI processing

## Phase 2: Model Usage and Management

### Model Selection and Configuration

- **Multi-Provider Support**: How different AI providers are integrated
- **Model Switching**: Dynamic model selection based on context
- **Configuration Management**: How AI settings are stored and managed
- **Cost Optimization**: How AI usage is optimized for cost and performance

### Prompt Engineering and Management

- **Prompt Templates**: How prompts are structured and managed
- **Context Management**: How conversation context is maintained
- **Prompt Optimization**: Techniques for improving prompt effectiveness
- **Version Control**: How prompt changes are managed and deployed

## Phase 3: AI Feature Implementation

### Intelligent Features Analysis

- **Feature-Specific AI**: How AI enhances specific application features
- **Data Processing**: How user data is prepared for AI consumption
- **Response Processing**: How AI responses are structured and used
- **User Experience**: How AI results are presented to users

### Learning and Adaptation

- **Feedback Loops**: How user feedback improves AI performance
- **Pattern Recognition**: How the system learns from user behavior
- **Personalization**: How AI adapts to individual user preferences
- **Continuous Learning**: How the AI system improves over time

</analysis_methodology>

<code_reading_focus>

## AI-Focused Code Reading

### 1. AI SDK and Framework Integration

```
- Examine AI SDK usage and configuration
- Understand provider integration patterns
- Analyze API key management and security
- Map AI service initialization and lifecycle
```

### 2. Prompt Engineering and Management

```
- Find all prompt templates and structures
- Understand context preparation and injection
- Analyze prompt optimization techniques
- Map conversation flow and context management
```

### 3. Data Flow and Processing

```
- Trace how user data flows to AI systems
- Understand data preparation and formatting
- Analyze response parsing and validation
- Map AI result integration into application
```

### 4. Model Management and Optimization

```
- Examine model selection logic
- Understand provider switching mechanisms
- Analyze cost optimization strategies
- Map performance monitoring and optimization
```

</code_reading_focus>

<output_format>

## AI Integration Analysis Report

### AI Architecture Overview

- **AI Framework**: [Primary AI SDK/framework used]
- **Supported Providers**: [OpenAI, Anthropic, Google, etc.]
- **Integration Pattern**: [Direct API, SDK, wrapper service]
- **Deployment Model**: [Client-side, server-side, edge, hybrid]

### AI Provider Integration

#### Multi-Provider Architecture

- **Provider Support**: [List of integrated AI providers]
- **Provider Selection Logic**: [How providers are chosen dynamically]
- **Fallback Mechanisms**: [What happens when primary provider fails]
- **Load Balancing**: [How requests are distributed across providers]

#### Configuration Management

- **API Key Management**: [How AI API keys are stored and accessed]
- **Model Configuration**: [How models are selected and configured]
- **Team-Level Settings**: [How different teams can use different models]
- **Environment Management**: [Different AI configs for dev/staging/prod]

### AI Feature Implementation

#### [Feature Name 1] - [AI Capability Description]

- **Purpose**: [What AI problem this feature solves]
- **Input Data**: [What user/system data feeds into the AI]
- **AI Processing**: [How the AI analyzes and processes the data]
- **Model Used**: [Specific model or provider for this feature]
- **Prompt Strategy**: [How prompts are structured for this feature]
- **Output Processing**: [How AI responses are parsed and used]
- **User Experience**: [How AI results are presented to users]
- **Error Handling**: [How AI failures are managed for this feature]

#### [Feature Name 2] - [AI Capability Description]

[Same structure as above]

### Prompt Engineering Architecture

#### Prompt Management System

- **Prompt Storage**: [How prompts are stored and versioned]
- **Template Structure**: [Common prompt patterns and templates]
- **Variable Injection**: [How dynamic data is inserted into prompts]
- **Context Building**: [How conversation context is constructed]

#### Prompt Optimization Techniques

- **Few-Shot Learning**: [Example-based prompt engineering]
- **Chain of Thought**: [Step-by-step reasoning prompts]
- **System Messages**: [How system context is established]
- **Output Formatting**: [Structured output generation patterns]

#### Context Management

- **Conversation History**: [How chat context is maintained]
- **Context Windows**: [How long conversations are managed]
- **Context Pruning**: [How old context is removed or summarized]
- **Cross-Session Context**: [How context persists across user sessions]

### Data Flow and Processing

#### Input Data Pipeline

- **Data Collection**: [How user data is gathered for AI processing]
- **Data Preprocessing**: [Cleaning, formatting, anonymization]
- **Context Assembly**: [How relevant context is compiled]
- **Prompt Construction**: [Final prompt assembly process]

#### AI Processing Pipeline

- **Request Formation**: [How AI API requests are constructed]
- **Streaming vs Batch**: [Real-time vs batch processing patterns]
- **Response Handling**: [How AI responses are received and processed]
- **Error Recovery**: [Retry logic, fallback responses, error messages]

#### Output Processing Pipeline

- **Response Parsing**: [How AI responses are structured and parsed]
- **Validation**: [How AI outputs are validated for correctness]
- **Post-Processing**: [Additional processing after AI response]
- **Storage**: [How AI results are cached or stored]

### Model Management and Optimization

#### Model Selection Strategy

- **Default Models**: [Standard models for different use cases]
- **Dynamic Selection**: [Runtime model selection based on context]
- **A/B Testing**: [How different models are tested and compared]
- **Performance Monitoring**: [How model performance is tracked]

#### Cost Optimization

- **Rate Limiting**: [How AI usage is controlled and limited]
- **Caching Strategies**: [What AI responses are cached and for how long]
- **Model Efficiency**: [Choosing cost-effective models for different tasks]
- **Usage Analytics**: [How AI usage and costs are tracked]

#### Performance Optimization

- **Response Time**: [How AI response speed is optimized]
- **Parallel Processing**: [How multiple AI requests are handled]
- **Background Processing**: [Non-blocking AI operations]
- **Resource Management**: [Memory and CPU optimization for AI tasks]

### AI Security and Privacy

#### Data Protection

- **Data Sanitization**: [How sensitive data is removed before AI processing]
- **Privacy Controls**: [User control over AI data usage]
- **Data Retention**: [How long AI-related data is stored]
- **Anonymization**: [How user data is anonymized for AI]

#### API Security

- **API Key Security**: [How AI API keys are protected]
- **Request Validation**: [Input validation before AI processing]
- **Response Validation**: [AI output validation and sanitization]
- **Rate Limiting**: [Protection against AI abuse]

### Learning and Adaptation Systems

#### Feedback Integration

- **User Feedback Collection**: [How user feedback on AI is gathered]
- **Feedback Processing**: [How feedback improves AI performance]
- **Rating Systems**: [How AI responses are rated and improved]
- **Preference Learning**: [How user preferences are incorporated]

#### Pattern Recognition

- **Behavioral Analysis**: [How user patterns inform AI decisions]
- **Usage Analytics**: [What AI usage patterns are tracked]
- **Performance Metrics**: [How AI effectiveness is measured]
- **Continuous Improvement**: [How AI systems evolve over time]

#### Personalization Engine

- **Individual Adaptation**: [How AI adapts to individual users]
- **Team-Level Learning**: [How AI learns team-specific patterns]
- **Contextual Adaptation**: [How AI adapts to different contexts]
- **Preference Storage**: [How AI preferences are stored and applied]

### AI Infrastructure and Operations

#### Monitoring and Observability

- **AI Request Tracking**: [How AI API calls are logged and monitored]
- **Performance Metrics**: [Response time, accuracy, user satisfaction]
- **Error Monitoring**: [AI failure tracking and alerting]
- **Usage Analytics**: [AI feature usage and adoption metrics]

#### Deployment and Scaling

- **AI Service Deployment**: [How AI features are deployed]
- **Scaling Strategies**: [How AI processing scales with usage]
- **Load Balancing**: [How AI requests are distributed]
- **Disaster Recovery**: [AI service backup and recovery plans]

### AI Development Workflow

#### Development Practices

- **AI Feature Development**: [How new AI features are built]
- **Testing Strategies**: [How AI features are tested]
- **Prompt Testing**: [How prompt effectiveness is validated]
- **Model Evaluation**: [How AI model performance is assessed]

#### Integration Patterns

- **Feature Integration**: [How AI is integrated into existing features]
- **API Design**: [How AI capabilities are exposed via APIs]
- **Component Architecture**: [How AI components are structured]
- **State Management**: [How AI state is managed in the application]

### Future AI Architecture Considerations

#### Scalability Planning

- **Model Scaling**: [How to handle increased AI usage]
- **Provider Diversification**: [Adding new AI providers]
- **Feature Expansion**: [Architecture for new AI capabilities]
- **Performance Optimization**: [Future AI performance improvements]

#### Technology Evolution

- **Model Upgrades**: [How to integrate newer AI models]
- **Framework Updates**: [Keeping AI SDKs and frameworks current]
- **Capability Expansion**: [Adding new AI modalities (vision, audio, etc.)]
- **Edge AI Migration**: [Moving AI processing to edge locations]

</output_format>

<verification_requirements>

## AI Implementation Validation

- **Code Evidence**: Every AI feature must be verified in actual implementation
- **Model Usage Reality**: All described models and providers must exist in code
- **Prompt Accuracy**: All prompt examples must be found in actual templates
- **Integration Truth**: All AI integrations must be traceable in codebase
- **Performance Claims**: AI performance patterns must be verifiable

## AI Engineering Quality Checks

- **Architecture Soundness**: Is the AI architecture well-designed and scalable?
- **Security Implementation**: Are AI security best practices followed?
- **Cost Efficiency**: Are AI usage patterns optimized for cost?
- **User Experience**: Does AI enhance rather than complicate user experience?

</verification_requirements>

<usage_examples>

## Full AI Analysis

```
/ai:integration
```

## Feature-Specific Analysis

```
/ai:integration "energy pattern analysis and recommendations"
/ai:integration "knowledge connection discovery"
/ai:integration "meeting optimization algorithms"
```

## Infrastructure Focus

```
/ai:integration "model management and provider switching"
/ai:integration "prompt engineering and optimization"
```

## Performance Focus

```
/ai:integration "AI caching and cost optimization"
/ai:integration "response time and user experience"
```

</usage_examples>

<output_file_generation>

## Generated Documentation File

This command will create: a "project-info" folder in working directory if it doesn't already exist and then inside it will create: `ai-integration-analysis.md`

### File Structure

- Executive summary of AI architecture approach
- Provider integration and model management
- Feature-by-feature AI implementation analysis
- Prompt engineering and context management
- Data flow and processing pipelines
- Security, privacy, and performance considerations

### Focus Areas

- How AI is technically implemented and integrated
- Model selection and provider management strategies
- Prompt engineering and optimization techniques
- AI feature development and user experience patterns
- Performance, cost, and scalability considerations

</output_file_generation>
