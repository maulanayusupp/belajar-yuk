<script setup lang="ts">
// Main layout: sticky header + content area + decorative background.
// Footer links grouped into meaningful columns instead of one long row.
const footerGroups = [
  {
    title: 'Belajar',
    links: [
      { to: '/', label: 'Beranda' },
      { to: '/materi', label: 'Daftar Materi' },
      { to: '/coding', label: 'Coding' },
      { to: '/latihan', label: 'Latihan Kilat' },
      { to: '/tes', label: 'Tes Penempatan' },
    ],
  },
  {
    title: 'Kemajuan',
    links: [
      { to: '/kemajuan', label: 'Kemajuan' },
      { to: '/sertifikat', label: 'Sertifikat' },
      { to: '/orangtua', label: 'Area Orang Tua' },
    ],
  },
  {
    title: 'Info',
    links: [
      { to: '/changelog', label: 'Changelog' },
      { to: '/privasi', label: 'Kebijakan Privasi' },
      { to: '/ketentuan', label: 'Ketentuan Layanan' },
    ],
  },
]
const year = new Date().getFullYear()
</script>

<template>
  <div class="layout">
    <div class="layout__decor" aria-hidden="true">
      <span class="layout__blob layout__blob--1" />
      <span class="layout__blob layout__blob--2" />
      <span class="layout__blob layout__blob--3" />
    </div>

    <LayoutAppHeader />

    <main class="layout__main">
      <div class="container">
        <slot />
      </div>
    </main>

    <footer class="ftr">
      <div class="container ftr__inner">
        <div class="ftr__grid">
          <!-- Brand -->
          <div class="ftr__brand">
            <NuxtLink to="/" class="ftr__logo" aria-label="Belajar Yuk! — Beranda">
              <img src="/favicon.svg" alt="" class="ftr__mark" width="44" height="44" />
              <span class="ftr__name">Belajar Yuk!</span>
            </NuxtLink>
            <p class="ftr__tagline">
              Belajar Bahasa Inggris, Matematika, Sains, Membaca &amp; Coding untuk anak usia 6+ —
              terstruktur, menyenangkan, dan membangun rasa percaya diri.
            </p>
          </div>

          <!-- Link columns -->
          <nav
            v-for="group in footerGroups"
            :key="group.title"
            class="ftr__col"
            :aria-label="group.title"
          >
            <span class="ftr__col-title">{{ group.title }}</span>
            <NuxtLink v-for="item in group.links" :key="item.to" :to="item.to" class="ftr__link">
              {{ item.label }}
            </NuxtLink>
          </nav>
        </div>

        <!-- Bottom bar -->
        <div class="ftr__bar">
          <p class="ftr__copy">© {{ year }} Belajar Yuk!</p>
          <p class="ftr__made">Dibuat dengan ❤️ untuk anak-anak hebat</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.layout {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;

  &__main {
    flex: 1;
    padding-block: spacing('xl');
  }

  // Decorative background (soft-colored floating circles)
  &__decor {
    position: fixed;
    inset: 0;
    z-index: -1;
    pointer-events: none;
  }

  &__blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    opacity: 0.18;
    animation: float 8s ease-in-out infinite;

    &--1 {
      width: 320px;
      height: 320px;
      background: $color-primary-light;
      top: -80px;
      left: -60px;
    }
    &--2 {
      width: 260px;
      height: 260px;
      background: $color-secondary;
      bottom: 10%;
      right: -60px;
      animation-delay: 2s;
    }
    &--3 {
      width: 200px;
      height: 200px;
      background: $color-english;
      top: 40%;
      left: 55%;
      animation-delay: 4s;
    }
  }
}

// ---- Footer ----
.ftr {
  margin-top: spacing('xl');
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur($glass-blur) saturate(140%);
  border-top: 1px solid rgba($color-primary, 0.1);

  &__inner {
    @include flex(column, flex-start, stretch, spacing('lg'));
    padding-block: spacing('xl') spacing('lg');
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: spacing('lg');

    @include respond-to('sm') {
      grid-template-columns: 1fr 1fr;
    }

    @include respond-to('lg') {
      grid-template-columns: 2.2fr 1fr 1fr 1fr;
      gap: spacing('xl');
    }
  }

  // Brand block
  &__brand {
    @include flex(column, flex-start, flex-start, spacing('sm'));

    @include respond-to('sm') {
      grid-column: 1 / -1;
    }

    @include respond-to('lg') {
      grid-column: auto;
      max-width: 340px;
    }
  }

  &__logo {
    @include flex(row, flex-start, center, spacing('sm'));
  }

  &__mark {
    width: 44px;
    height: 44px;
    border-radius: 26%;
    box-shadow: $shadow-sm;
  }

  &__name {
    font-family: $font-family-display;
    font-weight: $font-weight-bold;
    font-size: font-size('lg');
    @include gradient-text($gradient-primary);
  }

  &__tagline {
    margin: 0;
    color: $color-text-muted;
    font-size: font-size('sm');
    line-height: 1.6;
  }

  // Link columns
  &__col {
    @include flex(column, flex-start, flex-start, spacing('xs'));
  }

  &__col-title {
    margin-bottom: spacing('xs');
    font-size: font-size('xs');
    font-weight: $font-weight-bold;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: $color-ink;
  }

  &__link {
    font-weight: $font-weight-semibold;
    color: $color-ink-soft;
    font-size: font-size('sm');
    padding: spacing('xs') 0;
    transition: color $transition-base;

    &:hover {
      color: $color-primary-dark;
    }

    &.router-link-active {
      color: $color-primary-dark;
    }
  }

  // Bottom bar
  &__bar {
    @include flex(row, space-between, center, spacing('sm'));
    flex-wrap: wrap;
    padding-top: spacing('md');
    border-top: 1px solid rgba($color-primary, 0.1);
    color: $color-text-muted;
    font-size: font-size('sm');
  }

  &__copy,
  &__made {
    margin: 0;
  }
}
</style>
