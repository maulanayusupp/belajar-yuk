<script setup lang="ts">
import { lessonService } from '~/services/lessonService'

// Global glass header: logo + navigation + actions.
// "Pelajaran" opens a colorful mega-menu (subjects + Coding); a few top-level
// links; a gradient "Mulai" CTA. Mobile uses a slide-down sheet.
const subjects = lessonService.getSubjects()

// Accent color per menu item (must match the SCSS theme tokens). Passed to the
// tile via a CSS custom property so styling stays in SCSS.
const ACCENT: Record<string, string> = {
  english: '#ff9f43',
  math: '#4b7bec',
  science: '#16c79a',
  bahasa: '#e8567c',
  coding: '#6c5ce7',
}
const learnMenu = [
  ...subjects.map((s) => ({
    to: `/${s.id}`,
    title: s.title,
    sub: s.titleEn,
    emoji: s.emoji,
    accent: s.theme as string,
  })),
  { to: '/coding', title: 'Coding', sub: 'Logika & Robot', emoji: '🤖', accent: 'coding' },
]
const links = [
  { to: '/materi', label: 'Daftar Materi' },
  { to: '/latihan', label: 'Latihan Kilat' },
  { to: '/kemajuan', label: 'Kemajuan' },
]

const route = useRoute()
const mobileOpen = ref(false)
const scrolled = ref(false)

watch(
  () => route.fullPath,
  () => (mobileOpen.value = false),
)

function onScroll() {
  scrolled.value = window.scrollY > 8
}
onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

const isLearnActive = computed(
  () => subjects.some((s) => route.path.startsWith(`/${s.id}`)) || route.path.startsWith('/coding'),
)
</script>

<template>
  <header class="hdr" :class="{ 'hdr--scrolled': scrolled }">
    <div class="container hdr__inner">
      <!-- Logo -->
      <NuxtLink to="/" class="hdr__logo" aria-label="Belajar Yuk! — Beranda">
        <span class="hdr__logo-badge">
          <img src="/favicon.svg" alt="" width="30" height="30" />
        </span>
        <span class="hdr__name">Belajar Yuk!</span>
      </NuxtLink>

      <!-- Desktop navigation -->
      <nav class="hdr__nav" aria-label="Navigasi utama">
        <div class="drop">
          <button
            class="navlink drop__trigger"
            :class="{ 'navlink--active': isLearnActive }"
            type="button"
            aria-haspopup="true"
          >
            Pelajaran <span class="drop__caret" aria-hidden="true">▾</span>
          </button>

          <div class="mega" role="menu">
            <NuxtLink
              v-for="item in learnMenu"
              :key="item.to"
              :to="item.to"
              class="mega__item"
              role="menuitem"
              :style="{ '--accent': ACCENT[item.accent] }"
            >
              <span class="mega__icon" aria-hidden="true">{{ item.emoji }}</span>
              <span class="mega__text">
                <span class="mega__title">{{ item.title }}</span>
                <span class="mega__sub">{{ item.sub }}</span>
              </span>
              <span class="mega__arrow" aria-hidden="true">→</span>
            </NuxtLink>
          </div>
        </div>

        <NuxtLink v-for="item in links" :key="item.to" :to="item.to" class="navlink">
          {{ item.label }}
        </NuxtLink>
      </nav>

      <!-- Actions -->
      <div class="hdr__actions">
        <BaseSoundToggle />
        <NuxtLink
          to="/orangtua"
          class="hdr__icon"
          aria-label="Area Orang Tua"
          title="Area Orang Tua"
        >
          <span aria-hidden="true">👨‍👩‍👧</span>
        </NuxtLink>
        <NuxtLink to="/tes" class="hdr__cta">
          <span aria-hidden="true">🚀</span> <span class="hdr__cta-label">Mulai</span>
        </NuxtLink>
        <button
          class="hdr__burger"
          type="button"
          :aria-expanded="mobileOpen"
          aria-label="Buka menu"
          @click="mobileOpen = !mobileOpen"
        >
          <span class="hdr__burger-box" :class="{ 'hdr__burger-box--open': mobileOpen }">
            <span /><span /><span />
          </span>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <Transition name="sheet">
      <nav v-if="mobileOpen" class="sheet" aria-label="Menu">
        <div class="container sheet__inner">
          <NuxtLink to="/tes" class="sheet__cta">
            <span aria-hidden="true">🚀</span> Mulai Belajar
          </NuxtLink>

          <span class="sheet__label">Pelajaran</span>
          <div class="sheet__grid">
            <NuxtLink
              v-for="item in learnMenu"
              :key="item.to"
              :to="item.to"
              class="sheet__tile"
              :style="{ '--accent': ACCENT[item.accent] }"
            >
              <span class="sheet__tile-icon" aria-hidden="true">{{ item.emoji }}</span>
              {{ item.title }}
            </NuxtLink>
          </div>

          <span class="sheet__label">Jelajahi</span>
          <NuxtLink v-for="item in links" :key="item.to" :to="item.to" class="sheet__link">
            {{ item.label }}
          </NuxtLink>
          <NuxtLink to="/orangtua" class="sheet__link">Area Orang Tua</NuxtLink>
        </div>
      </nav>
    </Transition>
  </header>
