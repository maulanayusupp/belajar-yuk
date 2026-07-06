<script setup lang="ts">
// Tombol nyala/matikan suara. Terhubung ke status global useAudio.
const { muted, toggleMute } = useAudio()
</script>

<template>
  <button
    class="sound-toggle"
    type="button"
    :aria-label="muted ? 'Nyalakan suara' : 'Matikan suara'"
    :title="muted ? 'Nyalakan suara' : 'Matikan suara'"
    @click="toggleMute"
  >
    <span aria-hidden="true">{{ muted ? '🔇' : '🔊' }}</span>
  </button>
</template>

<style scoped lang="scss">
.sound-toggle {
  @include tappable;
  @include flex-center;
  width: 48px;
  height: 48px;
  font-size: font-size('lg');
  background: $color-white;
  border-radius: $radius-pill;
  box-shadow: $shadow-sm;
}
</style>
