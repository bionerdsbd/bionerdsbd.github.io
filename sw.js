/* BIO NERDS — অফলাইনে শুধু আগের খোলা পেজ দেখায়; সবসময় আগে নেট থেকে নতুনটা আনে */
const C = "bn-v8";
self.addEventListener("install", e => { self.skipWaiting(); e.waitUntil(caches.open(C).then(c => c.addAll(["./", "icon-192.png", "icon-512.png"]).catch(()=>{}))); });
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", e => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(r => { const cp = r.clone(); caches.open(C).then(c => c.put(e.request, cp)); return r; })
    .catch(() => caches.match(e.request).then(r => r || caches.match("./"))));
});
