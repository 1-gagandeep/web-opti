const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
    '/index.html',
    '/styles.css',
    '/script.js',
    '/image.png'
];

// Install event: Open the cache and add resources
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Cache opened');
            return cache.addAll(urlsToCache).catch(error => {
                console.error('Failed to cache resources:', error);
            });
        })
    );
});

// Activate event: Cleanup old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Deleting old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Fetch event: Serve requests from cache or network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            // Return the cached response or fetch from network
            return cachedResponse || fetch(event.request).then(networkResponse => {
                // Optionally, cache the network response dynamically
                return caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
            }).catch(error => {
                console.error('Fetch failed:', error);
                throw error;
            });
        })
    );
});