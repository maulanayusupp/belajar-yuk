<script setup lang="ts">
import type { MathLesson } from '~/types'
import { lessonService } from '~/services/lessonService'
import { mistakeService } from '~/services/mistakeService'
import { generateNumberOptions } from '~/utils/math'
import { clamp, range } from '~/utils/array'

// Runs a single Math lesson. Visualizes each problem according to its
// method (Number Bond / Block Addition / Block Subtraction / Counting),
// then the child picks an answer. Ends with a celebration screen + saves progress.
const props = defineProps<{ lesson: MathLesson }>()

// Method metadata (icon + instruction) comes from a central registry.
const methodMeta = computed(() => lessonService.getMathMethodMeta(props.lesson.method))
const instruction = computed(() => methodMeta.value.instruction)
// A short English flourish that fits the method (not "Let's count!" everywhere).
const messageEn = computed(() => {
  if (props.lesson.method === 'clock') return 'What time is it?'
  if (props.lesson.method === 'pattern') return "What's next?"
  if (props.lesson.method === 'compare') return 'Compare!'
  return "Let's count!"
})

const { saveResult } = useProgress()
const { play, speak } = useAudio()

const index = ref(0)
const correct = ref(0)
const selected = ref<number | null>(null)
const done = ref(false)
const stars = ref(0)
const scoreText = ref('')

const problem = computed(() => props.lesson.problems[index.value])

// Number-line scale (0..10 or 0..20) based on the largest answer.
const lineMax = computed(() =>
  Math.max(...props.lesson.problems.map((p) => p.answer)) > 10 ? 20 : 10,
)
// The value to pick: for "missing number" = operandB (the missing
// part, e.g. 7 + ▢ = 12 → ▢ = 5); otherwise = answer.
const correctValue = computed(() =>
  props.lesson.method === 'missing-number' ? problem.value.operandB : problem.value.answer,
)
const answered = computed(() => selected.value !== null)
const isCorrect = computed(() => selected.value === correctValue.value)
const isLast = computed(() => index.value === props.lesson.problems.length - 1)

// Answer options are built once per problem (cached on index change).
const options = ref<number[]>(generateNumberOptions(correctValue.value))
watch(index, () => {
  options.value = generateNumberOptions(correctValue.value)
})

