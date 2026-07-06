import { fileURLToPath } from 'node:url'

// Path absolut ke folder abstracts agar variabel & mixin SCSS
// otomatis tersedia di SEMUA komponen tanpa perlu @use manual.
const abstracts = fileURLToPath(
  new URL('./assets/scss/abstracts/index.scss', import.meta.url),
)

// GANTI dengan domain produksi Anda. Dipakai untuk URL absolut og:image
// & canonical (WAJIB absolut agar preview WhatsApp/Twitter/Facebook muncul).
// Bisa juga di-override lewat env: NUXT_PUBLIC_SITE_URL.
const SITE_URL = process.env.NUXT_PUBLIC_SITE_URL || 'https://belajar-yuk.example.com'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: true,

  runtimeConfig: {
    public: {
      siteUrl: SITE_URL,
    },
  },

  // Stylesheet global (reset, tipografi, animasi, utilities)
  css: ['~/assets/scss/main.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
          // Inject design-tokens (variabel/mixin/fungsi) ke setiap file .scss
          additionalData: `@use "${abstracts}" as *;`,
        },
      },
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'id' },
      // Judul default + template: judul halaman otomatis diberi akhiran merek.
      title: 'Belajar Bahasa Inggris & Matematika untuk Anak',
      titleTemplate: (title) =>
        title?.includes('Belajar Yuk') ? title : `${title ?? ''} · Belajar Yuk!`.trim(),
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5' },
        { name: 'theme-color', content: '#6C5CE7' },
        { name: 'author', content: 'Belajar Yuk!' },
        { name: 'robots', content: 'index, follow' },
        {
          name: 'keywords',
          content:
            'belajar bahasa inggris anak, belajar matematika anak, singapore math, number bond, belajar sambil bermain, edukasi anak, kosakata inggris, berhitung anak, usia 6 tahun',
        },
        // Warna & nama aplikasi saat "Add to Home Screen"
        { name: 'apple-mobile-web-app-title', content: 'Belajar Yuk!' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
      ],
      link: [
        // Favicon & ikon
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        // Font
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Nunito:ital,wght@0,400;0,600;0,700;0,800;1,600&display=swap',
        },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
})
