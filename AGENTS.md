# Blog — Agent Guide

## Identity

Personal portfolio + bilingual blog (EN/ES) for **André Izarra** (software development services). Built with **Astro 6** (SSR), deployed on **Netlify**.

## Stack (current)

Astro 6 · React 19 islands · Tailwind CSS 4 · Radix UI · astro-icon · Astro Content Collections (`blog`, `projects`) · custom i18n (`src/i18n/ui.ts`) · Netlify SSR (`@astrojs/netlify`) · sirv.com CDN images.

## Project Map

```
src/
├── layouts/        Layout.astro (shell + SEO/JSON-LD) · PostLayout.astro
├── pages/          / (redirect → /es/) · 404 · en/ · es/ · sitemap.xml.ts
│   └── [lang]/     blog/[slug].astro · tags/[tag].astro · projects/[slug].astro
├── content/        content.config.ts (schemas) · blog/{en,es}/ · projects/{en,es}/
├── modules/        blog/ portfolio/ projects/
├── components/     shared (Author, SkillBadge, ui/)
├── i18n/           ui.ts (en+es maps) · utils.ts
└── lib/            utils, skillIconMap, resolvePhoto
```

## Routing

| If you want to… | Go to |
|---|---|
| Write/edit a blog post | `src/content/blog/{en,es}/` + `_internal/CONTEXT.md` (private) |
| Add/edit a project page | `src/content/projects/{en,es}/` |
| Change UI strings | `src/i18n/ui.ts` (keep `en`/`es` key parity) |
| Change page/SEO structure | `src/layouts/` + `src/pages/` |
| Commands | `pnpm dev` · `pnpm build` (astro check + build) · `pnpm preview` · `pnpm format` |

## Critical Rules (DO NOT BREAK)

1. **Language-aware routing** — every internal link includes `{lang}`: `/${lang}/blog/...`. Never hardcode `/blog/...`.
2. **Schema validity** — posts must match `src/content.config.ts`. Description ≤ 200 chars; tags lowercase.
3. **Translation key parity** — new key in `en` ⇒ add it to `es` too.
4. **SSR mode** — only pages with `export const prerender = true` + `getStaticPaths()` generate static HTML.
5. **About Me section is commented out** in both home pages — do not re-enable without explicit request.
6. **Home meta descriptions** stay service-selling oriented; posts use their frontmatter description.
7. **No absolute URLs without SITE_URL** — use the constant in `Layout.astro` for canonical/OG/JSON-LD.

## Private workspace

`_internal/` is gitignored (never committed). It holds `CONTEXT.md` (content-publishing contract), `PLAN.md`, and private docs. A fresh clone won't have it — restore from a local backup if needed.
