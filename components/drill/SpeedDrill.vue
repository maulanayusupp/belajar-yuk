<script setup lang="ts">
import type { DrillMode, DrillQuestion } from '~/types'
import { drillService, makeQuestion, DRILL_DURATION } from '~/services/drillService'

// One timed fluency drill: rapid-fire questions for DRILL_DURATION seconds.
// Answer as many as possible; a personal best is kept per mode.
const props = defineProps<{ mode: DrillMode }>()
const emit = defineEmits<{ back: [] }>()

const { play } = useAudio()
const { celebrate } = useConfetti()

type Phase = 'ready' | 'playing' | 'done'
const phase = ref<Phase>('ready')

const timeLeft = ref(DRILL_DURATION)
const score = ref(0)
const attempts = ref(0)
const current = ref<DrillQuestion | null>(null)
const flash = ref<'correct' | 'wrong' | null>(null)
const isBest = ref(false)

let timer = 0

const accuracy = computed(() =>
  attempts.value > 0 ? Math.round((score.value / attempts.value) * 100) : 0,
)
const best = computed(() => drillService.getBest(props.mode))
const meta = computed(() => drillService.getMeta(props.mode))
const timePercent = computed(() => Math.round((timeLeft.value / DRILL_DURATION) * 100))

function nextQuestion() {
  current.value = makeQuestion(props.mode)
}

function start() {
  score.value = 0
  attempts.value = 0
  timeLeft.value = DRILL_DURATION
  isBest.value = false
  flash.value = null
  nextQuestion()
  phase.value = 'playing'
  timer = window.setInterval(() => {
    timeLeft.value--
    if (timeLeft.value <= 0) finish()
  }, 1000)
}

function stopTimer() {
  if (timer) {
    window.clearInterval(timer)
    timer = 0
  }
}

function answer(value: number) {
  if (phase.value !== 'playing' || !current.value) return
  attempts.value++
  if (value === current.value.answer) {
    score.value++
    play('correct')
    flash.value = 'correct'
  } else {
    play('wrong')
    flash.value = 'wrong'
  }
  window.setTimeout(() => (flash.value = null), 180)
  nextQuestion()
}

function finish() {
  stopTimer()
  phase.value = 'done'
  play('win')
  const res = drillService.saveScore(props.mode, score.value, accuracy.value, Date.now())
  isBest.value = res.isBest
  if (res.isBest && score.value > 0) celebrate()
}

onBeforeUnmount(stopTimer)
</script>

