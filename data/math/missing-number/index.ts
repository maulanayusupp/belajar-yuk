import type { MathLesson } from '~/types'

// Cari bilangan hilang: `operandA + ▢ = answer`. Bagian yang hilang
// (jawaban yang dipilih) = operandB. Melatih hubungan bagian–keseluruhan.
export const missingNumber: MathLesson = {
  id: 'mt-missing-number',
  subject: 'math',
  type: 'singapore-math',
  method: 'missing-number',
  methodLabel: 'Singapore Math — Cari Bilangan Hilang',
  title: 'Cari Bilangan Hilang',
  titleEn: 'Missing Number',
  level: 'intermediate',
  emoji: '❓',
  durationMin: 6,
  problems: [
    { id: 'mn1', operandA: 3, operandB: 2, operator: '+', answer: 5 },
    { id: 'mn2', operandA: 6, operandB: 4, operator: '+', answer: 10 },
    { id: 'mn3', operandA: 7, operandB: 5, operator: '+', answer: 12 },
    { id: 'mn4', operandA: 8, operandB: 3, operator: '+', answer: 11 },
    { id: 'mn5', operandA: 9, operandB: 6, operator: '+', answer: 15 },
  ],
}
