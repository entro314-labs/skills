---
name: workflow-parallel
description: "Sets up parallel development with git worktrees and work-stealing Claude agents that claim tasks from a shared queue, with setup, launch, status, and cleanup actions. Use when asked to run parallel agents or split a plan across worktrees."
disable-model-invocation: true
---

# Parallel Development Workflow

## Purpose

Set up intelligent parallel development using git worktrees and work-stealing agents. This command
creates a sophisticated multi-agent system where Claude instances automatically claim tasks, work in
parallel, and coordinate through a shared task queue - maximizing development velocity while
avoiding conflicts.

## Claude Code Integration

### Slash Command Usage

```
/workflow-parallel [action] [options]
```

**Available Actions:**

- `setup` - Initialize parallel environment and agent system
- `launch [count]` - Start specified number of work-stealing agents
- `status` - Monitor agent progress and task completion
- `cleanup` - Clean up completed worktrees and merge results
- `join [point]` - Wait for completion and execute join point

### Git Worktree Detection

The command analyzes current repository state:

**Current Worktrees**: !`git worktree list || true`

**Branch Status**: !`git branch -vv || true`

**Project Detection**:
!`PROJECT=$(basename $(git rev-parse --show-toplevel 2>/dev/null) || basename $PWD); echo "Project: $PROJECT" || true`

### Task Plan Integration

Automatically integrates with existing task plans:

```bash
# Check for existing plan
!find . -path "*/tasks/$PROJECT" -type d 2>/dev/null || echo "No task plan found"

# Show task structure if exists
![ -f "/tasks/$PROJECT/status.json" ] && echo "Task plan detected" || echo "Use /plan-multi-agent first"
```

## Usage Examples

### Complete Parallel Setup Workflow

```
/workflow-parallel setup
```

**Setup Process:**

1. **Environment Detection**: Checks git repository and task plan availability
2. **Deno Configuration**: Creates or updates `deno.json` with agent task
3. **Worktree Preparation**: Analyzes optimal worktree structure based on task plan
4. **Agent Scripts**: Generates intelligent work-stealing agent launcher
5. **Coordination System**: Sets up atomic task claiming and progress tracking

**Expected Output:**

````markdown
✅ Parallel Development Environment Ready

## Launch Commands

```bash
# Terminal 1: Launch first agent
deno task agent

# Terminal 2: Launch second agent
deno task agent

# Terminal 3: Launch third agent
deno task agent
```
````

## Agent Coordination

- Work-stealing task queue with atomic claiming
- Automatic worktree creation and branch management
- Real-time progress tracking and synchronization
- Intelligent task dependency resolution

```

### Multi-Agent Launch
```

/workflow-parallel launch 3

```

**Launch Process:**
1. **Agent Generation**: Creates unique agent IDs and workspace assignments
2. **Automatic Worktree Creation**: Sets up isolated development environments
3. **Task Distribution**: Agents automatically claim available tasks
4. **Progress Monitoring**: Real-time coordination through shared state
5. **Conflict Prevention**: Atomic file locking prevents task conflicts

**Expected Behavior:**
- **Agent A**: Claims "setup-foundation/project-structure", creates `../project-foundation` worktree
- **Agent B**: Claims "core-features/api-implementation", creates `../project-api` worktree
- **Agent C**: Claims "testing/unit-tests", creates `../project-testing` worktree

### Real-Time Status Monitoring
```

/workflow-parallel status

````

**Status Dashboard:**
```markdown
## Parallel Development Status

### Active Agents
| Agent ID | Current Task | Worktree | Progress | ETA |
|----------|--------------|----------|----------|-----|
| agent-1234 | setup-foundation | ../project-foundation | 80% | 15min |
| agent-5678 | core-features/api | ../project-api | 45% | 30min |
| agent-9012 | testing/unit-tests | ../project-testing | 90% | 5min |

### Task Queue Status
- **Completed**: 8/15 tasks
- **In Progress**: 3/15 tasks
- **Pending**: 4/15 tasks
- **Blocked**: 0/15 tasks

### Join Points
- **integration-ready**: Waiting for 2 more tasks
- **testing-phase**: All dependencies complete
````

## Advanced Features

### Work-Stealing Agent System

**Intelligent Task Claiming:**

```typescript
// Generated in scripts/launch-agent.ts
interface TaskClaim {
  agentId: string;
  taskPath: string;
  claimTime: string;
  estimatedCompletion: string;
}

// Atomic task claiming prevents conflicts
async function claimNextTask(): Promise<Task | null> {
  return await atomicFileOperation('/tasks/status.json', (status) => {
    const availableTask = findUnclaimedTask(status);
    if (availableTask) {
      availableTask.claimedBy = this.agentId;
      availableTask.claimTime = new Date().toISOString();
    }
    return availableTask;
  });
}
```

**Automatic Load Balancing:**

- Fast agents naturally claim more tasks
- Failed agents release tasks back to queue
- Dynamic scaling by launching additional agents
- No manual task assignment required

### Branch and Worktree Management

**Automatic Branch Creation:**

```bash
# Generated git operations
for task in $(jq -r '.tasks[].id' /tasks/$PROJECT/status.json); do
  branch_name="parallel/$(echo $task | tr '/' '-')"
  if ! git show-ref --verify --quiet "refs/heads/$branch_name"; then
    git branch $branch_name
  fi
