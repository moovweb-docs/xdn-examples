module.exports = {
  routes: './xdn/routes.js',
  backends: {
    origin: {
      domainOrIp: 'demo.vuestorefront.io',
      hostHeader: 'demo.vuestorefront.io',
    },
  },
  server: {
    path: './dist-xdn-server/server.js',
  },
  includeNodeModules: true,
};