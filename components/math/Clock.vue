<script setup lang="ts">
// A simple analog clock face showing a whole hour (minute hand on 12).
// Purely presentational — used by the 'clock' math method.
const props = defineProps<{ hour: number }>()

const R = 46 // face radius
const C = 50 // center

// Hour numbers 1..12 placed around the face.
const numbers = computed(() =>
  Array.from({ length: 12 }, (_, i) => {
    const n = i + 1
    const rad = (n * 30 * Math.PI) / 180
    return { n, x: C + 34 * Math.sin(rad), y: C - 34 * Math.cos(rad) }
  }),
)

// Hour-hand tip (points at the hour; minute hand points up at 12).
const hourHand = computed(() => {
  const rad = ((props.hour % 12) * 30 * Math.PI) / 180
  return { x: C + 22 * Math.sin(rad), y: C - 22 * Math.cos(rad) }
})
</script>

<template>
  <svg class="clock" viewBox="0 0 100 100" role="img" aria-label="Jam analog">
    <circle class="clock__face" :cx="C" :cy="C" :r="R" />
    <circle class="clock__ring" :cx="C" :cy="C" :r="R" />
    <text
      v-for="num in numbers"
      :key="num.n"
      class="clock__num"
      :x="num.x"
      :y="num.y"
      text-anchor="middle"
      dominant-baseline="central"
    >
      {{ num.n }}
    </text>
    <!-- minute hand (up to 12) -->
    <line class="clock__minute" :x1="C" :y1="C" :x2="C" :y2="C - 32" />
    <!-- hour hand -->
    <line class="clock__hour" :x1="C" :y1="C" :x2="hourHand.x" :y2="hourHand.y" />
    <circle class="clock__pin" :cx="C" :cy="C" r="3.2" />
  </svg>
</template>

<style scoped lang="scss">
.clock {
  width: 200px;
  max-width: 60vw;
  height: auto;

  &__face {
    fill: $color-white;
  }
  &__ring {
    fill: none;
    stroke: $color-math;
    stroke-width: 4;
  }
  &__num {
    font-family: $font-family-display;
    font-weight: $font-weight-bold;
    font-size: 9px;
    fill: $color-ink;
  }
  &__minute {
    stroke: $color-ink-soft;
    stroke-width: 2.5;
    stroke-linecap: round;
  }
  &__hour {
    stroke: $color-math;
    stroke-width: 4;
    stroke-linecap: round;
  }
  &__pin {
    fill: $color-math-dark;
  }
}
</style>
