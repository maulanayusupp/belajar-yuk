// Privacy analytics (Plausible) — cookie-free, lightweight.
// Only active when `NUXT_PUBLIC_PLAUSIBLE_DOMAIN` is set (e.g. the production domain).
// Automatically disabled during dev or when the domain is empty.
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
