<script setup lang="ts">
import { range } from '~/utils/array'

// Sekelompok blok (pendekatan "Concrete" pada Singapore Math).
// `taken` = jumlah blok terakhir yang "diambil" (memudar & dicoret) —
// dipakai untuk memvisualkan pengurangan.
const props = withDefaults(
  defineProps<{ count: number; color?: 'a' | 'b' | 'sum'; label?: string; taken?: number }>(),
  { color: 'a', taken: 0 },
)

// Sebuah blok dianggap "diambil" bila indeksnya termasuk `taken` terakhir.
function isTaken(i: number) {
  return i >= props.count - props.taken
}
</script>

<template>
  <div class="block-group">
    <div class="block-group__blocks">
      <span
        v-for="i in range(count)"
        :key="i"
        class="block-group__block"
        :class="[`block-group__block--${color}`, { 'block-group__block--taken': isTaken(i) }]"
        :style="{ '--i': i }"
        aria-hidden="true"
      >
        <span v-if="isTaken(i)" class="block-group__cross">✕</span>
      </span>
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
    @include flex-center;
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

    &--taken {
      opacity: 0.35;
      filter: grayscale(0.6);
    }
  }

  &__cross {
    color: $color-white;
    font-weight: $font-weight-bold;
    font-size: font-size('sm');
  }

  &__label {
    font-size: font-size('xl');
    font-weight: $font-weight-bold;
    color: $color-text;
  }
}
</style>
