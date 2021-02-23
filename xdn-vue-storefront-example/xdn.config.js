module.exports = {
  routes: './xdn/routes.js',
  backends: {
    origin: {
      domainOrIp: 'demo.vuestorefront.io',
      hostHeader: 'demo.vuestorefront.io',
    },
  },
  // server: {
  //   path: './dist-xdn-server/server.js',
  // },
  connector: './xdn',
  includeNodeModules: true,
  includeFiles: {
    './dist-xdn-server/server.js': true,
    './dist': true,
    './config': true,
  },
}
