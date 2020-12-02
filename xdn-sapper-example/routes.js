// This file was automatically added by xdn deploy.
// You should commit this file to source control.
import { Router } from '@xdn/core/router'
import { sapperRoutes } from '@xdn/sapper'
import getPrerenderRequests from './xdn/getPrerenderRequests'

const SSR_CACHE_HANDLER = ({ removeUpstreamResponseHeader, cache }) => {
  removeUpstreamResponseHeader('cache-control')
  cache({
    browser: {
      maxAgeSeconds: 0,
    },
    edge: {
      maxAgeSeconds: 60 * 60 * 24 * 365 * 10,
      staleWhileRevalidateSeconds: 60 * 60 * 24,
    },
  })
}

const API_CACHE_HANDLER = ({ removeUpstreamResponseHeader, cache, proxy }) => {
  removeUpstreamResponseHeader('cache-control')
  cache({
    browser: {
      maxAgeSeconds: 0,
      serviceWorkerSeconds: 60 * 60 * 24,
    },
    edge: {
      maxAgeSeconds: 60 * 60 * 24 * 365 * 10,
      staleWhileRevalidateSeconds: 60 * 60 * 24,
    },
  })
  proxy('api', { path: '/:path*' })
}

export default new Router()
  .prerender(getPrerenderRequests)
  .match('/api/:path*', API_CACHE_HANDLER)
  .use(sapperRoutes) // automatically adds routes for all files under /src/routes

  .match('/', SSR_CACHE_HANDLER)
  .match('/category/:name', SSR_CACHE_HANDLER)
  .match('/product/:name', SSR_CACHE_HANDLER)
