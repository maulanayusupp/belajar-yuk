import type { EnglishLesson } from '~/types'

// Kosakata: Alam (Pemula).
export const nature: EnglishLesson = {
  id: 'en-nature',
  subject: 'english',
  type: 'vocabulary',
  title: 'Alam',
  titleEn: 'Nature',
  level: 'beginner',
  emoji: '🌳',
  durationMin: 5,
  items: [
    { id: 'sun', word: 'Sun', translation: 'Matahari', emoji: '☀️', example: 'The sun is bright.' },
    { id: 'moon', word: 'Moon', translation: 'Bulan', emoji: '🌙', example: 'The moon at night.' },
    { id: 'tree', word: 'Tree', translation: 'Pohon', emoji: '🌳', example: 'A tall tree.' },
    { id: 'flower', word: 'Flower', translation: 'Bunga', emoji: '🌸', example: 'A pink flower.' },
    {
      id: 'mountain',
      word: 'Mountain',
      translation: 'Gunung',
      emoji: '⛰️',
      example: 'A high mountain.',
    },
    { id: 'river', word: 'River', translation: 'Sungai', emoji: '🏞️', example: 'The river flows.' },
  ],
}
