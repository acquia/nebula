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

Aligned with
[`canvas-component-composability`](../../canvas-component-composability/SKILL.md).

## Variants vs granular props

Two ways to encode **visual and layout differences** in `component.yml` and
React. Pick one primary style per component (sometimes hybrid: one `variant`
plus one or two orthogonal toggles).

### Variants (preferred unless the user says otherwise)

- **What:** A **`variant`** enum selects **named presets**. Each value implies a
  bundle of styles and structure rules. Use the prop ID **`variant`** for the
  primary preset; add other enums only for axes orthogonal to that preset.
- **Why:** Fewer invalid combinations, simpler Canvas forms, easier alignment
  with design-system / Figma variants.
- **Implementation:** Map enums to CVA (or equivalent) and tokens; define
  allowed values in
  [`canvas-component-metadata`](../../canvas-component-metadata/SKILL.md).

### Granular props

- **What:** Multiple props—booleans, enums, strings—each controlling **one**
  axis.
- **When:** Axes are independently valid in many combinations, or the user
  explicitly wants separate controls instead of named presets.

### Choosing

| Situation                                                  | Favor                    |
| ---------------------------------------------------------- | ------------------------ |
| Mutually exclusive layouts (A **or** B, not mix-and-match) | **Variants**             |
| Design uses named presets / Figma variants                 | **Variants**             |
| Many combinations would be invalid or untested             | **Variants**             |
| Product needs arbitrary mixing of orthogonal toggles       | **Granular** (or hybrid) |
| User asks for separate controls per axis                   | **Granular**             |

**Hybrid:** `variant` plus **one** orthogonal prop is fine; avoid many
independent knobs without a preset story.

Document the choice in the decomposition handoff so implementers align
[`canvas-component-metadata`](../../canvas-component-metadata/SKILL.md).

## Prop order in forms and metadata

Canvas editors follow `component.yml` prop order. Match decomposition and
metadata so authors see a sensible flow.

### Single primary variation

When **one** enum is the main preset, that prop **must** be **`variant`**:

1. **`variant` first** in handoffs and as the **first** key under
   `props.properties` when the editor follows key order.
2. Then **content** (copy, CTAs, media).
3. Then **other configuration** (secondary toggles, theme helpers).

If there is no single `variant` but the model is otherwise preset-oriented,
still put the dominant preset enum first when it exists.

### Otherwise: content first

When there is **no** primary `variant`, or the model is **granular only**:

1. **Content** props first (titles, descriptions, links, media).
2. **Configuration** after (style, layout, booleans, secondary enums).

## Canvas-specific constraints

- **No array-of-object props** for repeatable rich items—use **parent slot +
  child component**. See
  [`repeatable-content.md`](../../canvas-component-composability/references/repeatable-content.md).
- **Props** are editor-facing; do not expose implementation-only values.
- **Required props:** no silent JSX defaults—metadata and editor must supply
  values
  ([`canvas-component-metadata`](../../canvas-component-metadata/SKILL.md)).
- **Prop IDs** camelCase-aligned with `title`—finalize at metadata time.

## Applying the rubric to blocks

Use the **quick table** above and **repeatable-content** patterns: presets and
copy as **props**; grids of cards, tab panels, footer columns, or swappable
regions as **slots** (or nested components with their own slots). Do not encode
large composed regions as string props or JSON blobs.

## When a prop pretends to be a slot

- JSON-in-a-string or serialized “blocks” in a prop.
- Arrays of objects for child UI—**replace** with slot + child components.

## When a slot pretends to be a prop

- A slot that **always** holds one component type with **fixed** props—consider
  whether the parent should **own** that markup or use a narrow prop instead.

## Cross-links

- Decomposition workflow: [`../SKILL.md`](../SKILL.md)
- Granularity tuning: [`granularity.md`](granularity.md)
