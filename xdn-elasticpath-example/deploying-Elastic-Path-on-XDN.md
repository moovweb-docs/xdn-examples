# Deploying Elastic Path on XDN

## 1. Install Elastic Path

- Clone https://github.com/elasticpath/react-pwa-reference-storefront
- Navigate to the project folder: `cd %project_name%`
- Install packages: `yarn`
- In `src/ep.config.json` file: replace a host of `skuImagesUrl` and `siteImagesUrl` to whatever host you'll be using, for example:
```json
"skuImagesUrl": "https://moovweb-demos-elasticpath-default.moovweb-edge.io/BELLEVIE/skuImages/%fileName%",
"siteImagesUrl": "https://moovweb-demos-elasticpath-default.moovweb-edge.io/BELLEVIE/siteImages/%fileName%",
```
- Build Elastic Path app: `yarn build` (`build` folder is going to be created)

## 2. Install XDN

- Install XDN packages: `yarn add -D @xdn/cli@latest && yarn add @xdn/core@latest @xdn/prefetch@latest @xdn/devtools@latest`
- Next steps will cover the XDN key files you need to add. For more information about them see https://developer.moovweb.com/guides/starter
- Add `xdn.config.js` file with your origin and images hosts. For example:
```js
module.exports = {
  routes: './xdn/routes.js',
  backends: {
    origin: {
      domainOrIp: 'reference81.epdemos.com',
      hostHeader: 'reference81.epdemos.com',
    },
    images: {
      domainOrIp: 'ep-demo-assets.s3-us-west-2.amazonaws.com',
      hostHeader: 'ep-demo-assets.s3-us-west-2.amazonaws.com',
    },
  },
};
```

