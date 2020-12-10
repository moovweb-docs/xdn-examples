import { skipWaiting, clientsClaim } from 'workbox-core'
import { precacheAndRoute } from 'workbox-precaching'
import { Prefetcher } from '@xdn/prefetch/sw'
import DeepFetchPlugin from '@xdn/prefetch/sw/DeepFetchPlugin'
import { getOptimizedImageUrl } from '../lib/cms'

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
            picture: input => {
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
