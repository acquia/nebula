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
allowed-tools: Bash(playwright-cli:*), Bash(npm *)
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
    │               └── A1 verify: confirm Figma file has visible content   │
    │      Phase A2 — Build React components                                │
    │      Phase A3 — Visual QA loop (mandatory, multi-iteration)           │
    │      Phase A4 — Validate → Re-QA → Upload                            │
    │               ├── A4a  Validate (npm run code:fix)                   │
    │               ├── A4b  Visual QA again ← MANDATORY after validate    │
    │               └── A4c  Upload to Canvas                              │
    │      Phase A5 — Upload images to Drupal media, wire to Canvas instances│
    │                                                                        │
    ├─── Track B: Content Migration ────────────────────────────────────────┤
    │      Phase B1 — Discover Canvas site schema (source MCP)              │
    │      Phase B2 — Crawl source (Playwright)                             │
    │      Phase B3 — Content Type Gate                                      │
    │               ↳ source-mcp connected → auto-create types & fields     │
    │               ↳ source-mcp absent   → STOP, wait for user             │
    │      Phase B4 — Create taxonomy terms (source MCP)                    │
    │      Phase B5 — Create menu items (manual — not supported by MCP)     │
    │      Phase B6 — Create content nodes (source MCP)                     │
    │                                                                        │
    └─── Merge: Canvas Page Assembly ───────────────────────────────────────┘
           Phase C — Build Canvas pages: real components + real content
                     (image props already wired by A5 — publish only after)
           Phase D — Verify live Canvas pages
    │
    ▼
