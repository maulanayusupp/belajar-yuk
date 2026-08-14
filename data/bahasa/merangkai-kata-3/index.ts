import type { BahasaLesson } from '~/types'

// Reading: build words from the KA/DA/LA syllable families (ku + da = kuda).
export const buildWords3: BahasaLesson = {
  id: 'bhs-merangkai-kata-3',
  subject: 'bahasa',
  type: 'kata',
  title: 'Merangkai Kata: KA DA LA',
  titleEn: 'ku + da = kuda',
  level: 'intermediate',
  emoji: '📖',
  durationMin: 6,
  items: [
    { id: 'kuda', text: 'kuda', emoji: '🐴', hint: 'Kuda', syllables: ['ku', 'da'] },
    { id: 'dadu', text: 'dadu', emoji: '🎲', hint: 'Dadu', syllables: ['da', 'du'] },
    { id: 'lagu', text: 'lagu', emoji: '🎵', hint: 'Lagu', syllables: ['la', 'gu'] },
    { id: 'kado', text: 'kado', emoji: '🎁', hint: 'Kado', syllables: ['ka', 'do'] },
    { id: 'kuku', text: 'kuku', emoji: '💅', hint: 'Kuku', syllables: ['ku', 'ku'] },
    { id: 'kodok', text: 'kodok', emoji: '🐸', hint: 'Kodok', syllables: ['ko', 'dok'] },
  ],
}
