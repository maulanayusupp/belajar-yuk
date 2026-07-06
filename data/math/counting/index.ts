import type { MathLesson } from '~/types'

// Metode "Counting" — menghitung banyak benda. Anak menghitung emoji
// yang ditampilkan lalu memilih jumlah yang benar.
// operandB tidak dipakai (0); `emoji` menentukan benda yang dihitung.
export const counting: MathLesson = {
  id: 'mt-counting',
  subject: 'math',
  type: 'singapore-math',
  method: 'counting',
  methodLabel: 'Singapore Math — Menghitung Benda',
  title: 'Ayo Berhitung',
  titleEn: 'Count the Objects',
  level: 'beginner',
  emoji: '🍎',
  durationMin: 5,
  problems: [
    { id: 'ct1', operandA: 3, operandB: 0, operator: '+', answer: 3, emoji: '🍎' },
    { id: 'ct2', operandA: 5, operandB: 0, operator: '+', answer: 5, emoji: '🐟' },
    { id: 'ct3', operandA: 4, operandB: 0, operator: '+', answer: 4, emoji: '⭐' },
    { id: 'ct4', operandA: 6, operandB: 0, operator: '+', answer: 6, emoji: '🎈' },
    { id: 'ct5', operandA: 7, operandB: 0, operator: '+', answer: 7, emoji: '🌸' },
  ],
}
