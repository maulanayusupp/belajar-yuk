<script setup lang="ts">
import type { EnglishLesson } from '~/types'
import { clamp } from '~/utils/array'

// Mengorkestrasi satu pelajaran kosakata:
//   Belajar (flashcard) → Kuis → Perayaan.
const props = defineProps<{ lesson: EnglishLesson }>()

const { saveResult } = useProgress()

type Phase = 'learn' | 'quiz' | 'done'
const phase = ref<Phase>('learn')
const cardIndex = ref(0)
const stars = ref(0)
const scoreText = ref('')

const currentItem = computed(() => props.lesson.items[cardIndex.value])
const isLastCard = computed(() => cardIndex.value === props.lesson.items.length - 1)

function nextCard() {
  if (isLastCard.value) phase.value = 'quiz'
  else cardIndex.value++
}
function prevCard() {
  if (cardIndex.value > 0) cardIndex.value--
}

function starsFromScore(correct: number, total: number): number {
  const ratio = total > 0 ? correct / total : 0
  if (ratio >= 0.9) return 3
  if (ratio >= 0.6) return 2
  return clamp(correct, 0, 1)
}

function onQuizComplete({ correct, total }: { correct: number; total: number }) {
  stars.value = starsFromScore(correct, total)
  scoreText.value = `Kamu benar ${correct} dari ${total} soal`
  saveResult(props.lesson.id, stars.value)
  phase.value = 'done'
}

function restart() {
  cardIndex.value = 0
  stars.value = 0
  phase.value = 'learn'
}

function goHome() {
  navigateTo('/english')
}
</script>

<template>
  <div class="vlesson">
    <!-- ---------- Fase Belajar ---------- -->
    <template v-if="phase === 'learn'">
      <BaseMascot
        message="Ketuk kartunya untuk mendengar cara membaca kata ini."
        message-en="Tap the card to listen!"
      />

      <BaseProgressBar :current="cardIndex + 1" :total="lesson.items.length" accent="english" />

      <div class="vlesson__stage">
        <EnglishFlashCard :item="currentItem" auto-speak />
      </div>

      <div class="vlesson__nav">
        <BaseButton variant="ghost" :disabled="cardIndex === 0" @click="prevCard">
          ← Kembali
        </BaseButton>
        <BaseButton variant="english" size="lg" @click="nextCard">
          {{ isLastCard ? 'Mulai Kuis 📝' : 'Lanjut →' }}
        </BaseButton>
      </div>
    </template>

    <!-- ---------- Fase Kuis ---------- -->
    <template v-else-if="phase === 'quiz'">
      <BaseMascot
        message="Sekarang giliranmu! Pilih kata Bahasa Inggris yang benar."
        message-en="Choose the correct word!"
      />
      <EnglishQuiz :items="lesson.items" @complete="onQuizComplete" />
    </template>

    <!-- ---------- Fase Selesai ---------- -->
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
.vlesson {
  @include flex(column, flex-start, stretch, spacing('xl'));

  &__stage {
    @include flex-center;
    min-height: 320px;
  }

  &__nav {
    @include flex(row, space-between, center, spacing('md'));
  }
}
</style>
