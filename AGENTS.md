# Blog — Agent Guide

## Identity

Personal portfolio + blog for André Izarra. A service-selling site (software development) with bilingual content (English/Spanish). Built with **Astro 4**, deployed on **Netlify** (SSR).

## Tech Stack

| Concern    | Choice                                                          |
| ---------- | --------------------------------------------------------------- |
| Framework  | Astro 4 (`.astro`, some `.tsx` React islands)                   |
| Styling    | Tailwind CSS 3 via `@astrojs/tailwind`                          |
| UI Library | Radix UI primitives (avatar, button, card, badge, tag)          |
| Icons      | astro-icon (Iconify sets: devicon, logos, mdi, tabler)          |
| Content    | Astro Content Collections (`blog`, `projects`)                  |
| i18n       | Custom: `src/i18n/ui.ts` (key-value maps) + `src/i18n/utils.ts` |
| Deployment | Netlify SSR (`@astrojs/netlify`, `output: "server"`)            |
| Images     | sirv.com CDN (external), `passthroughImageService`              |

## Project Map

```
src/
├── layouts/
│   ├── Layout.astro          ← Global HTML shell, meta tags, JSON-LD
│   └── PostLayout.astro      ← Blog post wrapper, BlogPosting JSON-LD
├── pages/
│   ├── index.astro           ← Redirect to /es/
│   ├── 404.astro
│   ├── en/index.astro        ← English homepage
│   ├── es/index.astro        ← Spanish homepage
│   ├── sitemap.xml.ts        ← Dynamic sitemap endpoint
│   └── [lang]/
│       ├── blog/[slug].astro ← Blog post route
│       ├── tags/[tag].astro  ← Tag-filtered blog listing
│       └── projects/[slug].astro ← Project detail route
├── content/
│   ├── config.ts             ← Collection schemas (blog, projects)
│   ├── blog/{en,es}/         ← Blog posts (markdown)
│   └── projects/{en,es}/     ← Project pages (markdown)
├── modules/
│   ├── blog/                 ← PostCard, TableOfContent, utils
│   ├── portfolio/            ← Hero, AboutMe, Experience, SocialIcons
│   └── projects/             ← ProjectCard, ProjectLayout
├── components/               ← Shared (Author, SkillBadge, ui/)
├── i18n/
│   ├── ui.ts                 ← All translation strings
│   └── utils.ts              ← getLangFromUrl(), useTranslations()
└── lib/                      ← Utilities, skillIconMap
```

## Key Conventions

### i18n Routing

- URL pattern: `/{lang}/...` where `lang` is `en` or `es`
- `getLangFromUrl(Astro.url)` extracts the language from pathname
- All UI strings live in `src/i18n/ui.ts` — two objects (`en`, `es`) with matching keys
- Blog/project content lives in `src/content/{collection}/{lang}/` — slug prefix determines language

### Content Collections

- **blog**: title, description (max 200 chars), date, tags (lowercase), image
- **projects**: title, description, logo, link, order, benefits[], results[], beforeAfter[], techStack[]
- Schemas in `src/content/config.ts` — validate at build time
- Tags are lowercased automatically via `.toLowerCase()` in schema

### Styling

- Tailwind CSS utility classes throughout
- No styled-components or CSS modules
- Custom markdown prose styles in `src/styles/markdown.css`
- Animation: `ScrollReveal` component + `animate.css` classes

### Images

- External CDN: `https://andre385.sirv.com/...`
- Astro `<Image>` component for local assets (in `src/assets/`)
- Regular `<img>` for external URLs
- Alt text must be descriptive and SEO-friendly (no "post image" or "profile")

## SEO Architecture

### Meta Tags — `src/layouts/Layout.astro`

- `title`, `description`, `og:*`, `twitter:*`, `canonical` all dynamic
- Props: `title?: string`, `description?: string`
- Falls back to bilingual defaults (service-oriented) when not provided
- `pageDescription` flows into OG, Twitter, and WebSite JSON-LD

### JSON-LD Structured Data

| Schema      | File                  | Trigger                               |
| ----------- | --------------------- | ------------------------------------- |
| Person      | `Layout.astro`        | Every page (sameAs: GitHub, LinkedIn) |
| WebSite     | `Layout.astro`        | Every page (includes SearchAction)    |
| BlogPosting | `PostLayout.astro`    | Blog detail pages                     |
| Product     | `ProjectLayout.astro` | Project detail pages                  |

To add a new schema type, edit the respective layout file and extend the `<script type="application/ld+json">` block.

### Image Alt Text

- **PostCard**: `alt={"Featured image for \"${post.data.title}\""}`
- **Author avatar**: `"André Izarra, software developer and blogger"`
- **AboutMe photo**: `"André Izarra, full-stack software developer with 4+ years of experience"`
- **Blog markdown**: Every `![...]()` should have descriptive text (not just the tool name)

### Sitemap

- **Dynamic endpoint**: `src/pages/sitemap.xml.ts`
- Generates URLs for: home pages, all blog posts, all tag pages, all projects
- Includes `lastmod`, `changefreq`, `priority`
- Referenced from `public/robots.txt`
- Submit to Google Search Console at `https://andre-izarra.netlify.app/sitemap.xml`

## Critical Rules (DO NOT BREAK)

1. **Language-aware routing** — Every internal link must include the `{lang}` prefix. Never hardcode `/blog/...` — use `/${lang}/blog/...`
2. **Content collection validation** — Blog posts must match the schema in `config.ts`. Description max 200 chars. Tags are auto-lowercased.
3. **Translation key parity** — Every key in `ui.ts`'s `en` object must exist in `es`. If you add a new key, add both translations.
4. **SSR mode** — `output: "server"`. Only pages with `export const prerender = true` + `getStaticPaths()` generate static HTML. Everything else is server-rendered on Netlify.
5. **About Me section is commented out** — `// import AboutMe` and `{/* <AboutMe /> */}` in both home pages. Do not re-enable without explicit request.
6. **Meta descriptions** — Should always be service-selling oriented for the home page. Blog posts use their frontmatter description.
7. **No absolute URLs without SITE_URL** — Use the `SITE_URL` constant in Layout.astro (`https://andre-izarra.netlify.app`) for canonical/OG/JSON-LD URLs.
