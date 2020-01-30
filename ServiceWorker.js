var cacheNames = 'cache-v7a';
var fileCache = [
  '/',
  'https://cdn.jsdelivr.net/gh/DroidTamvan/css-js@2.0/favicon.ico',
  'https://cdn.jsdelivr.net/gh/DroidTamvan/css-js@2.0/donation.png',
  'https://cdn.jsdelivr.net/gh/DroidTamvan/css-js@2.0/DT-XrX.webp',
  'https://cdn.jsdelivr.net/gh/DroidTamvan/css-js@2.0/thumbnail-yt.webp',
  'https://cdn.jsdelivr.net/gh/DroidTamvan/css-js@2.0/SAMPM.jpg',
  'https://cdn.jsdelivr.net/gh/DroidTamvan/css-js@2.0/bootstrap.css',
  'https://cdn.jsdelivr.net/gh/DroidTamvan/css-js@2.0/bootstrap.js',
  'https://cdn.jsdelivr.net/gh/DroidTamvan/css-js@2.0/jquery.js'
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