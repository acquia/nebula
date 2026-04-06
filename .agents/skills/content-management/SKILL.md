---
name: content-management
description:
  Managing content in Acquia Source via JSON:API including pages, media, and
  components
---

# Content Management Skill

This skill provides tools for managing content in Acquia Source via JSON:API.
Use these commands to list, fetch, update, and create pages and other content
entities.

## Available Commands

All commands use the `@freelygive/canvas-jsonapi` CLI:

```bash
npx canvas-jsonapi <command> [args...]
```

### List Content

List content items of a specific type:

```bash
npx canvas-jsonapi list <type>
npx canvas-jsonapi list --types  # Discover available types
```

### Get Content

Fetch one or more content items and save them locally:

```bash
npx canvas-jsonapi get <type> <uuid> [<uuid>...]
npx canvas-jsonapi get <type> <uuid> --include <relationships>
```

Examples:

```bash
npx canvas-jsonapi get page abc-123-def
npx canvas-jsonapi get page abc-123 def-456 ghi-789
npx canvas-jsonapi get media--image uuid1 uuid2 uuid3
npx canvas-jsonapi get page abc-123-def --include image,owner
```

Saves content to `content/<type>/<uuid>.json`. For `media--image`, automatically
includes the file relationship and displays the thumbnail URL and `target_id`.

### Create Content

Create a new content item from a local file:

```bash
npx canvas-jsonapi create <file-path>
```

After creation, the temporary file is removed and the full entity is fetched and
saved with the UUID returned by the API.

### Update Content

Push changes from a local JSON file back to the API:

```bash
npx canvas-jsonapi update <file-path>
```

The file must contain valid JSON:API data with `data.type` and `data.id` fields.

### Delete Content

Delete one or more content items:

```bash
npx canvas-jsonapi delete <type> <uuid> [<uuid>...]
```

Examples:

```bash
npx canvas-jsonapi delete page abc-123-def
npx canvas-jsonapi delete media--image uuid1 uuid2 uuid3
```

Also removes the local JSON file if it exists.

### Upload Image

Upload an image and create a media entity:

```bash
npx canvas-jsonapi upload-image <image-path> [alt-text]
```

Example:

```bash
npx canvas-jsonapi upload-image src/stories/assets/photo.jpg "Photo description"
```

Output includes:

- Media UUID
- File path
- Thumbnail URL
- `target_id` for use in components

### Generate UUID

Generate random UUIDs for new components:

```bash
npx canvas-jsonapi uuid        # Generate 1 UUID
npx canvas-jsonapi uuid 5      # Generate 5 UUIDs
```

## Local File Storage

Content is stored in the `/content` directory (gitignored):

```
content/
  page/
    abc-123-def-456.json
  media--image/
    img-123-456.json
```

## Page Structure

Pages in Acquia Source contain these key attributes:

- `title` - Page title
- `status` - Published status (true/false)
- `path` - URL path configuration
- `components` - Array of canvas components
- `metatags` - SEO metadata
- `include_in_search` - Whether to index for search

### Canvas Component Structure

Components are stored in `data.attributes.components` as a flat array. Nesting
is defined via `parent_uuid` and `slot` fields:

```json
{
  "data": {
    "type": "page",
    "attributes": {
      "title": "My Page",
      "status": true,
      "components": [
        {
          "uuid": "comp-001",
          "component_id": "js.section",
          "inputs": { "width": "Normal" },
          "parent_uuid": null,
          "slot": null
        },
        {
          "uuid": "comp-002",
          "component_id": "js.heading",
          "inputs": { "text": "Title", "level": "h2" },
          "parent_uuid": "comp-001",
          "slot": "content"
        }
      ]
    }
  }
}
```

Note: `inputs` are automatically parsed to objects when fetched and stringified
when sent back to the API.

### Component Fields

