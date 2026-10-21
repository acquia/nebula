---
name: canvas-data-fetching
description:
  Fetch and render Drupal content in Canvas components with JSON:API and SWR
  patterns. Use when building content lists, integrating with SWR, querying
  related entities, or constructing/changing any JSON:API request — every
  generated request must be executed and verified to return the expected results
  before rendering logic is written against it. Also use for page/site context,
  breadcrumbs, branding, and language switchers. Covers useJsonApiClient,
  usePageContext, useSiteContext, DrupalJsonApiParams, relationship handling,
  filter patterns, and request verification.
---

# Data fetching

## Project type

Before applying this skill, check `package.json` for a dependency named
`@drupal-canvas/headless` or starting with `@drupal-canvas/headless-`. If one is
present, this is a Canvas Headless codebase — read
[`canvas-headless`](../canvas-headless/SKILL.md) first. In headless projects,
fetch page trees with the SDK's `fetchPage()` and server-side content with its
request-aware `getClient()`, using the framework's idiomatic data-loading path.
Portable React components use `useJsonApiClient()` from `drupal-canvas/react`
and the application's same-origin SDK proxy. The React patterns below work in
Drupal, Workbench, and React-based headless frontends. For headless server
prefetch and fallback rules, also follow `canvas-headless`; native non-React
components use their framework's data-loading patterns, not React hooks. If no
such dependency is present, this is a Canvas-rendered React codebase: components
are React (`index.jsx`/`.tsx`) and everything in this skill applies as written.
These are the only two project types.

## Portable React runtime APIs

Use `useJsonApiClient()`, `usePageContext()`, and `useSiteContext()` from
`drupal-canvas/react`. Drupal islands, Workbench, and configured headless React
renderers supply the providers. Hooks read context; they do not fetch data or
create clients on each render. Outside a Canvas tree, the integration must
supply `CanvasContextProvider` and/or `JsonApiClientProvider` as needed.

Call hooks unconditionally at the top level of components or custom hooks,
before any possible return. Each hook can return `null` when its context is
unavailable. Keep components synchronous and keep backend URLs, Drupal globals,
credentials, proxy configuration, and environment branches out of them. Pass
data or a client into helpers; do not call hooks from ordinary helpers.

`getPageData()`, `getSiteData()`, and `new JsonApiClient()` are deprecated. They
still work in Drupal and Workbench, but throw elsewhere, even when the
constructor receives an explicit backend URL. Do not use them in new code.
Existing utility imports such as `getNodePath` and `sortMenu` stay unchanged.

### Migrating pulled components

`canvas pull` can rewrite safe `getPageData()` and `getSiteData()` calls to
context hooks automatically. It requires both the connected site's
`capabilities.contextHooks` metadata and the installed `drupal-canvas/react`
entry exporting both hooks as runtime values; do not infer support from a
version number alone. If support cannot be verified, review the reported
limitation rather than forcing imports unsupported by the runtime.

Migration is all-or-nothing per component file. Unsafe hook positions,
identifier conflicts, or direct destructuring of getter results can leave a file
unchanged. Client construction and helper modules receive diagnostics, not
automatic conversion. `--skip-overwrite` files remain untouched.

After a pull, review changed sources and diagnostics. The codemod does not add
null guards or prove subsequent accesses safe; check nullable results, hook
order, types, and rendered behavior. Migrate remaining client calls manually.
Outside components/custom hooks, pass data or clients into helpers, or use
`page.context` and request-aware `getClient()` in headless server code. Preserve
access controls and never expose credentials.

### Page and site context

```jsx
import { usePageContext, useSiteContext } from 'drupal-canvas/react';

export default function PageHeader() {
  const page = usePageContext();
  const site = useSiteContext();
  if (!page || !site) return null;

  return (
    <header>
      <a href={site.branding.homeUrl}>{site.branding.siteName}</a>
      <h1>{page.pageTitle}</h1>
    </header>
  );
}
```

