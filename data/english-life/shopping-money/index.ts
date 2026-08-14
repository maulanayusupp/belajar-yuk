import type { EnglishLesson } from '~/types'

// Vocabulary: shopping & money.
export const shoppingMoney: EnglishLesson = {
  id: 'en-shopping-money',
  subject: 'english-life',
  type: 'listening',
  title: 'Belanja & Uang',
  titleEn: 'Shopping & Money',
  level: 'advanced',
  emoji: '🛍️',
  durationMin: 6,
  items: [
    { id: 'money', word: 'Money', translation: 'Uang', emoji: '💰', example: 'I save my money.' },
    {
      id: 'price',
      word: 'Price',
      translation: 'Harga',
      emoji: '🏷️',
      example: 'What is the price?',
    },
    {
      id: 'cheap',
      word: 'Cheap',
      translation: 'Murah',
      emoji: '💸',
      example: 'This bag is cheap.',
    },
    {
      id: 'expensive',
      word: 'Expensive',
      translation: 'Mahal',
      emoji: '💎',
      example: 'The ring is expensive.',
    },
    {
      id: 'cashier',
      word: 'Cashier',
      translation: 'Kasir',
      emoji: '🧑‍💼',
      example: 'Pay the cashier.',
    },
    {
      id: 'receipt',
      word: 'Receipt',
      translation: 'Struk / kwitansi',
      emoji: '📃',
      example: 'Keep the receipt.',
    },
    {
      id: 'wallet',
      word: 'Wallet',
      translation: 'Dompet',
      emoji: '👛',
      example: 'My wallet is small.',
    },
    {
      id: 'discount',
      word: 'Discount',
      translation: 'Diskon / potongan harga',
      emoji: '🔖',
      example: 'A big discount today!',
    },
  ],
}
