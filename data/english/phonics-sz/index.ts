import type { EnglishLesson } from '~/types'

// Phonics S–Z (completing the A–Z alphabet).
export const phonicsSZ: EnglishLesson = {
  id: 'en-phonics-s-z',
  subject: 'english',
  type: 'phonics',
  title: 'Bunyi Huruf S–Z',
  titleEn: 'Phonics S–Z',
  level: 'beginner',
  emoji: '🔤',
  durationMin: 7,
  items: [
    { id: 's', word: 'S', translation: 'Sun', emoji: '☀️', example: 'S is for Sun' },
    { id: 't', word: 'T', translation: 'Tree', emoji: '🌳', example: 'T is for Tree' },
    { id: 'u', word: 'U', translation: 'Umbrella', emoji: '☂️', example: 'U is for Umbrella' },
    { id: 'v', word: 'V', translation: 'Van', emoji: '🚐', example: 'V is for Van' },
    { id: 'w', word: 'W', translation: 'Water', emoji: '💧', example: 'W is for Water' },
    { id: 'x', word: 'X', translation: 'X-ray', emoji: '🩻', example: 'X is for X-ray' },
    { id: 'y', word: 'Y', translation: 'Yoyo', emoji: '🪀', example: 'Y is for Yoyo' },
    { id: 'z', word: 'Z', translation: 'Zebra', emoji: '🦓', example: 'Z is for Zebra' },
  ],
}
