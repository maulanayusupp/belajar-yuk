import type { EnglishLesson } from '~/types'

// Sentence building (actions) — slightly longer sentences about doing things.
export const sentenceActions: EnglishLesson = {
  id: 'en-sentence-actions',
  subject: 'english',
  type: 'sentence',
  title: 'Menyusun Kalimat: Aku Bisa',
  titleEn: 'Build a Sentence: Actions',
  level: 'advanced',
  emoji: '🧩',
  durationMin: 7,
  items: [
    {
      id: 'i-can-run-fast',
      word: 'I can run fast',
      translation: 'Aku bisa lari cepat',
      emoji: '🏃',
    },
    {
      id: 'we-go-to-school',
      word: 'We go to school',
      translation: 'Kami pergi ke sekolah',
      emoji: '🏫',
    },
    {
      id: 'the-bird-can-fly',
      word: 'The bird can fly',
      translation: 'Burung bisa terbang',
      emoji: '🐦',
    },
    { id: 'my-mom-is-kind', word: 'My mom is kind', translation: 'Ibuku baik hati', emoji: '👩' },
    { id: 'i-want-to-play', word: 'I want to play', translation: 'Aku ingin bermain', emoji: '🎮' },
    {
      id: 'he-has-a-red-ball',
      word: 'He has a red ball',
      translation: 'Dia punya bola merah',
      emoji: '🔴',
    },
  ],
}