Page context contains `pageTitle`, `breadcrumbs`, and `mainEntity`. Even when
page context exists, `mainEntity` can be `null`; guard it before using entity
metadata, translations, or its UUID in a query. Site context contains
`branding`, `baseUrl`, and `themeAssets`; handle empty asset URLs. Preserve
Drupal-generated navigation URLs unless the application explicitly adapts them.

## Data fetching with SWR

Use [SWR](https://swr.vercel.app/) for asynchronous fetching in portable React
components. It provides caching, revalidation, and a clean hook-based API.
Page/site context reads do not need SWR.

```jsx
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Profile() {
  const { data, error } = useSWR('https://my-site.com/api/user', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  return <div>Hello, {data.name}!</div>;
}
```

## Fetching Drupal content with JSON:API

To fetch content from Drupal (e.g., articles, events, or other content types),
read the configured client with `useJsonApiClient()` from `drupal-canvas/react`
and use `DrupalJsonApiParams` for query building. Pass a `null` SWR key when the
client is unavailable. Use stable keys containing the resource and all query
inputs, so distinct filters, languages, and pagination do not share results.

Render available data, including prefetched fallback data, rather than hiding it
merely because SWR reports `isLoading`. Normal `useSWR` rendering does not run
or await its fetcher on the server. For data-filled initial HTML, the headless
application prefetches with server `getClient()` and supplies matching SWR
fallback keys; see `canvas-headless`.

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

### Verify every JSON:API request returns the expected results

Any JSON:API request you generate — for a new component, a refactor, a filter
change, an added include, a changed sort, or a new query for an existing
component — must be **executed and verified** before any rendering logic is
written or changed against it. Do not assume a query is correct because it
"looks right". Build the query, run it, and confirm the response matches
expectations.

A request is verified only after **all** of these checks pass:

- **It runs.** No HTTP error, no JSON:API error document, no client exception.
- **The result count matches expectations.** A list query should return a
  non-empty collection when content of that type exists. A filtered query should
  return fewer items than the unfiltered query (and zero only when zero is
  genuinely expected). A single-resource fetch should return one resource, not
  `null`.
- **The expected fields are present and populated** on the deserialized objects
  — including fields requested via `addFields`. Missing or consistently `null`
  fields require investigation: distinguish legitimate optional values and
  access restrictions from incorrect queries or field names.
- **Includes resolved** to real related entities, not bare references. If you
  used `addInclude`, confirm the relationship is hydrated on the deserialized
  object the component will read.
- **Filters and sorts behave as intended.** Spot-check that filtered items
  actually match the filter criteria and sorted items are in the requested
  order.

If any check fails, investigate the query, field names, content model, and
access/session state before changing rendering logic. Do not paper over an empty
or wrong response with optional chaining, fallback strings, or "looks fine in
the UI" reasoning. Re-run the probe after each fix and only proceed once the
response matches expectations.

Use the probe pattern in the next section as the default mechanism for these
checks. A probe that prints `count: 0`, `keys: []`, or a shape missing the
fields the component needs is not a green light unless that result is genuinely
expected and explained.

Draft collection reads hydrate returned items with working copies, but do not
make collection filtering/sorting use working-copy values or discover every
unpublished entity. Raw responses bypass working-copy hydration. An anonymous
probe verifies public results only; verify draft behavior through the intended
session-aware integration. Never conceal `DraftSessionError` by retrying as a
public user or treating static fallback content as a successful draft read.

### Probe the deserialized shape before coding

Before writing rendering logic, run a one-off JavaScript probe that uses the
same `JsonApiClient` call and `DrupalJsonApiParams` query pattern the component
will use. Inspect the first returned item and write the component against that
deserialized shape.

This public-data probe runs outside the Canvas runtime. Use the shared,
framework-neutral `createJsonApiClient()` factory with the resolved backend
configuration. Do not fake `window`, Drupal settings, or a runtime marker to
bypass legacy guards. For headless draft probes, use the request-aware server
`getClient()` in the application's server integration. Final React component
code uses `useJsonApiClient()`, not explicit client construction.

Use a command in this pattern:

```bash
node --input-type=module -e "
import { createJsonApiClient } from 'drupal-canvas/jsonapi-client';
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

const client = createJsonApiClient({
  baseUrl: 'https://example.ddev.site',
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
import { getNodePath } from 'drupal-canvas';
import { useJsonApiClient } from 'drupal-canvas/react';
import { DrupalJsonApiParams } from 'drupal-jsonapi-params';
import useSWR from 'swr';

const Articles = () => {
  const client = useJsonApiClient();
  const { data, error } = useSWR(
    client
      ? [
          'node--article',
          {
            queryString: new DrupalJsonApiParams()
              .addSort('created', 'DESC')
              .getQueryString(),
          },
        ]
      : null,
    ([type, options]) => client.getCollection(type, options),
  );

  if (error) return 'An error has occurred.';
  if (!data) return 'Loading...';
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
3. Resolve the JSON:API endpoint using the project's integration. Read public
   `/canvas/api/v0/site-data` metadata for the discovered prefix; do not assume
   `/jsonapi`. In headless projects, `CANVAS_JSONAPI_URL` overrides discovery;
   if discovery fails, the SDK uses the configured prefix or
   `CANVAS_JSONAPI_PREFIX`, then `jsonapi`. Preserve site installation paths.
   For a separate JSON:API site, follow the SDK's `CANVAS_JSONAPI_SITE_URL`
   guidance for language-prefixed requests. Do not assume headless-only
   configuration options are supported by Workbench.
4. Record the resolved site root and JSON:API endpoint (never credentials).
   Match these in standalone probes; use the factory's `apiUrl` override when
   appropriate, rather than substituting the API endpoint for `baseUrl`.
5. Verify that `CANVAS_SITE_URL` is the site root, not the JSON:API endpoint.
   For example, use `https://example.ddev.site`, not
   `https://example.ddev.site/jsonapi`.
6. Send an HTTP request to the resolved JSON:API endpoint. Success means HTTP
   `200`.
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
    until the effective `CANVAS_SITE_URL` and JSON:API endpoint are known.
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

## Navigation / Menu Components

Components like headers, footers, and sidebars often need menu links from
Drupal. Use a **dual implementation**: fetch from a Drupal menu when one exists,
and fall back to a static array when no menu is configured yet.

This means the component works immediately (using the hardcoded fallback), and
automatically upgrades to live Drupal-managed links once the CMS editor creates
the corresponding menu.

```jsx
import { sortMenu } from 'drupal-canvas';
import { useJsonApiClient } from 'drupal-canvas/react';
import useSWR from 'swr';

// Static fallback — always define this; it renders when no Drupal menu exists
const FALLBACK_LINKS = [
  { id: 'home', title: 'Home', url: '/' },
  { id: 'about', title: 'About', url: '/about' },
];

const Navigation = ({ menuName = 'main' }) => {
  const client = useJsonApiClient();
  const { data, error } = useSWR(
    client && menuName ? ['menu_items', menuName] : null,
    ([type, id]) => client.getResource(type, id),
  );

  // Do not disguise a rejected draft session as a successful static preview.
  if (error?.name === 'DraftSessionError') {
    return <div>Preview session expired. Reconnect the preview.</div>;
  }

  // Keep prefetched/live links visible during revalidation.
  const links = data ? Array.from(sortMenu(data)) : FALLBACK_LINKS;

  return (
    <nav>
      {links.map(({ id, title, url }) => (
        <a key={id} href={url}>
          {title}
        </a>
      ))}
    </nav>
  );
};
```

**Rules for menu components:**

- Always define a `FALLBACK_LINKS` constant with representative links. This
  makes the component useful in Workbench and on sites where the Drupal menu
  hasn't been created yet.
- Expose `menuName` as a prop and register it in `component.yml` so CMS editors
  can configure which Drupal menu to use without code changes.
- `menuName = null` disables fetching (SWR key is `null`) and renders the
  fallback — useful for pure static previews.
- After building a nav-type component, include a note in the manual steps
  summary telling the user to create the corresponding menu in Drupal at
  `/admin/structure/menu/add`.

**`component.yml` example for `menuName`:**

```yaml
props:
  properties:
    menuName:
      title: Menu name
      type: string
      examples:
        - main
        - footer
```
