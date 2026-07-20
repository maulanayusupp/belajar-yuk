import type { CodingCommand, CodingCondition, CodingLevel, CodingStep, Facing } from '~/types'

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

/** A cell the robot can stand on ('.' path, 'G' goal, 'C' collectible gem). */
export function isWalkable(grid: string[], x: number, y: number): boolean {
  const c = cellAt(grid, x, y)
  return c === '.' || c === 'G' || c === 'C'
}

/** Total gems ('C' cells) on a level. */
export function totalGems(grid: string[]): number {
  return grid.reduce((n, row) => n + row.split('').filter((c) => c === 'C').length, 0)
}

/** One animation frame: robot state + which gems have been collected so far. */
export interface Frame extends RobotState {
  collected: string[]
}

export interface RunResult {
  /** Robot state + collected gems after each step, starting at the initial pose. */
  frames: Frame[]
  /** True when the robot ends on the goal AND every gem has been collected. */
  success: boolean
}

/** Guard against runaway programs (e.g. a function that calls itself). */
const MAX_EXECUTED_COMMANDS = 1000

/**
 * Run a program (tree of steps) on a level; returns animation frames + success.
 * `funcs` supplies named function bodies for `call` steps (Phase 2 decomposition).
 */
export function runProgram(
  level: Pick<CodingLevel, 'grid' | 'start'>,
  program: CodingStep[],
  funcs: Partial<Record<'A', CodingStep[]>> = {},
  /** Stop as soon as the goal is reached with all gems (for "repeat until goal"). */
  haltOnGoal = false,
): RunResult {
  let state: RobotState = { ...level.start }
  const collected = new Set<string>()
  const gemGoal = totalGems(level.grid)
  const collectHere = () => {
    if (cellAt(level.grid, state.x, state.y) === 'C') collected.add(`${state.x},${state.y}`)
  }
  collectHere() // the start cell could (rarely) hold a gem
  const frames: Frame[] = [{ ...state, collected: [...collected] }]
  let executed = 0
  let halted = false

  const atGoal = () => cellAt(level.grid, state.x, state.y) === 'G' && collected.size === gemGoal

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
    collectHere()
    frames.push({ ...state, collected: [...collected] })
    if (haltOnGoal && atGoal()) halted = true
  }

  // Evaluate a conditional against the robot's current state.
  const evalCond = (cond: CodingCondition): boolean => {
    if (cond === 'path-ahead') {
      return isWalkable(level.grid, state.x + DX[state.facing], state.y + DY[state.facing])
    }
    // gem-here — standing on an as-yet-uncollected gem
    return cellAt(level.grid, state.x, state.y) === 'C' && !collected.has(`${state.x},${state.y}`)
  }

  const walk = (steps: CodingStep[]) => {
    for (const s of steps) {
      if (halted || executed >= MAX_EXECUTED_COMMANDS) return
      if (s.type === 'repeat') {
        for (let i = 0; i < s.times; i++) {
          if (halted || executed >= MAX_EXECUTED_COMMANDS) break
          walk(s.body)
        }
      } else if (s.type === 'if') {
        if (evalCond(s.cond)) walk(s.body)
        else if (s.elseBody) walk(s.elseBody)
      } else if (s.type === 'call') {
        walk(funcs[s.name] ?? [])
      } else {
        step(s.cmd)
        executed++
      }
    }
  }
  walk(program)

  const onGoal = cellAt(level.grid, state.x, state.y) === 'G'
  const success = onGoal && collected.size === totalGems(level.grid)
  return { frames, success }
}

/** Convert a flat command list to program steps (for the sequencing world). */
export function toSteps(cmds: CodingCommand[]): CodingStep[] {
  return cmds.map((cmd) => ({ type: 'cmd', cmd }))
}

/**
 * Number of blocks placed — a container (repeat/if) counts as 1 + its body, so
 * loops/conditions/functions "win" by shrinking the block count. `cmd` and
 * `call` each count as 1.
 */
export function countBlocks(program: CodingStep[]): number {
  return program.reduce((n, s) => {
    if (s.type === 'repeat') return n + 1 + countBlocks(s.body)
    if (s.type === 'if') return n + 1 + countBlocks(s.body) + countBlocks(s.elseBody ?? [])
    return n + 1 // cmd or call
  }, 0)
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
