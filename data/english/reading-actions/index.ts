import type { EnglishLesson } from '~/types'

// Reading comprehension (harder): read a scene sentence → pick the picture.
export const readingActions: EnglishLesson = {
  id: 'en-reading-actions',
  subject: 'english',
  type: 'reading',
  title: 'Baca & Pilih: Kegiatan',
  titleEn: 'Read & Pick: Actions',
  level: 'advanced',
  emoji: '📖',
  durationMin: 7,
  items: [
    {
      id: 'girl-reads',
      word: 'The girl is reading a book',
      translation: 'Anak perempuan sedang membaca buku',
      emoji: '📖',
    },
    {
      id: 'boy-bike',
      word: 'The boy is riding a bike',
      translation: 'Anak laki-laki naik sepeda',
      emoji: '🚴',
    },
    {
      id: 'play-football',
      word: 'They are playing football',
      translation: 'Mereka bermain sepak bola',
      emoji: '⚽',
    },
    {
      id: 'eat-ice-cream',
      word: 'She is eating ice cream',
      translation: 'Dia sedang makan es krim',
      emoji: '🍦',
    },
    {
      id: 'sleep-bed',
      word: 'He is sleeping in bed',
      translation: 'Dia sedang tidur di kasur',
      emoji: '🛏️',
    },
    {
      id: 'family-dinner',
      word: 'The family is having dinner',
      translation: 'Keluarga sedang makan malam',
      emoji: '🍽️',
    },
  ],
}
