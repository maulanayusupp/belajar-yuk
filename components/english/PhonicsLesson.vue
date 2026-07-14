<script setup lang="ts">
import type { EnglishLesson } from '~/types'
import { shuffle, clamp } from '~/utils/array'
import { mistakeService } from '~/services/mistakeService'

// Pelajaran Phonics: fase Belajar (bunyi huruf lewat kata contoh) →
// Kuis (pilih huruf awal dari sebuah kata) → Perayaan.
const props = defineProps<{ lesson: EnglishLesson }>()

const { saveResult } = useProgress()
const { pronounce, play } = useAudio()

type Phase = 'learn' | 'quiz' | 'done'
const phase = ref<Phase>('learn')
const cardIndex = ref(0)
const stars = ref(0)
const scoreText = ref('')

const items = computed(() => props.lesson.items)
const currentCard = computed(() => items.value[cardIndex.value])
const isLastCard = computed(() => cardIndex.value === items.value.length - 1)

function hear(text: string, audioUrl?: string) {
  play('pop')
  pronounce(text, audioUrl)
}

// Ucapkan kalimat contoh otomatis tiap ganti kartu.
watch(cardIndex, () => pronounce(currentCard.value.example ?? currentCard.value.word), {
  immediate: false,
})
onMounted(() => pronounce(currentCard.value.example ?? currentCard.value.word))

function nextCard() {
  if (isLastCard.value) phase.value = 'quiz'
  else cardIndex.value++
}
function prevCard() {
  if (cardIndex.value > 0) cardIndex.value--
}

// ---- Kuis: pilih huruf awal ----
interface Question {
  item: (typeof items.value)[number]
  options: string[]
}
const questions = computed<Question[]>(() =>
  shuffle(items.value).map((item) => {
    const distractors = shuffle(items.value.filter((i) => i.id !== item.id))
      .slice(0, 3)
      .map((i) => i.word)
    return { item, options: shuffle([item.word, ...distractors]) }
  }),
)
const qIndex = ref(0)
const correct = ref(0)
const selected = ref<string | null>(null)
const currentQ = computed(() => questions.value[qIndex.value])
const answered = computed(() => selected.value !== null)
const isLastQ = computed(() => qIndex.value === questions.value.length - 1)

function choose(letter: string) {
  if (answered.value) return
  selected.value = letter
  pronounce(currentQ.value.item.example ?? currentQ.value.item.word)
  if (letter === currentQ.value.item.word) {
    correct.value++
    play('correct')
    mistakeService.remove(props.lesson.id, currentQ.value.item.id)
  } else {
    play('wrong')
    mistakeService.add(props.lesson.id, currentQ.value.item.id)
  }
}

function optionState(letter: string): 'default' | 'correct' | 'wrong' {
  if (!answered.value) return 'default'
  if (letter === currentQ.value.item.word) return 'correct'
  if (letter === selected.value) return 'wrong'
  return 'default'
}

function starsFromScore(c: number, total: number): number {
  const ratio = total > 0 ? c / total : 0
  if (ratio >= 0.9) return 3
  if (ratio >= 0.6) return 2
  return clamp(c, 0, 1)
}

function nextQuestion() {
  if (isLastQ.value) {
    stars.value = starsFromScore(correct.value, questions.value.length)
    scoreText.value = `Kamu benar ${correct.value} dari ${questions.value.length} soal`
    saveResult(props.lesson.id, stars.value)
    phase.value = 'done'
    return
  }
  qIndex.value++
  selected.value = null
}

function restart() {
  cardIndex.value = 0
  qIndex.value = 0
  correct.value = 0
  selected.value = null
  stars.value = 0
  phase.value = 'learn'
}
function goHome() {
  navigateTo('/english')
}
</script>

