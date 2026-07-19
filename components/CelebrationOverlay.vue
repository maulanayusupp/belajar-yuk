<script setup lang="ts">
// End-of-lesson celebration overlay: stars, confetti, and sound.
const props = defineProps<{ stars: number; scoreText?: string }>()
const emit = defineEmits<{ replay: []; home: [] }>()

const { play } = useAudio()
const { celebrate } = useConfetti()

const messages: Record<number, string> = {
  3: 'Luar biasa! Kamu hebat! 🌟',
  2: 'Bagus sekali! Terus semangat! 💪',
  1: 'Kerja bagus! Ayo coba lagi! 😊',
  0: 'Jangan menyerah, coba lagi ya! 🤗',
}

onMounted(() => {
  play('win')
  if (props.stars >= 2) celebrate()
})
</script>

<template>
  <div class="celebration" role="dialog" aria-modal="true" aria-label="Selamat, pelajaran selesai">
    <div class="celebration__card anim-bounce-in">
      <h2 class="celebration__title">Selamat! 🎉</h2>
      <BaseStarRating :value="stars" size="lg" animated />
      <p v-if="scoreText" class="celebration__score">{{ scoreText }}</p>
      <p class="celebration__message">{{ messages[stars] }}</p>
      <BaseReflectPrompt v-if="stars > 0" />
      <div class="celebration__actions">
        <BaseButton variant="ghost" @click="emit('home')">🏠 Beranda</BaseButton>
        <BaseButton variant="primary" @click="emit('replay')">🔁 Ulangi</BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.celebration {
  @include flex-center;
  position: fixed;
  inset: 0;
  z-index: $z-modal;
  background: rgba($color-text, 0.45);
  backdrop-filter: blur(4px);
  padding: spacing('md');

  &__card {
    @include card(spacing('xl'));
    @include flex(column, center, center, spacing('md'));
    text-align: center;
    max-width: 420px;
    width: 100%;
  }

  &__title {
    color: $color-primary;
  }

  &__score {
    font-weight: $font-weight-bold;
    color: $color-text;
  }

  &__message {
    color: $color-text-muted;
  }

  &__actions {
    @include flex(row, center, center, spacing('md'));
    flex-wrap: wrap;
    margin-top: spacing('sm');
  }
}
</style>
