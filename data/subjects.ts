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
    description: 'Berhitung seru dengan cara bertahap yang mudah dipahami.',
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
  {
    id: 'english-life',
    title: 'English for Life',
    titleEn: 'Everyday English',
    emoji: '🌍',
    theme: 'english-life',
    description: 'Bahasa Inggris praktis: sehari-hari, kerja, travelling, & frasa penting.',
  },
]
