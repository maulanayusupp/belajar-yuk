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
  it('tanpa progres: tak ada lencana diraih', () => {
    expect(badgeService.earnedCount(empty)).toBe(0)
    expect(badgeService.all(empty).every((b) => !b.earned)).toBe(true)
  })

  it('lencana "Langkah Pertama" diraih setelah 1 pelajaran', () => {
    const badges = badgeService.all({ ...empty, completed: 1 })
    expect(badges.find((b) => b.id === 'first')?.earned).toBe(true)
    expect(badges.find((b) => b.id === 'five')?.earned).toBe(false)
  })

  it('kondisi ambang bekerja (streak & bintang)', () => {
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

  it('total lencana konsisten', () => {
    expect(badgeService.total()).toBe(badgeService.all(empty).length)
  })
})
