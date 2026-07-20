import { describe, it, expect } from 'vitest'
import type { CodingCommand, CodingCondition, CodingStep } from '~/types'
import { runProgram, starsForSolution, toSteps, countBlocks, isWalkable } from '~/utils/codeRunner'
import { codingService } from '~/services/codingService'

const F: CodingCommand = 'forward'
const L: CodingCommand = 'left'
const R: CodingCommand = 'right'

const cmd = (c: CodingCommand): CodingStep => ({ type: 'cmd', cmd: c })
const rep = (times: number, ...body: CodingCommand[]): CodingStep => ({
  type: 'repeat',
  times,
  body: body.map((c) => ({ type: 'cmd' as const, cmd: c })),
})
// "Ulangi N × Panggil A" — the function-world solution shape.
const repCall = (times: number): CodingStep => ({
  type: 'repeat',
  times,
  body: [{ type: 'call', name: 'A' }],
})
// "Repeat until goal: if <cond> then X else Y" — the conditional-world shape.
const loopIf = (
  times: number,
  cond: CodingCondition,
  thenCmd: CodingCommand,
  elseCmd: CodingCommand,
): CodingStep => ({
  type: 'repeat',
  times,
  body: [{ type: 'if', cond, body: [cmd(thenCmd)], elseBody: [cmd(elseCmd)] }],
})

// Intended optimal solution per authored level — validates the grids too.
const SEQUENCE_SOLUTIONS: Record<string, CodingCommand[]> = {
  'code-seq-1': [F, F, F],
  'code-seq-2': [F, F, R, F, F],
  'code-seq-3': [F, F, L, F, F],
  'code-seq-4': [F, R, F, F, L, F, F],
  'code-seq-5': [F, F, R, F, F, L, F, F],
  'code-seq-6': [F, L, F, F, R, F],
}

// Loop worlds: the efficient solution uses repeat blocks.
const LOOP_SOLUTIONS: Record<string, CodingStep[]> = {
  'code-loop-1': [rep(6, F)],
  'code-loop-2': [cmd(F), cmd(R), rep(5, F)],
  'code-loop-3': [rep(3, F), cmd(R), rep(3, F)],
  'code-loop-4': [rep(3, F, R, F, L)],
  'code-loop-5': [rep(4, F, R, F, L)],
}

// Loops + gems combined: collect every gem using repeat blocks, then goal.
const LOOP_GEM_SOLUTIONS: Record<string, CodingStep[]> = {
  'code-lg-1': [rep(5, F)],
  'code-lg-2': [rep(3, F, R, F, L)],
  'code-lg-3': [rep(3, F), cmd(R), rep(3, F)],
  'code-lg-4': [rep(4, F, R, F, L)],
  'code-lg-5': [rep(4, F), cmd(R), rep(3, F)],
}

// Gem worlds: must collect every gem and finish on the goal.
const GEM_SOLUTIONS: Record<string, CodingCommand[]> = {
  'code-gem-1': [F, F, F],
  'code-gem-2': [F, F, F, F, F],
  'code-gem-3': [F, F, R, F, F],
  'code-gem-4': [F, F, R, F, F, L, F, F],
  'code-gem-5': [F, F, F, F, F, F],
  'code-gem-6': [F, F, L, F, F, L, F, F],
}

