const CACHE_NAME = "dk-portfolio-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/blog.html",
  "/css/reset.css",
  "/css/variables.css",
  "/css/base.css",
  "/css/components.css",
  "/css/animations.css",
  "/css/sections.css",
  "/css/features.css",
  "/css/blog.css",
  "/js/main.js",
  "/js/features.js",
  "/js/blog.js",
  "/favicon.svg",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }),
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    }),
  );
});
