<script setup lang="ts">
import type { CodingCommand, CodingCondition, CodingLevel, CodingStep } from '~/types'
import { runProgram, type RobotState } from '~/utils/codeRunner'
import { codingService } from '~/services/codingService'

// Runner for the CONDITIONALS world (Phase 2). A constrained if-else game: the
// program is fixed as "repeat until goal: IF <cond> do X, else do Y". The child
// picks one command for each branch. Teaches decision-making — one tiny rule
// follows a whole path by reacting to what's ahead.
const props = defineProps<{ level: CodingLevel; nextId: string | null }>()

const { play } = useAudio()
const { celebrate } = useConfetti()

const BLOCK: Record<CodingCommand, { icon: string; label: string }> = {
  forward: { icon: '⬆️', label: 'Maju' },
  left: { icon: '↺', label: 'Kiri' },
  right: { icon: '↻', label: 'Kanan' },
}
const COND: Record<CodingCondition, { icon: string; label: string }> = {
  'path-ahead': { icon: '🛤️', label: 'ada jalan di depan' },
  'gem-here': { icon: '💎', label: 'ada permata di sini' },
}

// The loop runs at most this many times before we give up (avoids spinning
// forever if the child's rule never reaches the goal).
const MAX_LOOPS = 60

const cond = computed<CodingCondition>(() => props.level.conditions?.[0] ?? 'path-ahead')
const thenCmd = ref<CodingCommand | null>(null)
const elseCmd = ref<CodingCommand | null>(null)
const robot = ref<RobotState>({ ...props.level.start })
const collected = ref<string[]>([])
const running = ref(false)
const solved = ref(false)
const earnedStars = ref(0)
const failMsg = ref('')
let mistakes = 0

let cancelled = false
onBeforeUnmount(() => (cancelled = true))

function resetRobot() {
  robot.value = { ...props.level.start }
  collected.value = []
  failMsg.value = ''
}

function pickThen(cmd: CodingCommand) {
  if (running.value || solved.value) return
  thenCmd.value = cmd
  play('click')
  resetRobot()
}
function pickElse(cmd: CodingCommand) {
  if (running.value || solved.value) return
  elseCmd.value = cmd
  play('click')
  resetRobot()
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function run() {
  if (running.value || solved.value || !thenCmd.value || !elseCmd.value) return
  running.value = true
  failMsg.value = ''
  const program: CodingStep[] = [
    {
      type: 'repeat',
      times: MAX_LOOPS,
      body: [
        {
          type: 'if',
          cond: cond.value,
          body: [{ type: 'cmd', cmd: thenCmd.value }],
          elseBody: [{ type: 'cmd', cmd: elseCmd.value }],
        },
      ],
    },
  ]
  // haltOnGoal → the loop stops the instant the robot reaches the goal.
  const { frames, success } = runProgram(props.level, program, {}, true)

  for (let i = 1; i < frames.length; i++) {
    await delay(280)
    if (cancelled) return
    const f = frames[i]
    robot.value = { x: f.x, y: f.y, facing: f.facing }
    collected.value = f.collected
    play('pop')
  }
  await delay(300)
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
    failMsg.value = 'Robot belum sampai. Coba pilihan lain untuk salah satu cabang!'
    await delay(600)
    if (!cancelled) resetRobot()
  }
  running.value = false
}
</script>

<template>
  <div class="ifr">
    <CodingPuzzleGrid :level="level" :robot="robot" :collected="collected" />

    <p v-if="level.hint && !solved" class="ifr__hint">💡 {{ level.hint }}</p>
    <p v-if="failMsg" class="ifr__fail">{{ failMsg }}</p>

    <!-- The fixed rule: repeat until goal -->
    <div class="ifr__rule">
      <span class="ifr__rule-head">🔁 Ulangi sampai tiba di tujuan:</span>

      <div class="ifr__branch">
        <span class="ifr__cond">
          <strong>JIKA</strong> {{ COND[cond].icon }} {{ COND[cond].label }} →
        </span>
        <div class="ifr__picks">
          <button
            v-for="c in level.allowed"
            :key="`t-${c}`"
            class="ifr__pick"
            :class="{ 'ifr__pick--on': thenCmd === c }"
            type="button"
            :disabled="running || solved"
            @click="pickThen(c)"
          >
            <span aria-hidden="true">{{ BLOCK[c].icon }}</span> {{ BLOCK[c].label }}
          </button>
        </div>
      </div>

      <div class="ifr__branch">
        <span class="ifr__cond"><strong>KALAU TIDAK</strong> →</span>
        <div class="ifr__picks">
          <button
            v-for="c in level.allowed"
            :key="`e-${c}`"
            class="ifr__pick"
            :class="{ 'ifr__pick--on': elseCmd === c }"
            type="button"
            :disabled="running || solved"
            @click="pickElse(c)"
          >
            <span aria-hidden="true">{{ BLOCK[c].icon }}</span> {{ BLOCK[c].label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Controls -->
    <div v-if="!solved" class="ifr__controls">
      <BaseButton
        variant="primary"
        size="lg"
        :disabled="running || !thenCmd || !elseCmd"
        @click="run"
      >
        ▶ Jalankan
      </BaseButton>
    </div>

    <!-- Result -->
    <div v-else class="ifr__result">
      <span class="ifr__result-emoji" aria-hidden="true">🎉</span>
      <p class="ifr__result-title">Berhasil!</p>
      <BaseStarRating :value="earnedStars" size="lg" />
      <BaseReflectPrompt question="Ceritakan: kenapa robot tahu kapan harus berbelok?" />
      <div class="ifr__result-actions">
        <NuxtLink to="/coding" class="ifr__link">🗺 Peta</NuxtLink>
        <NuxtLink v-if="nextId" :to="`/coding/${nextId}`" class="ifr__link ifr__link--primary">
          Lanjut →
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ifr {
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

  &__rule {
    @include flex(column, flex-start, stretch, spacing('sm'));
    padding: spacing('md');
    background: rgba($color-primary, 0.06);
    border: 2px dashed rgba($color-primary, 0.3);
    border-radius: $radius-lg;
  }

  &__rule-head {
    font-weight: $font-weight-bold;
    color: $color-ink;
  }

  &__branch {
    @include flex(column, flex-start, stretch, spacing('xs'));
    padding: spacing('sm');
    background: $color-white;
    border-radius: $radius-md;
    box-shadow: $shadow-sm;
  }

  &__cond {
    color: $color-ink;
  }

  &__picks {
    @include flex(row, flex-start, center, spacing('xs'));
    flex-wrap: wrap;
  }

  &__pick {
    @include tappable;
    @include flex(row, center, center, spacing('xs'));
    padding: spacing('xs') spacing('md');
    font-weight: $font-weight-bold;
    background: rgba($color-primary, 0.08);
    border: 2px solid transparent;
    border-radius: $radius-pill;
    color: $color-ink;

    &--on {
      background: $color-primary;
      color: $color-white;
      box-shadow: $shadow-sm;
    }

    &:disabled {
      opacity: 0.5;
    }
  }

  &__controls {
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