</template>

<style scoped lang="scss">
.hdr {
  position: sticky;
  top: 0;
  z-index: $z-header;
  background: rgba(255, 255, 255, 0.68);
  backdrop-filter: blur($glass-blur) saturate(160%);
  border-bottom: 1px solid transparent;
  transition:
    box-shadow $transition-base,
    background $transition-base,
    border-color $transition-base;

  &--scrolled {
    background: rgba(255, 255, 255, 0.88);
    border-bottom-color: rgba($color-primary, 0.1);
    box-shadow: 0 8px 30px rgba(26, 16, 53, 0.08);
  }

  &__inner {
    @include flex(row, space-between, center, spacing('md'));
    padding-block: spacing('sm');
  }

  // ---- Logo ----
  &__logo {
    @include flex(row, flex-start, center, spacing('sm'));
    flex-shrink: 0;
  }

  &__logo-badge {
    @include flex-center;
    width: 42px;
    height: 42px;
    border-radius: 32%;
    background: $gradient-primary;
    box-shadow: 0 6px 16px rgba($color-primary, 0.35);
    transition: transform $transition-base;

    img {
      width: 30px;
      height: 30px;
      filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.15));
    }
  }

  &__logo:hover &__logo-badge {
    transform: rotate(-6deg) scale(1.05);
  }

  &__name {
    font-family: $font-family-display;
    font-weight: $font-weight-bold;
    font-size: font-size('lg');
    @include gradient-text($gradient-primary);
  }

  // ---- Desktop nav ----
  &__nav {
    @include flex(row, center, center, spacing('xs'));
    display: none;
    padding: 5px;
    border-radius: $radius-pill;
    background: rgba($color-primary, 0.05);
    border: 1px solid rgba($color-primary, 0.07);

    @include respond-to('lg') {
      display: flex;
    }
  }

  // ---- Actions ----
  &__actions {
    @include flex(row, flex-end, center, spacing('sm'));
    flex-shrink: 0;
  }

  &__icon {
    @include flex-center;
    @include tappable;
    width: 42px;
    height: 42px;
    font-size: font-size('md');
    background: $color-white;
    border-radius: $radius-pill;
    box-shadow: $shadow-sm;
    border: 1px solid rgba($color-primary, 0.1);
    transition:
      transform $transition-fast,
      box-shadow $transition-base;
    display: none;

    &:hover {
      transform: translateY(-2px);
      box-shadow: $shadow-md;
    }

    @include respond-to('lg') {
      display: flex;
    }
  }

  &__cta {
    @include flex(row, center, center, spacing('xs'));
    @include tappable;
    padding: spacing('sm') spacing('lg');
    font-family: $font-family-display;
    font-weight: $font-weight-bold;
    color: $color-white;
    background: $gradient-primary;
    border-radius: $radius-pill;
    box-shadow: 0 8px 20px rgba($color-primary, 0.35);
    transition:
      transform $transition-fast,
      box-shadow $transition-base;
    display: none;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 26px rgba($color-primary, 0.45);
    }

    @include respond-to('lg') {
      @include flex(row, center, center, spacing('xs'));
    }
  }

  // ---- Hamburger (mobile only) ----
  &__burger {
    @include flex-center;
    @include tappable;
    width: 42px;
    height: 42px;
    background: $color-white;
    border-radius: $radius-pill;
    box-shadow: $shadow-sm;
    border: 1px solid rgba($color-primary, 0.1);

    @include respond-to('lg') {
      display: none;
    }
  }

  &__burger-box {
    position: relative;
    width: 20px;
    height: 14px;

    span {
      position: absolute;
      left: 0;
      width: 100%;
      height: 2.5px;
      border-radius: 2px;
      background: $color-primary-dark;
      transition:
        transform $transition-base,
        opacity $transition-fast,
        top $transition-base;

      &:nth-child(1) {
        top: 0;
      }
      &:nth-child(2) {
        top: 6px;
      }
      &:nth-child(3) {
        top: 12px;
      }
    }

    &--open span:nth-child(1) {
      top: 6px;
      transform: rotate(45deg);
    }
    &--open span:nth-child(2) {
      opacity: 0;
    }
    &--open span:nth-child(3) {
      top: 6px;
      transform: rotate(-45deg);
    }
  }
}

// ---- Nav links (desktop) ----
.navlink {
  @include flex(row, center, center, spacing('xs'));
  padding: spacing('xs') spacing('md');
  font-weight: $font-weight-semibold;
  color: $color-ink-soft;
  border-radius: $radius-pill;
  transition:
    color $transition-fast,
    background $transition-fast;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    color: $color-primary-dark;
    background: rgba($color-white, 0.9);
  }

  &.router-link-active,
  &--active {
    color: $color-primary-dark;
    background: $color-white;
    box-shadow: $shadow-sm;
  }
}

