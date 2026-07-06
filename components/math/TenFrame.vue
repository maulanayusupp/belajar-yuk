<script setup lang="ts">
import { range } from '~/utils/array'

// Ten Frame (Sepuluh Kotak): kerangka 2×5. `count` sel pertama diisi titik.
const props = defineProps<{ count: number }>()

function isFilled(i: number) {
  return i < props.count
}
</script>

<template>
  <div class="ten-frame" role="img" :aria-label="`${count} dari 10`">
    <span
      v-for="i in range(10)"
      :key="i"
      class="ten-frame__cell"
      :class="{ 'ten-frame__cell--filled': isFilled(i) }"
    >
      <span v-if="isFilled(i)" class="ten-frame__dot" :style="{ '--i': i }" aria-hidden="true" />
    </span>
  </div>
</template>

<style scoped lang="scss">
.ten-frame {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 6px;
  padding: 6px;
  background: rgba($color-math, 0.06);
  border-radius: $radius-md;

  &__cell {
    @include flex-center;
    width: 48px;
    height: 48px;
    background: $color-white;
    border: 2px solid rgba($color-math, 0.35);
    border-radius: $radius-sm;
  }

  &__dot {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: $gradient-math;
    box-shadow: $shadow-sm;
    animation: bounce-in 0.35s $transition-bounce both;
    animation-delay: calc(var(--i) * 0.05s);
  }
}
</style>
