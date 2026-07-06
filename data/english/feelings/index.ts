import type { EnglishLesson } from '~/types'

// Perasaan/Emosi — pembelajaran sosial-emosional (umum di EYFS/kurikulum awal).
export const feelings: EnglishLesson = {
  id: 'en-feelings',
  subject: 'english',
  type: 'vocabulary',
  title: 'Perasaan',
  titleEn: 'Feelings',
  level: 'beginner',
  emoji: '😊',
  durationMin: 5,
  items: [
    { id: 'happy', word: 'Happy', translation: 'Senang', emoji: '😄', example: 'I feel happy.' },
    { id: 'sad', word: 'Sad', translation: 'Sedih', emoji: '😢', example: 'She is sad.' },
    { id: 'angry', word: 'Angry', translation: 'Marah', emoji: '😠', example: 'Do not be angry.' },
    {
      id: 'scared',
      word: 'Scared',
      translation: 'Takut',
      emoji: '😨',
      example: 'The dark is scary.',
    },
    {
      id: 'sleepy',
      word: 'Sleepy',
      translation: 'Mengantuk',
      emoji: '😴',
      example: 'I am sleepy.',
    },
    {
      id: 'excited',
      word: 'Excited',
      translation: 'Bersemangat',
      emoji: '🤩',
      example: 'We are excited!',
    },
  ],
}
