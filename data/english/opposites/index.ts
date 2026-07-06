import type { EnglishLesson } from '~/types'

// Kosakata: Lawan Kata / kata sifat (Mahir).
export const opposites: EnglishLesson = {
  id: 'en-opposites',
  subject: 'english',
  type: 'vocabulary',
  title: 'Lawan Kata',
  titleEn: 'Opposites',
  level: 'advanced',
  emoji: '↔️',
  durationMin: 7,
  items: [
    { id: 'big', word: 'Big', translation: 'Besar', emoji: '🐘', example: 'An elephant is big.' },
    { id: 'small', word: 'Small', translation: 'Kecil', emoji: '🐜', example: 'An ant is small.' },
    { id: 'hot', word: 'Hot', translation: 'Panas', emoji: '🔥', example: 'The sun is hot.' },
    { id: 'cold', word: 'Cold', translation: 'Dingin', emoji: '❄️', example: 'Ice is cold.' },
    { id: 'happy', word: 'Happy', translation: 'Senang', emoji: '😄', example: 'I am happy.' },
    { id: 'sad', word: 'Sad', translation: 'Sedih', emoji: '😢', example: 'Do not be sad.' },
  ],
}
