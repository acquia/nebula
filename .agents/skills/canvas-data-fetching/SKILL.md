---
name: canvas-data-fetching
description:
  Fetch and render Drupal content in Canvas components with JSON:API and SWR
  patterns. Use when building content lists, integrating with SWR, or querying
  related entities. Covers JsonApiClient, DrupalJsonApiParams, relationship
  handling, and filter patterns.
---

# Data fetching

## Data fetching with SWR

Use [SWR](https://swr.vercel.app/) for all data fetching. It provides caching,
revalidation, and a clean hook-based API.

```jsx
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Profile() {
  const { data, error, isLoading } = useSWR(
    'https://my-site.com/api/user',
    fetcher,
  );

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  return <div>Hello, {data.name}!</div>;
}
```

## Fetching Drupal content with JSON:API

To fetch content from Drupal (e.g., articles, events, or other content types),
use the autoconfigured `JsonApiClient` from the `drupal-canvas` package combined
with `DrupalJsonApiParams` for query building.

**Important:** Keep the default serializer enabled in final component code. The
runtime contract for Canvas components is the deserialized shape returned by
`JsonApiClient`, not the raw JSON:API document shape.

**Important:** Do not fabricate JSON:API resource payloads in Workbench mocks.
Components that fetch data should render their real loading, empty, or error
states in Workbench unless the user explicitly asks for a static, non-fetching
preview shape.

### Raw JSON:API vs deserialized Canvas data

Do not write component logic from raw JSON:API assumptions such as
`data[0].attributes.title` or `data[0].relationships.field_image`. Components
using `JsonApiClient` receive deserialized objects instead.

- Use plain HTTP requests only for connectivity checks and broad endpoint
  existence.
- Use `JsonApiClient` to inspect the actual shape your component will consume.
- If you inspect the raw JSON:API document for debugging, treat it as a
  secondary diagnostic view, not the source of truth for component code.
- Do not disable the serializer in final component code.

### Probe the deserialized shape before coding

Before writing rendering logic, run a one-off JavaScript probe that uses the
same `JsonApiClient` call and `DrupalJsonApiParams` query pattern the component
will use. Inspect the first returned item and write the component against that
deserialized shape.

This probe runs outside the Canvas runtime, so it must provide `baseUrl` and
`apiPrefix` explicitly. Final component code should not copy that setup;
Canvas-provided component code should use the normal autoconfigured
`new JsonApiClient()` path instead.

Use a command in this pattern:

```bash
node --input-type=module -e "
globalThis.window = {};
import { JsonApiClient } from 'drupal-canvas';
import { DrupalJsonApiParams } from 'drupal-jsonapi-params';

const describeShape = (value) => {
  if (Array.isArray(value)) {
    return value.length > 0 ? [describeShape(value[0])] : ['empty-array'];
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [key, describeShape(nestedValue)]),
    );
  }
  if (value === null) {
    return 'null';
  }
  return typeof value;
};

const client = new JsonApiClient('https://example.ddev.site', {
  apiPrefix: 'jsonapi',
});
const queryString = new DrupalJsonApiParams()
  .addSort('created', 'DESC')
  .addFields('node--article', ['title', 'created', 'body', 'path'])
  .getQueryString();

const items = await client.getCollection('node--article', { queryString });
const first = items?.[0];

console.log('count:', items?.length ?? 0);
console.log('keys:', first ? Object.keys(first) : []);
console.log('shape:', JSON.stringify(first ? describeShape(first) : null, null, 2));
console.log(JSON.stringify(first, null, 2));
"
```

Pass the site root as `baseUrl`, not the `/jsonapi` endpoint. Adjust the
resource type, filters, includes, sorts, and fields to match the component you
are building. Do not inspect one query shape and implement a different one in
the component.

If this probe fails in a local HTTPS development environment, check whether Node
trusts the local certificate chain before assuming the JSON:API client or query
is wrong.

```jsx
import { getNodePath, JsonApiClient } from 'drupal-canvas';
import { DrupalJsonApiParams } from 'drupal-jsonapi-params';
import useSWR from 'swr';

const Articles = () => {
  const client = new JsonApiClient();
  const { data, error, isLoading } = useSWR(
    [
      'node--article',
      {
        queryString: new DrupalJsonApiParams()
          .addSort('created', 'DESC')
          .getQueryString(),
      },
    ],
    ([type, options]) => client.getCollection(type, options),
  );

  if (error) return 'An error has occurred.';
  if (isLoading) return 'Loading...';
  return (
    <ul>
      {data.map((article) => (
        <li key={article.id}>
          <a href={getNodePath(article)}>{article.title}</a>
        </li>
      ))}
    </ul>
  );
};

export default Articles;
```

### Including relationships with `addInclude`

When you need related entities (e.g., images, taxonomy terms), use `addInclude`
to fetch them in a single request.

**Avoid circular references in JSON:API responses.** SWR uses deep equality
checks to compare cached data, which fails with "too much recursion" errors when
the response contains circular references.

**Do not include self-referential fields.** Fields that reference the same
entity type being queried (e.g., `field_related_articles` on an article query)
create circular references: Article A references Article B, which references
back to Article A. If you need related content of the same type, fetch it in a
separate query.

**Use `addFields` to limit the response.** Always specify only the fields you
need. This improves performance and helps avoid circular reference issues:

```jsx
const params = new DrupalJsonApiParams();
params.addSort('created', 'DESC');
params.addInclude(['field_category', 'field_image']);

// Limit fields for each entity type
params.addFields('node--article', [
  'title',
  'created',
  'field_category',
  'field_image',
]);
params.addFields('taxonomy_term--categories', ['name']);
params.addFields('file--file', ['uri', 'url']);
```

## Creating content list components

When building a component that displays a list of content items (e.g., a news
listing, event calendar, or resource library), follow this workflow:

### Setup gate

Before any JSON:API discovery or content-type checks, verify local setup:

1. Resolve Canvas config values before writing code or probing Drupal. Check, in
   this order:
   - shell environment variables
   - `.env` in the project root
   - `~/.canvasrc`
2. Determine the effective `CANVAS_SITE_URL`.
3. Determine the effective `CANVAS_JSONAPI_PREFIX`. If it is not set, default to
   `jsonapi`.
4. Record the resolved values before continuing:
   - `CANVAS_SITE_URL=<resolved site root>`
   - `CANVAS_JSONAPI_PREFIX=<resolved prefix>`
5. Verify that `CANVAS_SITE_URL` is the site root, not the JSON:API endpoint.
   For example, use `https://example.ddev.site`, not
   `https://example.ddev.site/jsonapi`.
6. Send an HTTP request to `{CANVAS_SITE_URL}/{resolved JSON:API prefix}`.
   Success means HTTP `200`.
7. If the request is successful, continue with Drupal data fetching.
8. If the request is unsuccessful (or required values are missing), ask the user
   whether they want to:
   - Configure Drupal connectivity now, or
   - Continue with static content instead of Drupal fetching.
9. If the user chooses to configure connectivity, provide setup instructions:
   - `CANVAS_SITE_URL=<their Drupal site root>`
   - `CANVAS_JSONAPI_PREFIX=jsonapi` (optional; defaults to `jsonapi`) Then wait
     for the user to confirm they updated shell env, `.env`, or `~/.canvasrc`,
     and resolve the values again before retrying the request.
10. If the user chooses not to configure connectivity, proceed with static
    content.
11. Do not start content-type discovery, field inspection, or component coding
    until the effective `CANVAS_SITE_URL` and JSON:API prefix are known.
12. Do not update Vite config (`vite.config.*`) to troubleshoot connectivity.
    Connectivity issues must be resolved via correct config values and Drupal
    site availability, not build tooling changes.

### Step 1: Analyze the list structure

Examine the design to understand what data each list item needs:

- What fields are displayed (title, date, image, category, etc.)?
- How are items sorted (newest first, alphabetical, etc.)?
- Are there filters or pagination?

### Step 2: Identify or request the content type

Before writing code, verify that an appropriate content type exists in Drupal:

1. Check the JSON:API endpoint of your local Drupal site (configured via the
   resolved `CANVAS_SITE_URL` and JSON:API prefix from the Setup gate) to find a
   content type that matches the required structure. A plain HTTP request is
   acceptable for endpoint discovery only, after passing the Setup gate.

2. If a matching content type exists, use it and note which fields are
   available.

3. Inspect a sample response through `JsonApiClient` using the same resource
   type and query pattern the component will use. Run a one-off probe command,
   inspect the first returned item, and verify the deserialized field shape
   before writing rendering logic.

4. If no matching content type exists, **stop and prompt the user** to create
   one. Provide:
   - A suggested content type name
   - The required field structure based on the list design

### Step 3: Build the component

Create the content list component using JSON:API to fetch content. Only use
fields that actually exist on the content type and on the deserialized objects
returned by `JsonApiClient`—do not assume raw JSON:API field nesting will match
the runtime data shape.

### Handling filters

If the list includes filters based on entity reference fields (e.g., filter by
category, filter by author):

- **Do not hardcode filter options.** Filter options should be fetched
  dynamically using JSON:API.
- Fetch the available options for each filter (e.g., all taxonomy terms in a
  vocabulary) and populate the filter UI from that data.

This ensures filters stay in sync with the actual content in Drupal and new
options appear automatically without code changes.