| Field               | Description                                                |
| ------------------- | ---------------------------------------------------------- |
| `uuid`              | Unique identifier for this component instance              |
| `component_id`      | Component type (e.g., `js.heading`, `js.card`)             |
| `component_version` | Version hash of the component definition                   |
| `inputs`            | Object containing prop values                              |
| `parent_uuid`       | UUID of parent component (null for root-level)             |
| `slot`              | Slot name in parent (null for root-level, e.g., "content") |

## Media Image Handling

### Uploading Images

Images must be uploaded to the media library before referencing in components:

```bash
npx canvas-jsonapi upload-image image.jpg "Alt text"
```

Output:

```
Uploading: image.jpg
Uploaded: image.jpg
  UUID: 98eabd02-c52c-493b-8ca9-cb9d0fe70ceb
  File: /var/www/html/pages/media--image/98eabd02-...json
  Thumbnail: https://...
  target_id: 31
```

### Media vs File Entity IDs (Critical)

When working with images, there are two different internal IDs:

| Entity Type | ID Location                                   | Usage                      |
| ----------- | --------------------------------------------- | -------------------------- |
| **File**    | `drupal_internal__target_id` in relationships | Internal file reference    |
| **Media**   | `resourceVersion=id%3AXX` in self link URL    | **Use this in components** |

The `target_id` shown in command output is the correct media internal ID.

### Referencing Images in Components

Components that accept images (like `js.card`) use a `target_id` reference:

```json
{
  "component_id": "js.card",
  "inputs": {
    "heading": "My Card",
    "image": { "target_id": "31" },
    "text": { "value": "<p>Content</p>", "format": "canvas_html_block" }
  }
}
```

**Important:** The `target_id` must be the **media entity's internal ID**, not
the file's internal ID.

### Text Fields with HTML

Rich text fields use a specific format:

```json
{
  "text": {
    "value": "<p>HTML content with <a href=\"/page\">links</a>.</p>",
    "format": "canvas_html_block"
  }
}
```

### Allowed HTML Elements in Formatted Content

The following HTML elements are supported in formatted editor fields (like
article body content):

#### Inline Formatting

| Element    | Usage           | Example                      |
| ---------- | --------------- | ---------------------------- |
| `<strong>` | Bold text       | `<strong>important</strong>` |
| `<em>`     | Italic/emphasis | `<em>emphasized</em>`        |
| `<u>`      | Underlined text | `<u>underlined</u>`          |
| `<s>`      | Strikethrough   | `<s>deleted</s>`             |
| `<sup>`    | Superscript     | `x<sup>2</sup>`              |
| `<sub>`    | Subscript       | `H<sub>2</sub>O`             |
| `<a>`      | Links           | `<a href="/page">link</a>`   |
| `<code>`   | Inline code     | `<code>variable</code>`      |

#### Block Elements

| Element         | Usage                       | Example                          |
| --------------- | --------------------------- | -------------------------------- |
| `<p>`           | Paragraphs                  | `<p>Text content</p>`            |
| `<h2>` - `<h6>` | Headings (h2-h6 only)       | `<h2>Section Title</h2>`         |
| `<ul>`          | Unordered list              | `<ul><li>Item</li></ul>`         |
| `<ol>`          | Ordered list                | `<ol><li>Step 1</li></ol>`       |
| `<blockquote>`  | Highlighted external quotes | `<blockquote>Quote</blockquote>` |

#### Text Alignment Classes

Apply alignment via class attribute on block elements:

| Class                 | Effect         |
| --------------------- | -------------- |
| `.text-align-center`  | Center aligned |
| `.text-align-right`   | Right aligned  |
| `.text-align-justify` | Justified text |

Example:

```html
<p class="text-align-center">Centered paragraph</p>
<h2 class="text-align-right">Right-aligned heading</h2>
```

#### Embedded Media

Media items (images, videos) can be embedded within formatted content using
Drupal's `<drupal-media>` tag. This allows images to appear inline within
article body content.

**Format:**

