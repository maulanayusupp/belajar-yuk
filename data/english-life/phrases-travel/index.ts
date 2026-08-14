import type { EnglishLesson } from '~/types'

// Sentence building: handy phrases for travelling & asking for help.
export const phrasesTravel: EnglishLesson = {
  id: 'en-phrases-travel',
  subject: 'english-life',
  type: 'sentence',
  title: 'Frasa saat Bepergian',
  titleEn: 'Travel Phrases',
  level: 'expert',
  emoji: '🧭',
  durationMin: 7,
  items: [
    {
      id: 'where-is-the-toilet',
      word: 'Where is the toilet',
      translation: 'Di mana toiletnya',
      why: 'Frasa untuk menanyakan letak toilet saat sedang bepergian.',
      emoji: '🚻',
    },
    {
      id: 'how-much-is-this',
      word: 'How much is this',
      translation: 'Berapa harganya ini',
      why: 'Frasa menanyakan harga barang; "how much" berarti berapa banyak.',
      emoji: '💵',
    },
    {
      id: 'can-you-help-me',
      word: 'Can you help me',
      translation: 'Bisakah kamu membantuku',
      why: 'Pola "Can you...?" adalah cara sopan meminta bantuan orang lain.',
      emoji: '🆘',
    },
    {
      id: 'i-do-not-understand',
      word: 'I do not understand',
      translation: 'Aku tidak mengerti',
      why: 'Frasa untuk memberi tahu bahwa kita belum paham agar dijelaskan lagi.',
      emoji: '🤔',
    },
    {
      id: 'please-speak-slowly',
      word: 'Please speak slowly',
      translation: 'Tolong bicara pelan-pelan',
      why: 'Kata "please" membuat permintaan bicara pelan jadi lebih sopan.',
      emoji: '🐢',
    },
  ],
}
