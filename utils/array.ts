// Helper array murni (pure functions) — mudah diuji & dipakai ulang.

/** Kembalikan salinan array yang teracak (algoritma Fisher–Yates). */
export function shuffle<T>(input: readonly T[]): T[] {
  const arr = [...input]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/** Ambil satu elemen acak. */
export function sample<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

/** Buat deret angka 0..n-1 — berguna untuk merender blok/loop di template. */
export function range(n: number): number[] {
  return Array.from({ length: Math.max(0, n) }, (_, i) => i)
}

/** Batasi nilai pada rentang [min, max]. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
