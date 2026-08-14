import type { EnglishLesson } from '~/types'

// Vocabulary: things in the bathroom.
export const bathroom: EnglishLesson = {
  id: 'en-bathroom',
  subject: 'english-life',
  type: 'vocabulary',
  title: 'Kamar Mandi',
  titleEn: 'Bathroom',
  level: 'beginner',
  emoji: '🚿',
  durationMin: 6,
  items: [
    {
      id: 'toothbrush',
      word: 'Toothbrush',
      translation: 'Sikat gigi',
      emoji: '🪥',
      example: 'Use a toothbrush.',
    },
    { id: 'soap', word: 'Soap', translation: 'Sabun', emoji: '🧼', example: 'Wash with soap.' },
    {
      id: 'towel',
      word: 'Towel',
      translation: 'Handuk',
      emoji: '🧺',
      example: 'Dry with a towel.',
    },
    {
      id: 'shower',
      word: 'Shower',
      translation: 'Pancuran',
      emoji: '🚿',
      example: 'I take a shower.',
    },
    {
      id: 'mirror',
      word: 'Mirror',
      translation: 'Cermin',
      emoji: '🪞',
      example: 'Look in the mirror.',
    },
    {
      id: 'shampoo',
      word: 'Shampoo',
      translation: 'Sampo',
      emoji: '🧴',
      example: 'Wash your hair with shampoo.',
    },
    {
      id: 'toilet',
      word: 'Toilet',
      translation: 'Toilet',
      emoji: '🚽',
      example: 'The toilet is clean.',
    },
    {
      id: 'sink',
      word: 'Sink',
      translation: 'Wastafel',
      emoji: '🚰',
      example: 'Wash at the sink.',
    },
  ],
}
