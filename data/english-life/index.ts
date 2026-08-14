import type { EnglishLesson } from '~/types'
// "English for Life" — a SEPARATE module (its own subject id `english-life`):
// practical English for daily life, work, travelling & common phrases.
// Beginner → advanced. See MODULE_PLAN.md. Lessons reuse the English runners.
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
import { phrasalVerbs } from './phrasal-verbs'
import { idioms } from './idioms'
import { businessPhrases } from './business-phrases'
import { travelSituations } from './travel-situations'
import { fillPrepositions } from './fill-prepositions'
import { fillVerbs } from './fill-verbs'
import { dialogue } from './dialogue'
import { readingStory } from './reading-story'

export const englishLifeLessons: EnglishLesson[] = [
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
  // Mahir — usage in context (fill in the blank)
  fillPrepositions,
  fillVerbs,
  // Jagoan — advanced, real fluency (phrasal verbs, idioms, work & travel phrases,
  // conversation, and reading comprehension)
  dialogue,
  readingStory,
  phrasesPolite,
  phrasesTravel,
  phrasalVerbs,
  idioms,
  businessPhrases,
  travelSituations,
]
