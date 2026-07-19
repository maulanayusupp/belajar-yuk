import type { EnglishLesson } from '~/types'

// Vocabulary lesson: things at school.
export const school: EnglishLesson = {
  id: 'en-school',
  subject: 'english',
  type: 'vocabulary',
  title: 'Di Sekolah',
  titleEn: 'At School',
  level: 'beginner',
  emoji: '🏫',
  durationMin: 5,
  items: [
    { id: 'book', word: 'Book', translation: 'Buku', emoji: '📚', example: 'I read a book.' },
    { id: 'pen', word: 'Pen', translation: 'Pena', emoji: '🖊️', example: 'Write with a pen.' },
    {
      id: 'pencil',
      word: 'Pencil',
      translation: 'Pensil',
      emoji: '✏️',
      example: 'A yellow pencil.',
    },
    { id: 'bag', word: 'Bag', translation: 'Tas', emoji: '🎒', example: 'My school bag.' },
    {
      id: 'teacher',
      word: 'Teacher',
      translation: 'Guru',
      emoji: '👩‍🏫',
      example: 'The teacher is kind.',
    },
    { id: 'chair', word: 'Chair', translation: 'Kursi', emoji: '🪑', example: 'Sit on the chair.' },
  ],
}
