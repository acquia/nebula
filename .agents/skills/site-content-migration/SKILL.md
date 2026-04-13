---
name: site-content-migration
description:
  Migrate structured content (menus, taxonomy, nodes) from any source into a
  Canvas/Drupal site using source MCP tools — no module installation required.
  The source can be a live website URL (crawled with Playwright) or a Figma
  design file (analyzed with the Figma MCP). Claude classifies content, infers
  the required Drupal content type schema, and creates all entities via source
  MCP. Use when building a new Canvas site from an existing web source or
  design. Triggered by phrases like "migrate content from URL", "migrate content
  from Figma", "set up content structure from site", "import content types from
  URL/design", or "migrate site content".
allowed-tools: Bash(playwright-cli:*)
---

# Site Content Migration Skill

Migrates structured content from any source into Canvas/Drupal using
**Playwright + Figma MCP + source MCP tools**. Requires source MCP to be
connected.

The source can be:

- **A live website URL** — crawled with Playwright to extract real content
- **A Figma design file** — analyzed with the Figma MCP to extract the content
  schema from the design's components and annotations
- **Both** — Figma defines the schema; the live site provides the actual data

---

## Analysis Toolkit

| Tool                              | Best for                                   | Limitation                                 |
| --------------------------------- | ------------------------------------------ | ------------------------------------------ |
| **Playwright** (`playwright-cli`) | Any live website — default choice          | Higher token cost (~5–30k tokens/page)     |
| **WebFetch** (built-in)           | Known static CMS (Drupal/WordPress) only   | No JavaScript — fails on most modern sites |
| **Figma MCP**                     | Schema extraction from design files        | No actual content values                   |
| **Claude analysis**               | Classifying content, inferring field types | Only as good as the input                  |

**Default: always use Playwright.** Most modern sites use JavaScript for
rendering. WebFetch only saves tokens if it succeeds — if the site needs JS
(increasingly common), using WebFetch first wastes tokens on a failed attempt
before switching to Playwright anyway. Use WebFetch only as an optional
quick-check when you have prior knowledge the site is fully server-rendered.

---

## Input Detection

Before starting, identify what the user has provided:

| Input                      | Detection         | Analysis method                                  |
| -------------------------- | ----------------- | ------------------------------------------------ |
| `figma.com/design/...` URL | Figma design link | Figma MCP (`get_design_context`, `get_metadata`) |
| `figma.com/board/...` URL  | FigJam board      | Figma MCP (`get_figjam`)                         |
| Any other URL              | Live website      | Playwright (`playwright-cli`) — default          |
| Both Figma + live URL      | Design + content  | Figma for schema, Playwright for data            |

If only a Figma URL is given with no live site, phases 2b–2d use design analysis
only and produce a content schema + CT checklist. Actual node creation (Phase 6)
is deferred until the user provides real content data.

---

## Pipeline Overview

```
Source (URL and/or Figma link)
    │
    ▼
Phase 1 — Discover Canvas site schema
  What content types, vocabularies, and menus already exist?
    │
    ▼
Phase 2 — Analyze source
  Live URL → Playwright crawl
  Figma URL → Figma MCP analysis
  Both → merge findings
    │
    ▼
Phase 3 — Content Type Gate
  Compare classified content against available types.
  source-mcp connected → auto-create missing types & fields, continue
  source-mcp absent + types missing → output checklist, STOP until user confirms
  Do NOT create Canvas pages as a substitute for missing content types.
    │
    ▼
Phase 4 — Create taxonomy terms
  Map discovered categories/tags → create taxonomy_term entities via source MCP
    │
    ▼
Phase 5 — Create menu items
  Extract nav structure → inform user to create menu items manually
    │
    ▼
Phase 6 — Create content nodes
  Create nodes of the correct type for each piece of content via source MCP
    │
    ▼
Phase 7 — Create Canvas pages
  Build layout pages that compose uploaded components with real content
    │
    ▼
Done — report summary
```

---

## Phase 1: Discover Canvas Site Schema

Read available content types via source MCP:

```
ReadMcpResourceTool(server: "source-mcp", uri: "drupal://content-types")
```

Also discover vocabularies:

```
list_entities(entity_type: "taxonomy_vocabulary")
```

Record every available type. Types that matter:

- `node--*` — writable content node types (e.g. `node--article`, `node--person`)
- `taxonomy_term--*` — taxonomy vocabularies
- `canvas_page` — Canvas layout pages (always present)

---

## Phase 2: Analyze Source

### 2a — Live website (Playwright)

Use Playwright for all live website crawls. Do not attempt WebFetch first — most
modern sites use JavaScript and WebFetch would return skeleton HTML, wasting
tokens before you switch to Playwright anyway.

