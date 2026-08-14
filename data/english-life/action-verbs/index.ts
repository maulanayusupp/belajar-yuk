import type { EnglishLesson } from '~/types'

// Listening: everyday/practical verbs you use in real life & at work.
export const actionVerbs: EnglishLesson = {
  id: 'en-action-verbs',
  subject: 'english-life',
  type: 'listening',
  title: 'Kata Kerja Sehari-hari',
  titleEn: 'Everyday Verbs',
  level: 'intermediate',
  emoji: '🏃',
  durationMin: 6,
  items: [
    { id: 'buy', word: 'Buy', translation: 'Membeli', emoji: '🛒', example: 'I buy some bread.' },
    { id: 'pay', word: 'Pay', translation: 'Membayar', emoji: '💳', example: 'Please pay here.' },
    { id: 'call', word: 'Call', translation: 'Menelepon', emoji: '📞', example: 'Call me later.' },
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
