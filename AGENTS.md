# Nebula agent guidance

Nebula is the template repository this project was scaffolded from, used for
building Drupal Canvas Code Components.

## Design intake (component library and screen breakdown)

Before a component library, implementation plan, `component.yml`, or React, load
**`canvas-design-decomposition`** whenever UI becomes Canvas structure: library
design/refactor; new `src/components/` (except tiny edits inside a stable API);
**Figma** links or frames; **implement / match / break down this screen**;
reference visuals (scraped/live URLs →
[`nebula-scrape-url`](.agents/skills/nebula-scrape-url/SKILL.md) when useful);
or prose/AI specs that still need a real tree.

Read
[`canvas-design-decomposition`](.agents/skills/canvas-design-decomposition/SKILL.md)
end-to-end and run phases **A–G** for **each** artifact—**including greenfield
Figma work and plan-only deliverables.** Do not skip because `pages/` or
`src/components/` already has drafts; reconcile those with the skill’s output
for **this** screen. Figma MCP JSX and other generated markup are **input**, not
the component API. For plans or the first structured answer after a design/Figma
request, add a short **Decomposition summary** (regions → components → page
order → open questions).

For React, `component.yml`, and `src/global.css`, also load
**`canvas-component-definition`**.

## Skill prefixes

- `nebula-*` skills contain Nebula-specific conventions and workflows for this
  repository.
- `canvas-*` skills are generic Canvas component guidance.
- `acquia-source-*` skills are specific to Acquia Source workflows (only
  relevant when these skills exist), which is a specific Drupal implementation.

### Individual node / entity page UI (not lists)

When the ask is to add **single-node / detail** screens (article detail,
one-entity pages, content-type **templates** for one node) as **components plus
an example `pages/` spec**—and **not** to wire each instance through APIs or
Source MCP—load
[`nebula-node-page-scaffold`](.agents/skills/nebula-node-page-scaffold/SKILL.md).
That skill does **not** apply to **list/index** UIs (blog feeds, archives,
search results); use normal Canvas and data-fetching patterns for those.

### Acquia Source (`acquia-source-*`)

Load these skills when the **remote** Drupal/Canvas target (push, migration,
Source MCP, live JSON:API—not local-only Workbench) is **Acquia Source**.

**Strong signal:** host **ends with** **`.cms.acquia.site`**. Custom domains
will not match—then rely on **`CANVAS_SITE_URL`** (see **`.env.example`**),
which may also appear in `.env` / `.env.local`, shell env, CI, pasted URLs, or
MCP config. Prefer the repo **`.env`** value when reconciling conflicting
origins.

**Canvas pages:** remote publish/sync on Acquia Source is via **Source MCP**,
not `canvas push`—follow
[`acquia-source-canvas-pages`](.agents/skills/acquia-source-canvas-pages/SKILL.md).

**Drupal menus:** Prefer authoring menus in the **Drupal CMS** (Structure →
Menus). On **Acquia Source**, you can automate that via Source MCP — follow
[`acquia-source-navigation-menus`](.agents/skills/acquia-source-navigation-menus/SKILL.md).
That skill applies only when the remote target is Source; elsewhere use Drupal
admin (or your usual ops), not this MCP workflow.

## Validation

Use the `nebula-component-validation` skill for static validation after
rendered-output changes.
