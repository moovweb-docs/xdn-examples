import { Router } from '@xdn/core/router';
import { nextRoutes } from '@xdn/next';
import getPrerenderRequests from './xdn/getPrerenderRequests';

const SSR_CACHE_CONFIG = {
  browser: {
    maxAgeSeconds: 0,
  },
  edge: {
    maxAgeSeconds: 60 * 60 * 24 * 365 * 10,
    staleWhileRevalidateSeconds: 60 * 60 * 24,
  },
};

const API_CACHE_CONFIG = {
  browser: {
    maxAgeSeconds: 0,
    serviceWorkerSeconds: 60 * 60 * 24 * 365,
  },
  edge: {
    maxAgeSeconds: 60 * 60 * 24 * 365 * 10,
    staleWhileRevalidateSeconds: 60 * 60 * 24,
  },
};

export default new Router()
  /* @ts-ignore */
  // .prerender(getPrerenderRequests)
  .get('/category/:name', ({ cache }) => cache(SSR_CACHE_CONFIG))
  .get('/product/:id', ({ cache }) => cache(SSR_CACHE_CONFIG))
  .get('/_next/data/:build/category/:name.json', ({ cache }) =>
    cache(API_CACHE_CONFIG)
  )
  .get('/_next/data/:build/product/:id.json', ({ cache }) =>
    cache(API_CACHE_CONFIG)
  )
  .match('/service-worker.js', ({ serviceWorker }) => {
    return serviceWorker('.next/static/service-worker.js');
  })
  .use(nextRoutes); // automatically adds routes for all files under /pages
