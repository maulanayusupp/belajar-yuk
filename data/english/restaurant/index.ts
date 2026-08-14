import type { EnglishLesson } from '~/types'

// Vocabulary: at the restaurant.
export const restaurant: EnglishLesson = {
  id: 'en-restaurant',
  subject: 'english',
  type: 'vocabulary',
  title: 'Di Restoran',
  titleEn: 'At the Restaurant',
  level: 'advanced',
  emoji: '🍴',
  durationMin: 6,
  items: [
    {
      id: 'menu',
      word: 'Menu',
      translation: 'Menu / daftar makanan',
      emoji: '📋',
      example: 'Read the menu.',
    },
    {
      id: 'waiter',
      word: 'Waiter',
      translation: 'Pelayan',
      emoji: '🧑‍🍳',
      example: 'The waiter is kind.',
    },
    {
      id: 'order',
      word: 'Order',
      translation: 'Memesan',
      emoji: '📝',
      example: 'I order noodles.',
    },
    {
      id: 'bill',
      word: 'Bill',
      translation: 'Tagihan / bon',
      emoji: '🧾',
      example: 'Please bring the bill.',
    },
    {
      id: 'water',
      word: 'Water',
      translation: 'Air',
      emoji: '💧',
      example: 'A glass of water, please.',
    },
    {
      id: 'coffee',
      word: 'Coffee',
      translation: 'Kopi',
      emoji: '☕',
      example: 'Dad drinks coffee.',
    },
    { id: 'tea', word: 'Tea', translation: 'Teh', emoji: '🍵', example: 'I like sweet tea.' },
    {
      id: 'dessert',
      word: 'Dessert',
      translation: 'Hidangan penutup',
      emoji: '🍮',
      example: 'Dessert is my favorite.',
    },
  ],
}
