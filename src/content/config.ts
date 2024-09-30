import { defineCollection, z } from "astro:content";

export const collections = {
  blog: defineCollection({
    schema: ({ image }) =>
      z.object({
        title: z.string(),
        description: z.string().max(200),
        date: z.date(),
        tags: z.array(z.string().toLowerCase()),
        image: image(),
      }),
  }),
};
