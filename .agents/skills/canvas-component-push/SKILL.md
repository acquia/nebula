---
name: canvas-component-push
description:
  Push validated Canvas component changes to Drupal Canvas and recover from
  common push failures. Use only when the user explicitly requests a
  push/publish/sync action. Handles dependency-related push failures that
  require retry.
---

## Activation guard

Run this skill only when the user explicitly asks to push, publish, sync, or
upload components to Canvas.

Do not run this skill automatically after component edits, validation, or task
completion.

Before pushing, confirm the user has Drupal Canvas CLI installed and configured
for their target site.

### Setup gate

Before running any push command:

1. Check that Canvas CLI auth is configured from a supported source. For local
   project work, prefer a `.env` file in the project root. The CLI also reads
   shell environment variables and `~/.canvasrc`.
2. Verify `CANVAS_SITE_URL` is set.
3. Verify one auth mode is configured:
   - `CANVAS_ACCESS_TOKEN` is set and non-empty, or
   - both `CANVAS_CLIENT_ID` and `CANVAS_CLIENT_SECRET` are set.
4. If `CANVAS_ACCESS_TOKEN` is set, treat it as the active auth mode. It skips
   the OAuth client credentials flow entirely, and `CANVAS_CLIENT_ID`,
   `CANVAS_CLIENT_SECRET`, and `CANVAS_SCOPE` are ignored.
5. If required setup is missing, **stop** and ask the user to complete setup
   first.
6. **Do not guess setup steps**. Point the user to the official docs:
   - Drupal Canvas OAuth module setup:
     <https://git.drupalcode.org/project/canvas/-/tree/1.x/modules/canvas_oauth#2-setup>
   - Drupal Canvas CLI package/docs:
     <https://www.npmjs.com/package/@drupal-canvas/cli>
7. Continue only after the user confirms setup is complete.

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

If pages are included and they contain image props with external URLs, the first
push may fail with an error like "Some pages contain media that references
external URLs". This is expected until media is reconciled.

Supported authored page image sources:

- External `http://` or `https://` URLs
- `data:image/...` URLs

Supported image formats for reconciliation: `.jpg`, `.png`, `.gif`, `.webp`, and
`.avif`.

Local filesystem image upload through the CLI is not supported.

### Media reconciliation for pages

When working with pages that include image props:

1. Run the page push, for example:

   ```bash
   npx canvas push --yes --include-pages
   ```

2. If Canvas reports external media references, run:

   ```bash
   npx canvas reconcile-media
   ```

3. Re-run the page push:

   ```bash
   npx canvas push --yes --include-pages
   ```

4. Pull pages back down to sync resolved inputs locally:

   ```bash
   npx canvas pull --include-pages
   ```

After reconciliation/pull, page JSON may be updated so that:

- The image prop keeps the same object shape but now includes resolved `src`,
  `alt`, `width`, and `height`
- A `_provenance` object may be added with values such as `target_id` and
  `source_url`

Preserve resolved image props and `_provenance` during later edits unless you
are intentionally replacing the media.

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

If `CANVAS_ACCESS_TOKEN` is the active auth mode, treat token-related failures
as setup failures. Do not retry on errors like an invalid or expired token, or
401 responses that indicate the token is not accepted.

Point the user to the official setup docs:

- Drupal Canvas OAuth module setup:
  <https://git.drupalcode.org/project/canvas/-/tree/1.x/modules/canvas_oauth#2-setup>
- Drupal Canvas CLI package/docs:
  <https://www.npmjs.com/package/@drupal-canvas/cli>

Ask them to verify and update `.env` values (`CANVAS_SITE_URL`,
`CANVAS_ACCESS_TOKEN`, `CANVAS_CLIENT_ID`, `CANVAS_CLIENT_SECRET`) and the
relevant Canvas auth setup for their chosen auth mode, then retry the push only
after they confirm setup updates are complete.

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
