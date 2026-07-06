<script setup lang="ts">
import type { MathLesson } from '~/types'
import { lessonService } from '~/services/lessonService'
import { generateNumberOptions } from '~/utils/math'
import { clamp, range } from '~/utils/array'

// Menjalankan satu pelajaran Matematika. Memvisualkan tiap soal sesuai
// metode (Number Bond / Block Addition / Block Subtraction / Counting),
// lalu anak memilih jawaban. Diakhiri layar perayaan + simpan progres.
const props = defineProps<{ lesson: MathLesson }>()

// Metadata metode (ikon + instruksi) diambil dari registry terpusat.
const methodMeta = computed(() => lessonService.getMathMethodMeta(props.lesson.method))
const instruction = computed(() => methodMeta.value.instruction)

const { saveResult } = useProgress()
const { play, speak } = useAudio()

const index = ref(0)
const correct = ref(0)
const selected = ref<number | null>(null)
const done = ref(false)
const stars = ref(0)
const scoreText = ref('')

const problem = computed(() => props.lesson.problems[index.value])
const answered = computed(() => selected.value !== null)
const isCorrect = computed(() => selected.value === problem.value.answer)
const isLast = computed(() => index.value === props.lesson.problems.length - 1)

// Opsi jawaban dibuat sekali per soal (di-cache pada perubahan index).
const options = ref<number[]>(generateNumberOptions(problem.value.answer))
watch(index, () => {
  options.value = generateNumberOptions(problem.value.answer)
})

function choose(value: number) {
  // Kunci hanya setelah jawaban BENAR. Jika salah, anak boleh mencoba lagi.
  if (isCorrect.value) return
  selected.value = value
  if (value === problem.value.answer) {
    correct.value++
    play('correct')
    speak(String(value))
  } else {
    play('wrong')
  }
}

function starsFromScore(c: number, total: number): number {
  const ratio = total > 0 ? c / total : 0
  if (ratio >= 0.9) return 3
  if (ratio >= 0.6) return 2
  return clamp(c, 0, 1)
}

function next() {
  if (isLast.value) {
    stars.value = starsFromScore(correct.value, props.lesson.problems.length)
    scoreText.value = `Kamu benar ${correct.value} dari ${props.lesson.problems.length} soal`
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
  options.value = generateNumberOptions(props.lesson.problems[0].answer)
}

function goHome() {
  navigateTo('/math')
}

function optionState(value: number): 'default' | 'correct' | 'wrong' {
  if (!answered.value) return 'default'
  if (value === problem.value.answer) return 'correct'
  if (value === selected.value) return 'wrong'
  return 'default'
}
</script>

<template>
  <div class="mlesson">
    <template v-if="!done">
      <BaseMascot :message="instruction" message-en="Let's count!" />

      <BaseProgressBar :current="index + 1" :total="lesson.problems.length" accent="math" />

      <BaseCard accent="math">
        <div class="mlesson__stage">
          <!-- Metode: Number Bond -->
          <MathNumberBond
            v-if="lesson.method === 'number-bond'"
            :key="`nb-${problem.id}-${answered}`"
            :whole="answered && isCorrect ? problem.answer : null"
            :part-a="problem.operandA"
            :part-b="problem.operandB"
          />

          <!-- Metode: Counting (hitung benda) -->
          <div
            v-else-if="lesson.method === 'counting'"
            :key="`ct-${problem.id}`"
            class="mlesson__objects"
          >
            <span
              v-for="i in range(problem.operandA)"
              :key="i"
              class="mlesson__object"
              :style="{ '--i': i }"
              aria-hidden="true"
            >
              {{ problem.emoji }}
            </span>
          </div>

          <!-- Metode: Ten Frame (sepuluh kotak) -->
          <MathTenFrame
            v-else-if="lesson.method === 'ten-frame'"
            :key="`tf-${problem.id}`"
            :count="problem.operandA"
          />

          <!-- Metode: Block Subtraction (ambil sebagian) -->
          <div v-else-if="lesson.method === 'block-subtraction'" class="mlesson__blocks">
            <MathBlockGroup
              :key="`sb-${problem.id}`"
              :count="problem.operandA"
              color="a"
              :taken="problem.operandB"
              :label="String(problem.operandA)"
            />
          </div>

          <!-- Metode: Block Addition (Concrete–Pictorial–Abstract) -->
          <div v-else class="mlesson__blocks">
            <MathBlockGroup :count="problem.operandA" color="a" :label="String(problem.operandA)" />
            <span class="mlesson__op">+</span>
            <MathBlockGroup :count="problem.operandB" color="b" :label="String(problem.operandB)" />
          </div>

          <!-- Pertanyaan abstrak -->
          <p
            v-if="lesson.method === 'counting' || lesson.method === 'ten-frame'"
            class="mlesson__equation"
          >
            Ada berapa?
          </p>
          <p v-else class="mlesson__equation">
            {{ problem.operandA }} {{ problem.operator }} {{ problem.operandB }} =
            <span
              class="mlesson__answer"
              :class="{ 'mlesson__answer--revealed': answered && isCorrect }"
            >
              {{ answered && isCorrect ? problem.answer : '?' }}
            </span>
          </p>
        </div>
      </BaseCard>

      <div class="mlesson__options">
        <button
          v-for="value in options"
          :key="value"
          class="mlesson__option"
          :class="`mlesson__option--${optionState(value)}`"
          type="button"
          :disabled="answered && isCorrect"
          @click="choose(value)"
        >
          {{ value }}
        </button>
      </div>

      <BaseButton v-if="answered && isCorrect" variant="math" size="lg" @click="next">
        {{ isLast ? 'Selesai 🎉' : 'Lanjut →' }}
      </BaseButton>
      <p v-else-if="answered" class="mlesson__retry">Belum tepat, coba lagi ya! 😊</p>
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
.mlesson {
  @include flex(column, flex-start, stretch, spacing('lg'));

  &__stage {
    @include flex(column, center, center, spacing('lg'));
  }

  &__objects {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: spacing('sm');
    max-width: 420px;
  }

  &__object {
    font-size: font-size('xxl');
    line-height: 1;
    animation: bounce-in 0.4s $transition-bounce both;
    animation-delay: calc(var(--i) * 0.08s);
  }

  &__blocks {
    @include flex(row, center, center, spacing('lg'));
    flex-wrap: wrap;
  }

  &__op {
    font-size: font-size('xxl');
    font-weight: $font-weight-bold;
    color: $color-text-muted;
  }

  &__equation {
    font-size: font-size('xl');
    font-weight: $font-weight-bold;
    color: $color-text;
  }

  &__answer {
    display: inline-block;
    min-width: 1.5em;
    color: $color-math;

    &--revealed {
      animation: pop 0.4s ease;
    }
  }

  &__options {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: spacing('md');
    max-width: 420px;
    margin-inline: auto;
    width: 100%;
  }

  &__option {
    @include tappable;
    aspect-ratio: 1;
    @include flex-center;
    font-size: font-size('xl');
    font-weight: $font-weight-bold;
    color: $color-math;
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

  &__retry {
    text-align: center;
    color: $color-error;
    font-weight: $font-weight-bold;
  }
}
</style>
