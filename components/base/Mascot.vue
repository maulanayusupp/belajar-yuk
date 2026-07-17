<script setup lang="ts">
// Guide mascot (default: owl 🦉) with a message bubble.
// Displays Indonesian instructions; optional English text
// that can be clicked to hear its pronunciation.
const props = withDefaults(
  defineProps<{
    emoji?: string
    message: string
    messageEn?: string
  }>(),
  { emoji: '🦉' },
)

const { speak } = useAudio()

function speakEnglish() {
  if (props.messageEn) speak(props.messageEn)
}
</script>

<template>
  <div class="mascot">
    <div class="mascot__avatar anim-float" aria-hidden="true">{{ emoji }}</div>
    <div class="mascot__bubble">
      <p class="mascot__text">{{ message }}</p>
      <button v-if="messageEn" class="mascot__en" type="button" @click="speakEnglish">
        🔊 {{ messageEn }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.mascot {
  @include flex(row, flex-start, center, spacing('md'));

  &__avatar {
    font-size: font-size('xxl');
    flex-shrink: 0;
  }

  &__bubble {
    position: relative;
    @include card(spacing('md'));
    border: 3px solid $color-primary-light;
    border-radius: $radius-lg;

    // Speech bubble tail
    &::before {
      content: '';
      position: absolute;
      left: -14px;
      top: 50%;
      transform: translateY(-50%);
      border: 8px solid transparent;
      border-right-color: $color-primary-light;
    }
  }

  &__text {
    margin: 0;
    color: $color-text;
    font-weight: $font-weight-medium;
  }

  &__en {
    @include tappable;
    margin-top: spacing('sm');
    padding: spacing('xs') spacing('md');
    font-size: font-size('sm');
    font-weight: $font-weight-bold;
    color: $color-english-dark;
    background: rgba($color-english, 0.15);
    border-radius: $radius-pill;
  }
}
</style>
