---
name: visual-qa-loop
description:
  Autonomous visual QA loop that verifies built Canvas components match their
  design reference, iterates until they do, then validates and uploads to
  Canvas. Use after components are built. Triggers when the user says "check if
  it matches", "verify visually", "qa the components", "does it match the
  design", or after a build step to close the loop automatically. Requires
  playwright-cli; Figma MCP optional.
metadata:
  mcp-server: figma, figma-desktop
allowed-tools: Bash(playwright-cli:*)
---

# Visual QA Loop

An autonomous loop that screenshots each component in Canvas Workbench, compares
it against the design reference, fixes any gaps, and repeats until parity is
reached — then validates and uploads to Canvas.

## MANDATORY CHECKLIST

> ⛔ A component is **NOT** considered "matched" until ALL of the following are
> done for it. Do not skip any item, even if it "looks fine":
>
> - [ ] Reference screenshot taken from live site at correct scroll position
> - [ ] Style manifest extracted from live site (Step 3B-extra)
> - [ ] Workbench component preview screenshotted at 1440×900
> - [ ] Style manifest extracted from Workbench preview (Step 5.2)
> - [ ] Screenshot comparison completed (Step 5.1)
> - [ ] Numeric style manifest diff completed (Step 5.2) — every mismatch > 2px
>       is a discrepancy that must be fixed
> - [ ] At least one full fix-and-recheck iteration performed if ANY discrepancy
>       was found
>
> Declaring "matched" after only a screenshot glance is **not acceptable**.

## Reference Source

Determine the reference type from how the build was initiated:

- **Figma URL was provided** → use `get_screenshot` from the Figma MCP for each
  component's node
- **Live site URL was provided** → use playwright-cli to screenshot the
  corresponding section of the live page

Keep the reference screenshot(s) accessible throughout the loop. They are the
source of truth.

---

## Step 1: Ensure Workbench Is Running

Follow the `canvas-workbench` skill to start or reuse the local Workbench dev
server. In this project, run:

```bash
npm run dev
```

Read the startup output and note the local URL it prints (typically
`http://localhost:5173`). Wait until Workbench responds at that URL before
continuing.

---

## Step 2: Identify Components and Their Preview States

For each component being QA'd:

1. Locate the component folder at `src/components/<component_name>/`
2. Check whether a `mocks.json` file exists alongside `index.jsx` and
   `component.yml`. If it does, read it to find the named preview states (e.g.,
   `Default`, `WithButton`). If not, Workbench provides a built-in `Default`
   state from `component.yml` example values.
3. In Workbench, the component preview is accessible by navigating to the
   component via the Workbench UI at the URL printed at startup. Use
   `canvas-workbench/references/components.md` for the Workbench component
   review flow.
4. The clean preview URL for playwright-cli screenshots:
   `<workbench-url>/?component=<component-name>&state=Default` (substitute the
   actual Workbench URL and state name)

---

## Step 3: Get the Reference Screenshot and Styles

### Option A — Figma reference

For each component node that was used during the build:

```
get_screenshot(fileKey=":fileKey", nodeId=":nodeId")
```

If you have a page-level Figma node, get the full page screenshot and crop
mentally to the relevant section during comparison.

### Option B — Live site reference

Open the live site at 1440px width and screenshot the section that corresponds
to the component:

```bash
playwright-cli open <live-site-url> --browser=chrome
playwright-cli resize 1440 900
playwright-cli eval "window.scrollTo(0, <scrollY-of-section>)"
playwright-cli screenshot --filename=reference-<component-name>.png
```

Store the filename for use in comparison.

### 3B-extra — Extract computed styles from the live site (MANDATORY)

> ⛔ Do not skip this step. A screenshot alone is not sufficient for QA. You
> must extract and save the style manifest so it can be diffed against the
> Workbench preview in Step 5.2.

After taking the screenshot, extract the computed styles for the key elements in
each section. Identify the most important selectors (heading, body text, button,
container, card) and run:

```bash
playwright-cli eval "
const results = {};
const targets = {
  heading: 'h1, h2, [class*=\"heading\"], [class*=\"title\"]',
  body: 'p, [class*=\"body\"], [class*=\"text\"]',
  button: 'a[class*=\"btn\"], button, a[class*=\"button\"]',
  nav: 'nav a, [class*=\"nav\"] a',
  card: '[class*=\"card\"]',
  container: '[class*=\"container\"], main > div',
};
for (const [name, selector] of Object.entries(targets)) {
  const el = document.querySelector(selector);
  if (!el) continue;
  const s = getComputedStyle(el);
  results[name] = {
    fontFamily: s.fontFamily,
    fontSize: s.fontSize,
    fontWeight: s.fontWeight,
    lineHeight: s.lineHeight,
    letterSpacing: s.letterSpacing,
    color: s.color,
    backgroundColor: s.backgroundColor,
    paddingTop: s.paddingTop,
    paddingBottom: s.paddingBottom,
    paddingLeft: s.paddingLeft,
    paddingRight: s.paddingRight,
    marginTop: s.marginTop,
    marginBottom: s.marginBottom,
    borderRadius: s.borderRadius,
    textTransform: s.textTransform,
  };
}
JSON.stringify(results, null, 2)
"
```

