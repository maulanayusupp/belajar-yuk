import type { EnglishLesson } from '~/types'

// Vocabulary: things we use to eat (kitchen & table).
export const kitchen: EnglishLesson = {
  id: 'en-kitchen',
  subject: 'english',
  type: 'vocabulary',
  title: 'Peralatan Makan',
  titleEn: 'Kitchen & Table',
  level: 'beginner',
  emoji: '🍽️',
  durationMin: 6,
  items: [
    {
      id: 'spoon',
      word: 'Spoon',
      translation: 'Sendok',
      emoji: '🥄',
      example: 'Eat with a spoon.',
    },
    { id: 'fork', word: 'Fork', translation: 'Garpu', emoji: '🍴', example: 'Use a fork.' },
    {
      id: 'plate',
      word: 'Plate',
      translation: 'Piring',
      emoji: '🍽️',
      example: 'The plate is full.',
    },
    { id: 'knife', word: 'Knife', translation: 'Pisau', emoji: '🔪', example: 'Cut with a knife.' },
    { id: 'glass', word: 'Glass', translation: 'Gelas', emoji: '🥛', example: 'A glass of milk.' },
    { id: 'bowl', word: 'Bowl', translation: 'Mangkuk', emoji: '🥣', example: 'Soup in a bowl.' },
    {
      id: 'bottle',
      word: 'Bottle',
      translation: 'Botol',
      emoji: '🍶',
      example: 'A bottle of water.',
    },
    {
      id: 'napkin',
      word: 'Napkin',
      translation: 'Serbet',
      emoji: '🧻',
      example: 'Wipe with a napkin.',
    },
  ],
}
