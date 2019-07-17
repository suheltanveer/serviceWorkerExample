if ('serviceWorker' in navigator) {
    console.log('%cService Worker: Supported', 'color: slateblue');

    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('./sw1.js')
            .then(reg => console.log('%cService Worker: Registered', 'color: slateblue'))
            .catch(err => console.log(`Service Worker: Error ${err}`))
    })
} else {
    console.log('%cService Worker: Not supported', 'color: slateblue');
}