import type { BahasaLesson } from '~/types'

// Reading: combining two syllables into a word (bu + ku = buku).
// The 'kata' activity uses the `syllables` field for its assembly mode.
export const buildWords: BahasaLesson = {
  id: 'bhs-merangkai-kata',
  subject: 'bahasa',
  type: 'kata',
  title: 'Merangkai Kata',
  titleEn: 'bu + ku = buku',
  level: 'intermediate',
  emoji: '📖',
  durationMin: 6,
  items: [
    { id: 'buku', text: 'buku', emoji: '📖', hint: 'Buku', syllables: ['bu', 'ku'] },
    { id: 'bola', text: 'bola', emoji: '⚽', hint: 'Bola', syllables: ['bo', 'la'] },
    { id: 'roti', text: 'roti', emoji: '🍞', hint: 'Roti', syllables: ['ro', 'ti'] },
    { id: 'susu', text: 'susu', emoji: '🥛', hint: 'Susu', syllables: ['su', 'su'] },
    { id: 'sapu', text: 'sapu', emoji: '🧹', hint: 'Sapu', syllables: ['sa', 'pu'] },
    { id: 'topi', text: 'topi', emoji: '🧢', hint: 'Topi', syllables: ['to', 'pi'] },
  ],
}
