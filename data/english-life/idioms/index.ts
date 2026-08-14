import type { EnglishLesson } from '~/types'

// Jagoan (advanced): common idioms — figurative expressions. `translation` gives
// the real MEANING (not the literal words). C1-level real-world English.
export const idioms: EnglishLesson = {
  id: 'enl-idioms',
  subject: 'english-life',
  type: 'vocabulary',
  title: 'Idiom Populer',
  titleEn: 'Common Idioms',
  level: 'expert',
  emoji: '💡',
  durationMin: 7,
  items: [
    {
      id: 'piece-of-cake',
      word: 'Piece of cake',
      translation: 'Sangat mudah',
      emoji: '🍰',
      example: 'The test was a piece of cake.',
    },
    {
      id: 'break-a-leg',
      word: 'Break a leg',
      translation: 'Semoga sukses',
      emoji: '🍀',
      example: 'Break a leg on stage!',
    },
    {
      id: 'under-the-weather',
      word: 'Under the weather',
      translation: 'Kurang enak badan',
      emoji: '🤧',
      example: 'I feel under the weather today.',
    },
    {
      id: 'hit-the-books',
      word: 'Hit the books',
      translation: 'Belajar dengan giat',
      emoji: '📚',
      example: 'I must hit the books tonight.',
    },
    {
      id: 'blue-moon',
      word: 'Once in a blue moon',
      translation: 'Jarang sekali',
      emoji: '🌙',
      example: 'We meet once in a blue moon.',
    },
    {
      id: 'call-it-a-day',
      word: 'Call it a day',
      translation: 'Berhenti / sudahi',
      emoji: '🌇',
      example: "Let's call it a day.",
    },
  ],
}
