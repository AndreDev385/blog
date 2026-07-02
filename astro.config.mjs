// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import icon from "astro-icon";

import remarkToc from "remark-toc";

import netlify from "@astrojs/netlify";

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
