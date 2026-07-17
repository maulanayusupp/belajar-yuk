import type { Level } from '~/types'

// Difficulty level categories (used to group lessons so that
// non-expert users know which are for beginner, intermediate, or advanced).
export interface LevelMeta {
  id: Level
  label: string
  icon: string
  description: string
}

// Array order = display order (beginner → advanced).
export const levels: LevelMeta[] = [
  {
    id: 'beginner',
    label: 'Pemula',
    icon: '🌱',
    description: 'Langkah pertama — mengenal huruf, kata, & angka sampai 10 dengan bantuan gambar.',
  },
  {
    id: 'intermediate',
    label: 'Menengah',
    icon: '🚀',
    description: 'Selangkah lebih tinggi — berhitung dengan angka lebih besar (sampai 20).',
  },
  {
    id: 'advanced',
    label: 'Mahir',
    icon: '🏆',
    description:
      'Tantangan lanjutan: menyimak tanpa teks, menyusun kata & kalimat, membandingkan bilangan, & soal abstrak.',
  },
]