Done — final report
```

Tracks A and B run **concurrently** — start both before waiting on either. Phase
C (page assembly) only runs after **both** A4+A5 and B6 are complete.

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
- **Phase A1 Figma verification is mandatory.** After `generate_figma_design`
  completes, screenshot the result and confirm visible content exists. An empty
  or all-white frame is a failure — do not proceed to A2 without content.
- **Phase A5 is mandatory.** Every image prop in every Canvas page component
  instance must be wired to a Drupal media `target_id` before pages are
  published. Do not report "done" with `null` image props.
- **Phase C is mandatory.** Do not report "done" until Canvas pages exist with
  components placed and content wired in.

---

## Track A: Component Build

### Phase A1 — Capture to Figma (web URLs only)

Skip this phase if the source is already a `figma.com` URL.

1. Open source URL at 1440×900 via `playwright-cli open --browser=chrome`
2. Dismiss cookie banners, popups, overlays
3. Detect page height and sticky header offset
4. **Capture into Figma (external URL — CSP-bypass required):**

   > ⚠ Do NOT call `generate_figma_design` and assume it captured content.
   > For external URLs the tool only generates a `captureId` — you must inject
   > the capture script via Playwright to actually capture the page.

   a. Call `generate_figma_design(outputMode: "newFile")` → save `captureId`
   b. Run the CSP-bypass Playwright injection (required for all external URLs):

      ```
      playwright-cli run-code "async page => {
        await page.route('**/*', async (route) => {
          const response = await route.fetch();
          const headers = { ...response.headers() };
          delete headers['content-security-policy'];
          delete headers['content-security-policy-report-only'];
          await route.fulfill({ response, headers });
        });
        await page.goto('<SOURCE_URL>');
        const r = await page.context().request.get('https://mcp.figma.com/mcp/html-to-design/capture.js');
        await page.evaluate((s) => { const el = document.createElement('script'); el.textContent = s; document.head.appendChild(el); }, await r.text());
        await page.waitForTimeout(500);
        return await page.evaluate(() => window.figma.captureForDesign({
          captureId: '<captureId>',
          endpoint: 'https://mcp.figma.com/mcp/capture/<captureId>/submit',
          selector: 'body'
        }));
      }"
      ```

   c. Poll `generate_figma_design(captureId: "<captureId>")` every 5 s until
      status is `completed`
   d. Save `fileKey` **and** the `node-id` from the returned URL
      (e.g., `?node-id=2-2` → nodeId `2:2`) — this is the captured frame

5. **Verify content exists** — immediately after capture:
   - Use the `node-id` from step 4d (NOT `0:1` — the root canvas is always
     blank and will give a false negative)
   - Call `get_screenshot(fileKey: "<fileKey>", nodeId: "<captured-node-id>")`
   - Inspect the screenshot — if all-white, blank, or contains only a frame
     outline with no visible page content, the capture failed silently
   - **Failure recovery:** Re-open the source URL, scroll slowly through the
     full page height, take section screenshots with Playwright, then call
     `generate_figma_design` again with `outputMode: "existingFile"` targeting
     the same `fileKey` to re-capture, or create a new file
   - Only proceed to A2 once the screenshot confirms visible content in Figma

> ⛔ An empty Figma file is a hard blocker for A2. Do not build components
> against a blank design — the visual reference will be missing.

### Phase A2 — Build Components

For each visual section of the source:

1. `get_design_context(fileKey, nodeId)` per section
2. Build React component following `nebula-component-creation` patterns
3. Apply `canvas-styling-conventions` (Tailwind tokens, CVA variants)
4. Apply `canvas-component-definition` contract
5. Apply `canvas-component-metadata` for `component.yml`
6. Apply `canvas-component-utils` for FormattedText/Image
7. Ensure Workbench preview coverage (author `mocks.json` for named states as
   needed; follow `canvas-workbench` skill)

### Phase A3 — Visual QA Loop (MANDATORY)

> ⛔ Do not skip. One screenshot glance is not QA.

For each component:

1. Start Workbench if not running: `npm run dev`; note the URL from startup
   output (follow `canvas-workbench` skill)
2. Screenshot live site section at 1440px (correct Y offset, no overlays)
3. Extract computed style manifest from live site
4. Screenshot Workbench component preview at
   `<workbench-url>/?component=<component-name>&state=Default` (resize 1440×900)
5. Extract computed style manifest from Workbench preview
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

3. **Push** — follow `canvas-component-push` skill. `canvas push --yes` pushes
   all components and global CSS in one step; handle dependency ordering, retry
   on conflict.

### Phase A5 — Upload Images to Drupal Media and Wire to Canvas

Run after A4c (components pushed). This phase must complete before any Canvas
page is published in Phase C.

1. **Collect image URLs** — from the source site crawl (B2), build a list of
   every image that appears in a Canvas page component instance (hero
   backgrounds, card images, spotlight images, etc.).

2. **Create Drupal media entities** — for each image, upload via source MCP:

   ```
   create_media(bundle: "image", name: "<descriptive-name>", filename: "<file.jpg>",
     metadata: { "alt": "<alt text>" })
   ```

   Upload the file using the returned signed URL. Record each `target_id`.

3. **Wire image props to Canvas component instances** — for each Canvas page,
   get the current layout (`get_page_layout`), match component instances to
   their images, then call `update_component_props` with:
   ```
   { "<image-prop>": { "target_id": <drupal-media-id> } }
   ```

4. **Verify** — confirm every image prop in every component instance resolves
   to a non-null image URL in the `resolved` output. If any remain `null`,
   debug and retry before proceeding.

> ⛔ Do NOT publish Canvas pages (Phase C step 5) until all image props are
> wired. A page with `"image": null` is incomplete.

---

## Track B: Content Migration

### Phase B1 — Discover Canvas Site Schema

Read available content types via source MCP:

```
ReadMcpResourceTool(server: "source-mcp", uri: "drupal://content-types")
list_entities(entity_type: "taxonomy_vocabulary")
```

Record every available type. Types that matter:

- `node--*` — writable content node types
- `taxonomy_term--*` — taxonomy vocabularies
- `canvas_page` — Canvas layout pages (always present)

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

Check classified types against those discovered in Phase B1.

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

3. **Verify exposure:** Re-read `drupal://content-types` to confirm the new type
   appears. Retry up to 3 times. If still missing, warn the user to expose it at
   `/admin/config/services/jsonapi/resource_types` and wait for confirmation.

4. **Source MCP limitations** — handle gracefully, do not stop the pipeline:
   - Cannot create new vocabularies — only vocabularies that already exist on
     the site can be used
   - Cannot create menus — see Phase B5 for menu handling

Proceed to B4 once all types are confirmed.

#### Step 3 — Manual checklist (source MCP not connected)

Output the following block for each missing type and **STOP**:

---

**⚠ Action required — pipeline paused at content migration.**

Source MCP is not connected. Connect it and retry, or create the following
Drupal content types manually, then reply "done" to resume:

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

Resume Phase B4 only after user confirms all types exist.

### Phase B4 — Create Taxonomy Terms

Discover available vocabularies:

```
list_entities(entity_type: "taxonomy_vocabulary")
```

Create terms:

```
get_or_create_term(vid: "<vocab-machine-name>", name: "<Term Name>")
```

`get_or_create_term` is idempotent — safe to call even if the term may already
exist. Record every returned term ID — required for node relationship fields.

