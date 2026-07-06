import type { LessonProgress } from '~/types'
import { progressService } from '~/services/progressService'

// Composable progres reaktif. Membungkus progressService agar
// perubahan otomatis memperbarui tampilan (peta pelajaran, bintang).
export function useProgress() {
  // Map progres global & reaktif; diisi di klien.
  const progress = useState<Record<string, LessonProgress>>('lesson-progress', () => ({}))

  // Muat dari localStorage sekali di sisi klien.
  onMounted(() => {
    if (Object.keys(progress.value).length === 0) {
      progress.value = progressService.getAll()
    }
  })

  function saveResult(lessonId: string, stars: number) {
    const entry = progressService.save(lessonId, stars)
    progress.value = { ...progress.value, [lessonId]: entry }
    return entry
  }

  function getStars(lessonId: string): number {
    return progress.value[lessonId]?.stars ?? 0
  }

  function isCompleted(lessonId: string): boolean {
    return progress.value[lessonId]?.completed ?? false
  }

  function resetAll() {
    progressService.reset()
    progress.value = {}
  }

  return { progress, saveResult, getStars, isCompleted, resetAll }
}
