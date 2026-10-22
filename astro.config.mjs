// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import icon from "astro-icon";

import remarkToc from "remark-toc";

import netlify from "@astrojs/netlify";

// `astro dev` runs without Netlify's feature emulator. The emulator boots a
// Deno server via `deno eval --allow-scripts`, a flag `deno eval` doesn't
// accept (it's a `deno run` flag — bug in @netlify/edge-functions-dev@1.0.20),
// so it crashes and throws an "UnhandledRejection" overlay on every page load.
// This site uses none of the emulated features (no edge functions, no blobs,
// imageCDN off); Astro's dev server covers everything locally. Builds are
// unaffected — the build plugin still emits the SSR function.
if (process.argv.includes("dev")) {
  process.env.NETLIFY_DEV = "1";
}

export default defineConfig({
  markdown: {
    remarkPlugins: [[remarkToc, { heading: "toc", maxDepth: 3 }]],
  },
  image: {
    service: passthroughImageService(),
    domains: ["https://andre385.sirv.com"],
  },
  integrations: [react(), icon()],
  vite: {
    plugins: [tailwindcss()],
  },
  output: "server",
  adapter: netlify({
    imageCDN: false,
  }),
});