// ---- Mega-menu (desktop dropdown) ----
.drop {
  position: relative;

  &__caret {
    font-size: font-size('xs');
    transition: transform $transition-base;
  }

  &:hover .mega,
  &:focus-within .mega {
    opacity: 1;
    visibility: visible;
    transform: translate(-50%, 0);
  }
  &:hover &__caret,
  &:focus-within &__caret {
    transform: rotate(180deg);
  }
}

.mega {
  position: absolute;
  top: calc(100% + #{spacing('sm')});
  left: 50%;
  transform: translate(-50%, 10px);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: spacing('xs');
  width: 480px;
  max-width: 90vw;
  padding: spacing('sm');
  background: rgba(255, 255, 255, 0.97);
  backdrop-filter: blur($glass-blur);
  border-radius: $radius-xl;
  box-shadow: $shadow-lg;
  border: 1px solid rgba($color-primary, 0.1);
  opacity: 0;
  visibility: hidden;
  transition:
    opacity $transition-base,
    transform $transition-base,
    visibility $transition-base;

  // hover bridge so the menu doesn't close in the gap
  &::before {
    content: '';
    position: absolute;
    inset: -#{spacing('sm')} 0 auto 0;
    height: spacing('sm');
  }

  &__item {
    @include flex(row, flex-start, center, spacing('sm'));
    position: relative;
    padding: spacing('sm');
    border-radius: $radius-lg;
    transition: background $transition-fast;
    overflow: hidden;

    &:hover {
      background: color-mix(in srgb, var(--accent) 12%, transparent);
    }

    &:hover .mega__arrow {
      opacity: 1;
      transform: translateX(0);
    }
  }

  &__icon {
    @include flex-center;
    width: 44px;
    height: 44px;
    font-size: font-size('lg');
    border-radius: $radius-md;
    background: color-mix(in srgb, var(--accent) 16%, white);
    box-shadow: inset 0 0 0 1.5px color-mix(in srgb, var(--accent) 30%, transparent);
    flex-shrink: 0;
  }

  &__text {
    @include flex(column, center, flex-start);
    min-width: 0;
  }

  &__title {
    font-weight: $font-weight-bold;
    color: $color-ink;
    line-height: 1.2;
  }

  &__sub {
    font-size: font-size('xs');
    color: $color-text-muted;
  }

  &__arrow {
    margin-left: auto;
    color: var(--accent);
    font-weight: $font-weight-bold;
    opacity: 0;
    transform: translateX(-6px);
    transition:
      opacity $transition-fast,
      transform $transition-fast;
  }
}

// ---- Mobile sheet ----
.sheet {
  @include respond-to('lg') {
    display: none;
  }

  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur($glass-blur);
  border-bottom: 1px solid rgba($color-primary, 0.1);
  box-shadow: $shadow-lg;

  &__inner {
    @include flex(column, flex-start, stretch, spacing('xs'));
    padding-block: spacing('md') spacing('lg');
  }

  &__cta {
    @include flex(row, center, center, spacing('xs'));
    @include tappable;
    margin-bottom: spacing('sm');
    padding: spacing('md');
    font-family: $font-family-display;
    font-weight: $font-weight-bold;
    font-size: font-size('md');
    color: $color-white;
    background: $gradient-primary;
    border-radius: $radius-lg;
    box-shadow: 0 8px 20px rgba($color-primary, 0.3);
  }

  &__label {
    font-size: font-size('xs');
    font-weight: $font-weight-bold;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: $color-text-muted;
    margin-top: spacing('sm');
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: spacing('xs');
  }

  &__tile {
    @include flex(row, flex-start, center, spacing('sm'));
    padding: spacing('sm') spacing('md');
    font-weight: $font-weight-bold;
    color: $color-ink;
    border-radius: $radius-md;
    background: color-mix(in srgb, var(--accent) 10%, white);
    box-shadow: inset 0 0 0 1.5px color-mix(in srgb, var(--accent) 22%, transparent);

    &:active {
      transform: scale(0.98);
    }
  }

  &__tile-icon {
    @include flex-center;
    width: 30px;
    height: 30px;
    font-size: font-size('md');
    border-radius: $radius-sm;
    background: color-mix(in srgb, var(--accent) 18%, white);
    flex-shrink: 0;
  }

  &__link {
    @include flex(row, flex-start, center, spacing('sm'));
    padding: spacing('sm') spacing('md');
    font-weight: $font-weight-semibold;
    color: $color-ink;
    border-radius: $radius-md;

    &:hover,
    &.router-link-active {
      background: rgba($color-primary, 0.1);
      color: $color-primary-dark;
    }
  }
}

.sheet-enter-active,
.sheet-leave-active {
  transition:
    opacity $transition-base,
    transform $transition-base;
}
.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