```bash
playwright-cli open <source-url>
playwright-cli snapshot
# Read the snapshot YAML file to extract nav links
# Do NOT use playwright-cli eval with arrow functions — it fails serialization
```

Visit 5–10 representative pages. After each snapshot, read the YAML and extract:

- Page title and URL pattern
- Nav links (reveals site structure and section names)
- Presence of dates, author bylines, tags, bios, images, download links
- Repeating structural patterns (cards, profiles, news items, etc.)

**When WebFetch is acceptable (optional token saving):** Only if you have
confirmed prior knowledge that the source site is a fully server-rendered CMS
(classic Drupal/WordPress with no JS framework). In that case, use WebFetch to
fetch a few representative URLs and read the returned markdown directly. If the
response body is thin (< ~200 words of meaningful content), immediately open
Playwright without asking the user — do not report the WebFetch failure.

### 2b — Figma design file (Figma MCP)

If the user provides a `figma.com` URL, use the Figma MCP to analyze it.

**Step 1 — get the top-level structure:**

```
get_metadata(fileKey, nodeId)   ← use nodeId "0:1" for the root/page overview
```

Identify pages and frames that represent distinct content types (e.g. an
"Article Detail" frame, a "Faculty Profile" frame, a "Programs" listing frame).

**Step 2 — get design context for each content frame:**

```
get_design_context(fileKey, nodeId)   ← run for each content-type frame
```

From the returned code and screenshot, extract:

- What data fields are rendered (title, date, author, bio, image, tags, etc.)
- What is required vs optional (shown on all variants vs only some)
- What relationships exist (e.g. article references a person as author)

**Step 3 — check for Code Connect mappings:**

```
get_code_connect_map(fileKey, nodeId)
```

If components are already mapped to code, use the component names and props to
confirm field names.

**What Figma tells you vs what it doesn't:** | Figma can reveal | Figma cannot
reveal | |---|---| | Content type schema (fields, types) | Actual content data |
| Required vs optional fields | Real taxonomy terms | | Relationships between
types | Actual node counts or IDs | | URL/path structure (from annotations) |
Whether a live site exists |

When only a Figma file is provided (no live URL), proceed through Phase 3 (CT
checklist) and Phase 4 (taxonomy), but **skip Phase 6** (node creation) and note
that the user must supply real content data before nodes can be created.

### 2c — Both Figma + live URL

Use Figma for schema definition (field names, types, relationships), and
Playwright for harvesting the actual content data to populate nodes. Figma takes
precedence for field naming if there is ambiguity.

### 2d. Classify content into types

For each distinct content pattern found, determine the canonical content type.
Use the source as the guide — what repeating entity types exist?

Common patterns (examples only — always derive from actual source):

| Source signals                               | Canonical type | Key fields                                                             |
| -------------------------------------------- | -------------- | ---------------------------------------------------------------------- |
| Date + author/byline, news/blog section      | `article`      | title, body, date, author, category, image                             |
| Name + bio + role/title, people/team section | `person`       | title, first_name, last_name, job_title, department, bio, photo, email |
| Program/service/offering with description    | `service_area` | title, body, key_capabilities, image                                   |
| Date + location + registration               | `event`        | title, body, date, end_date, location, registration_url, image         |
| Downloadable file or guide                   | `resource`     | title, body, file, resource_type                                       |
| General informational/landing page           | `page`         | title, body, image                                                     |
| Question + answer pairs                      | `faq`          | title, question, answer, category                                      |

These are **examples only**. Never hardcode this list as the output — always
derive types from what the source actually contains.

---

## Phase 3: Content Type Gate

After classifying content, check which required types already exist via
`drupal://content-types` resource (Phase 1).

For each classified content pattern:

- If the matching `node--<type>` exists → proceed to Phase 4
- If it is **not** in the list → probe source MCP (Step 1 below)

**Rules:**

1. **Never create Canvas `page` entities as a substitute for a missing
   structured content type.** Canvas pages are for layout composition only.
2. **Never hardcode a fixed set of content types.** Always derive what is needed
   from the source site analysis.
3. **Output one checklist entry per missing type**, with fields inferred from
   the source content — not from a template.

### Step 1 — Probe source MCP

Call `ListMcpResourcesTool` with `server: "source-mcp"`:

- **Succeeds** → source MCP is connected → **auto-create missing types
  (Step 2)**
- **Fails / not connected** → fall back to manual checklist (Step 3)

### Step 2 — Auto-create via source MCP (source-mcp connected)

For each missing content type:

1. **Name the type** using a machine-name-safe slug (e.g. `article`, `person`,
   `event`, `program`, `case_study`).

