// This file was automatically added by xdn deploy.
// You should commit this file to source control.

import { Router } from '@xdn/core/router'
import { angularRoutes } from '@xdn/angular'
import { API_CACHE_HANDLER } from './cache'

export default new Router()
  .match('/api/:build_id/:path*', API_CACHE_HANDLER)
  .match('/service-worker.js', ({ serveStatic }) => {
    serveStatic('dist/xdn-angular-example/browser/service-worker.js')
  })
  .use(angularRoutes)
