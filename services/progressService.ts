import type { LessonProgress } from '~/types'
import { storage } from '~/utils/storage'
import { clamp } from '~/utils/array'

const STORAGE_KEY = 'belajar-yuk:progress'

/** Target number of lessons per day (for the "Daily Goal"). */
export const DAILY_GOAL = 3

type ProgressMap = Record<string, LessonProgress>

// Stores & reads learning progress from localStorage.
// Kept separate from the UI so it's easy to swap (e.g. to a backend) later.
export const progressService = {
  getAll(): ProgressMap {
    return storage.get<ProgressMap>(STORAGE_KEY, {})
  },

  get(lessonId: string): LessonProgress | null {
    return this.getAll()[lessonId] ?? null
  },

  /**
   * Save the result of one lesson. Stars only go up, never down,
   * so the child doesn't "lose" stars they've already earned.
   */
  save(lessonId: string, stars: number): LessonProgress {
    const all = this.getAll()
    const prev = all[lessonId]
    const entry: LessonProgress = {
      lessonId,
      completed: true,
      stars: Math.max(prev?.stars ?? 0, clamp(Math.round(stars), 0, 3)),
      updatedAt: Date.now(),
    }
    all[lessonId] = entry
    storage.set(STORAGE_KEY, all)
    return entry
  },

  isCompleted(lessonId: string): boolean {
    return this.get(lessonId)?.completed ?? false
  },

  /** Number of lessons done today (for the daily goal). */
  completedToday(): number {
    const start = new Date()
    start.setHours(0, 0, 0, 0)
    const startMs = start.getTime()
    return Object.values(this.getAll()).filter((e) => e.updatedAt >= startMs).length
  },

  reset(): void {
    storage.remove(STORAGE_KEY)
  },
}
