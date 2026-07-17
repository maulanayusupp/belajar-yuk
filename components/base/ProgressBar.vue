<script setup lang="ts">
import { clamp } from '~/utils/array'

// Lesson progress bar (which step out of the total).
const props = withDefaults(
  defineProps<{
    current: number
    total: number
    accent?: 'english' | 'math' | 'science' | 'bahasa' | 'primary'
  }>(),
  { accent: 'primary' },
)

const percent = computed(() => {
  if (props.total <= 0) return 0
  return clamp(Math.round((props.current / props.total) * 100), 0, 100)
})
</script>

<template>
  <div
    class="progress"
    role="progressbar"
    :aria-valuenow="current"
    :aria-valuemin="0"
    :aria-valuemax="total"
  >
    <!-- CSS variable --percent drives the bar width; styling in SCSS -->
    <div
      class="progress__fill"
      :class="`progress__fill--${accent}`"
      :style="{ '--percent': `${percent}%` }"
    />
  </div>
</template>

<style scoped lang="scss">
.progress {
  width: 100%;
  height: 14px;
  background: $color-border;
  border-radius: $radius-pill;
  overflow: hidden;

  &__fill {
    width: var(--percent, 0%);
    height: 100%;
    border-radius: $radius-pill;
    transition: width $transition-bounce;

    &--primary {
      background: $color-primary;
    }
    &--english {
      background: $color-english;
    }
    &--math {
      background: $color-math;
    }
    &--science {
      background: $color-science;
    }
    &--bahasa {
      background: $color-bahasa;
    }
  }
}
</style>
