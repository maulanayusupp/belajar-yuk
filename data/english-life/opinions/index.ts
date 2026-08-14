import type { EnglishLesson } from '~/types'

// Jagoan (B2): giving opinions & agreeing/disagreeing — advanced functional
// conversation. Read what's said, pick the natural, fluent response.
export const opinions: EnglishLesson = {
  id: 'enl-opinions',
  subject: 'english-life',
  type: 'dialogue',
  title: 'Beropini & Setuju',
  titleEn: 'Opinions & Agreeing',
  level: 'expert',
  emoji: '🗣️',
  durationMin: 8,
  items: [
    {
      id: 'leave-early',
      word: 'I totally agree',
      translation: 'Aku sangat setuju',
      emoji: '👍',
      prompt: 'I think we should leave early.',
      options: ['I totally agree', 'It is a cat', 'Yes, I am fine'],
      answer: 'I totally agree',
    },
    {
      id: 'the-plan',
      word: 'It sounds great to me',
      translation: 'Kedengarannya bagus',
      emoji: '💡',
      prompt: 'What do you think of the plan?',
      options: ['It sounds great to me', 'I am from Jakarta', 'See you later'],
      answer: 'It sounds great to me',
    },
    {
      id: 'agree-with-me',
      word: 'I see your point, but no',
      translation: 'Aku paham maksudmu, tapi tidak',
      emoji: '🤔',
      prompt: 'Do you agree with me?',
      options: ['I see your point, but no', 'I am hungry', 'It is Monday'],
      answer: 'I see your point, but no',
    },
    {
      id: 'expensive',
      word: 'I could not agree more',
      translation: 'Aku sangat setuju',
      emoji: '💯',
      prompt: 'This restaurant is really expensive.',
      options: ['I could not agree more', 'I am a teacher', 'Turn left here'],
      answer: 'I could not agree more',
    },
    {
      id: 'take-train',
      word: 'I would rather fly',
      translation: 'Aku lebih memilih terbang',
      emoji: '✈️',
      prompt: 'Should we take the train?',
      options: ['I would rather fly', 'Yes, have some tea', 'It is raining'],
      answer: 'I would rather fly',
    },
  ],
}
