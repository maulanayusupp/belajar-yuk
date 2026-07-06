import type { MathLesson } from '~/types'

// Metode "Block Subtraction" — pengurangan dengan blok: mulai dari
// sejumlah blok, lalu "ambil" sebagian (blok memudar & dicoret).
export const subtraction: MathLesson = {
  id: 'mt-subtraction',
  subject: 'math',
  type: 'singapore-math',
  method: 'block-subtraction',
  methodLabel: 'Singapore Math — Pengurangan dengan Blok',
  title: 'Mengurang dengan Blok',
  titleEn: 'Taking Away',
  level: 'beginner',
  emoji: '➖',
  durationMin: 6,
  problems: [
    { id: 'sb1', operandA: 3, operandB: 1, operator: '-', answer: 2 },
    { id: 'sb2', operandA: 5, operandB: 2, operator: '-', answer: 3 },
    { id: 'sb3', operandA: 6, operandB: 4, operator: '-', answer: 2 },
    { id: 'sb4', operandA: 8, operandB: 3, operator: '-', answer: 5 },
    { id: 'sb5', operandA: 7, operandB: 5, operator: '-', answer: 2 },
  ],
}
