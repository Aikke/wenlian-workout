const CACHE_NAME = 'wenlian-v2';
const APP_SHELL = [
  './', './index.html', './styles.css', './app.js', './workout-data.js',
  './manifest.webmanifest', './offline.html', './assets/icon-192.png', './assets/icon-512.png',
  './assets/exercises/band-circles.webp', './assets/exercises/band-pull-apart.webp',
  './assets/exercises/band-face-pull.webp', './assets/exercises/band-squat.webp',
  './assets/exercises/treadmill-walk.webp', './assets/exercises/chest-press.webp',
  './assets/exercises/lat-pulldown.webp', './assets/exercises/seated-row.webp',
  './assets/exercises/leg-press.webp', './assets/exercises/leg-curl.webp',
  './assets/exercises/shoulder-press.webp', './assets/exercises/foam-calf.webp',
  './assets/exercises/foam-quad.webp', './assets/exercises/foam-glute.webp',
  './assets/exercises/foam-back.webp', './assets/exercises/foam-thoracic.webp'
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
