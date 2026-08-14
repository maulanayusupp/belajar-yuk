import type { EnglishLesson } from '~/types'

// Vocabulary: everyday actions (daily routine).
export const dailyRoutine: EnglishLesson = {
  id: 'en-daily-routine',
  subject: 'english',
  type: 'vocabulary',
  title: 'Kegiatan Harian',
  titleEn: 'Daily Routine',
  level: 'beginner',
  emoji: '🌅',
  durationMin: 6,
  items: [
    {
      id: 'wake-up',
      word: 'Wake up',
      translation: 'Bangun',
      emoji: '🌅',
      example: 'I wake up early.',
    },
    { id: 'wash', word: 'Wash', translation: 'Mencuci', emoji: '🧼', example: 'I wash my hands.' },
    { id: 'drink', word: 'Drink', translation: 'Minum', emoji: '🥤', example: 'I drink water.' },
    { id: 'cook', word: 'Cook', translation: 'Memasak', emoji: '🍳', example: 'Mom can cook.' },
    {
      id: 'walk',
      word: 'Walk',
      translation: 'Berjalan',
      emoji: '🚶',
      example: 'I walk to school.',
    },
    {
      id: 'study',
      word: 'Study',
      translation: 'Belajar',
      emoji: '📚',
      example: 'I study every day.',
    },
    { id: 'rest', word: 'Rest', translation: 'Istirahat', emoji: '😴', example: 'I rest at noon.' },
    {
      id: 'sweep',
      word: 'Sweep',
      translation: 'Menyapu',
      emoji: '🧹',
      example: 'I sweep the floor.',
    },
  ],
}
