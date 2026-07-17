import type { BahasaLesson } from '~/types'

// Membaca: suku kata dengan huruf B (ba-bi-bu-be-bo).
export const sukuKataBa: BahasaLesson = {
  id: 'bhs-suku-kata-ba',
  subject: 'bahasa',
  type: 'suku-kata',
  title: 'Suku Kata: BA BI BU',
  titleEn: 'ba bi bu be bo',
  level: 'beginner',
  emoji: '🧩',
  durationMin: 5,
  items: [
    { id: 'ba', text: 'ba' },
    { id: 'bi', text: 'bi' },
    { id: 'bu', text: 'bu' },
    { id: 'be', text: 'be' },
    { id: 'bo', text: 'bo' },
  ],
}
