# Component Mocks

Canvas Workbench is the supported tool for local component preview work.

Use these rules when authoring component mocks:

## File naming and placement

Author the mock file beside the component source and metadata.

- Use `mocks.json`

## Choose the simplest mock format that fits

Every mock entry needs a `name`. Workbench uses it as the preview tab label.
Author mock files as a JSON object with a top-level `mocks` array.

Workbench already provides a built-in `Default` tab that renders the component
using the first example value for each prop from `component.yml`.

- Do not author a mock named `Default`
- Do not create a second mock that duplicates the built-in `Default` preview
- Add authored mocks only for additional preview states that the built-in
  `Default` tab does not cover

Choose descriptive names that explain what is different about the preview, such
as `Dark`, `Featured`, `Centered`, or `Full width`.

Use mock names to describe states and variations. Do not rename the component to
match those states. For example, keep the component name `Hero` and use mock
names like `Simple`, `Solid`, `Cream background`, or `Two cards` when those are
just preview variations.

## Cover meaningful variations

Workbench mocks are not only for proving that a component renders. They should
also make important authoring choices easy to review.

- Add mocks for meaningful prop variations, especially when a prop changes the
  visual design, layout, density, emphasis, or component behavior
- Prefer a small set of representative states over a mock for every possible
  combination
- Include at least one mock for each meaningful enum or boolean state when that
  state materially changes what reviewers need to validate
- Add combined states when the interaction between props is important, such as a
  dark variant inside a dark section, or a full-width action with a large size
- Skip redundant mocks when the built-in `Default` tab already covers the state
  well and no additional review value is gained

For example, if a button component supports `tone`, `size`, and `fullWidth`, a
good mock set might include `Teal`, `Surface`, `Large`, and `Full width` rather
than only a single custom state.

### Props format

Use this when only root props change.

```json
{
  "mocks": [
    {
      "name": "Centered",
      "props": {
        "text": "Publish AI-assisted content with editorial control",
        "eyebrow": "Build faster",
        "textAlign": "center"
      }
    }
  ]
}
```

### Props and slots format

Use this when the root component needs props and authored slot content.

- Put root prop values in `props`
- Map each slot name to an array of element IDs in `slots`
- Define those element IDs in `elements`
- Every element in `elements` must include a discovered component `type`
- Use the component's discovered machine-readable name as the `type` value, such
  as `card`, `heading`, or another component name that Workbench finds in the
  local project

```json
{
  "mocks": [
    {
      "name": "Featured",
      "props": {
        "featured": true
      },
      "slots": {
        "header": ["card-header"],
        "content": ["card-content"]
      },
      "elements": {
        "card-header": {
          "type": "heading",
          "props": {
            "text": "Featured article"
          }
        },
        "card-content": {
          "type": "text",
          "props": {
            "content": "Review the latest guidance for authoring Workbench component mocks."
          }
        }
      }
    }
  ]
}
```

### Advanced format

Use this only when the rendered root must be controlled directly, for example to
preview the component inside another component or layout.

- Set `root` to the root element ID
- Define the entire rendered element tree in `elements`

## Validation

Validate every authored mock before finishing.

Use the published schema:

`https://git.drupalcode.org/project/canvas/-/raw/1.x/packages/workbench/src/lib/schemas/component-mocks.schema.json`

Example with `ajv-cli`:

```bash
npx ajv-cli validate \
  --spec=draft2020 \
  -s https://git.drupalcode.org/project/canvas/-/raw/1.x/packages/workbench/src/lib/schemas/component-mocks.schema.json \
  -d path/to/mock.validation.json
```
