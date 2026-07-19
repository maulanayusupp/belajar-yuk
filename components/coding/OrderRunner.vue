<script setup lang="ts">
import type { CodingOrderLevel, OrderStep } from '~/types'
import { shuffle } from '~/utils/array'
import { codingService } from '~/services/codingService'

// "Order the steps" game — a DIFFERENT format from the grid puzzles: no robot,
// no grid. The child taps scrambled step cards into the correct order.
const props = defineProps<{ level: CodingOrderLevel; nextId: string | null }>()

const { play, speak } = useAudio()
const { celebrate } = useConfetti()

const total = computed(() => props.level.steps.length)

const pool = ref<OrderStep[]>([]) // shuffled cards still available
const built = ref<OrderStep[]>([]) // the sequence being assembled
const status = ref<'building' | 'wrong' | 'solved'>('building')
const wrongAttempts = ref(0)
const stars = ref(0)

function reshuffle() {
  const correct = props.level.steps.map((s) => s.id).join(',')
  let s = shuffle(props.level.steps)
  let guard = 0
  while (s.map((x) => x.id).join(',') === correct && guard++ < 6) s = shuffle(props.level.steps)
  pool.value = s
  built.value = []
  status.value = 'building'
}
// Shuffle on the client only (avoids revealing the answer & SSR mismatch).
onMounted(reshuffle)

function tapPool(step: OrderStep) {
  if (status.value === 'solved') return
  play('pop')
  speak(step.label, 'id-ID')
  built.value.push(step)
  pool.value = pool.value.filter((s) => s.id !== step.id)
  status.value = 'building'
  if (built.value.length === total.value) check()
}

function tapBuilt(i: number) {
  if (status.value === 'solved') return
  const [step] = built.value.splice(i, 1)
  if (step) pool.value.push(step)
  status.value = 'building'
}

function check() {
  const correct = built.value.every((s, i) => s.id === props.level.steps[i].id)
  if (correct) {
    stars.value = wrongAttempts.value === 0 ? 3 : wrongAttempts.value === 1 ? 2 : 1
    status.value = 'solved'
    codingService.saveStars(props.level.id, stars.value)
    play('win')
    celebrate()
  } else {
    wrongAttempts.value++
    status.value = 'wrong'
    play('wrong')
    window.setTimeout(() => {
      if (status.value === 'wrong') reshuffle()
    }, 900)
  }
}
</script>

