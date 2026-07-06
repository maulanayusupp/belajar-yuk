import type { Streak } from '~/services/streakService'
import { streakService } from '~/services/streakService'

// Streak reaktif untuk ditampilkan (dashboard, sapaan).
export function useStreak() {
  const streak = useState<Streak>('streak', () => ({ count: 0, best: 0, lastDate: '' }))

  onMounted(() => {
    streak.value = streakService.get()
  })

  const current = computed(() => (streakService.isAlive(streak.value) ? streak.value.count : 0))
  const best = computed(() => streak.value.best)

  function refresh() {
    streak.value = streakService.get()
  }

  function reset() {
    streakService.reset()
    streak.value = { count: 0, best: 0, lastDate: '' }
  }

  return { streak, current, best, refresh, reset }
}
