// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";
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
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    icon(),
  ],
  output: "server",
  adapter: netlify(),
});
