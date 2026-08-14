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
      emoji: '🛎️',
    },
    {
      id: 'boarding-gate',
      word: 'Where is the boarding gate',
      translation: 'Di mana gerbang keberangkatan',
      emoji: '🛫',
    },
    {
      id: 'breakfast-included',
      word: 'Is breakfast included',
      translation: 'Apakah sarapan sudah termasuk',
      emoji: '🍳',
    },
    {
      id: 'the-bill-please',
      word: 'Can I have the bill please',
      translation: 'Boleh minta tagihannya',
      emoji: '🧾',
    },
    {
      id: 'flight-delayed',
      word: 'My flight has been delayed',
      translation: 'Penerbangan saya tertunda',
      emoji: '⏰',
    },
  ],
}
