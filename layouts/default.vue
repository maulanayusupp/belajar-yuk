<script setup lang="ts">
// Layout utama: header lengket + area konten + latar dekoratif.
const footerNav = [
  { to: '/', label: 'Beranda' },
  { to: '/kemajuan', label: 'Kemajuan' },
  { to: '/orangtua', label: 'Orang Tua' },
  { to: '/changelog', label: 'Changelog' },
]
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

    <footer class="layout__footer">
      <nav class="layout__footer-nav">
        <NuxtLink
          v-for="item in footerNav"
          :key="item.to"
          :to="item.to"
          class="layout__footer-link"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>
      <p>Dibuat dengan ❤️ untuk anak-anak hebat</p>
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

  &__footer {
    @include flex(column, flex-start, center, spacing('sm'));
    padding: spacing('lg');
    color: $color-text-muted;
    font-size: font-size('sm');
    text-align: center;
  }

  &__footer-nav {
    @include flex(row, center, center, spacing('sm'));
    flex-wrap: wrap;
  }

  &__footer-link {
    font-weight: $font-weight-semibold;
    color: $color-ink-soft;
    padding: spacing('xs') spacing('md');
    border-radius: $radius-pill;
    transition: all $transition-base;

    &:hover {
      color: $color-primary-dark;
      background: rgba($color-primary, 0.1);
    }

    &.router-link-active {
      color: $color-primary-dark;
      background: rgba($color-primary, 0.12);
    }
  }

  // Latar dekoratif (lingkaran warna lembut yang mengambang)
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
</style>
