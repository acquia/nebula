---
name: project-structure
description: Project folder structure and package manager detection for Nebula.
---

## When to use this workflow

Reference this when navigating the codebase or running commands.

# Project Structure

This project uses a two-folder structure to separate example code from working
code:

```
src/
├── components/     # Working components (Storybook reads from here)
│   └── global.css  # Base styles imported by Storybook
├── stories/        # Working stories (Storybook reads from here)
└── lib/            # Library utilities and mocks

examples/
├── components/     # Example component implementations (for reference)
└── stories/        # Example stories (for reference)
```

# Package manager

Detect the package manager by checking for lock files in the project root:

- `package-lock.json` → npm (`npm run`, `npx`)
- `yarn.lock` → yarn (`yarn`, `yarn dlx`)
- `pnpm-lock.yaml` → pnpm (`pnpm`, `pnpm dlx`)
- `bun.lockb` → bun (`bun run`, `bunx`)

Use the detected package manager for all commands in these instructions.
