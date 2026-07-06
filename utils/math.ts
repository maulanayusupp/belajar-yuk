import { shuffle, clamp } from './array'

// Helper khusus pelajaran Matematika.

/**
 * Buat pilihan jawaban (pilihan ganda) di sekitar jawaban benar.
 * Selalu menyertakan jawaban benar, sisanya "pengecoh" terdekat,
 * lalu diacak. Tidak pernah bernilai negatif.
 */
export function generateNumberOptions(answer: number, count = 4): number[] {
  const options = new Set<number>([answer])
  let delta = 1
  while (options.size < count) {
    options.add(clamp(answer + delta, 0, 999))
    options.add(clamp(answer - delta, 0, 999))
    delta++
  }
  return shuffle([...options].slice(0, count))
}
