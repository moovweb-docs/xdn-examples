import { Prefetcher } from '@xdn/prefetch/sw'

importScripts('./ngsw-worker.js')

new Prefetcher().route()
