const CACHE_NAME = 'wenlian-v3';
const APP_SHELL = [
  './', './index.html', './styles.css', './app.js', './workout-data.js',
  './manifest.webmanifest', './offline.html', './icon-192.png', './icon-512.png',
  './band-circles.webp', './band-pull-apart.webp',
  './band-face-pull.webp', './band-squat.webp',
  './treadmill-walk.webp', './chest-press.webp',
  './lat-pulldown.webp', './seated-row.webp',
  './leg-press.webp', './leg-curl.webp',
  './shoulder-press.webp', './foam-calf.webp',
  './foam-quad.webp', './foam-glute.webp',
  './foam-back.webp', './foam-thoracic.webp'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).then((response) => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put('./index.html', copy));
      return response;
    }).catch(() => caches.match('./index.html').then((cached) => cached || caches.match('./offline.html'))));
    return;
  }
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
    const copy = response.clone();
    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
    return response;
  })));
});
