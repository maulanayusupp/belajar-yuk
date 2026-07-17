<script setup lang="ts">
import type { BahasaLesson, ReadingItem } from '~/types'
import { shuffle, clamp } from '~/utils/array'
import { mistakeService } from '~/services/mistakeService'

// Reading engine (letters / syllables / sentences):
//   Recognize (see & hear) → Quiz (hear → pick the reading) → Celebration.
const props = defineProps<{ lesson: BahasaLesson }>()

const { saveResult } = useProgress()
const { speak, play } = useAudio()

// Speak the Indonesian text (not English).
function say(item: ReadingItem) {
  play('pop')
  speak(item.text, 'id-ID')
}

type Phase = 'learn' | 'quiz' | 'done'
const phase = ref<Phase>('learn')

// ---------- Recognize Phase ----------
const cardIndex = ref(0)
const currentCard = computed(() => props.lesson.items[cardIndex.value])
const isLastCard = computed(() => cardIndex.value === props.lesson.items.length - 1)

onMounted(() => speak(currentCard.value.text, 'id-ID'))
watch(cardIndex, () => speak(currentCard.value.text, 'id-ID'))

function nextCard() {
  if (isLastCard.value) {
    phase.value = 'quiz'
    return
  }
  cardIndex.value++
}
function prevCard() {
  if (cardIndex.value > 0) cardIndex.value--
}

// ---------- Quiz Phase (hear → pick the reading) ----------
interface Question {
  item: ReadingItem
  options: ReadingItem[]
}
const questions = computed<Question[]>(() =>
  shuffle(props.lesson.items).map((item) => {
    const distractors = shuffle(props.lesson.items.filter((i) => i.id !== item.id)).slice(0, 3)
    return { item, options: shuffle([item, ...distractors]) }
  }),
)

const qIndex = ref(0)
const correct = ref(0)
const selectedId = ref<string | null>(null)
const current = computed(() => questions.value[qIndex.value])
const answered = computed(() => selectedId.value !== null)
const isLastQuestion = computed(() => qIndex.value === questions.value.length - 1)

function hear() {
  play('pop')
  speak(current.value.item.text, 'id-ID')
}

watch([phase, qIndex], () => {
  if (phase.value === 'quiz') speak(current.value.item.text, 'id-ID')
})

function choose(option: ReadingItem) {
  if (answered.value) return
  selectedId.value = option.id
  if (option.id === current.value.item.id) {
    correct.value++
    play('correct')
    speak(option.text, 'id-ID')
    mistakeService.remove(props.lesson.id, current.value.item.id)
  } else {
    play('wrong')
    mistakeService.add(props.lesson.id, current.value.item.id)
  }
}

function optionState(option: ReadingItem): 'default' | 'correct' | 'wrong' {
  if (!answered.value) return 'default'
  if (option.id === current.value.item.id) return 'correct'
  if (option.id === selectedId.value) return 'wrong'
  return 'default'
}

// ---------- Done ----------
const stars = ref(0)
const scoreText = ref('')

function starsFromScore(c: number, total: number): number {
  const ratio = total > 0 ? c / total : 0
  if (ratio >= 0.9) return 3
  if (ratio >= 0.6) return 2
  return clamp(c, 0, 1)
}

function nextQuestion() {
  if (isLastQuestion.value) {
    stars.value = starsFromScore(correct.value, questions.value.length)
    scoreText.value = `Kamu benar ${correct.value} dari ${questions.value.length} soal`
    saveResult(props.lesson.id, stars.value)
    phase.value = 'done'
    return
  }
  qIndex.value++
  selectedId.value = null
}

function restart() {
  phase.value = 'learn'
  cardIndex.value = 0
  qIndex.value = 0
  correct.value = 0
  selectedId.value = null
}
function goHome() {
  navigateTo('/bahasa')
}
</script>

