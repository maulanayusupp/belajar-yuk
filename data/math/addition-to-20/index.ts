import type { MathLesson } from '~/types'

// Penjumlahan sampai 20 dengan blok (lanjutan).
export const additionTo20: MathLesson = {
  id: 'mt-addition-to-20',
  subject: 'math',
  type: 'singapore-math',
  method: 'block-addition',
  methodLabel: 'Singapore Math — Concrete–Pictorial–Abstract',
  title: 'Menjumlah sampai 20',
  titleEn: 'Adding to 20',
  level: 'beginner',
  emoji: '➕',
  durationMin: 7,
  problems: [
    { id: 'a20-1', operandA: 6, operandB: 7, operator: '+', answer: 13 },
    { id: 'a20-2', operandA: 8, operandB: 5, operator: '+', answer: 13 },
    { id: 'a20-3', operandA: 9, operandB: 8, operator: '+', answer: 17 },
    { id: 'a20-4', operandA: 7, operandB: 9, operator: '+', answer: 16 },
  ],
}
