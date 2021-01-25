// This file was automatically added by xdn deploy.
// You should commit this file to source control.
const { Router } = require('@xdn/core/router');
const { default: NextRoutes } = require('@xdn/next/router/NextRoutes');

module.exports = new Router()
  .match('/service-worker.js', ({ serviceWorker }) => {
    return serviceWorker('.next/static/service-worker.js');
  })
  .use(new NextRoutes('apps/next-app'));
