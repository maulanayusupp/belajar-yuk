import type { EnglishLesson } from '~/types'

// Kosakata: Makanan & Minuman (Menengah).
export const food: EnglishLesson = {
  id: 'en-food',
  subject: 'english',
  type: 'vocabulary',
  title: 'Makanan & Minuman',
  titleEn: 'Food & Drink',
  level: 'beginner',
  emoji: '🍚',
  durationMin: 6,
  items: [
    { id: 'rice', word: 'Rice', translation: 'Nasi', emoji: '🍚', example: 'I eat rice.' },
    { id: 'bread', word: 'Bread', translation: 'Roti', emoji: '🍞', example: 'The bread is soft.' },
    { id: 'egg', word: 'Egg', translation: 'Telur', emoji: '🥚', example: 'An egg for breakfast.' },
    { id: 'milk', word: 'Milk', translation: 'Susu', emoji: '🥛', example: 'I drink milk.' },
    {
      id: 'chicken',
      word: 'Chicken',
      translation: 'Ayam',
      emoji: '🍗',
      example: 'The chicken is yummy.',
    },
    { id: 'cheese', word: 'Cheese', translation: 'Keju', emoji: '🧀', example: 'I like cheese.' },
  ],
}
