import type { LessonProgress } from '~/types'
import { progressService } from '~/services/progressService'
import { streakService } from '~/services/streakService'

// Reactive progress composable. Wraps progressService so that
// changes automatically update the view (lesson map, stars).
export function useProgress() {
  // Global & reactive progress map; populated on the client.
  const progress = useState<Record<string, LessonProgress>>('lesson-progress', () => ({}))

  // Load from localStorage once on the client side.
  onMounted(() => {
    if (Object.keys(progress.value).length === 0) {
      progress.value = progressService.getAll()
    }
  })

  function saveResult(lessonId: string, stars: number) {
    const entry = progressService.save(lessonId, stars)
    progress.value = { ...progress.value, [lessonId]: entry }
    streakService.record() // record the study-day streak
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