function choose(value: number) {
  // Lock only after a CORRECT answer. If wrong, the child may try again.
  if (isCorrect.value) return
  selected.value = value
  if (value === correctValue.value) {
    correct.value++
    play('correct')
    speak(String(value))
    mistakeService.remove(props.lesson.id, problem.value.id) // mastered
  } else {
    play('wrong')
    mistakeService.add(props.lesson.id, problem.value.id) // needs review
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
  options.value = generateNumberOptions(correctValue.value)
}

function goHome() {
  navigateTo('/math')
}

function optionState(value: number): 'default' | 'correct' | 'wrong' {
  if (!answered.value) return 'default'
  if (value === correctValue.value) return 'correct'
  if (value === selected.value) return 'wrong'
  return 'default'
}
</script>

<template>
  <div class="mlesson">
    <template v-if="!done">
      <BaseMascot :message="instruction" :message-en="messageEn" />

      <BaseProgressBar :current="index + 1" :total="lesson.problems.length" accent="math" />

      <BaseCard accent="math">
        <div class="mlesson__stage">
          <!-- Method: Number Bond -->
          <MathNumberBond
            v-if="lesson.method === 'number-bond'"
            :key="`nb-${problem.id}-${answered}`"
            :whole="answered && isCorrect ? problem.answer : null"
            :part-a="problem.operandA"
            :part-b="problem.operandB"
          />

          <!-- Method: Counting (count objects) -->
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

          <!-- Method: Ten Frame -->
          <MathTenFrame
            v-else-if="lesson.method === 'ten-frame'"
            :key="`tf-${problem.id}`"
            :count="problem.operandA"
          />

          <!-- Method: Number Line -->
          <MathNumberLine
            v-else-if="lesson.method === 'number-line'"
            :key="`nl-${problem.id}`"
            :value="problem.operandA"
            :max="lineMax"
          />

          <!-- Method: Missing Number -->
          <p v-else-if="lesson.method === 'missing-number'" class="mlesson__missing">
            <span>{{ problem.operandA }}</span>
            <span class="mlesson__op">{{ problem.operator }}</span>
            <span
              class="mlesson__blank"
              :class="{ 'mlesson__blank--filled': answered && isCorrect }"
            >
              {{ answered && isCorrect ? problem.operandB : '▢' }}
            </span>
            <span class="mlesson__op">=</span>
            <span>{{ problem.answer }}</span>
          </p>

          <!-- Method: Pattern / skip-counting (what comes next?) -->
          <div
            v-else-if="lesson.method === 'pattern'"
            :key="`pt-${problem.id}`"
            class="mlesson__seq"
          >
            <template v-for="(n, i) in problem.sequence ?? []" :key="i">
              <span
                class="mlesson__seq-item"
                :class="{ 'mlesson__seq-item--q': i === (problem.sequence?.length ?? 0) - 1 }"
              >
                {{ i === (problem.sequence?.length ?? 0) - 1 ? '?' : n }}
              </span>
              <span
                v-if="i < (problem.sequence?.length ?? 0) - 1"
                class="mlesson__seq-arrow"
                aria-hidden="true"
                >→</span
              >
            </template>
          </div>

          <!-- Method: Clock (read the hour) -->
          <MathClock
            v-else-if="lesson.method === 'clock'"
            :key="`ck-${problem.id}`"
            :hour="problem.answer"
          />

          <!-- Method: Block Subtraction (take some away) -->
          <div v-else-if="lesson.method === 'block-subtraction'" class="mlesson__blocks">
            <MathBlockGroup
              :key="`sb-${problem.id}`"
              :count="problem.operandA"
              color="a"
              :taken="problem.operandB"
              :label="String(problem.operandA)"
            />
          </div>

          <!-- Method: Block Addition (Concrete–Pictorial–Abstract) -->
          <div v-else class="mlesson__blocks">
            <MathBlockGroup :count="problem.operandA" color="a" :label="String(problem.operandA)" />
            <span class="mlesson__op">+</span>
            <MathBlockGroup :count="problem.operandB" color="b" :label="String(problem.operandB)" />
          </div>

          <!-- Abstract question -->
          <p
            v-if="lesson.method === 'counting' || lesson.method === 'ten-frame'"
            class="mlesson__equation"
          >
            Ada berapa?
          </p>
          <p v-else-if="lesson.method === 'number-line'" class="mlesson__equation">
            Ada di angka berapa?
          </p>
          <p v-else-if="lesson.method === 'missing-number'" class="mlesson__equation">
            Berapa bilangan yang hilang?
          </p>
          <p v-else-if="lesson.method === 'pattern'" class="mlesson__equation">
            Angka berapa selanjutnya?
          </p>
          <p v-else-if="lesson.method === 'clock'" class="mlesson__equation">Pukul berapa?</p>
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

  // Number pattern / skip-counting sequence
  &__seq {
    @include flex(row, center, center, spacing('sm'));
    flex-wrap: wrap;
  }

  &__seq-item {
    @include flex-center;
    min-width: 56px;
    height: 56px;
    padding-inline: spacing('sm');
    font-family: $font-family-display;
    font-weight: $font-weight-bold;
    font-size: font-size('xl');
    color: $color-math-dark;
    background: rgba($color-math, 0.1);
    border-radius: $radius-md;

    &--q {
      color: $color-math;
      background: rgba($color-math, 0.06);
      border: 3px dashed $color-math;
    }
  }

  &__seq-arrow {
    color: $color-text-muted;
    font-weight: $font-weight-bold;
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

  // "Missing number" equation: big & clear.
  &__missing {
    @include flex(row, center, center, spacing('sm'));
    margin: 0;
    font-family: $font-family-display;
    font-weight: $font-weight-bold;
    font-size: font-size('xxl');
    color: $color-ink;
  }

  &__blank {
    @include flex-center;
    min-width: 64px;
    height: 64px;
    padding-inline: spacing('sm');
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
