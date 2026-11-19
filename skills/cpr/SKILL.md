---
name: cpr
description: "Commits current changes, pushes the branch to the remote and opens a pull request with gh, returning the PR URL. Use when asked to commit, push and open a PR in one go. An optional argument supplies the commit message, otherwise one is generated from the diff."
disable-model-invocation: true
---

Create a commit, push to remote, and open a pull request.

Steps:

1. Run git status and git diff to see current changes
2. Create a meaningful commit with the message: $ARGUMENTS
3. Push the current branch to remote (with -u flag if needed)
4. Create a pull request using gh cli with an appropriate title and description
5. Return the PR URL

If no commit message is provided in $ARGUMENTS, analyze the changes and generate an appropriate
commit message.
