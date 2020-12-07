// This file was automatically added by xdn deploy.
// You should commit this file to source control.
import { Router } from '@xdn/core/router'
import { sapperRoutes } from '@xdn/sapper'
import getPrerenderRequests from './xdn/getPrerenderRequests'
import { API_CACHE_HANDLER, SSR_CACHE_HANDLER } from './xdn/cache'

export default new Router()
  .prerender(getPrerenderRequests)
  .match('/api/:build_id/:path*', API_CACHE_HANDLER)
  .match('/', SSR_CACHE_HANDLER)
  .match('/category/:name', SSR_CACHE_HANDLER)
  .match('/product/:name', SSR_CACHE_HANDLER)
  .use(sapperRoutes) // automatically adds routes for all files under /src/routes
