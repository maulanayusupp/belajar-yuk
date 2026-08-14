import type { EnglishLesson } from '~/types'

// Sentence building: handy phrases for travelling & asking for help.
export const phrasesTravel: EnglishLesson = {
  id: 'en-phrases-travel',
  subject: 'english',
  type: 'sentence',
  title: 'Frasa saat Bepergian',
  titleEn: 'Travel Phrases',
  level: 'advanced',
  emoji: '🧭',
  durationMin: 7,
  items: [
    {
      id: 'where-is-the-toilet',
      word: 'Where is the toilet',
      translation: 'Di mana toiletnya',
      emoji: '🚻',
    },
    {
      id: 'how-much-is-this',
      word: 'How much is this',
      translation: 'Berapa harganya ini',
      emoji: '💵',
    },
    {
      id: 'can-you-help-me',
      word: 'Can you help me',
      translation: 'Bisakah kamu membantuku',
      emoji: '🆘',
    },
    {
      id: 'i-do-not-understand',
      word: 'I do not understand',
      translation: 'Aku tidak mengerti',
      emoji: '🤔',
    },
    {
      id: 'please-speak-slowly',
      word: 'Please speak slowly',
      translation: 'Tolong bicara pelan-pelan',
      emoji: '🐢',
    },
  ],
}
