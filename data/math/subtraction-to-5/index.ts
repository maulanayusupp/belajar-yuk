import type { MathLesson } from '~/types'

// Subtraction up to 5 — the first step in subtracting.
export const subtractionTo5: MathLesson = {
  id: 'mt-subtraction-to-5',
  subject: 'math',
  type: 'math-method',
  method: 'block-subtraction',
  methodLabel: 'Pengurangan dengan Blok',
  title: 'Mengurang sampai 5',
  titleEn: 'Subtracting within 5',
  level: 'beginner',
  emoji: '➖',
  durationMin: 5,
  problems: [
    { id: 's5-1', operandA: 2, operandB: 1, operator: '-', answer: 1 },
    { id: 's5-2', operandA: 3, operandB: 1, operator: '-', answer: 2 },
    { id: 's5-3', operandA: 4, operandB: 2, operator: '-', answer: 2 },
    { id: 's5-4', operandA: 5, operandB: 3, operator: '-', answer: 2 },
  ],
}
