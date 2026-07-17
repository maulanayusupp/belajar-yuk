import type { MathLesson } from '~/types'

// Counting objects up to 10 (continuation of basic counting).
export const countingTo10: MathLesson = {
  id: 'mt-counting-to-10',
  subject: 'math',
  type: 'singapore-math',
  method: 'counting',
  methodLabel: 'Singapore Math — Menghitung Benda',
  title: 'Berhitung sampai 10',
  titleEn: 'Count to 10',
  level: 'beginner',
  emoji: '🐤',
  durationMin: 5,
  problems: [
    { id: 'c10-1', operandA: 8, operandB: 0, operator: '+', answer: 8, emoji: '🐤' },
    { id: 'c10-2', operandA: 10, operandB: 0, operator: '+', answer: 10, emoji: '🍓' },
    { id: 'c10-3', operandA: 9, operandB: 0, operator: '+', answer: 9, emoji: '🐞' },
    { id: 'c10-4', operandA: 7, operandB: 0, operator: '+', answer: 7, emoji: '🌟' },
    { id: 'c10-5', operandA: 10, operandB: 0, operator: '+', answer: 10, emoji: '🍎' },
  ],
}
