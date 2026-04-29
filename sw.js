const CACHE_NAME = 'tdc-sinhly-v5-updated';
const urlsToCache = ['./', './index.html', './pdf-viewer.html', './manifest.json', 'https://cdn.tailwindcss.com', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css', 'https://cdn-icons-png.flaticon.com/512/3004/3004458.png', 'https://unpkg.com/react@18/umd/react.production.min.js', 'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js', 'https://unpkg.com/@babel/standalone/babel.min.js', './sinhlychuyenhoachatvanangluong.html', './sinhlycacdichcothe.html', './sinhlyco.html', './sinhlyhohap.html', './sinhlyhechucnangcaocaphethankinh.html', './sinhlyhethankinhcamgiac.html', './sinhlyhethankinhvanong.html', './sinhlymau.html', './sinhlynoron.html', './sinhlynoitiet.html', './sinhlysinhducsinhsan.html', './sinhlythantietnieu.html', './sinhlytieuhoa.html', './sinhlytuanhoan.html', './sinhlytebaovatraooichatquamang.html', './sinhlyieunhiet.html', './sinhlyienthemangvaienthehoatong.html'];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) return caches.delete(cacheName);
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      const fetchPromise = fetch(event.request).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, networkResponse.clone());
          });
        }
        return networkResponse;
      }).catch(err => {});
      return cachedResponse || fetchPromise;
    })
  );
});
