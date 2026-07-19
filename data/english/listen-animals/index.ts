import type { EnglishLesson } from '~/types'

// Listening: hear the animal's name → pick its picture (no text).
// Uses a DIFFERENT set of animals from the "Animals" vocabulary lesson.
export const listenAnimals: EnglishLesson = {
  id: 'en-listen-animals',
  subject: 'english',
  type: 'listening',
  title: 'Menyimak: Hewan',
  titleEn: 'Listen: Animals',
  level: 'intermediate',
  emoji: '🎧',
  durationMin: 5,
  items: [
    { id: 'tiger', word: 'Tiger', translation: 'Harimau', emoji: '🐯' },
    { id: 'elephant', word: 'Elephant', translation: 'Gajah', emoji: '🐘' },
    { id: 'monkey', word: 'Monkey', translation: 'Monyet', emoji: '🐵' },
    { id: 'duck', word: 'Duck', translation: 'Bebek', emoji: '🦆' },
    { id: 'frog', word: 'Frog', translation: 'Katak', emoji: '🐸' },
    { id: 'bear', word: 'Bear', translation: 'Beruang', emoji: '🐻' },
  ],
}
