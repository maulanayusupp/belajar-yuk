import type { EnglishLesson } from '~/types'

// Listening: hear the item's name → pick its picture (no text).
// Uses a DIFFERENT set of household items from the "Home" lesson.
export const listenHome: EnglishLesson = {
  id: 'en-listen-home',
  subject: 'english',
  type: 'listening',
  title: 'Menyimak: Isi Rumah',
  titleEn: 'Listen: Around the House',
  level: 'intermediate',
  emoji: '🎧',
  durationMin: 5,
  items: [
    { id: 'sofa', word: 'Sofa', translation: 'Sofa', emoji: '🛋️' },
    { id: 'fridge', word: 'Fridge', translation: 'Kulkas', emoji: '🧊' },
    { id: 'curtain', word: 'Curtain', translation: 'Gorden', emoji: '🪟' },
    { id: 'carpet', word: 'Carpet', translation: 'Karpet', emoji: '🧶' },
    { id: 'pillow', word: 'Pillow', translation: 'Bantal', emoji: '🛌' },
    { id: 'vase', word: 'Vase', translation: 'Vas bunga', emoji: '🏺' },
  ],
}
