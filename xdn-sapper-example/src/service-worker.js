import { precacheAndRoute } from 'workbox-precaching';
import { Prefetcher } from '@xdn/prefetch/sw';
import DeepFetchPlugin from '@xdn/prefetch/sw/DeepFetchPlugin';

precacheAndRoute([]);

new Prefetcher({
  plugins: [
    new DeepFetchPlugin([
      // query the PLP API response for images to prefetch
      // prefetch logic is handled in client.js
      {
        selector: 'div[data-image-src]',
        maxMatches: 10,
        attribute: 'data-image-src',
        as: 'image',
      },
    ]),
  ],
}).route();
