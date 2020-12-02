// This file was added by xdn init.
// You should commit this file to source control.

import { Router } from '@xdn/core/router'
import { nuxtRoutes } from '@xdn/nuxt'

const SSR_CACHE_CONFIG = {
  browser: {
    maxAgeSeconds: 0,
  },
  edge: {
    maxAgeSeconds: 60 * 60 * 24 * 365 * 10,
    staleWhileRevalidateSeconds: 60 * 60 * 24,
  },
}

export default new Router()
  .get('/category/:name', ({ cache }) => cache(SSR_CACHE_CONFIG))
  .get('/product/:name', ({ cache }) => cache(SSR_CACHE_CONFIG))
  .match('/service-worker.js', ({ serviceWorker }) => {
    serviceWorker('.nuxt/dist/client/service-worker.js')
  })
  .use(nuxtRoutes)
