import type { MathLesson } from '~/types'

// Reading the clock (o'clock). `answer` = the hour shown; the clock face is
// drawn from it. `operandA` mirrors the hour for the data shape (not displayed).
// Hours chosen so the number options stay within a sensible 1–12 range.
export const clock: MathLesson = {
  id: 'mt-clock',
  subject: 'math',
  type: 'math-method',
  title: 'Membaca Jam',
  titleEn: 'Telling Time (o’clock)',
  level: 'intermediate',
  method: 'clock',
  methodLabel: 'Membaca Jam',
  emoji: '🕐',
  durationMin: 6,
  problems: [
    { id: 'clk-3', operandA: 3, operandB: 0, answer: 3 },
    { id: 'clk-6', operandA: 6, operandB: 0, answer: 6 },
    { id: 'clk-9', operandA: 9, operandB: 0, answer: 9 },
    { id: 'clk-4', operandA: 4, operandB: 0, answer: 4 },
    { id: 'clk-7', operandA: 7, operandB: 0, answer: 7 },
    { id: 'clk-5', operandA: 5, operandB: 0, answer: 5 },
  ],
}
