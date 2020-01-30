var cacheNames = 'cache-v77';
var fileCache = [
  '/',
  'asset/favicon.ico',
  'https://cdn.jsdelivr.net/gh/DroidTamvan/css-js@1.9/donation.png',
  'https://cdn.jsdelivr.net/gh/DroidTamvan/css-js@1.9/DT-XrX.webp',
  'https://cdn.jsdelivr.net/gh/DroidTamvan/css-js@1.9/thumbnail-yt.webp',
  'https://cdn.jsdelivr.net/gh/DroidTamvan/css-js@1.9/SAMPM.jpg',
  'https://cdn.jsdelivr.net/gh/DroidTamvan/css-js@1.9/bootstrap.css',
  'https://cdn.jsdelivr.net/gh/DroidTamvan/css-js@1.9/bootstrap.js',
  'https://cdn.jsdelivr.net/gh/DroidTamvan/css-js@1.9/jquery.js'
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