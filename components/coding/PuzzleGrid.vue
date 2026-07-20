<script setup lang="ts">
import type { Facing } from '~/types'
import type { RobotState } from '~/utils/codeRunner'

// Renders a level grid + robot. Positions/sizes are computed in JS and bound
// DIRECTLY to `transform` (not via CSS vars) so the walk animates in every
// browser (incl. Safari). Optional `markers` add tappable labels on cells —
// used by the "predict the output" game.
interface Marker {
  pos: string // "x,y"
  label: string
  state?: 'default' | 'chosen' | 'correct' | 'wrong'
}

const props = withDefaults(
  defineProps<{
    level: { grid: string[] }
    robot: RobotState
    collected?: string[]
    markers?: Marker[]
    selectable?: boolean
  }>(),
  { collected: () => [], markers: () => [], selectable: false },
)
const emit = defineEmits<{ pick: [pos: string] }>()

const GAP = 4

const cols = computed(() => props.level.grid[0]?.length ?? 1)
const cells = computed(() =>
  props.level.grid.flatMap((row, y) =>
    row.split('').map((char, x) => ({ key: `${x}-${y}`, char, pos: `${x},${y}` })),
  ),
)
const collectedSet = computed(() => new Set(props.collected))

// Responsive cell size. Same default on server & first client render (no
// hydration mismatch); refined on mount and on resize.
const cell = ref(52)
function fit() {
  if (typeof window === 'undefined') return
  const avail = Math.min(window.innerWidth - 40, 440)
  const c = Math.floor((avail - (cols.value - 1) * GAP) / cols.value)
  cell.value = Math.max(38, Math.min(58, c))
}
onMounted(() => {
  fit()
  window.addEventListener('resize', fit)
})
onBeforeUnmount(() => {
  if (typeof window !== 'undefined') window.removeEventListener('resize', fit)
})

const ANGLE: Record<Facing, number> = { north: 0, east: 90, south: 180, west: 270 }

function transformFor(x: number, y: number) {
  return `translate(${x * (cell.value + GAP)}px, ${y * (cell.value + GAP)}px)`
}

const boardStyle = computed(() => ({
  gridTemplateColumns: `repeat(${cols.value}, ${cell.value}px)`,
  gridAutoRows: `${cell.value}px`,
  gap: `${GAP}px`,
}))
const robotStyle = computed(() => ({
  width: `${cell.value}px`,
  height: `${cell.value}px`,
  transform: transformFor(props.robot.x, props.robot.y),
}))
const rotStyle = computed(() => ({ transform: `rotate(${ANGLE[props.robot.facing]}deg)` }))
const faceStyle = computed(() => ({ transform: `rotate(${-ANGLE[props.robot.facing]}deg)` }))

function markerStyle(pos: string) {
  const [x, y] = pos.split(',').map(Number)
  return { width: `${cell.value}px`, height: `${cell.value}px`, transform: transformFor(x, y) }
}
</script>

<template>
  <div class="grid">
    <div class="grid__board" :style="boardStyle">
      <span
        v-for="c in cells"
        :key="c.key"
        class="grid__cell"
        :class="{
          'grid__cell--wall': c.char === '#',
          'grid__cell--goal': c.char === 'G',
          'grid__cell--gem': c.char === 'C',
        }"
      >
        <span v-if="c.char === 'G'" aria-hidden="true">⭐</span>
        <span
          v-else-if="c.char === 'C' && !collectedSet.has(c.pos)"
          class="grid__gem"
          aria-hidden="true"
          >💎</span
        >
      </span>

      <!-- Prediction markers (tappable candidate cells) -->
      <component
        :is="selectable ? 'button' : 'span'"
        v-for="m in markers"
        :key="m.pos"
        class="grid__marker"
        :class="`grid__marker--${m.state ?? 'default'}`"
        :style="markerStyle(m.pos)"
        :type="selectable ? 'button' : undefined"
        @click="selectable && emit('pick', m.pos)"
      >
        {{ m.label }}
      </component>

      <!-- Robot overlays the board and animates between cells -->
      <span class="grid__robot" :style="robotStyle" aria-label="Robot">
        <span class="grid__robot-rot" :style="rotStyle">
          <span class="grid__robot-arrow" aria-hidden="true">▲</span>
          <span class="grid__robot-face" :style="faceStyle" aria-hidden="true">🤖</span>
        </span>
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.grid {
  display: flex;
  justify-content: center;

  &__board {
    position: relative;
    display: grid;
    padding: spacing('sm');
    background: rgba($color-primary, 0.06);
    border-radius: $radius-lg;
  }

  &__cell {
    @include flex-center;
    font-size: font-size('lg');
    background: $color-white;
    border-radius: $radius-sm;
    box-shadow: $shadow-sm;

    &--wall {
      background: transparent;
      box-shadow: none;
    }

    &--goal {
      background: rgba($color-star, 0.18);
      border: 2px dashed $color-star;
    }

    &--gem {
      background: rgba($color-secondary, 0.12);
    }
  }

  &__gem {
    animation: pulse-glow 1.6s ease-in-out infinite;
  }

  // Prediction markers
  &__marker {
    position: absolute;
    top: spacing('sm');
    left: spacing('sm');
    @include flex-center;
    font-family: $font-family-display;
    font-weight: $font-weight-bold;
    font-size: font-size('lg');
    color: $color-primary-dark;
    background: rgba($color-primary, 0.16);
    border: 2px solid $color-primary;
    border-radius: $radius-sm;

    &--chosen {
      background: rgba($color-primary, 0.35);
      color: $color-white;
      background-color: $color-primary;
    }
    &--correct {
      background: rgba($color-success, 0.85);
      border-color: $color-success;
      color: $color-white;
    }
    &--wrong {
      background: rgba($color-error, 0.8);
      border-color: $color-error;
      color: $color-white;
    }
  }
  button.grid__marker {
    cursor: pointer;
  }

  // Robot position is set from JS (translate in px) so the transition animates
  // reliably in every browser, including Safari.
  &__robot {
    position: absolute;
    top: spacing('sm');
    left: spacing('sm');
    @include flex-center;
    transition: transform 0.32s ease;
    will-change: transform;
    pointer-events: none;
  }

  &__robot-rot {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    transition: transform 0.2s ease;
  }

  &__robot-arrow {
    position: absolute;
    top: -2px;
    left: 50%;
    margin-left: -5px;
    font-size: font-size('xs');
    color: $color-primary-dark;
  }

  &__robot-face {
    @include flex-center;
    width: 100%;
    height: 100%;
    font-size: font-size('lg');
  }
}
</style>
