import { precacheAndRoute } from 'workbox-precaching'
import { Prefetcher } from '@xdn/prefetch/sw'
import DeepFetchPlugin from '@xdn/prefetch/sw/DeepFetchPlugin'
import { getOptimizedImageUrl } from '../lib/cms'

precacheAndRoute([])

new Prefetcher({
  plugins: [
    new DeepFetchPlugin([
      // query the PLP API response for images to prefetch
      // prefetch logic is handled in client.js
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
