import type { EnglishLesson } from '~/types'

// Sentence building: polite phrases people say every day (word tiles → phrase).
export const phrasesPolite: EnglishLesson = {
  id: 'en-phrases-polite',
  subject: 'english-life',
  type: 'sentence',
  title: 'Frasa Sopan',
  titleEn: 'Polite Phrases',
  level: 'expert',
  emoji: '🙏',
  durationMin: 7,
  items: [
    {
      id: 'nice-to-meet-you',
      word: 'Nice to meet you',
      translation: 'Senang bertemu denganmu',
      why: 'Frasa sopan yang diucapkan saat pertama kali berkenalan dengan seseorang.',
      emoji: '🤝',
    },
    {
      id: 'excuse-me-please',
      word: 'Excuse me please',
      translation: 'Permisi',
      why: 'Frasa sopan untuk minta perhatian atau permisi lewat di depan orang.',
      emoji: '🙋',
    },
    {
      id: 'i-am-so-sorry',
      word: 'I am so sorry',
      translation: 'Aku minta maaf',
      why: 'Kata "so" menegaskan maaf agar terasa lebih tulus daripada "I am sorry".',
      emoji: '🙇',
    },
    {
      id: 'see-you-later',
      word: 'See you later',
      translation: 'Sampai jumpa nanti',
      why: 'Cara ramah berpamitan; artinya kita akan bertemu lagi nanti.',
      emoji: '👋',
    },
    {
      id: 'have-a-nice-day',
      word: 'Have a nice day',
      translation: 'Semoga harimu menyenangkan',
      why: 'Ucapan baik saat berpisah, mendoakan hari orang lain menyenangkan.',
      emoji: '😊',
    },
    {
      id: 'thank-you-so-much',
      word: 'Thank you so much',
      translation: 'Terima kasih banyak',
      why: 'Kata "so much" membuat ucapan terima kasih terasa lebih hangat.',
      emoji: '🙏',
    },
  ],
}
