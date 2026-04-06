---
name: full-site-build
description:
  End-to-end autonomous pipeline — takes any source URL (or Figma URL), builds
  all Canvas components AND migrates all structured content in parallel, then
  assembles the final Canvas pages with real components wired to real content.
  When source MCP is connected, missing content types and fields are created
  automatically. If source MCP is absent and types are missing, the pipeline
  pauses for the user. Triggers on phrases like "full site from URL", "build and
  migrate", "end to end from URL", "full site build", "build the full site",
  "build site and migrate content", "do everything end to end".
metadata:
  mcp-server: figma, figma-desktop
allowed-tools: Bash(playwright-cli:*), Bash(npx canvas-jsonapi *), Bash(npm *)
---

# Full Site Build — End-to-End Pipeline

Builds Canvas components AND migrates structured content from one source URL,
then assembles Canvas pages that wire the two together. Runs both tracks in
parallel; only stops at the Content Type Gate if Drupal content types are
missing.

## Pipeline Overview

```
Source URL (and/or Figma URL)
    │
    ├─── Track A: Component Build ──────────────────────────────────────────┐
    │      Phase A1 — Capture source into Figma (if web URL)                │
    │      Phase A2 — Build React components                                │
    │      Phase A3 — Visual QA loop (mandatory, multi-iteration)           │
    │      Phase A4 — Validate → Re-QA → Upload                            │
    │               ├── A4a  Validate (npm run code:fix)                   │
    │               ├── A4b  Visual QA again ← MANDATORY after validate    │
    │               └── A4c  Upload to Canvas                              │
    │                                                                        │
    ├─── Track B: Content Migration ────────────────────────────────────────┤
    │      Phase B1 — Discover Canvas site schema (npx canvas-jsonapi)      │
    │      Phase B2 — Crawl source (Playwright)                             │
    │      Phase B3 — Content Type Gate                                      │
    │               ↳ source-mcp connected → auto-create types & fields     │
    │               ↳ source-mcp absent   → STOP, wait for user             │
    │      Phase B4 — Create taxonomy terms                                  │
    │      Phase B5 — Create menu items                                      │
    │      Phase B6 — Create content nodes                                   │
    │                                                                        │
    └─── Merge: Canvas Page Assembly ───────────────────────────────────────┘
           Phase C — Build Canvas pages: real components + real content
           Phase D — Verify live Canvas pages
    │
    ▼
Done — final report
```

Tracks A and B run **concurrently** — start both before waiting on either. Phase
C (page assembly) only runs after **both** A4 and B6 are complete.

---

## Rules for Autonomous Operation

- **Do not ask clarifying questions** mid-run. Make reasonable decisions and
  document them in the final report.
- **Content Type Gate (Phase B3):** If source MCP is connected, auto-create
  missing content types and fields — no stop needed, proceed straight to B4. If
  source MCP is NOT connected, output the CT checklist and **STOP** until the
  user confirms. All other errors: retry up to 3 times, then document and
  continue.
- **Max QA iterations per component:** 5. If still failing after 5, mark as
  "needs manual review" and continue.
- **Never substitute Canvas `page` for a missing structured content type.**
- **Phase C is mandatory.** Do not report "done" until Canvas pages exist with
  components placed and content wired in.

---

## Track A: Component Build

### Phase A1 — Capture to Figma (web URLs only)

Skip this phase if the source is already a `figma.com` URL.

1. Open source URL at 1440×900 via `playwright-cli open --browser=chrome`
2. Dismiss cookie banners, popups, overlays
3. Detect page height and sticky header offset
4. Capture into Figma: `generate_figma_design(outputMode: "newFile")`
5. Poll until complete, save `fileKey`

### Phase A2 — Build Components

For each visual section of the source:

1. `get_design_context(fileKey, nodeId)` per section
2. Build React component following `nebula-component-creation` patterns
3. Apply `canvas-styling-conventions` (Tailwind tokens, CVA variants)
4. Apply `canvas-component-definition` contract
5. Apply `canvas-component-metadata` for `component.yml`
6. Apply `canvas-component-utils` for FormattedText/Image
7. Create Storybook story per `nebula-storybook-stories`

### Phase A3 — Visual QA Loop (MANDATORY)

> ⛔ Do not skip. One screenshot glance is not QA.

For each component:

1. Start Storybook at `http://localhost:6006` if not running (`npm run dev`)
2. Screenshot live site section at 1440px (correct Y offset, no overlays)
3. Extract computed style manifest from live site
4. Screenshot Storybook story at
   `http://localhost:6006/iframe.html?id=<id>&viewMode=story` (resize 1440×900)
