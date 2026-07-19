<script setup lang="ts">
import type { CodingLevel, Facing } from '~/types'
import type { RobotState } from '~/utils/codeRunner'

// Renders a level grid and the robot. Positions/sizes are computed in JS and
// bound DIRECTLY to `transform` (not via CSS custom properties): Safari does
// not animate a `transition: transform` when the value changes through a
// var(), so a direct pixel value is required for the walking animation to play.
const props = defineProps<{ level: CodingLevel; robot: RobotState }>()

const GAP = 4

const cols = computed(() => props.level.grid[0]?.length ?? 1)
const cells = computed(() =>
  props.level.grid.flatMap((row, y) =>
    row.split('').map((char, x) => ({ key: `${x}-${y}`, char })),
  ),
)

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

const boardStyle = computed(() => ({
  gridTemplateColumns: `repeat(${cols.value}, ${cell.value}px)`,
  gridAutoRows: `${cell.value}px`,
  gap: `${GAP}px`,
}))
const robotStyle = computed(() => ({
  width: `${cell.value}px`,
  height: `${cell.value}px`,
  transform: `translate(${props.robot.x * (cell.value + GAP)}px, ${props.robot.y * (cell.value + GAP)}px)`,
}))
const rotStyle = computed(() => ({ transform: `rotate(${ANGLE[props.robot.facing]}deg)` }))
const faceStyle = computed(() => ({ transform: `rotate(${-ANGLE[props.robot.facing]}deg)` }))
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
        }"
      >
        <span v-if="c.char === 'G'" aria-hidden="true">⭐</span>
      </span>

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
