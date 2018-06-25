
var dataCacheName = 'gooshe-v1';
var cacheName = 'gooshe-final-1';
var filesToCache = [
  'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js',
  '/js/cookie.js',
  '/js/datatable.js',
  '/js/datetime.js',
  '/js/hichart.js',
  '/js/jquery.js',
  '/js/moment.js',

  '/style/bootstrap-theme.css',
  'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
  '/style/datatable.css',
  '/style/datepicker.css',

  
];




self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  
  return self.clients.claim();
});


