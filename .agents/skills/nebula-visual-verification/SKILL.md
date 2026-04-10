---
name: nebula-visual-verification
description:
  Focused visual QA for changed Canvas components and pages in local Canvas
  Workbench. Use only when the user explicitly asks for visual verification,
  visual QA, or Workbench rendering review of a changed component or page.
---

# Visual verification

## Activation guard

Run this skill only when the user explicitly requests visual verification.

Do not run this skill automatically after component or page changes, and do not
infer consent from generic requests such as "validate", "run checks", or "finish
the task".

If explicit visual verification was not requested, do not run browser steps and
report that visual verification was not performed.

Use this skill for the changed Workbench target only. Do not broaden into full
app QA unless the user explicitly asks for exploratory testing; use `dogfood`
for that.

## Reference map

- Checklist and pass/fail heuristics: `references/checklist.md`
- Browser-side signal collector: `scripts/collect-visual-signals.js`
- Browser CLI command guide: `agent-browser` skill
- Start or reuse Canvas Workbench with the `canvas-workbench` skill

## Tooling note

Always consult the `agent-browser` skill before running browser verification for
this skill. Treat it as the canonical source for command semantics, session
behavior, and interaction patterns.

Do not assume a separate browser tool wrapper is required. If `agent-browser` is
available in the environment, run it through the shell and treat that as valid
browser automation for this skill.

## Preconditions

- The changed surface must be discoverable in Workbench.
- Component work must have sufficient `component.yml` examples and any authored
  `mocks.json` states needed for review.
- Page work must exist in the canonical `pages/` directory for this repo.
- Static validation should already have run through
  `nebula-component-validation` before this skill starts browser review.

If the changed surface is not reviewable in Workbench, stop immediately. Missing
preview coverage is a blocker; do not treat the task as visually verified.

## Mandatory deterministic check

For every visual verification run, run the browser-side helper script below for
each required target/state/viewport combination before claiming success:

```bash
node .agents/skills/nebula-visual-verification/scripts/collect-visual-signals.js \
  --scope body \
  --sample-limit 60 \
  | agent-browser --session "$SESSION" eval --stdin
```

If this helper is not executed, the verification is incomplete and must be
reported as not fully validated. Screenshots, manual inspection, and ad hoc
`eval` checks do not replace this requirement.

## Target resolution

- **Component work**: verify the changed `/component/<component-id>` route, any
  relevant authored `mocks.json` states, and `Default` when the prop examples
  provide a meaningful baseline.
- **Page work**: verify the changed `/page/<slug>` route.
- Keep the review surface tight. Do not sweep unrelated components or example
  pages by default.

## Viewports

Verify every target and named state at:

- Desktop: `1440x900`
- Tablet: `768x1024`
- Mobile: `390x844`

## Browser workflow

1. Use the `canvas-workbench` skill to start or reuse Canvas Workbench and
   record the base URL.
2. Review the `agent-browser` skill and use its command patterns for all browser
   interactions in this workflow.
3. Resolve the exact review target and state list from the changed component or
   page.
4. For each target/state/viewport combination, perform all of the following:
   - Open the preview route.
   - Wait for `networkidle` and for any obvious loading UI to settle.
   - Capture a screenshot and an annotated screenshot when a failure needs to be
     documented.
   - Use `snapshot` for structural review.
   - Run the mandatory deterministic check command from "Mandatory deterministic
     check".
   - Review the helper output before deciding pass/fail.
   - Use `get styles`, `get box`, and focused `eval` calls when a specific
     element needs more evidence.

5. Compare the rendered result against the checklist in
   `references/checklist.md`.
6. If all checks pass for every required state and viewport, finish.
7. If any check fails, fix the changed surface and direct dependencies only,
   rerun static validation when code changed, and re-run this skill against the
   same routes, states, and viewports.

## Auto-fix loop

Use this loop until the changed surface passes or is stuck:

1. Verify the current implementation.
2. If failures exist, fix only the changed component/page and direct
   dependencies.
3. Rerun `npm run code:fix` when code changed.
4. Reopen the same preview route and named state.
5. Re-run verification for all required viewports.

Keep the fix scope narrow. Do not turn a focused visual correction into a broad
refactor or unrelated design rewrite.

## Judgment rules

- Use deterministic evidence for contrast, overflow, and viewport-level scroll
  problems whenever possible.
- Use human judgment for spacing, alignment, typography hierarchy, and image
  relevance.
- Flag image/copy mismatch only when the mismatch is obvious. Do not reject
  images based on taste or subjective style preference alone.
- When an image mismatch comes from a newly added image in the current task, you
  may fetch a better replacement. Otherwise stay conservative and avoid
  speculative image churn.

## Completion gate

Do not say the changed surface "passed", "was verified", or "is visually
validated" unless the helper script was run for every required
target/state/viewport combination and the results were reviewed.

If screenshots or manual inspection were done without the helper script, report
that outcome as "manual review only" or "partial verification", not full visual
verification.

## Stuck rules

Stop the auto-fix loop and report a blocker when any of these are true:

- The same failing checks persist across two consecutive loops.
- There is no material code change between loops.
- Workbench will not start or cannot render the changed target.
- Preview coverage is missing.
- `collect-visual-signals.js` cannot be run successfully for the required
  target/state/viewport combinations.
- The remaining failure needs a product decision or an unresolved image source.

When stuck, explain the blocker clearly. Do not claim the task passed.

## Required closeout

Every verification closeout must include:

- target route(s) reviewed
- viewport(s) reviewed
- whether `collect-visual-signals.js` was run
- a short summary of deterministic findings
- a short summary of manual visual findings

If the helper script was not run, explicitly state:

`Deterministic verification was not completed.`

## Artifacts

- On failure or stuck status, save screenshots and a short findings summary
  under `./visual-verification-output/<timestamp>/`.
- On success, keep the closeout concise and avoid noisy artifact output unless
  the user asks for it.
