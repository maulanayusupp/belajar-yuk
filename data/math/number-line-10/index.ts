import type { MathLesson } from '~/types'

// Number Line 0–10: recognize the number the marker points to.
// operandA = the number at the marker = the answer (operandB 0).
export const numberLine10: MathLesson = {
  id: 'mt-number-line-10',
  subject: 'math',
  type: 'singapore-math',
  method: 'number-line',
  methodLabel: 'Singapore Math — Garis Bilangan (0–10)',
  title: 'Garis Bilangan 0–10',
  titleEn: 'Number Line to 10',
  level: 'beginner',
  emoji: '📏',
  durationMin: 5,
  problems: [
    { id: 'nl10-1', operandA: 3, operandB: 0, operator: '+', answer: 3 },
    { id: 'nl10-2', operandA: 7, operandB: 0, operator: '+', answer: 7 },
    { id: 'nl10-3', operandA: 5, operandB: 0, operator: '+', answer: 5 },
    { id: 'nl10-4', operandA: 9, operandB: 0, operator: '+', answer: 9 },
    { id: 'nl10-5', operandA: 6, operandB: 0, operator: '+', answer: 6 },
  ],
}
