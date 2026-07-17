import type { BahasaLesson } from '~/types'

// Membaca: mengenal huruf vokal A-I-U-E-O (fondasi pertama).
export const hurufVokal: BahasaLesson = {
  id: 'bhs-huruf-vokal',
  subject: 'bahasa',
  type: 'huruf',
  title: 'Huruf Vokal',
  titleEn: 'A I U E O',
  level: 'beginner',
  emoji: '🔤',
  durationMin: 5,
  items: [
    { id: 'a', text: 'A', emoji: '🍍', hint: 'Apel, Api' },
    { id: 'i', text: 'I', emoji: '🐟', hint: 'Ikan' },
    { id: 'u', text: 'U', emoji: '🐛', hint: 'Ular, Ubi' },
    { id: 'e', text: 'E', emoji: '🦅', hint: 'Elang' },
    { id: 'o', text: 'O', emoji: '🚗', hint: 'Oto, Obat' },
  ],
}
