---
name: component-validation
description: Validate code to prepare for uploading.
---

# Validate

## When to Use

After creating or modifying components, before considering work complete.

## Validation

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
