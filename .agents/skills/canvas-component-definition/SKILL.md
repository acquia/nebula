---
name: canvas-component-definition
description:
  Start here for any React component task to enforce the canonical Canvas
  component contract. Use for create, modify, refactor, review, migrate, or
  validate work. Establishes the canonical Canvas component contract, assuming
  repository components are Canvas targets, and guides either (1) transforming
  existing components to meet Canvas requirements or (2) creating new
  Canvas-ready components.
---

## Canonical definition

A Canvas component is a package of:

1. A React implementation (`index.jsx`)
2. Canvas metadata/schema (`component.yml`)
3. Naming and structure compatibility (`machineName`, folder path, Workbench
   mock path)
4. Canvas-compatible props/slots modeling
5. Workbench mock coverage for authored preview states

The first four parts are required for the component to be usable in Drupal
Canvas. Workbench mocks are the supported way to author named preview states
beyond Workbench's built-in `Default` tab.

## Minimum contract (MUST)

Every Canvas component MUST satisfy all checks below:

- Component folder exists at `<components-root>/<machine-name>/` (use the
  repository's configured components root, which may be defined in `.env`)
- React implementation exists at `<components-root>/<machine-name>/index.jsx`
- Metadata exists at `<components-root>/<machine-name>/component.yml`
- `component.yml` includes required top-level keys (`name`, `machineName`,
  `status`, `required`, `props`, `slots`)
- Folder name exactly matches `machineName` in `component.yml` (kebab-case)
- Props/slots follow Canvas rules (for example, avoid unsupported
  array-of-object prop shapes; use slots for repeatable complex content)
- Repeatable cards/items are not flattened into numbered prop groups such as
  `card1Title`, `card2Title`, or `car3Image`; model them as parent slot content
  plus a child item component instead
- Any prop that represents an image uses a single object prop with
  `$ref: json-schema-definitions://canvas.module/image`; do not split one image
  into `imageUrl`, `imageAlt`, `imageWidth`, or similar string/number props

If any item is missing, the component is incomplete for Canvas usage.

For local authoring and review, add a matching Workbench mock file beside the
component source and metadata:

- Use `mocks.json` beside `index.jsx` and `component.yml`
- Author at least one named mock whenever the component needs a preview beyond
  the auto-generated `Default` tab, which renders the component using the first
  example value for each prop from `component.yml`

Rendered-output changes are incomplete unless the component has sufficient
Workbench preview coverage.

## Naming guidance

This codebase is already specific to one project or product, so component names
do **not** need (and must not use) a project or product prefix. Keep
`machineName`, folder names, and display names generic and portable (e.g.
`hero`, `contact-form`), not `acme-hero` or `nebula-contact-form`.

Default to the shortest reusable base name. Requests like "simple hero", "solid
hero", "cream hero", or "two cards" should still usually result in `Hero` or
`Card`, with differences expressed through props, variants, composition, or mock
names, not the component name itself. Use a specialized name only when the
component is truly one-off.

Use `references/naming.md` for naming rules and examples.

## Reuse check before creation

Before creating a new component, check whether existing workspace components can
satisfy the request, especially when the user names specific components to
reuse, compose, or wrap.

This is the canonical reuse-first policy. Other skills should link here instead
of restating the same decision tree.

- Reuse existing components when they already fit or can fit with a reasonable
  extension, variant, or thin wrapper.
- Do not silently create a replacement that bypasses the existing component.
- Do not silently replace a named existing component with a new implementation.
- If an existing component does not fit, explain the mismatch and choose
  deliberately between extending it, wrapping it, or creating a new
  purpose-specific component.
- Surface the mismatch and tradeoff when it affects whether the request is still
  being followed.

## Workbench mocks

Use `references/component-mocks.md` for mock naming, placement, format
selection, and validation.

## Skill coordination

Evaluate using companion skills in this order.

0. `canvas-design-decomposition`
   - Use **before** structuring work when you need to **break down** a design
     (Figma frame, screenshot, scraped page, or verbal spec) into regions, a
     component tree, and intentional props vs slots. This skill produces the
     plan; **this** skill (`canvas-component-definition`) enforces the resulting
     folder contract and implementation. Skip step 0 when you are only editing
     an existing component whose boundaries are already known.
1. `canvas-component-metadata`
   - Use when creating/changing `component.yml`, props/slots, enums, or fixing
     prop validation errors.
2. `canvas-component-composability`
   - Use when designing prop/slot structure, decomposing large components,
     deciding props vs slots, reusing/composing/wrapping existing components, or
     modeling repeatable list/grid content.
3. `canvas-styling-conventions`
   - Use for all styling work: new components, style props, Tailwind token
     usage, CVA variants, class changes, and prop changes that affect styles.
4. `canvas-component-utils`
   - Use when rendering formatted HTML text or media via `FormattedText` and
     `Image`.
5. `canvas-data-fetching`
   - Use when fetching/rendering Drupal content with JSON:API, SWR, includes,
     and filter patterns.
6. Preview coverage readiness
   - Ensure `Default` examples and any authored `mocks.json` states are
     sufficient for review of the requested change.
7. `canvas-component-push` (optional)
   - Use only when the user explicitly asks to push/publish/sync components to
     Canvas.
   - Do not run push automatically after implementation or static validation.
