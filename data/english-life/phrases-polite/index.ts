import type { EnglishLesson } from '~/types'

// Sentence building: polite phrases people say every day (word tiles → phrase).
export const phrasesPolite: EnglishLesson = {
  id: 'en-phrases-polite',
  subject: 'english-life',
  type: 'sentence',
  title: 'Frasa Sopan',
  titleEn: 'Polite Phrases',
  level: 'advanced',
  emoji: '🙏',
  durationMin: 7,
  items: [
    {
      id: 'nice-to-meet-you',
      word: 'Nice to meet you',
      translation: 'Senang bertemu denganmu',
      emoji: '🤝',
    },
    { id: 'excuse-me-please', word: 'Excuse me please', translation: 'Permisi', emoji: '🙋' },
    { id: 'i-am-so-sorry', word: 'I am so sorry', translation: 'Aku minta maaf', emoji: '🙇' },
    { id: 'see-you-later', word: 'See you later', translation: 'Sampai jumpa nanti', emoji: '👋' },
    {
      id: 'have-a-nice-day',
      word: 'Have a nice day',
      translation: 'Semoga harimu menyenangkan',
      emoji: '😊',
    },
    {
      id: 'thank-you-so-much',
      word: 'Thank you so much',
      translation: 'Terima kasih banyak',
      emoji: '🙏',
    },
  ],
}
