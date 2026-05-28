---
name: canvas-regions
description:
  Use for any task touching site chrome — header, footer, sidebar, or global
  navigation that repeats across pages — and for any region-spec work (create,
  modify, review, validate region JSON, or the project-level layout component).
  Also load when a task creates or edits multiple pages that share chrome, or
  asks for a "site" or "navigation between pages"; shared chrome belongs in
  regions, never inlined into page JSON.
---

## Canonical definition

A Canvas region is a JSON region spec stored in the repository's configured
`regionsDir`. Each region maps to a Drupal theme region (e.g. `header`,
`footer`, `sidebar_first`) for a specific theme, and its `elements` tree renders
into that region across every page using the theme.

The Canvas CLI `push`/`pull` workflow uses these files to sync regions between
the local project and Drupal Canvas.

## Minimum contract (MUST)

Every Canvas region MUST satisfy all checks below:

- The region file exists in the configured regions directory (`regionsDir` in
  `canvas.config.json`; default `./regions`)
- The region file is a JSON object
- The filename is `<region-machine-name>.json` where the machine name matches
  `^[a-z0-9_]+$`
- The JSON includes a boolean `status` (whether the region is enabled)
- The JSON includes an `elements` object (may be empty)
- Every element in `elements` includes a discovered component `type`
- Any `slots` entries reference element IDs defined in the same file

## Location and naming

Author the canonical local region specs in the configured regions directory
(`regionsDir` in `canvas.config.json`). If `regionsDir` is not set, the default
is the top-level `regions/` directory.

- Place each region in `<regions-dir>/<region-machine-name>.json`
- Keep region files flat in the configured regions directory; nested files are
  ignored
- The filename (without `.json`) is the region machine name
- Allowed filename characters: lowercase letters, digits, and underscores
  (`^[a-z0-9_]+$`)

Examples:

- `<regions-dir>/header.json`
- `<regions-dir>/footer.json`
- `<regions-dir>/sidebar_first.json`

## Region file format

Each region file must be a JSON object with:

- `status`: boolean — `true` to enable the region, `false` to disable it
- `elements`: an object of authored region elements (may be empty for a region
  with no Canvas-managed content)

### Elements

The `elements` shape is identical to Canvas page specs — see the
[`canvas-page-definition`](../canvas-page-definition/SKILL.md) skill for the
full element contract, slot semantics, image prop shape, and format constraints.

In short, each entry in `elements` must include:

- `type`: a discovered component type (e.g. `js.section`, `js.heading`)

Each entry may also include:

- `props`: root props for that element
- `slots`: a map of slot names to arrays of element IDs from the same file

Element insertion order is preserved when the region is built — put top-level
sections in the order you want them rendered.

Use stable, descriptive element IDs unless you are intentionally preserving IDs
from another source such as an exported Canvas region.

## Example

```json
{
  "status": true,
  "elements": {
    "header-section": {
      "type": "js.section",
      "props": {
        "width": "wide"
      },
      "slots": {
        "content": ["site-logo", "primary-nav"]
      }
    },
    "site-logo": {
      "type": "js.logo",
      "props": {
        "alt": "Site logo"
      }
    },
    "primary-nav": {
      "type": "js.navigation",
      "props": {
        "menu": "main"
      }
    }
  }
}
```

An empty but enabled region is valid — use it as a placeholder for a region that
exists on the remote but has no Canvas-authored content yet:

```json
{
  "status": true,
  "elements": {}
}
```

## Format constraints

Regions reuse the page-spec format and inherit the same constraints. Region
specs only support discovered component elements plus their `props` and `slots`.
They cannot directly represent:

- Hand-written React wrappers
- Raw HTML layout elements such as `<div>` or `<section>`
- `className`-driven spacing or custom wrapper styling
- Inline code duplication of an existing component's markup

If you need a layout primitive, look for an existing component first. If none
exists, create it as a component (see
[`canvas-component-definition`](../canvas-component-definition/SKILL.md)) before
using it in a region spec.

## Layout

Region files declare **which components live in each region** — they do not
decide where headers, footers, or sidebars appear around the page. That
arrangement is the job of a project-level layout component.

### Layout component

Create a single layout file at the path configured by `layoutPath` in
`canvas.config.json` (default `./src/layout.jsx`). It must:

- Default-export a React component that accepts `{ children }`.
- Place `children` where the per-page content should render.
- Use the `Region` component from `drupal-canvas` to place each region by name
  (matching the local region file names) in the desired position around
  `children`.

The layout is the only place where regions are arranged relative to each other
and to the page — use it for vertical order (e.g. header → page → footer),
sidebar placement, and any structural chrome. Individual region JSON files have
no concept of siblings.

If no layout file is present, region files still validate and `push`, but they
will not appear in local previews.

#### Example layout component

```tsx
import { Region } from 'drupal-canvas';

export default function Layout({ children }) {
  return (
    <>
      <Region name="header" />
      <main>{children}</main>
      <Region name="footer" />
    </>
  );
}
```

Each `<Region name="…" />` renders the elements from the matching region JSON
file (e.g. `regions/header.json`). The `name` prop must match the region
filename without the `.json` extension.

### What goes in regions vs. the layout

- **Regions** — Canvas-authored, swappable content (logo, primary nav, footer
  columns, promo banners). Editable in Canvas and synced via `push`/`pull`.
- **Layout** — structural scaffolding (outer page wrapper, `<header>`/
  `<footer>` HTML elements, skip links, theme providers, ordering of regions
  around `children`). This is code, not authored content.
- Region machine names in the JSON must match the names the layout reads. Adding
  a new region means: (1) add `<regions-dir>/<name>.json`, (2) render that name
  from the layout component.

### Layout scope

The layout component only controls **local previews**. On the live Drupal site
the theme decides region placement from its own region definitions. Keep the
layout aligned with the target theme so previews stay faithful to production.

## Regions vs. pages

- Pages are addressed by `path` and rendered on a single URL. Regions are
  addressed by region machine name and rendered on every page using the theme.
- Region files do not include `title`, `path`, or `description`.
- Use regions for site chrome (header, footer, sidebars). Use pages for unique
  URL-addressable content.
- Content that should appear on every page belongs in a region, not duplicated
  across page specs.

## Workflow

### Creating a new region

1. **Confirm region machine name** — the filename must match the machine name of
   a region declared by the target theme. If unsure, check the Drupal theme's
   `.info.yml` or ask the user.
2. **Check for existing region files** — list the configured regions directory;
   do not overwrite an existing region unless asked. Only one file per region
   machine name is allowed.
3. **Choose components** — review `src/components/` and pick components whose
   `component.yml` props/slots match the layout. Prefer existing components over
   creating new ones.
4. **Choose element IDs** — use stable, descriptive IDs.
5. **Write the JSON file** following the format above; the filename must match
   the machine name of a region.

### Modifying an existing region

1. **Read the existing region file** to understand its current structure.
2. **Preserve existing element IDs** for elements that aren't changing — they
   may be referenced by IDs on the remote side.
3. **Choose descriptive IDs** for newly added elements.
4. **Verify slot references** — all IDs in slots must exist in `elements`.
5. **Do not rename the file** unless you're intentionally re-targeting; renaming
   changes the region's identity on the remote and may create a duplicate.

## Validation

Validate every authored region before finishing.

```bash
npx canvas validate
```
