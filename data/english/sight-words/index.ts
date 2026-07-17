import type { EnglishLesson } from '~/types'

// Sight Words — common, frequently occurring words (Dolch pre-primer),
// a foundation for reading fluency in developed-country curricula.
export const sightWords: EnglishLesson = {
  id: 'en-sight-words',
  subject: 'english',
  type: 'vocabulary',
  title: 'Kata Umum',
  titleEn: 'Sight Words',
  level: 'beginner',
  emoji: '📗',
  durationMin: 6,
  items: [
    { id: 'i', word: 'I', translation: 'Aku', emoji: '🙋', example: 'I can read.' },
    { id: 'you', word: 'You', translation: 'Kamu', emoji: '👉', example: 'You are kind.' },
    {
      id: 'the',
      word: 'The',
      translation: 'Itu (kata sandang)',
      emoji: '📗',
      example: 'The cat is here.',
    },
    { id: 'and', word: 'And', translation: 'Dan', emoji: '➕', example: 'You and me.' },
    { id: 'see', word: 'See', translation: 'Lihat', emoji: '👀', example: 'I see a dog.' },
    { id: 'go', word: 'Go', translation: 'Pergi', emoji: '🏃', example: 'Let us go!' },
    { id: 'my', word: 'My', translation: 'Milikku', emoji: '🫰', example: 'My ball is red.' },
    { id: 'we', word: 'We', translation: 'Kami', emoji: '👨‍👩‍👧', example: 'We are friends.' },
  ],
}
