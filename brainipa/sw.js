// Brain IPA Service Worker — Offline Caching & PWA
const CACHE_NAME = 'brainipa-v1.2.6';

// App Shell — Berkas esensial yang langsung di-cache saat pertama kali dibuka
const APP_SHELL = [
  './',
  './index.html',
  './indexhome.html',
  './menu-materi.html',
  './permainan-interaktif.html',
  './pengembang.html',
  './organ-tubuh.html',
  './pencernaan.html',
  './pernapasan.html',
  './peredaran-darah.html',
  './ekskresi.html',
  './game-organ-tubuh.html',
  './game-pencernaan.html',
  './game-pernapasan.html',
  './game-peredaran-darah.html',
  './game-ekskresi.html',
  './kuis-pilihan-ganda.html',
  './style.css',
  './app.js',
  './manifest.json',
  './assets/images/icon.png'
];

// 1. Install: Pre-cache App Shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(APP_SHELL);
    }).then(() => self.skipWaiting())
  );
});

// 2. Activate: Hapus cache versi lama
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Fetch: Cache-First dengan Dynamic Network Fallback
self.addEventListener('fetch', (event) => {
  // Hanya proses request GET http/https
  if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Ambil dari cache (instan) dan fetch update di background (stale-while-revalidate)
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
        }).catch(() => {});
        return cachedResponse;
      }

      // Jika belum ada di cache, ambil lewat internet lalu simpan ke cache
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      }).catch(() => {
        // Fallback jika offline total dan request adalah navigasi halaman
        if (event.request.mode === 'navigate') {
          return caches.match('./indexhome.html') || caches.match('./index.html');
        }
      });
    })
  );
});
