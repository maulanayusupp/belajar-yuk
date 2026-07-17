import type { EnglishLesson } from '~/types'

// Vocabulary lesson: Fruit Names.
// Assets specific to this lesson may be placed in the same folder.
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
