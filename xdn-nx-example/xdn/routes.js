const path = require('path')
const { Router } = require('@xdn/core/router')
const NX_APP = require('./NX_APP')

const TIME_1H = 60 * 60;
const TIME_1D = TIME_1H * 24;

const CACHE = {
  edge: {
    maxAgeSeconds: TIME_1D,
    forcePrivateCaching: true,
  },
  browser: {
    maxAgeSeconds: TIME_1D,
    serviceWorkerSeconds: TIME_1D,
  },
};

const distRoot = `./dist/apps/${NX_APP}`
const distPublic = path.join(distRoot, 'public')
const distNext = path.join(distRoot, '.next')

const router = new Router()

// assets
router.get('/star.svg', ({ cache, serveStatic }) => {
  cache(CACHE)
  serveStatic(path.join(distPublic, 'star.svg'))
})
router.get('/nx-logo-white.svg', ({ cache, serveStatic }) => {
  cache(CACHE)
  serveStatic(path.join(distPublic, 'nx-logo-white.svg'))
})

// point nextjs static files
router.get('/_next/static/:path*', ({ cache, serveStatic }) => {
  cache(CACHE)
  serveStatic(`${path.join(distNext, 'static')}/:path*`)
})

// pages
router.get('/', ({ cache, renderWithApp }) => {
  cache(CACHE)
  renderWithApp()
})

// fallback
router.fallback(({ renderWithApp }) => {
  renderWithApp()
})

module.exports = router
