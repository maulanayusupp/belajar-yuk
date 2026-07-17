import type { BahasaLesson } from '~/types'

// Reading: short simple sentences (subject + predicate + object).
export const simpleSentences: BahasaLesson = {
  id: 'bhs-kalimat-sederhana',
  subject: 'bahasa',
  type: 'kalimat',
  title: 'Kalimat Sederhana',
  titleEn: 'Ini bola.',
  level: 'advanced',
  emoji: '💬',
  durationMin: 6,
  items: [
    { id: 'ini-bola', text: 'Ini bola.', emoji: '⚽' },
    { id: 'aku-suka-susu', text: 'Aku suka susu.', emoji: '🥛' },
    { id: 'budi-baca-buku', text: 'Budi baca buku.', emoji: '📖' },
    { id: 'ibu-beli-roti', text: 'Ibu beli roti.', emoji: '🍞' },
    { id: 'adi-main-bola', text: 'Adi main bola.', emoji: '⚽' },
  ],
}
