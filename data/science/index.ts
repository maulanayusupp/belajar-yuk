import type { ScienceLesson } from '~/types'
import { fiveSenses } from './panca-indra'
import { animalsHabitat } from './hewan-habitat'
import { solarSystem } from './tata-surya'

// List and ORDER of Science lessons (beginner -> advanced).
//
// To add a new lesson:
//   1. Create a new FOLDER with an `index.ts` that exports a ScienceLesson.
//   2. Import it here, then add it to the array (position = display order).
export const scienceLessons: ScienceLesson[] = [
  // Beginner: the world around us
  fiveSenses,
  animalsHabitat,
  // Intermediate: more abstract concepts
  solarSystem,
]
