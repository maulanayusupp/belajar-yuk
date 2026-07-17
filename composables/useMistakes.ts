import { mistakeService } from '~/services/mistakeService'
import { lessonService, type ReviewQuestion } from '~/services/lessonService'

// Mistakes that need reviewing (reactive for the badge & Review page).
export function useMistakes() {
  const count = useState<number>('mistakes-count', () => 0)

  onMounted(() => {
    count.value = mistakeService.count()
  })

  function refresh() {
    count.value = mistakeService.count()
  }

  /** MCQ questions normalized from the stored mistakes. */
  function questions(): ReviewQuestion[] {
    return lessonService.getReviewQuestions(mistakeService.list())
  }

  /** Mark one item as mastered (remove it from the review list). */
  function resolve(lessonId: string, itemId: string) {
    mistakeService.remove(lessonId, itemId)
    count.value = mistakeService.count()
  }

  return { count, refresh, questions, resolve }
}
