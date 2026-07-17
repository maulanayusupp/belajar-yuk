import type { MathLesson } from '~/types'

// Number Bonds up to 20 (continuation of number-bond-10).
export const numberBond20: MathLesson = {
  id: 'mt-number-bond-20',
  subject: 'math',
  type: 'singapore-math',
  method: 'number-bond',
  methodLabel: 'Singapore Math — Ikatan Bilangan (Number Bond)',
  title: 'Ikatan Bilangan sampai 20',
  titleEn: 'Number Bonds to 20',
  level: 'beginner',
  emoji: '🧩',
  durationMin: 7,
  problems: [
    { id: 'nb20-1', operandA: 8, operandB: 4, operator: '+', answer: 12 },
    { id: 'nb20-2', operandA: 9, operandB: 6, operator: '+', answer: 15 },
    { id: 'nb20-3', operandA: 7, operandB: 7, operator: '+', answer: 14 },
    { id: 'nb20-4', operandA: 10, operandB: 8, operator: '+', answer: 18 },
    { id: 'nb20-5', operandA: 6, operandB: 9, operator: '+', answer: 15 },
  ],
}
