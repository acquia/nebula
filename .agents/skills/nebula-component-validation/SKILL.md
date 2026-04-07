---
name: nebula-component-validation
description:
  Validate components before uploading to Canvas. Use after creating or
  modifying components, and after page work that changes rendered output, before
  considering work complete. Runs `npm run code:fix` and the repo-local visual
  verification workflow.
---

# Validate

Before running validation, confirm the Workbench preview coverage matches the
change:

- Every new or modified component is reviewable through `component.yml`
  examples, and through `mocks.json` when additional named states are needed
- Any page work is represented as a valid Workbench page JSON file in the
  configured pages directory for this repo (`pages/`)

After creating or modifying components, always validate your code by running the
`code:fix` script. Make sure to use the right package manager. For example, if
using npm, run the following command:

```bash
npm run code:fix
```

This runs Prettier and ESLint with auto-fix, ensuring:

- Consistent formatting
- Common issue detection
- Drupal Canvas Code Component requirements

If errors remain after auto-fix, address them manually and re-run until passing.

When the task changes rendered output, start or reuse Canvas Workbench and run
`nebula-visual-verification` against the changed component or page after static
validation passes. If visual verification fails, fix the changed surface, rerun
static validation when code changed, and re-run `nebula-visual-verification`.
Finish only when the verification loop passes or is stuck under the verifier's
blocker rules.
