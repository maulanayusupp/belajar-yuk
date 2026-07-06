import type { Level } from '~/types'

// Kategori tingkat kesulitan (dipakai untuk mengelompokkan pelajaran
// agar pengguna awam tahu mana untuk pemula, menengah, atau mahir).
export interface LevelMeta {
  id: Level
  label: string
  icon: string
  description: string
}

// Urutan array = urutan tampil (pemula → mahir).
export const levels: LevelMeta[] = [
  {
    id: 'beginner',
    label: 'Pemula',
    icon: '🌱',
    description: 'Langkah pertama — mengenal huruf, angka, & kata-kata dasar.',
  },
  {
    id: 'intermediate',
    label: 'Menengah',
    icon: '🚀',
    description: 'Menambah kosakata & kemampuan berhitung ke level berikutnya.',
  },
  {
    id: 'advanced',
    label: 'Mahir',
    icon: '🏆',
    description: 'Tantangan lebih seru untuk anak yang sudah siap melangkah jauh.',
  },
]