2. **Create the content type:** Use `create_content_type` with `machine_name`,
   `label`, `workflow: "editorial"` (default unless another workflow is known),
   and optional `description`.

3. **Add each custom field:** Use `add_field_to_content_type` — map inferred
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

4. **Verify exposure:** Re-read `drupal://content-types` to confirm the new type
   appears. Retry up to 3 times. If still missing, warn the user to expose it at
   `/admin/config/services/jsonapi/resource_types` and wait for confirmation.

5. **Source MCP limitations** — handle gracefully, do not stop the pipeline:
   - Cannot create new vocabularies — only vocabularies that already exist on
     the site can be used (discover them via `list_entities` with
     `entity_type: "taxonomy_vocabulary"`)
   - Cannot create menus — see Phase 5 for menu handling

Proceed to Phase 4 once all types are confirmed.

### Step 3 — Manual checklist (source MCP not connected)

Output the following block for each missing type and **STOP**:

---

**⚠ Action required: content migration is paused.**

Source MCP is not connected. Connect it and retry, or create the following
Drupal content types manually, then reply "done" to resume:

1. Go to `/admin/structure/types/add`
2. Add the fields listed
3. Go to `/admin/config/services/jsonapi/resource_types` and expose the type
4. Reply "done" and migration will resume

---

### How to generate the Content Type Checklist (for Step 3)

For each missing type, Claude must:

1. **Name the type** using a machine-name-safe slug derived from the content
   (e.g. `article`, `person`, `event`, `program`, `case_study`).
2. **List the fields** by reading actual content from the source pages — what
   data is displayed? Each visible piece of data is a field.
3. **Choose the right Drupal field type** for each field:

   | Data                                         | Drupal field type                                 |
   | -------------------------------------------- | ------------------------------------------------- |
   | Short text (title, name, label)              | Text (plain)                                      |
   | Long formatted text (body, bio, description) | Text (formatted, long, with summary)              |
   | Date/time                                    | Date                                              |
   | URL / link                                   | Link                                              |
   | Email address                                | Email                                             |
   | True/false toggle                            | Boolean                                           |
   | One value from a fixed list                  | List (text)                                       |
   | Reference to another node                    | Entity reference → node                           |
   | Reference to a taxonomy term                 | Entity reference → taxonomy_term                  |
   | Image or file                                | Entity reference → media--image / media--document |

4. **Mark required fields** — fields that every item of that type must have.

#### Content Type Checklist output format

#### Content Type: `<machine-name>`

**Label:** `<Human Readable Name>` **Purpose:**
`<one sentence — what this content represents on the source site>` **Source URL
example:** `<url of a page that is this content type>`

Fields to add:

| Field label | Machine name | Drupal field type | Required       |
| ----------- | ------------ | ----------------- | -------------- |
| Title       | title        | Text (plain)      | Yes (built-in) |
| ...         | field\_...   | ...               | ...            |

**Expose in JSON:API as:** `node--<machine-name>`

---

Only list types that are genuinely needed based on what was found in the crawl.
Do not output types that have no source content.

---

## Phase 4: Create Taxonomy Terms

After all required content types are confirmed, create taxonomy terms.

Discover taxonomies from source content: category filters, tag clouds, topic
labels, department names, etc.

First discover available vocabularies:

```
list_entities(entity_type: "taxonomy_vocabulary")
```

Then create terms:

```
get_or_create_term(vid: "<vocab-machine-name>", name: "<Term Name>")
```

`get_or_create_term` is idempotent — safe to call even if the term may already
exist. Returns the term ID needed for node relationship fields.

If content requires a vocabulary that doesn't exist on the site, inform the user
to create it manually at `/admin/structure/taxonomy/add` before resuming.

---

## Phase 5: Create Menu Items

Menu links are not supported via source MCP. Inform the user to create menu
items manually at `/admin/structure/menu/manage/main` and move on.

If the site's navigation structure was extracted in Phase 2, output a list of
menu items for the user to create manually:

| Label     | Path       | Parent |
| --------- | ---------- | ------ |
| About     | /about     | —      |
| Academics | /academics | —      |
| ...       | ...        | ...    |

---

## Phase 6: Create Content Nodes

Only run after all required types are confirmed in Phase 3.

### Creation order (dependency-safe)

1. Taxonomy terms (done in Phase 4)
2. Media/images — upload before nodes that reference them
3. Independent nodes (e.g. `person`) — referenced by others
4. Dependent nodes (e.g. `article` referencing `person`) — after step 3

### Upload images

```
create_media(bundle: "image", name: "<descriptive name>", filename: "<file.jpg>",
  metadata: { "alt": "<alt text>" })
```

Upload the file using the returned signed URL. Record the `target_id`.

### Create nodes

