import type { MathLesson } from '~/types'

// Number patterns / skip-counting — "what comes next?". The last item of each
// `sequence` is the answer (shown as "?"). `operandA`/`operandB` (start/step)
// are kept for the data shape but not displayed.
export const patterns: MathLesson = {
  id: 'mt-patterns',
  subject: 'math',
  type: 'math-method',
  title: 'Pola Bilangan',
  titleEn: 'Number Patterns',
  level: 'intermediate',
  method: 'pattern',
  methodLabel: 'Pola Bilangan',
  emoji: '🔢',
  durationMin: 6,
  problems: [
    { id: 'pat-2s', operandA: 2, operandB: 2, answer: 8, sequence: [2, 4, 6, 8] },
    { id: 'pat-1s', operandA: 1, operandB: 1, answer: 5, sequence: [2, 3, 4, 5] },
    { id: 'pat-5s', operandA: 5, operandB: 5, answer: 20, sequence: [5, 10, 15, 20] },
    { id: 'pat-3s', operandA: 3, operandB: 3, answer: 12, sequence: [3, 6, 9, 12] },
    { id: 'pat-10s', operandA: 10, operandB: 10, answer: 40, sequence: [10, 20, 30, 40] },
    { id: 'pat-down', operandA: 20, operandB: 2, answer: 14, sequence: [20, 18, 16, 14] },
  ],
}
