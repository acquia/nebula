# Props vs slots rubric (Canvas)

Authoritative YAML and slot schema:
[`canvas-component-metadata`](../../canvas-component-metadata/SKILL.md). This
file is a **design-time** rubric before writing `component.yml`.

## Quick table

| Use **props** for                        | Use **slots** for                                |
| ---------------------------------------- | ------------------------------------------------ |
| Single required values (label, URL)      | Variable number of child components              |
| Configuration (variant, size, alignment) | Authors compose regions from existing components |
| Simple data (booleans, short strings)    | Nested structures that belong in the page tree   |
| Values consistent across many instances  | Content that changes per page or placement       |
| Enums mapped to CVA / visual variants    | Repeatable rich items (cards, slides, rows)      |

Source table aligned with
[`canvas-component-composability`](../../canvas-component-composability/SKILL.md).

## Variants vs granular props

Two ways to encode **visual and layout differences** in `component.yml` and
React. Pick one primary style per component (sometimes a hybrid: one `variant`
plus one or two independent toggles).

### Variants (preferred unless the user says otherwise)

- **What:** A **`variant`** enum prop selects **named presets** (`default`,
  `mediaStart`, `solid`, `compact`, …). Each value implies a **bundle** of
  styles and structure rules. **Standardize on the prop ID `variant`** for the
  primary preset; add other enum props only for axes that are orthogonal to that
  preset.
- **Why default:** Fewer invalid combinations, simpler Canvas forms, easier
  design-system alignment (Figma variants often map 1:1).
- **Implementation:** Map enums to `class-variance-authority` (or equivalent)
  and tokenized classes; define allowed values in
  [`canvas-component-metadata`](../../canvas-component-metadata/SKILL.md).

### Granular props

- **What:** Multiple props—often booleans, enums, or strings—each controlling
  **one** axis (`showEyebrow`, `imageAlignment`, `density`).
- **When:** Axes are **independently** valid in many combinations; content
  strategists must flip one switch without changing others; or the **user
  explicitly requests** granular control over variant-style presets.

### Choosing

| Situation                                                              | Favor                    |
| ---------------------------------------------------------------------- | ------------------------ |
| Mutually exclusive layouts from design (A **or** B, not mix-and-match) | **Variants**             |
| Design documents named presets / Figma component variants              | **Variants**             |
| Many combinations are invalid or untested                              | **Variants**             |
| Product needs arbitrary mixing of orthogonal toggles                   | **Granular** (or hybrid) |
| User asks for “separate controls for …”                                | **Granular**             |

**Hybrid:** A `variant` for overall preset plus **one** independent prop (for
example `inverted`) is fine when the extra axis is truly orthogonal—avoid
drifting into many independent knobs without a preset story.

Document the choice in the decomposition handoff so implementers align
[`canvas-component-metadata`](../../canvas-component-metadata/SKILL.md) with the
same model.

## Prop order in forms and metadata

Canvas editors read `component.yml` prop order. Match decomposition tables and
final metadata so authors see fields in a sensible flow.

### Single primary variation

When the component is centered on **one** enum that picks the overall preset,
that prop **must** be named **`variant`** (the main “mode” of the block):

1. List **`variant` first** in handoffs and as the **first** key under
   `props.properties` in `component.yml` when the editor follows key order.
2. Then **content** (copy, CTAs, image URLs).
3. Then **other configuration** (secondary toggles, theme helpers) if any.

Hybrid with one primary `variant` plus an orthogonal toggle: still treat as
**single primary variation**—put `variant` first, then content, then the extra
toggle(s).

### Otherwise: content first

When there is **no** `variant` preset enum, or **multiple** independent preset
enums without one clear primary **`variant`**, or the model is **granular props
only**:

1. Put **content** props first (what authors edit most: titles, descriptions,
   links, media).
2. Put **configuration** after (style, layout axes, booleans, secondary enums).

This keeps the default author path focused on message and assets, not chrome.

## Canvas-specific constraints

- **No array-of-object props** for repeatable rich items. Model **parent slot +
  child component** instead. Pattern and examples:
  [`repeatable-content.md`](../../canvas-component-composability/references/repeatable-content.md).
- **Props in `component.yml`** are editor-facing. Do not expose internal
  implementation-only values as Canvas props.
- **Required props:** no silent JSX defaults; metadata and editor must supply
  values
  ([`canvas-component-metadata`](../../canvas-component-metadata/SKILL.md)).
- **Prop IDs** must be camelCase aligned with `title`—finalize at metadata time,
  not during rough sketches.

## Worked heuristics by UI block

**Hero**

- **Props:** with a **single** `variant` preset, order **variant** first, then
  headline, subcopy, optional eyebrow, primary CTA label + URL, theme tokens;
  with **granular** styling only, put copy and CTA fields before layout toggles.
- **Slot:** main media or custom body when authors swap **entire** blocks (e.g.
  form vs image vs video), or a **below-the-fold** region for optional modules.

**Card grid**

- **Props:** a single **`variant`** for grid density/background → **`variant`
  first**; else section title and lead copy **first**, then column count,
  background, and other configuration.
- **Slot:** **items**—each cell is a `card` (or similar) instance. See pairing
  examples in
  [`repeatable-content.md`](../../canvas-component-composability/references/repeatable-content.md).

**Tabs / local nav**

- **Props:** optional **`variant`** for chrome preset; default tab index if
  truly fixed (after content-order rules if there is no `variant`).
- **Slots or children:** tab panels are often **separate composed regions**;
  avoid encoding every panel’s body as giant string props.

**Footer**

- **Props:** legal line; optional **`variant`** for footer style / social row
  treatment when presets apply.
- **Slots:** link groups or columns—each group may itself be a component with
  its own slots for links.

## When a prop pretends to be a slot

Red flags:

- JSON-in-a-string or serialized “blocks” in a prop.
- Arrays of objects describing child UI—**replace** with slot + child
  components.

## When a slot pretends to be a prop

Red flags:

- A slot that always receives **one** component type with **fixed** props—ask
  whether the parent should **own** that markup or accept a narrow prop instead.

## Cross-links

- Decomposition workflow: [`../SKILL.md`](../SKILL.md)
- Granularity tuning: [`granularity.md`](granularity.md)
