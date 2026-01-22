# Contributing to Nebula

Feature requests, bugs, support requests, and milestones are tracked via the
[GitHub issue queue](https://github.com/acquia/nebula/issues).

Before submitting an issue or pull request, please read and take the time to
understand this guide. Issues not adhering to these guidelines may be closed.

## Submitting issues

- Issues filed with this project are not subject to an SLA.
- Nebula is distributed under the MIT license; all documentation, code, and
  guidance is provided without warranty.
- The project maintainers are under no obligation to respond to support
  requests, feature requests, or pull requests.

## Submitting pull requests

Pull requests must also adhere to the following guidelines:

- PRs should be atomic and targeted at a single issue rather than broad-scope.
- PRs must contain clear testing steps and justification, as well as all other
  information required by the pull request template.
- PRs must pass all automated checks before they will be merged. We recommend
  you run the checks locally before submitting (see below).
- PRs must comply with coding standards and best practices as defined by the
  project maintainers.

## Running tests locally

Code checks run automatically on commit via pre-commit hooks. Before submitting
a pull request, you can also run checks manually:

```bash
npm run code:check
```

This will run:

- Prettier formatting checks
- ESLint linting checks

You can automatically fix many issues by running:

```bash
npm run code:fix
```

This will:

- Fix code formatting with Prettier
- Fix ESLint issues where possible

Note: Pre-commit hooks will automatically run Prettier and ESLint on staged
files when you commit. If checks fail, the commit will be blocked until issues
are resolved.

## Code standards

This project uses:

- [ESLint](https://eslint.org/) for code linting (configured with
  `@drupal-canvas/eslint-config`)
- [Prettier](https://prettier.io/) for code formatting
- Pre-commit hooks via [Husky](https://typicode.github.io/husky) to ensure code
  quality

All code must pass these checks before a pull request will be merged.
