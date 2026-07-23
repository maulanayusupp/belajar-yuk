import type { EnglishLesson } from '~/types'

// Sentence building (basic) — arrange word tiles into a simple sentence.
// `word` holds the full English sentence; `translation` the Indonesian meaning.
export const sentenceBasic: EnglishLesson = {
  id: 'en-sentence-basic',
  subject: 'english',
  type: 'sentence',
  title: 'Menyusun Kalimat: Ini & Itu',
  titleEn: 'Build a Sentence',
  level: 'intermediate',
  emoji: '🧩',
  durationMin: 6,
  items: [
    { id: 'it-is-a-cat', word: 'It is a cat', translation: 'Itu seekor kucing', emoji: '🐱' },
    { id: 'this-is-my-book', word: 'This is my book', translation: 'Ini bukuku', emoji: '📖' },
    { id: 'i-see-a-dog', word: 'I see a dog', translation: 'Aku melihat anjing', emoji: '🐶' },
    {
      id: 'the-sun-is-hot',
      word: 'The sun is hot',
      translation: 'Matahari itu panas',
      emoji: '☀️',
    },
    { id: 'i-like-apples', word: 'I like apples', translation: 'Aku suka apel', emoji: '🍎' },
    { id: 'she-is-happy', word: 'She is happy', translation: 'Dia senang', emoji: '😊' },
  ],
}
