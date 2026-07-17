import type { EnglishLesson } from '~/types'

// Listening: hear the food's name → pick its picture (no text).
export const listenFood: EnglishLesson = {
  id: 'en-listen-food',
  subject: 'english',
  type: 'listening',
  title: 'Menyimak: Makanan',
  titleEn: 'Listen: Food',
  level: 'intermediate',
  emoji: '🎧',
  durationMin: 5,
  items: [
    { id: 'rice', word: 'Rice', translation: 'Nasi', emoji: '🍚' },
    { id: 'bread', word: 'Bread', translation: 'Roti', emoji: '🍞' },
    { id: 'egg', word: 'Egg', translation: 'Telur', emoji: '🥚' },
    { id: 'milk', word: 'Milk', translation: 'Susu', emoji: '🥛' },
    { id: 'apple', word: 'Apple', translation: 'Apel', emoji: '🍎' },
    { id: 'banana', word: 'Banana', translation: 'Pisang', emoji: '🍌' },
  ],
}
