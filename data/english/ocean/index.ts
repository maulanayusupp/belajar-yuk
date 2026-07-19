import type { EnglishLesson } from '~/types'

// Vocabulary lesson: ocean animals.
export const ocean: EnglishLesson = {
  id: 'en-ocean',
  subject: 'english',
  type: 'vocabulary',
  title: 'Hewan Laut',
  titleEn: 'Ocean Animals',
  level: 'beginner',
  emoji: '🐙',
  durationMin: 5,
  items: [
    {
      id: 'octopus',
      word: 'Octopus',
      translation: 'Gurita',
      emoji: '🐙',
      example: 'An octopus has eight arms.',
    },
    { id: 'shark', word: 'Shark', translation: 'Hiu', emoji: '🦈', example: 'The shark is big.' },
    { id: 'whale', word: 'Whale', translation: 'Paus', emoji: '🐳', example: 'A whale is huge.' },
    {
      id: 'crab',
      word: 'Crab',
      translation: 'Kepiting',
      emoji: '🦀',
      example: 'The crab walks sideways.',
    },
    {
      id: 'starfish',
      word: 'Starfish',
      translation: 'Bintang laut',
      emoji: '⭐',
      example: 'A starfish has five arms.',
    },
    {
      id: 'jellyfish',
      word: 'Jellyfish',
      translation: 'Ubur-ubur',
      emoji: '🪼',
      example: 'The jellyfish floats.',
    },
  ],
}
