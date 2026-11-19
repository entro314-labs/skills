#!/bin/bash

# Pre-edit validation hook for Claude Code Documentation Project
# Prevents drift by validating edits before they're applied

# Colors for output
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo "🔍 Running pre-edit validation..."

# Function to check if file is a command file
is_command_file() {
    local file="$1"
    [[ "$file" == *.md ]] && [[ "$file" == */commands/* ]]
}

# Function to validate command file syntax
validate_command_file() {
    local file="$1"
    local errors=0
    
    echo "  📝 Validating: $file"
    
    # Check for old /project:command syntax
    if grep -q "/project:" "$file"; then
        echo -e "  ${RED}❌ ERROR: Found /project:command syntax in $file${NC}"
        echo "    Should use /command format instead"
        errors=$((errors + 1))
    fi
    
    # Check for required frontmatter sections
    if ! grep -q "^---" "$file"; then
        echo -e "  ${YELLOW}⚠️  WARNING: No YAML frontmatter found in $file${NC}"
    else
        # Check for required fields
        if ! grep -q "slashCommand:" "$file"; then
            echo -e "  ${YELLOW}⚠️  WARNING: Missing slashCommand field in $file${NC}"
        fi
        
        if ! grep -q "examples:" "$file"; then
            echo -e "  ${YELLOW}⚠️  WARNING: Missing examples section in $file${NC}"
        fi
    fi
    
    # Check for minimum example count (should have at least 3 examples)
    local example_count=$(grep -c "usage:" "$file" || echo "0")
    if [[ $example_count -lt 3 ]]; then
        echo -e "  ${YELLOW}⚠️  WARNING: Only $example_count examples found in $file (recommended: 3+)${NC}"
    fi
    
    return $errors
}

# Main validation logic
total_errors=0

# Check if we're editing command files
for file in "$@"; do
    if is_command_file "$file"; then
        validate_command_file "$file"
        total_errors=$((total_errors + $?))
    fi
done

# Final validation
if [[ $total_errors -gt 0 ]]; then
    echo -e "\n${RED}💥 Pre-edit validation failed with $total_errors errors${NC}"
    echo "Please fix these issues before proceeding."
    echo "Refer to PROJECT_MANIFEST.md for standards."
    exit 1
else
    echo -e "\n${GREEN}✅ Pre-edit validation passed${NC}"
fi

# Remind about manifest if editing command files
if [[ "$*" == *"/commands/"* ]]; then
    echo -e "\n${YELLOW}📖 REMINDER: Check PROJECT_MANIFEST.md for current patterns${NC}"
    echo -e "   Update REFACTOR_PLAN.md if you identify new issues"
fi