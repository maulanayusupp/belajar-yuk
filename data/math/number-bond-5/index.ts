import type { MathLesson } from '~/types'

// Number Bonds up to 5 — the easiest version (for those just starting out).
export const numberBond5: MathLesson = {
  id: 'mt-number-bond-5',
  subject: 'math',
  type: 'singapore-math',
  method: 'number-bond',
  methodLabel: 'Singapore Math — Ikatan Bilangan (Number Bond)',
  title: 'Ikatan Bilangan sampai 5',
  titleEn: 'Number Bonds to 5',
  level: 'beginner',
  emoji: '✋',
  durationMin: 5,
  problems: [
    { id: 'nb5-1', operandA: 1, operandB: 1, operator: '+', answer: 2 },
    { id: 'nb5-2', operandA: 2, operandB: 1, operator: '+', answer: 3 },
    { id: 'nb5-3', operandA: 2, operandB: 2, operator: '+', answer: 4 },
    { id: 'nb5-4', operandA: 3, operandB: 2, operator: '+', answer: 5 },
    { id: 'nb5-5', operandA: 1, operandB: 3, operator: '+', answer: 4 },
  ],
}
