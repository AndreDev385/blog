import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_CzJbjCKB.mjs';
import { manifest } from './manifest_BV5UuSj9.mjs';
import { onRequest } from './_noop-middleware.mjs';

const serverIslandMap = new Map([
]);;

const _page0 = () => import('./pages/404.astro.mjs');
const _page1 = () => import('./pages/blog/_---slug_.astro.mjs');
const _page2 = () => import('./pages/tags/_---tag_.astro.mjs');
const _page3 = () => import('./pages/index.astro.mjs');
const _page4 = () => import('./pages/_image.astro.mjs');
const pageMap = new Map([
    ["src/pages/404.astro", _page0],
    ["src/pages/blog/[...slug].astro", _page1],
    ["src/pages/tags/[...tag].astro", _page2],
    ["src/pages/index.astro", _page3],
    ["node_modules/.pnpm/astro@5.0.0-beta.1_@types+node@22.5.5_rollup@4.22.2_typescript@5.6.2/node_modules/astro/dist/assets/endpoint/generic.js", _page4]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: onRequest
});
const _args = {
    "middlewareSecret": "924f4892-ada9-4633-8ecb-7518a618a900",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
