<script setup lang="ts">
import type { ScienceFact, ScienceLesson } from '~/types'
import { shuffle, clamp } from '~/utils/array'
import { mistakeService } from '~/services/mistakeService'

// Mesin pelajaran Sains: Kenali fakta (kartu) → Kuis (pilih jawaban) → Perayaan.
const props = defineProps<{ lesson: ScienceLesson }>()

const { saveResult } = useProgress()
const { pronounce, speak, play } = useAudio()

type Phase = 'learn' | 'quiz' | 'done'
const phase = ref<Phase>('learn')

// ---------- Fase Belajar ----------
const cardIndex = ref(0)
const currentFact = computed(() => props.lesson.facts[cardIndex.value])
const isLastCard = computed(() => cardIndex.value === props.lesson.facts.length - 1)

function sayFact(fact: ScienceFact) {
  play('pop')
  // Ucapkan istilah Bahasa Inggris (fokus kosakata sains).
  pronounce(fact.term)
}

onMounted(() => pronounce(currentFact.value.term))
watch(cardIndex, () => pronounce(currentFact.value.term))

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

// ---------- Fase Kuis ----------
interface Question {
  fact: ScienceFact
  options: ScienceFact[]
}
const questions = computed<Question[]>(() =>
  shuffle(props.lesson.facts).map((fact) => {
    const distractors = shuffle(props.lesson.facts.filter((f) => f.id !== fact.id)).slice(0, 3)
    return { fact, options: shuffle([fact, ...distractors]) }
  }),
)

const qIndex = ref(0)
const correct = ref(0)
const selectedId = ref<string | null>(null)

const current = computed(() => questions.value[qIndex.value])
const answered = computed(() => selectedId.value !== null)
const isLastQuestion = computed(() => qIndex.value === questions.value.length - 1)

function choose(option: ScienceFact) {
  if (answered.value) return
  selectedId.value = option.id
  if (option.id === current.value.fact.id) {
    correct.value++
    play('correct')
    speak(option.term)
    mistakeService.remove(props.lesson.id, current.value.fact.id)
  } else {
    play('wrong')
    mistakeService.add(props.lesson.id, current.value.fact.id)
  }
}

function optionState(option: ScienceFact): 'default' | 'correct' | 'wrong' {
  if (!answered.value) return 'default'
  if (option.id === current.value.fact.id) return 'correct'
  if (option.id === selectedId.value) return 'wrong'
  return 'default'
}

// ---------- Selesai ----------
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
  navigateTo('/science')
}
</script>

<template>
  <div class="sci">
    <!-- ---------- Fase Belajar ---------- -->
    <template v-if="phase === 'learn'">
      <BaseMascot
        message="Amati fakta seru ini. Ketuk kartu untuk mendengar kata Inggrisnya."
        message-en="Tap the card to listen!"
      />
      <BaseProgressBar :current="cardIndex + 1" :total="lesson.facts.length" accent="science" />

      <button class="sci__card anim-bounce-in" type="button" @click="sayFact(currentFact)">
        <span class="sci__emoji" aria-hidden="true">{{ currentFact.emoji }}</span>
        <span class="sci__term">{{ currentFact.term }}</span>
        <span class="sci__name">{{ currentFact.name }}</span>
        <span class="sci__fact">{{ currentFact.fact }}</span>
        <span class="sci__listen">🔊 Ketuk untuk dengar</span>
      </button>

      <div class="sci__nav">
        <BaseButton variant="ghost" :disabled="cardIndex === 0" @click="prevCard">
          ← Kembali
        </BaseButton>
        <BaseButton variant="primary" size="lg" @click="nextCard">
          {{ isLastCard ? 'Mulai Kuis 📝' : 'Lanjut →' }}
        </BaseButton>
      </div>
    </template>

    <!-- ---------- Fase Kuis ---------- -->
    <template v-else-if="phase === 'quiz'">
      <BaseMascot
        message="Sekarang giliranmu! Pilih jawaban yang benar."
        message-en="Choose the correct answer!"
      />
      <BaseProgressBar :current="qIndex + 1" :total="questions.length" accent="science" />

      <p class="sci__clue">{{ current.fact.clue }}</p>

      <div class="sci__options">
        <button
          v-for="option in current.options"
          :key="option.id"
          class="sci__option"
          :class="`sci__option--${optionState(option)}`"
          type="button"
          :disabled="answered"
          @click="choose(option)"
        >
          <span class="sci__option-emoji" aria-hidden="true">{{ option.emoji }}</span>
          <span class="sci__option-label">{{ option.name }}</span>
        </button>
      </div>

      <BaseButton v-if="answered" variant="primary" size="lg" @click="nextQuestion">
        {{ isLastQuestion ? 'Selesai 🎉' : 'Lanjut →' }}
      </BaseButton>
    </template>

    <!-- ---------- Selesai ---------- -->
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
.sci {
  @include flex(column, flex-start, stretch, spacing('xl'));

  &__card {
    @include tappable;
    @include glass($glass-bg-strong);
    @include flex(column, center, center, spacing('sm'));
    align-self: center;
    width: 100%;
    max-width: 460px;
    padding: spacing('xl');
    text-align: center;
    border-radius: $radius-xl;
    box-shadow: $shadow-md;
    border-top: 6px solid $color-science;
  }

  &__emoji {
    font-size: font-size('giant');
    filter: drop-shadow(0 10px 20px rgba(26, 16, 53, 0.2));
  }

  &__term {
    font-size: font-size('xl');
    font-weight: $font-weight-bold;
    color: $color-science-dark;
  }

  &__name {
    font-size: font-size('md');
    font-weight: $font-weight-bold;
    color: $color-ink-soft;
  }

  &__fact {
    font-size: font-size('sm');
    color: $color-ink;
    max-width: 34ch;
  }

  &__listen {
    font-size: font-size('sm');
    font-weight: $font-weight-bold;
    color: $color-science;
  }

  &__nav {
    @include flex(row, space-between, center, spacing('md'));
  }

  &__clue {
    text-align: center;
    font-size: font-size('lg');
    font-weight: $font-weight-bold;
    color: $color-ink;
    margin: 0;
  }

  &__options {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: spacing('md');
    max-width: 460px;
    width: 100%;
    margin-inline: auto;
  }

  &__option {
    @include tappable;
    @include flex(column, center, center, spacing('xs'));
    padding: spacing('md');
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

  &__option-emoji {
    font-size: font-size('display');
  }

  &__option-label {
    font-weight: $font-weight-bold;
    color: $color-ink;
    font-size: font-size('sm');
  }
}
</style>
