import type { MathLesson } from '~/types'

// Teen numbers (11–20) = ten + ones. Shown on TWO
// "Ten Frames" (one full + the rest) to build place value.
// Common Core K.NBT.A.1. operandB is unused; answer = operandA.
export const teenNumbers: MathLesson = {
  id: 'mt-teen-numbers',
  subject: 'math',
  type: 'math-method',
  method: 'ten-frame',
  methodLabel: 'Sepuluh Kotak (Nilai Tempat)',
  title: 'Bilangan Belasan (11–20)',
  titleEn: 'Teen Numbers',
  level: 'beginner',
  emoji: '🔟',
  durationMin: 6,
  problems: [
    { id: 'tn-1', operandA: 11, operandB: 0, operator: '+', answer: 11 },
    { id: 'tn-2', operandA: 13, operandB: 0, operator: '+', answer: 13 },
    { id: 'tn-3', operandA: 16, operandB: 0, operator: '+', answer: 16 },
    { id: 'tn-4', operandA: 19, operandB: 0, operator: '+', answer: 19 },
    { id: 'tn-5', operandA: 20, operandB: 0, operator: '+', answer: 20 },
  ],
}
