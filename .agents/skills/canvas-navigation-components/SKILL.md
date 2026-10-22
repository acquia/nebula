---
name: canvas-navigation-components
description:
  Plans and builds Drupal Canvas navigation UI (main nav, footer links, sidebar
  nav, mobile drawers, breadcrumbs) using design decomposition for structure and
  props/slots, then JSON:API menu or page-context patterns from
  canvas-data-fetching. Use when the user asks for navigation, header or footer
  links, menus, menu_items, mobile nav, or breadcrumb trails. Run after
  canvas-design-decomposition for layout and API sketches; follow
  canvas-data-fetching for SWR, useJsonApiClient, sortMenu, and menu fallbacks.
---

# Canvas navigation components

## Project type

Before applying this skill, check `package.json` for a dependency named
`@drupal-canvas/headless` or starting with `@drupal-canvas/headless-`. If one is
present, this is a Canvas Headless codebase — read
[`canvas-headless`](../canvas-headless/SKILL.md) first. The decomposition,
naming, and accessibility guidance below applies unchanged. React components use
the portable hooks and SWR patterns below in Drupal, Workbench, and React
headless projects. Headless server code uses the SDK's `getClient()`; native
non-React components use framework-native data loading and page context. If no
such dependency is present, this is a Canvas-rendered React codebase: components
are React (`index.jsx`/`.tsx`) and everything in this skill applies as written.
These are the only two project types.

Build **navigation** that fits Canvas: reusable names, clear **props**
(`variant`, `menuName`) and **slots** (logo, utilities, mega-menu regions),
correct **data source** (Drupal menu vs breadcrumb context vs static), and
**accessible** markup.

This skill **stacks on**:

1. [`canvas-design-decomposition`](../canvas-design-decomposition/SKILL.md) —
   regions, tree, prop/slot sketch, reuse-first naming **before** code.
2. [`canvas-data-fetching`](../canvas-data-fetching/SKILL.md) — SWR,
   `useJsonApiClient`, menu resource pattern, Workbench rules.

Then apply [`canvas-component-metadata`](../canvas-component-metadata/SKILL.md),
[`canvas-component-definition`](../canvas-component-definition/SKILL.md)
(including
[`references/naming.md`](../canvas-component-definition/references/naming.md)),
[`canvas-styling-conventions`](../canvas-styling-conventions/SKILL.md), and
[`canvas-component-composability`](../canvas-component-composability/SKILL.md)
for slots and repeatable groups.

## Workflow (order matters)

### 1. Decompose (mandatory)

Follow [`canvas-design-decomposition`](../canvas-design-decomposition/SKILL.md)
through at least **Phase E** (props/slots) before writing React or
`component.yml`.

Navigation-specific prompts:

- Separate **chrome** (bar, drawer shell) from **link lists** and optional
  **columns** (footer, mega-menu). Prefer composition over one god-component.
- Repeating link groups or cards → parent + child pattern per
  [`canvas-component-composability/references/repeatable-content.md`](../canvas-component-composability/references/repeatable-content.md).
- Use generic `machineName`s (`main-navigation`, `footer-navigation`), not
  page-specific names. Express placement in the page, not the component name.
- Sketch **`variant`** for layout modes (horizontal, drawer, compact footer).
- Add **`menuName`** in the sketch when the nav reads from a **Drupal menu**
  (see step 2). Use **slots** for logo, utility links, or CTAs when authors
  compose those blocks.

### 2. Choose a data source

See [references/data-sources.md](references/data-sources.md) for a decision
table. Summary:

| Source          | When                                                                        |
| --------------- | --------------------------------------------------------------------------- |
| **Drupal menu** | Editors manage links in Structure → Menus; use `menu_items` + `getResource` |
| **Breadcrumb**  | Trail from current page context via `usePageContext()`                      |
| **Static**      | Rare; document why; still provide sensible defaults or slots                |

### 3. Implement the fetch (Drupal menu)

