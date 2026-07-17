// Pure array helpers (pure functions) — easy to test & reuse.

/** Return a shuffled copy of the array (Fisher–Yates algorithm). */
export function shuffle<T>(input: readonly T[]): T[] {
  const arr = [...input]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/** Pick a random element. */
export function sample<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

/** Create a sequence of numbers 0..n-1 — useful for rendering blocks/loops in templates. */
export function range(n: number): number[] {
  return Array.from({ length: Math.max(0, n) }, (_, i) => i)
}

/** Clamp a value to the range [min, max]. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
