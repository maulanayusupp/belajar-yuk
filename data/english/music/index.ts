import type { EnglishLesson } from '~/types'

// Vocabulary lesson: musical instruments.
export const music: EnglishLesson = {
  id: 'en-music',
  subject: 'english',
  type: 'vocabulary',
  title: 'Alat Musik',
  titleEn: 'Musical Instruments',
  level: 'beginner',
  emoji: '🎸',
  durationMin: 5,
  items: [
    {
      id: 'guitar',
      word: 'Guitar',
      translation: 'Gitar',
      emoji: '🎸',
      example: 'I play the guitar.',
    },
    { id: 'drum', word: 'Drum', translation: 'Drum', emoji: '🥁', example: 'The drum is loud.' },
    {
      id: 'piano',
      word: 'Piano',
      translation: 'Piano',
      emoji: '🎹',
      example: 'She plays the piano.',
    },
    {
      id: 'flute',
      word: 'Flute',
      translation: 'Seruling',
      emoji: '🪈',
      example: 'A flute sounds soft.',
    },
    {
      id: 'violin',
      word: 'Violin',
      translation: 'Biola',
      emoji: '🎻',
      example: 'The violin is small.',
    },
    {
      id: 'trumpet',
      word: 'Trumpet',
      translation: 'Terompet',
      emoji: '🎺',
      example: 'Blow the trumpet.',
    },
  ],
}
