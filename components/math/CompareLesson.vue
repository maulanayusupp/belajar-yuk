<script setup lang="ts">
import type { MathLesson } from '~/types'
import { clamp } from '~/utils/array'
import { mistakeService } from '~/services/mistakeService'

// Membandingkan dua bilangan: pilih >, <, atau =.
const props = defineProps<{ lesson: MathLesson }>()

const { saveResult } = useProgress()
const { play, speak } = useAudio()

const SYMBOLS = ['<', '=', '>'] as const
type Sym = (typeof SYMBOLS)[number]

const index = ref(0)
const selected = ref<Sym | null>(null)
const correct = ref(0)
const done = ref(false)
const stars = ref(0)
const scoreText = ref('')

const problem = computed(() => props.lesson.problems[index.value])
const answer = computed<Sym>(() => {
  const { operandA: a, operandB: b } = problem.value
  return a > b ? '>' : a < b ? '<' : '='
})
const isCorrect = computed(() => selected.value === answer.value)
const isLast = computed(() => index.value === props.lesson.problems.length - 1)

function choose(sym: Sym) {
  if (isCorrect.value) return // kunci setelah benar
  selected.value = sym
  if (sym === answer.value) {
    correct.value++
    play('correct')
    speak(sym === '>' ? 'greater' : sym === '<' ? 'less' : 'equal')
    mistakeService.remove(props.lesson.id, problem.value.id)
  } else {
    play('wrong')
    mistakeService.add(props.lesson.id, problem.value.id)
  }
}

function optionState(sym: Sym): 'default' | 'correct' | 'wrong' {
  if (selected.value === null) return 'default'
  if (sym === answer.value) return 'correct'
  if (sym === selected.value) return 'wrong'
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
}
function goHome() {
  navigateTo('/math')
}
</script>

<template>
  <div class="compare">
    <template v-if="!done">
      <BaseMascot
        message="Mana yang benar: lebih besar (>), lebih kecil (<), atau sama (=)?"
        message-en="Which is correct?"
      />
      <BaseProgressBar :current="index + 1" :total="lesson.problems.length" accent="math" />

      <BaseCard accent="math">
        <div class="compare__stage">
          <span class="compare__num">{{ problem.operandA }}</span>
          <span
            class="compare__slot"
            :class="{ 'compare__slot--filled': isCorrect }"
            aria-hidden="true"
          >
            {{ isCorrect ? answer : '?' }}
          </span>
          <span class="compare__num">{{ problem.operandB }}</span>
        </div>
      </BaseCard>

      <div class="compare__options">
        <button
          v-for="sym in SYMBOLS"
          :key="sym"
          class="compare__option"
          :class="`compare__option--${optionState(sym)}`"
          type="button"
          :disabled="isCorrect"
          @click="choose(sym)"
        >
          {{ sym }}
        </button>
      </div>

      <BaseButton v-if="isCorrect" variant="math" size="lg" @click="next">
        {{ isLast ? 'Selesai 🎉' : 'Lanjut →' }}
      </BaseButton>
      <p v-else-if="selected !== null" class="compare__retry">Belum tepat, coba lagi ya! 😊</p>
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
.compare {
  @include flex(column, flex-start, stretch, spacing('lg'));

  &__stage {
    @include flex(row, center, center, spacing('lg'));
  }

  &__num {
    @include flex-center;
    width: 96px;
    height: 96px;
    font-family: $font-family-display;
    font-weight: $font-weight-bold;
    font-size: font-size('xxl');
    color: $color-white;
    background: $gradient-math;
    border-radius: $radius-lg;
    box-shadow: $shadow-md;
  }

  &__slot {
    @include flex-center;
    width: 64px;
    height: 64px;
    font-family: $font-family-display;
    font-weight: $font-weight-bold;
    font-size: font-size('xxl');
    color: $color-math;
    background: rgba($color-math, 0.1);
    border: 3px dashed $color-math;
    border-radius: $radius-md;

    &--filled {
      background: rgba($color-success, 0.15);
      border-style: solid;
      border-color: $color-success;
      color: #05987a;
      animation: pop 0.4s ease;
    }
  }

  &__options {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: spacing('md');
    max-width: 360px;
    width: 100%;
    margin-inline: auto;
  }

  &__option {
    @include tappable;
    @include flex-center;
    aspect-ratio: 1;
    font-family: $font-family-display;
    font-size: font-size('xxl');
    font-weight: $font-weight-bold;
    color: $color-math;
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
    text-align: center;
    color: $color-error;
    font-weight: $font-weight-bold;
    margin: 0;
  }
}
</style>
