# Props vs slots handoff note

`canvas-design-decomposition` no longer owns the reusable props-vs-slots rubric.
Use
[`canvas-component-composability`](../../canvas-component-composability/SKILL.md)
for the actual decision rules:

- when to use props vs slots
- variants vs granular props
- repeatable-content patterns
- slot edge cases and anti-patterns

This file only records how to write the Phase E handoff after those decisions
have been made.

## Variants vs granular props

Follow
[`canvas-component-composability`](../../canvas-component-composability/SKILL.md)
for the choice itself. In the decomposition handoff, record one of these labels
for each component:

- `variants` (default)
- `granular props`

Include a one-line rationale so implementation and metadata work stay aligned.

## Prop order in forms and metadata

When sketching props in Phase E, mirror the order authors should later see in
Canvas:

1. If there is one primary preset enum, name it `variant` and list it first.
2. Then list content props (copy, links, media).
3. Then list remaining configuration props.

When there is no primary `variant`, list content props first and configuration
after.

## Cross-links

- Decomposition workflow: [`../SKILL.md`](../SKILL.md)
- Shared composability rules:
  [`../../canvas-component-composability/SKILL.md`](../../canvas-component-composability/SKILL.md)
- Exact YAML and slot schema:
  [`../../canvas-component-metadata/SKILL.md`](../../canvas-component-metadata/SKILL.md)
