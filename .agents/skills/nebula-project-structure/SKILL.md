---
name: nebula-project-structure
description:
  Project folder structure and package manager detection for Nebula. Reference
  when navigating the codebase, running commands, or determining which package
  manager to use (npm/yarn/pnpm/bun).
---

# Project structure

This project separates working code from example components and Workbench page
specs:

```
src/
├── components/     # Working component implementations and metadata
└── global.css      # Base styles loaded by Canvas Workbench

pages/              # Working Canvas Workbench page specs

examples/
├── components/     # Example components to copy from (may include mocks.json)
└── pages/          # Example page specs for reference only
```

Component preview states live beside the component itself as
`src/components/<name>/mocks.json`, not in a central stories directory.

When present, `canvas.config.json` is the source of truth for repository paths.
In this repository it points Workbench at:

- `componentDir`: `src/components`
- `pagesDir`: `pages`
- `globalCssPath`: `src/global.css`

# Package manager

Detect the package manager by checking for lock files in the project root:

- `package-lock.json` → npm (`npm run`, `npx`)
- `yarn.lock` → yarn (`yarn`, `yarn dlx`)
- `pnpm-lock.yaml` → pnpm (`pnpm`, `pnpm dlx`)
- `bun.lockb` → bun (`bun run`, `bunx`)

Use the detected package manager for all commands in these instructions.
