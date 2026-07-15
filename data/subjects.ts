import type { Subject } from '~/types'

// Daftar mata pelajaran yang tampil di halaman utama.
// Tambah pelajaran baru cukup dengan menambah entri di sini.
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
]
