const cacheName = 'v2';

// Install Event
self.addEventListener('install', (e) => {
    console.log(`%cSW: ${e.type}`, 'font-weight: bold; color: deeppink');
    console.log('hello');

})

// Activate Event
self.addEventListener('activate', e => {
    console.log(`%cSW: ${e.type}`, 'font-weight: bold; color: deeppink');
    // Remove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('%cSW :: Deleting Old Cache', 'color: darkorange');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
})

// Fetch Event
self.addEventListener('fetch', e => {
    console.log('%cSW: ' + e.type, 'font-weight: bold; color: deeppink');
    e.respondWith(
        fetch(e.request)
            .then(res => {
                // Make copy/clone of response
                const resClone = res.clone();
                // Open cahce
                caches.open(cacheName).then(cache => {
                    // Add response to cache
                    cache.put(e.request, resClone);
                });
                return res;
            })
            .catch(err => caches.match(e.request).then(res => res))
    );
})
