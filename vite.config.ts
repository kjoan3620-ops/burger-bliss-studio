// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Disable Nitro entirely — produce a Vite-only static SPA build in dist/client
  // for Netlify static hosting. No Node/Worker server required at runtime;
  // client-side routing is handled by the SPA redirect in netlify.toml.
  nitro: false,
  tanstackStart: {
    // Harmless when nitro is disabled; kept so dev/SSR tooling still resolves.
    server: { entry: "server" },
  },
});
