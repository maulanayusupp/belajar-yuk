<script setup lang="ts">
import type { CodingCommand, CodingPredictLevel } from '~/types'
import { runProgram, toSteps, type RobotState } from '~/utils/codeRunner'
import { shuffle } from '~/utils/array'
import { codingService } from '~/services/codingService'

// "Predict the output" game — a DIFFERENT format: the child READS a fixed
// program and predicts which cell the robot ends on (code tracing), then runs
// it to check. No building.
const props = defineProps<{ level: CodingPredictLevel; nextId: string | null }>()

const { play } = useAudio()
const { celebrate } = useConfetti()

const BLOCK: Record<CodingCommand, string> = { forward: '⬆️', left: '↺', right: '↻' }

const frames = computed(() => runProgram(props.level, toSteps(props.level.program)).frames)
const actualEnd = computed(() => {
  const f = frames.value.at(-1)!
  return `${f.x},${f.y}`
})

interface Marker {
  pos: string
  label: string
  state?: 'default' | 'chosen' | 'correct' | 'wrong'
}
const markers = ref<Marker[]>([])
const chosen = ref<string | null>(null)
const robot = ref<RobotState>({ ...props.level.start })
const phase = ref<'guess' | 'running' | 'solved'>('guess')
const failMsg = ref('')
const attempts = ref(0)
const stars = ref(0)

let cancelled = false
onBeforeUnmount(() => (cancelled = true))

// Build the candidate cells on the client (avoids revealing the answer in SSR).
function buildMarkers() {
  const walkable: string[] = []
  props.level.grid.forEach((row, y) =>
    row.split('').forEach((ch, x) => {
      if (ch === '.' || ch === 'G' || ch === 'C') walkable.push(`${x},${y}`)
    }),
  )
  const distractors = shuffle(walkable.filter((p) => p !== actualEnd.value)).slice(0, 3)
  markers.value = shuffle([actualEnd.value, ...distractors]).map((pos, i) => ({
    pos,
    label: String.fromCharCode(65 + i), // A, B, C, D
    state: 'default',
  }))
}
onMounted(buildMarkers)

function pick(pos: string) {
  if (phase.value !== 'guess') return
  chosen.value = pos
  play('pop')
  markers.value = markers.value.map((m) => ({ ...m, state: m.pos === pos ? 'chosen' : 'default' }))
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function run() {
  if (phase.value !== 'guess' || !chosen.value) return
  phase.value = 'running'
  failMsg.value = ''
  const fr = frames.value
  for (let i = 1; i < fr.length; i++) {
    await delay(320)
    if (cancelled) return
    robot.value = { x: fr[i].x, y: fr[i].y, facing: fr[i].facing }
    play('pop')
  }
  await delay(300)
  if (cancelled) return

  const correct = chosen.value === actualEnd.value
  markers.value = markers.value.map((m) => ({
    ...m,
    state: m.pos === actualEnd.value ? 'correct' : m.pos === chosen.value ? 'wrong' : 'default',
  }))

  if (correct) {
    stars.value = attempts.value === 0 ? 3 : attempts.value === 1 ? 2 : 1
    codingService.saveStars(props.level.id, stars.value)
    phase.value = 'solved'
    play('win')
    celebrate()
  } else {
    attempts.value++
    play('wrong')
    failMsg.value = 'Belum tepat — robot berhenti di kotak hijau. Coba lagi!'
    await delay(1500)
    if (cancelled) return
    robot.value = { ...props.level.start }
    chosen.value = null
    markers.value = markers.value.map((m) => ({ ...m, state: 'default' }))
    phase.value = 'guess'
  }
}
</script>

<template>
  <div class="predict">
    <p class="predict__q">Baca programnya, lalu tebak di kotak mana robot berhenti.</p>

    <CodingPuzzleGrid
      :level="level"
      :robot="robot"
      :markers="markers"
      :selectable="phase === 'guess'"
      @pick="pick"
    />

    <!-- The program to trace (read-only) -->
    <div class="predict__program">
      <span class="predict__program-label">Program:</span>
      <span v-for="(cmd, i) in level.program" :key="i" class="predict__block" aria-hidden="true">{{
        BLOCK[cmd]
      }}</span>
    </div>

    <p v-if="level.hint && phase === 'guess' && !failMsg" class="predict__hint">
      💡 {{ level.hint }}
    </p>
    <p v-if="failMsg" class="predict__fail">{{ failMsg }}</p>

    <div v-if="phase !== 'solved'" class="predict__actions">
      <BaseButton
        variant="primary"
        size="lg"
        :disabled="!chosen || phase === 'running'"
        @click="run"
      >
        ▶ Jalankan & Periksa
      </BaseButton>
    </div>

    <div v-else class="predict__result">
      <span class="predict__result-emoji" aria-hidden="true">🎉</span>
      <p class="predict__result-title">Tebakanmu Benar!</p>
      <BaseStarRating :value="stars" size="lg" />
      <BaseReflectPrompt question="Ceritakan: bagaimana kamu tahu robot berhenti di situ?" />
      <div class="predict__links">
        <NuxtLink to="/coding" class="predict__link">🗺 Peta</NuxtLink>
        <NuxtLink
          v-if="nextId"
          :to="`/coding/${nextId}`"
          class="predict__link predict__link--primary"
        >
          Lanjut →
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.predict {
  @include flex(column, flex-start, stretch, spacing('md'));

  &__q {
    text-align: center;
    margin: 0;
    font-weight: $font-weight-bold;
    color: $color-ink;
  }

  &__program {
    @include flex(row, center, center, spacing('xs'));
    flex-wrap: wrap;
    padding: spacing('sm');
    background: rgba($color-primary, 0.06);
    border-radius: $radius-lg;
  }
  &__program-label {
    font-weight: $font-weight-bold;
    color: $color-ink-soft;
    font-size: font-size('sm');
    margin-right: spacing('xs');
  }
  &__block {
    @include flex-center;
    width: 40px;
    height: 40px;
    font-size: font-size('md');
    background: $color-white;
    border: 2px solid $color-border;
    border-radius: $radius-md;
    box-shadow: $shadow-sm;
  }

  &__hint {
    text-align: center;
    margin: 0;
    color: $color-ink-soft;
    font-size: font-size('sm');
  }
  &__fail {
    text-align: center;
    margin: 0;
    font-weight: $font-weight-bold;
    color: $color-error;
  }

  &__actions {
    @include flex(row, center, center, spacing('md'));
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
  &__links {
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
