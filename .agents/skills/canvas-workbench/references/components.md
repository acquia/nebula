# Workbench Components

Canvas Workbench is the supported tool for local component review.

Use it to:

- Open a component's built-in `Default` preview
- Review authored `mocks.json` states
- Verify component changes in the normal implementation loop

Component preview files live beside the component source, not in a central
stories directory.

```
<components-root>/my-card/
├── index.jsx
├── component.yml
└── mocks.json
```

The built-in `Default` tab renders from `component.yml` example values. Add
`mocks.json` when the built-in preview is not enough to review meaningful
states.

For detailed `mocks.json` rules, formats, naming, and schema validation, use:

`canvas-component-definition/references/component-mocks.md`
