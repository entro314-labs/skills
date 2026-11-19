---
name: workflow-plan
description: "Creates project plans with codebase analysis, hierarchical task breakdown, dependencies, risk assessment, and progress tracking, single-agent or multi-agent with worktrees. Use when asked to plan a feature or project, break down tasks, or analyze before building."
disable-model-invocation: true
---

# Project Planning & Task Management

## Purpose

Comprehensive project planning system with hierarchical task management and optional multi-agent
coordination. Creates structured plans with task dependencies, progress tracking, and automated
coordination for parallel development workflows.

## Claude Code Integration

### Slash Command Usage

```
/workflow-plan <objective> [--mode] [--options]
```

**Planning Modes:**

- `--single` - Single-agent development plan (default)
- `--multi-agent` - Multi-agent coordination with worktrees
- `--analyze-only` - Codebase analysis without plan creation
- `--coordination` - Just show coordination status for existing plan

**Planning Options:**

- `--quick` - High-level plan with major phases only
- `--detailed` - Comprehensive plan with subtasks and dependencies
- `--estimate` - Include time and effort estimates
- `--risk-assessment` - Add risk analysis and mitigation strategies

### Automatic Codebase Analysis

The command performs intelligent codebase discovery:

**Project Structure**: !`find . -type f -name "*.{json,md,toml,yaml}" -maxdepth 2 || true`

**Package Managers**:
!`find . -name "package.json" -o -name "Cargo.toml" -o -name "go.mod" -o -name "pom.xml" | head -5 || true`

**Recent Activity**: !`git log --oneline -10 2>/dev/null || echo "No git history" || true`

**Documentation**: !`find . -name "README*" -o -name "CONTRIBUTING*" -o -name "docs" -type d || true`

## Usage Examples

### Single-Agent Planning

```
/workflow-plan implement user authentication system
```

**Planning Process:**

1. **Codebase Analysis**: Examines existing auth patterns, dependencies, and architecture
2. **Task Decomposition**: Breaks down authentication into logical phases
3. **Dependency Mapping**: Identifies prerequisites and dependencies between tasks
4. **Progress Framework**: Creates trackable tasks with clear completion criteria
5. **Integration Points**: Defines milestones and testing checkpoints

**Expected Output:**

```markdown
# Project Plan: User Authentication System

## Codebase Analysis

### Current State

- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Testing**: Jest with 78% coverage
- **Architecture**: Layered architecture (routes → services → data)

### Existing Auth Infrastructure

- Basic session handling in place
- Password hashing utilities available
- JWT library already installed
- User model exists but incomplete

## Task Hierarchy

### Phase 1: Foundation (2-3 days)

- **Task**: setup-auth-foundation
  - **Subtask**: Update user model with auth fields
  - **Subtask**: Create auth middleware structure
  - **Subtask**: Set up password hashing utilities
  - **Subtask**: Configure JWT token handling

### Phase 2: Core Authentication (3-4 days)

- **Task**: implement-auth-core
  - **Subtask**: Registration endpoint with validation
  - **Subtask**: Login endpoint with error handling
  - **Subtask**: JWT token generation and verification
  - **Subtask**: Password reset functionality

### Phase 3: Security & Integration (2-3 days)

- **Task**: security-hardening
  - **Subtask**: Rate limiting implementation
  - **Subtask**: CSRF protection
  - **Subtask**: Session management
  - **Subtask**: Security headers middleware

### Phase 4: Testing & Documentation (1-2 days)

- **Task**: testing-documentation
  - **Subtask**: Unit tests for auth services
  - **Subtask**: Integration tests for auth flows
  - **Subtask**: API documentation updates
  - **Subtask**: Security audit checklist

## Dependencies
```

setup-auth-foundation ↓ implement-auth-core ↓ security-hardening ↓ testing-documentation

````

## Risk Assessment

### High Risk
- **Security vulnerabilities**: Implement thorough testing and security review
- **Breaking changes**: May affect existing user sessions
- **Database migrations**: Ensure proper backup and rollback procedures

### Medium Risk
- **Performance impact**: Monitor login response times
- **Third-party dependencies**: JWT library updates may affect compatibility

### Mitigation Strategies
- Feature flags for gradual rollout
- Comprehensive security testing
- Database migration testing in staging
- Performance benchmarking

## Implementation Commands

