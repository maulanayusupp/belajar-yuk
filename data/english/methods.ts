import type { EnglishActivity } from '~/types'

// Registry metadata JENIS aktivitas Bahasa Inggris (mesin materi dinamis).
// Menambah aktivitas baru = tambah nilai di `EnglishActivity` (types) + entri di sini.
export interface EnglishActivityMeta {
  icon: string
  label: string
  description: string
}

export const englishActivityMeta: Record<EnglishActivity, EnglishActivityMeta> = {
  vocabulary: {
    icon: '🗣️',
    label: 'Dengar & Ucapkan',
    description: 'Kosakata bergambar dengan pengucapan asli, lalu diuji lewat kuis.',
  },
  phonics: {
    icon: '🔤',
    label: 'Phonics',
    description: 'Mengenal bunyi huruf lewat kata contoh — fondasi membaca.',
  },
  listening: {
    icon: '🎧',
    label: 'Menyimak',
    description: 'Dengar kata lalu pilih gambar yang tepat — tanpa teks.',
  },
}
