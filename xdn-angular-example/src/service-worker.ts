/// <reference lib="es2018" />
/// <reference lib="webworker" />
import { precacheAndRoute } from 'workbox-precaching'
import { clientsClaim, skipWaiting } from 'workbox-core'
import { Prefetcher } from '@xdn/prefetch/sw'
import DeepFetchPlugin from '@xdn/prefetch/sw/DeepFetchPlugin'
import { getOptimizedImageUrl } from './app/service/cms.service'

declare const self: ServiceWorkerGlobalScope

skipWaiting()
clientsClaim()

precacheAndRoute(self.__WB_MANIFEST || [])

new Prefetcher({
  plugins: [
    new DeepFetchPlugin([
      // query the PLP API response for images to prefetch
      {
        jsonQuery: 'picture:picture',
        jsonQueryOptions: {
          locals: {
            picture: (input: any) => {
              if (input.map) {
                return input.map(getOptimizedImageUrl)
              }

              return []
            },
          },
        },
        maxMatches: 10,
        as: 'image',
      },
    ]),
  ],
}).route()
