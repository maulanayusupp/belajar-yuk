import { describe, it, expect, beforeEach } from 'vitest'
import { codingService } from '~/services/codingService'

describe('codingService progress & unlock', () => {
  beforeEach(() => {
    localStorage.removeItem('belajar-yuk:coding:stars')
  })

  it('first level is unlocked, later levels start locked', () => {
    const levels = codingService.getLevels()
    expect(codingService.isUnlocked(levels[0].id)).toBe(true)
    expect(codingService.isUnlocked(levels[1].id)).toBe(false)
  })

  it('completing a level unlocks the next', () => {
    const levels = codingService.getLevels()
    codingService.saveStars(levels[0].id, 2)
    expect(codingService.isUnlocked(levels[1].id)).toBe(true)
    expect(codingService.isCompleted(levels[0].id)).toBe(true)
  })

  it('keeps the best star count only', () => {
    const id = codingService.getLevels()[0].id
    codingService.saveStars(id, 3)
    codingService.saveStars(id, 1)
    expect(codingService.getStars(id)).toBe(3)
  })

  it('getNextLevel returns the following level, null at the end', () => {
    const levels = codingService.getLevels()
    expect(codingService.getNextLevel(levels[0].id)?.id).toBe(levels[1].id)
    expect(codingService.getNextLevel(levels.at(-1)!.id)).toBeNull()
  })

  it('progress summary counts completed levels, stars & max', () => {
    const levels = codingService.getLevels()
    expect(codingService.totalLevels()).toBe(levels.length)
    expect(codingService.maxStars()).toBe(levels.length * 3)
    expect(codingService.completedCount()).toBe(0)
    expect(codingService.allCompleted()).toBe(false)

    codingService.saveStars(levels[0].id, 3)
    codingService.saveStars(levels[1].id, 2)
    expect(codingService.completedCount()).toBe(2)
    expect(codingService.totalStars()).toBe(5)
  })

  it('allCompleted is true only once every level has a star', () => {
    for (const l of codingService.getLevels()) codingService.saveStars(l.id, 3)
    expect(codingService.allCompleted()).toBe(true)
    expect(codingService.completedCount()).toBe(codingService.totalLevels())
  })
})
