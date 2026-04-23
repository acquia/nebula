---
name: canvas-design-decomposition
description:
  Plans structure for a component library with props/slots and right-sized
  component granularity. Run before building or adding Canvas components (new
  `src/components/` folders, component.yml, React), or for plan-only /
  breakdown-only work, whenever UI must map to a coherent tree.
---

# Canvas design decomposition

## Mandatory triggers (load this skill first)

Load and follow **this** skill **before** proposing component structure for a
component library, writing implementation plans, or implementing
React—**including** when the user only asks for a **plan** or
**breakdown**—whenever you are modeling **how** UI should split into Canvas
components (a **component library**, **section**, or **full page**). The same
applies when you are about to **build, add, or scaffold components** (see
below). Treat any of the following as a trigger:

- **Building or adding Canvas components:** creating new folders under
  `src/components/`, authoring `component.yml` and `index.jsx` (or `.tsx`),
  **scaffolding** a component from a ticket or spec, **coding** a section from a
  design, or **implementing** a named block (hero, footer, card, and so on).
  Decompose **before** writing schema or React so names, slots, variants, and
  reuse stay aligned—unless the task is a trivial one-line tweak inside an
  existing, stable API.
- **Designing or evolving a component library** for Canvas—naming regions,
  deciding reuse, props/slots, and granularity—whether the stimulus is a file, a
  site, or a conversation.
- The message contains a **Figma URL** (`figma.com/design`, `figma.com/make`, or
  branch URLs) or explicit **node-id** / frame language tied to Figma.
- The source of truth is an **existing website**, **screenshot**, **scraped
  page**, or **reference URL** meant to drive layout or components (pair with
  [`nebula-scrape-url`](../nebula-scrape-url/SKILL.md) when a live URL needs
  capture).
- The source is **text-only or generative**: a written brief, markdown spec, or
  an **AI- / prompt-generated design** (layout description, wireframe in words,
  component list from a chat). Phase A still applies—classify intake and list
  unknowns even when pixels are absent.
- The user asks to **implement**, **build**, **match**, **recreate**, or **plan
  implementation** of a **design**, **frame**, **screen**, or **page** from any
  artifact or description.

Automated tool output (for example **Figma MCP reference JSX**, HTML export, or
generated code) is **input** to this workflow—not a substitute for completing
phases **A–G**.

Turn a design artifact into a **stable component model**: regions, tree, prop vs
slot decisions, and granularity checks. A breakdown is **incomplete** without
sketching **props and slots** for each node—Canvas authors interact with the
tree through that API, so plan it **with** structure, not after implementation.

During planning, **step past the single frame or ticket**: ask where else each
piece could appear and what would differ (copy, children, `variant`). Prefer
reusable `machineName`s, slots for variable regions, and presets via
**`variant`** over one-off names or props that hard-code one campaign’s content.

**Do not** implement pixels or write `component.yml` inside this workflow—finish
the structure and prop/slot sketch first, then hand off.

## Skill order

1. **This skill** — structure, props/slots, granularity.
2. [`canvas-component-metadata`](../canvas-component-metadata/SKILL.md) — exact
   `component.yml` schema.
3. [`canvas-component-composability`](../canvas-component-composability/SKILL.md)
   — slot patterns, repeatable content, reuse.
4. [`canvas-component-definition`](../canvas-component-definition/SKILL.md) —
   folder contract, mocks, naming authority.
5. [`implement-design`](../implement-design/SKILL.md) — pixel-level fidelity
   **when the source is Figma** and after the tree is locked (requires Figma MCP
   when used). For non-Figma sources, implement from the locked tree and tokens
   without this step unless the user points back to a Figma file.

For repeatable lists/grids in Canvas, see
[`canvas-component-composability/references/repeatable-content.md`](../canvas-component-composability/references/repeatable-content.md).

## Inputs

Classify the source in Phase A. Typical categories:

| Kind                  | Examples                                                        |
| --------------------- | --------------------------------------------------------------- |
| **Design tool**       | Figma file, frame export, FigJam                                |
| **Live reference**    | Existing production or staging site, competitor URL             |
| **Captured media**    | Screenshots, PDFs, brand decks                                  |
| **Structured scrape** | HTML/CSS snapshot via tooling                                   |
| **Prompt / prose**    | User brief, AI-generated layout description, markdown wireframe |