```bash
# Create task structure
/task-create plan "user-auth" --priority=high
/task-create task "user-auth/setup-auth-foundation" --priority=high
/task-create task "user-auth/implement-auth-core" --priority=high
/task-create task "user-auth/security-hardening" --priority=medium
/task-create task "user-auth/testing-documentation" --priority=medium

# Track progress
/task-list --plan="user-auth"
/task-update "user-auth/setup-auth-foundation" --status=in-progress
````

## Estimated Timeline: 8-12 days

```

### Multi-Agent Coordination
```

/workflow-plan refactor database layer --multi-agent

````

**Enhanced Planning Process:**
1. **Agent Assignment Strategy**: Analyzes codebase to identify parallel work opportunities
2. **Worktree Planning**: Determines optimal branch and worktree structure
3. **Coordination Protocol**: Establishes communication and synchronization methods
4. **Dependency Management**: Creates join points and handoff procedures
5. **Conflict Prevention**: Identifies potential merge conflicts and prevention strategies

**Expected Output:**
```markdown
# Multi-Agent Plan: Database Layer Refactoring

## Agent Coordination Strategy

### Agent A - Schema & Migrations (claude-schema)
- **Worktree**: `../project-schema`
- **Branch**: `feature/schema-refactor`
- **Focus**: Database schema, migrations, and model definitions
- **Can Start**: Immediately
- **Dependencies**: None

### Agent B - Repository Layer (claude-repo)
- **Worktree**: `../project-repository`
- **Branch**: `feature/repository-pattern`
- **Focus**: Repository interfaces and implementations
- **Can Start**: After Agent A completes schema analysis
- **Dependencies**: Schema analysis from Agent A

### Agent C - Testing & Integration (claude-testing)
- **Worktree**: `../project-testing`
- **Branch**: `feature/database-tests`
- **Focus**: Test suite updates and integration testing
- **Can Start**: After Agents A & B reach integration point
- **Dependencies**: Completed work from both Agent A and B

## Coordination Structure

```json
{
  "version": "3.0",
  "coordination": {
    "agents": {
      "agent-a": {
        "name": "claude-schema",
        "worktree": "../project-schema",
        "branch": "feature/schema-refactor",
        "assignedTasks": ["schema-analysis", "migration-design"],
        "status": "ready"
      },
      "agent-b": {
        "name": "claude-repo",
        "worktree": "../project-repository",
        "branch": "feature/repository-pattern",
        "assignedTasks": ["repository-interfaces", "implementation"],
        "status": "waiting",
        "waitingFor": ["schema-analysis"]
      },
      "agent-c": {
        "name": "claude-testing",
        "worktree": "../project-testing",
        "branch": "feature/database-tests",
        "assignedTasks": ["test-updates", "integration-tests"],
        "status": "waiting",
        "waitingFor": ["repository-interfaces", "implementation"]
      }
    },
    "joinPoints": [
      {
        "phase": "schema-complete",
        "trigger": ["schema-analysis", "migration-design"],
        "enables": ["repository-interfaces"]
      },
      {
        "phase": "integration-ready",
        "trigger": ["repository-interfaces", "implementation"],
        "enables": ["test-updates", "integration-tests"]
      }
    ]
  }
}
````

## Launch Instructions

### Setup Worktrees

```bash
# Agent A - Schema work
git worktree add ../project-schema feature/schema-refactor
git worktree add ../project-repository feature/repository-pattern
git worktree add ../project-testing feature/database-tests
```

### Launch Agents

```bash
# Terminal 1 - Agent A (Schema)
cd ../project-schema
/task-list --assigned="agent-a"

# Terminal 2 - Agent B (Repository)
cd ../project-repository
/task-list --assigned="agent-b" --wait-for="schema-analysis"

# Terminal 3 - Agent C (Testing)
cd ../project-testing
/task-list --assigned="agent-c" --wait-for="repository-interfaces,implementation"
```

## Coordination Protocol

### Progress Updates

- Each agent updates task status via `/task-update`
- Status changes automatically sync across all agents
- Join points trigger notifications to waiting agents

### Communication

- **Status Checks**: `/agent-status` shows all agent progress
- **Dependencies**: `/task-dependencies` shows what's blocking
- **Coordination**: `/coordination-status` shows join point readiness

### Merge Strategy

1. **Agent A** completes schema work, pushes to feature branch
2. **Agent B** merges schema changes, completes repository work
3. **Agent C** merges both previous branches, runs full test suite
4. **Final Integration**: All agents coordinate final merge to main

## Estimated Timeline: 6-8 days (vs 12-15 days single-agent)

```

