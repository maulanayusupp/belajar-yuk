// Analitik privasi (Plausible) — tanpa cookie, ringan.
// Hanya aktif bila `NUXT_PUBLIC_PLAUSIBLE_DOMAIN` di-set (mis. domain produksi).
// Nonaktif otomatis saat dev atau bila domain kosong.
export default defineNuxtPlugin(() => {
  if (import.meta.dev) return
  const domain = useRuntimeConfig().public.plausibleDomain as string
  if (!domain) return

  useHead({
    script: [
      {
        src: 'https://plausible.io/js/script.js',
        defer: true,
        'data-domain': domain,
      },
    ],
  })
})
