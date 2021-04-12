const path = require('path');

module.exports = {
  target: 'node',
  mode: 'production',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist', '_xdn'), // should match server.path in xdn.config.js
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  entry: {
    server: './api/index.js' // this should point to your server entry point, which should export a function of type (request: Request, response: Response) => void or an express app as the default export.
  }
};
