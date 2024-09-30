import { c as createComponent, r as renderTemplate, a as renderComponent, b as createAstro, m as maybeRenderHead, d as addAttribute, e as renderSlot } from '../../chunks/astro/server_C1k3jRZ-.mjs';
import { g as getCollection } from '../../chunks/_astro_content_ZhrrcOpr.mjs';
/* empty css                                     */
import { c as cn, $ as $$Layout } from '../../chunks/utils_DypuczZx.mjs';
import { C as Card, $ as $$SkillBadge, s as skillIconMap } from '../../chunks/skillIconMap_8ibTACD0.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { a as avatarPic } from '../../chunks/profile_pic_BwlMZL_b.mjs';
import { format } from 'date-fns';
export { renderers } from '../../renderers.mjs';

const $$Astro$2 = createAstro();
const $$TableOfContent = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$TableOfContent;
  const { headings } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Card", Card, { "data-astro-cid-sagdtwpr": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<nav class="toc" aria-labelledby="toc-heading" data-astro-cid-sagdtwpr> <h2 id="toc-heading" class="text-lg font-semibold mb-4" data-astro-cid-sagdtwpr>Tabla Contenido</h2> <ul class="space-y-2" data-astro-cid-sagdtwpr> ${headings.map((heading) => renderTemplate`<li${addAttribute(`toc-item toc-item-${heading.depth}`, "class")} data-astro-cid-sagdtwpr> <a${addAttribute(`#${heading.slug}`, "href")} class="text-gray-700 hover:text-gray-900 hover:underline" data-astro-cid-sagdtwpr> ${heading.text} </a> </li>`)} </ul> </nav> ` })} `;
}, "/home/andre/personal/blog/src/components/TableOfContent.astro", void 0);

const Avatar = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Root,
  {
    ref,
    className: cn(
      "relative flex h-12 w-12 shrink-0 overflow-hidden rounded-full",
      className
    ),
    ...props
  }
));
Avatar.displayName = AvatarPrimitive.Root.displayName;
const AvatarImage = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Image,
  {
    ref,
    className: cn("aspect-square h-full w-full", className),
    ...props
  }
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Fallback,
  {
    ref,
    className: cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    ),
    ...props
  }
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

function Author({ publishDate }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4 my-4", children: [
    /* @__PURE__ */ jsxs(Avatar, { children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: avatarPic.src,
          width: avatarPic.width,
          height: avatarPic.height,
          alt: "André Izarra Profile Picture"
        }
      ),
      /* @__PURE__ */ jsx(AvatarFallback, { children: "AI" })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "text-lg leading-none font-bold", children: "André Izarra" }),
      /* @__PURE__ */ jsxs(
        "time",
        {
          dateTime: publishDate.toISOString(),
          className: "text-muted-foreground",
          children: [
            "Posted on ",
            format(publishDate, "dd/MM/yyyy")
          ]
        }
      )
    ] })
  ] });
}

const $$Astro$1 = createAstro();
const $$PostLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$PostLayout;
  const { post, headings } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-6xl mx-auto px-6 md:px-4 lg:px-2"> <div class="lg:flex lg:gap-8 my-16"> <article class="w-full mx-auto lg:mx-0"> <header class="mb-8 relative"> <h1 class="text-4xl font-bold text-foreground mb-2 lg:text-5xl"> ${post.data.title} </h1> ${renderComponent($$result2, "Author", Author, { "publishDate": post.data.date })} ${post.data.tags && renderTemplate`<div class="mt-2"> ${post.data.tags.map((tag) => renderTemplate`<a${addAttribute(`/tags/${tag.toLowerCase()}`, "href")}> ${renderComponent($$result2, "SkillBadge", $$SkillBadge, { "skill": skillIconMap[tag] })} </a>`)} </div>`} </header> <div class="prose prose-lg max-w-none relative"> ${renderSlot($$result2, $$slots["default"])} </div> </article> <aside class="hidden lg:block lg:w-64 flex-shrink-0"> <div class="sticky top-8"> ${renderComponent($$result2, "TableOfContent", $$TableOfContent, { "headings": headings })} </div> </aside> </div> </div> ` })}`;
}, "/home/andre/personal/blog/src/layouts/PostLayout.astro", void 0);

const $$Astro = createAstro();
async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post }
  }));
}
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { post } = Astro2.props;
  const { Content, headings } = await post.render();
  return renderTemplate`${renderComponent($$result, "PostLayout", $$PostLayout, { "post": post, "headings": headings }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Content", Content, {})} ` })}`;
}, "/home/andre/personal/blog/src/pages/blog/[slug].astro", void 0);

const $$file = "/home/andre/personal/blog/src/pages/blog/[slug].astro";
const $$url = "/blog/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
