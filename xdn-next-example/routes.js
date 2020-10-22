// This file was automatically added by xdn deploy.
// You should commit this file to source control.
const { Router } = require('@xdn/core/router');
const { nextRoutes } = require('@xdn/next');

const SSR_CACHE_CONFIG = {
  browser: {
    maxAgeSeconds: 0,
  },
  edge: {
    maxAgeSeconds: 60 * 60 * 24,
    staleWhileRevalidateSeconds: 60 * 60,
  },
};

const API_CACHE_CONFIG = {
  browser: {
    maxAgeSeconds: 0,
    serviceWorkerSeconds: 60 * 60 * 24,
  },
  edge: {
    maxAgeSeconds: 60 * 60 * 24,
    staleWhileRevalidateSeconds: 60 * 60,
  },
};

module.exports = new Router()
  .get('/category/:id', ({ cache }) => cache(SSR_CACHE_CONFIG))
  .get('/product/:id', ({ cache }) => cache(SSR_CACHE_CONFIG))
  .get('/_next/data/:build/category/:id.json', ({ cache }) => cache(API_CACHE_CONFIG))
  .get('/_next/data/:build/product/:id.json', ({ cache }) => cache(API_CACHE_CONFIG))
  .match('/service-worker.js', ({ serviceWorker }) => {
    return serviceWorker('.next/static/service-worker.js');
  })
  .use(nextRoutes); // automatically adds routes for all files under /pages
