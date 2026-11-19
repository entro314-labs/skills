---
name: meta-summary
description: "Produces concise, actionable summaries of a conversation, file, codebase, or topic in selectable formats (TLDR, key decisions, action items, next steps). Use when asked to summarize, give a TLDR, or recap a session or document."
---

# Smart Summarization

## Purpose

Generate concise, actionable summaries of conversations, documentation, codebases, or complex
topics. Adapts format and depth based on content type and audience needs, focusing on essential
information and immediate next steps.

## Claude Code Integration

### Slash Command Usage

```
/meta-summary <target> [--format] [--depth]
```

**Target Types:**

- `conversation` - Summarize current chat session or discussion
- `@filename` - Summarize specific file or documentation
- `codebase` - Overview of entire project structure and purpose
- `<topic>` - Summarize any complex topic or concept

**Format Options:**

- `--conversation` - Structured conversation summary (default for discussions)
- `--technical` - Technical documentation format with implementation details
- `--meeting` - Meeting summary with decisions and action items
- `--executive` - High-level business summary for stakeholders
- `--quick` - Rapid overview with just essentials

**Depth Options:**

- `--brief` - Maximum 150 words, essential points only
- `--standard` - Standard 300 word limit with key details (default)
- `--detailed` - Extended summary with context and background

## Usage Examples

### Conversation Summary

```
/meta-summary conversation
```

**Structured Output:**

````markdown
# Conversation Summary

## TLDR

• Consolidated 60+ duplicate commands into unified Claude Code commands • Created new schema and
template following Claude Code syntax patterns • Successfully merged dependencies, parallel,
explain, review, plan, and summary commands

## Key Decisions

• Use Claude Code slash command syntax (/command-name) • Implement file reference system (@filename)
and bash integration (!command) • Consolidate duplicates while preserving all functionality • Apply
new template structure to all remaining commands

## Action Items

• **User**: Review consolidated commands for accuracy and completeness • **Claude**: Complete
consolidation of remaining similar commands • **Next**: Apply new structure to all 60+ commands in
the collection

## Open Questions / Blockers

• Permission denied error when removing duplicate files (left in place) • Need validation of new
Claude Code integration features

## Next Steps

1. Complete consolidation of all duplicate and similar commands
2. Apply Claude Code template to remaining unconsolidated commands
3. Test consolidated commands for functionality and syntax compliance
4. Update VDK project to generate Claude Code specific commands

## Code Snippets

```yaml
# Claude Code command frontmatter structure
claudeCode:
  slashCommand: '/command-name'
  arguments:
    supports: true
    examples: ['example1', 'example2']
  fileReferences:
    supports: true
    autoInclude: ['CLAUDE.md']
  bashCommands:
    supports: true
    commands: ['git status', 'npm run']
```
````

```bash
# Consolidation commands used
/development-dependencies audit
/workflow-parallel setup
/meta-explain function_name --elaborate
```

```

### Technical Documentation Summary
```

/meta-summary @docs/architecture.md --technical

````

**Technical Format:**
```markdown
# TL;DR: System Architecture

## 🎯 What It Does

Microservices architecture with event-driven communication, API gateway, and service mesh for scalable e-commerce platform.

## ✅ Key Components

- **API Gateway**: Request routing, authentication, rate limiting
- **User Service**: Account management, authentication, profiles
- **Order Service**: Order processing, payment integration, fulfillment
- **Inventory Service**: Stock management, reservations, availability
- **Event Bus**: Kafka-based asynchronous communication

## 🚀 To Get Started

1. **Local Development**: `docker-compose up` with provided development stack
2. **Configuration**: Update `.env` files for each service
3. **First Test**: `curl localhost:8080/health` to verify gateway connectivity

## ⚠️ Critical Notes

- **Database per Service**: Each service owns its data, no shared databases
- **Event Ordering**: Use Kafka partitioning for events requiring ordering
- **Circuit Breakers**: All external calls protected with Hystrix patterns
- **Monitoring**: Distributed tracing required for debugging across services

## 📚 Key Resources

- **Service Discovery**: Consul configuration in `/config/consul/`
- **API Documentation**: OpenAPI specs in each service `/docs/` folder
- **Monitoring**: Grafana dashboards in `/monitoring/dashboards/`
- **Contact**: Platform team - platform@company.com
````

### Codebase Overview

```
/meta-summary codebase --quick
```

**Quick Overview Format:**

```markdown
# TL;DR: Project Codebase

## Bottom Line

Node.js/TypeScript API server with React frontend, PostgreSQL database, and comprehensive test
suite - ready for production deployment.

## Key Structure

- **`/src/api/`**: Express.js REST API with authentication and business logic
- **`/src/frontend/`**: React/TypeScript SPA with modern UI components
- **`/src/database/`**: Prisma ORM with migrations and seed data
- **`/tests/`**: Jest unit tests and Cypress integration tests (85% coverage)
- **`/docker/`**: Production-ready containerization and deployment configs

## To Start Developing

1. **Install**: `npm install` (requires Node.js 24+)
2. **Database**: `npm run db:setup` (requires PostgreSQL)
3. **Development**: `npm run dev` (starts API + frontend)

## Critical Dependencies

- **Runtime**: Node.js 24+, PostgreSQL 14+
- **Key Libraries**: Express, React, Prisma, Jest
- **Infrastructure**: Docker, nginx (production)

## Contact: Tech Lead - sarah@company.com
```

### Meeting Summary

```
/meta-summary last-meeting --meeting
```

**Meeting Format:**

```markdown
# Meeting Summary: Architecture Review

## Decisions Made

