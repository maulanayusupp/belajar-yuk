<script setup lang="ts">
import type { CodingCommand, CodingLevel, CodingStep } from '~/types'
import {
  runProgram,
  starsForSolution,
  toSteps,
  countBlocks,
  type RobotState,
} from '~/utils/codeRunner'
import { codingService } from '~/services/codingService'

// Runner for the FUNCTIONS world (Phase 2). The child builds a reusable routine
// ("Fungsi A") and chooses how many times to call it. The program is fixed as
// "Ulangi N × Panggil A" so the lesson is decomposition, not free-form building.
const props = defineProps<{ level: CodingLevel; nextId: string | null }>()

const { play } = useAudio()
const { celebrate } = useConfetti()

const BLOCK: Record<CodingCommand, { icon: string; label: string }> = {
  forward: { icon: '⬆️', label: 'Maju' },
  left: { icon: '↺', label: 'Kiri' },
  right: { icon: '↻', label: 'Kanan' },
}

const TIMES_MIN = 1
const TIMES_MAX = 8

const funcA = ref<CodingCommand[]>([])
const times = ref(2)
const robot = ref<RobotState>({ ...props.level.start })
const collected = ref<string[]>([])
const running = ref(false)
const solved = ref(false)
const earnedStars = ref(0)
const failMsg = ref('')

// Total blocks = the fixed main program (Ulangi + Panggil A) + the A body.
const blockCount = computed(() => 2 + funcA.value.length)

let cancelled = false
onBeforeUnmount(() => (cancelled = true))

function resetRobot() {
  robot.value = { ...props.level.start }
  collected.value = []
  failMsg.value = ''
}

function addToFunc(cmd: CodingCommand) {
  if (running.value || solved.value) return
  funcA.value.push(cmd)
  play('click')
  resetRobot()
}

function removeFromFunc(i: number) {
  if (running.value || solved.value) return
  funcA.value.splice(i, 1)
  resetRobot()
}

function changeTimes(delta: number) {
  if (running.value || solved.value) return
  times.value = Math.min(TIMES_MAX, Math.max(TIMES_MIN, times.value + delta))
  resetRobot()
}

