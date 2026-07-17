<script setup lang="ts">
// Versatile, child-friendly button (large, bright colors, bounce effect).
// Automatically plays a "click" sound effect unless the `silent` prop is set.
type Variant = 'primary' | 'secondary' | 'success' | 'english' | 'math' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    variant?: Variant
    size?: Size
    block?: boolean
    disabled?: boolean
    silent?: boolean
  }>(),
  { variant: 'primary', size: 'md', block: false, disabled: false, silent: false },
)

const emit = defineEmits<{ click: [event: MouseEvent] }>()
const { play } = useAudio()

function onClick(event: MouseEvent) {
  if (props.disabled) return
  if (!props.silent) play('click')
  emit('click', event)
}
</script>

<template>
  <button
    class="btn"
    :class="[`btn--${variant}`, `btn--${size}`, { 'btn--block': block }]"
    :disabled="disabled"
    type="button"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<style scoped lang="scss">
.btn {
  @include tappable;
  @include flex-center;
  position: relative;
  overflow: hidden;
  gap: spacing('sm');
  font-family: $font-family-base;
  font-weight: $font-weight-bold;
  color: $color-white;
  border-radius: $radius-pill;
  box-shadow: $shadow-md;
  white-space: nowrap;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  // ---- Size ----
  &--sm {
    padding: spacing('xs') spacing('md');
    font-size: font-size('sm');
  }
  &--md {
    padding: spacing('sm') spacing('lg');
    font-size: font-size('md');
  }
  &--lg {
    padding: spacing('md') spacing('xl');
    font-size: font-size('lg');
  }

  &--block {
    width: 100%;
  }

  // ---- Color variants (premium gradient fills) ----
  &--primary {
    background: $gradient-primary;
    box-shadow: $shadow-primary;
  }
  &--secondary {
    background: $gradient-mint;
    box-shadow: 0 12px 30px rgba(0, 206, 201, 0.4);
  }
  &--success {
    background: linear-gradient(135deg, #26de81, #05c46b);
  }
  &--english {
    background: $gradient-english;
    box-shadow: $shadow-glow-english;
  }
  &--math {
    background: $gradient-math;
    box-shadow: $shadow-glow-math;
  }
  &--ghost {
    @include glass($glass-bg-strong);
    color: $color-ink;
    box-shadow: $shadow-sm;

    &:hover {
      background: $color-white;
    }
  }

  // Shine sweeps across on hover
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(
      120deg,
      transparent 30%,
      rgba(255, 255, 255, 0.35) 50%,
      transparent 70%
    );
    background-size: 200% 100%;
    background-position: 200% 0;
    opacity: 0;
    transition: opacity $transition-base;
    pointer-events: none;
  }

  &:hover::after {
    opacity: 1;
    animation: shimmer 0.8s ease;
  }
}
</style>