5. Extract computed style manifest from Storybook
6. Compare: layout, typography, colors, spacing — tolerance ≤2px/2%
7. If any diff → fix `src/components/<name>/index.jsx` → wait 2s → re-compare
8. Repeat up to 5 iterations. After 5 → mark "needs manual review", move on
9. Component is "Matched" only when: screenshot AND style manifest both pass

### Phase A4 — Validate & Upload

1. **Validate**

   ```bash
   npm run code:fix
   ```

   Fix lint/formatting errors. Retry up to 3 times until passing.

2. **Re-run visual QA after validation** — ESLint/Prettier auto-fix can rewrite
   JSX in ways that shift visual output. After `code:fix` passes, run the full
   `visual-qa-loop` again for every component. Only proceed to upload once every
   component still passes the visual QA check.

   > ⛔ **This QA pass is mandatory.** A clean lint run does not mean the
   > component still matches the reference. Do not upload until this second QA
   > pass confirms it.

3. **Upload** — follow `canvas-component-upload` skill (handle dependency
   ordering, retry on conflict). After all components:

   ```bash
   npx canvas upload -d ./src/components --css-only -y
   ```

---

## Track B: Content Migration

### Phase B1 — Discover Canvas Site Schema

```bash
npx canvas-jsonapi list --types
```

Record all available types: `node--*`, `taxonomy_term--*`,
`menu_link_content--menu_link_content`, `page`.

### Phase B2 — Crawl Source (Playwright)

Use Playwright as the default. Do not try WebFetch first — most modern sites
need JavaScript.

```bash
playwright-cli open <source-url>
playwright-cli snapshot
```

Visit 5–10 representative pages. From each snapshot YAML, extract:

- URL patterns and page titles
- Nav structure (section names, hierarchy)
- Content signals: dates, authors, bios, tags, images, download links
- Repeating patterns (cards, profiles, listings, etc.)

If a Figma URL was also provided: use `get_design_context` to extract the
content schema (field names, required vs optional, relationships). Figma defines
the schema; Playwright provides the actual values.

Classify each content pattern into a canonical type derived from what the source
actually contains (do not hardcode a fixed type list).

### Phase B3 — Content Type Gate

Check classified types against `npx canvas-jsonapi list --types`.

- Type exists → continue to B4
- Type **missing** → probe source MCP (Step 1 below)

> ⛔ Never create Canvas `page` entities as a substitute for a missing
> structured content type.

#### Step 1 — Probe source MCP

Call `ListMcpResourcesTool` with `server: "source-mcp"`:

- **Succeeds** → source MCP is connected → **auto-create missing types
  (Step 2)**
- **Fails / not connected** → fall back to manual checklist (Step 3)

#### Step 2 — Auto-create via source MCP (source-mcp connected)

For each missing content type:

1. **Create the content type:** Use `create_content_type` with `machine_name`,
   `label`, `workflow: "editorial"` (default unless another workflow is known),
   and optional `description`.

2. **Add each custom field:** Use `add_field_to_content_type` — map inferred
   data to the correct `field_type`:

   | Data from source                | MCP `field_type`                          |
   | ------------------------------- | ----------------------------------------- |
   | Short text (title, name, label) | `string`                                  |
   | Long formatted text (body, bio) | `text_long`                               |
   | Long text with summary          | `text_with_summary`                       |
   | Date / time                     | `datetime`                                |
   | URL / link                      | `link`                                    |
   | Email address                   | `email`                                   |
   | True/false toggle               | `boolean`                                 |
   | Fixed list of text values       | `list_string`                             |
   | Reference to another node       | `field_ui:entity_reference:node`          |
   | Reference to taxonomy term      | `field_ui:entity_reference:taxonomy_term` |
   | Image or file                   | `field_ui:entity_reference:media`         |

3. **Verify JSON:API exposure:** Re-run `npx canvas-jsonapi list --types` to
   confirm `node--<machine-name>` appears. Retry up to 3 times with a short
   wait. If still missing, warn the user to expose it at
   `/admin/config/services/jsonapi/resource_types` and wait for confirmation.

4. **Source MCP limitations** — handle gracefully, do not stop the pipeline:
   - Cannot create new vocabularies — only vocabularies that already exist on
     the site can be used (discover them via `ListMcpResourcesTool` or
     `list_entities` with `entity_type: "taxonomy_vocabulary"`)
   - Cannot create menus — see Phase B5 for menu handling

Proceed to B4 once all types are confirmed.

#### Step 3 — Manual checklist (source MCP not connected)

Output the following block for each missing type and **STOP**:

---

**⚠ Action required — pipeline paused at content migration.**

Source MCP is not connected. Create the following Drupal content types manually,
then reply "done" to resume:

1. `/admin/structure/types/add`
2. Add the fields listed
3. `/admin/config/services/jsonapi/resource_types` — expose the type

##### Content Type: `<machine-name>`

