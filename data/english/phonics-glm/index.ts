import type { EnglishLesson } from '~/types'

// Phonics G–L (continuation of A–F) — more complete alphabet coverage.
export const phonicsGL: EnglishLesson = {
  id: 'en-phonics-g-l',
  subject: 'english',
  type: 'phonics',
  title: 'Bunyi Huruf G–L',
  titleEn: 'Phonics G–L',
  level: 'beginner',
  emoji: '🔤',
  durationMin: 6,
  items: [
    { id: 'g', word: 'G', translation: 'Goat', emoji: '🐐', example: 'G is for Goat' },
    { id: 'h', word: 'H', translation: 'Hat', emoji: '🧢', example: 'H is for Hat' },
    { id: 'i', word: 'I', translation: 'Ice', emoji: '🧊', example: 'I is for Ice' },
    { id: 'j', word: 'J', translation: 'Juice', emoji: '🧃', example: 'J is for Juice' },
    { id: 'k', word: 'K', translation: 'Kite', emoji: '🪁', example: 'K is for Kite' },
    { id: 'l', word: 'L', translation: 'Lion', emoji: '🦁', example: 'L is for Lion' },
  ],
}
