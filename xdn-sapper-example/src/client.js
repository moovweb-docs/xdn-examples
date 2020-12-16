import * as sapper from '@sapper/app'
import installDevtools from '@xdn/devtools/install'
import { install as installSW } from '@xdn/prefetch/window'

sapper.start({
  target: document.querySelector('#sapper'),
})

installDevtools()
installSW()
