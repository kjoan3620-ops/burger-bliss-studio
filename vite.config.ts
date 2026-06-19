// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
// Pure-Vite static SPA build for Netlify hosting.
//
// We intentionally bypass the TanStack Start SSR plugin here — the project's
// routes and components only use `@tanstack/react-router`, so the app runs
// fine as a client-rendered SPA. `vite build` emits a complete `dist/client`
// folder (index.html + hashed JS/CSS/assets), with no Node/Worker server
// needed at runtime. `netlify.toml`'s `/* → /index.html` redirect makes
// client-side routing work on refresh and deep links.
//
// `src/server.ts` and `src/start.ts` are kept untouched — they are dead code
// in this build (nothing imports them) and remain available if SSR is ever
// re-enabled.
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [
    TanStackRouterVite({
      target: "react",
      autoCodeSplitting: true,
      routesDirectory: "src/routes",
      generatedRouteTree: "src/routeTree.gen.ts",
    }),
    react(),
    tailwindcss(),
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
  ],
  build: {
    outDir: "dist/client",
    emptyOutDir: true,
  },
  server: {
    host: "::",
    port: 8080,
    strictPort: true,
  },
  preview: {
    host: "::",
    port: 8080,
  },
});
