import type { EnglishLesson } from '~/types'

// Vocabulary: Jobs / Professions (Advanced).
export const jobs: EnglishLesson = {
  id: 'en-jobs',
  subject: 'english',
  type: 'vocabulary',
  title: 'Pekerjaan',
  titleEn: 'Jobs',
  level: 'beginner',
  emoji: '👷',
  durationMin: 6,
  items: [
    {
      id: 'doctor',
      word: 'Doctor',
      translation: 'Dokter',
      emoji: '👨‍⚕️',
      example: 'The doctor helps us.',
    },
    {
      id: 'teacher',
      word: 'Teacher',
      translation: 'Guru',
      emoji: '👩‍🏫',
      example: 'My teacher is kind.',
    },
    {
      id: 'farmer',
      word: 'Farmer',
      translation: 'Petani',
      emoji: '👨‍🌾',
      example: 'The farmer grows rice.',
    },
    {
      id: 'police',
      word: 'Police',
      translation: 'Polisi',
      emoji: '👮',
      example: 'The police keep us safe.',
    },
    { id: 'chef', word: 'Chef', translation: 'Koki', emoji: '👨‍🍳', example: 'The chef cooks food.' },
    {
      id: 'pilot',
      word: 'Pilot',
      translation: 'Pilot',
      emoji: '👨‍✈️',
      example: 'The pilot flies a plane.',
    },
  ],
}
