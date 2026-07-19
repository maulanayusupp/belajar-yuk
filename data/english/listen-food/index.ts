import type { EnglishLesson } from '~/types'

// Listening: hear the food's name → pick its picture (no text).
// Uses a DIFFERENT set of foods from the "Food" & "Fruits" lessons.
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
    { id: 'cookie', word: 'Cookie', translation: 'Kue kering', emoji: '🍪' },
    { id: 'cake', word: 'Cake', translation: 'Kue', emoji: '🍰' },
    { id: 'pizza', word: 'Pizza', translation: 'Pizza', emoji: '🍕' },
    { id: 'noodle', word: 'Noodle', translation: 'Mie', emoji: '🍜' },
    { id: 'soup', word: 'Soup', translation: 'Sup', emoji: '🍲' },
    { id: 'honey', word: 'Honey', translation: 'Madu', emoji: '🍯' },
  ],
}
