import { describe, it, expect } from 'vitest'
import { badgeService, type BadgeStats } from '~/services/badgeService'

const empty: BadgeStats = {
  completed: 0,
  mathCompleted: 0,
  englishCompleted: 0,
  perfect: 0,
  totalStars: 0,
  streakBest: 0,
}

describe('badgeService', () => {
  it('no progress: no badges earned', () => {
    expect(badgeService.earnedCount(empty)).toBe(0)
    expect(badgeService.all(empty).every((b) => !b.earned)).toBe(true)
  })

  it('the "Langkah Pertama" badge is earned after 1 lesson', () => {
    const badges = badgeService.all({ ...empty, completed: 1 })
    expect(badges.find((b) => b.id === 'first')?.earned).toBe(true)
    expect(badges.find((b) => b.id === 'five')?.earned).toBe(false)
  })

  it('threshold conditions work (streak & stars)', () => {
    const s: BadgeStats = { ...empty, completed: 10, streakBest: 7, totalStars: 25, perfect: 1 }
    const earned = new Set(
      badgeService
        .all(s)
        .filter((b) => b.earned)
        .map((b) => b.id),
    )
    expect(earned.has('ten')).toBe(true)
    expect(earned.has('streak7')).toBe(true)
    expect(earned.has('stars25')).toBe(true)
    expect(earned.has('perfect')).toBe(true)
  })

  it('total badge count is consistent', () => {
    expect(badgeService.total()).toBe(badgeService.all(empty).length)
  })
})
