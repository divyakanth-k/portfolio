const CACHE_NAME = "dk-portfolio-v3";

// Install — nothing to pre-cache, skip waiting to force update
self.addEventListener("install", (e) => {
  self.skipWaiting();
});

// Activate - Cleanup old caches
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)));
    }),
  );
  // Take control of uncontrolled clients
  self.clients.claim();
});

// Fetch — Stale-While-Revalidate strategy
self.addEventListener("fetch", (e) => {
  // Only intercept same-origin requests
  if (!e.request.url.startsWith(self.location.origin)) return;
  if (e.request.method !== "GET") return;

  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      // Start a network fetch in the background to update the cache
      const fetchPromise = fetch(e.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, responseClone);
          });
        }
        return networkResponse;
      });

      // Return the cached response immediately if there is one, otherwise wait for the network
      return cachedResponse || fetchPromise;
    }),
  );
});
