# Visual Review Checklist

Use this checklist to judge the changed Workbench target after static validation
has already passed.

## Contrast and legibility

- Body text should meet normal WCAG contrast expectations.
- Large headings and large UI text may use the lower large-text threshold.
- Text over images must remain readable without relying on ideal screen
  brightness or color perception.
- Link text, buttons, pills, and badges should remain legible in their rendered
  state.

## Images and copy fit

- Treat broken images, empty placeholders, and obviously wrong crops as
  failures.
- Check that the selected image obviously supports the surrounding copy and
  component purpose.
- Flag image/copy mismatch only when the mismatch is clear and defensible.
- If the image was newly introduced in the current task, replacing it is an
  acceptable fix path.

## Spacing and rhythm

- Compare gaps, padding, and vertical rhythm against nearby repeated patterns.
- Look for one-off spacing values that make a section feel detached, cramped, or
  inconsistent with sibling components.
- Treat accidental asymmetry or broken cadence as a failure when it is visible
  in the changed surface.

## Alignment and layout

- Check edge alignment, grid consistency, and centered content that drifts off
  the surrounding rhythm.
- Look for clipping, wrapping, overlap, and elements extending outside their
  expected container.
- Treat unintended horizontal scroll as a failure.

## Responsive behavior

- Re-check the changed target at desktop, tablet, and mobile sizes.
- Confirm layout changes between breakpoints are intentional and preserve
  readability and hierarchy.
- Watch for jumpy transitions where text, buttons, or images collapse into
  unusable arrangements.

## Typography

- Check heading hierarchy, font size, line height, and weight consistency.
- Look for components where type scale or emphasis no longer matches nearby
  patterns.
- Treat typographic regressions that make content harder to scan as failures.

## Interactive states

- Check hover, focus, active, and disabled states when the changed surface
  includes interactive controls.
- Missing or nearly invisible focus treatment is a failure.
- Interaction affordances should remain visually obvious after the change.

## Layering and state presentation

- Check for z-index collisions, sticky overlays hiding content, and text hidden
  under media or controls.
- When the target includes empty, loading, or error states, ensure those states
  are also presentable and readable.

## Severity guidance

- Treat any failing check in this workflow as blocking for task completion.
- Keep fixes limited to the changed surface and direct dependencies unless a
  hard blocker requires the user to decide otherwise.
