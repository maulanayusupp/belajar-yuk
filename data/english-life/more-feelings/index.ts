import type { EnglishLesson } from '~/types'

// Vocabulary: more feelings (a different set from the basic "Feelings" lesson).
export const moreFeelings: EnglishLesson = {
  id: 'en-more-feelings',
  subject: 'english-life',
  type: 'listening',
  title: 'Perasaan Lanjutan',
  titleEn: 'More Feelings',
  level: 'intermediate',
  emoji: '😌',
  durationMin: 6,
  items: [
    { id: 'tired', word: 'Tired', translation: 'Lelah', emoji: '😫', example: 'I am tired now.' },
    { id: 'bored', word: 'Bored', translation: 'Bosan', emoji: '🥱', example: 'I feel bored.' },
    {
      id: 'surprised',
      word: 'Surprised',
      translation: 'Terkejut',
      emoji: '😲',
      example: 'She is surprised.',
    },
    { id: 'hungry', word: 'Hungry', translation: 'Lapar', emoji: '😋', example: 'I am hungry.' },
    { id: 'thirsty', word: 'Thirsty', translation: 'Haus', emoji: '😛', example: 'I am thirsty.' },
    { id: 'shy', word: 'Shy', translation: 'Malu', emoji: '😳', example: 'He is shy.' },
    { id: 'brave', word: 'Brave', translation: 'Berani', emoji: '🦸', example: 'Be brave!' },
    {
      id: 'proud',
      word: 'Proud',
      translation: 'Bangga',
      emoji: '🏅',
      example: 'I am proud of you.',
    },
  ],
}
