---
name: setup
description: "Sets up a new project environment: Node.js version via fnm and .nvmrc, pnpm, ESLint, Prettier, TypeScript, git init and .gitignore, .env.example, common scripts, Docker files and a README. Use when asked to bootstrap or set up a new project. Takes project details as an argument."
disable-model-invocation: true
---

Set up a new project environment: $ARGUMENTS

Please help with:
1. **Node.js Setup**: Check for .nvmrc and set up fnm if needed
2. **Package Manager**: Configure pnpm and create/update package.json
3. **Development Tools**: Set up ESLint, Prettier, TypeScript if applicable
4. **Git Configuration**: Initialize git, create .gitignore
5. **Environment Files**: Create .env.example, configure environment variables
6. **Scripts**: Add common pnpm scripts (dev, build, test, lint)
7. **Docker**: Set up Dockerfile and docker-compose if needed
8. **Documentation**: Create basic README.md with setup instructions

Use the current directory as the project root and detect the project type automatically.
