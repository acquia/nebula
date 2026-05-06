---
name: canvas-content-templates
description:
  Create and modify content templates that map Drupal content entities to Canvas
  component layouts. Use when asked to (1) Create a new content template, (2)
  Modify an existing content template, (3) Add or change entity field mappings
  in a template, (4) Compose components in a content template via slots. Content
  templates live in the configured `contentTemplatesDir` (default
  `content-templates/`) and define how Drupal entity types, bundles, and view
  modes render as Canvas component trees.
---

## Canonical definition

A content template is a JSON file that maps a Drupal content entity (identified
by entity type, bundle, and view mode) to a tree of Canvas component elements.
Content templates define how Drupal content is rendered using Canvas components,
including which entity fields map to which component props.

## Location and naming

Author content templates in the configured content templates directory
(`contentTemplatesDir` in `canvas.config.json`). If `contentTemplatesDir` is not
set, the default is the top-level `content-templates/` directory.

**Naming convention:** `{entityType}.{bundle}.{viewMode}.json`

Examples:

- `<content-templates-dir>/node.article.full.json`
- `<content-templates-dir>/node.article.teaser.json`

## Content template format

Each content template is a JSON object with these top-level keys:

- `label` (required): human-readable description of the template (e.g.,
  `"Article — Full content"`)
- `entityType` (required): the Drupal entity type (e.g., `"node"`)
- `bundle` (required): the content type / bundle (e.g., `"article"`)
- `viewMode` (required): the view mode (e.g., `"full"`, `"teaser"`)
- `elements` (required): an object of component elements keyed by element ID

The filename must match `{entityType}.{bundle}.{viewMode}.json` and correspond
to the values inside the file.

## Elements

The `elements` shape is identical to Canvas page specs — see the
`canvas-page-definition` skill for examples. The only difference is prop value
types: content templates additionally support prop sources that pull from the
host Drupal entity (described below).

Each entry in `elements` is keyed by an element ID and contains:

- `type` (required): the Canvas component type, prefixed with `js.` (e.g.,
  `"js.hero"`, `"js.card"`, `"js.section"`)
- `props` (optional): component props — can be static values or entity field
  references
- `slots` (optional): a map of slot names to arrays of element IDs from the same
  template

### Element IDs

Use stable, descriptive element IDs unless you are intentionally preserving IDs
from another source such as an exported Canvas content template.

## Prop value types

Props can hold three kinds of values:

### 1. Static values

Plain JSON values — strings, numbers, booleans, or objects with `value` and
`format` for rich text.

```json
{
  "buttonLabel": "Build your hybrid team",
  "darkVariant": true,
  "description": {
    "value": "Some <em>HTML</em> content here.",
    "format": "canvas_html_block"
  }
}
```

### 2. Entity field references

Dynamic values pulled from the Drupal entity. Use `sourceType: "entity-field"`
with an `expression` string.

```json
{
  "title": {
    "sourceType": "entity-field",
    "expression": "ℹ︎␜entity:node:article␝title␞␟value"
  }
}
```

### 3. Host entity URL

Links back to the entity's canonical URL. Use `sourceType: "host-entity-url"`.

```json
{
  "link": {
    "sourceType": "host-entity-url",
    "absolute": false
  }
}
```

`absolute` (optional, defaults to `true`) controls URL form: `false` emits a
relative path (`/node/123`), `true` emits a fully qualified URL
(`https://example.com/node/123`). Set `absolute: false` for in-page links; omit
or set `true` for canonical links, feeds, or anything consumed off-site.

## Entity field expression syntax

Expressions use special Unicode control characters as delimiters:

```
ℹ︎␜entity:{entityType}:{bundle}␝{fieldName}␞␟{property}
```

| Character | Name            | Purpose                 |
| --------- | --------------- | ----------------------- |
| `ℹ︎`       | info            | Expression start        |
| `␜`       | file separator  | Segment separator       |
| `␝`       | group separator | Entity/field boundary   |
| `␞`       | record sep.     | Field/property boundary |
| `␟`       | unit separator  | Property start          |

### Simple field expressions

For a single property from a field:

```
ℹ︎␜entity:node:article␝title␞␟value
ℹ︎␜entity:node:article␝body␞␟processed
```

### Image field expressions

For image fields that need multiple properties, use the multi-property syntax
with `↠` (rightwards arrow) mapping source properties:

```
ℹ︎␜entity:node:article␝field_image␞␟{src↠src_with_alternate_widths,alt↠alt,width↠width,height↠height}
```

The `{prop↠source,...}` syntax maps component prop keys to entity field
properties.

### Entity reference traversal

