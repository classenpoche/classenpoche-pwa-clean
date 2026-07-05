
const CACHE_NAME = "classenpoche-v1";

const ASSETS = [
  "./",
  "./index.html",
  "./app-v2.js",
  "./style.css",
  "./data/subjects.js",
  "./data/levels.js",
  "./data/courses.js",
  "./data/quizzes.js"
];


// INSTALL
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// ACTIVATE (SUPPRIME ANCIENS CACHES)
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => caches.delete(key))
      );
    })
  );

  self.clients.claim();
});

// FETCH (STRATEGIE PROPRE)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
