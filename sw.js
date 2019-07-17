const cacheName = 'v1';

const cacheAssets = [
    'index.html',
    'about.html',
    'style.css',
    'main.js'
]

// Install Event
self.addEventListener('install', (e) => {
    console.log(`%cSW: ${e.type}`, 'font-weight: bold; color: deeppink');
    e.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                console.log('%cSW :: Caching Files', 'color: slateblue');
                cache.addAll(cacheAssets)
            })
            .then(() => self.skipWaiting())
    )
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
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)))
})
