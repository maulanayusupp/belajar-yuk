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
      why: 'Idiom "piece of cake" berarti sangat mudah, bukan sepotong kue betulan.',
    },
    {
      id: 'break-a-leg',
      word: 'Break a leg',
      translation: 'Semoga sukses',
      emoji: '🍀',
      example: 'Break a leg on stage!',
      why: 'Idiom "break a leg" berarti semoga sukses, bukan mematahkan kaki.',
    },
    {
      id: 'under-the-weather',
      word: 'Under the weather',
      translation: 'Kurang enak badan',
      emoji: '🤧',
      example: 'I feel under the weather today.',
      why: 'Idiom "under the weather" berarti kurang sehat, bukan di bawah cuaca.',
    },
    {
      id: 'hit-the-books',
      word: 'Hit the books',
      translation: 'Belajar dengan giat',
      emoji: '📚',
      example: 'I must hit the books tonight.',
      why: 'Idiom "hit the books" berarti belajar giat, bukan memukul buku.',
    },
    {
      id: 'blue-moon',
      word: 'Once in a blue moon',
      translation: 'Jarang sekali',
      emoji: '🌙',
      example: 'We meet once in a blue moon.',
      why: 'Idiom "once in a blue moon" berarti jarang sekali terjadi.',
    },
    {
      id: 'call-it-a-day',
      word: 'Call it a day',
      translation: 'Berhenti / sudahi',
      emoji: '🌇',
      example: "Let's call it a day.",
      why: 'Idiom "call it a day" berarti mengakhiri kegiatan untuk hari itu.',
    },
  ],
}
