/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-ff0e8e0';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./druhe_mesto_005.html","./druhe_mesto_006.html","./druhe_mesto_002.html","./druhe_mesto_007.html","./druhe_mesto_008.html","./druhe_mesto_009.html","./druhe_mesto_010.html","./druhe_mesto_011.html","./druhe_mesto_012.html","./druhe_mesto_013.html","./druhe_mesto_014.html","./druhe_mesto_015.html","./druhe_mesto_016.html","./druhe_mesto_017.html","./druhe_mesto_018.html","./druhe_mesto_019.html","./druhe_mesto_020.html","./druhe_mesto_021.html","./druhe_mesto_022.html","./druhe_mesto_023.html","./druhe_mesto_024.html","./druhe_mesto_025.html","./druhe_mesto_026.html","./favicon.png","./index.html","./manifest.json","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/LiterataTT-TextSemibold.woff2","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/image001_fmt.png","./resources/image002_fmt.png","./resources/obalka_druhe_mesto_fmt.png","./resources/upoutavka_eknihy_fmt.png","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