```
create_node(bundle: "<type>", fields: {
  "title": "<Title>",
  "status": true,
  "body": {
    "value": "<p>HTML body</p>",
    "format": "basic_html",
    "summary": "<plain text summary>"
  },
  "field_<name>": "<value>",
  "field_<ref_field>": { "target_id": <term-or-node-id> },
  "path": { "alias": "/<url-path>" }
})
```

Use `batch_create_nodes` when creating multiple nodes of the same bundle.

HTML body content rules: only use `p strong em a ul ol li h2 h3 h4 blockquote`.

### Pre-creation checklist

- [ ] All required types confirmed (Phase 3)
- [ ] Taxonomy terms created and IDs recorded (Phase 4)
- [ ] Images uploaded and `target_id` values recorded

---

## Phase 7: Create Canvas Pages

Canvas pages (`canvas_page` type) are layout containers that compose uploaded
components. They are **not** a content store.

Use `canvas_page` only for:

- Section landing pages (e.g. /academics, /news)
- Homepage
- Utility pages (404, access denied)

### Workflow for each page

**1. Create the page:**

```
create_canvas_page(title: "<Page Title>", path: "/<path>")
→ returns page_id
```

**2. Read available components:**

```
ReadMcpResourceTool(server: "source-mcp", uri: "canvas://components")
```

**3. Add root-level components with real content from Phase 6:**

```
add_component_to_page(page_id: <id>, component_id: "js.<machine_name>", props: {
  "<prop>": "<real value from crawled content>"
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

**5. Publish:**

```
ReadMcpResourceTool(server: "source-mcp", uri: "canvas://auto-saves")
→ get autosave_key and data_hash

publish_auto_saves(autosaves: [{ autosave_key: "canvas_page:<id>:en", data_hash: "..." }])
```

---

## Common Pitfalls

1. **Missing content type — do not fall back to `page`**: If source MCP is
   connected, auto-create the type via `create_content_type` +
   `add_field_to_content_type`. If not connected, output the Content Type
   Checklist and pause. Resume only after the user confirms types exist.

2. **Menu links not available via MCP**: Ask the user to create menu items
   manually at `/admin/structure/menu/manage/main`.

3. **`eval` with arrow functions fails in playwright-cli**: Use `snapshot`
   instead, then read the generated YAML file to extract content.

4. **Path alias silently ignored**: After creating a node, verify the alias was
   applied. If not, ask the user to set it in the Drupal UI.

5. **Taxonomy references before terms exist**: Always create taxonomy terms
   first and record IDs before creating nodes that reference them.

6. **Hardcoding content types**: Never assume which types are needed. Always
   derive them from the actual source analysis (crawl or Figma).

7. **Figma-only with no content data**: When only a Figma file is provided,
   produce the CT checklist and taxonomy plan but skip node creation (Phase 6).
   Note clearly that real content data is needed before nodes can be created.

8. **Figma annotations vs real fields**: Figma frames may show placeholder text
   ("Lorem ipsum", "John Doe"). Do not treat placeholder values as real content
   — they define the field structure only. Real values come from the live site
   crawl or user-supplied data.

---

## Manual Steps Summary

At the end of every migration run, always output this block. It tells the user
exactly what the automation **could not do** and what still needs manual action
in Drupal before the site is fully functional.

Only include rows that apply to the current run.

---

### ⚠️ Manual Steps Required in Drupal

The following tasks cannot be automated via source MCP and must be completed
manually.

**What source MCP handles automatically (no manual action needed):**

- ✅ Content type creation (`create_content_type`)
- ✅ Adding fields to content types (`add_field_to_content_type`)
- ✅ Taxonomy term creation in existing vocabularies (`get_or_create_term`)
- ✅ Content nodes, media, Canvas pages

**What requires manual action:**

| Task                                                           | Drupal path                                     | Notes                                                       |
| -------------------------------------------------------------- | ----------------------------------------------- | ----------------------------------------------------------- |
| **Vocabulary creation** (if new vocabularies needed)           | `/admin/structure/taxonomy/add`                 | List each vocabulary name discovered in the crawl           |
| **Menu creation** (if menus don't exist yet)                   | `/admin/structure/menu/add`                     | List each menu machine name the site needs                  |
| **Menu links**                                                 | `/admin/structure/menu/manage/<menu-name>`      | List the links extracted in Phase 2 (label + path + parent) |
| **JSON:API exposure** (if new content types were auto-created) | `/admin/config/services/jsonapi/resource_types` | Expose each new `node--<type>` resource                     |

**For components that fetch from Drupal menus (e.g. header, footer):** These
components include a static fallback array that renders immediately. Once you
create the corresponding Drupal menus and add links, the components will
automatically switch to live Drupal-managed navigation — no code change needed.
