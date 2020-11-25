import { skipWaiting, clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';
import { Prefetcher } from '@xdn/prefetch/sw';
import DeepFetchPlugin from '@xdn/prefetch/sw/DeepFetchPlugin'

skipWaiting();
clientsClaim();
precacheAndRoute(self.__WB_MANIFEST || []);

new Prefetcher({
  plugins: [
    new DeepFetchPlugin([
      // deep fetches the "category" API call to get PLP images:
      {
        jsonQuery: 'pageProps.products.picture',
        maxMatches: 10,
        as: 'image',
      },
    ])
  ]
}).route();
