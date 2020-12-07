import * as sapper from '@sapper/app'
import installDevtools from '@xdn/devtools/install'

installDevtools()
sapper.start({
  target: document.querySelector('#sapper'),
})
