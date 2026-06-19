// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Static-SPA build target for Netlify hosting.
//
// On Netlify (non-Lovable-sandbox environments), Nitro is configured with the
// `static` preset and writes prerendered HTML + client assets into
// `dist/client`. No Node/Worker server is required at runtime — Netlify just
// serves the static files, and the SPA redirect in `netlify.toml` handles
// client-side routing for any unmatched deep link.
//
// Inside the Lovable sandbox, the wrapper force-pins the Cloudflare preset
// (sandbox-only) so local dev/preview keeps working unchanged; these overrides
// only take effect on real Netlify builds.
export default defineConfig({
  nitro: {
    preset: "static",
    output: {
      dir: "dist",
      publicDir: "dist/client",
      serverDir: "dist/server",
    },
    // Extra keys forwarded to Nitro (the wrapper's TS type is intentionally
    // narrow; runtime spread passes everything through).
    ...({
      prerender: {
        crawlLinks: true,
        failOnError: false,
        routes: ["/", "/menu", "/order", "/branches", "/contact"],
      },
    } as Record<string, unknown>),
  } as never,
  tanstackStart: {
    // Harmless on a static build; kept so dev SSR tooling still resolves.
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
