---
name: canvas-component-push
description:
  Push validated Canvas component changes to Drupal Canvas and recover from
  common push failures. Use after component work is complete and validated.
  Handles dependency-related push failures that require retry.
---

## Push to Canvas

Before pushing, confirm the user has Drupal Canvas CLI installed and configured
for their target site.

### Setup gate

Before running any push command:

1. Check that a `.env` file exists in the project root.
2. If `.env` exists, verify these values are set:
   - `CANVAS_SITE_URL`
   - `CANVAS_CLIENT_ID`
   - `CANVAS_CLIENT_SECRET`
3. If `.env` is missing, or any required value is missing, **stop** and ask the
   user to complete setup first.
4. **Do not guess setup steps**. Point the user to the official docs:
   - Drupal Canvas OAuth module setup:
     <https://git.drupalcode.org/project/canvas/-/tree/1.x/modules/canvas_oauth#2-setup>
   - Drupal Canvas CLI package/docs:
     <https://www.npmjs.com/package/@drupal-canvas/cli>
5. Continue only after the user confirms setup is complete.

## Run push

When component work is complete and validated, ask the user if they would like
to push the current Canvas changes to Canvas. `canvas push --yes` will push all
current changes; it does not support selecting specific components. If there are
unrelated or unvalidated Canvas changes in the working tree, stop and ask the
user how they want to proceed. Make sure to use the right package manager. For
example, if using npm, run the following command:

```bash
npx canvas push --yes
```

## Handling push failures

Default behavior: **always retry failed pushes** unless the error is clearly a
connection/setup failure.

Retry pushes when the failure indicates the Canvas app connection is already
working (for example, dependency/order-related component errors). Do **not**
retry connection/setup failures.

### Connection/setup failures: Stop, do not retry

If push fails with authentication, authorization, or network/connection errors,
stop and ask the user to complete or verify setup first. This includes errors
like invalid credentials, unauthorized/forbidden responses, DNS issues,
connection refused, host unreachable, request timeout before reaching Canvas, or
TLS/SSL handshake/certificate failures.

Point the user to the official setup docs:

- Drupal Canvas OAuth module setup:
  <https://git.drupalcode.org/project/canvas/-/tree/1.x/modules/canvas_oauth#2-setup>
- Drupal Canvas CLI package/docs:
  <https://www.npmjs.com/package/@drupal-canvas/cli>

Ask them to verify and update `.env` values (`CANVAS_SITE_URL`,
`CANVAS_CLIENT_ID`, `CANVAS_CLIENT_SECRET`) and OAuth/CLI setup, then retry the
push only after they confirm setup updates are complete.

### Dependency-related failures

When pushing multiple new components where one component depends on another
(e.g., `hero` imports `heading`), the push may fail with a message indicating
that a component doesn't exist. This happens when a component that includes
another gets pushed before its dependency.

**This is expected behavior.** Simply retry the push command. On subsequent
attempts, the dependencies that were successfully pushed in the previous run
will already exist, allowing the dependent components to push successfully.

Example scenario:

1. First push attempt: `hero` fails because `heading` doesn't exist yet, but
   `heading` pushes successfully.
2. Second push attempt: `hero` now succeeds because `heading` exists.

If pushes continue to fail after multiple retries, check that all required
dependency components are part of the current local changes or already exist in
Canvas.
