import { Prefetcher } from "@xdn/prefetch/sw";
import { clientsClaim, skipWaiting } from "workbox-core";
import { precacheAndRoute } from 'workbox-precaching';

skipWaiting();
clientsClaim();

precacheAndRoute(self.__WB_MANIFEST || []);

new Prefetcher().route();