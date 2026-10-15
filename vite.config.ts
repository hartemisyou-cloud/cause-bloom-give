// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    pages: [{"path": "/"}, {"path": "/campaigns"}, {"path": "/causes"}, {"path": "/most-loved"}, {"path": "/events"}, {"path": "/blog"}, {"path": "/about"}, {"path": "/contact"}, {"path": "/help-center"}, {"path": "/guarantee"}, {"path": "/privacy-policy"}, {"path": "/terms-of-use"}, {"path": "/refund-cancellation-policy"}, {"path": "/start-yourself"}, {"path": "/start-family"}, {"path": "/start-business"}],
    // Only the enumerated pages are prerendered; never crawl links (campaign query-string details render on demand).
    prerender: { enabled: true, autoStaticPathsDiscovery: false, crawlLinks: false, failOnError: true },
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
