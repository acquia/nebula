# Granularity audit note

`canvas-design-decomposition` no longer owns the split/merge heuristics. Run the
shared checklist in
[`canvas-component-composability`](../../canvas-component-composability/SKILL.md)
when deciding whether a component is too coarse or too fine.

This file only records how Phase F should capture that result in the handoff.

## Phase F audit note

- Mark each node pass/fail with a short rationale.
- If a node fails, note whether the problem is coarse, fine, or an authoring
  mismatch.
- Record the intended fix: split, merge, extract a slot, or keep as an explicit
  exception.
- Re-sketch Phase E props/slots only for nodes whose boundary changed.

## Cross-links

- Shared granularity rules:
  [`../../canvas-component-composability/SKILL.md`](../../canvas-component-composability/SKILL.md)
- Repeatable parent/child pattern:
  [`../../canvas-component-composability/references/repeatable-content.md`](../../canvas-component-composability/references/repeatable-content.md)
- Decomposition workflow: [`../SKILL.md`](../SKILL.md)
