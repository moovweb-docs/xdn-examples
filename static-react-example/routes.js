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
  .match('/static/:path*', ({ cache, serveStatic }) => {
    cache(edgeAndBrowser)
    serveStatic('build/static/:path*')
  })
  .match('/:path*/:file([^\\.]+|)', ({ cache, appShell }) => {
    cache(edgeOnly)
    appShell('build/index.html')
  })
  .match('/:path*', ({ cache, serveStatic }) => {
    cache(edgeOnly)
    serveStatic('build/:path*')
  })

  // send any unmatched request to origin
  .fallback(({ cache, appShell }) => {
    cache(edgeOnly)
    appShell('build/index.html')
  })
