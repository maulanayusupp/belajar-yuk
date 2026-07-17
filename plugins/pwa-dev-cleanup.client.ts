// In DEV mode: unregister the service worker & clear the PWA cache.
// Prevents a leftover service worker from a production build (e.g. `npm run preview`
// or running .output on localhost) from serving a stale bundle during dev.
export default defineNuxtPlugin(() => {
  if (!import.meta.dev) return
  if (typeof navigator === 'undefined') return

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations?.().then((regs) => {
      for (const reg of regs) reg.unregister()
    })
  }
  if (typeof caches !== 'undefined' && caches.keys) {
    caches.keys().then((keys) => keys.forEach((k) => caches.delete(k)))
  }
})
