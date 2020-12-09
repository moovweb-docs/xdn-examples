// This file was added by xdn init.
// You should commit this file to source control.

import { Router } from '@xdn/core/router'
import { nuxtRoutes } from '@xdn/nuxt'
import { API_CACHE_HANDLER, SSR_CACHE_HANDLER } from './xdn/cache'
import getPrerenderRequests from './xdn/getPrerenderRequests'

export default new Router()
  // @ts-ignore
  .prerender(getPrerenderRequests)
  .match('/api/:build_id/:path*', API_CACHE_HANDLER)
  .match('/category/:name', SSR_CACHE_HANDLER)
  .match('/product/:name', SSR_CACHE_HANDLER)
  .match('/service-worker.js', ({ serviceWorker }) => {
    serviceWorker('.nuxt/dist/client/service-worker.js')
  })
  .use(nuxtRoutes)
