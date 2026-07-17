import type { EnglishLesson } from '~/types'

// Spell 3-letter words (CVC) — arrange the letters into the correct word.
export const spellCvc: EnglishLesson = {
  id: 'en-spell-cvc',
  subject: 'english',
  type: 'spelling',
  title: 'Eja Kata (3 Huruf)',
  titleEn: 'Spell CVC Words',
  level: 'advanced',
  emoji: '✍️',
  durationMin: 6,
  items: [
    { id: 'cat', word: 'cat', translation: 'Kucing', emoji: '🐱' },
    { id: 'dog', word: 'dog', translation: 'Anjing', emoji: '🐶' },
    { id: 'sun', word: 'sun', translation: 'Matahari', emoji: '☀️' },
    { id: 'hat', word: 'hat', translation: 'Topi', emoji: '🧢' },
    { id: 'cup', word: 'cup', translation: 'Gelas', emoji: '🥤' },
    { id: 'box', word: 'box', translation: 'Kotak', emoji: '📦' },
  ],
}
