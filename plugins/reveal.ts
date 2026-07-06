// Directive `v-reveal`: elemen muncul dengan animasi saat masuk viewport
// (scroll-reveal). Pemakaian:
//   <div v-reveal>...</div>            // reveal biasa
//   <div v-reveal="150">...</div>      // dengan jeda 150ms (untuk stagger)
//
// Menghormati prefers-reduced-motion (tidak menyembunyikan apa pun).
// Directive didaftarkan universal (server + klien) agar SSR bisa me-resolve
// `v-reveal`; namun hook `mounted` hanya berjalan di klien, sehingga konten
// tetap terlihat di SSR / tanpa JS (tak ada class 'reveal' saat SSR).
const observers = new WeakMap<HTMLElement, IntersectionObserver>()

export default defineNuxtPlugin((nuxtApp) => {
  const prefersReduced =
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  nuxtApp.vueApp.directive('reveal', {
    mounted(el: HTMLElement, binding) {
      if (prefersReduced) return

      el.classList.add('reveal')
      const delay = typeof binding.value === 'number' ? binding.value : 0
      if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`)

      const io = new IntersectionObserver(
        (entries, obs) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              el.classList.add('is-visible')
              obs.unobserve(el)
            }
          }
        },
        { threshold: 0.12 },
      )
      io.observe(el)
      observers.set(el, io)
    },
    unmounted(el: HTMLElement) {
      observers.get(el)?.disconnect()
      observers.delete(el)
    },
  })
})
