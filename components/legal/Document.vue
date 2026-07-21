<script setup lang="ts">
// Shared prose shell for legal/compliance pages (Privacy, Terms). Keeps the
// reading layout & typography consistent; pages fill the body via the slot.
defineProps<{ title: string; updated: string; intro?: string }>()
</script>

<template>
  <article class="legal">
    <NuxtLink to="/" class="legal__back">← Beranda</NuxtLink>

    <header class="legal__head">
      <h1 class="legal__title">{{ title }}</h1>
      <p class="legal__updated">Terakhir diperbarui: {{ updated }}</p>
      <p v-if="intro" class="legal__intro">{{ intro }}</p>
    </header>

    <div class="legal__body">
      <slot />
    </div>

    <nav class="legal__more">
      <NuxtLink to="/privasi" class="legal__more-link">Kebijakan Privasi</NuxtLink>
      <NuxtLink to="/ketentuan" class="legal__more-link">Ketentuan Layanan</NuxtLink>
      <NuxtLink to="/orangtua" class="legal__more-link">Area Orang Tua</NuxtLink>
    </nav>
  </article>
</template>

<style scoped lang="scss">
.legal {
  @include flex(column, flex-start, stretch, spacing('lg'));
  max-width: 760px;
  margin-inline: auto;
  padding-block: spacing('lg');

  &__back {
    align-self: flex-start;
    font-weight: $font-weight-bold;
    color: $color-primary-dark;
    padding: spacing('xs') spacing('md');
    border-radius: $radius-pill;

    &:hover {
      background: rgba($color-primary, 0.1);
    }
  }

  &__head {
    @include flex(column, flex-start, flex-start, spacing('xs'));
  }

  &__title {
    margin: 0;
  }

  &__updated {
    margin: 0;
    font-size: font-size('sm');
    color: $color-text-muted;
  }

  &__intro {
    margin: spacing('xs') 0 0;
    color: $color-ink-soft;
  }

  &__body {
    @include glass($glass-bg-strong);
    padding: spacing('lg') spacing('xl');
    border-radius: $radius-xl;
    box-shadow: $shadow-sm;
    color: $color-ink;
    line-height: 1.7;

    // Prose styling for the slotted content (deep because content is projected).
    :deep(h2) {
      margin: spacing('lg') 0 spacing('sm');
      font-size: font-size('lg');
      color: $color-primary-dark;

      &:first-child {
        margin-top: 0;
      }
    }

    :deep(p) {
      margin: 0 0 spacing('md');
    }

    :deep(ul) {
      margin: 0 0 spacing('md');
      padding-left: spacing('lg');

      li {
        margin-bottom: spacing('xs');
      }
    }

    :deep(strong) {
      color: $color-ink;
    }

    :deep(a) {
      color: $color-primary-dark;
      font-weight: $font-weight-semibold;
      text-decoration: underline;
    }

    :deep(.legal__note) {
      padding: spacing('md');
      background: rgba($color-primary, 0.07);
      border-left: 4px solid $color-primary;
      border-radius: $radius-md;
      color: $color-ink-soft;
    }
  }

  &__more {
    @include flex(row, center, center, spacing('sm'));
    flex-wrap: wrap;
  }

  &__more-link {
    font-weight: $font-weight-semibold;
    color: $color-ink-soft;
    padding: spacing('xs') spacing('md');
    border-radius: $radius-pill;

    &:hover,
    &.router-link-active {
      color: $color-primary-dark;
      background: rgba($color-primary, 0.1);
    }
  }
}
</style>
