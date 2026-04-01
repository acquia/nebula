---
name: canvas-workbench
description:
  Use when work must be verified in local Canvas Workbench, or when the user
  asks to run, open, or check a component in Workbench. Verifies that Canvas
  Workbench is available through the project's package runner, starts the local
  Workbench dev server, and keeps Workbench verification as part of the
  implementation workflow.
---

## Installation gate

Before trying to use Workbench, detect the project's package manager and use its
executable runner for `@drupal-canvas/workbench`.

Preferred commands:

- npm: `npx @drupal-canvas/workbench`
- pnpm: `pnpm dlx @drupal-canvas/workbench`
- bun: `bunx @drupal-canvas/workbench`
- yarn: `yarn dlx @drupal-canvas/workbench`

Choose the command that matches the repository's package manager. Use lockfiles
and existing project conventions to decide.

If the package runner or `@drupal-canvas/workbench` is not available, stop and
tell the user that Canvas Workbench is not available in the current environment.
Ask whether they want you to install it. If they say yes, install
`@drupal-canvas/workbench` as a dev dependency with the matching package
manager:

- npm: `npm install --save-dev @drupal-canvas/workbench`
- pnpm: `pnpm add --save-dev @drupal-canvas/workbench`
- bun: `bun add --dev @drupal-canvas/workbench`
- yarn: `yarn add --dev @drupal-canvas/workbench`

After installation completes, use the matching runner command and continue with
Workbench verification. If the user says no, stop and do not guess alternate
startup commands.

## Configuration gate

Workbench does not require a `canvas.config.json` file when the project uses the
default Canvas layout.

Before starting Workbench, check whether the project appears to use the default
paths:

- `componentDir`: project root
- `pagesDir`: `./pages`
- `aliasBaseDir`: `src`
- `globalCssPath`: `./src/components/global.css`

If the project uses those defaults and `canvas.config.json` is missing, proceed
without creating one.

If the project uses different component paths, pages paths, `@/` import
resolution, or global CSS entrypoints, add or update `canvas.config.json` in the
project root before starting Workbench. Set only the options the project needs.

Example:

```json
{
  "componentDir": "./components",
  "pagesDir": "./pages",
  "aliasBaseDir": "src",
  "globalCssPath": "./src/components/global.css"
}
```

## Start Workbench

When Workbench verification is needed and the package-runner command is
available:

1. Run the matching Workbench command from the project root.
2. Treat it as a long-running local dev server process.
3. Read the startup output and use the local URL it prints.
4. Leave the server running while you verify the result.

If a Workbench server is already running for the current project, reuse it
instead of starting a second instance.

## Verification workflow

Use Workbench as part of the normal implementation loop:

1. Start or reuse Workbench.
2. Open the relevant component or preview state.
3. Verify that the requested change renders correctly.
4. If the result is wrong, update the implementation and verify again.
5. Finish only after Workbench verification passes, or explain clearly what
   blocked verification.

## Scope

This skill is for starting and using Workbench, not for defining the Canvas
component contract or detailed mock authoring rules.

- Use `canvas-component-definition` when creating or validating the component
  structure, `component.yml`, naming, or mock coverage expectations.
- Use `canvas-component-definition/references/workbench-mocks.md` when you need
  to author or validate `mocks.json`.
