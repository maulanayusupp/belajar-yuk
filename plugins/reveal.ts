// Directive `v-reveal`: element appears with an animation when it enters the
// viewport (scroll-reveal). Usage:
//   <div v-reveal>...</div>            // normal reveal
//   <div v-reveal="150">...</div>      // with a 150ms delay (for staggering)
//
// Respects prefers-reduced-motion (doesn't hide anything).
// The directive is registered universally (server + client) so SSR can resolve
// `v-reveal`; however the `mounted` hook only runs on the client, so content
// stays visible during SSR / without JS (no 'reveal' class during SSR).
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
