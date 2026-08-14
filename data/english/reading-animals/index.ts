import type { EnglishLesson } from '~/types'

// Reading comprehension: read the sentence → pick the matching picture.
// `word` is the sentence; `emoji` is the correct picture (others are distractors).
export const readingAnimals: EnglishLesson = {
  id: 'en-reading-animals',
  subject: 'english',
  type: 'reading',
  title: 'Baca & Pilih: Hewan',
  titleEn: 'Read & Pick: Animals',
  level: 'intermediate',
  emoji: '📖',
  durationMin: 6,
  items: [
    {
      id: 'rabbit-hops',
      word: 'The rabbit is hopping',
      translation: 'Kelinci sedang melompat',
      emoji: '🐰',
    },
    {
      id: 'bee-honey',
      word: 'The bee makes honey',
      translation: 'Lebah membuat madu',
      emoji: '🐝',
    },
    { id: 'fish-swim', word: 'The fish can swim', translation: 'Ikan bisa berenang', emoji: '🐟' },
    {
      id: 'bird-flying',
      word: 'The bird is flying',
      translation: 'Burung sedang terbang',
      emoji: '🐦',
    },
    {
      id: 'horse-runs',
      word: 'The horse runs fast',
      translation: 'Kuda berlari cepat',
      emoji: '🐴',
    },
    {
      id: 'frog-green',
      word: 'The frog is green',
      translation: 'Katak berwarna hijau',
      emoji: '🐸',
    },
  ],
}
