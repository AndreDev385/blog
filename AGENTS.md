# Blog — Agent Guide

## Identity

Personal portfolio + bilingual blog (EN/ES) for **André Izarra** (software development services). Independent silo: own repo, own stack, not part of the workspace loop. Stack and commands are public in `README.md`; this file is governance.

## Task routing

| If you want to… | Go to |
|---|---|
| Write/edit a blog post | `src/content/blog/{en,es}/` + `_internal/CONTEXT.md` (private) |
| Add/edit a project page | `src/content/projects/{en,es}/` |
| Change UI strings | `src/i18n/ui.ts` (keep `en`/`es` key parity) |
| Change page/SEO structure | `src/layouts/` + `src/pages/` |
| Know the stack or the commands | `README.md` (the public home — never restated here) |
| Know the content workflow + gates | `_internal/CONTEXT.md` |

## Critical Rules (DO NOT BREAK)

1. **Language-aware routing** — every internal link includes `{lang}`: `/${lang}/blog/...`. Never hardcode `/blog/...`.
2. **Schema validity** — posts must match `src/content.config.ts`. Description ≤ 200 chars; tags lowercase.
3. **Translation key parity** — new key in `en` ⇒ add it to `es` too.
4. **SSR mode** — only pages with `export const prerender = true` + `getStaticPaths()` generate static HTML.
5. **About Me section is commented out** in both home pages — do not re-enable without explicit request.
6. **Home meta descriptions** stay service-selling oriented; posts use their frontmatter description.
7. **No absolute URLs without SITE_URL** — use the constant in `Layout.astro` for canonical/OG/JSON-LD.
8. **Nothing deploys without André's explicit go** — pushing to `main` is the deploy, and it is a person check (`_internal/CONTEXT.md`).
9. **Voice is one home** — `../content/_shared/voice.md`; the blog never keeps its own copy.

## Private workspace

`_internal/` is gitignored (never committed). It holds `CONTEXT.md` (content-publishing contract), `PLAN.md`, and private docs. A fresh clone won't have it — restore from a local backup if needed.
