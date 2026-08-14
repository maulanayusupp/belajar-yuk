import type { EnglishLesson } from '~/types'

// Jagoan (advanced): real travel situations — arrange the words into a full
// phrase you'd actually say at the airport, hotel, or restaurant.
export const travelSituations: EnglishLesson = {
  id: 'enl-travel-situations',
  subject: 'english-life',
  type: 'sentence',
  title: 'Situasi Perjalanan',
  titleEn: 'Travel Situations',
  level: 'expert',
  emoji: '🧳',
  durationMin: 8,
  items: [
    {
      id: 'check-in',
      word: 'I would like to check in',
      translation: 'Saya ingin check in',
      why: '"I would like to" adalah cara sopan menyatakan keinginan mendaftar masuk.',
      emoji: '🛎️',
    },
    {
      id: 'boarding-gate',
      word: 'Where is the boarding gate',
      translation: 'Di mana gerbang keberangkatan',
      why: 'Frasa menanyakan letak gerbang tempat naik pesawat di bandara.',
      emoji: '🛫',
    },
    {
      id: 'breakfast-included',
      word: 'Is breakfast included',
      translation: 'Apakah sarapan sudah termasuk',
      why: 'Frasa menanyakan apakah sarapan sudah termasuk harga kamar hotel.',
      emoji: '🍳',
    },
    {
      id: 'the-bill-please',
      word: 'Can I have the bill please',
      translation: 'Boleh minta tagihannya',
      why: 'Pola "Can I have...please?" cara sopan meminta tagihan di restoran.',
      emoji: '🧾',
    },
    {
      id: 'flight-delayed',
      word: 'My flight has been delayed',
      translation: 'Penerbangan saya tertunda',
      why: '"Has been delayed" memberi tahu bahwa penerbangan menjadi tertunda.',
      emoji: '⏰',
    },
  ],
}
