import type { BahasaActivity } from '~/types'

// Registry metadata for TYPES of Reading activities (dynamic content engine).
// Adding a new activity = add a value to `BahasaActivity` (types) + an entry here.
export interface BahasaActivityMeta {
  icon: string
  label: string
  description: string
}

export const bahasaActivityMeta: Record<BahasaActivity, BahasaActivityMeta> = {
  huruf: {
    icon: '🔡',
    label: 'Mengenal Huruf',
    description: 'Kenali bentuk & bunyi tiap huruf — langkah pertama membaca.',
  },
  'suku-kata': {
    icon: '🧩',
    label: 'Suku Kata',
    description: 'Membaca suku kata ba-bi-bu-be-bo — kunci membaca Bahasa Indonesia.',
  },
  kata: {
    icon: '📖',
    label: 'Merangkai Kata',
    description: 'Menggabungkan suku kata menjadi kata yang utuh.',
  },
  kalimat: {
    icon: '💬',
    label: 'Membaca Kalimat',
    description: 'Membaca kalimat pendek sederhana dengan lancar.',
  },
}
