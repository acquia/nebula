---
name: canvas-headless
description: >-
  Use when working in a Canvas Headless codebase — any project with
  `@drupal-canvas/headless` or `@drupal-canvas/headless-*` in `package.json`,
  i.e. a Next.js, Nuxt, Astro, TanStack Start, or Angular app rendering Canvas
  components. Establishes what differs from Canvas-rendered React projects:
  per-framework entry files and slot consumption, portable runtime APIs,
  SDK-based data fetching, and changed push/pull/validate semantics.
---

# Canvas Headless

Canvas Headless lets an external frontend application (including Angular) render
Canvas components instead of Drupal. Components are authored in the frontend
codebase in that framework's own language, and only their **metadata** is
registered with Drupal — no component code is pushed.

This skill is the source of truth for how Canvas skills apply in a headless
codebase. Other `canvas-*` skills link here instead of restating these rules.

## Detection

A project is a Canvas Headless codebase when `package.json` lists a dependency
named `@drupal-canvas/headless` or starting with `@drupal-canvas/headless-` (in
`dependencies` or `devDependencies`). This is the same rule the Canvas CLI uses
internally.

When detected, the guidance in this skill **overrides** React-specific guidance
in other Canvas skills. When not detected, the project is a Canvas-rendered
React project and the other skills apply as written. These are the only two
project types: no headless dependency always means a React codebase.

## What stays the same

The Canvas component contract is framework-neutral and carries over unchanged:

- One folder per component named by `machineName`, containing the metadata and
  the implementation entry file
- The full `component.yml` schema: `name`, `machineName`, `status`, `required`,
  `props`, `slots`, enums with `meta:enum`, image and content entity reference
  prop shapes
- Props/slots modeling rules, repeatable-content patterns, and granularity
  checks (`canvas-component-composability`, `canvas-design-decomposition`)
- Workbench mock files (`mocks.json`) beside the component — in React projects
  only, since only Workbench reads them; do not create mocks in non-React
  projects
- Tailwind CSS 4 with `@theme` design tokens in the global CSS file configured
  by `globalCssPath` in `canvas.config.json`

## Entry files and slots per framework

The implementation entry file sits beside `component.yml` and must match the
project's framework:

| Framework                 | Entry file           | Slot consumption              |
| ------------------------- | -------------------- | ----------------------------- |
| React (Next.js, TanStack) | `index.jsx` / `.tsx` | Slots received as named props |
| Vue (Nuxt)                | `index.vue`          | `<slot name="slotKey" />`     |
| Astro                     | `index.astro`        | `<slot name="slotKey" />`     |

Discovery also accepts `.svelte` entries, but no official Svelte adapter
currently exists.

Component registration is automatic: the headless SDK generates a registry
module from the discovered components (for example under `.canvas/`). Never
write manual component-to-machine-name mappings and never edit generated
`.canvas/` files.

## Runtime APIs

React components use `usePageContext`, `useSiteContext` and `useJsonApiClient`
from `drupal-canvas/react`, handling nullable results. The renderer establishes
providers from `page.context` and nonsecret runtime configuration. Existing
`Image`, `FormattedText`, `cn` and menu/path utilities keep their public paths.
`FormattedText` still requires trusted or sanitized HTML. Region APIs remain
available but deprecated; do not add region-provider integration.

Do not call `getPageData()`, `getSiteData()` or `new JsonApiClient()` in
headless code. They are legacy Drupal/Workbench APIs; headless server code uses
the request-aware SDK `getClient()`. Authoring helpers at
`drupal-canvas/json-render-utils` are not the headless content renderer.

Native Vue, Astro and Angular components keep their framework-native rendering,
not React hooks/providers. The existing component implementations need no
rewrite:

- **Rich text / HTML props:** render with the framework's HTML-injection
  primitive (`v-html` in Vue, `set:html` in Astro, `dangerouslySetInnerHTML` in
  React)
- **Images:** the framework's image-optimization component where one exists
  (`next/image` in Next.js, `<Image>` from `astro:assets` in Astro, `<NuxtImg>`
  from `@nuxt/image` in Nuxt); otherwise a plain `<img>` element with `src`,
  `alt`, `width`, and `height` from the image prop object
- **Class composition:** the framework's own idiom (array/object class bindings
  in Vue, `class:list` in Astro, template literals or an existing utility in
  React) — follow the conventions already present in the project.
  class-variance-authority (CVA) works in any framework when the project
  installs it.

## Angular binding

Keep `provideCanvas()` in browser and server bootstrap providers. Components use
`CanvasPageStore` signals; page/site context is on `store.page()?.context`. The
tree renderer takes `tree` and `components`, not a React `context` input.
Standalone components use `index.ts` and `CanvasSlot` for named slots. Preserve
the generated browser registry/server manifest boundary and existing component
metadata.

The template's server-only wrapper mounts the JSON:API proxy using the
documented `createCanvasRequest()` accessor and always finalizes its responses.
Existing request validation and draft/session routes remain unchanged. Use
`context.server.getClient()` only on the server if adding queries; never
serialize that accessor or its client. Native Angular components must not import
React hooks or providers.

