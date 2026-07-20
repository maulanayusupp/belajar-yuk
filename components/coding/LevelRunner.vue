<script setup lang="ts">
import type { CodingCommand, CodingLevel } from '~/types'
import { runProgram, starsForSolution, toSteps, type RobotState } from '~/utils/codeRunner'
import { codingService } from '~/services/codingService'

// The playable coding puzzle: build a program from command blocks, run it,
// and watch the robot execute. Solving saves stars (codingService).
const props = defineProps<{ level: CodingLevel; nextId: string | null }>()

const { play } = useAudio()
const { celebrate } = useConfetti()

const BLOCK: Record<CodingCommand, { icon: string; label: string }> = {
  forward: { icon: '⬆️', label: 'Maju' },
  left: { icon: '↺', label: 'Kiri' },
  right: { icon: '↻', label: 'Kanan' },
}

const program = ref<CodingCommand[]>([])
const robot = ref<RobotState>({ ...props.level.start })
const collected = ref<string[]>([])
// mode: 'edit' → building the program; 'step' → walking one command at a time;
// 'auto' → playing the whole program back automatically.
const mode = ref<'edit' | 'step' | 'auto'>('edit')
const solved = ref(false)
const earnedStars = ref(0)
const failMsg = ref('')

// Pre-computed run of the current program (filled the moment we start playing).
let frames: ReturnType<typeof runProgram>['frames'] = []
let runSuccess = false
const stepIdx = ref(0) // which frame the robot is showing (0 = start)

// Highlight the command chip that produced the current frame. For a flat
// sequence each command yields exactly one frame, so chip = frame - 1.
const execIndex = computed(() =>
  mode.value !== 'edit' && stepIdx.value >= 1 && stepIdx.value <= program.value.length
    ? stepIdx.value - 1
    : -1,
)
const busy = computed(() => mode.value === 'auto')
const stepDone = computed(() => mode.value === 'step' && stepIdx.value >= frames.length - 1)

let cancelled = false
onBeforeUnmount(() => (cancelled = true))

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
  program.value.push(cmd)
  play('click')
  resetRobot()
}

function removeAt(i: number) {
  if (mode.value !== 'edit' || solved.value) return
  program.value.splice(i, 1)
  resetRobot()
}

function clearProgram() {
  if (mode.value === 'auto') return
  program.value = []
  solved.value = false
  resetRun()
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Compute the frames for the current program once, lazily.
function ensureFrames() {
  if (frames.length) return
  const result = runProgram(props.level, toSteps(program.value))
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
    earnedStars.value = starsForSolution(program.value.length, props.level.optimalBlocks)
    codingService.saveStars(props.level.id, earnedStars.value)
    solved.value = true
    play('win')
    celebrate()
  } else {
    play('wrong')
    failMsg.value = 'Robot belum sampai ke bintang. Coba susun ulang!'
  }
}

// Advance the robot by a single command (the "Langkah" button).
function step() {
  if (solved.value || program.value.length === 0 || mode.value === 'auto') return
  if (mode.value === 'edit') {
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

// Play the remaining commands automatically (the "Jalankan" button).
async function run() {
  if (solved.value || program.value.length === 0 || mode.value === 'auto') return
  if (mode.value === 'edit') {
    ensureFrames()
    failMsg.value = ''
  }
  mode.value = 'auto'

  for (let i = stepIdx.value + 1; i < frames.length; i++) {
    await delay(340)
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
  <div class="runner">
    <CodingPuzzleGrid :level="level" :robot="robot" :collected="collected" />

    <p v-if="level.hint && !solved" class="runner__hint">💡 {{ level.hint }}</p>
    <p v-if="failMsg" class="runner__fail">{{ failMsg }}</p>

    <!-- Program the child is building -->
    <div class="runner__program" :class="{ 'runner__program--empty': !program.length }">
      <template v-if="program.length">
        <button
          v-for="(cmd, i) in program"
          :key="i"
          class="runner__chip"
          :class="{ 'runner__chip--exec': i === execIndex }"
          type="button"
          :disabled="mode !== 'edit' || solved"
          :aria-label="`Hapus ${BLOCK[cmd].label}`"
          @click="removeAt(i)"
        >
          <span aria-hidden="true">{{ BLOCK[cmd].icon }}</span>
        </button>
      </template>
      <span v-else class="runner__placeholder"
        >Ketuk perintah di bawah untuk menyusun program…</span
      >
    </div>

    <!-- Command palette -->
    <div class="runner__palette">
      <button
        v-for="cmd in level.allowed"
        :key="cmd"
        class="runner__cmd"
        type="button"
        :disabled="mode !== 'edit' || solved"
        @click="addCommand(cmd)"
      >
        <span class="runner__cmd-icon" aria-hidden="true">{{ BLOCK[cmd].icon }}</span>
        <span class="runner__cmd-label">{{ BLOCK[cmd].label }}</span>
      </button>
    </div>

    <!-- Controls -->
    <div v-if="!solved" class="runner__controls">
      <BaseButton
        v-if="mode === 'edit'"
        variant="ghost"
        :disabled="busy || !program.length"
        @click="clearProgram"
      >
        🗑 Hapus
      </BaseButton>
      <BaseButton v-else variant="ghost" :disabled="busy" @click="resetRun"> ↺ Ulang </BaseButton>
      <BaseButton variant="secondary" :disabled="busy || stepDone || !program.length" @click="step">
        👣 Langkah
      </BaseButton>
      <BaseButton variant="primary" size="lg" :disabled="busy || !program.length" @click="run">
        ▶ Jalankan
      </BaseButton>
    </div>

    <!-- Result -->
    <div v-else class="runner__result">
      <span class="runner__result-emoji" aria-hidden="true">🎉</span>
      <p class="runner__result-title">Berhasil!</p>
      <BaseStarRating :value="earnedStars" size="lg" />
      <p class="runner__result-blocks">Kamu memakai {{ program.length }} perintah.</p>
      <BaseReflectPrompt question="Ceritakan: bagaimana caramu memandu robot ke bintang?" />
      <div class="runner__result-actions">
        <NuxtLink to="/coding" class="runner__link">🗺 Peta</NuxtLink>
        <NuxtLink
          v-if="nextId"
          :to="`/coding/${nextId}`"
          class="runner__link runner__link--primary"
        >
          Lanjut →
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.runner {
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
    min-height: 60px;
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
    transition:
      transform $transition-fast,
      border-color $transition-fast;

    // The command currently being executed (step-through highlight).
    &--exec {
      border-color: $color-primary;
      transform: translateY(-4px) scale(1.12);
      box-shadow: 0 6px 16px rgba($color-primary, 0.4);
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
