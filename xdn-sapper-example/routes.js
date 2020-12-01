// This file was automatically added by xdn deploy.
// You should commit this file to source control.
import { Router } from '@xdn/core/router'
import { sapperRoutes } from '@xdn/sapper'
import getPrerenderRequests from './xdn/getPrerenderRequests'

const SSR_CACHE_CONFIG = {
  browser: {
    maxAgeSeconds: 0,
  },
  edge: {
    maxAgeSeconds: 60 * 60 * 24 * 365 * 10,
    staleWhileRevalidateSeconds: 60 * 60 * 24,
  },
};

export default new Router()
  .prerender(getPrerenderRequests)
  .match('/', ({ cache }) => cache(SSR_CACHE_CONFIG))
  .match('/category/:name', ({ cache }) => cache(SSR_CACHE_CONFIG))
  .match('/product/:name', ({ cache }) => cache(SSR_CACHE_CONFIG))
  .use(sapperRoutes) // automatically adds routes for all files under /src/routes
