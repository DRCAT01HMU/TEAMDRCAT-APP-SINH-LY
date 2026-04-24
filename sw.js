const CACHE_NAME = 'tdc-sinhly-v4';
const urlsToCache = ['./', './index.html', './pdf-viewer.html', './manifest.json', 'https://cdn.tailwindcss.com', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css', 'https://cdn-icons-png.flaticon.com/512/3004/3004458.png', 'https://unpkg.com/react@18/umd/react.production.min.js', 'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js', 'https://unpkg.com/@babel/standalone/babel.min.js', './sinhlychuyenhoachatvanangluong.html', './sinhlycacdichcothe.html', './sinhlyco.html', './sinhlyhohap.html', './sinhlyhechucnangcaocaphethankinh.html', './sinhlyhethankinhcamgiac.html', './sinhlyhethankinhvanong.html', './sinhlymau.html', './sinhlynoron.html', './sinhlynoitiet.html', './sinhlysinhducsinhsan.html', './sinhlythantietnieu.html', './sinhlytieuhoa.html', './sinhlytuanhoan.html', './sinhlytebaovatraooichatquamang.html', './sinhlyieunhiet.html', './sinhlyienthemangvaienthehoatong.html'];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.error('Cache addAll failed:', err))
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(
          function(response) {
            // Allow caching of external CDNs (cors responses)
            if(!response || response.status !== 200 || (response.type !== 'basic' && response.type !== 'cors')) {
              return response;
            }
            var responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });
            return response;
          }
        ).catch(function() {
            // Ignore fetch errors
        });
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});
