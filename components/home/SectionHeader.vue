<script setup lang="ts">
// Consistent section header: small label (eyebrow) + title + subtitle.
withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    subtitle?: string
    align?: 'center' | 'left'
  }>(),
  { align: 'center' },
)
</script>

<template>
  <header class="section-header" :class="`section-header--${align}`">
    <span v-if="eyebrow" class="section-header__eyebrow">{{ eyebrow }}</span>
    <h2 class="section-header__title">{{ title }}</h2>
    <p v-if="subtitle" class="section-header__subtitle">{{ subtitle }}</p>
  </header>
</template>

<style scoped lang="scss">
.section-header {
  @include flex(column, flex-start, center, spacing('sm'));
  max-width: 640px;
  margin-inline: auto;

  &--center {
    text-align: center;
    align-items: center;
  }
  &--left {
    text-align: left;
    align-items: flex-start;
    margin-inline: 0;
  }

  &__eyebrow {
    display: inline-block;
    padding: spacing('xs') spacing('md');
    font-size: font-size('xs');
    font-weight: $font-weight-bold;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: $color-primary-dark;
    background: rgba($color-primary, 0.1);
    border-radius: $radius-pill;
  }

  &__title {
    margin: 0;
  }

  &__subtitle {
    font-size: font-size('md');
    color: $color-text-muted;
  }
}
</style>
