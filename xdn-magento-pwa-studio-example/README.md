# magento-pwa-studio

# Magento

Documentation for Magento PWA Studio packages is located at [https://pwastudio.io](https://pwastudio.io).

# XDN

Read more information about Deploying Magento PWA Studio on XDN [here](deploying-Magento-PWA-studio-on-XDN.md)
Read more information about XDN [here](https://developer.moovweb.com/guides/starter)

## Links

Project: https://moovweb.app/moovweb-demos/magento-pwa-studio

Preview: https://moovweb-demos-magento-pwa-studio-default.moovweb-edge.io

## Prerequisites

XDN application works with Magento application production build files.
To create it, follow the next steps.

1. Install packages: run `npm install` (or just `npm i`)
2. Build Magento application: `npm run build` (build files will appear in `dist` folder)

## Development

Make sure all the steps of [Prerequisites](#Prerequisites) section are completed before moving to this part

1. Build: `npm run xdn:build:full`
2. Run: `npm run xdn:start` (or run in production mode: `npm run xdn:start:prod`, !NOTE it doesn't support hot-reload)

## Deployment

Make sure all the steps of [Prerequisites](#Prerequisites) section are completed before moving to this part

1. Build: `npm run xdn:build:full`
2. Deploy: `npm run xdn:deploy`
