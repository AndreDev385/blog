# André Izarra — Portfolio & Blog

Personal portfolio and bilingual blog for **André Izarra**, software developer (Go, TypeScript, React, Astro). The site sells services: web development, solution design, and delivery — with an English and a Spanish version.

**Live:** https://andre-izarra.netlify.app · **EN:** `/en/` · **ES:** `/es/`

## Stack

| Concern    | Choice |
| ---------- | ------ |
| Framework  | Astro 6 (`.astro` + React 19 islands) |
| Styling    | Tailwind CSS 4 (via `@tailwindcss/vite`) |
| UI         | Radix UI primitives + custom components |
| Icons      | astro-icon (devicon, logos, mdi, tabler, simple-icons) |
| Content    | Astro Content Collections (`blog`, `projects`) |
| i18n       | Custom key-value maps in `src/i18n/ui.ts` |
| Deploy     | Netlify (SSR via `@astrojs/netlify`) |
| Images     | sirv.com CDN (external), `passthroughImageService` |

## Commands

```sh
pnpm install      # install dependencies
pnpm dev          # local dev server
pnpm build        # astro check + production build
pnpm preview      # preview the production build
pnpm format       # prettier over the repo
```

## Project structure

```
src/
├── layouts/        # Global shell (Layout.astro) + post wrapper (PostLayout.astro)
├── pages/          # / (redirect to /es/), /en/*, /es/*, sitemap.xml.ts
├── content/
│   ├── content.config.ts  # Collection schemas (blog, projects)
│   ├── blog/{en,es}/    # Bilingual blog posts (markdown)
│   └── projects/{en,es}/ # Project pages (markdown)
├── modules/        # blog, portfolio, projects feature modules
├── components/     # Shared components (Author, SkillBadge, ui/)
├── i18n/           # Translation strings + helpers
└── lib/            # Utilities, skill icon map
```

## Content conventions

- **Bilingual parity** — every post should exist in `en/` and `es/` with matching slugs (`/en/blog/<slug>` and `/es/blog/<slug>`).
- **Frontmatter** — `title`, `description` (max 200 chars), `date`, lowercase `tags`, `image` with descriptive SEO-friendly alt text.
- **Internal links** always include the language prefix: `/${lang}/blog/...` — never hardcode `/blog/...`.

## Deploy

Push to `main` → Netlify builds and deploys automatically (SSR output). The dynamic sitemap lives at `src/pages/sitemap.xml.ts`.

## License

© André Izarra. All rights reserved.
