import type { EnglishLesson } from '~/types'

// Vocabulary lesson: vegetables.
export const vegetables: EnglishLesson = {
  id: 'en-vegetables',
  subject: 'english',
  type: 'vocabulary',
  title: 'Sayuran',
  titleEn: 'Vegetables',
  level: 'beginner',
  emoji: '🥕',
  durationMin: 5,
  items: [
    {
      id: 'carrot',
      word: 'Carrot',
      translation: 'Wortel',
      emoji: '🥕',
      example: 'A rabbit eats carrots.',
    },
    { id: 'tomato', word: 'Tomato', translation: 'Tomat', emoji: '🍅', example: 'A red tomato.' },
    {
      id: 'potato',
      word: 'Potato',
      translation: 'Kentang',
      emoji: '🥔',
      example: 'I like potatoes.',
    },
    {
      id: 'corn',
      word: 'Corn',
      translation: 'Jagung',
      emoji: '🌽',
      example: 'Sweet corn is yummy.',
    },
    {
      id: 'onion',
      word: 'Onion',
      translation: 'Bawang',
      emoji: '🧅',
      example: 'An onion is round.',
    },
    {
      id: 'broccoli',
      word: 'Broccoli',
      translation: 'Brokoli',
      emoji: '🥦',
      example: 'Broccoli is green.',
    },
  ],
}