```html
<drupal-media data-entity-type="media" data-entity-uuid="MEDIA-UUID"
  >&nbsp;</drupal-media
>
```

**Steps to embed an image:**

1. First, upload the image to create a media entity:

   ```bash
   npx canvas-jsonapi upload-image path/to/image.jpg "Alt text description"
   ```

   Note the UUID returned (e.g., `c4324a2c-6a1d-43a1-98b5-bb2d73e42c54`).

2. Or find an existing media item:

   ```bash
   npx canvas-jsonapi list media--image
   ```

3. Add the `<drupal-media>` tag to the content's `value` field:

   ```json
   {
     "content": {
       "value": "<p>Article text here...</p><drupal-media data-entity-type=\"media\" data-entity-uuid=\"c4324a2c-6a1d-43a1-98b5-bb2d73e42c54\">&nbsp;</drupal-media><p>More text after image...</p>",
       "format": "filtered_html"
     }
   }
   ```

**Important notes:**

- The `&nbsp;` inside the tag is required (non-breaking space placeholder)
- Use the media entity's UUID, not the file UUID
- The `processed` field in the response shows the rendered HTML with actual
  `<img>` tags - this is read-only and generated by Drupal
- Only edit the `value` field, never the `processed` field

### Content Formatting Best Practices

1. **Use semantic elements**: Use `<strong>` for important text, `<em>` for
   emphasis, not just for visual styling.

2. **Blockquotes for highlighted external quotes only**: Use `<blockquote>` only
   for external quotes that need visual emphasis (e.g., testimonials, key
   statements from interviews). Do not use for inline quotes within regular
   paragraphs. Use `<em>` for speaker attribution:

   ```html
   <blockquote>
     <p>"Quote text here"</p>
     <p><em>— Speaker Name, Title</em></p>
   </blockquote>
   ```

   For regular inline quotes, simply use quotation marks within a `<p>` tag.

3. **Lists for related items**: Use `<ul>` or `<ol>` when listing multiple items
   rather than comma-separated text.

4. **Headings for structure**: Use `<h2>`-`<h6>` to create clear content
   sections.

## Workflow Examples

### Download and Edit a Page

```bash
npx canvas-jsonapi list page
npx canvas-jsonapi get page abc-123-def
# Edit content/page/abc-123-def.json
npx canvas-jsonapi update content/page/abc-123-def.json
```

### Create a Page with Images

1. Upload images:

   ```bash
   npx canvas-jsonapi upload-image image1.jpg "Description"
   # Note target_id: 31
   ```

2. Generate UUIDs:

   ```bash
   npx canvas-jsonapi uuid 3
   ```

3. Create page JSON at `content/page/new-my-page.json`:

   ```json
   {
     "data": {
       "type": "page",
       "attributes": {
         "title": "My Page",
         "status": true,
         "components": [
           {
             "uuid": "generated-uuid",
             "component_id": "js.card",
             "inputs": {
               "heading": "Card",
               "image": { "target_id": "31" }
             },
             "parent_uuid": null,
             "slot": null
           }
         ],
         "path": { "alias": "/my-page" },
         "include_in_search": true
       }
     }
   }
   ```

4. Create the page:

   ```bash
   npx canvas-jsonapi create content/page/new-my-page.json
   ```

## Common Pitfalls

1. **Wrong ID type**: Using file's `drupal_internal__target_id` instead of
   media's internal ID causes "image.src NULL value found" errors.

2. **Missing langcode permission**: When creating pages, omit the `langcode`
   field as the API may reject it with permission errors.

3. **Patching limitations**: PATCH requests may not work for all fields. Create
   a new page with a different alias if updates fail.

## Environment Variables

Required in `.env`:

- `CANVAS_SITE_URL` - Base URL of Acquia Source site
- `CANVAS_JSONAPI_PREFIX` - API prefix (default: "api")
- `CANVAS_CLIENT_ID` - OAuth client ID
- `CANVAS_CLIENT_SECRET` - OAuth client secret