Save this output as your **style manifest** for this component. Reference it
during comparison to catch exact numeric mismatches.

Also extract the color palette used:

```bash
playwright-cli eval "
const colors = new Set();
document.querySelectorAll('*').forEach(el => {
  const s = getComputedStyle(el);
  if (s.backgroundColor && s.backgroundColor !== 'rgba(0, 0, 0, 0)' && s.backgroundColor !== 'transparent')
    colors.add(s.backgroundColor);
  if (s.color) colors.add(s.color);
});
JSON.stringify([...colors].slice(0, 30))
"
```

---

## Step 4: Screenshot the Workbench Preview

```bash
playwright-cli open <workbench-url>/?component=<component-name>&state=Default --browser=chrome
playwright-cli resize 1440 900
playwright-cli screenshot --filename=workbench-<component-name>.png
```

---

## Step 5: Visual Comparison

### 5.1 — Screenshot comparison

Look at both screenshots side by side and evaluate:

- **Layout**: alignment, spacing, padding, margins
- **Typography**: font family, size, weight, line height, color
- **Colors**: backgrounds, text, borders, shadows
- **Components**: icons, images, buttons, badges
- **Responsiveness**: does it look right at 1440px?

### 5.2 — Style manifest comparison (live site only)

If a style manifest was collected in Step 3B-extra, also extract computed styles
from the Workbench preview to compare numerically:

```bash
playwright-cli open <workbench-url>/?component=<component-name>&state=Default --browser=chrome
playwright-cli resize 1440 900
playwright-cli eval "
const results = {};
const targets = {
  heading: 'h1, h2, [class*=\"heading\"], [class*=\"title\"]',
  body: 'p, [class*=\"body\"]',
  button: 'a, button',
  card: '[class*=\"card\"]',
  container: 'div > div',
};
for (const [name, selector] of Object.entries(targets)) {
  const el = document.querySelector(selector);
  if (!el) continue;
  const s = getComputedStyle(el);
  results[name] = {
    fontFamily: s.fontFamily,
    fontSize: s.fontSize,
    fontWeight: s.fontWeight,
    lineHeight: s.lineHeight,
    letterSpacing: s.letterSpacing,
    color: s.color,
    backgroundColor: s.backgroundColor,
    paddingTop: s.paddingTop,
    paddingBottom: s.paddingBottom,
    paddingLeft: s.paddingLeft,
    paddingRight: s.paddingRight,
    borderRadius: s.borderRadius,
    textTransform: s.textTransform,
  };
}
JSON.stringify(results, null, 2)
"
```

Diff the two style manifests value-by-value. Every numeric mismatch (font-size,
padding, line-height, color) is a discrepancy to fix — even if the screenshot
looks "close enough".

### 5.3 — Report discrepancies

List every discrepancy found. Be specific (e.g., "heading font-size is 24px but
reference shows 32px", "button background is blue-500 but should be blue-700",
"missing 48px top padding on section").

If no discrepancies are found → skip to
[Step 7: Validate and Upload](#step-7-validate-and-upload).

---

## Step 6: Fix and Re-Check

1. Open the component source at `src/components/<component_name>/index.jsx`
2. Apply fixes for each discrepancy found in Step 5
3. Save the file (Workbench hot-reloads automatically)
4. Wait 2 seconds for hot reload to complete
5. Re-screenshot:
   ```bash
   playwright-cli reload
   playwright-cli screenshot --filename=workbench-<component-name>.png
   ```
6. Return to **Step 5** and compare again

**Iteration limit:** If after 5 iterations the component still has significant
discrepancies, stop and report the remaining gaps to the user rather than
continuing to loop. Minor pixel-level differences (≤2px) are acceptable.

---

## Step 7: Validate and Upload

Once visual parity is achieved for all components:

### 7.1 — Validate

Run the `nebula-component-validation` skill to fix formatting, linting, and
Canvas requirements:

```bash
npm run code:fix
```

Resolve any remaining errors before proceeding.

### 7.2 — Upload

Run the `canvas-component-push` skill to push to the Canvas site.

---

## Multi-Component Pages

When QA-ing a page preview (e.g., `pages/homepage.json`):

1. Open the page preview in Workbench:
   ```bash
   playwright-cli open <workbench-url>/?page=homepage
   playwright-cli resize 1440 900
   playwright-cli eval "document.documentElement.scrollHeight"
   ```
2. For each 900px section, scroll and screenshot
3. Compare section-by-section against the reference
4. Fix individual component files as needed
5. Re-screenshot affected sections after each fix

---

## Example Run

**Input:** Hero Banner component was built from a Figma URL.

1. Get Figma screenshot for the Hero Banner node
2. Open Workbench preview:
   `<workbench-url>/?component=hero-banner&state=Default`
3. Screenshot at 1440px
4. Compare: "heading is 24px but Figma shows 40px; background image is not full
   bleed"
5. Fix `src/components/hero_banner/index.jsx`
6. Re-screenshot → compare again
7. Match achieved → run `npm run code:fix` → upload
