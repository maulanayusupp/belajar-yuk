import type { EnglishLesson } from '~/types'

// Vocabulary: directions & getting around.
export const directions: EnglishLesson = {
  id: 'en-directions',
  subject: 'english-life',
  type: 'vocabulary',
  title: 'Petunjuk Arah',
  titleEn: 'Directions',
  level: 'advanced',
  emoji: '🧭',
  durationMin: 6,
  items: [
    { id: 'left', word: 'Left', translation: 'Kiri', emoji: '⬅️', example: 'Turn left here.' },
    {
      id: 'right',
      word: 'Right',
      translation: 'Kanan',
      emoji: '➡️',
      example: 'The shop is on the right.',
    },
    {
      id: 'straight',
      word: 'Straight',
      translation: 'Lurus',
      emoji: '⏫',
      example: 'Go straight ahead.',
    },
    { id: 'turn', word: 'Turn', translation: 'Belok', emoji: '🔄', example: 'Turn at the corner.' },
    {
      id: 'stop',
      word: 'Stop',
      translation: 'Berhenti',
      emoji: '🛑',
      example: 'Stop at the light.',
    },
    {
      id: 'corner',
      word: 'Corner',
      translation: 'Sudut / pojok',
      emoji: '📐',
      example: 'Wait at the corner.',
    },
    {
      id: 'crossing',
      word: 'Crossing',
      translation: 'Penyeberangan',
      emoji: '🚸',
      example: 'Use the crossing.',
    },
    {
      id: 'traffic',
      word: 'Traffic',
      translation: 'Lalu lintas',
      emoji: '🚦',
      example: 'The traffic is busy.',
    },
  ],
}
