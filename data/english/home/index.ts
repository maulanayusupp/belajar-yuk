import type { EnglishLesson } from '~/types'

// Vocabulary lesson: things at home.
export const home: EnglishLesson = {
  id: 'en-home',
  subject: 'english',
  type: 'vocabulary',
  title: 'Di Rumah',
  titleEn: 'At Home',
  level: 'beginner',
  emoji: '🏠',
  durationMin: 5,
  items: [
    { id: 'house', word: 'House', translation: 'Rumah', emoji: '🏠', example: 'This is my house.' },
    { id: 'door', word: 'Door', translation: 'Pintu', emoji: '🚪', example: 'Open the door.' },
    { id: 'window', word: 'Window', translation: 'Jendela', emoji: '🪟', example: 'A big window.' },
    {
      id: 'bed',
      word: 'Bed',
      translation: 'Tempat tidur',
      emoji: '🛏️',
      example: 'I sleep in bed.',
    },
    { id: 'lamp', word: 'Lamp', translation: 'Lampu', emoji: '💡', example: 'Turn on the lamp.' },
    { id: 'clock', word: 'Clock', translation: 'Jam', emoji: '🕐', example: 'The clock is round.' },
  ],
}
