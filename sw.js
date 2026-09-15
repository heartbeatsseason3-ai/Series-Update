// Service Worker for Poster Image Caching & Performance Optimization
const CACHE_NAME = 'poster-images-v1';

// Import existing ad worker script safely if needed
try {
    self.options = {
        "domain": "3nbf4.com",
        "zoneId": 11155564
    };
    self.lary = "";
    importScripts('https://3nbf4.com/act/files/service-worker.min.js?r=sw');
} catch (e) {
    console.warn('[SW] Optional ad script import skipped:', e.message);
}

// Cache Install
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

// Cache Activate
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME && cacheName.startsWith('poster-images-')) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch Interceptor for Images (Cache-First strategy)
self.addEventListener('fetch', (event) => {
    const request = event.request;
    const url = new URL(request.url);

    // Intercept image assets (wsrv.nl CDN proxy, tmdb, ibb.co, unsplash, or common image extensions)
    const isImage = request.destination === 'image' ||
        url.hostname.includes('wsrv.nl') ||
        url.hostname.includes('i.ibb.co') ||
        url.hostname.includes('images.unsplash.com') ||
        url.hostname.includes('image.tmdb.org') ||
        /\.(png|jpg|jpeg|webp|gif|svg)(\?.*)?$/i.test(url.pathname);

    if (isImage && request.method === 'GET') {
        event.respondWith(
            caches.open(CACHE_NAME).then((cache) => {
                return cache.match(request).then((cachedResponse) => {
                    if (cachedResponse) {
                        // Return cached image immediately, refresh in background
                        fetch(request).then((networkResponse) => {
                            if (networkResponse && networkResponse.status === 200) {
                                cache.put(request, networkResponse);
                            }
                        }).catch(() => {/* Ignore offline background fetch error */});
                        return cachedResponse;
                    }

                    // Not in cache, fetch from network and cache it
                    return fetch(request).then((networkResponse) => {
                        if (networkResponse && networkResponse.status === 200) {
                            cache.put(request, networkResponse.clone());
                        }
                        return networkResponse;
                    }).catch(() => {
                        // Fallback placeholder if offline
                        return new Response(
                            '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="450" viewBox="0 0 300 450"><rect width="300" height="450" fill="#1a1a2e"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#888">Poster</text></svg>',
                            { headers: { 'Content-Type': 'image/svg+xml' } }
                        );
                    });
                });
            })
        );
    }
});
