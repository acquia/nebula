# Navigation data sources (Canvas)

Pick **one primary source** for the link model before implementation.
Authoritative menu patterns:
[`canvas-data-fetching`](../canvas-data-fetching/SKILL.md#navigation--menu-components).

## Decision table

| Source              | API / API shape                                                               | When to use                                                                                    |
| ------------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| **Drupal menu**     | `JsonApiClient.getResource('menu_items', menuMachineName)` + `sortMenu(data)` | Editors maintain links under Structure → Menus; same nav reused across pages                   |
| **Page breadcrumb** | `getPageData()` → `breadcrumbs` (iterable of `key`, `text`, `url`)            | Trail reflects current route / hierarchy; not a menu resource                                  |
| **Static / props**  | Hard-coded list or props only                                                 | Prototypes, or nav fixed in code by policy (still prefer `FALLBACK_LINKS` for menu-shaped UIs) |

## Drupal menu (details)

- SWR key: `menuName ? ['menu_items', menuName] : null`.
- Links for rendering: `Array.from(sortMenu(data))` when fetch succeeds; else
  **`FALLBACK_LINKS`** (always define this constant).
- Register **`menuName`** in `component.yml` when the menu machine name must be
  configurable in Canvas.
- **No Drupal access:** When the agent cannot create menus (no admin UI, no MCP,
  no API), **do not assume** the menu exists. **Suggest the user** create each
  required menu in Drupal (**Structure → Menus**, e.g.
  `/admin/structure/menu/add`), use the **machine name** the component’s
  `menuName` / fetch key expects, add links, then re-test. Mirror the handoff
  note in
  [`canvas-data-fetching`](../canvas-data-fetching/SKILL.md#navigation--menu-components).

## Breadcrumb (details)

- Use **`getPageData()`** from `drupal-canvas`, not `menu_items`.
- Repo example:
  [`examples/components/breadcrumb/index.jsx`](../../../../examples/components/breadcrumb/index.jsx).

## Static-only

- Still run
  [`canvas-design-decomposition`](../canvas-design-decomposition/SKILL.md) so
  props/slots stay intentional.
- Document why Drupal does not drive this nav (e.g. legal-only footer row with
  three fixed URLs).

## Mega-menu and nested structures

- **Composition:** slots + child components per
  [`canvas-component-composability/references/repeatable-content.md`](../canvas-component-composability/references/repeatable-content.md).
- **Data:** If the menu payload includes children, **probe** the deserialized
  shape with the project’s real `JsonApiClient` call before writing `.map`
  logic—do not assume attributes/relationships from raw JSON:API docs alone.

## Cross-links

- Main skill: [`../SKILL.md`](../SKILL.md)
