import type { EnglishLesson } from '~/types'

// Spell 3-letter words (CVC) — arrange the letters into the correct word.
// A DIFFERENT set of CVC words from the "CVC Words" reading lesson.
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
    { id: 'bug', word: 'bug', translation: 'Serangga', emoji: '🐛' },
    { id: 'jam', word: 'jam', translation: 'Selai', emoji: '🍯' },
    { id: 'fan', word: 'fan', translation: 'Kipas', emoji: '🪭' },
    { id: 'web', word: 'web', translation: 'Jaring', emoji: '🕸️' },
    { id: 'map', word: 'map', translation: 'Peta', emoji: '🗺️' },
    { id: 'net', word: 'net', translation: 'Gawang', emoji: '🥅' },
  ],
}
