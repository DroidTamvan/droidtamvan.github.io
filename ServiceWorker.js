var cacheNames = 'cache-23wawsd';
var fileCache = [
  './favicon.ico',
  'https://cdn.jsdelivr.net/gh/DroidTamvan/droidtamvan.github.io/src/img/1-min.jpg',
  'https://cdn.jsdelivr.net/gh/DroidTamvan/droidtamvan.github.io/src/img/2-min.jpg',
  'https://cdn.jsdelivr.net/gh/DroidTamvan/droidtamvan.github.io/src/img/3-min.jpg',
  'https://cdn.jsdelivr.net/gh/DroidTamvan/droidtamvan.github.io/src/img/donation.png',
  'https://cdn.jsdelivr.net/gh/DroidTamvan/droidtamvan.github.io/src/img/DT-XrX.webp',
  'https://cdn.jsdelivr.net/gh/DroidTamvan/droidtamvan.github.io/src/img/thumbnail-yt.webp',
  'https://cdn.jsdelivr.net/gh/DroidTamvan/droidtamvan.github.io/src/img/SAMPM.jpg',
  'https://cdn.jsdelivr.net/gh/DroidTamvan/droidtamvan.github.io@2e3ecd3/src/js/jquery.js',
  'https://cdn.jsdelivr.net/gh/DroidTamvan/droidtamvan.github.io@b40087b/src/css/bootstrap.css',
  'https://cdn.jsdelivr.net/gh/DroidTamvan/droidtamvan.github.io@ab67b7a/src/js/bootstrap.js',
  'https://cdn.jsdelivr.net/gh/DroidTamvan/droidtamvan.github.io@ee5206d/src/js/adtival.js'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(cacheNames).then(function (cache) {
      return cache.addAll(fileCache);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (key !== cacheNames) {
          return caches.delete(key);
        }
      }));
    }));
  return self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
    .then(function (response) {
      return response || fetch(event.request);
    })
  );
});