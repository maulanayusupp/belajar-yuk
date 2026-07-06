import type { MathLesson } from '~/types'

// Penjumlahan sampai 5 dengan blok — langkah pertama berhitung.
export const additionTo5: MathLesson = {
  id: 'mt-addition-to-5',
  subject: 'math',
  type: 'singapore-math',
  method: 'block-addition',
  methodLabel: 'Singapore Math — Concrete–Pictorial–Abstract',
  title: 'Menjumlah sampai 5',
  titleEn: 'Adding to 5',
  level: 'beginner',
  emoji: '➕',
  durationMin: 5,
  problems: [
    { id: 'a5-1', operandA: 1, operandB: 1, operator: '+', answer: 2 },
    { id: 'a5-2', operandA: 2, operandB: 1, operator: '+', answer: 3 },
    { id: 'a5-3', operandA: 2, operandB: 2, operator: '+', answer: 4 },
    { id: 'a5-4', operandA: 3, operandB: 2, operator: '+', answer: 5 },
  ],
}
