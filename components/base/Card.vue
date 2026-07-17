<script setup lang="ts">
// Generic card container. `interactive` adds hover/press effects
// for clickable cards.
withDefaults(
  defineProps<{
    interactive?: boolean
    accent?: 'none' | 'english' | 'math' | 'primary'
  }>(),
  { interactive: false, accent: 'none' },
)
</script>

<template>
  <div class="card" :class="[`card--${accent}`, { 'card--interactive': interactive }]">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.card {
  @include card;
  position: relative;
  overflow: hidden;

  &--interactive {
    @include tappable;
  }

  // Colored accent line along the top edge of the card
  &--english::before,
  &--math::before,
  &--primary::before {
    content: '';
    position: absolute;
    inset: 0 0 auto 0;
    height: 6px;
  }
  &--english::before {
    background: $color-english;
  }
  &--math::before {
    background: $color-math;
  }
  &--primary::before {
    background: $color-primary;
  }
}
</style>
