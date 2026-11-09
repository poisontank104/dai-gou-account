const CACHE_NAME = "buybook-script-v1";
const ASSETS = ["./","./index.html","./manifest.json"];

self.addEventListener("install",evt=>{
  evt.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))
})
self.addEventListener("activate",evt=>{
  evt.waitUntil(self.clients.claim())
})
self.addEventListener("fetch",evt=>{
  evt.respondWith(caches.match(evt.request).then(r=>r||fetch(evt.request)))
})
self.addEventListener("sync",evt=>{
  if(evt.tag === "sync-drive"){
    evt.waitUntil(
      clients.matchAll().then(clients=>{
        clients.forEach(c=>c.postMessage({type:"DO_SYNC"}))
      })
    )
  }
})
