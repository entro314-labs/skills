#!/bin/bash

# Post-edit update hook for Claude Code Documentation Project
# Automatically updates tracking files and validates changes

# Colors for output
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo "🔄 Running post-edit updates..."

# Function to check if file is a command file
is_command_file() {
    local file="$1"
    [[ "$file" == *.md ]] && [[ "$file" == */commands/* ]]
}

# Function to update CLAUDE.md with changes
update_claude_memory() {
    local edited_files="$1"
    local timestamp=$(date +"%Y-%m-%d %H:%M")
    
    echo "  📝 Updating CLAUDE.md memory..."
    
    # Add to the architectural decisions section if not already present
    if ! grep -q "Recent Changes" CLAUDE.md; then
        cat >> CLAUDE.md << EOF

### Recent Changes (Auto-tracked)
EOF
    fi
    
    # Add this edit session
    sed -i.bak "/### Recent Changes (Auto-tracked)/a\\
- $timestamp: Edited $edited_files" CLAUDE.md
    
    rm -f CLAUDE.md.bak
}

# Function to validate the final state
validate_final_state() {
    echo "  🔍 Running final validation..."
    
    # Count any remaining /project: syntax
    local project_syntax_count=$(find commands/ -name "*.md" -exec grep -l "/project:" {} \; 2>/dev/null | wc -l | tr -d ' ')
    
    if [[ $project_syntax_count -gt 0 ]]; then
        echo -e "  ${RED}❌ WARNING: Found $project_syntax_count files still using /project: syntax${NC}"
        find commands/ -name "*.md" -exec grep -l "/project:" {} \; 2>/dev/null | head -5
    else
        echo -e "  ${GREEN}✅ No /project: syntax found${NC}"
    fi
    
    # Count total commands
    local total_commands=$(find commands/ -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
    echo -e "  ${BLUE}📊 Total commands: $total_commands${NC}"
}

# Function to suggest next actions
suggest_next_actions() {
    local edited_command_files="$1"
    
    if [[ $edited_command_files -gt 0 ]]; then
        echo -e "\n${YELLOW}💡 Suggested next actions:${NC}"
        echo "   1. Run: /validate --all"
        echo "   2. Check: /review latest --quick"
        echo "   3. Update REFACTOR_PLAN.md if you identified new issues"
        echo "   4. Consider running: /standardize --aspect all"
    fi
}

# Main execution
edited_command_files=0
all_edited_files=""

for file in "$@"; do
    if is_command_file "$file"; then
        edited_command_files=$((edited_command_files + 1))
        all_edited_files="$all_edited_files $(basename "$file")"
    fi
done

# Update memory if command files were edited
if [[ $edited_command_files -gt 0 ]]; then
    update_claude_memory "$all_edited_files"
fi

# Always validate final state
validate_final_state

# Provide suggestions
suggest_next_actions $edited_command_files

echo -e "\n${GREEN}🎯 Post-edit updates complete${NC}"

# Exit successfully
exit 0