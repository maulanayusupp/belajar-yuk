import { shuffle, clamp } from './array'

// Helpers specific to Math lessons.

/**
 * Build answer options (multiple choice) around the correct answer.
 * Always includes the correct answer, with the rest as the nearest
 * "distractors", then shuffled. Never negative.
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
