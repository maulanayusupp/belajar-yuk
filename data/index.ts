import type { Lesson } from '~/types'
import { subjects } from './subjects'
import { englishLessons } from './english'
import { englishLifeLessons } from './english-life'
import { mathLessons } from './math'
import { scienceLessons } from './science'
import { bahasaLessons } from './bahasa'

// =============================================================
//  Single entry point for ALL content.
//  Components & services just import from '~/data'.
//
//  Folder structure:
//    data/
//      subjects.ts          -> list of subjects
//      english/             -> 1 file per lesson + index.ts (order)
//      math/                -> 1 file per lesson + index.ts (order)
//      index.ts             -> this file (aggregate)
// =============================================================

export { subjects, englishLessons, englishLifeLessons, mathLessons, scienceLessons, bahasaLessons }

// Combination of all lessons from every subject.
export const allLessons: Lesson[] = [
  ...englishLessons,
  ...englishLifeLessons,
  ...mathLessons,
  ...scienceLessons,
  ...bahasaLessons,
]
