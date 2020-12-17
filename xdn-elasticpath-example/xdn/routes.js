import { Router } from "@xdn/core/router";
import { CACHE_ASSETS, CACHE_PAGES } from "./cache";

const DIST_APP = 'build';
const DIST_XDN = 'dist-xdn';

const SPLAT = ':path*';
// const SUFFIX_SPLAT = `:suffix/${SPLAT}`;

// //////////////////////////////////////////

const router = new Router();

const pages = [
  // Home
  `/`,
  // PLP
  `/category/${SPLAT}`,
  `/search/${SPLAT}`,
  // PDP
  `/itemdetail/${SPLAT}`,
  // Other
  `/aboutus`,
  `/contactus`,
  `/shippingreturns`,
  `/termsandconditions`,
];

// static prerendering
router.prerender(pages.filter(page => !page.includes(SPLAT)));

// xdn static files
router.get('/service-worker.js', ({ serviceWorker, cache }) => {
  cache(CACHE_ASSETS);
  serviceWorker(`${DIST_XDN}/service-worker.js`);
});
router.get('/main.js', ({ serveStatic, cache }) => {
  cache(CACHE_ASSETS);
  serveStatic(`${DIST_XDN}/browser.js`);
});

// assets
router.get(`/static/${SPLAT}`, ({ serveStatic, cache }) => {
  cache(CACHE_ASSETS);
  serveStatic(`${DIST_APP}/static/${SPLAT}`);
});
router.get(`/assets/${SPLAT}`, ({ serveStatic, cache }) => {
  cache(CACHE_ASSETS);
  serveStatic(`${DIST_APP}/assets/${SPLAT}`);
});
router.get(`/vr_details_hotspot.svg`, ({ serveStatic, cache }) => {
  cache(CACHE_ASSETS);
  serveStatic(`${DIST_APP}/vr_details_hotspot.svg`);
});
router.get(`/vr_close.svg`, ({ serveStatic, cache }) => {
  cache(CACHE_ASSETS);
  serveStatic(`${DIST_APP}/vr_close.svg`);
});
router.get(`/favicon_0.ico`, ({ serveStatic, cache }) => {
  cache(CACHE_ASSETS);
  serveStatic(`${DIST_APP}/favicon_0.ico`);
});
router.get(`/manifest.json`, ({ serveStatic, cache }) => {
  cache(CACHE_ASSETS);
  serveStatic(`${DIST_APP}/manifest.json`);
});

// api
router.match(`/cortex/${SPLAT}`, ({ proxy }) => {
  proxy('origin');
});
router.get(`/BELLEVIE/skuImages/${SPLAT}`, ({ proxy, cache }) => {
  cache(CACHE_ASSETS);
  proxy('images');
});
router.get(`/BELLEVIE/siteImages/${SPLAT}`, ({ proxy, cache }) => {
  cache(CACHE_ASSETS);
  proxy('images');
});
router.match(`/BELLEVIE/${SPLAT}`, ({ proxy }) => {
  proxy('images');
});

// pages
pages.forEach(page => {
  router.get(page, ({ cache, serveStatic }) => {
    cache(CACHE_PAGES);
    serveStatic(`${DIST_APP}/index.html`);
  });
});

// fallback
router.fallback(({ serveStatic }) => {
  serveStatic(`${DIST_APP}/index.html`);
});

export default router;
