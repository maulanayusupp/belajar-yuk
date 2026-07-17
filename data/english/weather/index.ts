import type { EnglishLesson } from '~/types'

// Vocabulary: Weather (Beginner).
export const weather: EnglishLesson = {
  id: 'en-weather',
  subject: 'english',
  type: 'vocabulary',
  title: 'Cuaca',
  titleEn: 'Weather',
  level: 'beginner',
  emoji: '☀️',
  durationMin: 5,
  items: [
    {
      id: 'sunny',
      word: 'Sunny',
      translation: 'Cerah',
      emoji: '☀️',
      example: 'It is sunny today.',
    },
    { id: 'rainy', word: 'Rainy', translation: 'Hujan', emoji: '🌧️', example: 'A rainy day.' },
    {
      id: 'cloudy',
      word: 'Cloudy',
      translation: 'Berawan',
      emoji: '☁️',
      example: 'The sky is cloudy.',
    },
    { id: 'windy', word: 'Windy', translation: 'Berangin', emoji: '💨', example: 'It is windy.' },
    {
      id: 'snowy',
      word: 'Snowy',
      translation: 'Bersalju',
      emoji: '❄️',
      example: 'A snowy morning.',
    },
    { id: 'stormy', word: 'Stormy', translation: 'Badai', emoji: '⛈️', example: 'A stormy night.' },
  ],
}