<template>
  <div class="phonics">
    <!-- ---------- Belajar ---------- -->
    <template v-if="phase === 'learn'">
      <BaseMascot
        message="Ketuk kartunya untuk mendengar bunyi huruf & kata contohnya."
        message-en="Tap to hear the sound!"
      />
      <BaseProgressBar :current="cardIndex + 1" :total="items.length" accent="english" />

      <div class="phonics__stage">
        <button
          class="letter-card anim-bounce-in"
          type="button"
          @click="hear(currentCard.example ?? currentCard.word, currentCard.audioUrl)"
        >
          <span class="letter-card__letter">{{ currentCard.word }}</span>
          <span class="letter-card__emoji" aria-hidden="true">{{ currentCard.emoji }}</span>
          <span class="letter-card__example">{{ currentCard.example }}</span>
          <span class="letter-card__hint">🔊 Ketuk untuk mendengar</span>
        </button>
      </div>

      <div class="phonics__nav">
        <BaseButton variant="ghost" :disabled="cardIndex === 0" @click="prevCard">
          ← Kembali
        </BaseButton>
        <BaseButton variant="english" size="lg" @click="nextCard">
          {{ isLastCard ? 'Mulai Kuis 📝' : 'Lanjut →' }}
        </BaseButton>
      </div>
    </template>

    <!-- ---------- Kuis ---------- -->
    <template v-else-if="phase === 'quiz'">
      <BaseMascot
        message="Kata ini diawali huruf apa? Pilih yang benar!"
        message-en="Which letter comes first?"
      />
      <div class="phonics__quiz">
        <p class="phonics__counter">Soal {{ qIndex + 1 }} / {{ questions.length }}</p>
        <div class="phonics__prompt">
          <span :key="currentQ.item.id" class="phonics__emoji anim-bounce-in" aria-hidden="true">
            {{ currentQ.item.emoji }}
          </span>
          <p class="phonics__word">{{ currentQ.item.translation }}</p>
        </div>

        <div class="phonics__options">
          <button
            v-for="letter in currentQ.options"
            :key="letter"
            class="phonics__option"
            :class="`phonics__option--${optionState(letter)}`"
            type="button"
            :disabled="answered"
            @click="choose(letter)"
          >
            {{ letter }}
          </button>
        </div>

        <BaseButton v-if="answered" variant="english" size="lg" @click="nextQuestion">
          {{ isLastQ ? 'Selesai 🎉' : 'Lanjut →' }}
        </BaseButton>
      </div>
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
.phonics {
  @include flex(column, flex-start, stretch, spacing('xl'));

  &__stage {
    @include flex-center;
    min-height: 320px;
  }

  &__nav {
    @include flex(row, space-between, center, spacing('md'));
  }

  &__quiz {
    @include flex(column, flex-start, center, spacing('lg'));
  }

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

  &__word {
    font-size: font-size('lg');
    color: $color-text;
    font-weight: $font-weight-bold;
  }

  &__options {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: spacing('md');
    max-width: 380px;
    width: 100%;
  }

  &__option {
    @include tappable;
    aspect-ratio: 1;
    @include flex-center;
    font-size: font-size('xl');
    font-weight: $font-weight-bold;
    color: $color-english-dark;
    background: $color-white;
    border: 3px solid $color-border;
    border-radius: $radius-md;
    box-shadow: $shadow-sm;

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

.letter-card {
  @include tappable;
  @include flex(column, center, center, spacing('sm'));
  @include card(spacing('xl'));
  width: 100%;
  max-width: 360px;
  text-align: center;

  &__letter {
    @include gradient-text($gradient-english);
    font-family: $font-family-display;
    font-weight: $font-weight-bold;
    font-size: font-size('giant');
    line-height: 1;
  }

  &__emoji {
    font-size: font-size('xxl');
    animation: float 3s ease-in-out infinite;
  }

  &__example {
    font-size: font-size('lg');
    color: $color-text-muted;
    font-weight: $font-weight-semibold;
  }

  &__hint {
    margin-top: spacing('xs');
    font-size: font-size('xs');
    color: $color-english;
    font-weight: $font-weight-bold;
  }
}
</style>