To traverse entity references (e.g., author's profile picture), chain entity
segments with `␜␜`:

```
ℹ︎␜entity:node:article␝uid␞␟entity␜␜entity:user␝user_picture␞␟{src↠src_with_alternate_widths,alt↠alt,width↠width,height↠height}
```

This follows: node → uid field → referenced user entity → user_picture field.

## Available prop sources

Prop sources describe which Drupal entity fields can be mapped to which
component props. When available, they are the authoritative reference for
building entity field mappings — always prefer them over manually constructing
expressions.

Prop sources are stored in `.agents/drupal-canvas/prop-sources.json`, organized
as `{entityType}` → `{bundle}` → `{js.component}` → `{propName}` → array of
source options. Each source option has:

- `label`: human-readable description of the field (e.g., `"Title"`, `"Image"`,
  `"Body"`)
- `source`: the prop value object to use directly in the content template —
  either `{ "sourceType": "entity-field", "expression": "..." }` or
  `{ "sourceType": "host-entity-url", "absolute": false }`

**How to use prop sources:**

1. **Determine available bundles:** the top-level keys are entity types, with
   bundles nested below (e.g., `node.article`, `node.page`)
2. **Choose components:** the second-level keys under each bundle (e.g.,
   `js.card`, `js.hero`) tell you which components have mappable props for that
   bundle
3. **Select prop sources:** for each component prop, review the array of
   available sources and pick the most appropriate one. Copy the `source` object
   directly into the content template's prop value — do not manually construct
   entity field expressions when a matching source exists
4. **Choose the best source by label:** when multiple sources are available for
   a prop, use the `label` to pick the semantically correct one (e.g., for a
   card's `heading` prop, choose `"Title"` over `"Alternative text"`)

When prop sources are not available, follow the freshness check in the workflow
section to refresh agents context. Fall back to manually constructing entity
field expressions only when no matching source exists.

## Available view modes

View modes define the valid entity type, bundle, and view mode combinations on
the connected Drupal site. Use them to determine which content templates can be
created and which ones already exist.

View modes are stored in `.agents/drupal-canvas/view-modes.json`, organized as
`{entityType}` → `{bundle}` → `{viewMode}` → label string (e.g.,
`"Full content"`, `"Teaser"`).

**How to use view modes:**

1. **Discover valid combinations:** only create content templates for entity
   type / bundle / view mode combinations that appear here
2. **Check existing coverage:** list the content templates directory to see
   which combinations already have a template — avoid creating duplicates
3. **Pick view modes:** when the user doesn't specify a view mode, show them the
   available options and which ones still need templates (based on local files),
   and ask them to confirm before proceeding

When view modes are not available, follow the freshness check in the workflow
section to refresh agents context. If still not available, ask the user which
view mode to target.

## Workflow

### Creating a new content template

1. **Ensure agents context is fresh:** check whether
   `.agents/drupal-canvas/prop-sources.json` and
   `.agents/drupal-canvas/view-modes.json` exist. If either file is missing or
   was last modified more than 1 hour ago, run `npx canvas agents-context` to
   refresh. If the files are under 1 hour old, skip the refresh
2. **Identify the entity mapping:** determine the entity type, bundle, and view
   mode for the template. Consult available view modes to confirm the
   combination is valid. If the user doesn't specify a view mode, show them the
   available options and ask them to confirm which view mode to use before
   proceeding
3. **Check for existing templates:** list the configured content templates
   directory to see what already exists — do not overwrite unless asked
4. **Check prop sources:** read available prop sources for the target bundle to
   discover which components have mappable props
5. **Choose components:** review available components in `src/components/` that
   will compose the layout. Use `component.yml` files to understand each
   component's props and slots. Cross-reference with available prop sources to
   confirm which props can be mapped to entity fields
6. **Choose element IDs:** use stable, descriptive IDs for each element
7. **Build the template:** write the JSON file following the format above
8. **Map entity fields:** use source objects from available prop sources when
   possible. Use static values for fixed content. Only manually construct entity
   field expressions when no matching source exists

```bash
# Check freshness of agents context files and refresh if missing or older than 1 hour.
# Use `date -r <file>` to check file modification time (works on macOS and Linux).
# If stale or missing:
npx canvas agents-context

# Check available view modes
cat .agents/drupal-canvas/view-modes.json

# Check existing templates (using configured contentTemplatesDir, default: content-templates/)
ls content-templates/

# Read prop sources for the target bundle (prefer jq when available)
jq '.node.article' .agents/drupal-canvas/prop-sources.json

# Check available components
ls src/components/

# Read a component's props to know what to map
cat src/components/hero/component.yml
```

### Modifying an existing content template

1. **Ensure agents context is fresh:** follow the same freshness check as the
   create workflow — refresh if files are missing or older than 1 hour, skip if
   under 1 hour old
2. **Read the existing template** to understand its current structure
3. **Preserve existing element IDs** for elements that aren't changing
4. **Choose descriptive IDs** for newly added elements
5. **Verify slot references** — all IDs in slots must exist in `elements`

## Validation

Validate every authored content template before finishing.

```bash
npx canvas validate
```

## User-facing communication

`.agents/drupal-canvas/*.json` files are internal agent context. Don't mention
them, their paths, or their contents in summaries, commit messages, or other
user-facing output — describe what was mapped, not where the mapping came from.
