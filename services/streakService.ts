import { storage } from '~/utils/storage'

// Study-day streak to encourage the child to learn every day.
export interface Streak {
  count: number // current streak
  best: number // longest record
  lastDate: string // last study date (YYYY-M-D)
}

const KEY = 'belajar-yuk:streak'
const EMPTY: Streak = { count: 0, best: 0, lastDate: '' }

// Local date key (safe to call in the browser).
function dayKey(offset = 0): string {
  const d = new Date()
  d.setDate(d.getDate() - offset)
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

export const streakService = {
  get(): Streak {
    return storage.get<Streak>(KEY, { ...EMPTY })
  },

  /** The streak is still "alive" if the last study was today or yesterday. */
  isAlive(s: Streak): boolean {
    return s.lastDate === dayKey(0) || s.lastDate === dayKey(1)
  },

  /** The actual current streak (0 if it has been broken). */
  current(): number {
    const s = this.get()
    return this.isAlive(s) ? s.count : 0
  },

  /** Record study activity for today. Called when a lesson is completed. */
  record(): Streak {
    const s = this.get()
    const today = dayKey(0)
    if (s.lastDate === today) return s // already recorded today
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
