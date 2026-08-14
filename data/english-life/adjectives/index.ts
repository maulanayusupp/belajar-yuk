import type { EnglishLesson } from '~/types'

// Vocabulary: describing words (adjectives). A different set from "Opposites".
export const adjectives: EnglishLesson = {
  id: 'en-adjectives',
  subject: 'english-life',
  type: 'vocabulary',
  title: 'Kata Sifat',
  titleEn: 'Describing Words',
  level: 'intermediate',
  emoji: '📝',
  durationMin: 6,
  items: [
    {
      id: 'tall',
      word: 'Tall',
      translation: 'Tinggi',
      emoji: '🦒',
      example: 'The giraffe is tall.',
    },
    {
      id: 'short',
      word: 'Short',
      translation: 'Pendek',
      emoji: '🐢',
      example: 'The turtle is short.',
    },
    { id: 'new', word: 'New', translation: 'Baru', emoji: '🆕', example: 'I have a new bag.' },
    { id: 'old', word: 'Old', translation: 'Tua / lama', emoji: '👴', example: 'Grandpa is old.' },
    {
      id: 'clean',
      word: 'Clean',
      translation: 'Bersih',
      emoji: '✨',
      example: 'My room is clean.',
    },
    {
      id: 'dirty',
      word: 'Dirty',
      translation: 'Kotor',
      emoji: '🧦',
      example: 'The socks are dirty.',
    },
    { id: 'slow', word: 'Slow', translation: 'Lambat', emoji: '🐌', example: 'The snail is slow.' },
    {
      id: 'loud',
      word: 'Loud',
      translation: 'Keras / berisik',
      emoji: '📢',
      example: 'The music is loud.',
    },
  ],
}
