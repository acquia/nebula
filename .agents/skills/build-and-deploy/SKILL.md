---
name: build-and-deploy
description:
  Full autonomous pipeline — takes any URL (Figma or web), builds Canvas
  components, visually QAs them against the design reference, and uploads to
  Canvas without any manual prompts in between. Use when the user wants a fully
  hands-off run from URL to deployed components. Triggers on phrases like "do
  everything", "full pipeline", "build and deploy", "hands-off", "run the full
  loop", or "ralph loop".
metadata:
  mcp-server: figma, figma-desktop # optional — pipeline works without it
allowed-tools: Bash(playwright-cli:*)
---

# Build and Deploy — Full Autonomous Pipeline

Runs the complete workflow from URL to a live Canvas page without stopping for
human input. Only stops if a hard error occurs that cannot be recovered
automatically.

## Pipeline Overview

```
URL provided
    │
    ▼
Phase 1 — Build from URL              (build-from-url skill logic)
    │
    ▼
Phase 2 — Visual QA Loop              (visual-qa-loop skill logic)  ← MANDATORY, multi-iteration
    │
    ▼
Phase 3 — Validate & Re-QA & Upload
    ├── 3a  Validate (nebula-component-validation / npm run code:fix)
    ├── 3b  Visual QA again            ← MANDATORY after validation, auto-fix can shift output
    └── 3c  Upload (canvas-component-upload)
    │
    ▼
Phase 4 — Build Canvas Page           (content-management skill)    ← MANDATORY, do not skip
    │
    ▼
Done — report summary
```

---

## Rules for Autonomous Operation

- **Do not ask clarifying questions** mid-run. Make reasonable decisions and
  document them in the final report.
