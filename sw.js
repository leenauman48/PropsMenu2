const V='enfuego-v16';
const FILES=['./admin.html','./manifest.webmanifest','./icon-180.png','./logo.png','./logo-256.png','./logo-tab.jpg','./icon-192.png','./icon-512.png','./caveat-latin-700-normal.woff2','./patrick-hand-latin-400-normal.woff2'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(u.origin!==location.origin)return;
  const live=/festivals\.json$/.test(u.pathname)||/index\.html$/.test(u.pathname)||u.pathname.endsWith('/');
  if(live){e.respondWith(fetch(e.request).catch(()=>caches.match(e.request,{ignoreSearch:true})));return;}
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request)));
});
