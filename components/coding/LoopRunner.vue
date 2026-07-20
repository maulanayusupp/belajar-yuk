<script setup lang="ts">
import type { CodingCommand, CodingLevel, CodingStep } from '~/types'
import { runProgram, starsForSolution, countBlocks, type RobotState } from '~/utils/codeRunner'
import { codingService } from '~/services/codingService'

// Custom runner for the LOOPS world. Unlike the sequencing runner, the program
// is a tree: primitives plus a "Ulangi" (repeat) block with its own body.
// Insertion-mode UI: after adding a loop, new commands go INSIDE it until you
// tap "Tutup". No nested loops (kept simple & clear for kids).
const props = defineProps<{ level: CodingLevel; nextId: string | null }>()

const { play } = useAudio()
const { celebrate } = useConfetti()

const BLOCK: Record<CodingCommand, { icon: string; label: string }> = {
  forward: { icon: '⬆️', label: 'Maju' },
  left: { icon: '↺', label: 'Kiri' },
  right: { icon: '↻', label: 'Kanan' },
}

const TIMES_MIN = 2
const TIMES_MAX = 8

const program = ref<CodingStep[]>([])
const openLoop = ref<number | null>(null) // index of the repeat block accepting commands
const robot = ref<RobotState>({ ...props.level.start })
const collected = ref<string[]>([])
// mode: 'edit' → building; 'step' → one command at a time; 'auto' → full playback.
const mode = ref<'edit' | 'step' | 'auto'>('edit')
const solved = ref(false)
const earnedStars = ref(0)
const failMsg = ref('')

// Expanded run of the current (tree) program, filled the moment we start playing.
let frames: ReturnType<typeof runProgram>['frames'] = []
let runSuccess = false
const stepIdx = ref(0)

const busy = computed(() => mode.value === 'auto')
const stepDone = computed(() => mode.value === 'step' && stepIdx.value >= frames.length - 1)

let cancelled = false
onBeforeUnmount(() => (cancelled = true))

const blockCount = computed(() => countBlocks(program.value))

function resetRobot() {
  robot.value = { ...props.level.start }
  collected.value = []
  failMsg.value = ''
}

// Return to editing: forget the computed run and reset the robot.
function resetRun() {
  mode.value = 'edit'
  frames = []
  stepIdx.value = 0
  resetRobot()
}

function addCommand(cmd: CodingCommand) {
  if (mode.value !== 'edit' || solved.value) return
  play('click')
  const step: CodingStep = { type: 'cmd', cmd }
  const target = openLoop.value
  if (target !== null) {
    const loop = program.value[target]
    if (loop?.type === 'repeat') loop.body.push({ type: 'cmd', cmd })
  } else {
    program.value.push(step)
  }
  resetRobot()
}

function addLoop() {
  if (mode.value !== 'edit' || solved.value || openLoop.value !== null) return
  play('click')
  program.value.push({ type: 'repeat', times: 2, body: [] })
  openLoop.value = program.value.length - 1
  resetRobot()
}

function closeLoop() {
  openLoop.value = null
}

function changeTimes(i: number, delta: number) {
  if (mode.value !== 'edit' || solved.value) return
  const loop = program.value[i]
  if (loop?.type === 'repeat') {
    loop.times = Math.min(TIMES_MAX, Math.max(TIMES_MIN, loop.times + delta))
    resetRobot()
  }
}

function removeStep(i: number) {
  if (mode.value !== 'edit' || solved.value) return
  program.value.splice(i, 1)
  if (openLoop.value === i) openLoop.value = null
  else if (openLoop.value !== null && i < openLoop.value) openLoop.value--
  resetRobot()
}

function removeBodyStep(i: number, j: number) {
  if (mode.value !== 'edit' || solved.value) return
  const loop = program.value[i]
  if (loop?.type === 'repeat') loop.body.splice(j, 1)
  resetRobot()
}