<template>
  <div class="baca">
    <!-- ---------- Recognize Phase ---------- -->
    <template v-if="phase === 'learn'">
      <BaseMascot
        message="Ketuk kartunya untuk mendengar cara membacanya."
        message-en="Tap to listen!"
      />
      <BaseProgressBar :current="cardIndex + 1" :total="lesson.items.length" accent="bahasa" />

      <button class="baca__card anim-bounce-in" type="button" @click="say(currentCard)">
        <span v-if="currentCard.emoji" class="baca__emoji" aria-hidden="true">{{
          currentCard.emoji
        }}</span>
        <span class="baca__text">{{ currentCard.text }}</span>
        <span v-if="currentCard.hint" class="baca__hint">{{ currentCard.hint }}</span>
        <span class="baca__listen">🔊 Ketuk untuk dengar</span>
      </button>

      <div class="baca__nav">
        <BaseButton variant="ghost" :disabled="cardIndex === 0" @click="prevCard">
          ← Kembali
        </BaseButton>
        <BaseButton variant="primary" size="lg" @click="nextCard">
          {{ isLastCard ? 'Mulai Kuis 📝' : 'Lanjut →' }}
        </BaseButton>
      </div>
    </template>

    <!-- ---------- Quiz Phase ---------- -->
    <template v-else-if="phase === 'quiz'">
      <BaseMascot
        message="Dengarkan, lalu pilih bacaan yang tepat."
        message-en="Listen and pick!"
      />
      <BaseProgressBar :current="qIndex + 1" :total="questions.length" accent="bahasa" />

      <button class="baca__play" type="button" @click="hear">
        <span class="baca__play-icon" aria-hidden="true">🔊</span>
        <span class="baca__play-label">Ketuk untuk dengar lagi</span>
      </button>

      <div class="baca__options">
        <button
          v-for="option in current.options"
          :key="option.id"
          class="baca__option"
          :class="`baca__option--${optionState(option)}`"
          type="button"
          :disabled="answered"
          @click="choose(option)"
        >
          {{ option.text }}
        </button>
      </div>

      <BaseButton v-if="answered" variant="primary" size="lg" @click="nextQuestion">
        {{ isLastQuestion ? 'Selesai 🎉' : 'Lanjut →' }}
      </BaseButton>
    </template>

    <!-- ---------- Done ---------- -->
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
.baca {
  @include flex(column, flex-start, stretch, spacing('xl'));

  &__card {
    @include tappable;
    @include glass($glass-bg-strong);
    @include flex(column, center, center, spacing('sm'));
    align-self: center;
    width: 100%;
    max-width: 440px;
    padding: spacing('xl');
    text-align: center;
    border-radius: $radius-xl;
    box-shadow: $shadow-md;
    border-top: 6px solid $color-bahasa;
  }

  &__emoji {
    font-size: font-size('giant');
  }

  &__text {
    font-size: font-size('display');
    font-weight: $font-weight-bold;
    color: $color-bahasa-dark;
    letter-spacing: 0.02em;
  }

  &__hint {
    font-size: font-size('md');
    color: $color-ink-soft;
  }

  &__listen {
    font-size: font-size('sm');
    font-weight: $font-weight-bold;
    color: $color-bahasa;
  }

  &__nav {
    @include flex(row, space-between, center, spacing('md'));
  }

  &__play {
    @include tappable;
    @include flex(column, center, center, spacing('xs'));
    align-self: center;
    padding: spacing('lg') spacing('xl');
    background: $gradient-bahasa;
    color: $color-white;
    border-radius: $radius-xl;
    box-shadow: $shadow-glow-bahasa;
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
    max-width: 440px;
    width: 100%;
    margin-inline: auto;
  }

  &__option {
    @include tappable;
    @include flex-center;
    min-height: 72px;
    padding: spacing('md');
    font-size: font-size('xl');
    font-weight: $font-weight-bold;
    color: $color-ink;
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
