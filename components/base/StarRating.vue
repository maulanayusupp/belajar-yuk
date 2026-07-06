<script setup lang="ts">
import { range } from '~/utils/array'

// Menampilkan bintang penghargaan (mis. 2 dari 3). `animated`
// membuat bintang muncul satu per satu dengan efek "burst".
withDefaults(
  defineProps<{
    value: number
    max?: number
    size?: 'sm' | 'md' | 'lg'
    animated?: boolean
  }>(),
  { max: 3, size: 'md', animated: false },
)
</script>

<template>
  <div class="stars" :class="`stars--${size}`" role="img" :aria-label="`${value} dari ${max} bintang`">
    <span
      v-for="i in range(max)"
      :key="i"
      class="stars__item"
      :class="{ 'stars__item--filled': i < value, 'stars__item--animated': animated && i < value }"
      :style="animated ? { '--i': i } : undefined"
      aria-hidden="true"
    >
      ★
    </span>
  </div>
</template>

<style scoped lang="scss">
.stars {
  display: inline-flex;
  gap: spacing('xs');

  &__item {
    color: rgba($color-star, 0.25);
    line-height: 1;

    &--filled {
      color: $color-star;
      filter: drop-shadow(0 2px 4px rgba($color-star, 0.5));
    }

    // Nilai --i (indeks) dikirim untuk menjeda animasi tiap bintang.
    &--animated {
      animation: star-burst 0.5s $transition-bounce both;
      animation-delay: calc(var(--i) * 0.15s);
    }
  }

  &--sm {
    font-size: font-size('md');
  }
  &--md {
    font-size: font-size('xl');
  }
  &--lg {
    font-size: font-size('xxl');
  }
}
</style>
