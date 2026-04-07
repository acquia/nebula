# Workbench Pages

Canvas Workbench uses the repository's page specs for local page previews.

For the canonical page-spec contract, format constraints, and schema validation,
use:

`canvas-page-definition/SKILL.md`

## Location and naming

Author the canonical local page specs in the configured pages directory
(`pagesDir` in `canvas.config.json`). If `pagesDir` is not set, Workbench
defaults to the top-level `pages/` directory.

- Place each page in `<pages-dir>/<page-name>.json`
- Keep page files flat in the configured pages directory; nested files are
  ignored
- Use a stable, descriptive filename
- Use a human-readable `title` inside the JSON file for the actual page title

Examples:

- `<pages-dir>/homepage.json`
- `<pages-dir>/about-us.json`

## Validation and verification

- Follow `canvas-workbench/SKILL.md` to start or reuse Workbench, then open the
  page preview and verify the composed result
