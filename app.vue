<script setup lang="ts">
// SEO global: Open Graph & Twitter Card memakai URL absolut (dari
// runtimeConfig.public.siteUrl) — WAJIB absolut agar preview/thumbnail
// muncul saat link dibagikan di WhatsApp, Twitter, Facebook, dll.
const site = useRuntimeConfig().public
const route = useRoute()

const DESCRIPTION =
  'Bantu anak usia 6+ menguasai Bahasa Inggris & Matematika langkah demi langkah dengan ' +
  'metode Singapore Math yang terbukti — Number Bond, Ten Frame, hingga Phonics. Belajar ' +
  'terstruktur yang membangun fondasi kuat & rasa percaya diri sejak dini.'
const SHARE_TITLE = 'Belajar Yuk! — Kuasai Bahasa Inggris & Matematika Sejak Dini'
const ogImage = `${site.siteUrl}/og-image.png`

useSeoMeta({
  description: DESCRIPTION,
  // Open Graph (WhatsApp/Facebook/LinkedIn)
  ogType: 'website',
  ogSiteName: 'Belajar Yuk!',
  ogTitle: SHARE_TITLE,
  ogDescription: DESCRIPTION,
  ogImage: ogImage,
  ogImageSecureUrl: ogImage,
  ogImageType: 'image/png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'Belajar Yuk! — belajar Bahasa Inggris & Matematika untuk anak',
  ogLocale: 'id_ID',
  // Twitter
  twitterCard: 'summary_large_image',
  twitterTitle: SHARE_TITLE,
  twitterDescription: DESCRIPTION,
  twitterImage: ogImage,
})

// URL kanonik & og:url mengikuti halaman aktif.
const canonicalUrl = computed(() => `${site.siteUrl}${route.path}`)
useHead(() => ({
  link: [{ rel: 'canonical', href: canonicalUrl.value }],
  meta: [{ property: 'og:url', content: canonicalUrl.value }],
}))
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
