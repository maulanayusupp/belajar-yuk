import type { BahasaLesson } from '~/types'
import { vowels } from './huruf-vokal'
import { syllablesMa } from './suku-kata-ma'
import { syllablesBa } from './suku-kata-ba'
import { syllablesSa } from './suku-kata-sa'
import { syllablesTa } from './suku-kata-ta'
import { syllablesNa } from './suku-kata-na'
import { syllablesPa } from './suku-kata-pa'
import { syllablesKa } from './suku-kata-ka'
import { syllablesDa } from './suku-kata-da'
import { syllablesLa } from './suku-kata-la'
import { buildWords } from './merangkai-kata'
import { buildWords2 } from './merangkai-kata-2'
import { buildWords3 } from './merangkai-kata-3'
import { simpleSentences } from './kalimat-sederhana'
import { simpleSentences2 } from './kalimat-sederhana-2'

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
  syllablesSa,
  syllablesTa,
  syllablesNa,
  syllablesPa,
  syllablesKa,
  syllablesDa,
  syllablesLa,
  // Intermediate: building words
  buildWords,
  buildWords2,
  buildWords3,
  // Advanced: reading sentences
  simpleSentences,
  simpleSentences2,
]
