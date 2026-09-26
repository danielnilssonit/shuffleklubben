// Shuffleklubben: sparar spelet i webbläsaren så att det startar även utan internet
const CACHE = 'shuffle-f0e03343ff';
// 3D-modellerna har innehållet i namnet och ändras aldrig: de sparas i en egen cache som finns kvar mellan versionerna
const ASSETS = 'shuffle-assets', MODELS = ["./models-ca15b8a86b.bin.gz"];
const CORE = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './apple-touch-icon.png', './favicon-32.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(async c => {
    await c.addAll(CORE);
    try { await c.add(new Request('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js', {mode: 'cors'})); } catch (err) { /* hämtas första gången */ }
    try { const a = await caches.open(ASSETS); for (const f of MODELS) if (!(await a.match(f))) await a.add(f); } catch (err) { /* hämtas när de behövs */ }
  }).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('shuffle-') && k !== CACHE && k !== ASSETS).map(k => caches.delete(k))))
    .then(() => caches.open(ASSETS)).then(a => a.keys().then(ks => Promise.all(ks.filter(r => !MODELS.some(f => r.url.endsWith(f.slice(1)) || r.url.endsWith(f.replace(/\.gz$/, '').slice(1)))).map(r => a.delete(r)))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (req.headers.has('range')) return;
  if (url.origin === self.location.origin && /\/models-[0-9a-f]+\.bin(\.gz)?$/.test(url.pathname)) {
    e.respondWith(caches.open(ASSETS).then(a => a.match(req).then(hit => hit || fetch(req).then(res => { if (res.ok && res.status === 200) a.put(req, res.clone()); return res; }))));
    return;
  }
  if (url.origin === self.location.origin) {
    e.respondWith(fetch(req).then(res => {
      if (res.ok && res.status === 200) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req, {ignoreSearch: true}).then(hit => hit || caches.match('./index.html'))));
    return;
  }
  if (/(^|\.)cdnjs\.cloudflare\.com$|(^|\.)cdn\.jsdelivr\.net$|^fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res.ok || res.type === 'opaque') { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    })));
  }
});
