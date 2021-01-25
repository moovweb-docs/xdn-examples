// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');
const { withXDN, withServiceWorker } = require('@xdn/next/config');
module.exports = withXDN(withServiceWorker(withNx({})));
