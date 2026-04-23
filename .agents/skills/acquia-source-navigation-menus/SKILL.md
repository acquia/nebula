---
name: acquia-source-navigation-menus
description:
  Acquia Source only. Create and edit Drupal menus in the CMS via Source MCP. Do
  not use for non-Source sites; production nav should still be authored in
  Drupal, not only in component code.
metadata:
  mcp-server: user-source-mcp
---

# Acquia Source — Navigation menus via Source MCP

**Principle:** **Menus belong in the CMS** (Drupal menu entities and menu
links). That is the correct, maintainable model for production. This skill
**automates the same data** you would create under **Structure → Menus** on an
**Acquia Source** site. It does **not** replace the CMS with hardcoded link
lists in components for real site delivery.

## When this applies

Use this skill when **all** of the following hold:

1. The target is an **Acquia Source** Drupal site (see
   [`AGENTS.md`](../../../AGENTS.md) — e.g. **`.cms.acquia.site`** or
   **`CANVAS_SITE_URL`** for that environment).
2. You are **authoring or changing** **menus or menu links** for that **remote**
   site.
3. You will use **Source MCP** (read each tool schema; server id is often
   **`user-source-mcp`**).

## Do not use this skill

- **Not an Acquia Source / Source-MCP target** (other hosting, local-only
  Workbench, or a Canvas site where you are not using the Source MCP server for
  that environment). For those, use the **Drupal admin** (or the project’s
  normal operations) to create menus; do not route that work through this
  document.
- **Treating static `FALLBACK_LINKS` in code as a substitute** for a real Drupal
  menu on a site that should be editor-driven. Keep fallbacks for empty/preview
  only; on Source, still create the menu in the CMS (MCP or UI).

If Source MCP is **unavailable** on a **Source** site, **still** create the same
menus in the **Drupal admin** (Structure → Menus) — that is the right place;
only the _automation_ path is missing, not the model. See
[`canvas-navigation-components`](../canvas-navigation-components/SKILL.md).

## Relationship to Canvas components

- **CMS first:** Authors and this skill work on **Drupal**; components only
  **read** `menu_items` by machine name. Keep **`menuName`** in `component.yml`
  / props in sync with the menu you created in the CMS (see
  [`canvas-data-fetching`](../canvas-data-fetching/SKILL.md#navigation--menu-components)
  and
  [`canvas-navigation-components`](../canvas-navigation-components/SKILL.md)).
- **This skill** does not push React code — only menu entities on the server.
  Use [`canvas-component-push`](../canvas-component-push/SKILL.md) when
  component source still needs uploading.

## Discover existing menus

Before creating duplicates, list menus:

- **MCP resource:** `drupal://menus` (JSON list; entries may include links to
  per-menu item trees — see your server’s resource templates).

Use the same server id as for tools (`<source-mcp-id>`).

## MCP tools (read schemas before each call)

Always **read each tool’s JSON schema** in your MCP filesystem for the Source
server before invoking tools. Typical menu-related tools:

| Tool                   | Purpose                                                                                                                                               |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`create_menu`**      | New custom menu: machine **`id`**, **`label`**, optional **`description`**.                                                                           |
| **`update_menu`**      | Change **`label`** / **`description`** for an existing menu **`id`**.                                                                                 |
| **`create_menu_item`** | Add a link: **`menu_name`**, **`title`**, **`link`**, optional **`parent`**, **`weight`**, **`enabled`**, **`expanded`**, **`description`**.          |
| **`update_menu_item`** | Patch by menu link content **`id`** (integer): **`title`**, **`link`**, **`parent`**, **`weight`**, **`enabled`**, **`expanded`**, **`description`**. |
| **`delete_menu_item`** | Remove by **`id`**; optional **`delete_children`**.                                                                                                   |

### Link URIs (`link` field)

Use the formats your tool schema documents (commonly):

- **Internal path:** `internal:/path` (e.g. `internal:/about`,
  `internal:/node/1`)
- **External:** `https://example.com`
- **Entity shortcut:** `entity:node/1`
- **Route:** `route:<Drupal route name>`

Match paths to real aliases or nodes on the site so links resolve after publish.

### Hierarchy (nested items)

- Create **parents before children**.
- **`parent`** is usually a **menu link plugin id** string (for example
  `menu_link_content:<uuid>`) — take the value from **`create_menu_item`**
  responses or from the menu tree resource for the parent item, per your MCP
  tool output.
- **`weight`:** lower values tend to sort first; use for ordering within a
  level.

### Ordering and cleanup

- Use **`update_menu_item`** with **`weight`** (and **`link`** / **`title`**) to
  reorder or fix mistakes without deleting.
- Use **`delete_menu_item`** when removing entries; confirm
  **`delete_children`** behavior if the item has descendants.

## Suggested workflow

1. Fetch **`drupal://menus`** → note existing **`main`**, **`footer`**, etc.
2. If you need a **new** menu (new machine name), call **`create_menu`** → then
   add items with **`menu_name`** set to that **`id`**.
3. Otherwise **`create_menu_item`** against **`main`** / **`footer`** / etc.,
   using **`link`** URIs that match deployed Canvas pages or nodes (coordinate
   with [`acquia-source-canvas-pages`](../acquia-source-canvas-pages/SKILL.md)
   for routes).
4. Verify in the Drupal UI or via JSON:API **`menu_items`** from the component’s
   **`menuName`** as in **`canvas-data-fetching`**.

## Related skills

| Skill                                                                      | Role                                                              |
| -------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| [`AGENTS.md`](../../../AGENTS.md)                                          | Acquia Source signals, **`CANVAS_SITE_URL`**, Canvas pages vs CLI |
| [`canvas-navigation-components`](../canvas-navigation-components/SKILL.md) | **`menuName`**, decomposition, UX/accessibility                   |
| [`canvas-data-fetching`](../canvas-data-fetching/SKILL.md)                 | **`menu_items`**, `sortMenu`, SWR, fallbacks                      |
| [`acquia-source-canvas-pages`](../acquia-source-canvas-pages/SKILL.md)     | Paths and **`canvas_page`** URLs menus should point to            |
| [`acquia-source-site-build`](../acquia-source-site-build/SKILL.md)         | Full pipeline Phase B5 (menus)                                    |
| [`canvas-component-push`](../canvas-component-push/SKILL.md)               | Push nav **components** (separate from menu entities)             |
