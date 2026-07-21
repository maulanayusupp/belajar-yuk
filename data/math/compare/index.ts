import type { MathLesson } from '~/types'

// Comparing two numbers (>, <, =). operator 'compare'; `answer`
// is unused (the symbol is computed from operandA vs operandB at play time).
export const compare: MathLesson = {
  id: 'mt-compare',
  subject: 'math',
  type: 'math-method',
  method: 'compare',
  methodLabel: 'Membandingkan Bilangan',
  title: 'Membandingkan Bilangan',
  titleEn: 'Comparing Numbers',
  level: 'advanced',
  emoji: '⚖️',
  durationMin: 6,
  problems: [
    { id: 'cmp1', operandA: 3, operandB: 5, operator: 'compare', answer: 0 },
    { id: 'cmp2', operandA: 7, operandB: 7, operator: 'compare', answer: 0 },
    { id: 'cmp3', operandA: 9, operandB: 4, operator: 'compare', answer: 0 },
    { id: 'cmp4', operandA: 6, operandB: 8, operator: 'compare', answer: 0 },
    { id: 'cmp5', operandA: 10, operandB: 10, operator: 'compare', answer: 0 },
    { id: 'cmp6', operandA: 12, operandB: 8, operator: 'compare', answer: 0 },
  ],
}
