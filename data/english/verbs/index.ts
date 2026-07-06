import type { EnglishLesson } from '~/types'

// Kosakata: Kata Kerja / Gerakan (Menengah).
export const verbs: EnglishLesson = {
  id: 'en-verbs',
  subject: 'english',
  type: 'vocabulary',
  title: 'Kata Kerja',
  titleEn: 'Action Verbs',
  level: 'beginner',
  emoji: '🏃',
  durationMin: 6,
  items: [
    { id: 'run', word: 'Run', translation: 'Berlari', emoji: '🏃', example: 'I can run fast.' },
    { id: 'jump', word: 'Jump', translation: 'Melompat', emoji: '🤸', example: 'Frogs jump high.' },
    { id: 'eat', word: 'Eat', translation: 'Makan', emoji: '🍽️', example: 'We eat lunch.' },
    {
      id: 'sleep',
      word: 'Sleep',
      translation: 'Tidur',
      emoji: '😴',
      example: 'Babies sleep a lot.',
    },
    { id: 'read', word: 'Read', translation: 'Membaca', emoji: '📖', example: 'I read a book.' },
    { id: 'swim', word: 'Swim', translation: 'Berenang', emoji: '🏊', example: 'Fish can swim.' },
  ],
}
