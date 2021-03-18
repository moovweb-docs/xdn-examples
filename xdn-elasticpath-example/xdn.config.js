module.exports = {
  routes: './xdn/routes.js',
  backends: {
    origin: {
      domainOrIp: 'reference81.epdemos.com',
      hostHeader: 'reference81.epdemos.com',
    },
    images: {
      domainOrIp: 'ep-demo-assets.s3-us-west-2.amazonaws.com',
      hostHeader: 'ep-demo-assets.s3-us-west-2.amazonaws.com',
    },
  },
};