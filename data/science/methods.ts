import type { ScienceActivity } from '~/types'

// Registry metadata JENIS aktivitas Sains (mesin materi dinamis).
// Menambah aktivitas baru = tambah nilai di `ScienceActivity` (types) + entri di sini.
export interface ScienceActivityMeta {
  icon: string
  label: string
  description: string
}

export const scienceActivityMeta: Record<ScienceActivity, ScienceActivityMeta> = {
  explore: {
    icon: '🔬',
    label: 'Kenali & Jawab',
    description: 'Amati fakta bergambar tentang dunia sekitar, lalu uji pemahaman lewat kuis.',
  },
}
