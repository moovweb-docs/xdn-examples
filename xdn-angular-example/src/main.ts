import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { AppModule } from './app/app.module'
import { environment } from './environments/environment'
import installDevtools from '@xdn/devtools/install'
import { install as installSW } from '@xdn/prefetch/window'

if (environment.production) {
  enableProdMode()
}

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err))

  installDevtools()
  installSW()
})
