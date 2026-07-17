const ASSETS = [
    './',
    './index.html',
    './app.js',
    './manifest.json',
    './data/adults/2026-q3.json',
    './data/children/2026-q3.json',
    './data/mission/2026-q3.json'
];

// Install event - cache static assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('lesson-cache-v1').then(cache => {
            return cache.addAll(ASSETS);
        })
    );
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== 'lesson-cache-v1') {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            // Return cached response if available
            if (response) {
                return response;
            }
            
            // Otherwise fetch from network
            return fetch(event.request).then(response => {
                // Cache successful responses
                if (!response || response.status !== 200 || response.type === 'error') {
                    return response;
                }
                
                const responseToCache = response.clone();
                caches.open('lesson-cache-v1').then(cache => {
                    cache.put(event.request, responseToCache);
                });
                
                return response;
            }).catch(() => {
                // Offline fallback
                return new Response('Offline - Cached content not available', {
                    status: 503,
                    statusText: 'Service Unavailable'
                });
            });
        })
    );
});
