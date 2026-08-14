import type { EnglishLesson } from '~/types'

// Vocabulary: health & the doctor.
export const health: EnglishLesson = {
  id: 'en-health',
  subject: 'english-life',
  type: 'spelling',
  title: 'Kesehatan & Dokter',
  titleEn: 'Health & Doctor',
  level: 'advanced',
  emoji: '🩺',
  durationMin: 6,
  items: [
    { id: 'sick', word: 'Sick', translation: 'Sakit', emoji: '🤒', example: 'I feel sick.' },
    {
      id: 'medicine',
      word: 'Medicine',
      translation: 'Obat',
      emoji: '💊',
      example: 'Take your medicine.',
    },
    {
      id: 'nurse',
      word: 'Nurse',
      translation: 'Perawat',
      emoji: '👩‍⚕️',
      example: 'The nurse is kind.',
    },
    { id: 'fever', word: 'Fever', translation: 'Demam', emoji: '🌡️', example: 'She has a fever.' },
    {
      id: 'headache',
      word: 'Headache',
      translation: 'Sakit kepala',
      emoji: '🤕',
      example: 'I have a headache.',
    },
    {
      id: 'dentist',
      word: 'Dentist',
      translation: 'Dokter gigi',
      emoji: '🦷',
      example: 'Visit the dentist.',
    },
    {
      id: 'bandage',
      word: 'Bandage',
      translation: 'Perban',
      emoji: '🩹',
      example: 'Put on a bandage.',
    },
    { id: 'cough', word: 'Cough', translation: 'Batuk', emoji: '😷', example: 'Cover your cough.' },
  ],
}
