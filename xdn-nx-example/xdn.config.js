module.exports = {
  connector: './xdn/connector', // use the local connector
  routes: './xdn/routes.js', // the path to your routes file relative to the root of your app
  includeNodeModules: true, // include package.json "dependencies" in the build to be able to run the lambda app on cloud
}