- **Database Strategy**: Adopt PostgreSQL with read replicas for scaling
- **Authentication**: Implement OAuth 2.0 with Auth0 integration
- **API Design**: Follow OpenAPI 3.0 specification for all endpoints
- **Testing**: Minimum 80% code coverage required for all services

## Action Items

- **Sarah (Tech Lead)**: Create PostgreSQL migration plan by Jan 30
- **Mike (Backend)**: Implement Auth0 integration by Feb 5
- **Lisa (Frontend)**: Update API client for OAuth flow by Feb 10
- **DevOps Team**: Set up staging environment with new auth by Feb 15

## Open Questions

- **Performance**: How will read replicas affect consistency requirements?
- **Cost**: Auth0 pricing at projected user scale needs validation
- **Migration**: Downtime window for database migration TBD

## Risks Identified

- **Timeline Risk**: Auth0 integration more complex than initially estimated
- **Dependencies**: Frontend work blocked until backend OAuth complete
- **Testing**: Additional test infrastructure needed for OAuth flows

## Next Meeting

- **Date**: February 1, 2025 at 2:00 PM
- **Agenda**: Review Auth0 integration progress and migration timeline
- **Preparation**: Each team lead provides detailed implementation plan
```

## Advanced Summarization Features

### Content-Aware Formatting

The command automatically adapts based on input type:

```markdown
## Format Detection Logic

### Code Files

- Focus on functionality, key patterns, and usage
- Include setup instructions and dependencies
- Highlight important gotchas and limitations

### Documentation

- Extract main concepts and implementation steps
- Identify prerequisites and critical information
- Provide quick reference for key procedures

### Conversations

- Structure as decisions, actions, and next steps
- Preserve important technical details and code
- Maintain accountability with responsible parties

### Research/Analysis

- Lead with recommendations and bottom line
- Include supporting evidence and tradeoffs
- Provide clear implementation pathway
```

### Progressive Disclosure

Multiple summary depths for different audiences:

```markdown
## 30-Second Version (--brief)

- Single paragraph with absolute essentials
- Bottom line conclusion and immediate action
- Critical warnings or constraints

## 2-Minute Version (--standard)

- Key details organized in scannable format
- Actionable next steps with timeframes
- Important context and dependencies

## 5-Minute Version (--detailed)

- Comprehensive background and nuances
- Alternative approaches and tradeoffs
- Detailed implementation considerations
```

### Audience-Specific Optimization

```markdown
## Executive Summary (--executive)

- Business impact and strategic implications
- Resource requirements and timeline
- Risk assessment and mitigation strategies

## Technical Summary (--technical)

- Implementation details and architecture
- Dependencies and integration points
- Performance and scaling considerations

## Operational Summary (--operational)

- Process changes and responsibilities
- Monitoring and maintenance requirements
- Troubleshooting and support procedures
```

## Integration with Claude Code Features

### Memory System Integration

Summaries automatically update project knowledge:

```markdown
# Added to CLAUDE.md

## Recent Decisions

- **2025-01-27**: Consolidated duplicate commands using new Claude Code template
- **2025-01-25**: Adopted slash command syntax for all project commands
- **2025-01-20**: Implemented file reference system for better context

## Key Learnings

- Command consolidation reduces maintenance overhead
- Standardized templates improve consistency
- File references enhance command context awareness

## Active Summaries

- **Architecture Review**: Key decisions on database and auth strategy
- **Command Consolidation**: Progress on VDK Claude Code integration
- **Security Audit**: Findings and remediation timeline
```

### File Reference Integration

Seamlessly integrates with Claude Code's file system:

- Automatic content analysis for file summaries
- Context-aware formatting based on file type
- Integration with existing project documentation

### Quality Assurance Framework

```markdown
## Summary Quality Checklist

### Essential Elements

- [ ] Can be read in under 2 minutes
- [ ] Includes concrete next steps with owners
- [ ] Highlights biggest risks and blockers
- [ ] Provides contact info or resources
- [ ] Uses bullet points and clear structure

### Content Standards

- [ ] Uses original terminology and names
- [ ] Focuses on actionable conclusions
- [ ] Balances brevity with completeness
- [ ] Appropriate for target audience
- [ ] Includes essential code/commands only

### Common Anti-Patterns

- ❌ Too much background context
- ❌ Jargon without explanation
- ❌ Facts without actionable insights
- ❌ Burying critical information
- ❌ Longer than original content
```

## Best Practices

### When to Use Each Format

- **Conversation**: End of meetings, planning sessions, problem-solving discussions
- **Technical**: Architecture reviews, implementation planning, system documentation
- **Meeting**: Formal meetings, decision-making sessions, project reviews
- **Executive**: Stakeholder updates, project status, strategic decisions

### Optimal Summary Timing

- **Real-time**: During conversations to clarify understanding
- **Post-session**: After meetings or long discussions
- **Periodic**: Weekly project summaries, monthly progress reports
- **Milestone**: Major decision points, project phases, releases

### Information Hierarchy

```markdown
## Priority Levels

### Critical (Must Include)

- Key decisions and their rationale
- Immediate action items with owners
- Blocking issues requiring attention
- Resource or timeline impacts

### Important (Should Include)

- Supporting context and background
- Alternative options considered
- Risk assessment and mitigation
- Success criteria and metrics

### Useful (May Include)

- Historical context and lessons learned
- Related work and dependencies
- Future considerations and planning
- Additional resources and references
```

## Related Commands

- `/meta-explain` - Detailed explanations that may need summarization
- `/meta-research` - Research findings that benefit from executive summaries
- `/quality-review` - Review outcomes that need structured communication
- `/workflow-plan` - Project plans that need stakeholder summaries

The goal is to transform complex information into immediately accessible and actionable insights for
busy stakeholders who need to make quick, informed decisions.
