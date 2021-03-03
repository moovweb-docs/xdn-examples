/// <reference lib="es2018" />
/// <reference lib="webworker" />
import { precacheAndRoute } from 'workbox-precaching'
import { clientsClaim, skipWaiting } from 'workbox-core'
import { Prefetcher } from '@xdn/prefetch/sw'

declare const self: ServiceWorkerGlobalScope

skipWaiting()
clientsClaim()

precacheAndRoute(self.__WB_MANIFEST || [])

new Prefetcher().route()
