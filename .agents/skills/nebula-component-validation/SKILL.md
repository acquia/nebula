---
name: nebula-component-validation
description:
  Validate components before uploading to Canvas. Use after creating or
  modifying components, before considering work complete. Runs `npm run
  code:fix` for Prettier, ESLint, and Canvas requirements.
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
When the task includes preview work, also verify the result in Canvas Workbench
after static validation passes.
