// Minimal service worker for Qwik
/// <reference lib="webworker" />
const sw = self;
sw.addEventListener('install', (event) => {
    console.log('Service worker installing...');
    sw.skipWaiting();
});
sw.addEventListener('activate', (event) => {
    console.log('Service worker activating...');
    event.waitUntil(sw.clients.claim());
});
sw.addEventListener('fetch', (event) => {
    // Pass through all requests to the network
    return;
});
