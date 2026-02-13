# Nebula

Nebula provides a template repository for
[`@drupal-canvas/create`](https://www.npmjs.com/package/@drupal-canvas/create)
to scaffold a new codebase for working with
[Drupal Canvas Code Components](https://project.pages.drupalcode.org/canvas/code-components).
The codebase serves as a development environment fully set up with tooling and
examples for AI-assisted development workflows.

## Getting started

Instead of cloning this repository, create a new project interactively:

```
npx @drupal-canvas/create@latest
```

## AI-assisted development

[Agent skills](https://agentskills.io) are located in `.agents/skills/`.

- `nebula-*` skills provide conventions and workflows specific for this
  repository.
- `canvas-*` skills are generic Canvas Code Component component guidance
  installed from
  [`drupal-canvas/skills`](https://github.com/drupal-canvas/skills).

### Setup

No setup is required for the following coding agents; they read directly from
`.agents/skills/`: Amp, Codex, Gemini CLI, GitHub Copilot, Kimi Code CLI,
OpenCode. (This list can become outdated quickly; by the time you read this,
additional coding agents may already standardize on this directory.)

If your coding agent does not standardize on this directory (for example, Cursor
or Claude Code), manually symlink the relevant skill from `.agents/skills/`:

```bash
# For Claude Code
ln -s .agents/skills/<skill-name> .claude/skills/<skill-name>

# For Cursor
ln -s .agents/skills/<skill-name> .cursor/skills/<skill-name>
```

### Adding new skills

Install new skills from [skills.sh](https://skills.sh). For example:

```bash
npx skills add vercel-labs/agent-skills
```

### Updating skills

Update the Drupal Canvas skills by re-adding and selecting all of them:

```bash
npx skills add drupal-canvas/skills
```

Once [vercel-labs/skills#337](https://github.com/vercel-labs/skills/issues/337)
is resolved, you'll be able to use the `npx skills check` and
`npx skills update` to check for and apply updates more efficiently.

## Features

- [`@drupal-canvas/create`](https://www.npmjs.com/package/@drupal-canvas/cli)
  installed
  - `.env.example` file with instructions specific to this codebase
- [`@drupal-canvas/eslint-config`](https://www.npmjs.com/package/@drupal-canvas/eslint-config)
  configured
  - Recommended rules are added on top of the required validation for the
    components to work in Drupal Canvas
- [Storybook](https://storybook.js.org) for developing and presenting the
  components
  - [Viewports](https://storybook.js.org/docs/essentials/viewport) configured to
    match the viewport sizes Drupal Canvas uses
- Compiling with [SWC](https://swc.rs) through
  [`@vitejs/plugin-react-swc`](https://www.npmjs.com/package/@vitejs/plugin-react-swc)
  (Drupal Canvas uses [`@swc/wasm-web`](https://swc.rs/docs/usage/wasm))
- [Tailwind CSS v4](https://tailwindcss.com) for styling
- [Prettier](https://prettier.io/) with plugins configured
  - [`prettier-plugin-tailwindcss`](https://www.npmjs.com/package/prettier-plugin-tailwindcss)
  - [`@ianvs/prettier-plugin-sort-imports`](https://www.npmjs.com/package/@ianvs/prettier-plugin-sort-imports)
- Pre-commit hook with [Husky](https://typicode.github.io/husky) for linting and
  formatting staged files using
  [`lint-staged`](https://www.npmjs.com/package/lint-staged)
- [GitHub Actions](https://github.com/features/actions) workflows:
  - Static code checks
  - Validating PR titles against
    [the Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0)
    (delete `.github/workflows/lint-pr.yml` if you don't want this)
- Example components

## Commands

| Command                          | Description                                                                  |
| -------------------------------- | ---------------------------------------------------------------------------- |
| `npx canvas [command] [options]` | Runs Drupal Canvas CLI commands <br> (`npx canvas` lists available commands) |
| `npm run dev`                    | Starts Storybook's development server                                        |
| `npm run storybook`              | Alias for `dev` command                                                      |
| `npm run build-storybook`        | Creates a static Storybook build                                             |
| `npm run code:check`             | Runs all code checks                                                         |
| `npm run code:check:prettier`    | Checks code formatting with Prettier                                         |
| `npm run code:check:eslint`      | Checks code with ESLint                                                      |
| `npm run code:fix`               | Runs all code fixes                                                          |
| `npm run code:fix:prettier`      | Fixes code formatting with Prettier                                          |
| `npm run code:fix:eslint`        | Fixes code with ESLint                                                       |
