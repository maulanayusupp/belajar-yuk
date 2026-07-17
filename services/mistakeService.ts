import { storage } from '~/utils/storage'

// Collection of "mistakes" to review (Kumon-style spaced repetition).
// Key = `${lessonId}::${itemId}` (itemId = word id or problem id).
const KEY = 'belajar-yuk:mistakes'

function makeKey(lessonId: string, itemId: string): string {
  return `${lessonId}::${itemId}`
}

export const mistakeService = {
  all(): string[] {
    return storage.get<string[]>(KEY, [])
  },

  /** Record a mistake (called on a wrong answer). */
  add(lessonId: string, itemId: string): void {
    const set = new Set(this.all())
    set.add(makeKey(lessonId, itemId))
    storage.set(KEY, [...set])
  },

  /** Remove (called when an item is answered correctly → considered mastered). */
  remove(lessonId: string, itemId: string): void {
    const key = makeKey(lessonId, itemId)
    storage.set(
      KEY,
      this.all().filter((k) => k !== key),
    )
  },

  /** List of {lessonId, itemId} that need to be reviewed. */
  list(): Array<{ lessonId: string; itemId: string }> {
    return this.all().map((k) => {
      const [lessonId, itemId] = k.split('::')
      return { lessonId, itemId }
    })
  },

  count(): number {
    return this.all().length
  },

  clear(): void {
    storage.remove(KEY)
  },
}
