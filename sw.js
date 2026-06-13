// ══════════════════════════════════════════════════════════════════
// SERVICE WORKER — Water & Workout Tracker PWA
// Handles: Caching (offline), Push Notifications, Notification Clicks
// ══════════════════════════════════════════════════════════════════

const CACHE_NAME = 'tracker-v1';
const APP_SHELL = [
    './',
    './index.html',
    './manifest.json'
];

// External resources to cache (fonts, GSAP)
const EXTERNAL_RESOURCES = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&family=Prompt:wght@400;500;600;700;800&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js'
];

// ─── INSTALL: Cache app shell ───
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                // Cache local files first (critical)
                return cache.addAll(APP_SHELL)
                    .then(() => {
                        // Try to cache external resources (non-blocking)
                        return Promise.allSettled(
                            EXTERNAL_RESOURCES.map(url =>
                                cache.add(url).catch(() => console.log('[SW] Could not cache:', url))
                            )
                        );
                    });
            })
            .then(() => self.skipWaiting()) // Activate immediately
    );
});

// ─── ACTIVATE: Clean old caches ───
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((keys) => {
                return Promise.all(
                    keys.filter(key => key !== CACHE_NAME)
                        .map(key => caches.delete(key))
                );
            })
            .then(() => self.clients.claim()) // Take control immediately
    );
});

// ─── FETCH: Cache-first with network fallback ───
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') return;

    event.respondWith(
        caches.match(event.request)
            .then((cached) => {
                if (cached) {
                    // Return cached version, but update cache in background
                    event.waitUntil(
                        fetch(event.request)
                            .then((response) => {
                                if (response && response.status === 200) {
                                    const clone = response.clone();
                                    caches.open(CACHE_NAME)
                                        .then((cache) => cache.put(event.request, clone));
                                }
                            })
                            .catch(() => { /* Network unavailable, cache is fine */ })
                    );
                    return cached;
                }

                // Not in cache — try network
                return fetch(event.request)
                    .then((response) => {
                        if (!response || response.status !== 200) return response;

                        // Cache successful responses for future offline use
                        const clone = response.clone();
                        caches.open(CACHE_NAME)
                            .then((cache) => cache.put(event.request, clone));

                        return response;
                    })
                    .catch(() => {
                        // Both cache and network failed
                        // For navigation requests, return cached index
                        if (event.request.mode === 'navigate') {
                            return caches.match('./index.html');
                        }
                    });
            })
    );
});

// ─── PUSH: Handle incoming push notifications ───
self.addEventListener('push', (event) => {
    let data = {
        title: '💧 Time for Water!',
        body: 'Keep your hydration streak going — log a sip now!',
        icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"%3E%3Crect width="192" height="192" rx="40" fill="%230F172A"/%3E%3Ctext x="96" y="110" text-anchor="middle" font-size="100"%3E💧%3C/text%3E%3C/svg%3E',
        badge: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"%3E%3Crect width="96" height="96" rx="20" fill="%230ea5e9"/%3E%3Ctext x="48" y="60" text-anchor="middle" font-size="50" fill="white"%3E💧%3C/text%3E%3C/svg%3E',
        tag: 'tracker-reminder',
        actions: [
            { action: 'log-water', title: '💧 Log Water' },
            { action: 'open-app', title: '📱 Open App' }
        ]
    };

    // Parse push payload if available
    if (event.data) {
        try {
            const payload = event.data.json();
            data = { ...data, ...payload };
        } catch (e) {
            // If not JSON, use text as body
            data.body = event.data.text() || data.body;
        }
    }

    const options = {
        body: data.body,
        icon: data.icon,
        badge: data.badge,
        tag: data.tag,
        renotify: true,
        requireInteraction: false,
        vibrate: [100, 50, 100, 50, 200],
        data: {
            url: data.url || './index.html',
            action: data.action || 'open'
        },
        actions: data.actions || []
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// ─── NOTIFICATION CLICK: Handle user interaction ───
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    const action = event.action;
    const url = event.notification.data?.url || './index.html';

    // Determine what to do based on action button clicked
    let targetUrl = url;
    if (action === 'log-water') {
        targetUrl = './index.html#water';
    } else if (action === 'open-app') {
        targetUrl = './index.html';
    }

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then((clientList) => {
                // If app is already open, focus it
                for (const client of clientList) {
                    if (client.url.includes('index.html') && 'focus' in client) {
                        return client.focus();
                    }
                }
                // Otherwise open a new window
                if (clients.openWindow) {
                    return clients.openWindow(targetUrl);
                }
            })
    );
});

// ─── MESSAGE: Handle messages from main app ───
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'MOCK_PUSH') {
        // Simulate a push notification (for testing)
        const data = event.data.payload || {};
        const options = {
            body: data.body || 'You haven\'t logged water in a while. Stay hydrated! 🚰',
            icon: data.icon || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"%3E%3Crect width="192" height="192" rx="40" fill="%230F172A"/%3E%3Ctext x="96" y="110" text-anchor="middle" font-size="100"%3E💧%3C/text%3E%3C/svg%3E',
            badge: data.badge || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"%3E%3Crect width="96" height="96" rx="20" fill="%230ea5e9"/%3E%3Ctext x="48" y="60" text-anchor="middle" font-size="50" fill="white"%3E💧%3C/text%3E%3C/svg%3E',
            tag: 'tracker-mock',
            renotify: true,
            vibrate: [100, 50, 100, 50, 200],
            data: { url: './index.html' },
            actions: [
                { action: 'log-water', title: '💧 Log Water' },
                { action: 'open-app', title: '📱 Open App' }
            ]
        };

        self.registration.showNotification(
            data.title || '💧 Hydration Reminder',
            options
        );
    }
});