done
```

**Intelligent Worktree Naming:**

```bash
# Naming convention: project-[feature-area]
PROJECT=$(basename $(git rev-parse --show-toplevel))
WORKTREE_BASE="../$PROJECT"

# Examples:
# ../myapp-foundation (setup-foundation tasks)
# ../myapp-api (core-features/api tasks)
# ../myapp-testing (testing tasks)
```

### Coordination and Synchronization

**Join Point Management:**

```bash
# Check readiness for integration
/workflow-parallel join integration
```

**Output:**

```markdown
## Join Point: integration

### Prerequisites Status

✅ setup-foundation/project-structure (completed) ✅ setup-foundation/dependencies (completed) ⚡
core-features/api-implementation (in-progress, 80%) ⏸️ core-features/authentication (blocked by
api-implementation)

### Estimated Ready: 15 minutes

### Actions Available:

- Wait for completion: `/workflow-parallel wait integration`
- Force join (risky): `/workflow-parallel force-join integration`
```

**Automatic Conflict Resolution:**

```typescript
// Generated conflict resolution
interface ConflictResolution {
  strategy: 'merge' | 'rebase' | 'manual';
  conflicts: FileConflict[];
  resolution: 'automatic' | 'requires-review';
}

async function resolveWorktreeConflicts(worktrees: Worktree[]): Promise<ConflictResolution> {
  // Intelligent conflict detection and resolution
  // Prioritizes automatic resolution for non-overlapping changes
}
```

## Integration with Claude Code Features

### Memory System Integration

Automatically updates project memory with parallel development patterns:

```markdown
# Added to CLAUDE.md

## Parallel Development Workflow

### Active Branches

- `parallel/foundation` - Project setup and configuration
- `parallel/api` - Core API implementation
- `parallel/testing` - Test suite development

### Agent Coordination

- Work-stealing task queue in `/tasks/[project]/status.json`
- Atomic task claiming prevents conflicts
- Join points: integration, testing, deployment

### Best Practices

- Launch agents with: `deno task agent`
- Monitor progress with: `/workflow-parallel status`
- Clean up with: `/workflow-parallel cleanup`
```

### Permission System

Uses intelligent permission scoping:

```json
{
  "permissions": {
    "allow": [
      "Read(/tasks/**/*)",
      "Write(/tasks/**/*)",
      "Bash(git worktree:*)",
      "Bash(git branch:*)",
      "Bash(deno task:*)",
      "Write(.claude-agents/**/*)"
    ]
  }
}
```

### Hook Integration

**Pre-execution hooks:**

- Verify git repository state
- Check task plan availability
- Validate agent dependencies

**Post-execution hooks:**

- Update progress tracking
- Merge completed worktrees
- Clean up temporary files

## Error Handling and Recovery

### Agent Failure Recovery

```typescript
// Built-in failure recovery
interface AgentHealthCheck {
  lastHeartbeat: string;
  currentTask: string;
  healthStatus: 'active' | 'stale' | 'failed';
}

// Automatic task reclamation
async function reclaimStaleTasks(timeout: number = 300000) {
  // Reclaim tasks from agents that haven't reported in 5 minutes
}
```

### Conflict Prevention

- **File-level locking**: Prevents concurrent modifications
- **Task dependency validation**: Ensures prerequisites are met
- **Atomic state updates**: Prevents race conditions in coordination
- **Rollback capabilities**: Safe recovery from failed operations

### Safe Cleanup

```bash
# Generated cleanup procedures
/workflow-parallel cleanup --agent=agent-1234
```

**Cleanup Process:**

1. **Complete Current Task**: Allow agent to finish current work
2. **Create PR**: Generate pull request from agent's branch
3. **Merge Strategy**: Intelligent merge with conflict resolution
4. **Worktree Removal**: Safe removal without data loss
5. **State Update**: Update coordination state and task tracking

## Best Practices

### Optimal Task Distribution

- **Independent Tasks**: Perfect for parallel execution
- **Sequential Dependencies**: Handled through task prerequisites
- **Shared Resources**: Coordinated through join points
- **Testing Integration**: Parallel test execution where possible

### Agent Launch Strategy

```bash
# Start with conservative number
/workflow-parallel launch 2

# Scale up based on available tasks
/workflow-parallel launch 1  # Add one more agent

# Monitor and adjust
/workflow-parallel status    # Check if more agents needed
```

### Performance Monitoring

- **Task Completion Rate**: Monitor throughput across agents
- **Conflict Frequency**: Track merge conflicts and resolution time
- **Resource Utilization**: Ensure agents have adequate work
- **Join Point Efficiency**: Minimize wait times at synchronization points

## Related Commands

- `/plan-multi-agent` - Create the task plan required for parallel execution
- `/workflow-coordinate` - Manual task assignment for specific scenarios
- `/merge` - Intelligent merging of parallel work results
- `/sync` - Synchronize changes across active worktrees

The goal is to maximize development velocity through intelligent parallel execution while
maintaining code quality and team coordination.
