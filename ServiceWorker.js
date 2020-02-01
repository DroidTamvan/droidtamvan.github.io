var cacheNames = 'cache-243ew';
var fileCache = [
  'https://cdn.jsdelivr.net/gh/DroidTamvan/css-js@2.3/favicon.ico',
  'https://2.bp.blogspot.com/-eeT0PbyC26U/Xcg-l9eXVxI/AAAAAAAAAe0/xRbp8w_-x_o4phNWS8YnqAMS34tXfMukwCLcBGAsYHQ/s1600/1-min.jpg',
  'https://2.bp.blogspot.com/-pkBo4euuNjE/Xcg-ljg1BaI/AAAAAAAAAew/fkErSFYsUiMnUE7UL8rlHTR3orpL65SXQCLcBGAsYHQ/s1600/2-min.jpg',
  'https://1.bp.blogspot.com/-_2IL0vYZARQ/Xcg-lvLBawI/AAAAAAAAAes/9RuuIcFV7gEzf5eIafB3rMK79tt3hsWVgCLcBGAsYHQ/s1600/3-min.jpg',
  'https://cdn.jsdelivr.net/gh/DroidTamvan/css-js@2.3/donation.png',
  'https://cdn.jsdelivr.net/gh/DroidTamvan/css-js@2.3/DT-XrX.webp',
  'https://cdn.jsdelivr.net/gh/DroidTamvan/css-js@2.3/thumbnail-yt.webp',
  'https://cdn.jsdelivr.net/gh/DroidTamvan/css-js@2.3/SAMPM.jpg',
  'https://cdn.jsdelivr.net/gh/DroidTamvan/css-js@2.3/jquery.js',
  'https://cdn.jsdelivr.net/gh/DroidTamvan/css-js@2.3/bootstrap.css',
  'https://cdn.jsdelivr.net/gh/DroidTamvan/css-js@2.3/bootstrap.js'
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
