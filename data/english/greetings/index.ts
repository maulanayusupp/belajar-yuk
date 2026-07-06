import type { EnglishLesson } from '~/types'

// Ungkapan sehari-hari / sapaan (Mahir) — kosakata berupa frasa.
export const greetings: EnglishLesson = {
  id: 'en-greetings',
  subject: 'english',
  type: 'vocabulary',
  title: 'Sapaan & Ungkapan',
  titleEn: 'Greetings & Phrases',
  level: 'advanced',
  emoji: '👋',
  durationMin: 7,
  items: [
    { id: 'good-morning', word: 'Good morning', translation: 'Selamat pagi', emoji: '🌅' },
    { id: 'thank-you', word: 'Thank you', translation: 'Terima kasih', emoji: '🙏' },
    { id: 'good-night', word: 'Good night', translation: 'Selamat malam', emoji: '🌙' },
    { id: 'how-are-you', word: 'How are you?', translation: 'Apa kabar?', emoji: '😊' },
    { id: 'goodbye', word: 'Goodbye', translation: 'Selamat tinggal', emoji: '👋' },
    { id: 'im-sorry', word: "I'm sorry", translation: 'Maaf', emoji: '😔' },
  ],
}
