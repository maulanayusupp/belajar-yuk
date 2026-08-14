import type { EnglishLesson } from '~/types'

// Vocabulary: common action verbs (a different set from the basic "Verbs" lesson).
export const actionVerbs: EnglishLesson = {
  id: 'en-action-verbs',
  subject: 'english-life',
  type: 'listening',
  title: 'Kata Kerja Aksi',
  titleEn: 'Action Verbs',
  level: 'intermediate',
  emoji: '🏃',
  durationMin: 6,
  items: [
    { id: 'sing', word: 'Sing', translation: 'Menyanyi', emoji: '🎤', example: 'I sing a song.' },
    {
      id: 'dance',
      word: 'Dance',
      translation: 'Menari',
      emoji: '💃',
      example: 'We dance together.',
    },
    { id: 'draw', word: 'Draw', translation: 'Menggambar', emoji: '🖍️', example: 'I draw a cat.' },
    {
      id: 'write',
      word: 'Write',
      translation: 'Menulis',
      emoji: '✍️',
      example: 'I write my name.',
    },
    { id: 'give', word: 'Give', translation: 'Memberi', emoji: '🎁', example: 'Give me the book.' },
    { id: 'take', word: 'Take', translation: 'Mengambil', emoji: '🫴', example: 'Take one apple.' },
    { id: 'look', word: 'Look', translation: 'Melihat', emoji: '👀', example: 'Look at the sky.' },
    {
      id: 'listen',
      word: 'Listen',
      translation: 'Mendengar',
      emoji: '👂',
      example: 'Listen to me.',
    },
  ],
}
