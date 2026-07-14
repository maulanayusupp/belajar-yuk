import { storage } from '~/utils/storage'

// Kumpulan "kesalahan" untuk diulang (spaced repetition ala Kumon).
// Kunci = `${lessonId}::${itemId}` (itemId = id kata atau id soal).
const KEY = 'belajar-yuk:mistakes'

function makeKey(lessonId: string, itemId: string): string {
  return `${lessonId}::${itemId}`
}

export const mistakeService = {
  all(): string[] {
    return storage.get<string[]>(KEY, [])
  },

  /** Catat kesalahan (dipanggil saat jawaban salah). */
  add(lessonId: string, itemId: string): void {
    const set = new Set(this.all())
    set.add(makeKey(lessonId, itemId))
    storage.set(KEY, [...set])
  },

  /** Hapus (dipanggil saat item dijawab benar → dianggap dikuasai). */
  remove(lessonId: string, itemId: string): void {
    const key = makeKey(lessonId, itemId)
    storage.set(
      KEY,
      this.all().filter((k) => k !== key),
    )
  },

  /** Daftar {lessonId, itemId} yang perlu diulang. */
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
