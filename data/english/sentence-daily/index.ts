import type { EnglishLesson } from '~/types'

// Sentence building: everyday routine sentences (word tiles → sentence).
export const sentenceDaily: EnglishLesson = {
  id: 'en-sentence-daily',
  subject: 'english',
  type: 'sentence',
  title: 'Kalimat Sehari-hari',
  titleEn: 'Everyday Sentences',
  level: 'intermediate',
  emoji: '🧩',
  durationMin: 7,
  items: [
    { id: 'brush-teeth', word: 'I brush my teeth', translation: 'Aku menyikat gigi', emoji: '🪥' },
    {
      id: 'eat-breakfast',
      word: 'We eat breakfast',
      translation: 'Kami makan sarapan',
      emoji: '🍳',
    },
    { id: 'reads-a-book', word: 'She reads a book', translation: 'Dia membaca buku', emoji: '📖' },
    { id: 'rides-a-bus', word: 'He rides a bus', translation: 'Dia naik bus', emoji: '🚌' },
    {
      id: 'walk-to-school',
      word: 'They walk to school',
      translation: 'Mereka berjalan ke sekolah',
      emoji: '🏫',
    },
    {
      id: 'drink-some-water',
      word: 'I drink some water',
      translation: 'Aku minum air',
      emoji: '💧',
    },
  ],
}
