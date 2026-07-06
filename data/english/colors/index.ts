import type { EnglishLesson } from '~/types'

// Pelajaran kosakata: Warna.
export const colors: EnglishLesson = {
  id: 'en-colors',
  subject: 'english',
  type: 'vocabulary',
  title: 'Nama Warna',
  titleEn: 'Colors',
  level: 'beginner',
  emoji: '🌈',
  durationMin: 5,
  items: [
    { id: 'red', word: 'Red', translation: 'Merah', emoji: '🔴', example: 'The apple is red.' },
    { id: 'blue', word: 'Blue', translation: 'Biru', emoji: '🔵', example: 'The sky is blue.' },
    {
      id: 'green',
      word: 'Green',
      translation: 'Hijau',
      emoji: '🟢',
      example: 'The leaf is green.',
    },
    {
      id: 'yellow',
      word: 'Yellow',
      translation: 'Kuning',
      emoji: '🟡',
      example: 'The sun is yellow.',
    },
    {
      id: 'purple',
      word: 'Purple',
      translation: 'Ungu',
      emoji: '🟣',
      example: 'The grape is purple.',
    },
    {
      id: 'orange',
      word: 'Orange',
      translation: 'Oranye',
      emoji: '🟠',
      example: 'The orange is orange.',
    },
  ],
}
