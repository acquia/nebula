---
name: canvas-page-definition
description:
  Start here for any Canvas page-spec task. Use for create, modify, refactor,
  review, migrate, or validate work on page JSON files that sync with Canvas and
  render in Workbench. Establishes the canonical Canvas page-spec contract,
  including placement, structure, format constraints, and validation.
---

## Canonical definition

A Canvas page is a JSON page spec stored in the repository's configured
`pagesDir`.

Workbench uses these files for local page previews, and the Canvas CLI
`push`/`pull` workflow uses them to sync pages between the local project and
Drupal Canvas.

Page specs should fully mirror what authors can build in Drupal Canvas.

## Minimum contract (MUST)

Every Canvas page MUST satisfy all checks below:

- The page file exists in the configured pages directory (`pagesDir` in
  `canvas.config.json`; default `./pages`)
- The page file is a JSON object
- The page includes a non-empty `title`
- The page includes a `path` that starts with `/` and is unique within the
  project
- The page includes an `elements` object with at least one element
- Every element in `elements` includes a discovered component `type`
- Any `slots` entries reference element IDs defined in the same file

If any item is missing, the page is incomplete for Canvas usage.

## Location and naming

Author the canonical local page specs in the configured pages directory
(`pagesDir` in `canvas.config.json`). If `pagesDir` is not set, Workbench
defaults to the top-level `pages/` directory.

- Place each page in `<pages-dir>/<page-name>.json`
- Keep page files flat in the configured pages directory; nested files are
  ignored
- Use a stable, descriptive filename that mirrors the page title in a
  filename-safe way
- Use a human-readable `title` inside the JSON file for the actual page title

Examples:

- `<pages-dir>/homepage.json`
- `<pages-dir>/about-us.json`

Treat files in the configured `pagesDir` as the source of truth for local page
definitions that can be previewed in Workbench and synced with Canvas via the
CLI.

Authored page work is incomplete unless the page is previewable from the
configured `pagesDir` and ready for validation.

## Page file format

Each page file must be a JSON object with:

- `title`: the actual page title
- `path`: the page's URL path (e.g., `/about`). Must start with `/` and be
  unique within the project. Other pages link to this page using this value.
- `elements`: an object of authored page elements

The page file may also include:

- `description`: a short plain-text summary of the page. Surfaced as page
  metadata (e.g., for listings or SEO). Leave as an empty string if not set.

Each entry in `elements` must include:

- `type`: a discovered component type

Each entry may also include:

- `props`: root props for that element
- `slots`: a map of slot names to arrays of element IDs from the same file

Workbench preserves `elements` insertion order when building the page. Put
top-level sections in the order you want them rendered.

Use the discovered machine-readable component type for each element, such as
`card`, `heading`, or `js.hero`, depending on what Workbench finds in the local
project.

## Linking between pages

To link to another page in the project, reference the target page's `path`.

## Example

```json
{
  "title": "About",
  "path": "/about",
  "description": "",
  "elements": {
    "hero": {
      "type": "js.hero",
      "props": {
        "heading": "About us",
        "text": "Learn how our team plans, builds, and ships Canvas experiences.",
        "layout": "left_aligned"
      }
    },
    "spacer-lg": {
      "type": "js.spacer",
      "props": {
        "height": "large"
      }
    },
    "body-section": {
      "type": "js.section",
      "props": {
        "width": "normal"
      },
      "slots": {
        "content": ["body-copy"]
      }
    },
    "body-copy": {
      "type": "js.text",
      "props": {
        "content": "<p>Canvas pages should use real component composition rather than custom page wrappers.</p>"
      }
    }
  }
}
```

Use stable, descriptive element IDs unless you are intentionally preserving IDs
from another source such as an exported Canvas page.

## Image props in pages

When a component prop is defined as an image in `component.yml`, page JSON must
pass that prop as a single image object. Match the component prop name exactly
and use the Canvas image shape inside `props`.

```json
{
  "type": "js.card",
  "props": {
    "image": {
      "src": "https://placehold.co/400x300/png",
      "alt": "Card placeholder image",
      "width": "400",
      "height": "300"
    },
    "heading": "Featured card"
  }
}
```

Supported authored page image sources:

- External `http://` or `https://` URLs
- `data:image/...` URLs

Do not use local file paths in page JSON. CLI media upload from local files is
not supported.

If page media reconciliation or page sync adds resolved image data such as
`width`, `height`, or `_provenance`, preserve that data unless you are
intentionally changing the image source.

## Format constraints

The page-spec format only supports discovered component elements plus their
`props` and `slots`.

That means page specs cannot directly represent:

- Hand-written React wrappers such as `PageLayout`
- Raw HTML layout elements such as `<div>` or `<section>`
- `className`-driven spacing or custom wrapper styling
- Inline code duplication of an existing component's markup

If you need a layout primitive, look for an existing component first. If none
exists, create it as a component before using it in a page spec.

## Validation

Validate every authored page before finishing.

```bash
npx canvas validate
```
