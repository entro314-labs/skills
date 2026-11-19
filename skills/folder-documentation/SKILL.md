---
name: folder-documentation
description: "Generates technical documentation for a folder or module: purpose, file inventory, key components, data flow and usage. Use when asked to document a directory, package or module."
disable-model-invocation: true
---

# Technical Documentation Generation Prompt

## Objective

Generate technical documentation for every folder and subfolder in the project structure, creating a README.md or TECHNICAL_DOCS.md file in each directory.

## Core Requirements

### Traversal Rules

- Scan ALL folders recursively, regardless of nesting depth
- Create documentation file in EVERY folder that contains files
- Process folders in depth-first order
- Skip empty folders or folders containing only other folders

### Documentation Structure per Folder

#### File Header

```markdown
# Technical Documentation: [Folder Name]
**Path:** `[relative/path/to/folder]`
**Last Updated:** [timestamp]
```

#### Content Sections

**1. Overview**

- Brief description of folder purpose
- Main functionality or module responsibility

**2. File Inventory**

- List all files with file types
- Primary purpose of each file

**3. Technical Details**

For each code file, extract and document:

**Classes:**

- Class name and inheritance
- Primary responsibilities
- Key properties/attributes
- Constructor parameters

**Functions/Methods:**

- Function signatures
- Input parameters and types
- Return values and types
- Core functionality
- Dependencies on other functions

**Variables/Constants:**

- Global variables
- Configuration constants
- Environment variables
- Data structures

**Imports/Dependencies:**

- External libraries used
- Internal module dependencies
- File relationships within project

**4. Relationships & Logic Flow**

- How files interact with each other
- Data flow between components
- Calling patterns
- Shared resources or utilities

**5. Configuration & Setup**

- Required environment variables
- Configuration files present
- Setup requirements specific to this folder

### Output Format Requirements

**Use bullet points exclusively:**

- Main points as primary bullets (-)
- Sub-details as nested bullets (  -)
- Code elements in backticks: `function_name()`
- File names in backticks: `filename.py`

**Example Structure:**

```markdown
## Classes
- `UserManager`
  - Inherits from: `BaseManager`
  - Purpose: Handle user authentication and session management
  - Key methods:
    - `authenticate(username, password)` - Returns boolean
    - `create_session(user_id)` - Returns session token
    - `validate_token(token)` - Returns user object or None
  - Dependencies: `database.py`, `crypto_utils.py`

## Functions
- `hash_password(password, salt)`
  - Input: string password, string salt
  - Output: hashed password string
  - Uses: bcrypt library
  - Called by: `UserManager.authenticate()`
```

### Technical Analysis Depth

**For each code file, identify:**

- Entry points and main execution flows
- Error handling patterns
- Logging mechanisms
- Performance considerations
- Security implementations
- Testing files and coverage

**For configuration files:**

- Purpose and scope
- Required vs optional settings
- Default values
- Impact on application behavior

**For data files:**

- Format and structure
- Usage context
- Size and performance implications

### Execution Instructions

1. **Start from project root**
2. **Traverse each subdirectory recursively**
3. **For each folder containing files:**
   - Analyze all files in that folder
   - Generate documentation following the structure above
   - Save as `TECHNICAL_DOCS.md` in that folder
4. **Maintain consistency:**
   - Use identical formatting across all folders
   - Apply same level of technical detail
   - Follow bullet point format strictly

### Quality Constraints

**Include:**

- All functions, classes, and significant variables
- Inter-file relationships and dependencies
- Actual implementation details (not assumptions)
- Configuration and setup requirements

**Exclude:**

- Marketing language or business value statements
- Speculative or aspirational descriptions
- Timeline or roadmap references
- Verbose explanations (keep to essential technical facts)

**Verification checklist for each folder:**

- [ ] All code files analyzed
- [ ] All classes documented with methods
- [ ] All functions documented with signatures
- [ ] Dependencies and relationships mapped
- [ ] Bullet point format maintained
- [ ] Technical accuracy verified
- [ ] No business jargon included

### Error Handling

- If file cannot be parsed, document the file type and note parsing limitation
- If folder access is restricted, document the restriction
- Continue processing other folders even if individual folders fail

## Expected Output

Every folder in the project will contain a `TECHNICAL_DOCS.md` file with comprehensive technical information about its contents, formatted consistently using bullet points and focusing on concrete implementation details.
