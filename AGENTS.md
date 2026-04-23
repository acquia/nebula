# Nebula agent guidance

Nebula is the template repository this project was scaffolded from, used for
building Drupal Canvas Code Components.

## Design intake (component library and screen breakdown)

Load **`canvas-design-decomposition` first**—before a component library,
implementation plan, `component.yml`, or React—whenever UI is being turned into
Canvas structure: **library design/refactor**, **new components** under
`src/components/` (skip decomposition only for tiny edits inside a stable
existing API), **Figma** links or frames, **implement / match / break down this
screen** language, **reference visuals** (screenshots, scraped or live URLs—use
[`nebula-scrape-url`](.agents/skills/nebula-scrape-url/SKILL.md) when scraping a
URL fits), or **brief / prose / AI-generated** specs that still need a real
tree.

Apply it to **plan-only** deliverables too (plans, breakdowns, structure)—run
phases **A–G** (or through the answering phase), not improvised regions from
tool output. Treat generated markup or Figma MCP JSX as **input**, not the API.

For React components, `component.yml`, and `src/global.css`, also load
**`canvas-component-definition`**.

## Skill prefixes

- `nebula-*` skills contain Nebula-specific conventions and workflows for this
  repository.
- `canvas-*` skills are generic Canvas component guidance.
- `acquia-source-*` skills are specific to Acquia Source workflows (only
  relevant when these skills exist), which is a specific Drupal implementation.

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
