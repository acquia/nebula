# Granularity (depth and splits)

Use after an initial tree and prop/slot sketch exist. Goal: **editors can reason
about each component**, and **instances reuse** without copy-paste props.

## When to extract a child component

Extract (or add a slot for) a child when **any** of these hold:

- The block appears **twice or more** with the same role (card, stat, nav item,
  testimonial).
- The block has a **clear name** and could appear elsewhere on the site.
- Authors might **reorder, omit, or swap** that block independently of its
  siblings.
- The block mixes **interaction** (menus, carousels) with static siblings in a
  way that muddies the parent’s story.

Typical extractions: `Meta` (date, tags), `Actions` (buttons row), `Media`
(figure/video), `Nav` (local tabs), **item** components for grids/lists.

## When to keep content inside the parent

Keep merged when **all** of these hold:

- The pieces **always** appear together in every design variant.
- They share **tight visual coupling** (shared background, overlap, masking)
  that would fight separate placement in Canvas.
- Splitting would yield **1–2 trivial props** and **no reuse** elsewhere.
- Lifting would force **awkward shared state** across siblings.

## Canvas editing lens

- If authors must **drop arbitrary blocks** into an area → **slot**, not a prop
  that encodes component type lists.
- If copy is **fixed marketing text** with no composition → **string props** are
  appropriate.
- If the only “composition” is **one** optional rich block that never varies in
  type → consider **keeping it internal** or a **single slot**—not five
  micro-slots.

## Coarse signals (split or slot)

- Many **granular** toggles that really describe **named presets** from design—
  consider collapsing into **variant** enums
  ([`props-vs-slots-rubric.md`](props-vs-slots-rubric.md#variants-vs-granular-props);
  prefer variants unless the user wants granular control).
- One `machineName` owns **unrelated** concerns (hero title + footer legal).
- A growing prop list where each prop maps to a **visually separate** block.
- **Layout +** multiple **independent** content columns that could change order.
- Props that encode **which** child components exist (`showX`, `showY` chains)
  where Canvas authors would rather place children.

## Fine signals (merge or convert)

- Components that only wrap a **single heading** or static paragraph with no
  second instance planned.
- Slots that **always** receive one specific child type and **never** vary—merge
  into parent or replace with props if the structure is fixed.
- “Wrapper” components whose sole job is CSS on **one** element—prefer parent
  layout or utility classes unless reuse demands the wrapper.

## Anti-patterns

- **Slot per div:** every flex child becomes a slot—authors gain noise, not
  control. Group by **meaningful** composition boundaries.
- **Prop drilling toggles:** many booleans for independent blocks—often a sign
  the blocks should be **separate children** or **slots**.
- **God layout:** one component hard-codes the whole page grid—prefer layout
  components and nested regions
  ([`canvas-component-composability`](../../canvas-component-composability/SKILL.md)).

## Rework loop

1. Mark each failing node **coarse** or **fine**.
2. **Coarse:** split responsibility, introduce slots for variable regions, or
   extract repeated items per
   [`repeatable-content.md`](../../canvas-component-composability/references/repeatable-content.md).
3. **Fine:** merge nodes, collapse slots, or move fixed structure inside the
   parent implementation.
4. Re-sketch **Phase E** props/slots only for touched nodes.
5. Re-audit until pass or document **exceptions** (why the usual rule does not
   apply).

## Vocabulary (optional)

Terms like atom / molecule / organism can describe **scale**, not a mandate.
Prefer **reuse**, **editor control**, and **Canvas constraints** over strict
atomic-design tiers.
