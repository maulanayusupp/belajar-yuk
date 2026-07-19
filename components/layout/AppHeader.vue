<script setup lang="ts">
import { lessonService } from '~/services/lessonService'

// Global premium glass header: logo + navigation + actions.
// Subjects live under a "Pelajaran" dropdown (auto-includes every subject);
// Coding/Latihan/Kemajuan are top-level. Mobile uses a slide-down menu.
const subjects = lessonService.getSubjects()
const links = [
  { to: '/coding', label: 'Coding', emoji: '🤖' },
  { to: '/latihan', label: 'Latihan Kilat', emoji: '⚡' },
  { to: '/kemajuan', label: 'Kemajuan', emoji: '📊' },
]

const route = useRoute()
const mobileOpen = ref(false)
const scrolled = ref(false)

// Close the mobile menu whenever navigation happens.
watch(
  () => route.fullPath,
  () => (mobileOpen.value = false),
)

// Subtle shadow/opacity boost once the page is scrolled.
function onScroll() {
  scrolled.value = window.scrollY > 8
}
onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

const isSubjectActive = computed(() => subjects.some((s) => route.path.startsWith(`/${s.id}`)))
</script>

<template>
  <header class="hdr" :class="{ 'hdr--scrolled': scrolled }">
    <div class="container hdr__inner">
      <!-- Logo -->
      <NuxtLink to="/" class="hdr__logo" aria-label="Belajar Yuk! — Beranda">
        <span class="hdr__mark" aria-hidden="true">🎈</span>
        <span class="hdr__name">Belajar Yuk!</span>
      </NuxtLink>

      <!-- Desktop navigation -->
      <nav class="hdr__nav" aria-label="Navigasi utama">
        <div class="drop">
          <button
            class="hdr__link drop__trigger"
            :class="{ 'hdr__link--active': isSubjectActive }"
            type="button"
            aria-haspopup="true"
          >
            📚 Pelajaran <span class="drop__caret" aria-hidden="true">▾</span>
          </button>
          <div class="drop__menu" role="menu">
            <NuxtLink
              v-for="s in subjects"
              :key="s.id"
              :to="`/${s.id}`"
              class="drop__item"
              role="menuitem"
            >
              <span class="drop__item-emoji" aria-hidden="true">{{ s.emoji }}</span>
              <span>
                <span class="drop__item-title">{{ s.title }}</span>
                <span class="drop__item-sub">{{ s.titleEn }}</span>
              </span>
            </NuxtLink>
          </div>
        </div>

        <NuxtLink v-for="item in links" :key="item.to" :to="item.to" class="hdr__link">
          <span aria-hidden="true">{{ item.emoji }}</span> {{ item.label }}
        </NuxtLink>
      </nav>

      <!-- Actions -->
      <div class="hdr__actions">
        <NuxtLink
          to="/orangtua"
          class="hdr__icon-btn"
          aria-label="Area Orang Tua"
          title="Area Orang Tua"
        >
          <span aria-hidden="true">👨‍👩‍👧</span>
        </NuxtLink>
        <BaseSoundToggle />
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
          <span class="sheet__label">Pelajaran</span>
          <div class="sheet__grid">
            <NuxtLink v-for="s in subjects" :key="s.id" :to="`/${s.id}`" class="sheet__chip">
              <span aria-hidden="true">{{ s.emoji }}</span> {{ s.title }}
            </NuxtLink>
          </div>
          <span class="sheet__label">Jelajahi</span>
          <NuxtLink v-for="item in links" :key="item.to" :to="item.to" class="sheet__link">
            <span aria-hidden="true">{{ item.emoji }}</span> {{ item.label }}
          </NuxtLink>
          <NuxtLink to="/orangtua" class="sheet__link">
            <span aria-hidden="true">👨‍👩‍👧</span> Area Orang Tua
          </NuxtLink>
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
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur($glass-blur) saturate(140%);
  border-bottom: 1px solid rgba($color-primary, 0.08);
  transition:
    box-shadow $transition-base,
    background $transition-base;

  &--scrolled {
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 6px 24px rgba(26, 16, 53, 0.08);
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

  &__mark {
    @include flex-center;
    width: 40px;
    height: 40px;
    font-size: font-size('lg');
    background: $gradient-primary;
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    box-shadow: $shadow-primary;
    animation: float 4s ease-in-out infinite;
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

    @include respond-to('lg') {
      display: flex;
    }
  }

  &__link {
    @include flex(row, center, center, spacing('xs'));
    padding: spacing('xs') spacing('md');
    font-weight: $font-weight-semibold;
    color: $color-ink-soft;
    border-radius: $radius-pill;
    transition: all $transition-base;
    white-space: nowrap;

    &:hover {
      color: $color-primary-dark;
      background: rgba($color-primary, 0.09);
    }

    &.router-link-active,
    &--active {
      color: $color-primary-dark;
      background: rgba($color-primary, 0.14);
      box-shadow: inset 0 0 0 1.5px rgba($color-primary, 0.25);
    }
  }

  // ---- Actions ----
  &__actions {
    @include flex(row, flex-end, center, spacing('sm'));
    flex-shrink: 0;
  }

  &__icon-btn {
    @include flex-center;
    @include tappable;
    width: 44px;
    height: 44px;
    font-size: font-size('md');
    background: $color-white;
    border-radius: $radius-pill;
    box-shadow: $shadow-sm;
    border: 1px solid rgba($color-primary, 0.1);
  }

  // ---- Hamburger (mobile only) ----
  &__burger {
    @include flex-center;
    @include tappable;
    width: 44px;
    height: 44px;
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

// ---- Dropdown (desktop) ----
.drop {
  position: relative;

  &__trigger {
    cursor: pointer;
  }

  &__caret {
    font-size: font-size('xs');
    transition: transform $transition-base;
  }

  // Reveal on hover or keyboard focus.
  &:hover &__menu,
  &:focus-within &__menu {
    opacity: 1;
    visibility: visible;
    transform: translate(-50%, 0);
  }
  &:hover &__caret,
  &:focus-within &__caret {
    transform: rotate(180deg);
  }

  &__menu {
    position: absolute;
    top: calc(100% + #{spacing('sm')});
    left: 50%;
    transform: translate(-50%, 8px);
    min-width: 240px;
    padding: spacing('sm');
    background: rgba(255, 255, 255, 0.96);
    backdrop-filter: blur($glass-blur);
    border-radius: $radius-lg;
    box-shadow: $shadow-lg;
    border: 1px solid rgba($color-primary, 0.1);
    opacity: 0;
    visibility: hidden;
    transition: all $transition-base;

    // Hover bridge so the menu doesn't close in the gap.
    &::before {
      content: '';
      position: absolute;
      inset: -#{spacing('sm')} 0 auto 0;
      height: spacing('sm');
    }
  }

  &__item {
    @include flex(row, flex-start, center, spacing('sm'));
    padding: spacing('sm') spacing('md');
    border-radius: $radius-md;
    transition: background $transition-fast;

    &:hover,
    &.router-link-active {
      background: rgba($color-primary, 0.1);
    }
  }

  &__item-emoji {
    @include flex-center;
    width: 38px;
    height: 38px;
    font-size: font-size('md');
    background: rgba($color-primary, 0.08);
    border-radius: $radius-md;
    flex-shrink: 0;
  }

  &__item-title {
    display: block;
    font-weight: $font-weight-bold;
    color: $color-ink;
  }

  &__item-sub {
    display: block;
    font-size: font-size('xs');
    color: $color-text-muted;
  }
}

// ---- Mobile sheet ----
.sheet {
  @include respond-to('lg') {
    display: none;
  }

  background: rgba(255, 255, 255, 0.97);
  backdrop-filter: blur($glass-blur);
  border-bottom: 1px solid rgba($color-primary, 0.1);
  box-shadow: $shadow-md;

  &__inner {
    @include flex(column, flex-start, stretch, spacing('xs'));
    padding-block: spacing('md');
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

  &__chip,
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

  &__chip {
    background: rgba($color-primary, 0.05);
  }
}

// Slide-down transition for the mobile sheet.
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
