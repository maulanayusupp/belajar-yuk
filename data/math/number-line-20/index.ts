import type { MathLesson } from '~/types'

// Number Line 0–20: recognize the number at the marker (larger numbers).
export const numberLine20: MathLesson = {
  id: 'mt-number-line-20',
  subject: 'math',
  type: 'singapore-math',
  method: 'number-line',
  methodLabel: 'Singapore Math — Garis Bilangan (0–20)',
  title: 'Garis Bilangan 0–20',
  titleEn: 'Number Line to 20',
  level: 'beginner',
  emoji: '📐',
  durationMin: 6,
  problems: [
    { id: 'nl20-1', operandA: 12, operandB: 0, operator: '+', answer: 12 },
    { id: 'nl20-2', operandA: 17, operandB: 0, operator: '+', answer: 17 },
    { id: 'nl20-3', operandA: 14, operandB: 0, operator: '+', answer: 14 },
    { id: 'nl20-4', operandA: 20, operandB: 0, operator: '+', answer: 20 },
    { id: 'nl20-5', operandA: 16, operandB: 0, operator: '+', answer: 16 },
  ],
}
