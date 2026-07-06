<script setup lang="ts">
import { range } from '~/utils/array'

// Sekelompok blok (pendekatan "Concrete" pada Singapore Math).
// Anak bisa menghitung blok satu per satu secara nyata.
withDefaults(
  defineProps<{ count: number; color?: 'a' | 'b' | 'sum'; label?: string }>(),
  { color: 'a' },
)
</script>

<template>
  <div class="block-group">
    <div class="block-group__blocks">
      <span
        v-for="i in range(count)"
        :key="i"
        class="block-group__block"
        :class="`block-group__block--${color}`"
        :style="{ '--i': i }"
        aria-hidden="true"
      />
    </div>
    <span v-if="label" class="block-group__label">{{ label }}</span>
  </div>
</template>

<style scoped lang="scss">
.block-group {
  @include flex(column, center, center, spacing('sm'));

  &__blocks {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: spacing('xs');
    justify-items: center;
  }

  &__block {
    width: 34px;
    height: 34px;
    border-radius: $radius-sm;
    box-shadow: $shadow-sm;
    // --i (indeks) menjeda animasi kemunculan tiap blok
    animation: bounce-in 0.4s $transition-bounce both;
    animation-delay: calc(var(--i) * 0.05s);

    &--a {
      background: $color-math;
    }
    &--b {
      background: $color-secondary;
    }
    &--sum {
      background: $color-success;
    }
  }

  &__label {
    font-size: font-size('xl');
    font-weight: $font-weight-bold;
    color: $color-text;
  }
}
</style>
