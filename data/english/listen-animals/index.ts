import type { EnglishLesson } from '~/types'

// Listening: hear the animal's name → pick its picture (no text).
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
    { id: 'cat', word: 'Cat', translation: 'Kucing', emoji: '🐱' },
    { id: 'dog', word: 'Dog', translation: 'Anjing', emoji: '🐶' },
    { id: 'fish', word: 'Fish', translation: 'Ikan', emoji: '🐟' },
    { id: 'bird', word: 'Bird', translation: 'Burung', emoji: '🐦' },
    { id: 'cow', word: 'Cow', translation: 'Sapi', emoji: '🐮' },
    { id: 'lion', word: 'Lion', translation: 'Singa', emoji: '🦁' },
  ],
}
