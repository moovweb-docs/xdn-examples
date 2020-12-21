# Deploying Magento PWA studio on XDN

## 1. Install Magento PWA Studio

- Scaffold Magento PWA Studio demo: `npm init @magento/pwa` (more info: https://magento.github.io/pwa-studio/tutorials/pwa-studio-fundamentals/project-setup/)
- Navigate to the project folder: `cd %project_name%`
- Build the app `dist` folder: `npm run build`

## 2. Install XDN

- Install XDN packages: `npm i -D @xdn/cli@latest && npm i @xdn/core@latest @xdn/prefetch@latest @xdn/devtools@latest`
- Next steps will cover the XDN key files you need to add. For more information about them see https://developer.moovweb.com/guides/starter
- Add `xdn.config.js` file with your origin host. For example:
```js
module.exports = {
  routes: './xdn/routes.js',
  backends: {
    origin: {
      domainOrIp: 'master-7rqtwti-mfwmkrjfqvbjk.us-4.magentosite.cloud',
      hostHeader: 'master-7rqtwti-mfwmkrjfqvbjk.us-4.magentosite.cloud',
    },
  },
};

```
- Add `xdn/service-worker.js` file:
```js
import { Prefetcher } from "@xdn/prefetch/sw";
import { clientsClaim, skipWaiting } from "workbox-core";

skipWaiting();
clientsClaim();

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

const DIST_APP = 'dist';
const DIST_XDN = 'dist-xdn';

const SPLAT = ':path*';

// //////////////////////////////////////////

const router = new Router();

// static prerendering
const prerenderRoutes = [/* add your routes to prerender here */];
router.prerender(prerenderRoutes);

// xdn static files
router.get('/sw.js', ({ serviceWorker, cache }) => {
  cache(CACHE_ASSETS);
  serviceWorker(`${DIST_XDN}/service-worker.js`);
});
router.get('/main.js', ({ serveStatic, cache }) => {
  cache(CACHE_ASSETS);
  serveStatic(`${DIST_XDN}/browser.js`);
});

// app static files
const staticFiles = [/* add your static files from `dist` here */];
staticFiles.forEach(route => {
  if (route.startsWith('/venia-static/')) {
    // serve `/venia-static/` routes under root also
    const newRoute = route.replace('/venia-static/', '/');
    router.get(newRoute, ({ serveStatic, cache }) => {
      cache(CACHE_ASSETS);
      serveStatic(`${DIST_APP}${route}`);
    });
  }
  router.get(route, ({ serveStatic, cache }) => {
    cache(CACHE_ASSETS);
    serveStatic(`${DIST_APP}${route}`);
  });
});

// backend proxy
router.get(`/media/${SPLAT}`, ({ cache, proxy }) => {
  cache(CACHE_ASSETS);
  proxy('origin');
});
router.match(`/graphql/${SPLAT}`, ({ proxy }) => {
  proxy('origin');
});

// pages
const pages = [/* add your pages here */];
pages.forEach(page => {
  router.get(page, ({ cache, serveStatic }) => {
    cache(CACHE_PAGES);
    serveStatic(`${DIST_APP}/index.html`);
  });
});

// fallback: index.html
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
const path = require('path');
const webpack = require('webpack');

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
      'process.env.DEBUG_SW': JSON.stringify(false),
    }),
  ],
};

/* package.json */
...
"xdn:start": "concurrently \"npx webpack --watch --config xdn/webpack.xdn.config.js\" \"npx xdn run\"",
"xdn:start:prod": "npx xdn run --production",
"xdn:build": "npx webpack --progress --config xdn/webpack.xdn.config.js && npx xdn build",
"xdn:deploy": "npx xdn deploy --team=YOUR-TEAM --name=YOUR-PROJECT-NAME --skip-build",
...
```

- Also, don't forget to gitignore XDN files:
```bash
# XDN
.xdn
dist-xdn
```

- Now you can build and deploy your XDN app via `npm run xdn:build` and then `npm run xdn:deploy`

## 3. Additional info

- Aditionally, if your `dist` folder contains a lot of hashed static files you may consider to add a custom script to add them all into XDN router. For this you can create `xdn/xdn-static-routes-generator.js` file. For example:
```js
const path = require('path');
const fs = require('fs');

/**
 * @param {string} folder - resolved path of the folder to scan
 * @returns {string[]} - array of files relative paths
 */
function scanFiles(folder, _subfolder = '/') {
  return fs
    .readdirSync(folder, { withFileTypes: true })
    .flatMap(dirent => {
      if (dirent.isFile()) {
        return `${_subfolder}${dirent.name}`;
      } else {
        return scanFiles(path.resolve(folder, dirent.name), `${_subfolder}${dirent.name}/`);
      }
    });
}

/**
 * @param {string} msg - message to log
 * @param {number} mood - (neutral =0, positive >0, negative <0) 
 * @returns {void}
 */
function log(msg, mood=0) {
  const FgCyan = "\x1b[36m";
  const FgGreen = "\x1b[32m";
  const FgRed = "\x1b[31m";
  let color;
  if (mood === 0) {
    color = FgCyan;
  } else {
    color = mood > 0 ? FgGreen : FgRed;
  }
  console.info(color, `[xdn-static-routes-generator] ${msg}`);
}

// /////////////////////////////////////////////////////////////

const DIST_APP = '../dist';
const dist = path.resolve(__dirname, DIST_APP);
const files = scanFiles(dist);

// log result of what's found
if (files.length) {
  log('The following static app files found. They are going to be added to XDN router automatically...');
  files.forEach((file) => {
    log(`file found: ${file}`);
  });
} else {
  log('No static app files found. You\'ve probably forgot to make an angular app production build before working with XDN. Check README.md for steps.');
}

// generate xdn-static-routes.js file
fs.writeFile('xdn/xdn-static-routes.js',
`export default [
${files.reduce((output, file) => {
  return output.concat(`  '${file}',\n`);
}, '')}];\n`, (error) => {
  if (error) {
    throw error;
  }
  log('xdn-static-routes.js file created successfully\n', 1);
});
```

- Now you can add a command to run this script (you'll need to call it every time before you do `xdn build`): 
```js
/* package.json */
...
"xdn:prebuild:static-routes": "node xdn/xdn-static-routes-generator.js",
...
```

- And gitignore its output file as well:
```bash
/* .gitignore */
xdn/xdn-static-routes.js
```

- And finally, import these static routes and use them in `xdn/routes.js` like:
```js
import staticRoutes from './xdn-static-routes';

...

// app static files
(staticRoutes || []).forEach(route => {
  if (route.startsWith('/venia-static/')) {
    // serve `/venia-static/` routes under root also
    const newRoute = route.replace('/venia-static/', '/');
    router.get(newRoute, ({ serveStatic, cache }) => {
      cache(CACHE_ASSETS);
      serveStatic(`${DIST_APP}${route}`);
    });
  }
  router.get(route, ({ serveStatic, cache }) => {
    cache(CACHE_ASSETS);
    serveStatic(`${DIST_APP}${route}`);
  });
});

...
```