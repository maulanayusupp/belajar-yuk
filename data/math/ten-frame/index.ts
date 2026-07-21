import type { MathLesson } from '~/types'

// "Ten Frame" method — a 2×5 grid filled with dots.
// Builds "number sense" (subitizing) & an understanding of 10.
// operandB is unused (0); answer = operandA (the number of dots).
export const tenFrame: MathLesson = {
  id: 'mt-ten-frame',
  subject: 'math',
  type: 'math-method',
  method: 'ten-frame',
  methodLabel: 'Sepuluh Kotak (Ten Frame)',
  title: 'Sepuluh Kotak',
  titleEn: 'Ten Frame',
  level: 'beginner',
  emoji: '🔟',
  durationMin: 6,
  problems: [
    { id: 'tf1', operandA: 4, operandB: 0, operator: '+', answer: 4 },
    { id: 'tf2', operandA: 7, operandB: 0, operator: '+', answer: 7 },
    { id: 'tf3', operandA: 6, operandB: 0, operator: '+', answer: 6 },
    { id: 'tf4', operandA: 9, operandB: 0, operator: '+', answer: 9 },
    { id: 'tf5', operandA: 5, operandB: 0, operator: '+', answer: 5 },
  ],
}