If content requires a vocabulary that doesn't exist on the site, inform the user
to create it manually at `/admin/structure/taxonomy/add` before resuming.

### Phase B5 — Create Menu Items

Menu links are not supported via source MCP. Inform the user to create menu
items manually at `/admin/structure/menu/manage/main` and move on.

Output a list of menu items for the user to create based on the nav structure
extracted in Phase B2.

### Phase B6 — Create Content Nodes

Creation order (dependency-safe):

1. Taxonomy terms (done in B4)
2. Media/images — upload before nodes that reference them:

   ```
   create_media(bundle: "image", name: "<name>", filename: "<file.jpg>",
     metadata: { "alt": "<alt text>" })
   ```

   Upload the file using the returned signed URL. Record each `target_id`.

3. Independent nodes (e.g. `person`) — no references to other nodes:

   ```
   create_node(bundle: "<type>", fields: {
     "title": "<Title>",
     "status": true,
     "body": { "value": "<p>HTML</p>", "format": "basic_html", "summary": "" },
     "path": { "alias": "/<slug>" },
     "field_<ref>": { "target_id": <id> }
   })
   ```

4. Dependent nodes (e.g. `article` referencing `person`) — after step 3.

Use `batch_create_nodes` when creating multiple nodes of the same bundle.

HTML body: only `p strong em a ul ol li h2 h3 h4 blockquote`.

---

## Merge: Canvas Page Assembly

Run Phase C only after **both** A4+A5 (components uploaded, images wired) and
B6 (nodes created) are complete.

### Phase C — Build Canvas Pages

Canvas `canvas_page` entities are layout containers only — not content stores.
Use them for: homepage, section landing pages (e.g. /academics, /news), utility
pages (404).

For each page, wire the uploaded components with real content from B6.

**1. Create the page:**

```
create_canvas_page(title: "<Page Title>", path: "/<path>")
→ returns page_id
```

**2. Read available components:**

```
ReadMcpResourceTool(server: "source-mcp", uri: "canvas://components")
```

**3. Add each component with real prop values from crawled content:**

```
add_component_to_page(page_id: <id>, component_id: "js.<machine_name>", props: {
  "<prop>": "<real value from B6 content>"
})
→ returns new_instance_id
```

**4. Add slotted children (if needed):**

```
add_component_to_page(
  page_id: <id>,
  component_id: "js.<child_component>",
  parent_instance_id: "<parent-instance-id>",
  slot: "<slot-name>",
  props: { ... }
)
```

**5. Publish each page:**

```
ReadMcpResourceTool(server: "source-mcp", uri: "canvas://auto-saves")
→ get autosave_key and data_hash for each page

publish_auto_saves(autosaves: [{ autosave_key: "canvas_page:<id>:en", data_hash: "..." }])
```

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

### Phase A1: Figma Capture
| Step | Status |
|------|--------|
| Capture completed | ✅ / ❌ |
| Figma content verified (non-empty screenshot) | ✅ / ❌ |
| fileKey | `<fileKey>` |

### Phase A5: Images
| Image | Drupal media ID | Wired to instance | Status |
|-------|-----------------|-------------------|--------|
| hero-bg | ... | hero/backgroundImage | ✅ |
| ... | | | |

### Track B: Content
| Step | Status | Count |
|------|--------|-------|
| Canvas schema discovered | ✅ | N types available |
| Content types confirmed | ✅ / ⚠ pending | N missing |
| Taxonomy terms created | ✅ | N terms |
| Menu items | manual | N items listed for user |
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

### ⚠️ Manual Steps Required in Drupal

The following cannot be automated. Complete these before the site is fully
functional.

**What was handled automatically:**
- ✅ Content types (auto-created via `create_content_type`)
- ✅ Fields (auto-added via `add_field_to_content_type`)
- ✅ Taxonomy terms in existing vocabularies
- ✅ Content nodes, media, Canvas pages

**Still needs manual action:**

| Task | Drupal path | Details |
|------|-------------|---------|
| Vocabulary creation | `/admin/structure/taxonomy/add` | <list new vocab names, or "none"> |
| Menu creation | `/admin/structure/menu/add` | <list menu names, or "none"> |
| Menu links | `/admin/structure/menu/manage/<name>` | <paste the link table from Phase B5> |
| JSON:API exposure | `/admin/config/services/jsonapi/resource_types` | <list any new node types> |

**Nav components (header, footer):** These render from a static fallback until
Drupal menus are created. Once menus exist with the correct machine name, the
components automatically fetch live links — no code change needed.
```
