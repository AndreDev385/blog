import { c as createComponent, r as renderTemplate, a as renderComponent, g as createAstro, m as maybeRenderHead, b as addAttribute } from '../../chunks/astro/server_DsdFTbeo.mjs';
import { C as Card, a as CardHeader, b as CardContent, $ as $$SkillBadge, s as skillIconMap } from '../../chunks/skillIconMap_sl3tNAGT.mjs';
import { $ as $$Image } from '../../chunks/_astro_assets_CY0kQrrq.mjs';
import { $ as $$Layout } from '../../chunks/utils_DQuf-To1.mjs';
import { jsx } from 'react/jsx-runtime';
import { g as getCollection } from '../../chunks/_astro_content_ClaGEkMa.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro$1 = createAstro();
const $$PostCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$PostCard;
  const { post } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Card", Card, { "id": post.data.title, "className": "card group gap-4 border border-black/10 transition-all duration-300 hover:shadow-[0px_4px_64px_0px_rgba(148,163,184,0.6)] dark:border-white/10 grid grid-cols-1 md:grid-cols-2" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<a${addAttribute(`/blog/${post.slug}`, "href")}> <div class="grid gap-4"> ${renderComponent($$result2, "CardHeader", CardHeader, {}, { "default": ($$result3) => renderTemplate` <h2 class="text-3xl font-bold leading-tight">${post.data.title}</h2> ` })} ${renderComponent($$result2, "CardContent", CardContent, { "className": "grid grid-cols-5 gap-4" }, { "default": ($$result3) => renderTemplate` <div class="col-span-5 space-y-4"> <time${addAttribute(post.data.date.toISOString(), "datetime")}>Posted on ${post.data.date.toLocaleDateString()}</time> <p class="text-sm"> ${post.data.description} </p> <div class="flex items-center space-x-4 overflow-hidden"> ${post.data.tags.map((tag) => renderTemplate`${renderComponent($$result3, "SkillBadge", $$SkillBadge, { "skill": skillIconMap[tag] })}`)} </div> </div> ` })} </div> </a> <a class="relative h-full overflow-hidden rounded-2xl hidden md:block"${addAttribute(`/blog/${post.slug}`, "href")}> ${renderComponent($$result2, "Image", $$Image, { "src": post.data.image, "alt": "post image", "class": "rounded-2xl object-cover transition-all duration-300 group-hover:scale-125", "style": "position: absolute; height: 100%; width: 100%; inset: 0px; color: transparent;" })} </a> ` })}`;
}, "/home/andre/personal/blog/src/components/PostCard.astro", void 0);

function Tag({ tag, selected = true }) {
  return /* @__PURE__ */ jsx(
    "a",
    {
      className: `px-3 py-1 text-sm transition-colors ${selected ? "text-slate-950 font-bold" : "text-slate-600"}`,
      href: `/tags/${tag.toLowerCase()}`,
      children: tag
    }
  );
}

function collectTags(tags, tagsToAdd) {
  for (const tag of tagsToAdd) {
    if (!tags.includes(tag)) {
      tags.push(tag);
    }
  }
}

const $$Astro = createAstro();
async function getStaticPaths() {
  const blogPosts = await getCollection("blog");
  const tags = [];
  for (const post of blogPosts) {
    collectTags(tags, post.data.tags);
  }
  return [
    ...tags.map((tag) => ({
      params: { tag },
      props: {
        posts: blogPosts.filter(
          (post) => post.data.tags.includes(tag)
        )
      }
    })),
    { params: { tag: "all" }, props: { posts: blogPosts } }
  ];
}
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const blogPosts = await getCollection("blog");
  const tags = ["all"];
  for (const post of blogPosts) {
    collectTags(tags, post.data.tags);
  }
  const { tag } = Astro2.params;
  const { posts } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="lg:hidden md:flex flex-wrap gap-2 p-2 border mt-4 bg-white"> ${tags.map((currTag) => renderTemplate`${renderComponent($$result2, "Tag", Tag, { "tag": currTag, "selected": tag === currTag })}`)} </div> <div class="max-w-6xl flex flex-col px-6 md:px-4 lg:px-2 lg:flex-row gap-8 mx-auto mt-4"> <div class="lg:w-4/5"> <ul class="space-y-6 flex justify-center align-center flex-col"> ${posts.map((post) => renderTemplate`${renderComponent($$result2, "PostCard", $$PostCard, { "post": post })}`)} </ul> </div> <aside class="lg:w-1/5 hidden lg:block flex-shrink-0"> <ul class="space-y-2"> ${tags.map((currTag) => renderTemplate`<li> ${renderComponent($$result2, "Tag", Tag, { "tag": currTag, "selected": tag === currTag })} </li>`)} </ul> </aside> </div> ` })}`;
}, "/home/andre/personal/blog/src/pages/tags/[...tag].astro", void 0);

const $$file = "/home/andre/personal/blog/src/pages/tags/[...tag].astro";
const $$url = "/tags/[...tag]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