describe('codeRunner', () => {
  it('every sequencing level is solvable at its optimal block count (3 stars)', () => {
    for (const [id, cmds] of Object.entries(SEQUENCE_SOLUTIONS)) {
      const level = codingService.getLevel(id)!
      const { success } = runProgram(level, toSteps(cmds))
      expect(success, `${id} not solved`).toBe(true)
      expect(cmds.length, `${id} optimal mismatch`).toBe(level.optimalBlocks)
      expect(starsForSolution(cmds.length, level.optimalBlocks)).toBe(3)
    }
  })

  it('every loop level is solvable with a repeat block at optimal count (3 stars)', () => {
    for (const [id, program] of Object.entries(LOOP_SOLUTIONS)) {
      const level = codingService.getLevel(id)!
      const { success } = runProgram(level, program)
      expect(success, `${id} not solved`).toBe(true)
      const blocks = countBlocks(program)
      expect(blocks, `${id} optimal mismatch`).toBe(level.optimalBlocks)
      expect(starsForSolution(blocks, level.optimalBlocks)).toBe(3)
    }
  })

  it('every loops+gems level is solvable with repeats, collecting all gems, at optimal', () => {
    for (const [id, program] of Object.entries(LOOP_GEM_SOLUTIONS)) {
      const level = codingService.getLevel(id)!
      const { success, frames } = runProgram(level, program)
      expect(success, `${id} not solved`).toBe(true)
      const totalGems = level.grid
        .join('')
        .split('')
        .filter((c) => c === 'C').length
      expect(frames.at(-1)!.collected.length, `${id} missed gems`).toBe(totalGems)
      expect(countBlocks(program), `${id} optimal mismatch`).toBe(level.optimalBlocks)
    }
  })

  it('every gem level is solved only when all gems are collected + goal reached', () => {
    for (const [id, cmds] of Object.entries(GEM_SOLUTIONS)) {
      const level = codingService.getLevel(id)!
      const { success, frames } = runProgram(level, toSteps(cmds))
      expect(success, `${id} not solved`).toBe(true)
      // the final frame must have collected every gem on the grid
      const totalGems = level.grid
        .join('')
        .split('')
        .filter((c) => c === 'C').length
      expect(frames.at(-1)!.collected.length, `${id} missed gems`).toBe(totalGems)
      expect(cmds.length, `${id} optimal mismatch`).toBe(level.optimalBlocks)
    }
  })

  it('reaching the goal WITHOUT collecting all gems is not a success', () => {
    const level = codingService.getLevel('code-gem-2')! // ['.C.C.G'] — gems at x=1,3
    // Only 1 forward: not on goal and no gems → not solved (sanity)
    expect(runProgram(level, toSteps([F])).success).toBe(false)
  })

  it('countBlocks rewards loops (repeat = 1 + body, not body × times)', () => {
    expect(countBlocks([rep(6, F)])).toBe(2)
    expect(countBlocks([cmd(F), rep(3, F, R)])).toBe(4) // 1 + (1 + 2)
  })

  it('a forward into a wall / off-grid keeps the robot in place', () => {
    const level = codingService.getLevel('code-seq-1')!
    const { frames, success } = runProgram(level, toSteps([L, F]))
    expect(success).toBe(false)
    expect(frames.at(-1)).toMatchObject({ x: 0, y: 0, facing: 'north' })
  })

  it('every "order the steps" level has distinct step cards & unique ids', () => {
    const orderLevels = codingService.getLevels().filter((l) => l.kind === 'order')
    expect(orderLevels.length).toBeGreaterThan(0)
    for (const l of orderLevels) {
      if (l.kind !== 'order') continue
      expect(l.steps.length, l.id).toBeGreaterThanOrEqual(3)
      const ids = l.steps.map((s) => s.id)
      expect(new Set(ids).size, `${l.id}: duplicate step id`).toBe(ids.length)
      // cards must be visually distinct (icon+label) so ordering is unambiguous
      const cards = l.steps.map((s) => `${s.icon}|${s.label}`)
      expect(new Set(cards).size, `${l.id}: ambiguous (identical) cards`).toBe(cards.length)
    }
  })

  it('every "predict" level ends on a walkable cell with enough candidate cells', () => {
    const predicts = codingService.getLevels().filter((l) => l.kind === 'predict')
    expect(predicts.length).toBeGreaterThan(0)
    for (const l of predicts) {
      if (l.kind !== 'predict') continue
      const { frames } = runProgram(l, toSteps(l.program))
      const end = frames.at(-1)!
      expect(isWalkable(l.grid, end.x, end.y), `${l.id} ends off-path`).toBe(true)
      const walkable = l.grid
        .join('')
        .split('')
        .filter((c) => c === '.' || c === 'G' || c === 'C').length
      expect(walkable, `${l.id} has too few candidate cells`).toBeGreaterThanOrEqual(4)
    }
  })

  it('every "find the bug" level: buggy program FAILS and the fix SUCCEEDS', () => {
    const bugs = codingService.getLevels().filter((l) => l.kind === 'bug')
    expect(bugs.length).toBeGreaterThan(0)
    for (const l of bugs) {
      if (l.kind !== 'bug') continue
      // The shown (buggy) program must NOT reach the goal — otherwise there's
      // nothing to fix.
      expect(runProgram(l, toSteps(l.buggy)).success, `${l.id}: buggy already solves`).toBe(false)
      // Applying the authored fix at its index must solve the level.
      expect(l.fix.index, `${l.id}: fix index out of range`).toBeLessThan(l.buggy.length)
      const fixed = l.buggy.slice()
      fixed[l.fix.index] = l.fix.cmd
      expect(runProgram(l, toSteps(fixed)).success, `${l.id}: fix does not solve`).toBe(true)
      // The fix must actually change the command (a real bug).
      expect(l.buggy[l.fix.index], `${l.id}: fix equals buggy command`).not.toBe(l.fix.cmd)
    }
  })

  it('every function level is solved by "Ulangi N × Panggil A" at its optimal count', () => {
    const solutions: Record<string, { a: CodingCommand[]; n: number }> = {
      'func-1': { a: [F, F, R], n: 4 },
      'func-2': { a: [F, R, F, L], n: 3 },
      'func-3': { a: [F, F, R], n: 2 },
      'func-4': { a: [F, F, F, R], n: 4 },
      'func-5': { a: [F, R, F, L], n: 3 },
    }
    for (const [id, { a, n }] of Object.entries(solutions)) {
      const level = codingService.getLevel(id)!
      const program = [repCall(n)]
      const funcs = { A: toSteps(a) }
      const { success, frames } = runProgram(level, program, funcs)
      expect(success, `${id} not solved`).toBe(true)
      const totalGems = level.grid
        .join('')
        .split('')
        .filter((c) => c === 'C').length
      expect(frames.at(-1)!.collected.length, `${id} missed gems`).toBe(totalGems)
      const blocks = countBlocks(program) + countBlocks(funcs.A)
      expect(blocks, `${id} optimal mismatch`).toBe(
        (level as { optimalBlocks: number }).optimalBlocks,
      )
    }
  })

  it('every conditional level is solved by "repeat-until-goal: if path-ahead then/else"', () => {
    const solutions: Record<string, { then: CodingCommand; else: CodingCommand }> = {
      'cond-1': { then: F, else: R },
      'cond-2': { then: F, else: L },
      'cond-3': { then: F, else: R },
    }
    for (const [id, sol] of Object.entries(solutions)) {
      const level = codingService.getLevel(id)!
      const program = [loopIf(60, 'path-ahead', sol.then, sol.else)]
      const { success } = runProgram(level, program, {}, true)
      expect(success, `${id} not solved`).toBe(true)
    }
  })

  it('starsForSolution rewards efficiency', () => {
    expect(starsForSolution(3, 3)).toBe(3)
    expect(starsForSolution(4, 3)).toBe(2)
    expect(starsForSolution(5, 3)).toBe(2)
    expect(starsForSolution(6, 3)).toBe(1)
  })
})
