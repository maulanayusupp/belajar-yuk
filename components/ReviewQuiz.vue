<script setup lang="ts">
import type { ReviewQuestion } from '~/services/lessonService'
import { range } from '~/utils/array'

// "Redo mistakes" quiz. A CORRECT answer = mastered → removed from the list
// (emit resolve). A wrong answer can be retried (master it first).
const props = defineProps<{ questions: ReviewQuestion[] }>()
const emit = defineEmits<{ resolve: [q: ReviewQuestion]; done: [] }>()

const { play, pronounce } = useAudio()

const index = ref(0)
const selected = ref<string | null>(null)
const current = computed(() => props.questions[index.value])
const isCorrect = computed(() => selected.value === current.value.correct)
const isLast = computed(() => index.value === props.questions.length - 1)

function choose(value: string) {
  if (isCorrect.value) return // already correct → lock
  selected.value = value
  if (value === current.value.correct) {
    play('correct')
    if (current.value.speak) pronounce(current.value.speak, undefined, current.value.lang)
    emit('resolve', current.value)
  } else {
    play('wrong')
  }
}

function next() {
  if (isLast.value) {
    emit('done')
    return
  }
  index.value++
  selected.value = null
}

function optionState(v: string): 'default' | 'correct' | 'wrong' {
  if (selected.value === null) return 'default'
  if (v === current.value.correct) return 'correct'
  if (v === selected.value) return 'wrong'
  return 'default'
}
</script>

<template>
  <div class="review">
    <p class="review__counter">Soal {{ index + 1 }} / {{ questions.length }}</p>

    <div class="review__stage">
      <div v-if="current.repeat > 0" class="review__objects">
        <span
          v-for="i in range(current.repeat)"
          :key="i"
          class="review__object"
          aria-hidden="true"
          >{{ current.emoji }}</span
        >
      </div>
      <span v-else-if="current.emoji" class="review__emoji" aria-hidden="true">{{
        current.emoji
      }}</span>
      <p class="review__prompt">{{ current.prompt }}</p>
    </div>

    <div class="review__options">
      <button
        v-for="opt in current.options"
        :key="opt"
        class="review__option"
        :class="`review__option--${optionState(opt)}`"
        type="button"
        :disabled="isCorrect"
        @click="choose(opt)"
      >
        {{ opt }}
      </button>
    </div>

    <BaseButton v-if="isCorrect" variant="primary" size="lg" @click="next">
      {{ isLast ? 'Selesai 🎉' : 'Lanjut →' }}
    </BaseButton>
    <p v-else-if="selected !== null" class="review__retry">Belum tepat, coba lagi ya! 😊</p>
  </div>
</template>

<style scoped lang="scss">
.review {
  @include flex(column, flex-start, center, spacing('lg'));

  &__counter {
    font-weight: $font-weight-bold;
    color: $color-primary-dark;
  }

  &__stage {
    @include flex(column, center, center, spacing('sm'));
    text-align: center;
  }

  &__objects {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: spacing('sm');
    max-width: 420px;
  }

  &__object {
    font-size: font-size('xl');
  }

  &__emoji {
    font-size: font-size('display');
  }

  &__prompt {
    font-size: font-size('lg');
    font-weight: $font-weight-bold;
    color: $color-ink;
    margin: 0;
  }

  &__options {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: spacing('md');
    width: 100%;
    max-width: 420px;
  }

  &__option {
    @include tappable;
    padding: spacing('md');
    font-size: font-size('lg');
    font-weight: $font-weight-bold;
    color: $color-ink;
    background: $color-white;
    border: 3px solid $color-border;
    border-radius: $radius-md;
    box-shadow: $shadow-sm;

    &--correct {
      background: rgba($color-success, 0.15);
      border-color: $color-success;
      color: #05987a;
      animation: pop 0.3s ease;
    }
    &--wrong {
      background: rgba($color-error, 0.12);
      border-color: $color-error;
      color: $color-error;
      animation: shake 0.4s ease;
    }
  }

  &__retry {
    color: $color-error;
    font-weight: $font-weight-bold;
    margin: 0;
  }
}
</style>
