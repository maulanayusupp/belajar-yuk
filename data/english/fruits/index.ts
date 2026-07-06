import type { EnglishLesson } from '~/types'

// Pelajaran kosakata: Nama Buah.
// Aset khusus pelajaran ini boleh diletakkan di folder yang sama.
export const fruits: EnglishLesson = {
  id: 'en-fruits',
  subject: 'english',
  type: 'vocabulary',
  title: 'Nama Buah',
  titleEn: 'Fruits',
  level: 'beginner',
  emoji: '🍎',
  durationMin: 5,
  items: [
    { id: 'apple', word: 'Apple', translation: 'Apel', emoji: '🍎', example: 'I eat an apple.' },
    {
      id: 'banana',
      word: 'Banana',
      translation: 'Pisang',
      emoji: '🍌',
      example: 'The banana is yellow.',
    },
    {
      id: 'grape',
      word: 'Grape',
      translation: 'Anggur',
      emoji: '🍇',
      example: 'Grapes are sweet.',
    },
    {
      id: 'orange',
      word: 'Orange',
      translation: 'Jeruk',
      emoji: '🍊',
      example: 'The orange is round.',
    },
    {
      id: 'strawberry',
      word: 'Strawberry',
      translation: 'Stroberi',
      emoji: '🍓',
      example: 'I like strawberry.',
    },
  ],
}
