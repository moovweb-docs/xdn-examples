// This file was automatically added by xdn deploy.
// You should commit this file to source control.
require('dotenv').config()
const { join } = require('path')

module.exports = {
  connector: '@xdn/next',
  includeFiles: {
    [join('.next', 'BUILD_ID')]: true,
  },
  backends: {
    api: {
      domainOrIp: 'moovweb-docs-xdn-examples-api-default.moovweb-edge.io',
      hostHeader: 'moovweb-docs-xdn-examples-api-default.moovweb-edge.io',
    },
  },
}
