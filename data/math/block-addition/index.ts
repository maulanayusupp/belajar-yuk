import type { MathLesson } from '~/types'

// Metode "Block Addition" — pendekatan Concrete–Pictorial–Abstract (CPA):
// anak menghitung blok nyata sebelum melihat angka.
// Aset khusus pelajaran ini boleh diletakkan di folder yang sama.
export const blockAddition: MathLesson = {
  id: 'mt-block-addition',
  subject: 'math',
  type: 'singapore-math',
  method: 'block-addition',
  methodLabel: 'Singapore Math — Concrete–Pictorial–Abstract',
  title: 'Menjumlah dengan Blok',
  titleEn: 'Adding with Blocks',
  level: 'beginner',
  emoji: '🧱',
  durationMin: 6,
  problems: [
    { id: 'ba1', operandA: 1, operandB: 2, operator: '+', answer: 3 },
    { id: 'ba2', operandA: 3, operandB: 3, operator: '+', answer: 6 },
    { id: 'ba3', operandA: 2, operandB: 4, operator: '+', answer: 6 },
    { id: 'ba4', operandA: 4, operandB: 5, operator: '+', answer: 9 },
  ],
}
