import type { EnglishLesson } from '~/types'
import { phonics } from './phonics'
import { phonicsGL } from './phonics-glm'
import { phonicsMR } from './phonics-mnr'
import { phonicsSZ } from './phonics-sz'
import { sightWords } from './sight-words'
import { cvcWords } from './cvc-words'
import { feelings } from './feelings'
import { animals } from './animals'
import { fruits } from './fruits'
import { colors } from './colors'
import { numbers } from './numbers'
import { numbers1120 } from './numbers-11-20'
import { body } from './body'
import { shapes } from './shapes'
import { family } from './family'
import { food } from './food'
import { days } from './days'
import { verbs } from './verbs'
import { greetings } from './greetings'
import { opposites } from './opposites'
import { jobs } from './jobs'
import { school } from './school'
import { home } from './home'
import { vegetables } from './vegetables'
import { transport } from './transport'
import { weather } from './weather'
import { clothes } from './clothes'
import { nature } from './nature'
import { listenAnimals } from './listen-animals'
import { listenFood } from './listen-food'
import { spellCvc } from './spell-cvc'
import { spellColors } from './spell-colors'

// List & ORDER of English lessons (beginner → advanced).
//
// ➕ Adding a new lesson:
//   1. Create a new FOLDER containing `index.ts` that exports an EnglishLesson.
//   2. Import it here, then add it to the array (position = display order).
export const englishLessons: EnglishLesson[] = [
  // Reading foundation (phonics A–Z + common words)
  phonics,
  phonicsGL,
  phonicsMR,
  phonicsSZ,
  cvcWords,
  sightWords,
  // Themed vocabulary
  animals,
  fruits,
  colors,
  numbers,
  numbers1120,
  body,
  shapes,
  transport,
  weather,
  clothes,
  nature,
  family,
  food,
  days,
  verbs,
  feelings,
  greetings,
  opposites,
  jobs,
  school,
  home,
  vegetables,
  // Intermediate: listening (hear → pick the picture)
  listenAnimals,
  listenFood,
  // Advanced: spell / build words
  spellCvc,
  spellColors,
]
