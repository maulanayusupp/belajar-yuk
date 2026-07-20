<script setup lang="ts">
import type { CodingBugLevel, CodingCommand } from '~/types'
import { runProgram, toSteps, type RobotState } from '~/utils/codeRunner'
import { codingService } from '~/services/codingService'

// Runner for the "Cari Bug" (find the bug) game. The child is shown an
// almost-correct program with exactly ONE wrong command. First they tap the
// command they think is wrong (phase 'find'); once they find it, they pick the
// right replacement (phase 'fix'); the robot then runs to verify. Debugging &
// reading code — a genuinely different format from building a program.
const props = defineProps<{ level: CodingBugLevel; nextId: string | null }>()

const { play } = useAudio()
const { celebrate } = useConfetti()

const BLOCK: Record<CodingCommand, { icon: string; label: string }> = {
  forward: { icon: '⬆️', label: 'Maju' },
  left: { icon: '↺', label: 'Kiri' },
  right: { icon: '↻', label: 'Kanan' },
}
const PALETTE: CodingCommand[] = ['forward', 'left', 'right']

// Mutable copy of the shown program — the child edits the buggy command in place.
const program = ref<CodingCommand[]>([...props.level.buggy])
const robot = ref<RobotState>({ ...props.level.start })
const collected = ref<string[]>([])
// phase: 'find' → tap the wrong command; 'fix' → pick the right replacement;
// 'run' → animating; done handled by `solved`.
const phase = ref<'find' | 'fix' | 'run'>('find')
const bugIndex = ref<number | null>(null)
const solved = ref(false)
const earnedStars = ref(0)
const message = ref('')
let mistakes = 0

let cancelled = false
onBeforeUnmount(() => (cancelled = true))

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function resetRobot() {
  robot.value = { ...props.level.start }
  collected.value = []
}

// Phase 'find': the child taps the command they think is the bug.
function tapCommand(i: number) {
  if (phase.value !== 'find' || solved.value) return
  if (i === props.level.fix.index) {
    play('correct')
    bugIndex.value = i
    phase.value = 'fix'
    message.value = 'Bagus! Sekarang pilih perintah yang benar.'
  } else {
    play('wrong')
    mistakes++
    message.value = 'Bukan itu perintah yang salah. Coba lagi!'
  }
}

// Phase 'fix': the child picks the replacement command, then we run to verify.
async function pickFix(cmd: CodingCommand) {
  if (phase.value !== 'fix' || bugIndex.value === null || solved.value) return
  program.value[bugIndex.value] = cmd
  play('click')

  phase.value = 'run'
  message.value = ''
  const { frames, success } = runProgram(props.level, toSteps(program.value))
  for (let i = 1; i < frames.length; i++) {
    await delay(320)
    if (cancelled) return
    const f = frames[i]
    robot.value = { x: f.x, y: f.y, facing: f.facing }
    collected.value = f.collected
    play('pop')
  }
  await delay(320)
  if (cancelled) return

  if (success) {
    earnedStars.value = mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1
    codingService.saveStars(props.level.id, earnedStars.value)
    solved.value = true
    play('win')
    celebrate()
  } else {
    play('wrong')
    mistakes++
    message.value = 'Robot masih tersesat. Coba perintah pengganti yang lain.'
    await delay(600)
    if (cancelled) return
    resetRobot()
    phase.value = 'fix'
  }
}
</script>

<template>
  <div class="bug">
    <CodingPuzzleGrid :level="level" :robot="robot" :collected="collected" />

    <p class="bug__task">
      <span aria-hidden="true">🐞</span>
      <template v-if="phase === 'find'"
        >Ada 1 perintah yang salah. Ketuk yang menurutmu salah!</template
      >
      <template v-else-if="phase === 'fix'">Ganti perintah yang salah dengan yang benar.</template>
      <template v-else>Robot sedang berjalan…</template>
    </p>

    <p v-if="level.hint && !solved && phase === 'find'" class="bug__hint">💡 {{ level.hint }}</p>
    <p v-if="message && !solved" class="bug__msg">{{ message }}</p>

    <!-- The (buggy) program the child inspects -->
    <div class="bug__program">
      <button
        v-for="(cmd, i) in program"
        :key="i"
        class="bug__chip"
        :class="{
          'bug__chip--bug': i === bugIndex,
          'bug__chip--dim': bugIndex !== null && i !== bugIndex,
        }"
        type="button"
        :disabled="phase !== 'find' || solved"
        :aria-label="BLOCK[cmd].label"
        @click="tapCommand(i)"
      >
        <span aria-hidden="true">{{ BLOCK[cmd].icon }}</span>
      </button>
    </div>

    <!-- Fix palette (only while choosing a replacement) -->
    <div v-if="phase === 'fix' && !solved" class="bug__palette">
      <button
        v-for="cmd in PALETTE"
        :key="cmd"
        class="bug__cmd"
        type="button"
        @click="pickFix(cmd)"
      >
        <span class="bug__cmd-icon" aria-hidden="true">{{ BLOCK[cmd].icon }}</span>
        <span class="bug__cmd-label">{{ BLOCK[cmd].label }}</span>
      </button>
    </div>

    <!-- Result -->
    <div v-if="solved" class="bug__result">
      <span class="bug__result-emoji" aria-hidden="true">🎉</span>
      <p class="bug__result-title">Bug Diperbaiki!</p>
      <BaseStarRating :value="earnedStars" size="lg" />
      <BaseReflectPrompt question="Ceritakan: bagaimana kamu tahu perintah itu yang salah?" />
      <div class="bug__result-actions">
        <NuxtLink to="/coding" class="bug__link">🗺 Peta</NuxtLink>
        <NuxtLink v-if="nextId" :to="`/coding/${nextId}`" class="bug__link bug__link--primary">
          Lanjut →
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.bug {
  @include flex(column, flex-start, stretch, spacing('md'));

  &__task {
    @include flex(row, center, center, spacing('xs'));
    flex-wrap: wrap;
    text-align: center;
    margin: 0;
    font-weight: $font-weight-bold;
    color: $color-ink;
  }

  &__hint {
    text-align: center;
    color: $color-ink-soft;
    margin: 0;
    font-size: font-size('sm');
  }

  &__msg {
    text-align: center;
    margin: 0;
    font-weight: $font-weight-semibold;
    color: $color-primary-dark;
  }

  &__program {
    @include flex(row, center, center, spacing('xs'));
    flex-wrap: wrap;
    min-height: 60px;
    padding: spacing('sm');
    background: rgba($color-primary, 0.05);
    border: 2px dashed rgba($color-primary, 0.3);
    border-radius: $radius-lg;
  }

  &__chip {
    @include tappable;
    @include flex-center;
    width: 48px;
    height: 48px;
    font-size: font-size('lg');
    background: $color-white;
    border: 2px solid $color-border;
    border-radius: $radius-md;
    box-shadow: $shadow-sm;
    transition:
      transform $transition-fast,
      border-color $transition-fast,
      opacity $transition-fast;

    &--bug {
      border-color: $color-error;
      transform: translateY(-4px) scale(1.12);
      box-shadow: 0 6px 16px rgba($color-error, 0.4);
    }

    &--dim {
      opacity: 0.4;
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
  }

  &__cmd-icon {
    font-size: font-size('lg');
  }
  &__cmd-label {
    font-weight: $font-weight-bold;
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
