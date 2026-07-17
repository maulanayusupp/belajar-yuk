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
