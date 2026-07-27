import type { Level } from '~/types'

// Difficulty/age tiers ("categories") used to group materials so parents & kids
// know which is for whom. Named Tunas / Penjelajah / Juara with an age hint.
// This is the SINGLE source of truth — cards, subject pages, and the coding
// map all read their category label/age/icon from here.
export interface LevelMeta {
  id: Level
  /** Category name shown to users (Tunas / Penjelajah / Juara). */
  label: string
  /** Age hint for the tier, e.g. '6–7 th'. */
  age: string
  icon: string
  description: string
}

// Array order = display order (easiest → hardest).
export const levels: LevelMeta[] = [
  {
    id: 'beginner',
    label: 'Tunas',
    age: '6–7 th',
    icon: '🌱',
    description: 'Langkah pertama — materi paling dasar dengan banyak bantuan gambar & suara.',
  },
  {
    id: 'intermediate',
    label: 'Penjelajah',
    age: '8–9 th',
    icon: '🚀',
    description: 'Selangkah lebih tinggi — materi yang sedikit lebih menantang untuk diasah.',
  },
  {
    id: 'advanced',
    label: 'Juara',
    age: '10+ th',
    icon: '🏆',
    description: 'Tantangan lanjutan — materi yang membuat anak makin percaya diri.',
  },
]
