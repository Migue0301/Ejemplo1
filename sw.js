// Estructura bàsica de un Service Worker

// !. Nombre del cachè y archivos a cachear 
const CACHE_NAME = "Mi-cache-v2";
const urlsToCache = [
    "./",
    "index.html",
    "offline.html",
    "icons/vision-icon.png",
    "icons/nuevo-logo.png",
    "icons/icon-512x512.png",
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
