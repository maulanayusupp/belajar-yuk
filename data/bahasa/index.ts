import type { BahasaLesson } from '~/types'
import { vowels } from './huruf-vokal'
import { syllablesMa } from './suku-kata-ma'
import { syllablesBa } from './suku-kata-ba'
import { buildWords } from './merangkai-kata'
import { simpleSentences } from './kalimat-sederhana'

// List and ORDER of Reading (Calistung) lessons: letters -> syllables -> words -> sentences.
//
// To add a new lesson:
//   1. Create a new FOLDER with an `index.ts` that exports a BahasaLesson.
//   2. Import it here, then add it to the array (position = display order).
export const bahasaLessons: BahasaLesson[] = [
  // Beginner: letters & syllables
  vowels,
  syllablesMa,
  syllablesBa,
  // Intermediate: building words
  buildWords,
  // Advanced: reading sentences
  simpleSentences,
]
