import type { EnglishLesson } from '~/types'

// CVC words (consonant–vowel–consonant) — 3-letter words that can be "sounded out"
// (decodable). An essential step after phonics in the Science of Reading:
// children blend letter sounds into whole words.
export const cvcWords: EnglishLesson = {
  id: 'en-cvc-words',
  subject: 'english',
  type: 'vocabulary',
  title: 'Kata 3 Huruf (CVC)',
  titleEn: 'CVC Words',
  level: 'beginner',
  emoji: '🐱',
  durationMin: 6,
  items: [
    { id: 'cat', word: 'Cat', translation: 'Kucing', emoji: '🐱', example: 'c-a-t — cat!' },
    { id: 'dog', word: 'Dog', translation: 'Anjing', emoji: '🐶', example: 'd-o-g — dog!' },
    { id: 'pig', word: 'Pig', translation: 'Babi', emoji: '🐷', example: 'p-i-g — pig!' },
    { id: 'sun', word: 'Sun', translation: 'Matahari', emoji: '☀️', example: 's-u-n — sun!' },
    { id: 'hat', word: 'Hat', translation: 'Topi', emoji: '🧢', example: 'h-a-t — hat!' },
    { id: 'cup', word: 'Cup', translation: 'Gelas', emoji: '🥤', example: 'c-u-p — cup!' },
    { id: 'bus', word: 'Bus', translation: 'Bis', emoji: '🚌', example: 'b-u-s — bus!' },
    { id: 'box', word: 'Box', translation: 'Kotak', emoji: '📦', example: 'b-o-x — box!' },
  ],
}
