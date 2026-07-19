<script setup lang="ts">
// Global SEO: Open Graph & Twitter Card use absolute URLs (from
// runtimeConfig.public.siteUrl) — they MUST be absolute so the preview/thumbnail
// shows up when a link is shared on WhatsApp, Twitter, Facebook, etc.
const site = useRuntimeConfig().public
const route = useRoute()

const DESCRIPTION =
  'Satu aplikasi belajar untuk anak usia 6+: Bahasa Inggris, Matematika, Sains, Membaca, ' +
  'hingga Coding. Materi terstruktur per kategori usia (Tunas, Penjelajah, Juara) dengan metode ' +
  'terbukti — membangun fondasi kuat & rasa percaya diri sejak dini.'
const SHARE_TITLE = 'Belajar Yuk! — Inggris, Matematika, Sains, Membaca & Coding untuk Anak'
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
  ogImageAlt: 'Belajar Yuk! — belajar Inggris, Matematika, Sains, Membaca & Coding untuk anak',
  ogLocale: 'id_ID',
  // Twitter
  twitterCard: 'summary_large_image',
  twitterTitle: SHARE_TITLE,
  twitterDescription: DESCRIPTION,
  twitterImage: ogImage,
})

// Canonical URL & og:url follow the active page.
const canonicalUrl = computed(() => `${site.siteUrl}${route.path}`)
useHead(() => ({
  link: [{ rel: 'canonical', href: canonicalUrl.value }],
  meta: [{ property: 'og:url', content: canonicalUrl.value }],
}))

// Structured data (JSON-LD) for richer search results.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Belajar Yuk!',
  url: site.siteUrl,
  logo: `${site.siteUrl}/icon-512.png`,
  description: DESCRIPTION,
  audience: { '@type': 'EducationalAudience', educationalRole: 'student' },
}
useHead({
  script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(jsonLd) }],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
