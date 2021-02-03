const createBuilder = require('@xdn/next/build/createBuilder').default;
const { join } = require('path');
const srcDir = require('./nextSrcDir');

module.exports = createBuilder({
  srcDir,
  distDir: join('dist', 'apps', 'next-app', '.next'),
  buildCommand: 'npm run build',
});
