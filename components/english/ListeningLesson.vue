<script setup lang="ts">
import type { EnglishLesson, VocabularyItem } from '~/types'
import { shuffle, clamp } from '~/utils/array'
import { mistakeService } from '~/services/mistakeService'

// Listening: hear the word (no text) → pick the correct picture.
const props = defineProps<{ lesson: EnglishLesson }>()

const { saveResult } = useProgress()
const { pronounce, play } = useAudio()

interface Question {
  item: VocabularyItem
  options: VocabularyItem[]
}
const questions = computed<Question[]>(() =>
  shuffle(props.lesson.items).map((item) => {
    const distractors = shuffle(props.lesson.items.filter((i) => i.id !== item.id)).slice(0, 3)
    return { item, options: shuffle([item, ...distractors]) }
  }),
)

const index = ref(0)
const correct = ref(0)
const selectedId = ref<string | null>(null)
const done = ref(false)
const stars = ref(0)
const scoreText = ref('')

const current = computed(() => questions.value[index.value])
const answered = computed(() => selectedId.value !== null)
const isLast = computed(() => index.value === questions.value.length - 1)

function hear() {
  play('pop')
  pronounce(current.value.item.word, current.value.item.audioUrl)
}

// Automatically speak the word each time a question appears.
onMounted(() => pronounce(current.value.item.word, current.value.item.audioUrl))
watch(index, () => pronounce(current.value.item.word, current.value.item.audioUrl))

function choose(option: VocabularyItem) {
  if (answered.value) return
  selectedId.value = option.id
  if (option.id === current.value.item.id) {
    correct.value++
    play('correct')
    mistakeService.remove(props.lesson.id, current.value.item.id)
  } else {
    play('wrong')
    mistakeService.add(props.lesson.id, current.value.item.id)
  }
}

function optionState(option: VocabularyItem): 'default' | 'correct' | 'wrong' {
  if (!answered.value) return 'default'
  if (option.id === current.value.item.id) return 'correct'
  if (option.id === selectedId.value) return 'wrong'
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
  selectedId.value = null
}

function restart() {
  index.value = 0
  correct.value = 0
  selectedId.value = null
  done.value = false
}
function goHome() {
  navigateTo('/' + props.lesson.subject)
}
</script>

<template>
  <div class="listen">
    <template v-if="!done">
      <BaseMascot
        message="Dengarkan kata-nya, lalu pilih gambar yang tepat."
        message-en="Listen and pick!"
      />
      <BaseProgressBar :current="index + 1" :total="questions.length" accent="english" />

      <!-- Large listen button -->
      <button class="listen__play anim-bounce-in" type="button" @click="hear">
        <span class="listen__play-icon" aria-hidden="true">🔊</span>
        <span class="listen__play-label">Ketuk untuk dengar lagi</span>
      </button>

      <!-- Picture choices -->
      <div class="listen__options">
        <button
          v-for="option in current.options"
          :key="option.id"
          class="listen__option"
          :class="`listen__option--${optionState(option)}`"
          type="button"
          :disabled="answered"
          :aria-label="option.translation"
          @click="choose(option)"
        >
          {{ option.emoji }}
        </button>
      </div>

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
.listen {
  @include flex(column, flex-start, stretch, spacing('xl'));

  &__play {
    @include tappable;
    @include flex(column, center, center, spacing('xs'));
    align-self: center;
    padding: spacing('lg') spacing('xl');
    background: $gradient-english;
    color: $color-white;
    border-radius: $radius-xl;
    box-shadow: $shadow-glow-english;
  }

  &__play-icon {
    font-size: font-size('display');
    animation: pulse-glow 1.8s ease-in-out infinite;
    border-radius: $radius-pill;
  }

  &__play-label {
    font-weight: $font-weight-bold;
    font-size: font-size('sm');
  }

  &__options {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: spacing('md');
    max-width: 420px;
    width: 100%;
    margin-inline: auto;
  }

  &__option {
    @include tappable;
    @include flex-center;
    aspect-ratio: 1;
    font-size: font-size('display');
    background: $color-white;
    border: 3px solid $color-border;
    border-radius: $radius-lg;
    box-shadow: $shadow-sm;

    &--correct {
      border-color: $color-success;
      background: rgba($color-success, 0.15);
      animation: pop 0.3s ease;
    }
    &--wrong {
      border-color: $color-error;
      background: rgba($color-error, 0.12);
      animation: shake 0.4s ease;
    }
  }
}
</style>
