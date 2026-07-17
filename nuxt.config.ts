import { fileURLToPath } from 'node:url'

// Absolute path to the abstracts folder so SCSS variables & mixins
// are automatically available in ALL components without manual @use.
const abstracts = fileURLToPath(new URL('./assets/scss/abstracts/index.scss', import.meta.url))

// REPLACE with your production domain. Used for absolute og:image
// & canonical URLs (MUST be absolute so WhatsApp/Twitter/Facebook previews show).
// Can also be overridden via env: NUXT_PUBLIC_SITE_URL.
// No trailing slash (og:url & canonical append the page's own path).
const SITE_URL = process.env.NUXT_PUBLIC_SITE_URL || 'https://belajar-yuk-kappa.vercel.app'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: true,

  modules: ['@vite-pwa/nuxt', '@nuxt/eslint'],

  runtimeConfig: {
    public: {
      siteUrl: SITE_URL,
      // Privacy analytics (cookieless) — set the domain via env
      // NUXT_PUBLIC_PLAUSIBLE_DOMAIN to enable. Empty = disabled.
      plausibleDomain: process.env.NUXT_PUBLIC_PLAUSIBLE_DOMAIN || '',
    },
  },

  // Progressive Web App: can be installed & used offline.
  // The service worker is only active in production builds (not dev).
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Belajar Yuk! — Bahasa Inggris & Matematika untuk Anak',
      short_name: 'Belajar Yuk!',
      description:
        'Bantu anak usia 6+ menguasai Bahasa Inggris & Matematika dengan metode Singapore Math yang terbukti. Belajar terstruktur membangun fondasi kuat sejak dini.',
      lang: 'id',
      theme_color: '#6C5CE7',
      background_color: '#f4f3ff',
      display: 'standalone',
      orientation: 'portrait',
      start_url: '/',
      icons: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
      navigateFallback: '/',
    },
    devOptions: { enabled: false },
  },

  // Global stylesheet (reset, typography, animations, utilities)
  css: ['~/assets/scss/main.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
          // Inject design tokens (variables/mixins/functions) into every .scss file
          additionalData: `@use "${abstracts}" as *;`,
        },
      },
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'id' },
      // Default title + template: page titles automatically get a brand suffix.
      title: 'Kuasai Bahasa Inggris & Matematika Sejak Dini',
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
            'belajar bahasa inggris anak, belajar matematika anak, singapore math, number bond, ten frame, phonics anak, fondasi matematika anak, kosakata bahasa inggris, belajar terstruktur, calistung, persiapan sekolah, edukasi anak usia dini',
        },
        // App color & name for "Add to Home Screen"
        { name: 'apple-mobile-web-app-title', content: 'Belajar Yuk!' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
      ],
      link: [
        // Favicon & icons
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        // manifest.webmanifest is injected automatically by the @vite-pwa/nuxt module
        // Fonts
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
