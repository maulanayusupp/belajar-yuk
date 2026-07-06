import type { EnglishLesson } from '~/types'

// Phonics M–R.
export const phonicsMR: EnglishLesson = {
  id: 'en-phonics-m-r',
  subject: 'english',
  type: 'phonics',
  title: 'Bunyi Huruf M–R',
  titleEn: 'Phonics M–R',
  level: 'beginner',
  emoji: '🔤',
  durationMin: 6,
  items: [
    { id: 'm', word: 'M', translation: 'Moon', emoji: '🌙', example: 'M is for Moon' },
    { id: 'n', word: 'N', translation: 'Nose', emoji: '👃', example: 'N is for Nose' },
    { id: 'o', word: 'O', translation: 'Orange', emoji: '🍊', example: 'O is for Orange' },
    { id: 'p', word: 'P', translation: 'Pig', emoji: '🐷', example: 'P is for Pig' },
    { id: 'q', word: 'Q', translation: 'Queen', emoji: '👑', example: 'Q is for Queen' },
    { id: 'r', word: 'R', translation: 'Rabbit', emoji: '🐰', example: 'R is for Rabbit' },
  ],
}
