import type { EnglishLesson } from '~/types'

// Menengah (A2): reading comprehension — read a short passage, then answer
// a question about it. Real reading skill, the hardest tier.
export const readingStory: EnglishLesson = {
  id: 'enl-reading-story',
  subject: 'english-life',
  type: 'comprehension',
  title: 'Baca Paham',
  titleEn: 'Reading Comprehension',
  level: 'intermediate',
  emoji: '📕',
  durationMin: 9,
  items: [
    {
      id: 'market',
      word: 'Apples and milk',
      translation: 'Apel dan susu',
      emoji: '🛒',
      prompt: 'Tom goes to the market. He buys apples and milk. What does Tom buy?',
      options: ['Apples and milk', 'Bread and eggs', 'A new book'],
      answer: 'Apples and milk',
    },
    {
      id: 'umbrella',
      word: 'Because it is raining',
      translation: 'Karena hujan',
      emoji: '🌧️',
      prompt: 'It is raining. Ann takes an umbrella. Why does Ann take an umbrella?',
      options: ['Because it is raining', 'Because it is hot', 'Because she is hungry'],
      answer: 'Because it is raining',
    },
    {
      id: 'train',
      word: 'One hour',
      translation: 'Satu jam',
      emoji: '🚆',
      prompt: 'The train leaves at eight. It is seven now. How long until the train leaves?',
      options: ['One hour', 'Two hours', 'Ten minutes'],
      answer: 'One hour',
    },
    {
      id: 'sleep',
      word: 'She goes to bed early',
      translation: 'Dia tidur lebih awal',
      emoji: '😴',
      prompt: 'Sara is very tired. She goes to bed early. What does Sara do?',
      options: ['She goes to bed early', 'She plays outside', 'She cooks dinner'],
      answer: 'She goes to bed early',
    },
    {
      id: 'zoo',
      word: 'Lions and monkeys',
      translation: 'Singa dan monyet',
      emoji: '🦁',
      prompt: 'We visit the zoo. We see lions and monkeys. What do we see?',
      options: ['Lions and monkeys', 'Fish and birds', 'Cars and buses'],
      answer: 'Lions and monkeys',
    },
  ],
}
