'use strict';

// This file was automatically added by xdn deploy.
// You should commit this file to source control.

module.exports = {
  backends: {},
  includeNodeModules: true,
  connector: '@xdn/nuxt',
  server: {
    path: './dist/_xdn/server.js'
  },
  includeFiles: {
    'config/**': true,
    'api/**': true,
    'utils/**': true,
    '.env': true
  }
};
