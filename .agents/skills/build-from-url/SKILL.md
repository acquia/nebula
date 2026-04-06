---
name: build-from-url
description:
  Build or implement a UI from any URL. Auto-detects the URL type — if it's a
  Figma URL, builds directly using the Figma MCP; if it's any other web page
  URL, captures Playwright screenshots and style tokens first (always), then
  also converts to Figma if the MCP is connected for extra precision. Falls back
  gracefully to Playwright-only if Figma MCP is not available — no manual setup
  required. Use when the user shares any URL (Figma or web) with intent to
  build, implement, recreate, or match a design. Triggers on phrases like "build
  this", "implement this", "recreate this page", or any URL shared alongside a
  build request.
metadata:
  mcp-server: figma, figma-desktop # optional — pipeline works without it
allowed-tools: Bash(playwright-cli:*)
---

# Build from URL

## URL Detection

Check the URL the user shared:

- Contains `figma.com/design/` or `figma.com/board/` → **Figma URL**, skip to
  [Phase 2a: Build from Figma](#phase-2a-build-from-figma)
- Any other URL → **Web URL**, start at
  [Phase 1: Playwright Capture](#phase-1-playwright-capture-web-urls--always-run)

---

## Phase 1: Playwright Capture (Web URLs — always run)

This phase is **always required** for web URLs. It produces the reference
screenshots and style manifest used throughout the build and in Phase 3 QA.
Figma MCP is not needed for this phase.

### 1.1 — Open the page

```bash
playwright-cli open <URL> --browser=chrome
playwright-cli resize 1440 900
```

Wait for the page to fully load.

### 1.2 — Dismiss popups and overlays

Try clicking common dismiss buttons:

```bash
playwright-cli click [aria-label*="Accept"]
playwright-cli click [id*="cookie"] button
playwright-cli click [class*="consent"] button
```

If a button was clicked, wait 500ms. Then suppress remaining overlays and
restore scroll:

```bash
playwright-cli eval "document.querySelectorAll('[id*=\"cookie\"],[class*=\"cookie\"],[class*=\"consent\"],[class*=\"popup\"],[class*=\"banner\"],[class*=\"overlay\"]').forEach(el => el.style.display = 'none'); document.body.style.overflow = 'auto'"
```

### 1.3 — Measure the page

```bash
playwright-cli eval "document.documentElement.scrollHeight"
playwright-cli eval "document.title"
```

Calculate sections: `ceil(height / 900)`

### 1.3b — Extract design tokens from the live site

Extract the site's actual computed styles so the build uses exact values rather
than approximations. Save all three outputs as the **style manifest** — used in
Phase 2 and `global.css`.

**Typography and color tokens:**

```bash
playwright-cli eval "
const targets = {
  heading1: 'h1',
  heading2: 'h2',
  heading3: 'h3',
  body: 'p',
  nav: 'nav a, header a',
  button: 'button, a[class*=\"btn\"], a[class*=\"button\"]',
  header: 'header',
  footer: 'footer',
};
const tokens = {};
for (const [name, selector] of Object.entries(targets)) {
  const el = document.querySelector(selector);
  if (!el) continue;
  const s = getComputedStyle(el);
  tokens[name] = {
    fontFamily: s.fontFamily,
    fontSize: s.fontSize,
    fontWeight: s.fontWeight,
    lineHeight: s.lineHeight,
    letterSpacing: s.letterSpacing,
    color: s.color,
    backgroundColor: s.backgroundColor,
    textTransform: s.textTransform,
    padding: s.padding,
    borderRadius: s.borderRadius,
  };
}
JSON.stringify(tokens, null, 2)
"
```

**Color palette:**

```bash
playwright-cli eval "
const colors = new Map();
document.querySelectorAll('*').forEach(el => {
  const s = getComputedStyle(el);
  const tag = el.tagName.toLowerCase();
  if (s.backgroundColor && s.backgroundColor !== 'rgba(0, 0, 0, 0)')
    colors.set(s.backgroundColor, (colors.get(s.backgroundColor) || 0) + 1);
  if (s.color)
    colors.set(s.color, (colors.get(s.color) || 0) + 1);
});
JSON.stringify([...colors.entries()].sort((a,b) => b[1]-a[1]).slice(0,20).map(([c,n]) => ({color:c,count:n})))
"
```

**Web fonts loaded:**

```bash
playwright-cli eval "
[...document.fonts].map(f => ({ family: f.family, style: f.style, weight: f.weight, status: f.status }))
  .filter(f => f.status === 'loaded')
  .map(f => f.family + ' ' + f.weight)
  .filter((v,i,a) => a.indexOf(v) === i)
"
```

### 1.4 — Detect sticky header

```bash
playwright-cli eval "window.scrollTo(0, 200)"
playwright-cli eval "window.scrollTo(0, 0)"
playwright-cli eval "window.__stickyEls = Array.from(document.querySelectorAll('*')).filter(el => { const s = getComputedStyle(el); return (s.position === 'fixed' || s.position === 'sticky') && el.getBoundingClientRect().top < 200; }); window.__stickyEls.reduce((h, el) => h + el.getBoundingClientRect().height, 0)"
```

Save the result as `stickyHeight` (0 if none).

### 1.5 — Screenshot each section (reference images)

For each section at `scrollY = 0, 900, 1800, ...`:

1. Scroll to position and wait 1 second for content to settle
2. For sections after the first (`scrollY > 0`), hide sticky elements
3. Take a screenshot and save to `.playwright-cli/<section-name>-reference.png`
4. Note the pixel boundaries (top/bottom Y) of each distinct visual section
5. Restore sticky elements after each screenshot

These reference images are the source of truth for Phase 3 QA.

---

## Figma MCP Check

> After completing Phase 1, check whether Figma MCP tools are available.

- **Figma MCP connected** → proceed to
  [Phase 1.6: Capture to Figma](#phase-16-capture-to-figma-optional--figma-mcp-connected)
  for enhanced design context, then build via **Phase 2a**
- **Figma MCP not connected** → skip Phase 1.6, proceed directly to
  **[Phase 2b: Build from Playwright Reference](#phase-2b-build-from-playwright-reference-figma-mcp-not-connected)**

Both paths produce the same output quality. Figma adds exact design-token
extraction on top of what Playwright already captured.

---

## Phase 1.6: Capture to Figma (optional — Figma MCP connected)

### 1.6a — Create a new Figma file

```
generate_figma_design(outputMode: "newFile", fileName: "<page title>")
```

Save the `fileKey` from the response.

### 1.6b — Capture each section

For each section at `scrollY = 0, 900, 1800, ...`:

1. Scroll to position:
   ```bash
   playwright-cli eval "window.scrollTo(0, <scrollY>)"
   ```
2. Wait 1 second for content to settle.
3. For sections after the first (`scrollY > 0`), hide sticky elements:
   ```bash
   playwright-cli eval "window.__stickyEls.forEach(el => el.style.visibility = 'hidden')"
   ```
4. Inject Figma's capture script:
   ```bash
   playwright-cli eval "fetch('https://mcp.figma.com/mcp/html-to-design/capture.js').then(r=>r.text()).then(t=>{const s=document.createElement('script');s.textContent=t;document.head.appendChild(s)})"
   ```
5. Get a new captureId:
   ```
   generate_figma_design(outputMode: "existingFile", fileKey: "<fileKey>")
   ```
6. Trigger capture:
   ```bash
   playwright-cli eval "window.figma.captureForDesign({ captureId: '<captureId>', endpoint: '<endpoint>', selector: 'body' })"
   ```
7. Poll `generate_figma_design(captureId: "<captureId>")` every 5 seconds until
   status is `completed`.
8. Restore sticky elements:
   ```bash
   playwright-cli eval "window.__stickyEls.forEach(el => el.style.visibility = '')"
   ```

### 1.6c — Close browser

```bash
playwright-cli close
```

Share the direct Figma file link, then continue to **Phase 2a**.

---

## Phase 2a: Build from Figma

_Use this path when Figma MCP is connected (either a direct Figma URL, or after
Phase 1.6 capture)._

### 2a.1 — Parse fileKey and nodeId

For Figma URLs: `https://figma.com/design/:fileKey/:fileName?node-id=1-2`

- **fileKey**: segment after `/design/`
- **nodeId**: `node-id` query param value (convert `-` to `:`)

For pages captured in Phase 1.6: use the `fileKey` from the capture response.

### 2a.2 — Fetch design context

```
get_design_context(fileKey=":fileKey", nodeId="1:2")
```

If the response is too large, use `get_metadata` first to get the node map, then
fetch specific child nodes individually.

### 2a.3 — Get visual reference

```
get_screenshot(fileKey=":fileKey", nodeId="1:2")
```

Keep this screenshot as the source of truth throughout implementation.

### 2a.4 — Download assets

Use any `localhost` URLs returned by the Figma MCP server directly. Do not
import new icon packages or create placeholders.

### 2a.5 — Build components

- Follow `nebula-component-creation` patterns
- **Use the style manifest from Phase 1.3b as the primary source of truth** for
  all numeric values — exact font sizes, weights, colors, spacing
- Add site-specific colors to `src/components/global.css` as `@theme` CSS
  variables before writing component code
- Load any web fonts from the manifest via `@import url(...)` in `global.css`
- Apply `canvas-styling-conventions` (Tailwind tokens, CVA variants)
- Apply `canvas-component-definition` contract
- Apply `canvas-component-metadata` for `component.yml`
- Apply `canvas-component-utils` for FormattedText/Image
- Create Storybook story per `nebula-storybook-stories`

### 2a.6 — Validate checklist

- [ ] Layout matches (spacing, alignment, sizing)
- [ ] Typography matches (font, size, weight, line height)
- [ ] Colors match exactly
- [ ] Interactive states work (hover, active, disabled)
- [ ] Assets render correctly
- [ ] Accessibility standards met

---

## Phase 2b: Build from Playwright Reference (Figma MCP not connected)

_Use this path when Figma MCP is not available. The reference screenshots from
Phase 1.5 and style manifest from Phase 1.3b replace Figma as the source of
truth._

### 2b.1 — Identify components from reference screenshots

Review the section screenshots saved in Phase 1.5. Identify each distinct visual
component (navbar, hero, cards, footer, etc.) and note its pixel boundaries.

### 2b.2 — Build components

- Follow `nebula-component-creation` patterns
- **Use the style manifest from Phase 1.3b as the source of truth** for all
  token values:
  - Add site-specific colors to `src/components/global.css` as `@theme` CSS
    variables
  - Use exact `font-size`, `font-weight`, `line-height`, `letter-spacing` values
    from the manifest
  - Match `padding` and `border-radius` to the extracted values
  - Load web fonts found in the manifest via `@import url(...)` in `global.css`
- Use the Playwright reference screenshots as the visual guide for layout and
  proportions
- Apply `canvas-styling-conventions` (Tailwind tokens, CVA variants)
- Apply `canvas-component-definition` contract
- Apply `canvas-component-metadata` for `component.yml`
- Apply `canvas-component-utils` for FormattedText/Image
- Create Storybook story per `nebula-storybook-stories`

### 2b.3 — Validate checklist

- [ ] Layout matches reference screenshot (spacing, alignment, sizing)
- [ ] Typography matches style manifest values exactly
- [ ] Colors match style manifest palette
- [ ] Interactive states work (hover, active, disabled)
- [ ] Accessibility standards met

---

## Phase 3: Visual QA Loop (MANDATORY)

**This phase is NOT optional.** After building components and creating stories,
you MUST run the visual QA loop before considering the build complete. The
reference screenshots from Phase 1.5 are the QA baseline — Figma MCP is not
required.

### 3.1 — Run the visual-qa-loop skill

Invoke the `visual-qa-loop` skill with the original URL and the Phase 1.5
reference screenshots as the design reference. This will:

1. Screenshot each component story in Storybook
2. Compare against the reference screenshots (and Figma if available)
3. Fix discrepancies (typography, spacing, colors, layout)
4. Re-screenshot and iterate until visual parity is achieved
5. Run final validation (`npm run code:fix`)

### 3.2 — Completion criteria

The build is **only complete** when:

- [ ] All components pass visual QA (no discrepancies > 2px)
- [ ] `npm run code:fix` exits with 0 errors
- [ ] `npm run build` succeeds

**Do NOT report the build as finished until Phase 3 is done.**
