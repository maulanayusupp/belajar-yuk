import type { EnglishLesson } from '~/types'

// Listening: hear the item's name → pick its picture (no text).
// Uses a DIFFERENT set of household items from the "Home" lesson.
export const listenHome: EnglishLesson = {
  id: 'en-listen-home',
  subject: 'english-life',
  type: 'listening',
  title: 'Menyimak: Isi Rumah',
  titleEn: 'Listen: Around the House',
  level: 'intermediate',
  emoji: '🎧',
  durationMin: 5,
  items: [
    {
      id: 'sofa',
      word: 'Sofa',
      translation: 'Sofa',
      emoji: '🛋️',
      why: 'Sofa = sofa, kursi panjang empuk untuk duduk bersama.',
    },
    {
      id: 'fridge',
      word: 'Fridge',
      translation: 'Kulkas',
      emoji: '🧊',
      why: 'Fridge = kulkas, lemari dingin untuk menyimpan makanan.',
    },
    {
      id: 'curtain',
      word: 'Curtain',
      translation: 'Gorden',
      emoji: '🪟',
      why: 'Curtain = gorden, kain penutup jendela.',
    },
    {
      id: 'carpet',
      word: 'Carpet',
      translation: 'Karpet',
      emoji: '🧶',
      why: 'Carpet = karpet, alas tebal yang digelar di lantai.',
    },
    {
      id: 'pillow',
      word: 'Pillow',
      translation: 'Bantal',
      emoji: '🛌',
      why: 'Pillow = bantal, alas empuk untuk kepala saat tidur.',
    },
    {
      id: 'vase',
      word: 'Vase',
      translation: 'Vas bunga',
      emoji: '🏺',
      why: 'Vase = vas, wadah tempat menaruh bunga.',
    },
  ],
}
