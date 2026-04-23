---
name: canvas-component-composability
description:
  Design Canvas-ready React components with slots and decomposition-first
  patterns. Use when (1) Designing a component's prop/slot structure, (2) A
  component is growing too large, (3) Deciding between props vs slots, (4)
  Refactoring monolithic components, (5) Modeling repeatable list/grid content,
  (6) Reusing, composing, or wrapping existing workspace components. Ensures
  Canvas compatibility.
---

Prefer small, focused components over monolithic ones with many props. When a
component starts accumulating many unrelated props, decompose it into smaller,
composable pieces.

For repeatable card/list/grid UI, default to two Canvas components: a parent
layout component with a slot for the repeated children, and a child component
for one item. Do not flatten repeated items into numbered prop groups such as
`car1Name`, `car2Name`, `feature1Title`, or `card3Image`.

## Ownership

This skill owns the reusable modeling rules for:

- props vs slots
- variants vs granular props
- repeatable-content patterns
- granularity checks (split, merge, slot extraction)

For the canonical reuse-first policy, follow
[`canvas-component-definition`](../canvas-component-definition/SKILL.md). For
exact `component.yml` grammar and slot schema, follow
[`canvas-component-metadata`](../canvas-component-metadata/SKILL.md).

## Reuse with existing components

When the task names existing components or clearly implies composition, start
with the reuse check in
[`canvas-component-definition`](../canvas-component-definition/SKILL.md#reuse-check-before-creation)
before creating a new component. This skill focuses on how components compose
once that boundary is clear.

## Reference map

Load references only as needed:

- Repeatable lists/grids and array-to-slot conversion:
  `references/repeatable-content.md`
- Slot interactivity in empty flex/grid containers:
  `references/repeatable-content.md` ("Slot container minimum size" section)

## Props vs slots

Slots are the primary mechanism for composability. Instead of passing complex
data through props, use slots to let parent components accept child components.
This matches how Canvas users build pages by placing components inside other
components. This is the design-time rubric to use before writing
`component.yml`.

### When to use slots vs props

| Use slots for                         | Use props for                       |
| ------------------------------------- | ----------------------------------- |
| Variable number of child components   | Single, required values (text, URL) |
| Content that users should compose     | Configuration options (size, color) |
| Complex nested structures             | Simple data (strings, booleans)     |
| Content that varies between instances | Content consistent across instances |

Treat a single image as one prop, not as a slot and not as multiple URL/alt
props. If a component needs one image, use a semantic image prop such as `image`
or `backgroundImage` with the Canvas image schema ref.

For repeatable cards/items, the parent usually owns layout props such as
heading, intro text, alignment, or column count, while each child owns item
content props such as title, image, price, label, CTA, or metadata.

Repeatable rich items should use the parent-slot-plus-child-component pattern,
not array-of-object props. See `references/repeatable-content.md`.

Apply the rubric to blocks this way: presets and simple copy stay in props;
grids of cards, tab panels, footer columns, or swappable regions belong in slots
or nested child components with their own slots. Do not encode large composed
regions as string props or JSON blobs.

### Variants vs granular props

Use one primary modeling style per component. Sometimes a hybrid is valid: one
`variant` plus one or two orthogonal toggles.

**Variants** are the default:

- A primary `variant` enum selects named presets whose values imply a bundle of
  styles and structure rules.
- Use a primary `variant` enum when the design has named presets or when many
  arbitrary combinations would be invalid.
- Keep `variant` as the prop ID for the main preset field instead of synonyms
  like `appearance` or `layoutVariant`.
- Add orthogonal enums such as `size` or `density` only when those axes are
  independently meaningful.
- Variants usually produce fewer invalid combinations, simpler Canvas forms, and
  easier alignment with design-system or Figma variants.
- Map enum values to CVA or equivalent implementation branches and theme tokens.

**Granular props** are appropriate when:

- the user explicitly wants separate controls per axis
- the axes are independently valid in many combinations
- product rules or analytics require individual toggles

Hybrid modeling is acceptable, but avoid a large pile of independent knobs when
the design really describes a small set of named presets.

### Choosing

| Situation                                                  | Favor                    |
| ---------------------------------------------------------- | ------------------------ |
| Mutually exclusive layouts (A **or** B, not mix-and-match) | **Variants**             |
| Design uses named presets or Figma variants                | **Variants**             |
| Many combinations would be invalid or untested             | **Variants**             |
| Product needs arbitrary mixing of orthogonal toggles       | **Granular** (or hybrid) |
| User asks for separate controls per axis                   | **Granular**             |

Document the choice in the decomposition handoff so implementation and
`component.yml` stay aligned.

### Prop order in handoffs and metadata

Match the decomposition handoff and `component.yml` order so Canvas editors see
a sensible form flow.

- If there is one primary preset enum, name it `variant` and list it first.
- Then list content props (copy, links, media).
- Then list remaining configuration props (secondary toggles, style helpers).

When there is no primary `variant`, list content props first and configuration
after.

If there is no single `variant` but the model is otherwise preset-oriented,
still put the dominant preset enum first when it exists.

### Canvas-specific constraints

- No array-of-object props for repeatable rich items. Use a parent slot plus
  child component instead.
- Props are editor-facing. Do not expose implementation-only values.
- Required props should not rely on silent JSX defaults. Metadata and the editor
  should supply those values explicitly.
- Keep prop IDs camelCase-aligned with their labels and finalize exact shape in
  `canvas-component-metadata`.

### When a prop pretends to be a slot

- JSON-in-a-string or serialized blocks in a prop
- arrays of objects for child UI

Replace these with slot-plus-child-component composition.

### When a slot pretends to be a prop

- A slot that always holds one component type with fixed props

In those cases, consider whether the parent should own that markup or use a
narrow prop instead.

### Declare slots in component.yml

Declare slots in `component.yml` and render them as named props in JSX.

For exact slot schema and constraints (map vs `[]`, slot keys, `children`
handling), follow `canvas-component-metadata` as the source of truth.

## Granularity checks

Use these heuristics when auditing whether a component boundary is too coarse or
too fine. Use them after an initial tree and prop/slot sketch exist. The goal is
that editors can reason about each component and instances can reuse without
copy-paste props.

### Signs a component should be decomposed

Consider breaking up a component when it has:

- Many granular toggles that really describe a small set of named presets
  instead of independent choices. Prefer variants unless the user wants granular
  control.
- One `machineName` owning unrelated concerns
- More than 6-8 props that serve distinct purposes
- Props for elements that make sense as standalone components (breadcrumbs,
  titles, metadata, navigation)
- A growing prop list where each prop maps to a visually separate block
- Built-in layout assumptions that limit where the component can be used
- Multiple distinct visual sections that could be reused independently
- Repeated prop groups that differ only by an index or prefix/suffix
  (`item1Title`, `item2Title`, `item3Title`)
- Layout plus multiple independent content columns that could change order
- A parent that mixes layout shell with multiple independent content blocks
- `showX`/`showY` chains that encode which children exist instead of letting
  authors place children directly

### Common decomposition patterns

### Page-level elements should be separate components

Elements that appear on many pages but are not always needed together should be
separate components.

### Extract repeated patterns into small components

When the same combination of elements is repeated, extract it:

- Date + category/tag -> `article-meta`
- Cover image + download button -> `resource-cover`
- Label + value pairs -> `metadata-item`
- Icon + text link -> `icon-link`
- Grid/list wrapper + repeated card -> `card-grid` + `card`
- Featured cars wrapper + repeated car card -> `featured-cars-grid` + `car-card`

### Use layout components instead of built-in layouts

Do not bake two-column or grid layouts into content components. Use layout
components and compose content into them.

### When to extract a child component

Extract a child component, or add a slot, when any of these are true:

- The block appears twice or more with the same role
- The block has a clear name and could appear elsewhere on the site
- Authors might reorder, omit, or swap that block independently
- The block mixes interaction with static siblings in a way that muddies the
  parent story

Typical extractions: `Meta`, `Actions`, `Media`, `Nav`, and item components for
lists or grids.

### Canvas editing lens

- If authors must drop arbitrary blocks into an area, use a slot rather than a
  prop that encodes component type lists.
- If copy is fixed marketing text with no composition need, string props are
  appropriate.
- If the only composition is one optional rich block that never varies in type,
  consider keeping it internal or using a single slot rather than many
  micro-slots.

## When not to decompose

Keep components together when:

- They always appear together in every design variant and never make sense
  separately
- They share significant internal state that would be awkward to lift up
- The visual design tightly couples them (for example, overlapping elements,
  shared backgrounds, masking)
- Decomposition would create components with only 1-2 props that are not useful
  elsewhere

### Fine signals (merge or convert)

- Components that only wrap a single heading or static paragraph with no second
  instance planned
- Slots that always receive one specific child type and never vary. Merge into
  the parent or replace with props if the structure is fixed.
- Wrapper components whose sole job is CSS on one element. Prefer parent layout
  or utility classes unless reuse clearly demands that wrapper.

### Anti-patterns

- Slot per `div`: every flex child becomes a slot without giving authors real
  control. Group by meaningful composition boundaries.
- Prop drilling toggles: many booleans for independent blocks that should be
  separate children or slots
- God layout: one component hard-codes the whole page grid. Prefer layout
  components and nested regions instead of one monolithic page shell.

### Rework loop

1. Mark each failing node as coarse, fine, or an authoring mismatch.
2. For coarse nodes, split responsibility, introduce slots for variable regions,
   or extract repeated items.
3. For fine nodes, merge nodes, collapse slots, or move fixed structure inside
   the parent implementation.
4. Re-sketch props and slots only for the nodes whose boundary changed.
5. Re-audit until pass or document exceptions, including why the usual rule does
   not apply.

### Vocabulary (optional)

Terms like atom, molecule, and organism can describe scale, not a mandate.
Prefer reuse, editor control, and Canvas constraints over strict atomic-design
tiers.
