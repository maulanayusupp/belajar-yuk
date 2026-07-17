<script setup lang="ts">
import type { VocabularyItem } from '~/types'

// Word card for the "Learn" phase. Tapping the card = hear the
// pronunciation. Automatically speaks the word when first shown.
const props = defineProps<{ item: VocabularyItem; autoSpeak?: boolean }>()

const { pronounce, play } = useAudio()

function sayWord() {
  play('pop')
  pronounce(props.item.word, props.item.audioUrl)
}

onMounted(() => {
  if (props.autoSpeak) pronounce(props.item.word, props.item.audioUrl)
})

// Speak automatically whenever the word changes.
watch(
  () => props.item.id,
  () => props.autoSpeak && pronounce(props.item.word, props.item.audioUrl),
)
</script>

<template>
  <button class="flashcard anim-bounce-in" type="button" @click="sayWord">
    <span class="flashcard__sticker" aria-hidden="true">
      <img
        v-if="item.image"
        :src="item.image"
        :alt="item.word"
        class="flashcard__img"
        loading="lazy"
      />
      <span v-else class="flashcard__emoji">{{ item.emoji }}</span>
    </span>
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

  &__sticker {
    @include flex-center;
    width: 160px;
    height: 160px;
    border-radius: $radius-pill;
    background: radial-gradient(
      circle at 50% 35%,
      rgba($color-english, 0.18),
      rgba($color-english, 0.06)
    );
    box-shadow: inset 0 -6px 16px rgba($color-english, 0.15);
    animation: float 3s ease-in-out infinite;
  }

  &__emoji {
    font-size: font-size('display');
  }

  &__img {
    width: 78%;
    height: 78%;
    object-fit: contain;
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
