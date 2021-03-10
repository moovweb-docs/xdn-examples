const path = require('path')
const fs = require('fs')

const BUILD_ID = new Date().getTime()
fs.writeFileSync('BUILD_ID', BUILD_ID)

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, 'src', 'service-worker.ts'),
  output: {
    path: path.join(__dirname, 'dist', 'ngworkbox'),
    filename: 'service-worker.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          onlyCompileBundledFiles: true,
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.wasm', '.mjs', '.js', '.json'],
  },
}
