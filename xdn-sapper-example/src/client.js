import * as sapper from '@sapper/app';
import installDevtools from '@xdn/devtools/install'
import { prefetch } from '@xdn/prefetch/window/prefetch'

installDevtools()
sapper.start({
	target: document.querySelector('#sapper')
}).then(() => {
  const { serviceWorker } = navigator
  if (serviceWorker) {
    serviceWorker.addEventListener('message', event => {
      if (event.data.action === 'prefetch') {
        prefetch(event.data.url, event.data.as, event.data.options)
      }
    })
  }
});
