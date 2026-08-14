import type { EnglishLesson } from '~/types'

// Jagoan (advanced): work / office phrases — arrange the words into a useful
// business sentence (sentence-building runner).
export const businessPhrases: EnglishLesson = {
  id: 'enl-business-phrases',
  subject: 'english-life',
  type: 'sentence',
  title: 'Frasa Kantor',
  titleEn: 'Business Phrases',
  level: 'expert',
  emoji: '💼',
  durationMin: 8,
  items: [
    {
      id: 'schedule-meeting',
      word: 'Let us schedule a meeting',
      translation: 'Mari jadwalkan rapat',
      emoji: '📅',
    },
    {
      id: 'send-report',
      word: 'Please send the report',
      translation: 'Tolong kirim laporannya',
      emoji: '📧',
    },
    {
      id: 'follow-up',
      word: 'I will follow up soon',
      translation: 'Saya akan menindaklanjuti segera',
      emoji: '🔁',
    },
    {
      id: 'reschedule-call',
      word: 'Can we reschedule the call',
      translation: 'Bisakah kita jadwalkan ulang teleponnya',
      emoji: '☎️',
    },
    {
      id: 'thanks-for-time',
      word: 'Thank you for your time',
      translation: 'Terima kasih atas waktunya',
      emoji: '🤝',
    },
  ],
}
