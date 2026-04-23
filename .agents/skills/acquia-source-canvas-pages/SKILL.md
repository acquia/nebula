---
name: acquia-source-canvas-pages
description:
  Publishes and updates remote Canvas pages on Acquia Source via Source MCP —
  images, props, layout; page JSON does not CLI-sync to Source.
---

# Acquia Source — Canvas pages via Source MCP

## When this applies

Use this skill when **all** of the following hold:

1. The target is an **Acquia Source** Drupal/Canvas site (see hostname signal
   and **`CANVAS_SITE_URL`** in [`AGENTS.md`](../../../AGENTS.md)).
2. The work is **Canvas pages** on the **remote** site (create page, place
   components, update layout/props, publish)—not local-only Workbench preview.

## Do not use Canvas CLI for remote pages

**`canvas push` / `canvas pull` do not support syncing page JSON to/from the
remote Acquia Source environment today.** Do not instruct users to rely on CLI
page sync for that tenant.

- **Components:** Continue to use the Canvas CLI (`npx canvas push`) and
  [`canvas-component-push`](../canvas-component-push/SKILL.md) for pushing
  **JavaScript components** when the user asks to push component source.
- **Pages:** Use **Source MCP tools** on the configured server.

## Images and media (pages do not CLI-sync)

Because **`canvas push` / `canvas pull` do not sync page JSON** to Acquia
Source, **nothing in repo `pages/*.json` automatically provisions files or image
props on the remote site.** Local page specs may use HTTPS placeholders,
`placehold.co`, or example paths so **Workbench** renders; those values are not
reliable as the remote source of truth.

Treat image handling as a **remote-only** concern:

### What to do instead

1. **Discover the prop shape** — Each component’s `component.yml` defines how
   image fields are modeled (`image`, `heroImage`, nested objects, etc.). Keep
   that shape when updating instances on the server.

2. **Obtain Drupal-hosted media** — Prefer assets that live on the Source site:
   - **Upload** — Use Source MCP (`create_media` + signed upload URL pattern,
     etc.—read the live tool schema). See **Phase A5** in
     [`acquia-source-site-build`](../acquia-source-site-build/SKILL.md) for the
     end-to-end upload and **`target_id`** bookkeeping workflow.
   - **Reuse** — If media already exists, resolve ids via JSON:API, MCP entity
     tools, or admin UI and map them to the right component instances.

3. **Wire props through MCP, not through pushed JSON** — After
   `get_page_layout`, update each relevant instance with
   **`update_component_props`** so image props reference Drupal media as the
   Canvas API expects on that site (commonly media reference objects such as
   **`{ "target_id": <id> }`** inside the prop name your component
   defines—confirm against Canvas resolved output, not assumptions from local
   placeholder URLs).

4. **Verify on the remote layout** — Re-fetch layout or preview the live page
   and confirm **`resolved`** image URLs are non-null before considering the
   page ready to publish.

### Practical split

| Context                | Images                                                                                                                  |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Repo `pages/` JSON** | OK for Workbench previews (placeholders, dev URLs); document that authors must replace with MCP-driven props on Source. |
| **Acquia Source**      | Must use media that Drupal can resolve; wire via MCP after components exist on the server.                              |

If you are running the full migration pipeline, **do not publish** until every
image prop on every placed instance is wired—see the Phase A5 gate in
[`acquia-source-site-build`](../acquia-source-site-build/SKILL.md).

## MCP workflow (outline)

Always **read each tool’s schema** in the MCP filesystem before calling
`call_mcp_tool`.

1. **Discover remote components** (for `component_id` values):

   ```text
   canvas://components
   ```

   Use `ReadMcpResourceTool` / list resources per your environment’s Source MCP
   server id.

2. **Create or select a page** — `create_canvas_page`, or locate an existing
   page id via layout/list flows your server exposes (`get_page_layout`, etc.).

3. **Place and configure instances** — `add_component_to_page`,
   `add_component_to_page_region`, `update_component_props`, `move_component`,
   `remove_component`, as needed for the layout.

4. **Publish** — Use the tool that matches the goal:
   - **`publish_canvas_page`** — make a page publicly visible and commit pending
     draft changes when going live is the objective.
   - **`publish_auto_saves`** — commit pending Canvas edits (including layout)
     when the workflow uses autosave keys (see
     [`acquia-source-site-build`](../acquia-source-site-build/SKILL.md) Phase C
     for the autosave pattern).

Use **`update_canvas_page`** for metadata (title, path, description, status)
when appropriate.

For translating **local** `pagesDir` JSON into MCP calls, treat repo page files
as the structural source of truth per
[`canvas-page-definition`](../canvas-page-definition/SKILL.md); map `elements`,
slots, and props to the MCP operations above.

## Related skills

| Skill                                                                          | Role                                                      |
| ------------------------------------------------------------------------------ | --------------------------------------------------------- |
| [`canvas-page-definition`](../canvas-page-definition/SKILL.md)                 | Local page JSON contract                                  |
| [`canvas-component-push`](../canvas-component-push/SKILL.md)                   | CLI push for **components** only                          |
| [`acquia-source-navigation-menus`](../acquia-source-navigation-menus/SKILL.md) | Drupal **menus** on Source (URLs nav links should target) |
| [`acquia-source-site-build`](../acquia-source-site-build/SKILL.md)             | End-to-end pipeline including page assembly               |
