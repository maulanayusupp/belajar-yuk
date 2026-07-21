<script setup lang="ts">
// "Number Bond" diagram (part-part-whole):
// one WHOLE number connected to two PARTS. When `whole` is null,
// show "?" (the child works out the result).
defineProps<{ whole: number | null; partA: number; partB: number }>()
</script>

<template>
  <div class="bond">
    <!-- Connecting lines drawn with SVG (markup, not CSS) -->
    <svg class="bond__links" viewBox="0 0 280 180" aria-hidden="true">
      <line x1="140" y1="32" x2="52" y2="138" />
      <line x1="140" y1="32" x2="228" y2="138" />
    </svg>

    <div
      class="bond__circle bond__circle--whole"
      :class="{ 'bond__circle--empty': whole === null }"
    >
      {{ whole ?? '?' }}
    </div>
    <div class="bond__circle bond__circle--a">{{ partA }}</div>
    <div class="bond__circle bond__circle--b">{{ partB }}</div>
  </div>
</template>

<style scoped lang="scss">
.bond {
  position: relative;
  width: 280px;
  height: 180px;
  margin-inline: auto;

  &__links {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;

    line {
      stroke: $color-border;
      stroke-width: 5;
      stroke-linecap: round;
    }
  }

  &__circle {
    position: absolute;
    @include flex-center;
    font-weight: $font-weight-bold;
    color: $color-white;
    border-radius: $radius-pill;
    box-shadow: $shadow-md;
    animation: bounce-in 0.4s $transition-bounce both;

    &--whole {
      width: 64px;
      height: 64px;
      left: calc(50% - 32px);
      top: 0;
      font-size: font-size('xl');
      background: $color-math;
    }

    &--empty {
      background: $color-white;
      color: $color-math;
      border: 4px dashed $color-math;
      animation: pulse-glow 1.5s ease-in-out infinite;
    }

    &--a,
    &--b {
      width: 56px;
      height: 56px;
      top: 110px;
      font-size: font-size('lg');
    }
    &--a {
      left: 24px;
      background: $color-math;
    }
    &--b {
      right: 24px;
      background: $color-secondary;
    }
  }
}
</style>
