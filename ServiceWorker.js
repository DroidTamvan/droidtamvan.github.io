var cacheNames = 'v2';
var urlsToCache = [
  '/',
  '/favicon.ico',
  'https://cdn.jsdelivr.net/gh/DroidTamvan/css-js@1.8/donation.png',
  'https://cdn.jsdelivr.net/gh/DroidTamvan/css-js@1.8/DT-XrX.webp',
  'https://cdn.jsdelivr.net/gh/DroidTamvan/css-js@1.8/thumbnail-yt.webp',
  'https://cdn.jsdelivr.net/gh/DroidTamvan/css-js@1.8/SAMPM.jpg',
  'https://cdn.jsdelivr.net/gh/DroidTamvan/css-js@1.8/bootstrap.css',
  'https://cdn.jsdelivr.net/gh/DroidTamvan/css-js@1.8/bootstrap.js',
  'https://cdn.jsdelivr.net/gh/DroidTamvan/css-js@1.8/jquery.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(cacheNames)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', function(event) {

  var cacheWhitelist = ['v2'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            var responseToCache = response.clone();

            caches.open(cacheNames)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});