## Data fetching

Load page trees and server-side data through the headless SDK:

- **Page trees:** `fetchPage()` from the framework's adapter package. It runs
  server-side only (server components/functions in Next.js and TanStack Start,
  Nitro server routes in Nuxt, the Astro context in Astro). Pass the result to
  `CanvasComponentTree`; React renderers also receive `context={page.context}`.
- **Content queries (lists, entities, menus):** use the SDK's request-aware
  `getClient()`, which selects public or draft access from the current session.
  Its shared client uses `DefaultSerializer`: collections are arrays and fields
  are flattened onto resources, not nested under `data`/`attributes`.
- For application/server data loading and native non-React components, prefer
  the framework's idiomatic path (server components, route loaders, `useFetch`,
  Astro frontmatter). Portable React components keep using hooks and SWR.

For portable React components, follow the `useJsonApiClient()` and SWR patterns
in [`canvas-data-fetching`](../canvas-data-fetching/SKILL.md). Browser requests
use the application's same-origin SDK proxy. Credentials stay in the
server/session integration, never in page context or serialized clients.

### React integration checklist

- Pass `context={page.context}` to `CanvasComponentTree`. Components outside the
  tree need an appropriate `CanvasContextProvider`.
- Supply the SDK's nonsecret `getJsonApiRuntimeConfig()` result to the renderer.
  Next.js uses `CanvasRuntime` from `@drupal-canvas/headless-next/CanvasRuntime`
  in the root layout. TanStack Start uses server loader data with
  `JsonApiRuntimeProvider` from `@drupal-canvas/headless-react`. An explicit
  `jsonApi` tree prop is also supported. Follow the installed adapter's
  documentation.
- Ensure the adapter's JSON:API proxy is mounted at the configured path
  (`CANVAS_JSONAPI_PROXY_PATH`, default `/api/canvas/jsonapi`). Never serialize
  clients or credentials. Session failures must not silently become public
  reads.

### SWR server rendering

Normal `useSWR` rendering does not run or await its fetcher on the server.
Prefetch with `await getClient()` in server code and supply authorized,
request-scoped data through an `SWRConfig` fallback provider (a client wrapper
in Next.js). Keys and query options must match the component; use SWR's
`unstable_serialize` for array/object fallback keys, ideally sharing query/key
helpers. Keep shared component functions synchronous, not async server
components.

The renderer provides a non-null draft-aware client on both sides of hydration
when configured, so keys stay enabled and fallback data renders. That client
cannot fetch during draft SSR: attempted requests raise
`ServerRenderingDraftFetchError`. The server integration's `getClient()` is the
prefetch path; browser revalidation uses the proxy afterward.

Render available fallback data rather than hiding it behind `isLoading`.
`DefaultSerializer`'s non-enumerable `getMeta()` and `getLinks()` methods do not
survive serialization into fallback data; account for this if components use
them. Neither token renewal nor replacing the provided client clears SWR caches.
Applications own cache isolation and revalidation policy.

## CLI semantics in a headless codebase

The CLI detects the headless SDK automatically (same `package.json` rule as
above) and changes behavior without any flag:

- **`canvas push`** pushes every component as `type: external` — metadata only,
  no source or compiled code. External components on the Drupal side are created
  and updated but **never deleted** by push. A single component can also opt in
  explicitly with `type: external` in its `component.yml`.
- **`canvas pull`** excludes external components. Pull is useful once, to
  migrate previously Drupal-hosted components into the headless codebase. Review
  automatic getter conversions and remaining migration diagnostics; see
  [`canvas-data-fetching`](../canvas-data-fetching/SKILL.md#migrating-pulled-components).
- **`canvas scaffold`** is React-only. In a non-React headless project, create
  component files by hand, following an existing component in the repository.
- **`canvas build` and `canvas validate` are headless-unaware.** Expect
  `canvas build` to report "No components found. Nothing to build." in a
  headless project; this is normal and not something to fix.

## Pages, regions, and content templates

- **Global regions are not supported** in headless projects. Site chrome and
  layout belong to the framework app (its own routes and layout files, with a
  catch-all route rendering `fetchPage()` results). Do not create region specs
  or a `layout.jsx`.
- **Page specs and content templates work in headless codebases**, controlled by
  the `sync.pages` and `sync.contentTemplates` options in `canvas.config.json`.
  Only create them when the matching option is enabled. Projects generated with
  Canvas Create (`@drupal-canvas/create`) disable both by default and ship
  without `pages/` or `content-templates/` directories.

## Verification

Canvas Workbench currently supports React projects only. In React headless
projects (Next.js, TanStack Start) use Workbench as usual. In Nuxt, Astro and
Angular projects, verify components by running the framework dev server and
viewing pages rendered through `CanvasComponentTree`, including the Canvas
editor preview when connected to a Drupal site.
