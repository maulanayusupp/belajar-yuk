import type { EnglishLesson } from '~/types'

// Vocabulary lesson: Animal Names.
// Any assets specific to this lesson (images/audio/etc.) may be placed
// in the same folder to keep everything centralized per topic.
export const animals: EnglishLesson = {
  id: 'en-animals',
  subject: 'english',
  type: 'vocabulary',
  title: 'Nama Hewan',
  titleEn: 'Animals',
  level: 'beginner',
  emoji: '🐶',
  durationMin: 5,
  items: [
    { id: 'cat', word: 'Cat', translation: 'Kucing', emoji: '🐱', example: 'The cat is cute.' },
    { id: 'dog', word: 'Dog', translation: 'Anjing', emoji: '🐶', example: 'The dog can run.' },
    { id: 'fish', word: 'Fish', translation: 'Ikan', emoji: '🐟', example: 'A fish can swim.' },
    { id: 'bird', word: 'Bird', translation: 'Burung', emoji: '🐦', example: 'The bird can fly.' },
    { id: 'cow', word: 'Cow', translation: 'Sapi', emoji: '🐮', example: 'The cow says moo.' },
    { id: 'lion', word: 'Lion', translation: 'Singa', emoji: '🦁', example: 'The lion is big.' },
  ],
}