- **Do not stop on warnings** — only stop on errors that block progress (missing
  credentials, MCP connection failure, Storybook won't start).
- **On recoverable errors** (upload conflict, lint error, hot reload delay) —
  retry up to 3 times before reporting as a blocker.
- **Max QA iterations per component:** 5. If a component still has gaps after 5
  iterations, mark it as "needs manual review" and continue with the rest.
- **At the end**, always output a structured summary (see
  [Final Report](#final-report)).

### HARD RULES — never skip these

> ⛔ **Phase 2 is NOT optional.** A single screenshot glance is NOT QA. You MUST
> complete the full visual-qa-loop for every component before proceeding to
> Phase 3. "Looks close enough" is not acceptable — follow the full loop
> including style manifest extraction and numeric diffing.

> ⛔ **Phase 4 is NOT optional.** Uploading components is not "deployed".
> Deployed means a Canvas page exists with those components arranged to match
> the source URL. You MUST complete Phase 4. If page assembly is genuinely
> blocked (e.g. missing site credentials), document why in the final report — do
> NOT silently skip it.

---

## Phase 1: Build from URL

Follow the full `build-from-url` skill:

1. **Detect URL type**
   - `figma.com/design/` or `figma.com/board/` → Figma URL, skip capture
   - Any other URL → Web URL, run Playwright capture to Figma first

2. **If Web URL — Playwright capture first (always)**
   - Open at 1440×900 via playwright-cli (headed, Chrome)
   - Dismiss popups/overlays
   - Measure page height, detect sticky header
   - Extract style manifest (computed font/color/spacing tokens from live DOM)
   - Screenshot each section → save as reference images

3. **If Figma MCP is connected — also capture to Figma**
   - Create new Figma file via `generate_figma_design(outputMode: "newFile")`
   - Capture each 900px section into Figma, poll until complete
   - Save `fileKey` for design context extraction

   **If Figma MCP is not connected** — skip this step, use Playwright
   screenshots and style manifest as the build reference instead.

4. **Fetch design context (Figma MCP only)**
   - `get_design_context(fileKey, nodeId)` for each section/component
   - If too large, use `get_metadata` then fetch child nodes individually

5. **Get visual reference** — Figma screenshot if available, otherwise the
   Playwright reference images from step 2

6. **Build components**
   - Follow `nebula-component-creation` patterns
   - Apply `canvas-styling-conventions` for tokens and CVA variants
   - Apply `canvas-component-definition` contract
   - Apply `canvas-component-metadata` for `component.yml`
   - Apply `canvas-component-utils` for FormattedText/Image

7. **Create Storybook stories** — follow `nebula-storybook-stories` for each
   component

---

## Phase 2: Visual QA Loop

> ⛔ This phase is **MANDATORY**. Do not proceed to Phase 3 until every
> component has passed all steps below. One pass is not enough.

For each component built in Phase 1, execute the **full** visual-qa-loop skill:

1. **Ensure Storybook is running** at `http://localhost:6006`
   - If not, run `npm run dev` in background and wait for it to respond

2. **Get reference screenshot** — screenshot the live site section at 1440px
   that corresponds to this component (scroll to the correct Y offset, dismiss
   any overlays first)

3. **Extract style manifest from live site** — run the computed-style eval from
   the visual-qa-loop skill (Step 3B-extra) and save the output

4. **Screenshot the Storybook story**
   - URL: `http://localhost:6006/iframe.html?id=<story-id>&viewMode=story`
   - Resize to 1440×900 before screenshotting

5. **Extract style manifest from Storybook story** — run the same computed-style
   eval against the Storybook iframe

6. **Compare both** — screenshot side-by-side AND numeric style manifest diff:
   - Layout: alignment, spacing, padding, margins
   - Typography: font-family, size, weight, line-height, color
   - Colors: backgrounds, text, borders
   - Components: icons, images, buttons

7. **If ANY discrepancy found** (visual OR numeric, beyond ≤2px tolerance):
   - Fix `src/components/<name>/index.jsx`
   - Wait 2 seconds for hot reload
   - Re-screenshot and re-extract styles
   - Return to step 6
   - Repeat up to 5 times total
   - After 5 iterations → mark as "needs manual review", document remaining gaps

8. **A component is only "Matched" when ALL of the following are true:**
   - Screenshot comparison shows no visible structural differences
   - Style manifest diff shows no numeric mismatches beyond ≤2px/2% tolerance
   - At least one full iteration (screenshot + style diff) was completed

9. **If no discrepancies** → proceed to next component, then Phase 3

---

## Phase 3: Validate and Upload

1. **Validate all components**

   ```bash
   npm run code:fix
   ```

   Fix any lint or formatting errors. Retry up to 3 times.

2. **Re-run visual QA after validation** — ESLint/Prettier auto-fix can rewrite
   JSX in ways that shift visual output. After `code:fix` passes, run the full
   `visual-qa-loop` again for every component. Only proceed to upload once every
   component still passes the visual QA check.

   > ⛔ **This QA pass is mandatory.** A clean lint run does not mean the
   > component still matches the reference. Do not upload until this second QA
   > pass confirms it.

3. **Upload components to Canvas** — follow `canvas-component-upload` skill,
   handle dependency ordering, retry on conflict errors.

4. **Upload global CSS** — always run after uploading components:

   ```bash
   npx canvas upload -d ./src/components --css-only -y
   ```

---

## Phase 4: Build Canvas Page

> ⛔ This phase is **MANDATORY**. Do not report "done" until the page exists on
> Canvas with the components placed and configured.

1. **Identify the target page** — use the `content-management` skill to check if
   a page for this URL already exists on the Canvas site. If it does, update it.
   If not, create a new one.

2. **Assemble the page** — for each section of the source URL, place the
   corresponding uploaded component onto the Canvas page and configure its props
   to match the source content (headings, images, text, links).

3. **Verify the live Canvas page** — open the published Canvas page URL in
   playwright-cli and take a screenshot. Compare it against the source URL
   screenshot from Phase 1. Note any structural differences in the final report.

4. **If page assembly is blocked** (e.g. missing Canvas page-building
   credentials, API errors that cannot be recovered after 3 retries) — document
   the specific blocker in the final report. Do NOT silently skip this phase.

---

## Final Report

At the end of the run, output a summary in this format:

```
## Build and Deploy — Summary

**Source:** <URL provided>
**Canvas page:** <URL of the assembled Canvas page, or "blocked — see notes">

### Components
| Component    | Built | QA Iterations | QA Status        | Uploaded |
|--------------|-------|---------------|------------------|----------|
| hero         | ✅    | 3             | ✅ Matched        | ✅       |
| school_card  | ✅    | 1             | ✅ Matched        | ✅       |
| cta_banner   | ✅    | 2             | ⚠️ Needs review   | ✅       |

### Page Assembly
| Step                        | Status |
|-----------------------------|--------|
| Canvas page created/updated | ✅ / ❌ |
| Components placed           | ✅ / ❌ |
| Live page verified          | ✅ / ❌ |

### Notes
- <any decisions made autonomously>
- <any components flagged for manual review and why>
- <any errors encountered and how they were resolved>
- <reason if Phase 4 was blocked>
```
