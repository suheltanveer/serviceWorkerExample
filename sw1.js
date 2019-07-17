const cacheName = 'v1';

// Install Event
self.addEventListener('install', (e) => {
    console.log(`%cSW: ${e.type}`, 'font-weight: bold; color: deeppink');
})

// Activate Event
self.addEventListener('activate', e => {
    console.log(`%cSW: ${e.type}`, 'font-weight: bold; color: deeppink');
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('%cSW :: Deleting Old Cache', 'color: darkorange');
                        return caches.delete(cache)
                    }
                })
            )
        })
    )
})

// Fetch Event
self.addEventListener('fetch', e => {
    console.log('%cSW: ' + e.type, 'font-weight: bold; color: deeppink');
    e.respondWith(
        fetch(e.request).then(
            res => {
                const resClone = res.clone();
                caches.open(cacheName)
                    .then(cache => {
                        cache.put(e.request, resClone);
                    })
                return res;
            }
        ).catch(err => {
            caches.match(e.request)
                .then(res => res)
        })
    )
})
