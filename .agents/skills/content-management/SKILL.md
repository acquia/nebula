---
name: content-management
description:
  Managing content in Acquia Source via source MCP tools including canvas pages,
  nodes, media, and taxonomy terms. No CLI or JSON:API credentials needed.
---

# Content Management Skill

Manages content in Acquia Source using **source MCP tools** directly. Requires
the source MCP server to be connected.

---

## Discover Available Content Types

```
ReadMcpResourceTool(server: "source-mcp", uri: "drupal://content-types")
```

Or list existing entities of a type:

```
list_entities(entity_type: "node", bundle: "article")
list_entities(entity_type: "taxonomy_term", bundle: "tags")
list_entities(entity_type: "canvas_page")
```

---

## Content Nodes

### Create

```
create_node(bundle: "article", fields: {
  "title": "My Article",
  "body": { "value": "<p>HTML body</p>", "format": "basic_html" },
  "field_tags": [{ "target_id": 1 }],
  "status": true,
  "path": { "alias": "/my-article" }
})
```

Use `batch_create_nodes` to create multiple nodes of the same bundle at once.

### Update (partial)

```
update_node(entity_id: 42, fields: {
  "title": "Updated Title",
  "body": { "value": "<p>Updated body</p>", "format": "basic_html" }
})
```

---

## Taxonomy Terms

```
get_or_create_term(vid: "tags", name: "Technology")
```

Returns the term ID whether it already existed or was just created.

---

## Media (Images)

### Upload

```
create_media(
  bundle: "image",
  name: "My Image",
  filename: "photo.jpg",
  metadata: { "alt": "Alt text description" }
)
```

After calling `create_media`, upload the file using the returned signed URL:

```bash
curl -X PUT <upload_url> -H "Content-Type: application/octet-stream" --data-binary @/path/to/photo.jpg
```

The returned `target_id` is the **media entity's internal ID** — use this in
component props that reference images.

### Media vs File Entity IDs (Critical)

| Entity Type | ID Location                            | Usage                      |
| ----------- | -------------------------------------- | -------------------------- |
| **File**    | `drupal_internal__target_id` in rels   | Internal file reference    |
| **Media**   | `target_id` returned by `create_media` | **Use this in components** |

Always use the **media entity's internal ID**, not the file's.

### Remote video

```
create_remote_video(bundle: "remote_video", url: "https://www.youtube.com/watch?v=...")
```

---

## Canvas Pages

Canvas pages are layout containers that compose uploaded components. Use for:
homepage, section landing pages (e.g. /academics, /news), utility pages.

**Never use canvas pages as a substitute for missing structured content types.**

### Available components

```
ReadMcpResourceTool(server: "source-mcp", uri: "canvas://components")
```

Returns each component's `id`, `props`, and `slots`.

### Full creation workflow

**1. Create the page:**

```
create_canvas_page(title: "My Page", path: "/my-page")
→ returns page_id
```

**2. Add root-level components:**

```
add_component_to_page(page_id: 5, component_id: "js.hero", props: {
  "heading": "Welcome",
  "subheading": "Subtitle text"
})
→ returns new_instance_id
```

**3. Add slotted child components:**

```
add_component_to_page(
  page_id: 5,
  component_id: "js.hero_button",
  parent_instance_id: "<hero-instance-id>",
  slot: "ctaButtons",
  props: { "label": "Learn More", "url": "/about" }
)
```

**4. Publish the draft:**

```
ReadMcpResourceTool(server: "source-mcp", uri: "canvas://auto-saves")
→ get autosave_key and data_hash

publish_auto_saves(autosaves: [{ autosave_key: "canvas_page:5:en", data_hash: "..." }])
```

### Other page operations

| Goal                      | Tool                                                         |
| ------------------------- | ------------------------------------------------------------ |
| Update component props    | `update_component_props(page_id, instance_id, props)`        |
| Reorder a component       | `move_component(page_id, instance_id, region, index)`        |
| Remove a component        | `remove_component(page_id, instance_id)`                     |
| Read current layout       | `get_page_layout(page_id)`                                   |
| Update page title/path    | `update_canvas_page(page_id, title, path)`                   |
| Delete a page             | `delete_canvas_page(page_id, force: true)`                   |
| Discard unpublished draft | `discard_auto_saves(autosave_keys: ["canvas_page:<id>:en"])` |

### Canvas component nesting

Components are nested via `parent_instance_id` and `slot`. Root-level components
have no parent. Slotted children reference the parent's `new_instance_id` and
the slot name from `canvas://components`.

