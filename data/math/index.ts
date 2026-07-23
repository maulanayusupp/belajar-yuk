import type { MathLesson } from '~/types'
import { counting } from './counting'
import { countingTo10 } from './counting-to-10'
import { countingTo20 } from './counting-to-20'
import { tenFrame } from './ten-frame'
import { teenNumbers } from './teen-numbers'
import { numberBond5 } from './number-bond-5'
import { numberBond10 } from './number-bond-10'
import { numberBond20 } from './number-bond-20'
import { additionTo5 } from './addition-to-5'
import { additionTo10 } from './addition-to-10'
import { blockAddition } from './block-addition'
import { additionTo20 } from './addition-to-20'
import { subtractionTo5 } from './subtraction-to-5'
import { subtraction } from './subtraction'
import { subtractionTo20 } from './subtraction-to-20'
import { numberLine10 } from './number-line-10'
import { numberLine20 } from './number-line-20'
import { missingNumber } from './missing-number'
import { compare } from './compare'
import { patterns } from './patterns'
import { clock } from './clock'

// List & ORDER of Math lessons (easy → challenging, all Beginner).
//
// ➕ Adding a new lesson:
//   1. Create a new FOLDER with an `index.ts` that exports a MathLesson.
//   2. Import it here, then add it to the array (position = display order).
//   Need a new method? Add a value to `MathMethod` (types), metadata in
//   `math/methods.ts`, & a render branch in components/math/MethodLesson.vue.
export const mathLessons: MathLesson[] = [
  // Counting
  counting,
  countingTo10,
  countingTo20,
  tenFrame,
  teenNumbers,
  // Number bonds
  numberBond5,
  numberBond10,
  numberBond20,
  // Addition
  additionTo5,
  additionTo10,
  blockAddition,
  additionTo20,
  // Subtraction
  subtractionTo5,
  subtraction,
  subtractionTo20,
  // Number line
  numberLine10,
  numberLine20,
  // Intermediate: find the missing number
  missingNumber,
  // Real-world & logic
  patterns,
  clock,
  // Advanced: comparing numbers
  compare,
]
