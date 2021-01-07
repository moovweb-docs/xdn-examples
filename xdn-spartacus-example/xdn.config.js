'use strict'

// This file was automatically added by xdn deploy.
// You should commit this file to source control.

module.exports = {
  connector: '@xdn/spartacus',
  backends: {
    commerce: {
      domainOrIp: 'spartacus-dev0.eastus.cloudapp.azure.com',
      hostHeader: 'spartacus-dev0.eastus.cloudapp.azure.com',
      port: 9002,
      disableCheckCert: true,
    },
  },
}
