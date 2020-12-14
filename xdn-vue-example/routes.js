import { Router } from '@xdn/core/router'
import { API_CACHE_HANDLER, SSR_CACHE_HANDLER } from './xdn/cache'
import getPrerenderRequests from './xdn/getPrerenderRequests'

export default new Router()
  .prerender(getPrerenderRequests)
  .match('/api/:path*', API_CACHE_HANDLER)
  .match('/category/:name', SSR_CACHE_HANDLER)
  .match('/product/:name', SSR_CACHE_HANDLER)

  .match('/service-worker.js', ({ serviceWorker }) => {
    serviceWorker('dist/service-worker.js')
  })

  // Send requests to static assets in the build output folder `dist`
  .static('dist')

  // Send everything else to the App Shell
  .fallback(({ appShell }) => {
    appShell('dist/index.html')
  })