Use the **Navigation / Menu Components** section in
[`canvas-data-fetching`](../canvas-data-fetching/SKILL.md#navigation--menu-components):

- Read `client` with `useJsonApiClient()` from `drupal-canvas/react`.
- `useSWR(client && menuName ? ['menu_items', menuName] : null, ([type, id]) => client.getResource(type, id))`
- `Array.from(sortMenu(data))` when data is valid; otherwise
  **`FALLBACK_LINKS`**. Do not hide available data behind `isLoading` or
  disguise draft-session failures as successful fallback content.
- Always define **`FALLBACK_LINKS`** so Workbench and sites without the menu
  still render.
- Expose **`menuName`** in `component.yml` when editors should pick the Drupal
  menu (machine name, e.g. `main`, `footer`). Hard-coding only the default in
  JSX without a prop is fine for examples; **production** nav that must switch
  menus should register `menuName` per data-fetching rules.
- Set `menuName` explicitly to null to disable fetching for static-only
  previews; omission may select the component's default menu.

Do **not** fabricate JSON:API menu payloads in Workbench mocks. Prefer real
loading/error/empty behavior; fallback links cover the empty-menu case.

**Menus in Drupal (preferred):** Production navigation should live in **Drupal
menus** (CMS), not only as hardcoded arrays in code. **`FALLBACK_LINKS`** are
for Workbench / empty-menu cases — not a long-term substitute for CMS menus on a
real site.

On **Acquia Source**, prefer creating or updating menus via Source MCP using
[`acquia-source-navigation-menus`](../acquia-source-navigation-menus/SKILL.md)
when automating that environment; otherwise use **Structure → Menus** in Drupal.
Align **`menu_name`** with this component’s **`menuName`** prop.

For **non–Acquia Source** targets, use the **Drupal admin** (or your deployment
process) — do **not** apply the Source MCP menu skill. If there is no admin/MCP
access, **tell the user** exactly which menus to create (match **`menuName`** /
machine names such as `main`, `footer`) and link to **Structure → Menus** as in
[`canvas-data-fetching`](../canvas-data-fetching/SKILL.md#navigation--menu-components).

### 4. Breadcrumbs

Breadcrumbs come from **page context**, not `menu_items`. Read
`usePageContext()` from `drupal-canvas/react` unconditionally, then handle a
null page or an empty `breadcrumbs` collection. Read existing patterns before
inventing fields. Workbench supplies empty breadcrumbs by default; verify real
page trails in the routed application. Preserve Drupal-generated URLs unless the
application explicitly adapts routing.

### 5. Accessibility (minimum)

- Wrap primary link lists in `<nav>` with distinct **`aria-label`** (or
  `aria-labelledby` pointing at visible heading text).
- Mobile toggles: `aria-expanded`, `aria-controls` when you wire IDs; button
  **`type="button"`**.
- Do not mark every link `aria-current="page"`—only the true current item when
  the design requires it.
- Nested lists (mega-menu, footer columns): preserve list semantics where
  appropriate; keep tab order predictable.

### 6. Metadata and styling

- Props/slots YAML:
  [`canvas-component-metadata`](../canvas-component-metadata/SKILL.md).
- Folder and mocks:
  [`canvas-component-definition`](../canvas-component-definition/SKILL.md).
- Tailwind tokens:
  [`canvas-styling-conventions`](../canvas-styling-conventions/SKILL.md).

## Reference example

The canonical menu + SWR + `sortMenu` example lives in
[`canvas-data-fetching`](../canvas-data-fetching/SKILL.md#navigation--menu-components),
including the `menuName` metadata for editor configuration.

## Mega-menu and nested menus

- Model **composition**: parent nav shell + **slots** for columns or featured
  blocks; child components for link groups.
- **Nested menu shape:** do not assume raw JSON:API nesting. Probe deserialized
  output with the same `JsonApiClient` call the component will use (see
  [`canvas-data-fetching`](../canvas-data-fetching/SKILL.md)) before mapping
  children.

## Further reading

- [references/data-sources.md](references/data-sources.md)

## Anti-duplication

- Full menu code samples and `menuName` YAML live under **Navigation / Menu
  Components** in
  [`canvas-data-fetching`](../canvas-data-fetching/SKILL.md#navigation--menu-components).
- Decomposition phases A–G are not repeated here—use
  [`canvas-design-decomposition`](../canvas-design-decomposition/SKILL.md).
