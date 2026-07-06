import type { EnglishLesson } from '~/types'

// Kosakata: Bentuk (Pemula).
export const shapes: EnglishLesson = {
  id: 'en-shapes',
  subject: 'english',
  type: 'vocabulary',
  title: 'Nama Bentuk',
  titleEn: 'Shapes',
  level: 'beginner',
  emoji: '🔷',
  durationMin: 5,
  items: [
    {
      id: 'circle',
      word: 'Circle',
      translation: 'Lingkaran',
      emoji: '⭕',
      example: 'The ball is a circle.',
    },
    {
      id: 'square',
      word: 'Square',
      translation: 'Persegi',
      emoji: '⬜',
      example: 'A window is a square.',
    },
    {
      id: 'triangle',
      word: 'Triangle',
      translation: 'Segitiga',
      emoji: '🔺',
      example: 'A roof is a triangle.',
    },
    { id: 'star', word: 'Star', translation: 'Bintang', emoji: '⭐', example: 'I see a star.' },
    { id: 'heart', word: 'Heart', translation: 'Hati', emoji: '❤️', example: 'I love you, heart.' },
    {
      id: 'diamond',
      word: 'Diamond',
      translation: 'Wajik',
      emoji: '🔷',
      example: 'A kite is a diamond.',
    },
  ],
}
