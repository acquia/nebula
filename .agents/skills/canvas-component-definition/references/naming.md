# Naming

Use simple, generic names. Do not prefix component names with project or site
identifiers.

Use the same base name consistently across the component package:

- React component symbol: `Hero`
- `component.yml` display name: `Hero`
- `machineName` and folder name: `hero`

Default to the generic reusable noun. If the request says "simple hero", "solid
hero", "cream hero", or "two cards", the component should still usually be named
`Hero` or `Card`.

Put those distinctions somewhere else:

- Visual/style differences belong in props, variants, or mock names
- Repeated/count-based layout differences belong in composition, slots, or page
  structure
- Use a prefixed or specialized component name only when the component is truly
  one-off and not meaningfully reusable elsewhere

Avoid baking request wording into component names. Do not add adjectives,
counts, or implementation suffixes unless they describe a genuinely distinct,
non-portable component.

Do not use color names, background treatments, theme words, or surface
descriptions in the component name when they are only styling choices. Keep the
component named `Hero` or `Card` and express those differences through props,
variants, tokens, or mock names instead.

Use `kebab-case` consistently for:

- `machineName`
- component folder names
- mock filenames when the component uses the named-file pattern

## Examples

Correct:

- `footer`
- `hero`
- `navigation`
- `contact-form`

Avoid names like:

- `site-footer`
- `acme-hero`
- `mysite-navigation`
- `projectx-contact-form`
- `simple-hero`
- `solid-hero`
- `cream-hero`
- `hero-duo`
- `card-duo`
- `card-cream`
- `hero-component`

## Copying components

When copying and modifying an existing example, keep the original name unless
the component now serves a fundamentally different purpose.

When creating a new component from scratch, choose a short, descriptive,
portable name.
