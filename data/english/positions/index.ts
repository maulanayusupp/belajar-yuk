import type { EnglishLesson } from '~/types'

// Vocabulary: position words (prepositions of place).
export const positions: EnglishLesson = {
  id: 'en-positions',
  subject: 'english',
  type: 'vocabulary',
  title: 'Letak & Posisi',
  titleEn: 'Where Is It?',
  level: 'intermediate',
  emoji: '📍',
  durationMin: 6,
  items: [
    {
      id: 'in',
      word: 'In',
      translation: 'Di dalam',
      emoji: '📥',
      example: 'The cat is in the box.',
    },
    {
      id: 'on',
      word: 'On',
      translation: 'Di atas',
      emoji: '🔛',
      example: 'The book is on the table.',
    },
    {
      id: 'under',
      word: 'Under',
      translation: 'Di bawah',
      emoji: '⬇️',
      example: 'The ball is under the bed.',
    },
    {
      id: 'behind',
      word: 'Behind',
      translation: 'Di belakang',
      emoji: '🔙',
      example: 'I stand behind you.',
    },
    {
      id: 'between',
      word: 'Between',
      translation: 'Di antara',
      emoji: '↔️',
      example: 'Sit between us.',
    },
    {
      id: 'above',
      word: 'Above',
      translation: 'Di atas (lebih tinggi)',
      emoji: '⬆️',
      example: 'The moon is above.',
    },
    { id: 'near', word: 'Near', translation: 'Dekat', emoji: '📍', example: 'The park is near.' },
    { id: 'far', word: 'Far', translation: 'Jauh', emoji: '🔭', example: 'The star is far.' },
  ],
}
