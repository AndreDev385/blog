import { c as createComponent, r as renderTemplate, m as maybeRenderHead, d as addAttribute, i as renderScript, j as renderHead, a as renderComponent, e as renderSlot, b as createAstro } from './astro/server_C1k3jRZ-.mjs';
/* empty css                          */
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const $$Header = createComponent(($$result, $$props, $$slots) => {
  const navItems = [
    { href: "/", text: "Home" },
    { href: "/tags/all", text: "Blog" }
  ];
  return renderTemplate`${maybeRenderHead()}<header class="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60"> <div class="max-w-6xl mx-auto px-6 md:px-4 lg:px-2 flex h-16 items-center justify-between"> <a href="/" class="flex items-center space-x-2"> <span class="font-bold text-2xl">André Izarra</span> </a> <nav class="hidden md:flex space-x-6 text-sm font-medium"> ${navItems.map((item) => renderTemplate`<a${addAttribute(item.href, "href")} class="transition-colors px-2 py-1 hover:bg-gray-200 rounded hover:text-primary font-bold text-gray-700 text-lg"> ${item.text} </a>`)} </nav> <button id="menuButton" class="md:hidden p-2 rounded-md hover:bg-gray-100" aria-label="Toggle menu"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg> </button> </div> </header> <div id="mobileMenu" class="fixed inset-0 bg-white z-50 hidden md:hidden"> <div class="flex flex-col h-full p-4"> <div class="flex justify-end"> <button id="closeMenuButton" class="p-2 rounded-md hover:bg-gray-100" aria-label="Close menu"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path> </svg> </button> </div> ${navItems.map((item) => renderTemplate`<a${addAttribute(item.href, "href")} class="transition-colors hover:text-gray-700 text-gray-600"> ${item.text} </a>`)} </div> </div> ${renderScript($$result, "/home/andre/personal/blog/src/components/layout/header.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/andre/personal/blog/src/components/layout/header.astro", void 0);

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en" class="h-full"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${`${title ? `${title} | Andr\xE9 Izarra` : "Andr\xE9 Izarra"}`}</title>${renderHead()}</head> <body class="h-full flex flex-col"> ${renderComponent($$result, "Header", $$Header, {})} <main class="flex-grow"> ${renderSlot($$result, $$slots["default"])} </main> <footer class="bg-white shadow mt-4"> <div class="container mx-auto px-4 py-6 text-center text-gray-600">
Made with dedication by André Izarra.
</div> </footer> </body></html>`;
}, "/home/andre/personal/blog/src/layouts/Layout.astro", void 0);

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export { $$Layout as $, cn as c };
