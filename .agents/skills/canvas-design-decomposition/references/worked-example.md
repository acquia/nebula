# Worked example: hero + card grid (Nebula-style)

Fictional marketing section. Shows **regions → inventory → tree → API → audit
fix**.

## Phase A — Intake

- **Source:** Desktop frame; tablet/mobile not shown.
- **Unknowns:** max headline length (medium risk); card count on small screens
  (medium); hover on cards (low).

## Phase B — Region map

| Region   | Purpose                        | Class   |
| -------- | ------------------------------ | ------- |
| Header   | Global site chrome             | chrome  |
| Hero     | Campaign message + primary CTA | content |
| LogoRow  | Social proof logos             | content |
| CardGrid | Three feature cards            | content |

## Phase C — Inventory

| machineName (candidate) | Responsibility               | Reuse | Parent region |
| ----------------------- | ---------------------------- | ----- | ------------- |
| site-header             | Global navigation chrome     | 0     | Header        |
| campaign-hero           | Headline, copy, CTA, media   | 0     | Hero          |
| logo-strip              | Row of grayscale logos       | 1+    | LogoRow       |
| feature-grid            | Section heading + card stack | 0     | CardGrid      |
| feature-card            | Icon, title, blurb, link     | 3     | CardGrid      |

`logo-strip` might be reused on other pages; `feature-card` appears three times.

## Phase D — Tree (outline)

- `site-header` _(out of scope for section breakdown)_
- `campaign-hero`
  - internal layout: text stack + media column _(could be slots if media swaps
    wildly; kept internal for this example)_
- `logo-strip`
  - repeated logo cells _(could be `logo-item` if items vary a lot)_
- `feature-grid`
  - **slot:** `items` → multiple `feature-card`

## Phase E — First pass API sketch

### `campaign-hero`

**Props:** `eyebrow`, `heading`, `description`, `ctaLabel`, `ctaHref`, `variant`
(`mediaRight` | `mediaLeft`).

**Slots:** none on first pass—media is a single image URL prop.

### `feature-grid`

**Props:** `sectionHeading`, `sectionDescription` (optional).

**Slots:** `items` — each child a `feature-card`; empty: hide grid body, show
section text only if desired.

### `feature-card`

**Props:** `iconName` or image ref, `title`, `body`, `linkLabel`, `linkHref`.

**Slots:** none.

## Phase F — Granularity audit (failure + fix)

**Fail:** `campaign-hero` is asked to support **either** a large illustration
**or** an embedded **signup form** in the media column across campaigns.

- **Issue:** `variant` + boolean flags would pile up; the media region is really
  **author-composed**.

**Fix:**

- Add **`media`** slot on `campaign-hero` for the entire right column.
- Move image-based hero to a **`hero-media-image`** child component used inside
  `media`; form-based hero uses a **`hero-signup-form`** child.
- Keep `heading`, `description`, `cta*` as props on `campaign-hero` if copy
  stays stable; if the **whole** text stack varies by campaign, consider a
  **`text`** slot instead (second iteration).

**Re-sketch `campaign-hero` after fix**

**Props:** `eyebrow`, `heading`, `description`, `ctaLabel`, `ctaHref`.

**Slots:** `media` — optional; empty: collapse media column or show default
placeholder per product decision.

## Phase G — Next steps

- [`canvas-component-metadata`](../../canvas-component-metadata/SKILL.md) —
  formalize props/slots in YAML; map enums for `iconName` if used.
- [`canvas-component-composability`](../../canvas-component-composability/SKILL.md)
  — confirm `feature-grid` + `feature-card` parent/child slot pattern matches
  [`repeatable-content.md`](../../canvas-component-composability/references/repeatable-content.md).
- [`canvas-component-definition`](../../canvas-component-definition/SKILL.md) —
  create folders, `index.jsx`, `mocks.json` with multiple `feature-card`
  instances in the `items` slot.
- [`implement-design`](../../implement-design/SKILL.md) — match Figma spacing
  and typography after structure is accepted.
