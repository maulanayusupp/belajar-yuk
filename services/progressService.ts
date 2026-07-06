import type { LessonProgress } from '~/types'
import { storage } from '~/utils/storage'
import { clamp } from '~/utils/array'

const STORAGE_KEY = 'belajar-yuk:progress'

/** Target jumlah pelajaran per hari (untuk "Target Harian"). */
export const DAILY_GOAL = 3

type ProgressMap = Record<string, LessonProgress>

// Menyimpan & membaca progres belajar dari localStorage.
// Terpisah dari UI supaya mudah diganti (mis. ke backend) nanti.
export const progressService = {
  getAll(): ProgressMap {
    return storage.get<ProgressMap>(STORAGE_KEY, {})
  },

  get(lessonId: string): LessonProgress | null {
    return this.getAll()[lessonId] ?? null
  },

  /**
   * Simpan hasil satu pelajaran. Bintang hanya naik, tidak turun,
   * supaya anak tidak "kehilangan" bintang yang sudah didapat.
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

  /** Jumlah pelajaran yang dikerjakan hari ini (untuk target harian). */
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
