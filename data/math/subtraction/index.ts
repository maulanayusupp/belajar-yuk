import type { MathLesson } from '~/types'

// "Block Subtraction" method — subtraction with blocks: start with
// a number of blocks, then "take away" some (blocks fade & get crossed out).
export const subtraction: MathLesson = {
  id: 'mt-subtraction',
  subject: 'math',
  type: 'math-method',
  method: 'block-subtraction',
  methodLabel: 'Pengurangan dengan Blok',
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
