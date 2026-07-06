import type { EnglishLesson } from '~/types'

// Pelajaran Phonics: mengenal bunyi huruf lewat kata contoh.
// `word` = huruf, `translation` = kata contoh, `example` = kalimat pola.
export const phonics: EnglishLesson = {
  id: 'en-phonics',
  subject: 'english',
  type: 'phonics',
  title: 'Bunyi Huruf A–F',
  titleEn: 'Phonics',
  level: 'beginner',
  emoji: '🔤',
  durationMin: 6,
  items: [
    { id: 'a', word: 'A', translation: 'Apple', emoji: '🍎', example: 'A is for Apple' },
    { id: 'b', word: 'B', translation: 'Ball', emoji: '⚽', example: 'B is for Ball' },
    { id: 'c', word: 'C', translation: 'Cat', emoji: '🐱', example: 'C is for Cat' },
    { id: 'd', word: 'D', translation: 'Dog', emoji: '🐶', example: 'D is for Dog' },
    { id: 'e', word: 'E', translation: 'Egg', emoji: '🥚', example: 'E is for Egg' },
    { id: 'f', word: 'F', translation: 'Fish', emoji: '🐟', example: 'F is for Fish' },
  ],
}
