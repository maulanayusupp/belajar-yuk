import type { MathLesson } from '~/types'

// Penjumlahan sampai 10 dengan blok.
export const additionTo10: MathLesson = {
  id: 'mt-addition-to-10',
  subject: 'math',
  type: 'singapore-math',
  method: 'block-addition',
  methodLabel: 'Singapore Math — Concrete–Pictorial–Abstract',
  title: 'Menjumlah sampai 10',
  titleEn: 'Adding to 10',
  level: 'beginner',
  emoji: '➕',
  durationMin: 6,
  problems: [
    { id: 'a10-1', operandA: 4, operandB: 3, operator: '+', answer: 7 },
    { id: 'a10-2', operandA: 5, operandB: 4, operator: '+', answer: 9 },
    { id: 'a10-3', operandA: 6, operandB: 2, operator: '+', answer: 8 },
    { id: 'a10-4', operandA: 5, operandB: 5, operator: '+', answer: 10 },
  ],
}