function clearProgram() {
  if (mode.value === 'auto') return
  program.value = []
  openLoop.value = null
  solved.value = false
  resetRun()
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Compute the expanded frames for the current program once, lazily.
function ensureFrames() {
  if (frames.length) return
  const result = runProgram(props.level, program.value)
  frames = result.frames
  runSuccess = result.success
}

function applyFrame(i: number) {
  const f = frames[i]
  robot.value = { x: f.x, y: f.y, facing: f.facing }
  collected.value = f.collected
}

function finish() {
  if (runSuccess) {
    earnedStars.value = starsForSolution(blockCount.value, props.level.optimalBlocks)
    codingService.saveStars(props.level.id, earnedStars.value)
    solved.value = true
    play('win')
    celebrate()
  } else {
    play('wrong')
    failMsg.value = 'Robot belum sampai ke bintang. Coba susun ulang!'
  }
}

// Advance the robot by a single (expanded) command — the "Langkah" button.
function stepOnce() {
  if (solved.value || !program.value.length || mode.value === 'auto') return
  if (mode.value === 'edit') {
    openLoop.value = null
    ensureFrames()
    mode.value = 'step'
    failMsg.value = ''
  }
  if (stepIdx.value < frames.length - 1) {
    stepIdx.value++
    applyFrame(stepIdx.value)
    play('pop')
  }
  if (stepIdx.value >= frames.length - 1) finish()
}

// Play the remaining commands automatically — the "Jalankan" button.
async function run() {
  if (solved.value || !program.value.length || mode.value === 'auto') return
  if (mode.value === 'edit') {
    openLoop.value = null
    ensureFrames()
    failMsg.value = ''
  }
  mode.value = 'auto'

  for (let i = stepIdx.value + 1; i < frames.length; i++) {
    await delay(320)
    if (cancelled) return
    stepIdx.value = i
    applyFrame(i)
    play('pop')
  }
  await delay(320)
  if (cancelled) return

  if (runSuccess) {
    finish()
  } else {
    finish()
    await delay(600)
    if (!cancelled) resetRun()
  }
}
</script>

<template>
  <div class="loop">
    <CodingPuzzleGrid :level="level" :robot="robot" :collected="collected" />

    <p v-if="level.hint && !solved" class="loop__hint">💡 {{ level.hint }}</p>
    <p v-if="failMsg" class="loop__fail">{{ failMsg }}</p>

    <!-- Program (tree) -->
    <div class="loop__program" :class="{ 'loop__program--empty': !program.length }">
      <template v-for="(step, i) in program" :key="i">
        <!-- Primitive command chip -->
        <button
          v-if="step.type === 'cmd'"
          class="loop__chip"
          type="button"
          :disabled="mode !== 'edit' || solved"
          :aria-label="`Hapus ${BLOCK[step.cmd].label}`"
          @click="removeStep(i)"
        >
          <span aria-hidden="true">{{ BLOCK[step.cmd].icon }}</span>
        </button>

        <!-- Repeat block -->
        <div v-else class="rep" :class="{ 'rep--open': openLoop === i }">
          <div class="rep__head">
            <span class="rep__label" aria-hidden="true">🔁</span>
            <div class="rep__times">
              <button
                class="rep__step"
                type="button"
                :disabled="mode !== 'edit' || solved || step.times <= TIMES_MIN"
                @click="changeTimes(i, -1)"
              >
                −
              </button>
              <span class="rep__num">×{{ step.times }}</span>
              <button
                class="rep__step"
                type="button"
                :disabled="mode !== 'edit' || solved || step.times >= TIMES_MAX"
                @click="changeTimes(i, 1)"
              >
                +
              </button>
            </div>
            <button
              class="rep__del"
              type="button"
              :disabled="mode !== 'edit' || solved"
              aria-label="Hapus blok Ulangi"
              @click="removeStep(i)"
            >
              🗑
            </button>
          </div>

          <div class="rep__body">
            <button
              v-for="(b, j) in step.body"
              :key="j"
              class="loop__chip loop__chip--inner"
              type="button"
              :disabled="mode !== 'edit' || solved"
              :aria-label="`Hapus ${BLOCK[b.cmd].label}`"
              @click="removeBodyStep(i, j)"
            >
              <span aria-hidden="true">{{ BLOCK[b.cmd].icon }}</span>
            </button>
            <span v-if="!step.body.length" class="rep__hint">perintah di sini…</span>
          </div>

          <BaseButton v-if="openLoop === i" variant="ghost" size="sm" @click="closeLoop">
            ✓ Tutup Ulangi
          </BaseButton>
        </div>
      </template>

      <span v-if="!program.length" class="loop__placeholder">
        Susun perintah. Pakai 🔁 Ulangi agar lebih hemat!
      </span>
    </div>

    <!-- Palette -->
    <div class="loop__palette">
      <button
        v-for="cmd in level.allowed"
        :key="cmd"
        class="loop__cmd"
        type="button"
        :disabled="mode !== 'edit' || solved"
        @click="addCommand(cmd)"
      >
        <span class="loop__cmd-icon" aria-hidden="true">{{ BLOCK[cmd].icon }}</span>
        <span class="loop__cmd-label">{{ BLOCK[cmd].label }}</span>
      </button>
      <button
        class="loop__cmd loop__cmd--loop"
        type="button"
        :disabled="mode !== 'edit' || solved || openLoop !== null"
        @click="addLoop"
      >
        <span class="loop__cmd-icon" aria-hidden="true">🔁</span>
        <span class="loop__cmd-label">Ulangi</span>
      </button>
    </div>

    <!-- Controls -->
    <div v-if="!solved" class="loop__controls">
      <span class="loop__count">{{ blockCount }} blok</span>
      <div class="loop__buttons">
        <BaseButton
          v-if="mode === 'edit'"
          variant="ghost"
          :disabled="busy || !program.length"
          @click="clearProgram"
        >
          🗑 Hapus
        </BaseButton>
        <BaseButton v-else variant="ghost" :disabled="busy" @click="resetRun"> ↺ Ulang </BaseButton>
        <BaseButton
          variant="secondary"
          :disabled="busy || stepDone || !program.length"
          @click="stepOnce"
        >
          👣 Langkah
        </BaseButton>
        <BaseButton variant="primary" size="lg" :disabled="busy || !program.length" @click="run">
          ▶ Jalankan
        </BaseButton>
      </div>
    </div>

    <!-- Result -->
    <div v-else class="loop__result">
      <span class="loop__result-emoji" aria-hidden="true">🎉</span>
      <p class="loop__result-title">Berhasil!</p>
      <BaseStarRating :value="earnedStars" size="lg" />
      <p class="loop__result-blocks">Kamu memakai {{ blockCount }} blok.</p>
      <BaseReflectPrompt question="Ceritakan: kenapa memakai blok Ulangi lebih hemat?" />
      <div class="loop__result-actions">
        <NuxtLink to="/coding" class="loop__link">🗺 Peta</NuxtLink>
        <NuxtLink v-if="nextId" :to="`/coding/${nextId}`" class="loop__link loop__link--primary">
          Lanjut →
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.loop {
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

  &__program {
    @include flex(row, flex-start, center, spacing('xs'));
    flex-wrap: wrap;
    min-height: 64px;
    padding: spacing('sm');
    background: rgba($color-primary, 0.05);
    border: 2px dashed rgba($color-primary, 0.3);
    border-radius: $radius-lg;

    &--empty {
      justify-content: center;
    }
  }

  &__placeholder {
    color: $color-text-muted;
    font-size: font-size('sm');
    text-align: center;
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

    &--inner {
      width: 40px;
      height: 40px;
    }
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

    &--loop {
      background: $gradient-warm;
    }

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

// Repeat block
.rep {
  @include flex(column, flex-start, stretch, spacing('xs'));
  padding: spacing('sm');
  background: rgba($color-accent-2, 0.12);
  border: 2px solid rgba($color-accent-2, 0.5);
  border-radius: $radius-md;

  &--open {
    border-color: $color-accent-2;
    border-style: dashed;
  }

  &__head {
    @include flex(row, flex-start, center, spacing('sm'));
  }

  &__label {
    font-size: font-size('md');
  }

  &__times {
    @include flex(row, center, center, spacing('xs'));
  }

  &__step {
    @include tappable;
    @include flex-center;
    width: 28px;
    height: 28px;
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

  &__del {
    @include tappable;
    margin-left: auto;
    font-size: font-size('sm');
    background: transparent;
  }

  &__body {
    @include flex(row, flex-start, center, spacing('xs'));
    flex-wrap: wrap;
    min-height: 44px;
    padding: spacing('xs');
    background: rgba($color-white, 0.6);
    border-radius: $radius-sm;
  }

  &__hint {
    color: $color-text-muted;
    font-size: font-size('xs');
  }
}
</style>
