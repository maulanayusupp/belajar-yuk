import { describe, it, expect } from 'vitest'
import type { CodingCommand } from '~/types'
import { runProgram, starsForSolution } from '~/utils/codeRunner'
import { codingService } from '~/services/codingService'

const F: CodingCommand = 'forward'
const L: CodingCommand = 'left'
const R: CodingCommand = 'right'

// Intended optimal solution per authored level — validates the grids too.
const SOLUTIONS: Record<string, CodingCommand[]> = {
  'code-seq-1': [F, F, F],
  'code-seq-2': [F, F, R, F, F],
  'code-seq-3': [F, F, L, F, F],
  'code-seq-4': [F, R, F, F, L, F, F],
  'code-seq-5': [F, F, R, F, F, L, F, F],
  'code-seq-6': [F, L, F, F, R, F],
}

describe('codeRunner', () => {
  it('every authored level is solvable at its optimal block count (3 stars)', () => {
    for (const level of codingService.getLevels()) {
      const solution = SOLUTIONS[level.id]
      expect(solution, `missing solution for ${level.id}`).toBeDefined()
      const { success } = runProgram(level, solution)
      expect(success, `${level.id} not solved by its solution`).toBe(true)
      expect(solution.length, `${level.id} optimal mismatch`).toBe(level.optimalBlocks)
      expect(starsForSolution(solution.length, level.optimalBlocks)).toBe(3)
    }
  })

  it('a forward into a wall / off-grid keeps the robot in place', () => {
    const level = codingService.getLevel('code-seq-1')!
    // face north (off-grid) then move forward → stays at start, not solved
    const { frames, success } = runProgram(level, [L, F])
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
