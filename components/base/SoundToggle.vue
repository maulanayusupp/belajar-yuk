<script setup lang="ts">
// Sound on/off toggle button. Wired to the global useAudio state.
// Uses a crisp inline SVG (not an emoji) so it renders consistently everywhere.
const { muted, toggleMute } = useAudio()
</script>

<template>
  <button
    class="sound-toggle"
    :class="{ 'sound-toggle--muted': muted }"
    type="button"
    :aria-label="muted ? 'Nyalakan suara' : 'Matikan suara'"
    :title="muted ? 'Nyalakan suara' : 'Matikan suara'"
    @click="toggleMute"
  >
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path
        d="M4 9v6h3.5L13 19V5L7.5 9H4z"
        fill="currentColor"
        stroke="currentColor"
        stroke-width="1.2"
        stroke-linejoin="round"
      />
      <g v-if="!muted" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <path d="M16 9.5a3.5 3.5 0 0 1 0 5" />
        <path d="M18.5 7a7 7 0 0 1 0 10" />
      </g>
      <g v-else stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <line x1="16.5" y1="9.5" x2="21" y2="14" />
        <line x1="21" y1="9.5" x2="16.5" y2="14" />
      </g>
    </svg>
  </button>
</template>

<style scoped lang="scss">
.sound-toggle {
  @include tappable;
  @include flex-center;
  width: 42px;
  height: 42px;
  color: $color-primary-dark;
  background: $color-white;
  border-radius: $radius-pill;
  box-shadow: $shadow-sm;
  border: 1px solid rgba($color-primary, 0.1);
  transition:
    transform $transition-fast,
    box-shadow $transition-base,
    color $transition-fast;

  &:hover {
    transform: translateY(-2px);
    box-shadow: $shadow-md;
  }

  &--muted {
    color: $color-text-muted;
  }
}
</style>
