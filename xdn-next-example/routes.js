// This file was automatically added by xdn deploy.
// You should commit this file to source control.
const { Router } = require('@xdn/core/router');
const { nextRoutes } = require('@xdn/next');

const CACHE_CONFIG = {
  browser: {
    maxAgeSeconds: 0,
  },
  edge: {
    maxAgeSeconds: 60 * 60 * 24,
    staleWhileRevalidateSeconds: 60 * 60,
  },
};

module.exports = new Router()
  .get('/category/:id', ({ cache }) => {
    cache(CACHE_CONFIG);
  })
  .get('/product/:id', ({ cache }) => {
    cache(CACHE_CONFIG);
  })
  .match('/service-worker.js', ({ serviceWorker }) => {
    return serviceWorker('.next/static/service-worker.js');
  })
  .use(nextRoutes); // automatically adds routes for all files under /pages