- Add `xdn/service-worker.js` file:
```js
import { Prefetcher } from "@xdn/prefetch/sw";
import { clientsClaim, skipWaiting } from "workbox-core";
import { precacheAndRoute } from 'workbox-precaching';

skipWaiting();
clientsClaim();

precacheAndRoute(self.__WB_MANIFEST || []);

new Prefetcher().route();
```
- Add `xdn/browser.js` file. For example:
```js
import installDevtools from "@xdn/devtools/install";
import install from "@xdn/prefetch/window/install";

document.addEventListener("DOMContentLoaded", () => {
  console.info("[XDN browser] DOMContentLoaded -> running install()");
  install({
    forcePrefetchRatio: 0.5, // forcely prefetch 50% of non-cached content for higher hit rate
  });
  console.info("[XDN browser] DOMContentLoaded -> running installDevtools()");
  installDevtools();
});
```
- Add `xdn/routes.js` && `xdn/cache.js` files. For example:
```js
/* xdn/routes.js */
import { Router } from "@xdn/core/router";
import { CACHE_ASSETS, CACHE_PAGES } from "./cache";

const DIST_APP = 'build';
const DIST_XDN = 'dist-xdn';

const SPLAT = ':path*';
// const SUFFIX_SPLAT = `:suffix/${SPLAT}`;

// //////////////////////////////////////////

const router = new Router();

const pages = [
  // Home
  `/`,
  // PLP
  `/category/${SPLAT}`,
  `/search/${SPLAT}`,
  // PDP
  `/itemdetail/${SPLAT}`,
  // Other
  `/aboutus`,
  `/contactus`,
  `/shippingreturns`,
  `/termsandconditions`,
];

// static prerendering
router.prerender(pages.filter(page => !page.includes(SPLAT)));

// xdn static files
router.get('/service-worker.js', ({ serviceWorker, cache }) => {
  cache(CACHE_ASSETS);
  serviceWorker(`${DIST_XDN}/service-worker.js`);
});
router.get('/main.js', ({ serveStatic, cache }) => {
  cache(CACHE_ASSETS);
  serveStatic(`${DIST_XDN}/browser.js`);
});

// assets
router.get(`/static/${SPLAT}`, ({ serveStatic, cache }) => {
  cache(CACHE_ASSETS);
  serveStatic(`${DIST_APP}/static/${SPLAT}`);
});
router.get(`/assets/${SPLAT}`, ({ serveStatic, cache }) => {
  cache(CACHE_ASSETS);
  serveStatic(`${DIST_APP}/assets/${SPLAT}`);
});
router.get(`/vr_details_hotspot.svg`, ({ serveStatic, cache }) => {
  cache(CACHE_ASSETS);
  serveStatic(`${DIST_APP}/vr_details_hotspot.svg`);
});
router.get(`/vr_close.svg`, ({ serveStatic, cache }) => {
  cache(CACHE_ASSETS);
  serveStatic(`${DIST_APP}/vr_close.svg`);
});
router.get(`/favicon_0.ico`, ({ serveStatic, cache }) => {
  cache(CACHE_ASSETS);
  serveStatic(`${DIST_APP}/favicon_0.ico`);
});
router.get(`/manifest.json`, ({ serveStatic, cache }) => {
  cache(CACHE_ASSETS);
  serveStatic(`${DIST_APP}/manifest.json`);
});

// api
router.match(`/cortex/${SPLAT}`, ({ proxy }) => {
  proxy('origin');
});
router.get(`/BELLEVIE/skuImages/${SPLAT}`, ({ proxy, cache }) => {
  cache(CACHE_ASSETS);
  proxy('images');
});
router.get(`/BELLEVIE/siteImages/${SPLAT}`, ({ proxy, cache }) => {
  cache(CACHE_ASSETS);
  proxy('images');
});
router.match(`/BELLEVIE/${SPLAT}`, ({ proxy }) => {
  proxy('images');
});

// pages
pages.forEach(page => {
  router.get(page, ({ cache, serveStatic }) => {
    cache(CACHE_PAGES);
    serveStatic(`${DIST_APP}/index.html`);
  });
});

// fallback
router.fallback(({ serveStatic }) => {
  serveStatic(`${DIST_APP}/index.html`);
});

export default router;


/* xdn/cache.js */
const TIME_1H = 60 * 60;
const TIME_4H = TIME_1H * 4;
const TIME_1D = TIME_1H * 24;

/**
 * The default cache setting for pages in the shopping flow
 */
export const CACHE_PAGES = {
  edge: {
    maxAgeSeconds: TIME_4H,
    forcePrivateCaching: true,
    staleWhileRevalidateSeconds: TIME_1H, // this way stale items can still be prefetched
  },
  browser: {
    maxAgeSeconds: TIME_4H,
    serviceWorkerSeconds: TIME_4H,
    spa: true,
  },
};

/**
 * The default cache setting for static assets like JS, CSS, and images.
 */
export const CACHE_ASSETS = {
  edge: {
    maxAgeSeconds: TIME_1D,
    forcePrivateCaching: true,
    staleWhileRevalidateSeconds: TIME_1H, // this way stale items can still be prefetched
  },
  browser: {
    maxAgeSeconds: TIME_1D,
    serviceWorkerSeconds: TIME_1D,
    spa: true,
  },
};
```
- Finally, add `xdn/webpack.xdn.config.js` and `xdn:*` scripts into `package.json` file:
```js
/* xdn/webpack.xdn.config.js */
const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    browser: './xdn/browser.js',
    'service-worker': './xdn/service-worker.js',
  },
  mode: 'production',
  resolve: {
    extensions: ['.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist-xdn'),
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.DEBUG_SW': JSON.stringify(process.env.DEBUG_SW || false),
    }),
  ],
}

/* package.json */
...
"xdn:build": "webpack --progress --config xdn/webpack.xdn.config.js && xdn build",
"xdn:start:prod": "xdn run --production",
"xdn:deploy": "xdn deploy --team=YOUR-TEAM --skip-build --site=YOUR-SITENAME"
...
```

- Also, don't forget to gitignore XDN files:
```bash
# XDN
.xdn/
dist-xdn/
```

- Now you can build and deploy your XDN app via `yarn xdn:build` and then `yarn xdn:deploy`
