<script setup lang="ts">
import type { CodingLevel, Facing } from '~/types'
import type { RobotState } from '~/utils/codeRunner'

// Renders a level grid and the robot. Dynamic values (grid size, robot
// position, facing angle) are passed via CSS custom properties — the only
// sanctioned use of inline `style` (styling itself stays in SCSS).
const props = defineProps<{ level: CodingLevel; robot: RobotState }>()

const cols = computed(() => props.level.grid[0]?.length ?? 0)
const cells = computed(() =>
  props.level.grid.flatMap((row, y) =>
    row.split('').map((char, x) => ({ key: `${x}-${y}`, char })),
  ),
)

const ANGLE: Record<Facing, number> = { north: 0, east: 90, south: 180, west: 270 }
const facingAngle = computed(() => ANGLE[props.robot.facing])
</script>

<template>
  <div class="grid" :style="{ '--cols': cols }">
    <div class="grid__board">
      <span
        v-for="cell in cells"
        :key="cell.key"
        class="grid__cell"
        :class="{
          'grid__cell--wall': cell.char === '#',
          'grid__cell--goal': cell.char === 'G',
        }"
      >
        <span v-if="cell.char === 'G'" aria-hidden="true">⭐</span>
      </span>

      <!-- Robot overlays the board and animates between cells -->
      <span class="grid__robot" :style="{ '--rx': robot.x, '--ry': robot.y }" aria-label="Robot">
        <span class="grid__robot-rot" :style="{ '--angle': `${facingAngle}deg` }">
          <span class="grid__robot-arrow" aria-hidden="true">▲</span>
          <span
            class="grid__robot-face"
            :style="{ '--angle': `${facingAngle}deg` }"
            aria-hidden="true"
            >🤖</span
          >
        </span>
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.grid {
  --cell: 56px;
  display: flex;
  justify-content: center;

  @media (max-width: 400px) {
    --cell: 46px;
  }

  &__board {
    position: relative;
    display: grid;
    grid-template-columns: repeat(var(--cols), var(--cell));
    gap: 4px;
    padding: spacing('sm');
    background: rgba($color-primary, 0.06);
    border-radius: $radius-lg;
  }

  &__cell {
    @include flex-center;
    width: var(--cell);
    height: var(--cell);
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

  &__robot {
    position: absolute;
    top: spacing('sm');
    left: spacing('sm');
    width: var(--cell);
    height: var(--cell);
    // gap of 4px between cells is folded into the step via calc
    transform: translate(
      calc(var(--rx) * (var(--cell) + 4px)),
      calc(var(--ry) * (var(--cell) + 4px))
    );
    transition: transform 0.32s ease;
  }

  // Inner element rotates to the facing direction; the arrow rides along,
  // while the face counter-rotates to stay upright.
  &__robot-rot {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    transform: rotate(var(--angle));
    transition: transform 0.2s ease;
  }

  &__robot-arrow {
    position: absolute;
    top: -2px;
    left: 50%;
    transform: translateX(-50%);
    font-size: font-size('xs');
    color: $color-primary-dark;
  }

  &__robot-face {
    @include flex-center;
    width: 100%;
    height: 100%;
    font-size: font-size('lg');
    transform: rotate(calc(-1 * var(--angle)));
  }
}
</style>
