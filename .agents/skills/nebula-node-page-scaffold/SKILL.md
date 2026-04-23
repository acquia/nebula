---
name: nebula-node-page-scaffold
description:
  Scaffolds Canvas UI for individual Drupal node pages (single-entity detail
  views) via components, component.yml, and one example pages/ spec—not list or
  index views. Does not wire those detail pages through remote APIs, Source MCP,
  or per-node page creation. Use for article/product/event detail templates,
  one-node screens, and “skip API/MCP page assembly for each node”; do not use
  this skill for blog grids, search results, or other list UIs.
---

# Node page scaffold (components + example page only)

## Scope: individual pages only—not lists

**This skill applies to single-node / detail experiences**: one page template
per content type (or per route pattern) that renders **one** node at a time
(article, event, product, etc.).

**This skill does not apply to list, index, or collection views**—for example
blog home, category archives, “latest 10,” search results, or any **grid or feed
of many nodes**. Those flows use different components (e.g. list + pagination),
different data shape, and other skills; do **not** use this skill to restrict or
reframe list work. If the user is only building a **list**, use
**`canvas-data-fetching`**, **`nebula-workbench-pages`**, and normal component
work without this scaffold rule.

## When this skill applies

Use this skill when the task is to **design or implement UI for a single-node /
detail page** that will map to a Drupal node (or equivalent) and the user
wants—or the safe default is—a **repository deliverable** (components + one
example `pages/` composition) instead of an automated remote rollout **for each
node instance**.

It is especially relevant when the user **explicitly asks not to** connect APIs,
Source MCP, or JSON:API to **create or populate each individual node’s page** as
part of the same task.

## What to build

1. **Canvas components** under `src/components/<name>/` with `index.jsx` and
   `component.yml`, following **`canvas-component-definition`** and
   **`canvas-component-metadata`**.
2. **One example Workbench page** in the canonical **`pages/`** directory (see
   **`nebula-workbench-pages`**) that **demonstrates how to assemble** those
   components: slot order, typical props, and any `js.*` types. The page is a
   **blueprint**, not a claim that every node instance exists in Drupal.
3. **Static validation** after changes: **`nebula-component-validation`**
   (`npm run code:fix`).

## What not to do

- Do **not** use this file to decide how **list, feed, or index** UIs are built;
  those are **out of scope** for this skill (see “Scope” above).

Unless the user **clearly** asks for remote integration in the same request:

- Do **not** use **Source MCP** (or similar) to **`create_node`**, upload media,
  or **create/publish Canvas pages** for each **individual detail** node as the
  primary deliverable.
- Do **not** treat “node page” work as “connect JSON:API and fill every field
  for every entity” when the ask is scaffolding; reserve live data integration
  for follow-up or separate tasks.
- Do **not** block on OAuth, `VITE_CANVAS_SITE_URL`, or push/publish pipelines
  to consider the scaffold **complete**.

Workbench can use **props examples**, **optional preview data inside
components** or **example page props**—that is fine. The line this skill draws
is: **no attempt to build or sync a fleet of real node pages via APIs** as part
of “create the node page UI.”

## How this coexists with other skills

- **`canvas-data-fetching`**: Still use for **component-level** patterns (SWR,
  `JsonApiClient`, filters) when components should load real data in production.
  This skill does **not** forbid data in components; it forbids **API-driven
  assembly of many individual pages** as the scaffold deliverable.
- **`acquia-source-canvas-pages`** / **`acquia-source-site-build`**: Run only
  when the user wants **remote** Source publish or end-to-end migration—not as
  the default for “add a node detail screen” unless they say so.

## Completion criteria

The task is appropriately complete when:

- Components are valid Canvas targets and render in Workbench via the **example
  `pages/*.json`**.
- The example page documents **composition** (what goes in the tree, typical
  props).
- No spurious remote page/node creation was attempted for “each” node.

If the user later wants **production wiring**, treat that as a **separate** task
and load the relevant Acquia Source or deployment skills **only then**.
