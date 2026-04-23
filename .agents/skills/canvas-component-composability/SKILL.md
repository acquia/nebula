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

## Reuse existing components first

When the task names existing components or clearly implies composition, start by
trying to reuse those components instead of rebuilding them inline.

If a requested existing component's props do not fit the use case:

- Do not silently create a replacement that bypasses the existing component.
- Prefer one of these options: extend the existing component, add a thin
  wrapper/variant, or create a new purpose-specific component only when reuse is
  not reasonable.
- Surface the mismatch and tradeoff when it affects whether the request is still
  being followed.

## Reference map

Load references only as needed:

- Repeatable lists/grids and array-to-slot conversion:
  `references/repeatable-content.md`
- Slot interactivity in empty flex/grid containers:
  `references/repeatable-content.md` ("Slot container minimum size" section)

## Signs a component should be decomposed

Consider breaking up a component when it has:

- More than 6-8 props that serve distinct purposes
- Props for elements that make sense as standalone components (breadcrumbs,
  titles, metadata, navigation)
- Built-in layout assumptions that limit where the component can be used
- Multiple distinct visual sections that could be reused independently
- Repeated prop groups that differ only by an index or prefix/suffix
  (`item1Title`, `item2Title`, `item3Title`)

## Use slots for flexible composition

Slots are the primary mechanism for composability. Instead of passing complex
data through props, use slots to let parent components accept child components.
This matches how Canvas users build pages by placing components inside other
components.

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

### Declare slots in component.yml

Declare slots in `component.yml` and render them as named props in JSX.

For exact slot schema and constraints (map vs `[]`, slot keys, `children`
handling), follow `canvas-component-metadata` as the source of truth.

## Common decomposition patterns

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

## When not to decompose

Keep components together when:

- They always appear together and never make sense separately
- They share significant internal state that would be awkward to lift up
- The visual design tightly couples them (for example, overlapping elements,
  shared backgrounds)
- Decomposition would create components with only 1-2 props that are not useful
  elsewhere
