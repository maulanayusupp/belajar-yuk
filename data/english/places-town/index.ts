import type { EnglishLesson } from '~/types'

// Vocabulary: places around town.
export const placesTown: EnglishLesson = {
  id: 'en-places-town',
  subject: 'english',
  type: 'vocabulary',
  title: 'Tempat di Kota',
  titleEn: 'Places in Town',
  level: 'beginner',
  emoji: '🏙️',
  durationMin: 6,
  items: [
    {
      id: 'hospital',
      word: 'Hospital',
      translation: 'Rumah sakit',
      emoji: '🏥',
      example: 'The doctor is at the hospital.',
    },
    {
      id: 'market',
      word: 'Market',
      translation: 'Pasar',
      emoji: '🛒',
      example: 'We buy food at the market.',
    },
    {
      id: 'park',
      word: 'Park',
      translation: 'Taman',
      emoji: '🏞️',
      example: 'We play in the park.',
    },
    {
      id: 'bank',
      word: 'Bank',
      translation: 'Bank',
      emoji: '🏦',
      example: 'Money is at the bank.',
    },
    {
      id: 'library',
      word: 'Library',
      translation: 'Perpustakaan',
      emoji: '📚',
      example: 'I read at the library.',
    },
    {
      id: 'airport',
      word: 'Airport',
      translation: 'Bandara',
      emoji: '🛫',
      example: 'Planes are at the airport.',
    },
    {
      id: 'station',
      word: 'Station',
      translation: 'Stasiun',
      emoji: '🚉',
      example: 'The train is at the station.',
    },
    {
      id: 'restaurant',
      word: 'Restaurant',
      translation: 'Restoran',
      emoji: '🍽️',
      example: 'We eat at a restaurant.',
    },
  ],
}
