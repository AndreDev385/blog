import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

const SITE_URL = "https://andre-izarra.netlify.app";

function xmlEncode(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const GET: APIRoute = async () => {
  const entries: string[] = [];

  // Static pages
  const staticPages = [
    { url: "/", priority: "0.9" },
    { url: "/en/", priority: "1.0" },
    { url: "/es/", priority: "1.0" },
  ];

  for (const page of staticPages) {
    entries.push(`
  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page.priority}</priority>
  </url>`);
  }

  // Blog posts
  const blogPosts = await getCollection("blog");
  blogPosts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  for (const post of blogPosts) {
    const [lang, ...slugParts] = post.id.split("/");
    const slug = slugParts.join("/");
    entries.push(`
  <url>
    <loc>${SITE_URL}/${lang}/blog/${xmlEncode(slug)}</loc>
    <lastmod>${post.data.date.toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`);
  }

  // Tag pages
  const tags: Set<string> = new Set();
  for (const post of blogPosts) {
    for (const tag of post.data.tags) {
      tags.add(tag);
    }
  }

  const langs = ["en", "es"];
  for (const lang of langs) {
    const langTag = lang === "es" ? "todos" : "all";
    entries.push(`
  <url>
    <loc>${SITE_URL}/${lang}/tags/${langTag}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>`);
  }

  for (const lang of langs) {
    for (const tag of tags) {
      entries.push(`
  <url>
    <loc>${SITE_URL}/${lang}/tags/${xmlEncode(tag)}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>`);
    }
  }

  // Project pages
  const projects = await getCollection("projects");
  for (const project of projects) {
    const [lang, ...slugParts] = project.id.split("/");
    const slug = slugParts.join("/");
    entries.push(`
  <url>
    <loc>${SITE_URL}/${lang}/projects/${xmlEncode(slug)}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`);
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries.join("")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
