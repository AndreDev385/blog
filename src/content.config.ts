import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const testimonialSchema = z.object({
  quote: z.string(),
  author: z.string(),
  role: z.string(),
  company: z.string().optional(),
  photo: z.string().optional(),
  linkedin: z.string().optional(),
});

const benefitSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string().optional(),
});

const beforeAfterSchema = z.object({
  aspect: z.string(),
  before: z.string(),
  after: z.string(),
  improvement: z.string().optional(),
  imageBefore: z.string().optional(),
  imageAfter: z.string().optional(),
});

const archAreaSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  features: z.array(z.string()),
  tech: z.array(z.string()),
  image: z.string().optional(),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(200),
    date: z.date(),
    tags: z.array(z.string().toLowerCase()),
    image: z.string(),
  }),
});

const projects = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/projects",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    images: z.array(z.string()).optional(),
    logo: z.string().optional(),
    link: z.string().optional(),
    order: z.number().optional(),
    problem: z.string().optional(),
    role: z.string().optional(),
    archAreas: z.array(archAreaSchema).optional(),
    benefits: z.array(benefitSchema).optional(),
    testimonials: z.array(testimonialSchema).optional(),
    beforeAfter: z.array(beforeAfterSchema).optional(),
    techStack: z.array(z.string()).optional(),
  }),
});

export const collections = { blog, projects };
