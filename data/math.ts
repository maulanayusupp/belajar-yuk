import type { MathLesson } from '~/types'

// Konten pelajaran Matematika memakai metode Singapore Math.
//
// - "Number Bond" (Ikatan Bilangan): memvisualkan bahwa sebuah
//   angka "utuh" terbentuk dari dua "bagian". Membangun fondasi
//   penjumlahan & pengurangan.
// - "Block Addition": pendekatan Concrete–Pictorial–Abstract (CPA),
//   anak menghitung blok nyata sebelum melihat angka.
export const mathLessons: MathLesson[] = [
  {
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
  },
  {
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
  },
]
