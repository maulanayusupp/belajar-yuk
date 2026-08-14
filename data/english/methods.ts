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
  reading: {
    icon: '📖',
    label: 'Baca & Pahami',
    description: 'Baca kalimat lalu pilih gambar yang tepat — melatih pemahaman membaca.',
  },
  'fill-blank': {
    icon: '✏️',
    label: 'Isian',
    description: 'Isi bagian kosong dalam kalimat dengan kata yang tepat — memahami tata bahasa.',
  },
  dialogue: {
    icon: '💬',
    label: 'Percakapan',
    description: 'Baca ucapan lalu pilih balasan yang paling pas — melatih percakapan.',
  },
  comprehension: {
    icon: '📕',
    label: 'Baca Paham',
    description: 'Baca teks pendek lalu jawab pertanyaannya — pemahaman membaca tingkat lanjut.',
  },
}
