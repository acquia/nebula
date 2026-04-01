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

If any item is missing, the component is incomplete for Canvas usage.

For local authoring and review, add a matching Workbench mock file beside the
component source and metadata:

- Use `mocks.json` beside `index.jsx` and `component.yml`
- Author at least one named mock whenever the component needs a preview beyond
  the auto-generated `Default` tab, which renders the component using the first
  example value for each prop from `component.yml`

## Naming guidance

Use `references/naming.md` for naming rules and examples.

## Workbench mocks

Use `references/workbench-mocks.md` for mock naming, placement, format
selection, and validation.

## Skill coordination

Evaluate using companion skills in this order.

1. `canvas-component-metadata`
   - Use when creating/changing `component.yml`, props/slots, enums, or fixing
     prop validation errors.
2. `canvas-component-composability`
   - Use when designing prop/slot structure, decomposing large components,
     deciding props vs slots, or modeling repeatable list/grid content.
3. `canvas-styling-conventions`
   - Use for all styling work: new components, style props, Tailwind token
     usage, CVA variants, class changes, and prop changes that affect styles.
4. `canvas-component-utils`
   - Use when rendering formatted HTML text or media via `FormattedText` and
     `Image`.
5. `canvas-data-fetching`
   - Use when fetching/rendering Drupal content with JSON:API, SWR, includes,
     and filter patterns.
6. `canvas-component-push`
   - Use after implementation is complete and validated, when pushing changes
     and recovering from push failures.
