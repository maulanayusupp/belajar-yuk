<script setup lang="ts">
import { range, clamp } from '~/utils/array'

// Ten Frame: a 2×5 grid. For numbers > 10 (the teens),
// automatically shows several frames (a full 10 + the remainder) — which also
// introduces the "tens + ones" place value.
const props = defineProps<{ count: number }>()

// Number of frames & how many dots are filled in each frame.
const frames = computed(() => {
  const total = Math.max(1, Math.ceil(props.count / 10))
  return range(total).map((f) => clamp(props.count - f * 10, 0, 10))
})
</script>

<template>
  <div class="ten-frames" role="img" :aria-label="`${count} titik`">
    <div v-for="(filled, f) in frames" :key="f" class="ten-frame">
      <span
        v-for="i in range(10)"
        :key="i"
        class="ten-frame__cell"
        :class="{ 'ten-frame__cell--filled': i < filled }"
      >
        <span v-if="i < filled" class="ten-frame__dot" :style="{ '--i': i }" aria-hidden="true" />
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ten-frames {
  @include flex(row, center, center, spacing('md'));
  flex-wrap: wrap;
}

.ten-frame {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 6px;
  padding: 6px;
  background: rgba($color-math, 0.06);
  border-radius: $radius-md;

  &__cell {
    @include flex-center;
    width: 44px;
    height: 44px;
    background: $color-white;
    border: 2px solid rgba($color-math, 0.35);
    border-radius: $radius-sm;
  }

  &__dot {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: $gradient-math;
    box-shadow: $shadow-sm;
    animation: bounce-in 0.35s $transition-bounce both;
    animation-delay: calc(var(--i) * 0.04s);
  }
}
</style>
