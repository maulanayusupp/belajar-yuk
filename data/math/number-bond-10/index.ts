import type { MathLesson } from '~/types'

// Metode "Number Bond" (Ikatan Bilangan): memvisualkan bahwa sebuah
// angka "utuh" terbentuk dari dua "bagian". Fondasi penjumlahan.
// Aset khusus pelajaran ini boleh diletakkan di folder yang sama.
export const numberBond10: MathLesson = {
  id: 'mt-number-bond-10',
  subject: 'math',
  type: 'singapore-math',
  method: 'number-bond',
  methodLabel: 'Singapore Math — Ikatan Bilangan (Number Bond)',
  title: 'Ikatan Bilangan sampai 10',
  titleEn: 'Number Bonds to 10',
  level: 'beginner',
  emoji: '🔟',
  durationMin: 6,
  problems: [
    { id: 'nb1', operandA: 2, operandB: 3, operator: '+', answer: 5 },
    { id: 'nb2', operandA: 4, operandB: 2, operator: '+', answer: 6 },
    { id: 'nb3', operandA: 5, operandB: 3, operator: '+', answer: 8 },
    { id: 'nb4', operandA: 6, operandB: 4, operator: '+', answer: 10 },
    { id: 'nb5', operandA: 3, operandB: 4, operator: '+', answer: 7 },
  ],
}
