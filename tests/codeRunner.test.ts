import { describe, it, expect } from 'vitest'
import type { CodingCommand, CodingStep } from '~/types'
import { runProgram, starsForSolution, toSteps, countBlocks } from '~/utils/codeRunner'
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

  it('countBlocks rewards loops (repeat = 1 + body, not body × times)', () => {
    expect(countBlocks([rep(6, F)])).toBe(2)
    expect(countBlocks([cmd(F), rep(3, F, R)])).toBe(4) // 1 + (1 + 2)
  })

  it('a forward into a wall / off-grid keeps the robot in place', () => {
    const level = codingService.getLevel('code-seq-1')!
    const { frames, success } = runProgram(level, toSteps([L, F]))
    expect(success).toBe(false)
    expect(frames.at(-1)).toEqual({ x: 0, y: 0, facing: 'north' })
  })

  it('starsForSolution rewards efficiency', () => {
    expect(starsForSolution(3, 3)).toBe(3)
    expect(starsForSolution(4, 3)).toBe(2)
    expect(starsForSolution(5, 3)).toBe(2)
    expect(starsForSolution(6, 3)).toBe(1)
  })
})
