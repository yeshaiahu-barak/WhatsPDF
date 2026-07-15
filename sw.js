self.addEventListener('install', event => {
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    clients.claim();
});

self.addEventListener('fetch', event => {
    if (event.request.method === 'POST' && event.request.url.includes('index.html')) {
        event.respondWith((async () => {
            const formData = await event.request.formData();
            const file = formData.get('file'); 
            
            // שומרים את השם המקורי של הקובץ בתוך כותרות התשובה (Headers)
            // משתמשים ב-encodeURIComponent כדי ששמות בעברית יעברו בצורה תקינה
            const headers = new Headers();
            headers.append('X-Original-Name', encodeURIComponent(file.name || 'WhatsApp_Chat.zip'));
            
            const cache = await caches.open('shared-file-cache');
            await cache.put('/shared-file', new Response(file, { headers: headers }));
            
            return Response.redirect('./index.html', 303);
        })());
    }
});
