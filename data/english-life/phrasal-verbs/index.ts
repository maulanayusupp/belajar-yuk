import type { EnglishLesson } from '~/types'

// Mahir (B1): phrasal verbs — multi-word verbs whose meaning isn't literal.
// A real step up from single-word vocabulary.
export const phrasalVerbs: EnglishLesson = {
  id: 'enl-phrasal-verbs',
  subject: 'english-life',
  type: 'vocabulary',
  title: 'Phrasal Verb',
  titleEn: 'Phrasal Verbs',
  level: 'advanced',
  emoji: '🔗',
  durationMin: 7,
  items: [
    {
      id: 'turn-on',
      word: 'Turn on',
      translation: 'Menyalakan',
      emoji: '💡',
      example: 'Turn on the light.',
    },
    {
      id: 'turn-off',
      word: 'Turn off',
      translation: 'Mematikan',
      emoji: '🔌',
      example: 'Turn off the TV.',
    },
    {
      id: 'look-for',
      word: 'Look for',
      translation: 'Mencari',
      emoji: '🔎',
      example: 'I look for my keys.',
    },
    {
      id: 'give-up',
      word: 'Give up',
      translation: 'Menyerah',
      emoji: '🏳️',
      example: 'Never give up!',
    },
    {
      id: 'find-out',
      word: 'Find out',
      translation: 'Mencari tahu',
      emoji: '🕵️',
      example: "Let's find out.",
    },
    {
      id: 'run-out',
      word: 'Run out',
      translation: 'Kehabisan',
      emoji: '⛽',
      example: 'We run out of milk.',
    },
    {
      id: 'put-on',
      word: 'Put on',
      translation: 'Memakai',
      emoji: '🧥',
      example: 'Put on your jacket.',
    },
    {
      id: 'take-off',
      word: 'Take off',
      translation: 'Melepas / lepas landas',
      emoji: '🛫',
      example: 'The plane takes off.',
    },
  ],
}
