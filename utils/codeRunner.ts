import type { CodingCommand, CodingLevel, CodingStep, Facing } from '~/types'

// Pure, deterministic interpreter for the coding puzzles. No side effects,
// so it is easy to unit-test. The runner turns a program (list of commands)
// into a list of robot "frames" for animation, plus whether the goal is met.

export interface RobotState {
  x: number
  y: number
  facing: Facing
}

const DX: Record<Facing, number> = { north: 0, east: 1, south: 0, west: -1 }
const DY: Record<Facing, number> = { north: -1, east: 0, south: 1, west: 0 }
const LEFT: Record<Facing, Facing> = {
  north: 'west',
  west: 'south',
  south: 'east',
  east: 'north',
}
const RIGHT: Record<Facing, Facing> = {
  north: 'east',
  east: 'south',
  south: 'west',
  west: 'north',
}

/** The character at grid cell (x, y); '#' (wall) when out of bounds. */
export function cellAt(grid: string[], x: number, y: number): string {
  return grid[y]?.[x] ?? '#'
}

/** A cell the robot can stand on. */
export function isWalkable(grid: string[], x: number, y: number): boolean {
  const c = cellAt(grid, x, y)
  return c === '.' || c === 'G'
}

export interface RunResult {
  /** Robot state after each step, starting with the initial position. */
  frames: RobotState[]
  /** True when the robot ends on the goal cell. */
  success: boolean
}

/** Run a program (tree of steps) on a level; returns animation frames + success. */
export function runProgram(level: CodingLevel, program: CodingStep[]): RunResult {
  let state: RobotState = { ...level.start }
  const frames: RobotState[] = [{ ...state }]

  const step = (cmd: CodingCommand) => {
    if (cmd === 'left') {
      state = { ...state, facing: LEFT[state.facing] }
    } else if (cmd === 'right') {
      state = { ...state, facing: RIGHT[state.facing] }
    } else {
      // forward — move only if the next cell is walkable (otherwise stay/bump).
      const nx = state.x + DX[state.facing]
      const ny = state.y + DY[state.facing]
      if (isWalkable(level.grid, nx, ny)) state = { ...state, x: nx, y: ny }
    }
    frames.push({ ...state })
  }

  const walk = (steps: CodingStep[]) => {
    for (const s of steps) {
      if (s.type === 'repeat') {
        for (let i = 0; i < s.times; i++) walk(s.body)
      } else {
        step(s.cmd)
      }
    }
  }
  walk(program)

  const success = cellAt(level.grid, state.x, state.y) === 'G'
  return { frames, success }
}

/** Convert a flat command list to program steps (for the sequencing world). */
export function toSteps(cmds: CodingCommand[]): CodingStep[] {
  return cmds.map((cmd) => ({ type: 'cmd', cmd }))
}

/** Number of blocks placed — a repeat block counts as 1 + its body (loops win). */
export function countBlocks(program: CodingStep[]): number {
  return program.reduce((n, s) => n + (s.type === 'repeat' ? 1 + s.body.length : 1), 0)
}

/**
 * Stars from a solved program: 3 if within the optimal block count,
 * 2 if slightly over, 1 for any correct solution.
 */
export function starsForSolution(blocks: number, optimalBlocks: number): number {
  if (blocks <= optimalBlocks) return 3
  if (blocks <= optimalBlocks + 2) return 2
  return 1
}
