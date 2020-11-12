// This file was automatically added by xdn deploy.
// You should commit this file to source control.
require('dotenv').config()
const { join } = require('path')

module.exports = {
  routes: './routes.ts',
  includeFiles: {
    [join('.next', 'BUILD_ID')]: true,
  }
}