**Label:** `<Human Readable Name>` **Purpose:** `<what this content represents>`
**Source URL example:** `<a real URL of this content type>`

| Field label | Machine name | Drupal field type | Required       |
| ----------- | ------------ | ----------------- | -------------- |
| Title       | title        | Text (plain)      | Yes (built-in) |
| ...         | field\_...   | ...               | ...            |

**Expose in JSON:API as:** `node--<machine-name>`

---

Resume Phase B4 only after user confirms all types exist and are
JSON:API-exposed.

### Phase B4 — Create Taxonomy Terms

**If source MCP is connected:** First discover available vocabularies via
`list_entities(entity_type: "taxonomy_vocabulary")`, then use
`get_or_create_term(vid, name)` with the appropriate vocabulary. If content
requires a vocabulary that doesn't exist on the site, inform the user to create
it manually at `/admin/structure/taxonomy/add` before resuming.

**If source MCP is NOT connected:** Use `npx canvas-jsonapi create`:

```json
{
  "data": {
    "type": "taxonomy_term--<vocab>",
    "attributes": { "name": "<Term Name>", "weight": 0 }
  }
}
```

```bash
npx canvas-jsonapi create content/taxonomy_term--<vocab>/<slug>.json
```

Record every created UUID — required for node relationships.

### Phase B5 — Create Menu Items

Check `npx canvas-jsonapi list --types` for
`menu_link_content--menu_link_content`.

- **Not in list:** inform user to create menu items manually at
  `/admin/structure/menu/manage/main`. Move on.
- **In list:** create parents first, record UUIDs, then create children with
  `relationships.parent`.

### Phase B6 — Create Content Nodes

Creation order (dependency-safe):

1. Taxonomy terms (done in B4)
2. Media/images: `npx canvas-jsonapi upload-image <path> "Alt text"`
3. Independent nodes (e.g. `person`) — no references to other nodes
4. Dependent nodes (e.g. `article` referencing `person`) — after step 3

```json
{
  "data": {
    "type": "node--<type>",
    "attributes": {
      "title": "<Title>",
      "status": true,
      "body": { "value": "<p>HTML</p>", "format": "basic_html", "summary": "" },
      "path": { "alias": "/<slug>" }
    },
    "relationships": {
      "field_<ref>": { "data": { "type": "<entity-type>", "id": "<uuid>" } }
    }
  }
}
```

HTML body: only `p strong em a ul ol li h2 h3 h4 blockquote`.

```bash
npx canvas-jsonapi create content/node--<type>/<slug>.json
```

---

## Merge: Canvas Page Assembly

Run Phase C only after **both** A4 (components uploaded) and B6 (nodes created)
are complete.

### Phase C — Build Canvas Pages

Canvas `page` entities are layout containers only — not content stores. Use them
for: homepage, section landing pages (e.g. /academics, /news), utility pages
(404).

For each page, wire the uploaded components with real content from B6:

```json
{
  "data": {
    "type": "page",
    "attributes": {
      "title": "<Page Title>",
      "status": true,
      "path": { "alias": "/<path>" },
      "components": [
        {
          "uuid": "<uuid>",
          "component_id": "js.<machine_name>",
          "component_version": "<version-hash>",
          "inputs": { "<prop>": "<real value from crawled content>" },
          "parent_uuid": null,
          "slot": null,
          "label": null
        }
      ]
    }
  }
}
```

```bash
npx canvas-jsonapi create content/page/new-<slug>.json
```

Component version hash: `GET /canvas/api/v0/config/js_component/<name>` →
extract 16-char hex from the `js_header` field.

### Phase D — Verify Live Pages

Open each assembled Canvas page in playwright-cli. Screenshot and compare
against the source URL screenshot from A1. Note structural differences in the
final report.

---

## Final Report

```
## Full Site Build — Summary

**Source:** <URL>
**Canvas site:** <CANVAS_SITE_URL>

### Track A: Components
| Component | Built | QA Iterations | QA Status | Uploaded |
|-----------|-------|--------------|-----------|---------|
| hero      | ✅    | 2            | ✅ Matched | ✅      |
| ...       |       |              |           |         |

### Track B: Content
| Step | Status | Count |
|------|--------|-------|
| Canvas schema discovered | ✅ | N types available |
| Content types confirmed | ✅ / ⚠ pending | N missing |
| Taxonomy terms created | ✅ | N terms |
| Menu items created | ✅ / manual | N items |
| Content nodes created | ✅ | N nodes |

### Canvas Pages Assembled
| Page | URL | Status |
|------|-----|--------|
| Homepage | / | ✅ live |
| ...      |   |        |

### Notes
- <autonomous decisions made>
- <components needing manual review>
- <content types that were missing and required user action>
- <any errors and how resolved>
```
