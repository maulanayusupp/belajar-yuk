import type { EnglishLesson } from '~/types'

// Angka 11–20 (Bahasa Inggris) — kelanjutan Angka 1–10.
// `emoji` diisi numeral agar tampil besar sebagai gambar.
export const numbers1120: EnglishLesson = {
  id: 'en-numbers-11-20',
  subject: 'english',
  type: 'vocabulary',
  title: 'Angka 11–20',
  titleEn: 'Numbers 11–20',
  level: 'beginner',
  emoji: '🔢',
  durationMin: 7,
  items: [
    { id: 'eleven', word: 'Eleven', translation: 'Sebelas', emoji: '11' },
    { id: 'twelve', word: 'Twelve', translation: 'Dua belas', emoji: '12' },
    { id: 'thirteen', word: 'Thirteen', translation: 'Tiga belas', emoji: '13' },
    { id: 'fourteen', word: 'Fourteen', translation: 'Empat belas', emoji: '14' },
    { id: 'fifteen', word: 'Fifteen', translation: 'Lima belas', emoji: '15' },
    { id: 'sixteen', word: 'Sixteen', translation: 'Enam belas', emoji: '16' },
    { id: 'seventeen', word: 'Seventeen', translation: 'Tujuh belas', emoji: '17' },
    { id: 'eighteen', word: 'Eighteen', translation: 'Delapan belas', emoji: '18' },
    { id: 'nineteen', word: 'Nineteen', translation: 'Sembilan belas', emoji: '19' },
    { id: 'twenty', word: 'Twenty', translation: 'Dua puluh', emoji: '20' },
  ],
}
