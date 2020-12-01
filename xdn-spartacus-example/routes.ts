// This file was automatically added by xdn deploy.
// You should commit this file to source control.

import { Router } from '@xdn/core/router'
import { angularRoutes } from '@xdn/angular'

const PAGE_TTL = 60 * 60 * 24
const FAR_FUTURE_TTL = 60 * 60 * 24 * 365 * 10

const CACHE_API = {
  browser: {
    maxAgeSeconds: PAGE_TTL,
    serviceWorkerSeconds: PAGE_TTL,
  },
  edge: {
    maxAgeSeconds: PAGE_TTL,
    staleWhileRevalidateSeconds: PAGE_TTL,
    forcePrivateCaching: true,
  },
}

const CACHE_ASSETS = {
  edge: {
    maxAgeSeconds: FAR_FUTURE_TTL,
    staleWhileRevalidateSeconds: PAGE_TTL,
    forcePrivateCaching: true,
  },
}

const CACHE_PAGE = {
  browser: {
    maxAgeSeconds: PAGE_TTL * 365,
    serviceWorkerSeconds: PAGE_TTL * 365,
  },
  edge: {
    maxAgeSeconds: PAGE_TTL * 365,
    staleWhileRevalidateSeconds: PAGE_TTL * 365,
    forcePrivateCaching: true,
  },
}

export default new Router()
  .match('/rest/v2/:path*', ({ cache, proxy, removeRequestHeader }) => {
    removeRequestHeader('origin')
    cache(CACHE_API)
    proxy('commerce')
  })
  .match('/medias/:path*', ({ cache, proxy, removeRequestHeader }) => {
    removeRequestHeader('origin')
    cache(CACHE_ASSETS)
    proxy('commerce')
  })
  .post('/authorizationserver/oauth/:path*', ({ proxy }) => {
    proxy('commerce')
  })
  .get('/Open-Catalogue/:path*', ({ cache }) => {
    cache(CACHE_PAGE)
  })
  .get('/products/:path*', ({ cache }) => {
    cache(CACHE_PAGE)
  })
  .use(angularRoutes)
