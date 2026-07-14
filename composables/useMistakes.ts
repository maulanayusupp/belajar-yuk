import { mistakeService } from '~/services/mistakeService'
import { lessonService, type ReviewQuestion } from '~/services/lessonService'

// Kesalahan yang perlu diulang (reaktif untuk badge & halaman Ulangi).
export function useMistakes() {
  const count = useState<number>('mistakes-count', () => 0)

  onMounted(() => {
    count.value = mistakeService.count()
  })

  function refresh() {
    count.value = mistakeService.count()
  }

  /** Soal MCQ hasil normalisasi dari kesalahan tersimpan. */
  function questions(): ReviewQuestion[] {
    return lessonService.getReviewQuestions(mistakeService.list())
  }

  /** Tandai satu item sudah dikuasai (hapus dari daftar ulang). */
  function resolve(lessonId: string, itemId: string) {
    mistakeService.remove(lessonId, itemId)
    count.value = mistakeService.count()
  }

  return { count, refresh, questions, resolve }
}
