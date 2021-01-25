const next = require('next');
const createDevServer = require('@xdn/core/dev/createDevServer').default;
const srcDir = require('./nextSrcDir');
const cwd = process.cwd();

module.exports = async function dev() {
  process.chdir(srcDir);
  global.XDN_NEXT_APP = next({ dev: true });
  process.chdir(cwd);

  return createDevServer({
    label: 'Next',
    command: (port) => `npm start -- --port=${port}`,
    ready: [/on http:\/\/localhost:3001/i],
  });
};
