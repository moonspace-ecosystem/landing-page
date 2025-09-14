// Minimal service worker for Qwik

/// <reference lib="webworker" />

const sw = self as unknown as ServiceWorkerGlobalScope;

sw.addEventListener('install', (event: ExtendableEvent) => {
  console.log('Service worker installing...');
  sw.skipWaiting();
});

sw.addEventListener('activate', (event: ExtendableEvent) => {
  console.log('Service worker activating...');
  event.waitUntil(sw.clients.claim());
});

sw.addEventListener('fetch', (event: FetchEvent) => {
  // Pass through all requests to the network
  return;
});