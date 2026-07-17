<script setup lang="ts">
import type { VocabularyItem } from '~/types'
import { shuffle } from '~/utils/array'
import { mistakeService } from '~/services/mistakeService'

// Vocabulary quiz: show the picture + Indonesian meaning, the child picks
// the correct English word from 4 choices.
const props = defineProps<{ items: VocabularyItem[]; lessonId: string }>()
const emit = defineEmits<{ complete: [payload: { correct: number; total: number }] }>()

const { pronounce, play } = useAudio()

// Build the list of questions (shuffled order) with 4 answer options each.
interface Question {
  item: VocabularyItem
  options: VocabularyItem[]
}

const questions = computed<Question[]>(() =>
  shuffle(props.items).map((item) => {
    const distractors = shuffle(props.items.filter((i) => i.id !== item.id)).slice(0, 3)
    return { item, options: shuffle([item, ...distractors]) }
  }),
)

const index = ref(0)
const correct = ref(0)
const selectedId = ref<string | null>(null)

const current = computed(() => questions.value[index.value])
const answered = computed(() => selectedId.value !== null)
const isLast = computed(() => index.value === questions.value.length - 1)

function choose(option: VocabularyItem) {
  if (answered.value) return
  selectedId.value = option.id
  pronounce(option.word, option.audioUrl)
  if (option.id === current.value.item.id) {
    correct.value++
    play('correct')
    mistakeService.remove(props.lessonId, current.value.item.id) // mastered
  } else {
    play('wrong')
    mistakeService.add(props.lessonId, current.value.item.id) // needs review
  }
}

function next() {
  if (isLast.value) {
    emit('complete', { correct: correct.value, total: questions.value.length })
    return
  }
  index.value++
  selectedId.value = null
}

function optionState(option: VocabularyItem): 'default' | 'correct' | 'wrong' {
  if (!answered.value) return 'default'
  if (option.id === current.value.item.id) return 'correct'
  if (option.id === selectedId.value) return 'wrong'
  return 'default'
}
</script>

<template>
  <div class="quiz">
    <p class="quiz__counter">Soal {{ index + 1 }} / {{ questions.length }}</p>

    <div class="quiz__prompt">
      <span :key="current.item.id" class="quiz__emoji anim-bounce-in" aria-hidden="true">
        {{ current.item.emoji }}
      </span>
      <p class="quiz__question">
        Apa Bahasa Inggris dari <strong>{{ current.item.translation }}</strong
        >?
      </p>
    </div>

    <div class="quiz__options">
      <button
        v-for="option in current.options"
        :key="option.id"
        class="quiz__option"
        :class="`quiz__option--${optionState(option)}`"
        type="button"
        :disabled="answered"
        @click="choose(option)"
      >
        {{ option.word }}
        <span v-if="optionState(option) === 'correct'" aria-hidden="true"> ✓</span>
        <span v-else-if="optionState(option) === 'wrong'" aria-hidden="true"> ✕</span>
      </button>
    </div>

    <BaseButton v-if="answered" variant="english" size="lg" @click="next">
      {{ isLast ? 'Selesai 🎉' : 'Lanjut →' }}
    </BaseButton>
  </div>
</template>

<style scoped lang="scss">
.quiz {
  @include flex(column, flex-start, center, spacing('lg'));

  &__counter {
    font-weight: $font-weight-bold;
    color: $color-english-dark;
  }

  &__prompt {
    @include flex(column, center, center, spacing('sm'));
    text-align: center;
  }

  &__emoji {
    font-size: font-size('display');
  }

  &__question {
    font-size: font-size('lg');
    color: $color-text;
  }

  &__options {
    display: grid;
    grid-template-columns: 1fr;
    gap: spacing('md');
    width: 100%;
    max-width: 420px;

    @include respond-to('sm') {
      grid-template-columns: 1fr 1fr;
    }
  }

  &__option {
    @include tappable;
    padding: spacing('md');
    font-size: font-size('lg');
    font-weight: $font-weight-bold;
    color: $color-text;
    background: $color-white;
    border: 3px solid $color-border;
    border-radius: $radius-md;
    box-shadow: $shadow-sm;
    transition: all $transition-base;

    &:disabled {
      cursor: default;
    }

    &--correct {
      background: rgba($color-success, 0.15);
      border-color: $color-success;
      color: $color-success;
      animation: pop 0.3s ease;
    }

    &--wrong {
      background: rgba($color-error, 0.12);
      border-color: $color-error;
      color: $color-error;
      animation: shake 0.4s ease;
    }
  }
}
</style>
