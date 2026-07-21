import type { MathLesson } from '~/types'

// Subtraction up to 20 with blocks (take away/cross out).
export const subtractionTo20: MathLesson = {
  id: 'mt-subtraction-to-20',
  subject: 'math',
  type: 'math-method',
  method: 'block-subtraction',
  methodLabel: 'Pengurangan dengan Blok',
  title: 'Mengurang sampai 20',
  titleEn: 'Subtracting within 20',
  level: 'beginner',
  emoji: '✂️',
  durationMin: 7,
  problems: [
    { id: 's20-1', operandA: 12, operandB: 5, operator: '-', answer: 7 },
    { id: 's20-2', operandA: 15, operandB: 6, operator: '-', answer: 9 },
    { id: 's20-3', operandA: 18, operandB: 9, operator: '-', answer: 9 },
    { id: 's20-4', operandA: 14, operandB: 8, operator: '-', answer: 6 },
  ],
}
