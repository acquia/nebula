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

## AI-assisted development workflows

### Skills

Agent skills are located in `.agents/skills/`. If you are using an AI agent that
requires its own directory (such as Cursor or Claude Code), you need to manually
symlink the relevant skill to the canonical source in `.agents/skills/`:

```bash
# For Claude Code
ln -s .agents/skills/<skill-name> .claude/skills/<skill-name>

# For Cursor
ln -s .agents/skills/<skill-name> .cursor/skills/<skill-name>
```

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

| Command                          | Description                                                                     |
| -------------------------------- | ------------------------------------------------------------------------------- |
| `npx ruler [command] [options]`  | Runs [Ruler](https://www.npmjs.com/package/@intellectronica/ruler) CLI commands |
| `npx canvas [command] [options]` | Runs Drupal Canvas CLI commands <br> (`npx canvas` lists available commands)    |
| `npm run dev`                    | Starts Storybook's development server                                           |
| `npm run storybook`              | Alias for `dev` command                                                         |
| `npm run build-storybook`        | Creates a static Storybook build                                                |
| `npm run code:check`             | Runs all code checks                                                            |
| `npm run code:check:prettier`    | Checks code formatting with Prettier                                            |
| `npm run code:check:eslint`      | Checks code with ESLint                                                         |
| `npm run code:fix`               | Runs all code fixes                                                             |
| `npm run code:fix:prettier`      | Fixes code formatting with Prettier                                             |
| `npm run code:fix:eslint`        | Fixes code with ESLint                                                          |
