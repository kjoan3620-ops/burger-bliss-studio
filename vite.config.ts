// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Force a fully static build: Nitro emits prerendered HTML + client assets into
// dist/client, with no Node/Worker server required at runtime (Netlify static).
process.env.NITRO_PRESET = "static";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    prerender: {
      enabled: true,
      crawlLinks: true,
      failOnError: false,
    },
    pages: [
      { path: "/", prerender: { enabled: true, crawlLinks: true } },
      { path: "/menu", prerender: { enabled: true } },
      { path: "/order", prerender: { enabled: true } },
      { path: "/branches", prerender: { enabled: true } },
      { path: "/contact", prerender: { enabled: true } },
    ],
  },
});
