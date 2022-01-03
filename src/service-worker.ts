// @ts-check
/// <reference no-default-lib="false"/>
/// <reference lib="ES2015" />
/// <reference lib="webworker" />

import { build, files, timestamp } from '$service-worker';

const PRECACHE = `calculator-precache-${timestamp}`;

const CACHEABLE_ROUTES = ['/'];

// A list of local resources we always want to be cached.
const PRECACHE_URLS = build.concat(files).concat(CACHEABLE_ROUTES);

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', (event) => {
	event.waitUntil(
		(async () => {
			const cache = await caches.open(PRECACHE);
			await cache.addAll(PRECACHE_URLS);
			await self.skipWaiting();
		})()
	);
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', (event) => {
	console.log('meta', import.meta, import.meta.env);
	event.waitUntil(
		(async () => {
			const cacheKeys = await caches.keys();
			const cachesToDelete = cacheKeys.filter(
				(cacheName) => cacheName.startsWith('calculator') && cacheName != PRECACHE
			);
			await Promise.all(cachesToDelete.map((cacheToDelete) => caches.delete(cacheToDelete)));
			await self.clients.claim();
		})()
	);
});

self.addEventListener('fetch', (event) => {
	event.respondWith(
		(async () => {
			console.log('getting: ', event.request);
			const cache = await caches.open(PRECACHE);
			return await cache.match(event.request);
		})()
	);
});