<template>
  <div class="drill">
    <!-- ---------- Ready ---------- -->
    <template v-if="phase === 'ready'">
      <div class="drill__intro">
        <span class="drill__icon" aria-hidden="true">{{ meta.icon }}</span>
        <h2 class="drill__title">{{ meta.label }}</h2>
        <p class="drill__desc">{{ meta.description }}</p>
        <p class="drill__hint">
          Jawab sebanyak-banyaknya dalam {{ DRILL_DURATION }} detik. Cepat & tepat!
        </p>
        <p v-if="best" class="drill__best">🏆 Rekormu: {{ best.score }} benar</p>
      </div>
      <div class="drill__actions">
        <BaseButton variant="ghost" @click="emit('back')">← Pilih lain</BaseButton>
        <BaseButton variant="primary" size="lg" @click="start">Mulai 🚀</BaseButton>
      </div>
    </template>

    <!-- ---------- Playing ---------- -->
    <template v-else-if="phase === 'playing'">
      <div class="drill__hud">
        <span class="drill__score">⭐ {{ score }}</span>
        <span class="drill__time">⏱ {{ timeLeft }}s</span>
      </div>
      <div class="drill__timebar" aria-hidden="true">
        <div class="drill__timebar-fill" :style="{ '--percent': `${timePercent}%` }" />
      </div>

      <div class="drill__stage" :class="flash ? `drill__stage--${flash}` : ''">
        <p class="drill__prompt">{{ current?.prompt }}</p>
      </div>

      <div class="drill__options">
        <button
          v-for="opt in current?.options"
          :key="opt"
          class="drill__option"
          type="button"
          @click="answer(opt)"
        >
          {{ opt }}
        </button>
      </div>
    </template>

    <!-- ---------- Done ---------- -->
    <template v-else>
      <div class="drill__result">
        <span class="drill__result-emoji" aria-hidden="true">{{ isBest ? '🏆' : '🎉' }}</span>
        <h2 class="drill__result-title">{{ isBest ? 'Rekor Baru!' : 'Selesai!' }}</h2>
        <p class="drill__result-score">{{ score }}</p>
        <p class="drill__result-label">jawaban benar</p>
        <p class="drill__result-acc">Ketepatan {{ accuracy }}%</p>
        <p v-if="best && !isBest" class="drill__best">🏆 Rekormu: {{ best.score }} benar</p>
      </div>
      <div class="drill__actions">
        <BaseButton variant="ghost" @click="emit('back')">← Pilih lain</BaseButton>
        <BaseButton variant="primary" size="lg" @click="start">Main lagi 🔁</BaseButton>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.drill {
  @include flex(column, flex-start, stretch, spacing('lg'));

  &__intro,
  &__result {
    @include glass($glass-bg-strong);
    @include flex(column, center, center, spacing('xs'));
    text-align: center;
    padding: spacing('xl');
    border-radius: $radius-xl;
    box-shadow: $shadow-md;
  }

  &__icon {
    font-size: font-size('giant');
  }

  &__title {
    margin: 0;
  }

  &__desc {
    margin: 0;
    color: $color-ink-soft;
  }

  &__hint {
    margin: spacing('sm') 0 0;
    font-weight: $font-weight-bold;
    color: $color-primary-dark;
  }

  &__best {
    margin: spacing('xs') 0 0;
    font-weight: $font-weight-bold;
    color: $color-ink;
  }

  &__actions {
    @include flex(row, space-between, center, spacing('md'));
  }

  // HUD
  &__hud {
    @include flex(row, space-between, center, spacing('md'));
    font-size: font-size('lg');
    font-weight: $font-weight-bold;
  }

  &__score {
    color: $color-star;
  }
  &__time {
    color: $color-primary-dark;
  }

  &__timebar {
    height: 12px;
    background: rgba($color-primary, 0.12);
    border-radius: $radius-pill;
    overflow: hidden;
  }
  &__timebar-fill {
    height: 100%;
    width: var(--percent);
    background: $gradient-primary;
    border-radius: $radius-pill;
    transition: width 1s linear;
  }

  &__stage {
    @include flex-center;
    min-height: 160px;
    background: $color-white;
    border: 3px solid $color-border;
    border-radius: $radius-xl;
    box-shadow: $shadow-sm;
    transition: all $transition-fast;

    &--correct {
      border-color: $color-success;
      background: rgba($color-success, 0.12);
    }
    &--wrong {
      border-color: $color-error;
      background: rgba($color-error, 0.1);
    }
  }

  &__prompt {
    margin: 0;
    font-family: $font-family-display;
    font-size: font-size('xxl');
    font-weight: $font-weight-bold;
    color: $color-ink;
  }

  &__options {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: spacing('md');
  }

  &__option {
    @include tappable;
    @include flex-center;
    min-height: 80px;
    font-family: $font-family-display;
    font-size: font-size('xl');
    font-weight: $font-weight-bold;
    color: $color-white;
    background: $gradient-primary;
    border-radius: $radius-lg;
    box-shadow: $shadow-sm;
  }

  // Result
  &__result-emoji {
    font-size: font-size('giant');
  }
  &__result-title {
    margin: 0;
    @include gradient-text($gradient-primary);
  }
  &__result-score {
    margin: 0;
    font-family: $font-family-display;
    font-size: font-size('display');
    font-weight: $font-weight-bold;
    color: $color-primary-dark;
    line-height: 1;
  }
  &__result-label {
    margin: 0;
    color: $color-ink-soft;
  }
  &__result-acc {
    margin: spacing('xs') 0 0;
    font-weight: $font-weight-bold;
  }
}
</style>
