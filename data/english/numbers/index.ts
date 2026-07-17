import type { EnglishLesson } from '~/types'

// Vocabulary lesson: Numbers 1–10 (English).
export const numbers: EnglishLesson = {
  id: 'en-numbers',
  subject: 'english',
  type: 'vocabulary',
  title: 'Angka 1–10',
  titleEn: 'Numbers',
  level: 'beginner',
  emoji: '🔢',
  durationMin: 6,
  items: [
    { id: 'one', word: 'One', translation: 'Satu', emoji: '1️⃣', example: 'I have one ball.' },
    { id: 'two', word: 'Two', translation: 'Dua', emoji: '2️⃣', example: 'I see two cats.' },
    {
      id: 'three',
      word: 'Three',
      translation: 'Tiga',
      emoji: '3️⃣',
      example: 'Three little birds.',
    },
    { id: 'four', word: 'Four', translation: 'Empat', emoji: '4️⃣', example: 'Four red apples.' },
    { id: 'five', word: 'Five', translation: 'Lima', emoji: '5️⃣', example: 'Give me five!' },
    { id: 'six', word: 'Six', translation: 'Enam', emoji: '6️⃣', example: 'Six yellow stars.' },
    {
      id: 'seven',
      word: 'Seven',
      translation: 'Tujuh',
      emoji: '7️⃣',
      example: 'Seven days a week.',
    },
    {
      id: 'eight',
      word: 'Eight',
      translation: 'Delapan',
      emoji: '8️⃣',
      example: 'Eight legs on a spider.',
    },
    { id: 'nine', word: 'Nine', translation: 'Sembilan', emoji: '9️⃣', example: 'Nine happy kids.' },
    { id: 'ten', word: 'Ten', translation: 'Sepuluh', emoji: '🔟', example: 'Ten little fingers.' },
  ],
}
