import type { EnglishLesson } from '~/types'

// Konten pelajaran Bahasa Inggris (kosakata bergambar).
// Emoji dipakai sebagai "gambar" agar ringan & tanpa aset eksternal.
export const englishLessons: EnglishLesson[] = [
  {
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
  },
  {
    id: 'en-fruits',
    subject: 'english',
    type: 'vocabulary',
    title: 'Nama Buah',
    titleEn: 'Fruits',
    level: 'beginner',
    emoji: '🍎',
    durationMin: 5,
    items: [
      { id: 'apple', word: 'Apple', translation: 'Apel', emoji: '🍎', example: 'I eat an apple.' },
      { id: 'banana', word: 'Banana', translation: 'Pisang', emoji: '🍌', example: 'The banana is yellow.' },
      { id: 'grape', word: 'Grape', translation: 'Anggur', emoji: '🍇', example: 'Grapes are sweet.' },
      { id: 'orange', word: 'Orange', translation: 'Jeruk', emoji: '🍊', example: 'The orange is round.' },
      { id: 'strawberry', word: 'Strawberry', translation: 'Stroberi', emoji: '🍓', example: 'I like strawberry.' },
    ],
  },
]
