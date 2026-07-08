// Saat mode DEV: unregister service worker & bersihkan cache PWA.
// Mencegah service worker sisa dari build produksi (mis. `npm run preview`
// atau menjalankan .output di localhost) menyajikan bundle lama saat dev.
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
