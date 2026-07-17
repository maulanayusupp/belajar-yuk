import type { BahasaLesson } from '~/types'

// Membaca: suku kata dengan huruf M (ma-mi-mu-me-mo).
export const sukuKataMa: BahasaLesson = {
  id: 'bhs-suku-kata-ma',
  subject: 'bahasa',
  type: 'suku-kata',
  title: 'Suku Kata: MA MI MU',
  titleEn: 'ma mi mu me mo',
  level: 'beginner',
  emoji: '🧩',
  durationMin: 5,
  items: [
    { id: 'ma', text: 'ma' },
    { id: 'mi', text: 'mi' },
    { id: 'mu', text: 'mu' },
    { id: 'me', text: 'me' },
    { id: 'mo', text: 'mo' },
  ],
}
