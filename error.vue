<script setup lang="ts">
import type { NuxtError } from '#app'

// Global error page (used by Nuxt for 404 & other errors).
const props = defineProps<{ error: NuxtError }>()

const is404 = computed(() => props.error?.statusCode === 404)
const title = computed(() => (is404.value ? 'Yah, halaman tak ketemu!' : 'Ups, ada yang salah!'))
const message = computed(() =>
  is404.value
    ? 'Halaman yang kamu cari sepertinya sedang bersembunyi. Ayo kembali ke beranda!'
    : 'Jangan khawatir, ayo coba lagi dari beranda.',
)

// Clear the error and redirect to the home page.
function goHome() {
  clearError({ redirect: '/' })
}

useHead({ title: is404.value ? 'Halaman tak ditemukan' : 'Terjadi kesalahan' })
</script>

<template>
  <div class="error-page">
    <div class="error-page__card anim-bounce-in">
      <span class="error-page__mascot anim-float" aria-hidden="true">🦉</span>
      <p class="error-page__code">{{ error.statusCode }}</p>
      <h1 class="error-page__title">{{ title }}</h1>
      <p class="error-page__message">{{ message }}</p>
      <button class="error-page__btn" type="button" @click="goHome">🏠 Kembali ke Beranda</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.error-page {
  @include flex-center;
  min-height: 100vh;
  padding: spacing('lg');

  &__card {
    @include glass($glass-bg-strong);
    @include flex(column, center, center, spacing('md'));
    text-align: center;
    max-width: 460px;
    width: 100%;
    padding: spacing('xxl') spacing('xl');
    border-radius: $radius-xl;
    box-shadow: $shadow-xl;
  }

  &__mascot {
    font-size: font-size('giant');
  }

  &__code {
    @include gradient-text($gradient-primary);
    font-family: $font-family-display;
    font-weight: $font-weight-bold;
    font-size: font-size('display');
    line-height: 1;
  }

  &__title {
    margin: 0;
  }

  &__message {
    margin: 0;
  }

  &__btn {
    @include tappable;
    @include flex-center;
    gap: spacing('sm');
    margin-top: spacing('sm');
    padding: spacing('md') spacing('xl');
    font-family: $font-family-base;
    font-weight: $font-weight-bold;
    font-size: font-size('md');
    color: $color-white;
    background: $gradient-primary;
    border-radius: $radius-pill;
    box-shadow: $shadow-primary;
  }
}
</style>
