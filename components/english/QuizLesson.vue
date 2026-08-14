<script setup lang="ts">
import type { EnglishLesson, VocabularyItem } from '~/types'
import { shuffle, clamp } from '~/utils/array'
import { mistakeService } from '~/services/mistakeService'

// Text multiple-choice runner. Powers three harder activities that all share
// the shape "read a prompt → pick the right TEXT answer":
//   • fill-blank   — a sentence with a gap
//   • dialogue     — a line someone says; pick the best reply
//   • comprehension — a short passage + a question
// Each item carries `prompt`, `options`, and `answer`.
const props = defineProps<{ lesson: EnglishLesson }>()

const { saveResult } = useProgress()
const { play, pronounce } = useAudio()

const MESSAGES: Record<string, { id: string; en: string }> = {
  'fill-blank': {
    id: 'Pilih kata yang tepat untuk mengisi bagian kosong.',
    en: 'Fill in the blank!',
  },
  dialogue: {
    id: 'Baca ucapannya, lalu pilih balasan yang paling pas.',
    en: 'Pick the best reply!',
  },
  comprehension: { id: 'Baca teksnya, lalu jawab pertanyaannya.', en: 'Read and answer!' },
}
const message = computed(() => MESSAGES[props.lesson.type] ?? MESSAGES['fill-blank'])

interface Question {
  item: VocabularyItem
  prompt: string
  options: string[]
  answer: string
}
const questions = computed<Question[]>(() =>
  shuffle(props.lesson.items).map((item) => ({
    item,
    prompt: item.prompt ?? '',
    options: shuffle(item.options ?? []),
    answer: item.answer ?? '',
  })),
)

const index = ref(0)
const correct = ref(0)
const selected = ref<string | null>(null)
const done = ref(false)
const stars = ref(0)
const scoreText = ref('')

const current = computed(() => questions.value[index.value])
const answered = computed(() => selected.value !== null)
const isCorrect = computed(() => selected.value === current.value.answer)
const isLast = computed(() => index.value === questions.value.length - 1)

function choose(option: string) {
  if (answered.value) return
  selected.value = option
  if (option === current.value.answer) {
    correct.value++
    play('correct')
    pronounce(current.value.answer)
    mistakeService.remove(props.lesson.id, current.value.item.id)
  } else {
    play('wrong')
    mistakeService.add(props.lesson.id, current.value.item.id)
  }
}

function optionState(option: string): 'default' | 'correct' | 'wrong' {
  if (!answered.value) return 'default'
  if (option === current.value.answer) return 'correct'
  if (option === selected.value) return 'wrong'
  return 'default'
}

function starsFromScore(c: number, total: number): number {
  const ratio = total > 0 ? c / total : 0
  if (ratio >= 0.9) return 3
  if (ratio >= 0.6) return 2
  return clamp(c, 0, 1)
}

function next() {
  if (isLast.value) {
    stars.value = starsFromScore(correct.value, questions.value.length)
    scoreText.value = `Kamu benar ${correct.value} dari ${questions.value.length} soal`
    saveResult(props.lesson.id, stars.value)
    done.value = true
    return
  }
  index.value++
  selected.value = null
}

function restart() {
  index.value = 0
  correct.value = 0
  selected.value = null
  done.value = false
}
function goHome() {
  navigateTo('/' + props.lesson.subject)
}
</script>

<template>
  <div class="quiz">
    <template v-if="!done">
      <BaseMascot :message="message.id" :message-en="message.en" />
      <BaseProgressBar :current="index + 1" :total="questions.length" accent="english" />

      <!-- The prompt (sentence / dialogue line / passage + question) -->
      <div class="quiz__prompt">
        <span v-if="lesson.type === 'dialogue'" class="quiz__speaker" aria-hidden="true">💬</span>
        <p class="quiz__text">{{ current.prompt }}</p>
      </div>

      <!-- Text answer choices -->
      <div class="quiz__options">
        <button
          v-for="option in current.options"
          :key="option"
          class="quiz__option"
          :class="`quiz__option--${optionState(option)}`"
          type="button"
          :disabled="answered"
          @click="choose(option)"
        >
          {{ option }}
        </button>
      </div>

      <p v-if="answered && !isCorrect" class="quiz__retry">
        Belum tepat. Jawaban benar: <strong>{{ current.answer }}</strong>
      </p>

      <EnglishWhyNote v-if="answered" :text="current.item.why" />

      <BaseButton v-if="answered" variant="english" size="lg" @click="next">
        {{ isLast ? 'Selesai 🎉' : 'Lanjut →' }}
      </BaseButton>
    </template>

    <CelebrationOverlay
      v-else
      :stars="stars"
      :score-text="scoreText"
      @replay="restart"
      @home="goHome"
    />
  </div>
</template>

<style scoped lang="scss">
.quiz {
  @include flex(column, flex-start, stretch, spacing('lg'));

  &__prompt {
    @include glass($glass-bg-strong);
    @include flex(row, flex-start, flex-start, spacing('sm'));
    padding: spacing('lg') spacing('xl');
    border-radius: $radius-xl;
    box-shadow: $shadow-sm;
  }

  &__speaker {
    font-size: font-size('xl');
    flex-shrink: 0;
  }

  &__text {
    margin: 0;
    font-family: $font-family-display;
    font-weight: $font-weight-bold;
    font-size: font-size('lg');
    line-height: 1.5;
    color: $color-ink;
  }

  &__options {
    @include flex(column, flex-start, stretch, spacing('sm'));
  }

  &__option {
    @include tappable;
    padding: spacing('md') spacing('lg');
    font-weight: $font-weight-bold;
    font-size: font-size('md');
    text-align: left;
    color: $color-ink;
    background: $color-white;
    border: 3px solid $color-border;
    border-radius: $radius-lg;
    box-shadow: $shadow-sm;

    &--correct {
      border-color: $color-success;
      background: rgba($color-success, 0.15);
      color: #05987a;
      animation: pop 0.3s ease;
    }
    &--wrong {
      border-color: $color-error;
      background: rgba($color-error, 0.12);
      color: $color-error;
      animation: shake 0.4s ease;
    }
  }

  &__retry {
    text-align: center;
    margin: 0;
    color: $color-error;
    font-weight: $font-weight-semibold;
  }
}
</style>
