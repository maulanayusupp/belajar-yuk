import { fileURLToPath } from 'node:url'

// Path absolut ke folder abstracts agar variabel & mixin SCSS
// otomatis tersedia di SEMUA komponen tanpa perlu @use manual.
const abstracts = fileURLToPath(
  new URL('./assets/scss/abstracts/index.scss', import.meta.url),
)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: true,

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
      title: 'Belajar Yuk! — Bahasa Inggris & Matematika untuk Anak',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
        {
          name: 'description',
          content:
            'Platform belajar Bahasa Inggris & Matematika untuk anak usia 6 tahun ke atas. Interaktif, penuh animasi, dan suara.',
        },
        { name: 'theme-color', content: '#6C5CE7' },
      ],
      link: [
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
