import type { BahasaLesson } from '~/types'

// Reading: build two-syllable words (ma + ta = mata). More words to practise.
export const buildWords2: BahasaLesson = {
  id: 'bhs-merangkai-kata-2',
  subject: 'bahasa',
  type: 'kata',
  title: 'Merangkai Kata Lagi',
  titleEn: 'ma + ta = mata',
  level: 'intermediate',
  emoji: '📖',
  durationMin: 6,
  items: [
    { id: 'mata', text: 'mata', emoji: '👁️', hint: 'Mata', syllables: ['ma', 'ta'] },
    { id: 'sapi', text: 'sapi', emoji: '🐄', hint: 'Sapi', syllables: ['sa', 'pi'] },
    { id: 'nasi', text: 'nasi', emoji: '🍚', hint: 'Nasi', syllables: ['na', 'si'] },
    { id: 'dasi', text: 'dasi', emoji: '👔', hint: 'Dasi', syllables: ['da', 'si'] },
    { id: 'kaki', text: 'kaki', emoji: '🦵', hint: 'Kaki', syllables: ['ka', 'ki'] },
    { id: 'gigi', text: 'gigi', emoji: '🦷', hint: 'Gigi', syllables: ['gi', 'gi'] },
  ],
}
