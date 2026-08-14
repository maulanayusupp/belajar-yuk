import type { EnglishLesson } from '~/types'

// Vocabulary: at the hotel.
export const hotel: EnglishLesson = {
  id: 'en-hotel',
  subject: 'english-life',
  type: 'vocabulary',
  title: 'Di Hotel',
  titleEn: 'At the Hotel',
  level: 'advanced',
  emoji: '🏨',
  durationMin: 6,
  items: [
    {
      id: 'hotel',
      word: 'Hotel',
      translation: 'Hotel',
      emoji: '🏨',
      example: 'We stay at a hotel.',
    },
    { id: 'room', word: 'Room', translation: 'Kamar', emoji: '🛏️', example: 'My room is clean.' },
    { id: 'key', word: 'Key', translation: 'Kunci', emoji: '🔑', example: 'Here is your key.' },
    {
      id: 'reception',
      word: 'Reception',
      translation: 'Resepsionis',
      emoji: '🛎️',
      example: 'Ask at the reception.',
    },
    {
      id: 'elevator',
      word: 'Elevator',
      translation: 'Lift',
      emoji: '🛗',
      example: 'Take the elevator.',
    },
    {
      id: 'pool',
      word: 'Pool',
      translation: 'Kolam renang',
      emoji: '🏊',
      example: 'The pool is big.',
    },
    {
      id: 'balcony',
      word: 'Balcony',
      translation: 'Balkon',
      emoji: '🌇',
      example: 'Sit on the balcony.',
    },
    {
      id: 'guest',
      word: 'Guest',
      translation: 'Tamu',
      emoji: '🧳',
      example: 'The guest is happy.',
    },
  ],
}