### Codebase Analysis Only
```

/workflow-plan --analyze-only

````

**Analysis Focus:**
1. **Architecture Assessment**: Identifies patterns, conventions, and architectural decisions
2. **Technical Debt Analysis**: Evaluates code quality, test coverage, and maintenance issues
3. **Dependency Review**: Analyzes package management and security vulnerabilities
4. **Performance Baseline**: Identifies potential bottlenecks and optimization opportunities
5. **Planning Recommendations**: Suggests optimal planning approaches for future work

## Advanced Planning Features

### Intelligent Task Decomposition

The system automatically identifies optimal task breakdown:
```markdown
## Task Analysis

### Independent Tasks (Can Run in Parallel)
- UI component updates
- Documentation improvements
- Unit test additions
- Linting and formatting fixes

### Sequential Tasks (Must Follow Order)
- Database schema changes
- API breaking changes
- Build system modifications
- Authentication system updates

### Critical Path Analysis
````

Database Schema → API Updates → Frontend Changes → Integration Tests ↓ ↓ ↓ ↓ 3 days 4 days 5 days 2
days

```

```

### Risk Assessment Integration

Automatic risk identification and mitigation planning:

```markdown
## Risk Matrix

| Risk Factor              | Probability | Impact | Mitigation Strategy                 |
| ------------------------ | ----------- | ------ | ----------------------------------- |
| Breaking Changes         | High        | High   | Feature flags, gradual rollout      |
| Performance Regression   | Medium      | Medium | Benchmarking, monitoring            |
| Security Vulnerabilities | Low         | High   | Security audit, penetration testing |
| Team Coordination        | Medium      | Low    | Clear communication protocols       |
```

### Resource Allocation

Optimal resource distribution for multi-agent scenarios:

- **Skill-based assignment**: Matches agent capabilities to task requirements
- **Load balancing**: Distributes work evenly across available agents
- **Dependency optimization**: Minimizes waiting time through intelligent sequencing
- **Conflict prevention**: Identifies and prevents potential merge conflicts

## Integration with Claude Code Features

### Memory System Integration

Automatically updates project knowledge:

```markdown
# Added to CLAUDE.md

## Active Plans

- **user-auth**: Authentication system implementation (Phase 2/4)
- **database-refactor**: Multi-agent database layer refactoring (Agent B active)

## Planning Patterns

- Prefer hierarchical task breakdown for complex features
- Use multi-agent coordination for large refactoring projects
- Always include security review phase for auth-related changes

## Coordination Preferences

- Maximum 3 agents for optimal coordination
- Schema changes always handled by dedicated agent
- Testing agent handles final integration
```

### File Reference Integration

Seamless integration with Claude Code's file system:

- Auto-discovery of relevant configuration files
- Intelligent analysis of existing code patterns
- Automatic inclusion of related documentation

### TodoWrite Integration

Bidirectional sync with todo management:

```markdown
## Task ↔ Todo Synchronization

### Plan Creation

- Main plan creates high-level todo
- Tasks create specific todo items
- Subtasks create actionable todo items

### Progress Tracking

- Todo completion triggers task status updates
- Task completion aggregates to plan progress
- Plan completion marks project milestone
```

## Best Practices

### When to Use Each Mode

- **Single-agent**: Feature development, bug fixes, documentation updates
- **Multi-agent**: Large refactoring, parallel feature development, comprehensive testing
- **Analysis-only**: Understanding new codebases, architecture reviews, planning preparation

### Optimal Task Sizing

- **Plans**: Major features or projects (weeks to months)
- **Tasks**: Logical phases or components (days to weeks)
- **Subtasks**: Specific implementation items (hours to days)

### Coordination Best Practices

- Limit to 3-4 agents maximum for manageable coordination
- Ensure clear handoff points between dependent work
- Design for autonomous work with minimal cross-agent communication
- Plan for integration complexity and testing overhead

## Related Commands

- `/workflow-parallel` - Launch multi-agent execution of existing plan
- `/workflow-coordinate` - Manage ongoing multi-agent coordination
- `/quality-review` - Review plan progress and quality
- `/task` - Detailed task management and tracking

The goal is to transform project ideas into structured, executable plans with clear progress
tracking and optional multi-agent coordination for maximum development velocity.
