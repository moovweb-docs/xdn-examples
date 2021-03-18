import { Router } from "@xdn/core/router";
import { CACHE_ASSETS, CACHE_PAGES } from "./cache";
import staticRoutes from './xdn-static-routes';
import { SPLAT } from './constants'
import { cacheRoutes, prerenderRoutes } from './routeLists'

const DIST_APP = 'dist';
const DIST_XDN = 'dist-xdn';

// //////////////////////////////////////////

const router = new Router();

// static prerendering
router.prerender(prerenderRoutes);

// xdn static files
router.get('/sw.js', ({ serviceWorker, cache }) => {
  cache(CACHE_ASSETS);
  serviceWorker(`${DIST_XDN}/service-worker.js`);
});
router.get('/main.js', ({ serveStatic, cache }) => {
  cache(CACHE_ASSETS);
  serveStatic(`${DIST_XDN}/browser.js`);
});

// app static files
(staticRoutes || []).forEach(route => {
  if (route.startsWith('/venia-static/')) {
    // serve `/venia-static/` routes under root also
    const newRoute = route.replace('/venia-static/', '/');
    router.get(newRoute, ({ serveStatic, cache }) => {
      cache(CACHE_ASSETS);
      serveStatic(`${DIST_APP}${route}`);
    });
  }
  router.get(route, ({ serveStatic, cache }) => {
    cache(CACHE_ASSETS);
    serveStatic(`${DIST_APP}${route}`);
  });
});

// backend proxy
router.get(`/media/${SPLAT}`, ({ cache, proxy }) => {
  cache(CACHE_ASSETS);
  proxy('origin');
});
router.match(
  {
    path: `/graphql`, // value is route-pattern syntax
    method: /GET/i, // value is a regular expression
    query: { query: /query.*getFilterInputs.*/i }, // keys are query parameter names, values are regular expressions
  },
  ({ proxy, cache, removeUpstreamResponseHeader }) => {
    removeUpstreamResponseHeader('set-cookie');
    cache(CACHE_PAGES);
    proxy('origin');
  },
)
router.match(`/graphql/${SPLAT}`, ({ proxy }) => {
  proxy('origin');
});

// pages
cacheRoutes.forEach(page => {
  router.get(page, ({ cache, serveStatic }) => {
    cache(CACHE_PAGES);
    serveStatic(`${DIST_APP}/index.html`);
  });
});

// fallback: index.html
router.fallback(({ serveStatic }) => {
  serveStatic(`${DIST_APP}/index.html`);
});

export default router;