<template>
  <div class="order">
    <div class="order__goal">
      <span class="order__goal-emoji" aria-hidden="true">{{ level.goalEmoji }}</span>
      <div>
        <p class="order__goal-eyebrow">Susun langkahnya</p>
        <h2 class="order__goal-title">{{ level.goal }}</h2>
      </div>
    </div>

    <p v-if="level.hint && status !== 'solved'" class="order__hint">💡 {{ level.hint }}</p>
    <p v-if="status === 'wrong'" class="order__wrong">Belum urut. Coba lagi ya! 😊</p>

    <!-- Assembled sequence (numbered slots) -->
    <ol class="order__built" :class="{ 'order__built--wrong': status === 'wrong' }">
      <li v-for="i in total" :key="i" class="order__slot">
        <span class="order__num">{{ i }}</span>
        <button
          v-if="built[i - 1]"
          class="order__card order__card--placed"
          type="button"
          :disabled="status === 'solved'"
          @click="tapBuilt(i - 1)"
        >
          <span class="order__card-icon" aria-hidden="true">{{ built[i - 1].icon }}</span>
          <span class="order__card-label">{{ built[i - 1].label }}</span>
        </button>
        <span v-else class="order__empty" aria-hidden="true">⬚</span>
      </li>
    </ol>

    <!-- Pool of scrambled cards -->
    <div v-if="status !== 'solved'" class="order__pool">
      <button
        v-for="step in pool"
        :key="step.id"
        class="order__card"
        type="button"
        @click="tapPool(step)"
      >
        <span class="order__card-icon" aria-hidden="true">{{ step.icon }}</span>
        <span class="order__card-label">{{ step.label }}</span>
      </button>
    </div>

    <!-- Result -->
    <div v-else class="order__result">
      <span class="order__result-emoji" aria-hidden="true">🎉</span>
      <p class="order__result-title">Urutan Benar!</p>
      <BaseStarRating :value="stars" size="lg" />
      <BaseReflectPrompt question="Ceritakan: kenapa langkah itu harus urut seperti tadi?" />
      <div class="order__actions">
        <NuxtLink to="/coding" class="order__link">🗺 Peta</NuxtLink>
        <NuxtLink v-if="nextId" :to="`/coding/${nextId}`" class="order__link order__link--primary">
          Lanjut →
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.order {
  @include flex(column, flex-start, stretch, spacing('md'));

  &__goal {
    @include flex(row, flex-start, center, spacing('md'));
    @include glass($glass-bg-strong);
    padding: spacing('md') spacing('lg');
    border-radius: $radius-xl;
    box-shadow: $shadow-sm;
    border-left: 6px solid $color-primary;
  }
  &__goal-emoji {
    font-size: font-size('xl');
  }
  &__goal-eyebrow {
    margin: 0;
    font-size: font-size('xs');
    font-weight: $font-weight-bold;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: $color-text-muted;
  }
  &__goal-title {
    margin: 0;
    font-size: font-size('lg');
  }

  &__hint {
    text-align: center;
    margin: 0;
    color: $color-ink-soft;
    font-size: font-size('sm');
  }
  &__wrong {
    text-align: center;
    margin: 0;
    font-weight: $font-weight-bold;
    color: $color-error;
  }

  &__built {
    @include flex(column, flex-start, stretch, spacing('sm'));
    list-style: none;
    margin: 0;
    padding: spacing('sm');
    background: rgba($color-primary, 0.05);
    border: 2px dashed rgba($color-primary, 0.3);
    border-radius: $radius-lg;

    &--wrong {
      animation: shake 0.4s ease;
      border-color: $color-error;
    }
  }

  &__slot {
    @include flex(row, flex-start, center, spacing('sm'));
  }

  &__num {
    @include flex-center;
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    font-family: $font-family-display;
    font-weight: $font-weight-bold;
    color: $color-white;
    background: $color-primary;
    border-radius: $radius-pill;
  }

  &__empty {
    flex: 1;
    padding: spacing('sm');
    color: rgba($color-primary, 0.35);
    font-size: font-size('lg');
  }

  &__pool {
    @include flex(row, center, stretch, spacing('sm'));
    flex-wrap: wrap;
  }

  &__card {
    @include tappable;
    @include flex(row, flex-start, center, spacing('sm'));
    padding: spacing('sm') spacing('md');
    background: $color-white;
    border: 2px solid $color-border;
    border-radius: $radius-md;
    box-shadow: $shadow-sm;

    &--placed {
      flex: 1;
      background: rgba($color-primary, 0.08);
      border-color: rgba($color-primary, 0.3);
    }
  }
  &__card-icon {
    font-size: font-size('lg');
  }
  &__card-label {
    font-weight: $font-weight-bold;
    color: $color-ink;
    font-size: font-size('sm');
  }

  &__result {
    @include glass($glass-bg-strong);
    @include flex(column, center, center, spacing('sm'));
    padding: spacing('lg');
    border-radius: $radius-xl;
    box-shadow: $shadow-md;
    text-align: center;
  }
  &__result-emoji {
    font-size: font-size('xxl');
  }
  &__result-title {
    margin: 0;
    font-family: $font-family-display;
    font-weight: $font-weight-bold;
    font-size: font-size('lg');
    @include gradient-text($gradient-primary);
  }
  &__actions {
    @include flex(row, center, center, spacing('md'));
    flex-wrap: wrap;
  }
  &__link {
    font-weight: $font-weight-bold;
    color: $color-primary-dark;
    padding: spacing('sm') spacing('lg');
    border-radius: $radius-pill;
    background: rgba($color-primary, 0.1);

    &--primary {
      color: $color-white;
      background: $color-primary;
      box-shadow: $shadow-sm;
    }
  }
}
</style>
