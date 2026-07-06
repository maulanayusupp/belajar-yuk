<script setup lang="ts">
import type { VocabularyItem } from '~/types'

// Kartu kata untuk fase "Belajar". Menyentuh kartu = dengar
// pengucapan. Otomatis mengucapkan kata saat pertama muncul.
const props = defineProps<{ item: VocabularyItem; autoSpeak?: boolean }>()

const { pronounce, play } = useAudio()

function sayWord() {
  play('pop')
  pronounce(props.item.word, props.item.audioUrl)
}

onMounted(() => {
  if (props.autoSpeak) pronounce(props.item.word, props.item.audioUrl)
})

// Ucapkan otomatis setiap ganti kata.
watch(
  () => props.item.id,
  () => props.autoSpeak && pronounce(props.item.word, props.item.audioUrl),
)
</script>

<template>
  <button class="flashcard anim-bounce-in" type="button" @click="sayWord">
    <span class="flashcard__emoji" aria-hidden="true">{{ item.emoji }}</span>
    <span class="flashcard__word">{{ item.word }}</span>
    <span class="flashcard__translation">{{ item.translation }}</span>
    <span v-if="item.example" class="flashcard__example">"{{ item.example }}"</span>
    <span class="flashcard__hint">🔊 Ketuk untuk mendengar</span>
  </button>
</template>

<style scoped lang="scss">
.flashcard {
  @include tappable;
  @include flex(column, center, center, spacing('sm'));
  @include card(spacing('xl'));
  width: 100%;
  max-width: 360px;
  text-align: center;

  &__emoji {
    font-size: font-size('display');
    animation: float 3s ease-in-out infinite;
  }

  &__word {
    font-size: font-size('xxl');
    font-weight: $font-weight-bold;
    color: $color-english-dark;
  }

  &__translation {
    font-size: font-size('lg');
    color: $color-text-muted;
  }

  &__example {
    font-size: font-size('sm');
    color: $color-text-muted;
    font-style: italic;
  }

  &__hint {
    margin-top: spacing('sm');
    font-size: font-size('xs');
    color: $color-english;
    font-weight: $font-weight-bold;
  }
}
</style>
