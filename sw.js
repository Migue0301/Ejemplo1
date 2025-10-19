// Estructura bàsica de un Service Worker
const CACHE_NAME = "Mi-cache-v5";
const urlsToCache = [
    "index.html",
    "offline.html",
    "manifest.json",
    "icons/icon-96x96.png",
    "icons/icon-192x192.png",
    "icons/icon-512x512.png"
];

// 2.INSTALL -> se ejecuta al instalar el SW
self.addEventListener("install", event=>{
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache=> cache.addAll(urlsToCache))
    );
});

// 3. ACTIVATE -> se ejecuta al activar el Service Worker (limpia cachés antiguas)
self.addEventListener("activate", event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(keys=>
            Promise.all(
                keys.filter(key=>key !== CACHE_NAME)
                .map(key=> caches.delete(key))
            )
        )
    );
});

// 4. FETCH -> intercepta peticiones de la app
// intercepta cada petición de la PWA
// Buscar primero en caché
// Si no está, busca en Internet
// En caso de falla, muestra la página offline.html
self.addEventListener("fetch", event=>{
    event.respondWidth(
        caches.match(event.request).then(response => {
            return response || fetch(event.request).catch (() => caches.match("offline.html"));
        })
    );
});

// 5. PUSH -> notificaciones en segundo plano
// Manejo de notificaciones push (opcional)
self.addEventListener("push", event => {
    const data = event.data ? event.data.text() : "Notificación sin texto";
    event.waitUntil(
        self.ServiceWorkerRegistration.showNotification("Mi PWA", {body: data})
    );
});