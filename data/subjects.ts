import type { Subject } from '~/types'

// List of subjects shown on the home page.
// To add a new subject, just add an entry here.
export const subjects: Subject[] = [
  {
    id: 'english',
    title: 'Bahasa Inggris',
    titleEn: 'English',
    emoji: '🔤',
    theme: 'english',
    description: 'Belajar kata-kata baru dengan gambar & suara.',
  },
  {
    id: 'math',
    title: 'Matematika',
    titleEn: 'Math',
    emoji: '🔢',
    theme: 'math',
    description: 'Berhitung seru pakai metode Singapore Math.',
  },
  {
    id: 'science',
    title: 'Sains',
    titleEn: 'Science',
    emoji: '🔬',
    theme: 'science',
    description: 'Menjelajah tubuh, hewan, & luar angkasa lewat fakta seru.',
  },
  {
    id: 'bahasa',
    title: 'Membaca',
    titleEn: 'Bahasa Indonesia',
    emoji: '📖',
    theme: 'bahasa',
    description: 'Belajar membaca dari huruf, suku kata, kata, hingga kalimat.',
  },
]
