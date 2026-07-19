<script setup lang="ts">
// Global premium glass header: logo + navigation + sound button.
const nav = [
  { to: '/english', label: 'Bahasa Inggris' },
  { to: '/math', label: 'Matematika' },
  { to: '/coding', label: 'Coding' },
  { to: '/latihan', label: 'Latihan Kilat' },
  { to: '/kemajuan', label: 'Kemajuan' },
]
</script>

<template>
  <header class="app-header">
    <div class="container app-header__inner">
      <NuxtLink to="/" class="app-header__logo">
        <span class="app-header__mark" aria-hidden="true">🎈</span>
        <span class="app-header__name">Belajar Yuk!</span>
      </NuxtLink>

      <nav class="app-header__nav">
        <NuxtLink v-for="item in nav" :key="item.to" :to="item.to" class="app-header__link">
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="app-header__actions">
        <NuxtLink
          to="/orangtua"
          class="app-header__parent"
          aria-label="Area Orang Tua"
          title="Area Orang Tua"
        >
          <span aria-hidden="true">👨‍👩‍👧</span>
        </NuxtLink>
        <BaseSoundToggle />
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.app-header {
  position: sticky;
  top: 0;
  z-index: $z-header;
  @include glass($glass-bg-strong);
  border-bottom: 1px solid $glass-border;
  box-shadow: $shadow-sm;

  &__inner {
    @include flex(row, space-between, center, spacing('md'));
    padding-block: spacing('sm');
  }

  &__logo {
    @include flex(row, flex-start, center, spacing('sm'));
    font-family: $font-family-display;
    font-weight: $font-weight-bold;
  }

  &__mark {
    font-size: font-size('xl');
    animation: float 4s ease-in-out infinite;
  }

  &__name {
    font-size: font-size('lg');
    @include gradient-text($gradient-primary);
  }

  &__nav {
    @include flex(row, center, center, spacing('xs'));
    display: none;

    @include respond-to('md') {
      display: flex;
    }
  }

  &__link {
    padding: spacing('xs') spacing('md');
    font-weight: $font-weight-semibold;
    color: $color-ink-soft;
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

  &__actions {
    @include flex(row, flex-end, center, spacing('sm'));
  }

  &__parent {
    @include flex-center;
    width: 48px;
    height: 48px;
    font-size: font-size('lg');
    background: $color-white;
    border-radius: $radius-pill;
    box-shadow: $shadow-sm;
    transition: transform $transition-base;

    &:hover {
      transform: translateY(-2px);
    }
  }
}
</style>
