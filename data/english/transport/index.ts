import type { EnglishLesson } from '~/types'

// Kosakata: Kendaraan (Pemula).
export const transport: EnglishLesson = {
  id: 'en-transport',
  subject: 'english',
  type: 'vocabulary',
  title: 'Nama Kendaraan',
  titleEn: 'Transport',
  level: 'beginner',
  emoji: '🚗',
  durationMin: 5,
  items: [
    { id: 'car', word: 'Car', translation: 'Mobil', emoji: '🚗', example: 'The car is fast.' },
    { id: 'bus', word: 'Bus', translation: 'Bis', emoji: '🚌', example: 'I ride the bus.' },
    {
      id: 'train',
      word: 'Train',
      translation: 'Kereta',
      emoji: '🚂',
      example: 'The train is long.',
    },
    {
      id: 'plane',
      word: 'Plane',
      translation: 'Pesawat',
      emoji: '✈️',
      example: 'The plane can fly.',
    },
    {
      id: 'boat',
      word: 'Boat',
      translation: 'Perahu',
      emoji: '⛵',
      example: 'The boat is on water.',
    },
    { id: 'bike', word: 'Bike', translation: 'Sepeda', emoji: '🚲', example: 'I ride my bike.' },
  ],
}
