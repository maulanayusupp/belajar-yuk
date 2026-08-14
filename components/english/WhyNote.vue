<script setup lang="ts">
// A small "why is this the answer" note, shown after a child answers a
// question. Teaches the theory/reason (grammar, verb form, meaning) so
// answers are understood, not guessed. Renders nothing when there's no text.
defineProps<{ text?: string }>()
</script>

<template>
  <p v-if="text" class="why-note" role="note">
    <span class="why-note__icon" aria-hidden="true">💡</span>
    <span class="why-note__text"><strong>Kenapa?</strong> {{ text }}</span>
  </p>
</template>

<style scoped lang="scss">
.why-note {
  @include flex(row, flex-start, flex-start, spacing('sm'));
  margin: 0;
  padding: spacing('md') spacing('lg');
  background: rgba($color-warning, 0.12);
  border: 2px solid rgba($color-warning, 0.35);
  border-radius: $radius-lg;
  text-align: left;
  animation: rise-in 0.3s ease;

  &__icon {
    font-size: font-size('lg');
    flex-shrink: 0;
    line-height: 1.4;
  }

  &__text {
    margin: 0;
    font-weight: $font-weight-semibold;
    font-size: font-size('sm');
    line-height: 1.5;
    color: $color-ink;

    strong {
      color: $color-english-dark;
    }
  }
}
</style>
