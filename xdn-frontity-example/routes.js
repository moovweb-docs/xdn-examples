// This file was added by xdn init.
// You should commit this file to source control.

const { Router } = require("@xdn/core/router");

const ONE_HOUR = 60 * 60;
const ONE_DAY = 24 * ONE_HOUR;
const ONE_YEAR = 365 * ONE_DAY;

module.exports = new Router()
  .get("/static/:path*", ({ cache, serveStatic }) => {
    cache({
      browser: {
        maxAgeSeconds: ONE_YEAR,
      },
      edge: {
        maxAgeSeconds: ONE_YEAR,
      },
    });
    serveStatic("build/static/:path*", {
      permanent: true,
    });
  })
  .get("/analyze/:path*", ({ cache, serveStatic }) => {
    cache({
      browser: false,
      edge: {
        maxAgeSeconds: ONE_YEAR,
      },
    });
    serveStatic("build/analyze/:path*");
  })
  .fallback(({ cache, renderWithApp }) => {
    cache({
      browser: false,
      edge: {
        maxAgeSeconds: ONE_DAY,
        staleWhileRevalidateSeconds: ONE_DAY,
      },
    });
    renderWithApp();
  });
