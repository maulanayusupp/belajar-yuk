import type { EnglishLesson } from '~/types'

// Eja nama warna — kata sedikit lebih panjang.
export const spellColors: EnglishLesson = {
  id: 'en-spell-colors',
  subject: 'english',
  type: 'spelling',
  title: 'Eja Nama Warna',
  titleEn: 'Spell Colors',
  level: 'advanced',
  emoji: '🎨',
  durationMin: 6,
  items: [
    { id: 'red', word: 'red', translation: 'Merah', emoji: '🔴' },
    { id: 'blue', word: 'blue', translation: 'Biru', emoji: '🔵' },
    { id: 'pink', word: 'pink', translation: 'Merah muda', emoji: '🌸' },
    { id: 'green', word: 'green', translation: 'Hijau', emoji: '🟢' },
  ],
}
