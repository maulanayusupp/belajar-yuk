import type { MathLesson } from '~/types'

// Menghitung benda sampai 20.
export const countingTo20: MathLesson = {
  id: 'mt-counting-to-20',
  subject: 'math',
  type: 'singapore-math',
  method: 'counting',
  methodLabel: 'Singapore Math — Menghitung Benda',
  title: 'Berhitung sampai 20',
  titleEn: 'Count to 20',
  level: 'beginner',
  emoji: '🐝',
  durationMin: 6,
  problems: [
    { id: 'c20-1', operandA: 12, operandB: 0, operator: '+', answer: 12, emoji: '🐝' },
    { id: 'c20-2', operandA: 15, operandB: 0, operator: '+', answer: 15, emoji: '⭐' },
    { id: 'c20-3', operandA: 18, operandB: 0, operator: '+', answer: 18, emoji: '🍓' },
    { id: 'c20-4', operandA: 20, operandB: 0, operator: '+', answer: 20, emoji: '🔵' },
    { id: 'c20-5', operandA: 14, operandB: 0, operator: '+', answer: 14, emoji: '🌸' },
  ],
}
