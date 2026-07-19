import type { EnglishLesson } from '~/types'

// Spell color names — a DIFFERENT set from the "Colors" vocabulary lesson.
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
    { id: 'pink', word: 'pink', translation: 'Merah muda', emoji: '🩷' },
    { id: 'black', word: 'black', translation: 'Hitam', emoji: '⚫' },
    { id: 'white', word: 'white', translation: 'Putih', emoji: '⚪' },
    { id: 'brown', word: 'brown', translation: 'Cokelat', emoji: '🟤' },
  ],
}
