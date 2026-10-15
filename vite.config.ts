// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Visitor-independent pages only. Campaign query-string details are server-rendered on demand.
const staticPaths = ["/", "/campaigns", "/causes", "/most-loved", "/events", "/blog", "/about", "/contact", "/help-center", "/guarantee", "/privacy-policy", "/terms-of-use", "/refund-cancellation-policy", "/start-yourself", "/start-family", "/start-business"];

// Outside Lovable, enabling TanStack prerender makes the config package install its own Nitro
// `compiled` hook, which displaces the Vercel preset's hook (config.json + .vc-config.json).
// Re-run the Vercel preset's `compiled` hook from the user hook the package still forwards to.
const vercelNitro = process.env['VERCEL']
  ? {
      nitro: {
        hooks: {
          async compiled(nitro: { options: { preset?: string } }) {
            const { loadOptions } = await import("nitro/builder");
            const presetOptions = await loadOptions({ preset: nitro.options.preset || "vercel" });
            const presetCompiled = (presetOptions.hooks as Record<string, unknown> | undefined)?.['compiled'];
            if (typeof presetCompiled !== "function") throw new Error("Vercel preset compiled hook not found");
            await presetCompiled(nitro);
          },
        },
      },
      // Nitro accepts hooks; the config package's narrower option type omits them.
    } as unknown as { nitro: { preset?: string } }
  : {};

export default defineConfig({
  tanstackStart: {
    pages: staticPaths.map((path) => ({ path })),
    // Never crawl links: only the enumerated pages are prerendered. Keep failures fatal.
    prerender: { enabled: true, autoStaticPathsDiscovery: false, crawlLinks: false, failOnError: true },
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  ...vercelNitro,
});
