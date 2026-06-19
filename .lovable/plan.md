## Goal
Convert the project's build target from Cloudflare Worker SSR to a fully static SPA suitable for Netlify static hosting, with zero visual or component changes.

## Approach
The project uses `@lovable.dev/vite-tanstack-config`, which wires TanStack Start + Nitro. The cleanest way to produce a static `dist/client` output without changing any app code is to switch the Nitro preset to a static one and enable prerendering of all routes, while keeping the SSR entry harmless and unused at runtime.

## Changes

### 1. `vite.config.ts`
Update to:
- Keep the existing `server: { entry: "server" }` (harmless).
- Add a `nitro` override forcing the static preset and prerender of every route:
  ```ts
  nitro: {
    preset: "static",
    prerender: {
      crawlLinks: true,
      routes: ["/", "/menu", "/order", "/branches", "/contact"],
      failOnError: false,
    },
  },
  ```
  This makes Nitro emit prerendered HTML for every route plus the client bundle, with no Node server needed at runtime.

If the Lovable wrapper does not accept a top-level `nitro` key, fall back to:
```ts
vite: { /* unchanged */ },
tanstackStart: {
  server: { entry: "server" },
  prerender: { enabled: true, crawlLinks: true, routes: [...] },
  pages: [...],
},
```
and set `process.env.NITRO_PRESET = "static"` at the top of `vite.config.ts`.

### 2. `netlify.toml`
Already correct (`publish = "dist/client"` + SPA redirect). Keep as is; only confirm during verification. The SPA redirect serves `index.html` for any unknown deep link, so client routing keeps working even if a route somehow misses prerender.

### 3. `src/server.ts` and `src/start.ts`
Leave untouched. They are unused at runtime once the output is static — Nitro still bundles them during build, but no server runs in production.

### 4. Verification
Run `bun run build` and confirm:
- `dist/client/index.html` exists and contains hashed JS/CSS references.
- `dist/client/menu/index.html`, `/order/index.html`, `/branches/index.html`, `/contact/index.html` exist (prerendered).
- No `dist/server` runtime is required to serve the site.

If any route fails to prerender (e.g. uses a server function during SSR), document it and rely on the SPA `/* → /index.html` fallback so it still loads client-side on Netlify.

## Not changing
Routes, components, styles, Tailwind, images, fonts, asset imports, cart logic, menu data — all untouched. This is purely a build-target/config change.