Optional helpers:

- URL capture: [`nebula-scrape-url`](../nebula-scrape-url/SKILL.md) (not for
  Figma or docs).
- Figma fidelity pass (after decomposition):
  [`implement-design`](../implement-design/SKILL.md).

## Workflow (mandatory)

Complete phases **A → G** in order. Each phase has an **exit criterion**. If
Phase F fails, fix the tree and re-run Phase E for affected nodes only.

### Phase A — Intake and framing

- Identify input type: design file (e.g. Figma), live site / scrape, screenshot,
  or text-only / prompt-generated spec.
- List **unknowns**: breakpoints, empty states, max copy length, media aspect
  ratios, hover/focus/active, accessibility expectations.
- Tag each unknown with **risk**: low / medium / high (edits likely to churn
  structure).

**Exit:** Input type stated; unknowns listed with risk (workflow continues even
if some answers are missing).

### Phase B — Region map

- Divide the design into **regions** (e.g. header, hero, content band, sidebar,
  footer, modal chrome).
- For each region: **label**, **purpose** (one line), **class** — `chrome`
  (shell), `navigation`, or `content`.

**Exit:** Ordered region list with purpose and class for each.

### Phase C — Candidate component inventory

- Map regions to **candidate** `machineName` values (kebab-case folder names per
  [`canvas-component-definition`](../canvas-component-definition/SKILL.md)).
- Prefer reusable base names; variants via props/composition, not extra
  component names, unless truly one-off.
- Mark **reuse count** when the same pattern appears two or more times.
- **Generalize:** For each candidate, note **other plausible contexts** (other
  pages, shorter copy, different children). If it only makes sense for this one
  screen, rename or decompose until it is **reusably** scoped.

**Exit:** Table: candidate `machineName`, responsibility, reuse count, parent
region.

### Phase D — Component tree

- Build parent/child relationships: **layout shells** vs **content leaves**.
- **Layout ownership:** multi-column grids, page-level stacks, and section
  wrappers belong in layout-oriented components; avoid baking unrelated grids
  into content components unless the layout is invariant for every instance.
- Express the tree as a nested outline or Mermaid diagram (Mermaid node IDs: no
  spaces; use camelCase or underscores).

**Exit:** Tree covers every inventory row; layout vs content roles are explicit.

### Phase E — Props vs slots (per node)

**Required:** Every decomposition includes this phase. Props and slots are not a
late add-on—they define how editors use the tree. For **each** tree node,
sketch:

- **Props:** configuration and simple values editors should set directly
  (variants, booleans, short strings, URLs, enums). Note intent and broad type
  class (`string`, `boolean`, `enum`, image/reference)—not final YAML.
  **Order:** If the component uses **one primary `variant`** enum (the standard
  name for the layout/visual preset), list **`variant` first** in the sketch and
  keep the same order in `component.yml`. **Otherwise** (granular styling only,
  several independent preset enums with no clear primary `variant`, or no preset
  enum), put **content** props first—headline, body, labels, links, media
  refs—then **configuration** (density, alignment, toggles, theme). See
  [references/props-vs-slots-rubric.md](references/props-vs-slots-rubric.md#prop-order-in-forms-and-metadata).
- **Slots:** areas where authors compose child components or arbitrary blocks.
  Name the slot, describe allowed content, and note **empty** behavior
  (collapse, placeholder, min height).

**Variant-first vs granular props:** Visual differences often map to one of two
modeling styles:

1. **Variants (preferred by default):** A **`variant`** enum prop names
   **cohesive presets** (combined spacing, alignment, media placement, chrome).
   Use **`variant`** as the prop ID for every primary preset field—do not use
   `appearance`, `layout`, `layoutVariant`, or other synonyms for the same role.
   Optional **orthogonal** enums (`size`, `density`, …) are separate props only
   when axes are truly independent. Editors pick values; implementation maps
   them to class sets (for example CVA). See
   [`canvas-component-metadata`](../canvas-component-metadata/SKILL.md) for enum
   authoring.
2. **Granular props:** Separate props per axis (`showMedia`, `mediaPosition`,
   `density`, `align`) so authors **mix** combinations. Use when axes are truly
   independent, when analytics or CMS rules require toggling one field at a
   time, or when the **user explicitly prefers** granular control.

**Default:** choose **variants** unless the user states a preference for
granular props or independent axes clearly win. Record the choice in the handoff
(see template). Detail:
[references/props-vs-slots-rubric.md](references/props-vs-slots-rubric.md#variants-vs-granular-props).

**Canvas rule of thumb:** complex repeatable structures belong in **slots** and
child components, not array-of-object props. Authoritative schema:
[`canvas-component-metadata`](../canvas-component-metadata/SKILL.md).

**Exit:** Every node has a prop/slot sketch; repeatable rich children are not
modeled as object arrays in props.

### Phase F — Granularity audit

Run the checklist below. For detail, see
[references/granularity.md](references/granularity.md).

**Too coarse**

- One node owns many unrelated concerns.
- Props stand in for what should be separate components or slots.
- A single component couples layout shell to multiple independent content blocks
  that could vary separately.

**Too fine**

- Leaves that only wrap static copy with **no** reuse.
- Slots that always accept a single fixed child type with no authoring benefit
  (consider merging or converting to props).

**Soft signal:** many distinct prop purposes or more than ~6–8 props can mean
split or slot extraction is needed—justify with reuse and editor experience, not
the number alone
([`canvas-component-composability`](../canvas-component-composability/SKILL.md)).

**Rework:** If any node fails, merge, split, or extract, then repeat Phase E for
changed nodes.

**Exit:** All nodes pass or failures are documented with explicit rationale.

### Phase G — Handoff

Deliver one Markdown artifact using the template below. Point **next steps** to:

- Schema: [`canvas-component-metadata`](../canvas-component-metadata/SKILL.md)
- Composition edge cases:
  [`canvas-component-composability`](../canvas-component-composability/SKILL.md)
- Contract and mocks:
  [`canvas-component-definition`](../canvas-component-definition/SKILL.md)
- Visual fidelity from Figma: [`implement-design`](../implement-design/SKILL.md)
  (when applicable)

**Exit:** Filled template ready to paste into an issue or MR.

**Out of scope here:** page JSON
([`canvas-page-definition`](../canvas-page-definition/SKILL.md)), validation
runs ([`nebula-component-validation`](../nebula-component-validation/SKILL.md)).

## Output template

Copy and fill:

```markdown
## Summary

- **Design source:** (e.g. Figma URL | live URL | screenshots | prompt/spec
  text)
- **Scope:** (single component | section | full page)
- **Version / date:**

## Assumptions and open questions

- ...

## Region map

| Region | Purpose | Class |
| ------ | ------- | ----- |
| ...    | ...     | ...   |

## Component inventory

| machineName (candidate) | Responsibility | Reuse | Parent region | Notes |
| ----------------------- | -------------- | ----- | ------------- | ----- |
| ...                     | ...            | ...   | ...           | ...   |

## Component tree

(Nested list or Mermaid)

## API sketch (per component)

### `machine-name`

**Implementation style:** variants (default) | granular props — one-line
rationale

**Props** (table rows in editor order: **variant first** when there is a single
primary variation enum; **content first** otherwise—then configuration)

| Name (camelCase intent) | Purpose | Required? | Kind (string / bool / enum / …) |
| ----------------------- | ------- | --------- | ------------------------------- |
| ...                     | ...     | ...       | ...                             |

**Slots**

| Slot key | Purpose | Empty behavior |
| -------- | ------- | -------------- |
| ...      | ...     | ...            |

## Granularity audit

| Component / node | Pass/Fail | Notes / fix |
| ---------------- | --------- | ----------- |
| ...              | ...       | ...         |

## Next steps

- [ ] `canvas-component-metadata` — draft `component.yml`
- [ ] `canvas-component-definition` — folder, `index.jsx`, mocks
- [ ] `canvas-component-composability` — repeatable slots if needed
- [ ] `implement-design` — Figma fidelity pass (only when matching a Figma file)
```

## Further reading

- [references/granularity.md](references/granularity.md)
- [references/props-vs-slots-rubric.md](references/props-vs-slots-rubric.md)
- [references/worked-example.md](references/worked-example.md)

## Anti-duplication

- Do not restate full `component.yml` grammar—use
  [`canvas-component-metadata`](../canvas-component-metadata/SKILL.md).
- Do not duplicate composability tables wholesale—summarize and link
  [`canvas-component-composability`](../canvas-component-composability/SKILL.md).
