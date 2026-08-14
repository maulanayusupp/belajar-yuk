import type { EnglishLesson } from '~/types'

// Vocabulary: the twelve months of the year.
export const months: EnglishLesson = {
  id: 'en-months',
  subject: 'english-life',
  type: 'vocabulary',
  title: 'Bulan dalam Setahun',
  titleEn: 'Months of the Year',
  level: 'beginner',
  emoji: '🗓️',
  durationMin: 7,
  items: [
    { id: 'january', word: 'January', translation: 'Januari', emoji: '❄️' },
    { id: 'february', word: 'February', translation: 'Februari', emoji: '💝' },
    { id: 'march', word: 'March', translation: 'Maret', emoji: '🌱' },
    { id: 'april', word: 'April', translation: 'April', emoji: '🌧️' },
    { id: 'may', word: 'May', translation: 'Mei', emoji: '🌸' },
    { id: 'june', word: 'June', translation: 'Juni', emoji: '☀️' },
    { id: 'july', word: 'July', translation: 'Juli', emoji: '🏖️' },
    { id: 'august', word: 'August', translation: 'Agustus', emoji: '🌻' },
    { id: 'september', word: 'September', translation: 'September', emoji: '🍂' },
    { id: 'october', word: 'October', translation: 'Oktober', emoji: '🎃' },
    { id: 'november', word: 'November', translation: 'November', emoji: '🍁' },
    { id: 'december', word: 'December', translation: 'Desember', emoji: '🎄' },
  ],
}
