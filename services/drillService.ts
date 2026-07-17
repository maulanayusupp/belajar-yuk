import type { DrillBest, DrillMode, DrillQuestion } from '~/types'
import { storage } from '~/utils/storage'
import { generateNumberOptions, randInt } from '~/utils/math'

// Timed fluency drills ("Latihan Kilat") — Kumon-style speed + accuracy
// practice for automaticity. Separate from lessons: no progress/mistake
// coupling, just a personal best per mode stored in localStorage.

/** How long one drill session lasts, in seconds. */
export const DRILL_DURATION = 60

export interface DrillModeMeta {
  id: DrillMode
  icon: string
  label: string
  description: string
}

// Registry of drill modes (add a new mode = entry here + a case in makeQuestion).
export const drillModes: DrillModeMeta[] = [
  { id: 'add-10', icon: '➕', label: 'Tambah s/d 10', description: 'Penjumlahan cepat sampai 10.' },
  { id: 'add-20', icon: '➕', label: 'Tambah s/d 20', description: 'Penjumlahan cepat sampai 20.' },
  { id: 'sub-10', icon: '➖', label: 'Kurang s/d 10', description: 'Pengurangan cepat sampai 10.' },
  {
    id: 'bond-10',
    icon: '🔗',
    label: 'Pasangan 10',
    description: 'Cari pasangan agar berjumlah 10.',
  },
  { id: 'mixed', icon: '🎲', label: 'Campur', description: 'Campuran semua jenis soal.' },
]

const KEY_PREFIX = 'belajar-yuk:drillBest:'

function makeId(a: number, b: number, op: string): string {
  return `${a}${op}${b}`
}

/** Build a single question for a mode (called client-side during a drill). */
export function makeQuestion(mode: DrillMode): DrillQuestion {
  const pick: DrillMode =
    mode === 'mixed' ? (['add-10', 'sub-10', 'bond-10'] as const)[randInt(0, 2)] : mode

  if (pick === 'bond-10') {
    const a = randInt(0, 10)
    const answer = 10 - a
    return { id: makeId(a, answer, 'bond'), prompt: `${a} + ▢ = 10`, answer, options: opts(answer) }
  }
  if (pick === 'sub-10') {
    const a = randInt(1, 10)
    const b = randInt(0, a)
    return { id: makeId(a, b, '-'), prompt: `${a} − ${b}`, answer: a - b, options: opts(a - b) }
  }
  if (pick === 'add-20') {
    const a = randInt(1, 15)
    const b = randInt(0, 20 - a)
    return { id: makeId(a, b, '+'), prompt: `${a} + ${b}`, answer: a + b, options: opts(a + b) }
  }
  // add-10 (default)
  const a = randInt(0, 10)
  const b = randInt(0, 10 - a)
  return { id: makeId(a, b, '+'), prompt: `${a} + ${b}`, answer: a + b, options: opts(a + b) }
}

function opts(answer: number): number[] {
  return generateNumberOptions(answer, 4)
}

export const drillService = {
  modes(): DrillModeMeta[] {
    return drillModes
  },

  getMeta(mode: DrillMode): DrillModeMeta {
    return drillModes.find((m) => m.id === mode) ?? drillModes[0]
  },

  getBest(mode: DrillMode): DrillBest | null {
    return storage.get<DrillBest | null>(KEY_PREFIX + mode, null)
  },

  /**
   * Save a session score. Keeps the highest score as the personal best.
   * Returns whether this session set a new record.
   */
  saveScore(mode: DrillMode, score: number, accuracy: number, now: number): { isBest: boolean } {
    const prev = this.getBest(mode)
    if (prev && score <= prev.score) return { isBest: false }
    storage.set<DrillBest>(KEY_PREFIX + mode, { score, accuracy, updatedAt: now })
    return { isBest: true }
  },
}
