import type { EnglishLesson } from '~/types'

// Vocabulary: Days of the Week (Intermediate).
export const days: EnglishLesson = {
  id: 'en-days',
  subject: 'english',
  type: 'vocabulary',
  title: 'Hari dalam Seminggu',
  titleEn: 'Days of the Week',
  level: 'beginner',
  emoji: '📅',
  durationMin: 7,
  items: [
    {
      id: 'monday',
      word: 'Monday',
      translation: 'Senin',
      emoji: '📅',
      example: 'School starts on Monday.',
    },
    {
      id: 'tuesday',
      word: 'Tuesday',
      translation: 'Selasa',
      emoji: '📅',
      example: 'Today is Tuesday.',
    },
    {
      id: 'wednesday',
      word: 'Wednesday',
      translation: 'Rabu',
      emoji: '📅',
      example: 'We swim on Wednesday.',
    },
    {
      id: 'thursday',
      word: 'Thursday',
      translation: 'Kamis',
      emoji: '📅',
      example: 'Thursday is fun.',
    },
    {
      id: 'friday',
      word: 'Friday',
      translation: 'Jumat',
      emoji: '📅',
      example: 'Friday is my favorite.',
    },
    {
      id: 'saturday',
      word: 'Saturday',
      translation: 'Sabtu',
      emoji: '🎉',
      example: 'We play on Saturday.',
    },
    {
      id: 'sunday',
      word: 'Sunday',
      translation: 'Minggu',
      emoji: '☀️',
      example: 'Sunday is a rest day.',
    },
  ],
}
