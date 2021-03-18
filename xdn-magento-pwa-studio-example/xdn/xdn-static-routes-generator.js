const path = require('path');
const fs = require('fs');

/**
 * @param {string} folder - resolved path of the folder to scan
 * @returns {string[]} - array of files relative paths
 */
function scanFiles(folder, _subfolder = '/') {
  return fs
    .readdirSync(folder, { withFileTypes: true })
    .flatMap(dirent => {
      if (dirent.isFile()) {
        return `${_subfolder}${dirent.name}`;
      } else {
        return scanFiles(path.resolve(folder, dirent.name), `${_subfolder}${dirent.name}/`);
      }
    });
}

/**
 * @param {string} msg - message to log
 * @param {number} mood - (neutral =0, positive >0, negative <0) 
 * @returns {void}
 */
function log(msg, mood=0) {
  const FgCyan = "\x1b[36m";
  const FgGreen = "\x1b[32m";
  const FgRed = "\x1b[31m";
  let color;
  if (mood === 0) {
    color = FgCyan;
  } else {
    color = mood > 0 ? FgGreen : FgRed;
  }
  console.info(color, `[xdn-static-routes-generator] ${msg}`);
}

// /////////////////////////////////////////////////////////////

const DIST_APP = '../dist';
const dist = path.resolve(__dirname, DIST_APP);
const files = scanFiles(dist);

// log result of what's found
if (files.length) {
  log('The following static app files found. They are going to be added to XDN router automatically...');
  files.forEach((file) => {
    log(`file found: ${file}`);
  });
} else {
  log('No static app files found. You\'ve probably forgot to make an angular app production build before working with XDN. Check README.md for steps.');
}

// generate xdn-static-routes.js file
fs.writeFile('xdn/xdn-static-routes.js',
`export default [
${files.reduce((output, file) => {
  return output.concat(`  '${file}',\n`);
}, '')}];\n`, (error) => {
  if (error) {
    throw error;
  }
  log('xdn-static-routes.js file created successfully\n', 1);
});