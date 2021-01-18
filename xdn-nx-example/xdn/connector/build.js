const path = require('path')
const fs = require('fs-extra');
const { DeploymentBuilder } = require('@xdn/core/deploy')
const FrameworkBuildError = require('@xdn/core/errors/FrameworkBuildError')
const NX_APP = require('../NX_APP')

const rootDir = process.cwd()
const distDir = path.join(rootDir, `./dist/apps/${NX_APP}`)
const lambdaDir = path.join(rootDir, './.xdn/lambda')

async function build({ skipFramework }) {
  const builder = new DeploymentBuilder()
  builder.clearPreviousBuildOutput()

  if (!skipFramework) {
    // run the NX build
    try {
      await builder.exec('nx build --prod')
    } catch (e) {
      // this lets the user know that the build error was within their application code, not their XDN router or configuration.
      throw new FrameworkBuildError('NX')
    }
  }

  // include nextjs server files
  await fs.copy(path.join(distDir, '.next'), path.join(lambdaDir, '.next'))
  
  // build the XDN deployment bundle in the .xdn directory
  await builder.build()
}

module.exports = build
