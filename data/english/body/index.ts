import type { EnglishLesson } from '~/types'

// Pelajaran kosakata: Anggota Tubuh.
export const body: EnglishLesson = {
  id: 'en-body',
  subject: 'english',
  type: 'vocabulary',
  title: 'Anggota Tubuh',
  titleEn: 'Body Parts',
  level: 'beginner',
  emoji: '✋',
  durationMin: 5,
  items: [
    { id: 'hand', word: 'Hand', translation: 'Tangan', emoji: '✋', example: 'Wash your hand.' },
    { id: 'eye', word: 'Eye', translation: 'Mata', emoji: '👁️', example: 'I see with my eye.' },
    { id: 'ear', word: 'Ear', translation: 'Telinga', emoji: '👂', example: 'I hear with my ear.' },
    {
      id: 'nose',
      word: 'Nose',
      translation: 'Hidung',
      emoji: '👃',
      example: 'Smell with your nose.',
    },
    {
      id: 'mouth',
      word: 'Mouth',
      translation: 'Mulut',
      emoji: '👄',
      example: 'Eat with your mouth.',
    },
    { id: 'foot', word: 'Foot', translation: 'Kaki', emoji: '🦶', example: 'Kick with your foot.' },
  ],
}
