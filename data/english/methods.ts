import type { EnglishActivity } from '~/types'

// Metadata registry for English activity TYPES (dynamic content engine).
// Adding a new activity = add a value in `EnglishActivity` (types) + an entry here.
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
  spelling: {
    icon: '✍️',
    label: 'Eja Kata',
    description: 'Susun huruf menjadi kata yang benar — melatih menulis & membaca.',
  },
  sentence: {
    icon: '🧩',
    label: 'Menyusun Kalimat',
    description: 'Susun kata-kata menjadi kalimat yang benar — memahami tata bahasa.',
  },
}
