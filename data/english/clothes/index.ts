import type { EnglishLesson } from '~/types'

// Kosakata: Pakaian (Pemula).
export const clothes: EnglishLesson = {
  id: 'en-clothes',
  subject: 'english',
  type: 'vocabulary',
  title: 'Pakaian',
  titleEn: 'Clothes',
  level: 'beginner',
  emoji: '👕',
  durationMin: 5,
  items: [
    { id: 'shirt', word: 'Shirt', translation: 'Baju', emoji: '👕', example: 'A blue shirt.' },
    {
      id: 'pants',
      word: 'Pants',
      translation: 'Celana',
      emoji: '👖',
      example: 'My pants are new.',
    },
    { id: 'shoes', word: 'Shoes', translation: 'Sepatu', emoji: '👟', example: 'I wear shoes.' },
    { id: 'hat', word: 'Hat', translation: 'Topi', emoji: '🧢', example: 'A red hat.' },
    { id: 'socks', word: 'Socks', translation: 'Kaus Kaki', emoji: '🧦', example: 'Warm socks.' },
    { id: 'dress', word: 'Dress', translation: 'Gaun', emoji: '👗', example: 'A pretty dress.' },
  ],
}
