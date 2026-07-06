import { storage } from '~/utils/storage'

// Rentetan hari belajar (streak) untuk mendorong anak belajar tiap hari.
export interface Streak {
  count: number // rentetan berjalan
  best: number // rekor terpanjang
  lastDate: string // tanggal terakhir belajar (YYYY-M-D)
}

const KEY = 'belajar-yuk:streak'
const EMPTY: Streak = { count: 0, best: 0, lastDate: '' }

// Kunci tanggal lokal (aman dipanggil di browser).
function dayKey(offset = 0): string {
  const d = new Date()
  d.setDate(d.getDate() - offset)
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

export const streakService = {
  get(): Streak {
    return storage.get<Streak>(KEY, { ...EMPTY })
  },

  /** Streak masih "hidup" bila terakhir belajar hari ini atau kemarin. */
  isAlive(s: Streak): boolean {
    return s.lastDate === dayKey(0) || s.lastDate === dayKey(1)
  },

  /** Rentetan berjalan aktual (0 bila sudah putus). */
  current(): number {
    const s = this.get()
    return this.isAlive(s) ? s.count : 0
  },

  /** Catat aktivitas belajar hari ini. Dipanggil saat pelajaran selesai. */
  record(): Streak {
    const s = this.get()
    const today = dayKey(0)
    if (s.lastDate === today) return s // sudah tercatat hari ini
    s.count = s.lastDate === dayKey(1) ? s.count + 1 : 1
    s.lastDate = today
    s.best = Math.max(s.best, s.count)
    storage.set(KEY, s)
    return s
  },

  reset(): void {
    storage.remove(KEY)
  },
}
