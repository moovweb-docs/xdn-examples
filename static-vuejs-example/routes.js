// This file was added by xdn init.
// You should commit this file to source control.

const { Router } = require('@xdn/core/router')

const ONE_HOUR = 60 * 60
const ONE_DAY = 24 * ONE_HOUR
const ONE_YEAR = 365 * ONE_DAY

const edgeOnly = {
  browser: false,
  edge: { maxAgeSeconds: ONE_YEAR },
}

const edgeAndBrowser = {
  browser: { maxAgeSeconds: ONE_YEAR },
  edge: { maxAgeSeconds: ONE_YEAR },
}

module.exports = new Router()
  .prerender([{ path: '/' }])

  .match('/:path*', ({ setResponseHeader }) => {
    setResponseHeader('Access-Control-Allow-Origin', '*')
  })
  // match routes for js/css resources and serve the static files
  .match('/static/:path*', ({ serveStatic, cache }) => {
    cache(edgeAndBrowser)
    serveStatic('dist/static/:path*')
  })
  // match client-side routes that aren't a static asset
  // and serve the app shell. client-side router will
  // handle the route once it is rendered
  .match('/:path*/:file([^\\.]+|)', ({ appShell, cache }) => {
    cache(edgeOnly)
    appShell('dist/index.html')
  })
  // match other assets such as favicon, manifest.json, etc
  .match('/:path*', ({ serveStatic, cache }) => {
    cache(edgeOnly)
    serveStatic('dist/:path*')
  })
  // send any unmatched request to serve the static index.html
  .fallback(({ serveStatic }) => serveStatic('dist/index.html'))
