import type { MathLesson } from '~/types'

// Metode "Ten Frame" (Sepuluh Kotak) — kerangka 2×5 yang diisi titik.
// Membangun "rasa angka" (subitizing) & pemahaman terhadap 10.
// operandB tidak dipakai (0); jawaban = operandA (jumlah titik).
export const tenFrame: MathLesson = {
  id: 'mt-ten-frame',
  subject: 'math',
  type: 'singapore-math',
  method: 'ten-frame',
  methodLabel: 'Singapore Math — Sepuluh Kotak (Ten Frame)',
  title: 'Sepuluh Kotak',
  titleEn: 'Ten Frame',
  level: 'beginner',
  emoji: '🔟',
  durationMin: 6,
  problems: [
    { id: 'tf1', operandA: 4, operandB: 0, operator: '+', answer: 4 },
    { id: 'tf2', operandA: 7, operandB: 0, operator: '+', answer: 7 },
    { id: 'tf3', operandA: 6, operandB: 0, operator: '+', answer: 6 },
    { id: 'tf4', operandA: 9, operandB: 0, operator: '+', answer: 9 },
    { id: 'tf5', operandA: 5, operandB: 0, operator: '+', answer: 5 },
  ],
}
