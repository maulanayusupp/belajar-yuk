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
import { ocean } from './ocean'
import { music } from './music'
import { transport } from './transport'
import { weather } from './weather'
import { clothes } from './clothes'
import { nature } from './nature'
import { listenAnimals } from './listen-animals'
import { listenFood } from './listen-food'
import { spellCvc } from './spell-cvc'
import { spellColors } from './spell-colors'
import { sentenceBasic } from './sentence-basic'
import { sentenceActions } from './sentence-actions'
// "English for Life" module (beginner → advanced) — see MODULE_PLAN.md
import { dailyRoutine } from './daily-routine'
import { kitchen } from './kitchen'
import { bathroom } from './bathroom'
import { months } from './months'
import { placesTown } from './places-town'
import { actionVerbs } from './action-verbs'
import { adjectives } from './adjectives'
import { positions } from './positions'
import { moreFeelings } from './more-feelings'
import { listenHome } from './listen-home'
import { sentenceDaily } from './sentence-daily'
import { travelAirport } from './travel-airport'
import { hotel } from './hotel'
import { restaurant } from './restaurant'
import { shoppingMoney } from './shopping-money'
import { officeWork } from './office-work'
import { directions } from './directions'
import { health } from './health'
import { phrasesPolite } from './phrases-polite'
import { phrasesTravel } from './phrases-travel'

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
  ocean,
  music,
  // Intermediate: listening (hear → pick the picture)
  listenAnimals,
  listenFood,
  // Advanced: spell / build words
  spellCvc,
  spellColors,
  // Sentence building (word tiles → sentence)
  sentenceBasic,
  sentenceActions,

  // ===== "English for Life" module (practical, beginner → advanced) =====
  // Tunas — everyday basics
  dailyRoutine,
  kitchen,
  bathroom,
  months,
  placesTown,
  // Penjelajah — describing & doing
  actionVerbs,
  adjectives,
  positions,
  moreFeelings,
  listenHome,
  sentenceDaily,
  // Juara — real-world English (travel, work, phrases)
  travelAirport,
  hotel,
  restaurant,
  shoppingMoney,
  officeWork,
  directions,
  health,
  phrasesPolite,
  phrasesTravel,
]
