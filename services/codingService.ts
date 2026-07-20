import type { AnyCodingLevel, CodingWorld } from '~/types'
import { codingWorlds, codingLevels } from '~/data/coding'
import { storage } from '~/utils/storage'

// Coding is a SEPARATE module from the subjects/lessons. It keeps its own
// progress store (stars per level) so it never mixes with lesson progress.
// Levels can be different game kinds (grid puzzle, order-the-steps, …).

const STARS_KEY = 'belajar-yuk:coding:stars'

type StarMap = Record<string, number>

export const codingService = {
  getWorlds(): CodingWorld[] {
    return codingWorlds
  },

  getLevels(): AnyCodingLevel[] {
    return codingLevels
  },

  getLevel(id: string): AnyCodingLevel | null {
    return codingLevels.find((l) => l.id === id) ?? null
  },

  /** The level after the given id (for the "next level" button). */
  getNextLevel(id: string): AnyCodingLevel | null {
    const i = codingLevels.findIndex((l) => l.id === id)
    return i >= 0 ? (codingLevels[i + 1] ?? null) : null
  },

  getStarMap(): StarMap {
    return storage.get<StarMap>(STARS_KEY, {})
  },

  getStars(id: string): number {
    return this.getStarMap()[id] ?? 0
  },

  isCompleted(id: string): boolean {
    return this.getStars(id) > 0
  },

  /** Save a level result, keeping the best star count. */
  saveStars(id: string, stars: number): void {
    const map = this.getStarMap()
    if (stars > (map[id] ?? 0)) {
      map[id] = stars
      storage.set(STARS_KEY, map)
    }
  },

  /**
   * A level is unlocked if it is the first one, the previous level in play
   * order has been completed (Kumon-style: earn your way forward), OR it has
   * already been completed itself (so reordering worlds never re-locks a level
   * the child already beat).
   */
  isUnlocked(id: string): boolean {
    const i = codingLevels.findIndex((l) => l.id === id)
    if (i <= 0) return true
    return this.isCompleted(codingLevels[i - 1].id) || this.isCompleted(id)
  },

  /** Total stars earned across all levels. */
  totalStars(): number {
    return Object.values(this.getStarMap()).reduce((sum, s) => sum + s, 0)
  },

  /** Number of levels in the whole coding module. */
  totalLevels(): number {
    return codingLevels.length
  },

  /** Number of levels the child has completed (earned ≥ 1 star). */
  completedCount(): number {
    return codingLevels.filter((l) => this.isCompleted(l.id)).length
  },

  /** Maximum stars obtainable across every level (3 each). */
  maxStars(): number {
    return codingLevels.length * 3
  },

  /** True once every coding level is completed (unlocks the coding certificate). */
  allCompleted(): boolean {
    return codingLevels.length > 0 && this.completedCount() === codingLevels.length
  },
}
