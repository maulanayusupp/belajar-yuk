import type { EnglishLesson } from '~/types'

// Jagoan (B2–C1): less common, figurative idioms — genuinely advanced English.
export const idiomsAdvanced: EnglishLesson = {
  id: 'enl-idioms-advanced',
  subject: 'english-life',
  type: 'vocabulary',
  title: 'Idiom Lanjutan',
  titleEn: 'Advanced Idioms',
  level: 'expert',
  emoji: '🧠',
  durationMin: 8,
  items: [
    {
      id: 'arm-and-a-leg',
      word: 'Cost an arm and a leg',
      translation: 'Sangat mahal',
      emoji: '💸',
      example: 'That car cost an arm and a leg.',
    },
    {
      id: 'ball-in-court',
      word: 'The ball is in your court',
      translation: 'Keputusan ada di tanganmu',
      emoji: '🎾',
      example: 'I have done my part; the ball is in your court.',
    },
    {
      id: 'cut-corners',
      word: 'Cut corners',
      translation: 'Mengambil jalan pintas (asal jadi)',
      emoji: '✂️',
      example: "Don't cut corners on safety.",
    },
    {
      id: 'same-page',
      word: 'On the same page',
      translation: 'Sepaham',
      emoji: '📄',
      example: 'Let us make sure we are on the same page.',
    },
    {
      id: 'hang-of-it',
      word: 'Get the hang of it',
      translation: 'Mulai terbiasa / menguasai',
      emoji: '🎯',
      example: "You'll get the hang of it soon.",
    },
    {
      id: 'bite-the-bullet',
      word: 'Bite the bullet',
      translation: 'Hadapi hal sulit dengan berani',
      emoji: '😤',
      example: 'I decided to bite the bullet and start.',
    },
  ],
}
