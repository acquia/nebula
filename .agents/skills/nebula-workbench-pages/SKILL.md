---
name: nebula-workbench-pages
description:
  Nebula-specific overlay for Canvas Workbench pages. Use when you need the
  repository-local rule that `examples/pages/` is reference-only and active
  Workbench pages belong in `pages/`.
---

# Nebula page policy

Author active Workbench page previews in the top-level `pages/` directory.

Nebula may also keep reference examples in `examples/pages/`, but those are
examples only and should not replace the canonical Workbench pages directory.

If the repository includes `examples/pages/`, use those files as reference input
when authoring real Workbench pages in `pages/`.

Only pages in the canonical `pages/` directory are valid local verification
targets in this repository. After creating or visually modifying a page, use
`nebula-component-validation` to run repo-local static validation.

Use `canvas-page-definition` for the generic page-spec contract, and
`canvas-workbench/references/pages.md` for the Workbench-specific page preview
flow.