function clearFunc() {
  if (running.value) return
  funcA.value = []
  solved.value = false
  resetRobot()
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function run() {
  if (running.value || solved.value || !funcA.value.length) return
  running.value = true
  failMsg.value = ''
  const program: CodingStep[] = [
    { type: 'repeat', times: times.value, body: [{ type: 'call', name: 'A' }] },
  ]
  const funcs = { A: toSteps(funcA.value) }
  const { frames, success } = runProgram(props.level, program, funcs)

  for (let i = 1; i < frames.length; i++) {
    await delay(300)
    if (cancelled) return
    const f = frames[i]
    robot.value = { x: f.x, y: f.y, facing: f.facing }
    collected.value = f.collected
    play('pop')
  }
  await delay(300)
  if (cancelled) return

  if (success) {
    earnedStars.value = starsForSolution(
      countBlocks(program) + funcA.value.length,
      props.level.optimalBlocks,
    )
    codingService.saveStars(props.level.id, earnedStars.value)
    solved.value = true
    play('win')
    celebrate()
  } else {
    play('wrong')
    failMsg.value = 'Robot belum sampai. Perbaiki Fungsi A atau jumlah ulangannya!'
    await delay(600)
    if (!cancelled) resetRobot()
  }
  running.value = false
}
</script>

<template>
  <div class="func">
    <CodingPuzzleGrid :level="level" :robot="robot" :collected="collected" />

    <p v-if="level.hint && !solved" class="func__hint">💡 {{ level.hint }}</p>
    <p v-if="failMsg" class="func__fail">{{ failMsg }}</p>

    <!-- Function A definition -->
    <div class="func__def">
      <span class="func__def-label" aria-hidden="true">🪄 Fungsi A</span>
      <div class="func__def-body" :class="{ 'func__def-body--empty': !funcA.length }">
        <button
          v-for="(cmd, i) in funcA"
          :key="i"
          class="func__chip"
          type="button"
          :disabled="running || solved"
          :aria-label="`Hapus ${BLOCK[cmd].label}`"
          @click="removeFromFunc(i)"
        >
          <span aria-hidden="true">{{ BLOCK[cmd].icon }}</span>
        </button>
        <span v-if="!funcA.length" class="func__placeholder">isi langkah Fungsi A…</span>
      </div>
    </div>

    <!-- Command palette (adds to Fungsi A) -->
    <div class="func__palette">
      <button
        v-for="cmd in level.allowed"
        :key="cmd"
        class="func__cmd"
        type="button"
        :disabled="running || solved"
        @click="addToFunc(cmd)"
      >
        <span class="func__cmd-icon" aria-hidden="true">{{ BLOCK[cmd].icon }}</span>
        <span class="func__cmd-label">{{ BLOCK[cmd].label }}</span>
      </button>
    </div>

    <!-- Fixed main program: Ulangi N × Panggil A -->
    <div class="func__main">
      <span class="func__main-label">Program utama</span>
      <div class="func__main-row">
        <span class="func__rep" aria-hidden="true">🔁 Ulangi</span>
        <div class="func__times">
          <button
            class="func__step"
            type="button"
            :disabled="running || solved || times <= TIMES_MIN"
            aria-label="Kurangi ulangan"
            @click="changeTimes(-1)"
          >
            −
          </button>
          <span class="func__num">×{{ times }}</span>
          <button
            class="func__step"
            type="button"
            :disabled="running || solved || times >= TIMES_MAX"
            aria-label="Tambah ulangan"
            @click="changeTimes(1)"
          >
            +
          </button>
        </div>
        <span class="func__call">Panggil A</span>
      </div>
    </div>

    <!-- Controls -->
    <div v-if="!solved" class="func__controls">
      <span class="func__count">{{ blockCount }} blok</span>
      <div class="func__buttons">
        <BaseButton variant="ghost" :disabled="running || !funcA.length" @click="clearFunc">
          🗑 Hapus
        </BaseButton>
        <BaseButton variant="primary" size="lg" :disabled="running || !funcA.length" @click="run">
          ▶ Jalankan
        </BaseButton>
      </div>
    </div>

    <!-- Result -->
    <div v-else class="func__result">
      <span class="func__result-emoji" aria-hidden="true">🎉</span>
      <p class="func__result-title">Berhasil!</p>
      <BaseStarRating :value="earnedStars" size="lg" />
      <p class="func__result-blocks">Kamu memakai {{ blockCount }} blok.</p>
      <BaseReflectPrompt
        question="Ceritakan: kenapa memakai Fungsi A membuat programmu lebih pendek?"
      />
      <div class="func__result-actions">
        <NuxtLink to="/coding" class="func__link">🗺 Peta</NuxtLink>
        <NuxtLink v-if="nextId" :to="`/coding/${nextId}`" class="func__link func__link--primary">
          Lanjut →
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.func {
  @include flex(column, flex-start, stretch, spacing('md'));

  &__hint {
    text-align: center;
    color: $color-ink-soft;
    margin: 0;
    font-size: font-size('sm');
  }

  &__fail {
    text-align: center;
    margin: 0;
    font-weight: $font-weight-bold;
    color: $color-error;
  }

  &__def {
    @include flex(column, flex-start, stretch, spacing('xs'));
    padding: spacing('sm');
    background: rgba($color-secondary, 0.12);
    border: 2px solid rgba($color-secondary, 0.5);
    border-radius: $radius-lg;
  }

  &__def-label {
    font-weight: $font-weight-bold;
    color: $color-ink;
  }

  &__def-body {
    @include flex(row, flex-start, center, spacing('xs'));
    flex-wrap: wrap;
    min-height: 52px;

    &--empty {
      justify-content: center;
    }
  }

  &__placeholder {
    color: $color-text-muted;
    font-size: font-size('sm');
  }

  &__chip {
    @include tappable;
    @include flex-center;
    width: 44px;
    height: 44px;
    font-size: font-size('md');
    background: $color-white;
    border: 2px solid $color-border;
    border-radius: $radius-md;
    box-shadow: $shadow-sm;
  }

  &__palette {
    @include flex(row, center, stretch, spacing('sm'));
    flex-wrap: wrap;
  }

  &__cmd {
    @include tappable;
    @include flex(column, center, center, 2px);
    min-width: 84px;
    padding: spacing('sm') spacing('md');
    background: $gradient-primary;
    color: $color-white;
    border-radius: $radius-lg;
    box-shadow: $shadow-sm;

    &:disabled {
      opacity: 0.5;
    }
  }

  &__cmd-icon {
    font-size: font-size('lg');
  }
  &__cmd-label {
    font-weight: $font-weight-bold;
    font-size: font-size('sm');
  }

  &__main {
    @include flex(column, flex-start, stretch, spacing('xs'));
    padding: spacing('sm') spacing('md');
    background: rgba($color-primary, 0.06);
    border: 2px dashed rgba($color-primary, 0.3);
    border-radius: $radius-lg;
  }

  &__main-label {
    font-size: font-size('xs');
    font-weight: $font-weight-bold;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: $color-text-muted;
  }

  &__main-row {
    @include flex(row, flex-start, center, spacing('sm'));
    flex-wrap: wrap;
  }

  &__rep {
    font-weight: $font-weight-bold;
    color: $color-ink;
  }

  &__times {
    @include flex(row, center, center, spacing('xs'));
  }

  &__step {
    @include tappable;
    @include flex-center;
    width: 30px;
    height: 30px;
    font-weight: $font-weight-bold;
    font-size: font-size('md');
    background: $color-white;
    border: 2px solid $color-border;
    border-radius: $radius-sm;

    &:disabled {
      opacity: 0.4;
    }
  }

  &__num {
    font-weight: $font-weight-bold;
    color: $color-ink;
    min-width: 34px;
    text-align: center;
  }

  &__call {
    @include flex-center;
    padding: spacing('xs') spacing('md');
    background: rgba($color-secondary, 0.25);
    border-radius: $radius-pill;
    font-weight: $font-weight-bold;
    color: $color-ink;
  }

  &__controls {
    @include flex(row, space-between, center, spacing('md'));
    flex-wrap: wrap;
  }

  &__count {
    font-weight: $font-weight-bold;
    color: $color-primary-dark;
    background: rgba($color-primary, 0.1);
    padding: spacing('xs') spacing('md');
    border-radius: $radius-pill;
  }

  &__buttons {
    @include flex(row, flex-end, center, spacing('md'));
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
  &__result-blocks {
    margin: 0;
    color: $color-ink-soft;
    font-size: font-size('sm');
  }
  &__result-actions {
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
