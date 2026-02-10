---
name: canvas-component-development
description:
  Implement and modify React components following Canvas patterns. Use when (1)
  Writing or modifying component JSX, (2) Adding variants with CVA, (3)
  Structuring component folders. Covers CVA variants, cn() utility, and
  component structure.
---

## Technology Stack

| Technology                                 | Purpose                |
| ------------------------------------------ | ---------------------- |
| React 19                                   | Component framework    |
| Tailwind CSS 4.1+                          | Styling                |
| class-variance-authority (CVA)             | Component variants     |
| `clsx` + `tailwind-merge` via `cn()`       | Class name merging     |
| `FormattedText` from `@/lib/FormattedText` | Rendering HTML content |

## Component Patterns

Every component must:

- Use CVA (`cva()`) to define variant styles for components.
- Use the `cn()` utility from `@/lib/utils` to merge class names.
- Always export components as default exports.
- Accept a `className` prop for style customization.
- Use the `@/components` import alias when importing other components.
- Only use dependencies listed in the technology stack; do not add third-party
  imports or create new library utilities.
- Place each component in its own folder under `src/components/` with an
  `index.jsx` and `component.yml` file. Do not create nested folder structures.
