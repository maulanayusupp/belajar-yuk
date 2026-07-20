<script setup lang="ts">
// Statistic card with a "count-up" animation when it enters the viewport.
// Non-numeric values (e.g. '6+') are shown as-is.
const props = defineProps<{ value: number | string; label: string }>()

const isNumeric = typeof props.value === 'number'
// Initial value = final value → SSR & hydration match (no mismatch).
const display = ref<number | string>(props.value)
const root = ref<HTMLElement | null>(null)

function countUp(target: number) {
  const duration = 1200
  let start = 0
  const step = (t: number) => {
    if (!start) start = t
    const p = Math.min((t - start) / duration, 1)
    const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
    display.value = Math.round(eased * target)
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

onMounted(() => {
  if (!isNumeric || !root.value) return
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (reduce) return

  display.value = 0
  const io = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          countUp(props.value as number)
          obs.disconnect()
        }
      }
    },
    { threshold: 0.4 },
  )
  io.observe(root.value)
})
</script>

<template>
  <div ref="root" class="stat">
    <span class="stat__value">{{ display }}</span>
    <span class="stat__label">{{ label }}</span>
  </div>
</template>

<style scoped lang="scss">
.stat {
  @include flex(column, center, center, spacing('xs'));
  text-align: center;

  &__value {
    @include gradient-text($gradient-primary);
    font-family: $font-family-display;
    font-weight: $font-weight-bold;
    font-size: font-size('xl');
    line-height: 1;
  }

  &__label {
    font-size: font-size('xs');
    font-weight: $font-weight-semibold;
    color: $color-text-muted;
  }
}
</style>
