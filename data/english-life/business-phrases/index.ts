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
      why: 'Ajakan sopan mengatur waktu rapat; "let us" berarti mari kita.',
      emoji: '📅',
    },
    {
      id: 'send-report',
      word: 'Please send the report',
      translation: 'Tolong kirim laporannya',
      why: 'Kata "please" membuat permintaan mengirim laporan terdengar sopan.',
      emoji: '📧',
    },
    {
      id: 'follow-up',
      word: 'I will follow up soon',
      translation: 'Saya akan menindaklanjuti segera',
      why: '"Follow up" berarti menindaklanjuti; janji mengurus kelanjutannya nanti.',
      emoji: '🔁',
    },
    {
      id: 'reschedule-call',
      word: 'Can we reschedule the call',
      translation: 'Bisakah kita jadwalkan ulang teleponnya',
      why: '"Reschedule" berarti menjadwalkan ulang telepon yang sudah diatur.',
      emoji: '☎️',
    },
    {
      id: 'thanks-for-time',
      word: 'Thank you for your time',
      translation: 'Terima kasih atas waktunya',
      why: 'Ucapan sopan untuk menghargai waktu yang sudah orang berikan.',
      emoji: '🤝',
    },
  ],
}
