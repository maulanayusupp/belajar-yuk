import type { MathLesson } from '~/types'

// "Block Addition" method — the Concrete–Pictorial–Abstract (CPA) approach:
// the child counts real blocks before seeing the numbers.
// Assets specific to this lesson may be placed in the same folder.
export const blockAddition: MathLesson = {
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
}
