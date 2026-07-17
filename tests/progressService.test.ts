import { describe, it, expect, beforeEach } from 'vitest'
import { progressService } from '~/services/progressService'

// happy-dom provides localStorage. Clear it before each test.
beforeEach(() => {
  localStorage.clear()
  progressService.reset()
})

describe('progressService', () => {
  it('saves the result & marks it completed', () => {
    const entry = progressService.save('en-animals', 2)
    expect(entry.completed).toBe(true)
    expect(entry.stars).toBe(2)
    expect(progressService.isCompleted('en-animals')).toBe(true)
  })

  it('stars are monotonic (never decrease)', () => {
    progressService.save('en-fruits', 3)
    const after = progressService.save('en-fruits', 1)
    expect(after.stars).toBe(3) // stays 3, doesn't drop to 1
  })

  it('clamps stars to the 0..3 range', () => {
    expect(progressService.save('x', 99).stars).toBe(3)
    expect(progressService.save('y', -5).stars).toBe(0)
  })

  it('reset clears all progress', () => {
    progressService.save('en-animals', 3)
    progressService.reset()
    expect(progressService.getAll()).toEqual({})
    expect(progressService.isCompleted('en-animals')).toBe(false)
  })
})
