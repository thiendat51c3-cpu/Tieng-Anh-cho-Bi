/* Service worker: ưu tiên mạng, rơi về bộ nhớ đệm khi offline để bé học mọi lúc */
const CACHE = 'be-vui-hoc-tieng-anh-v1';
const ASSETS = [
  './', 'index.html', 'css/style.css', 'icon.svg', 'manifest.webmanifest',
  'js/util.js', 'js/data.js', 'js/store.js', 'js/audio.js', 'js/fx.js',
  'js/games/flashcards.js', 'js/games/choice.js', 'js/games/balloon.js',
  'js/games/spell.js', 'js/games/memory.js', 'js/games/truefalse.js', 'js/app.js',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy));
        return res;
      })
      .catch(() => caches.match(req).then((hit) => hit || caches.match('index.html')))
  );
});
