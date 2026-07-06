<script setup lang="ts">
import { range } from '~/utils/array'

// Garis bilangan 0..max dengan penanda di posisi `value`. Anak
// mengenali angka yang ditunjuk penanda.
const props = withDefaults(defineProps<{ value: number; max?: number }>(), { max: 10 })

const PAD = 24
const STEP = 40
const ticks = computed(() => range(props.max + 1)) // 0..max
const width = computed(() => PAD * 2 + props.max * STEP)
const x = (i: number) => PAD + i * STEP
</script>

<template>
  <svg
    class="number-line"
    :viewBox="`0 0 ${width} 90`"
    :aria-label="`Garis bilangan, penanda di ${value}`"
    preserveAspectRatio="xMidYMid meet"
  >
    <!-- Garis utama -->
    <line :x1="PAD" y1="60" :x2="width - PAD" y2="60" class="number-line__axis" />

    <!-- Tik & label angka -->
    <g v-for="i in ticks" :key="i">
      <line :x1="x(i)" y1="52" :x2="x(i)" y2="68" class="number-line__tick" />
      <text :x="x(i)" y="86" text-anchor="middle" class="number-line__label">{{ i }}</text>
    </g>

    <!-- Penanda -->
    <g class="number-line__marker">
      <circle :cx="x(value)" cy="60" r="12" />
      <path :d="`M ${x(value) - 12} 28 L ${x(value) + 12} 28 L ${x(value)} 46 Z`" />
    </g>
  </svg>
</template>

<style scoped lang="scss">
.number-line {
  width: 100%;
  max-width: 100%;
  height: auto;

  &__axis {
    stroke: rgba($color-math, 0.5);
    stroke-width: 4;
    stroke-linecap: round;
  }

  &__tick {
    stroke: rgba($color-math, 0.35);
    stroke-width: 3;
  }

  &__label {
    fill: $color-text-muted;
    font-family: $font-family-display;
    font-weight: $font-weight-bold;
    font-size: 18px;
  }

  &__marker {
    circle {
      fill: $color-accent;
    }
    path {
      fill: $color-accent;
    }
    animation: bounce-in 0.4s $transition-bounce both;
  }
}
</style>
