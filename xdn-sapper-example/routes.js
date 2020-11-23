// This file was automatically added by xdn deploy.
// You should commit this file to source control.
import { Router } from '@xdn/core/router'
import { sapperRoutes } from '@xdn/sapper'
import getPrerenderRequests from './xdn/getPrerenderRequests'

const cacheHandler = ({ removeUpstreamResponseHeader, cache }) => {
  removeUpstreamResponseHeader('cache-control')
  cache({
    edge: {
      maxAgeSeconds: 60 * 60 * 24,
      staleWhileRevalidateSeconds: 60 * 60 * 24,
    },
    browser: {
      maxAgeSeconds: 0,
      serviceWorkerSeconds: 60 * 60 * 24,
    },
  })
}

export default new Router()
  .prerender(getPrerenderRequests)
  .match('/', cacheHandler)
  .match('/category/:name', cacheHandler)
  .match('/product/:name', cacheHandler)
  .use(sapperRoutes) // automatically adds routes for all files under /src/routes
