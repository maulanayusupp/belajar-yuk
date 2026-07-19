import type { BahasaLesson } from '~/types'

// Reading: more short simple sentences (a different set from the first lesson).
export const simpleSentences2: BahasaLesson = {
  id: 'bhs-kalimat-sederhana-2',
  subject: 'bahasa',
  type: 'kalimat',
  title: 'Kalimat Sederhana Lagi',
  titleEn: 'Nina suka kue.',
  level: 'advanced',
  emoji: '💬',
  durationMin: 6,
  items: [
    { id: 'nina-suka-kue', text: 'Nina suka kue.', emoji: '🍰' },
    { id: 'ini-rumah-kita', text: 'Ini rumah kita.', emoji: '🏠' },
    { id: 'ayah-baca-koran', text: 'Ayah baca koran.', emoji: '📰' },
    { id: 'adik-minum-teh', text: 'Adik minum teh.', emoji: '🍵' },
    { id: 'kita-pergi-ke-pasar', text: 'Kita pergi ke pasar.', emoji: '🛒' },
  ],
}
