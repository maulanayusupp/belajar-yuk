import type { ScienceActivity } from '~/types'

// Registry metadata for TYPES of Science activities (dynamic content engine).
// Adding a new activity = add a value to `ScienceActivity` (types) + an entry here.
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
