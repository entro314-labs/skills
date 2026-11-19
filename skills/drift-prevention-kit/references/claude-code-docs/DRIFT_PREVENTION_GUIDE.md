---
title: '🛡️ Drift Prevention Guide - Claude Code Documentation'
description:
  '- Contains: Architecture decisions, code standards, file organization - Update when: Core
  patterns change, new standards established - Read before: An.'
category: 'Claude Code'
---

# 🛡️ Drift Prevention Guide - Claude Code Documentation

## Quick Start

### Every Session Start

```bash
# Read the three key files:
1. PROJECT_MANIFEST.md   # Architecture rules and patterns
2. REFACTOR_PLAN.md      # Current issues and priorities
3. CLAUDE.md             # Memory and recent decisions

# Run health check:
/validate --all
```

### Every Session End

```bash
# Update tracking files:
1. Update CLAUDE.md with new decisions
2. Update REFACTOR_PLAN.md with identified issues
3. Update PROJECT_MANIFEST.md if patterns changed

# Final validation:
/standardize --aspect all
```

## 🎯 The Three-File System

### 1. PROJECT_MANIFEST.md (Your North Star)

- **Contains**: Architecture decisions, code standards, file organization
- **Update when**: Core patterns change, new standards established
- **Read before**: Any major changes or new command creation

### 2. REFACTOR_PLAN.md (Your Cleanup Tracker)

- **Contains**: Technical debt, issues to fix, improvement tasks
- **Update when**: You identify problems, complete fixes
- **Use for**: Prioritizing work, tracking progress

### 3. CLAUDE.md (Your Memory)

- **Contains**: Session context, recent decisions, lessons learned
- **Update when**: Every session, architectural decisions made
- **Use for**: Maintaining context between sessions

## 🔧 Automated Safeguards

### Pre-Edit Validation

- Blocks `/project:command` syntax
- Checks for required frontmatter
- Warns about missing examples
- Validates command file structure

### Post-Edit Updates

- Updates CLAUDE.md with changes
- Validates final state
- Suggests next actions
- Tracks command counts

### Session Hooks

- **Start**: Reminds you to check manifest and plan
- **End**: Provides checklist for updating tracking files

## 📋 Command Workflows

### Daily Validation

```bash
/validate --all                    # Check all files
/review latest --quick             # Review recent changes
```

### Weekly Maintenance

```bash
/standardize --aspect all          # Ensure consistency
/technical-debt --dependencies     # Check for issues
/audit security --full            # Security review
```

### Monthly Cleanup

```bash
/technical-debt --full             # Full analysis
/clean --duplicates               # Remove redundancy
/dependencies analyze              # Dependency health
```

## 🚨 Red Flags (Watch For)

### Syntax Drift

- ❌ Any `/project:command` syntax appearing
- ❌ Missing YAML frontmatter in command files
- ❌ Commands without proper examples

### Content Drift

- ❌ Vague or unclear command descriptions
- ❌ Commands without realistic use cases
- ❌ Missing security considerations

### Structure Drift

- ❌ Commands in wrong categories/folders
- ❌ Duplicate functionality across commands
- ❌ Inconsistent naming patterns

## 🎛️ Settings Configuration

The `.claude/settings.json` provides:

- **Automated hooks** for validation and updates
- **Session reminders** for checking manifest files
- **Quick commands** for common validation tasks
- **Validation rules** to prevent common mistakes

## 🆘 When Things Go Wrong

### If You Find Drift

1. **Stop** - Don't make more changes
2. **Document** - Add issue to REFACTOR_PLAN.md
3. **Prioritize** - Mark as 🔴, 🟡, or 🟢
4. **Fix systematically** - One category at a time

### If Validation Fails

1. Check the specific error message
2. Refer to PROJECT_MANIFEST.md for correct patterns
3. Fix the issue before proceeding
4. Re-run validation to confirm

### If Patterns Need Changing

1. **First** - Document the change in PROJECT_MANIFEST.md
2. **Then** - Update affected commands consistently
3. **Finally** - Update CLAUDE.md with the decision rationale

## 💡 Pro Tips

### For Large Changes

- Work on one category at a time (development/, meta/, etc.)
- Update manifest BEFORE making changes
- Use `/plan` command to create systematic approach

### For New Commands

- Check existing commands for similar functionality first
- Follow the template in claude-code-command-template.md
- Always include 3+ realistic examples

### For Maintenance

- Set up weekly `/standardize --aspect all` runs
- Monthly `/technical-debt --full` reviews
- Quarterly PROJECT_MANIFEST.md comprehensive reviews

## 🔄 Integration with Other Tools

### Git Workflow

```bash
# Before commits:
/validate --all && /review latest

# In commit messages:
git commit -m "feat: add /new-command following PROJECT_MANIFEST patterns"
```

### CI/CD Integration

- Run validation hooks in CI pipeline
- Block merges if validation fails
- Generate drift reports automatically

### Team Coordination

- Share PROJECT_MANIFEST.md changes in PR descriptions
- Reference REFACTOR_PLAN.md in planning meetings
- Use CLAUDE.md for onboarding new team members

---

**Remember**: This system works because it gives Claude Code **persistent memory** through the three
tracking files. Always keep them updated and reference them explicitly in every session!