---

## Canvas Component Structure

When composing pages, the layout is a tree of component instances:

```
Hero (js.hero) — root
  └── ctaButtons slot
        └── Hero Button (js.hero_button)
Campus Life (js.campus_life) — root
  └── activities slot
        └── Campus Activity (js.campus_activity)
        └── Campus Activity (js.campus_activity)
```

Add in top-down order: create the parent first, get its `instance_id`, then
create children referencing it.

---

## Text Fields with HTML

Rich text fields use a specific format:

```json
{
  "body": {
    "value": "<p>HTML content with <a href=\"/page\">links</a>.</p>",
    "format": "basic_html"
  }
}
```

Canvas HTML block format (for component props):

```json
{
  "value": "<p>Content</p>",
  "format": "canvas_html_block"
}
```

### Allowed HTML elements

**Inline:** `<strong>` `<em>` `<u>` `<s>` `<sup>` `<sub>` `<a>` `<code>`

**Block:** `<p>` `<h2>`–`<h6>` `<ul>` `<ol>` `<li>` `<blockquote>`

**Alignment classes:** `.text-align-center` `.text-align-right`
`.text-align-justify`

**Embedded media:**

```html
<drupal-media data-entity-type="media" data-entity-uuid="MEDIA-UUID"
  >&nbsp;</drupal-media
>
```

Use the media entity UUID (from `create_media` response), not the file UUID. The
`&nbsp;` placeholder inside the tag is required.

### Content formatting best practices

1. Use `<strong>` for important text, `<em>` for emphasis — semantic, not just
   visual styling.
2. `<blockquote>` for external quotes only. For regular inline quotes, use
   quotation marks inside a `<p>` tag.
3. Use `<ul>`/`<ol>` for lists rather than comma-separated text.
4. Use `<h2>`–`<h6>` to create clear content structure.

---

## Workflow: Create a Page with Images

1. **Upload image:**

   ```
   create_media(bundle: "image", name: "Card Image", filename: "card.jpg",
     metadata: { "alt": "Description" })
   → target_id: 31
   ```

   Then upload the file using the returned signed URL.

2. **Create the canvas page:**

   ```
   create_canvas_page(title: "My Page", path: "/my-page")
   → page_id: 5
   ```

3. **Add component with image reference:**

   ```
   add_component_to_page(page_id: 5, component_id: "js.impact_card", props: {
     "cardTitle": "My Card",
     "description": "Card text",
     "image": { "target_id": 31 }
   })
   ```

4. **Publish:**

   ```
   ReadMcpResourceTool(uri: "canvas://auto-saves") → data_hash
   publish_auto_saves(autosaves: [{ autosave_key: "canvas_page:5:en", data_hash: "..." }])
   ```

---

## Source MCP Capabilities and Limitations

Always be explicit with the user about what can and cannot be automated.

### ✅ Handled automatically by source MCP

| Operation                                        | Tool                                        |
| ------------------------------------------------ | ------------------------------------------- |
| Create content type                              | `create_content_type`                       |
| Add fields to content type                       | `add_field_to_content_type`                 |
| Create taxonomy terms (in existing vocabularies) | `get_or_create_term`                        |
| Create content nodes                             | `create_node` / `batch_create_nodes`        |
| Upload media (images, video)                     | `create_media` / `create_remote_video`      |
| Create and publish Canvas pages                  | `create_canvas_page` / `publish_auto_saves` |

### ⚠️ Requires manual action in Drupal

After any content management task, always surface the following as a checklist
for the user — only include items that are relevant to the current task:

| Task                                | Drupal path                                     | When needed                                                                  |
| ----------------------------------- | ----------------------------------------------- | ---------------------------------------------------------------------------- |
| **Create vocabulary**               | `/admin/structure/taxonomy/add`                 | Any time content uses tags/categories in a vocabulary that doesn't exist yet |
| **Create menu**                     | `/admin/structure/menu/add`                     | When a header, footer, or nav component needs a Drupal menu to fetch from    |
| **Add menu links**                  | `/admin/structure/menu/manage/<menu-name>`      | After creating a menu; list label + path + parent for each link              |
| **Expose content type in JSON:API** | `/admin/config/services/jsonapi/resource_types` | If a new content type was created and is not yet accessible via JSON:API     |

**Nav components (header, footer):** These include a static fallback array and
work immediately. Once the corresponding Drupal menu exists with the correct
machine name, they automatically switch to live Drupal-managed links — no code
change needed.
