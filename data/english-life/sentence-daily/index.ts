import type { EnglishLesson } from '~/types'

// Sentence building: everyday routine sentences (word tiles → sentence).
export const sentenceDaily: EnglishLesson = {
  id: 'en-sentence-daily',
  subject: 'english-life',
  type: 'sentence',
  title: 'Kalimat Sehari-hari',
  titleEn: 'Everyday Sentences',
  level: 'intermediate',
  emoji: '🧩',
  durationMin: 7,
  items: [
    {
      id: 'brush-teeth',
      word: 'I brush my teeth',
      translation: 'Aku menyikat gigi',
      emoji: '🪥',
      why: 'Urutannya Subjek + kata kerja + objek: I (aku) + brush (menyikat) + my teeth (gigiku).',
    },
    {
      id: 'eat-breakfast',
      word: 'We eat breakfast',
      translation: 'Kami makan sarapan',
      emoji: '🍳',
      why: 'Urutannya We (kami) + eat (makan) + breakfast (sarapan).',
    },
    {
      id: 'reads-a-book',
      word: 'She reads a book',
      translation: 'Dia membaca buku',
      emoji: '📖',
      why: 'Untuk She (dia perempuan), kata kerja pakai -s: She + reads + a book.',
    },
    {
      id: 'rides-a-bus',
      word: 'He rides a bus',
      translation: 'Dia naik bus',
      emoji: '🚌',
      why: 'Untuk He (dia laki-laki), kata kerja pakai -s: He + rides + a bus.',
    },
    {
      id: 'walk-to-school',
      word: 'They walk to school',
      translation: 'Mereka berjalan ke sekolah',
      emoji: '🏫',
      why: 'Urutannya They (mereka) + walk (berjalan) + to school (ke sekolah).',
    },
    {
      id: 'drink-some-water',
      word: 'I drink some water',
      translation: 'Aku minum air',
      emoji: '💧',
      why: 'Urutannya I (aku) + drink (minum) + some water (sedikit air).',
    },
  ],
}
