import type { EnglishLesson } from '~/types'

// Kosakata: Anggota Keluarga (Menengah).
export const family: EnglishLesson = {
  id: 'en-family',
  subject: 'english',
  type: 'vocabulary',
  title: 'Anggota Keluarga',
  titleEn: 'Family',
  level: 'beginner',
  emoji: '👨‍👩‍👧‍👦',
  durationMin: 6,
  items: [
    { id: 'mother', word: 'Mother', translation: 'Ibu', emoji: '👩', example: 'I love my mother.' },
    {
      id: 'father',
      word: 'Father',
      translation: 'Ayah',
      emoji: '👨',
      example: 'My father is tall.',
    },
    {
      id: 'sister',
      word: 'Sister',
      translation: 'Saudari',
      emoji: '👧',
      example: 'My sister is kind.',
    },
    {
      id: 'brother',
      word: 'Brother',
      translation: 'Saudara',
      emoji: '👦',
      example: 'My brother can run.',
    },
    { id: 'baby', word: 'Baby', translation: 'Bayi', emoji: '👶', example: 'The baby is cute.' },
    {
      id: 'grandma',
      word: 'Grandma',
      translation: 'Nenek',
      emoji: '👵',
      example: 'Grandma tells stories.',
    },
  ],
}
